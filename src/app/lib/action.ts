'use server';
import { db } from '@vercel/postgres';
import {
    Category,
    Job,
} from '@/app/lib/definetions';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function fetchCategory() {
    const client = await db.connect();
    try {
        const data = await client.sql<Category>`SELECT * FROM categories`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch category data.');
    } finally {
        client.release(); // コネクションを解放
    }
}

export async function fetchJob() {
    const client = await db.connect();
    try {
        const data = await client.sql<Job>`SELECT * FROM jobs`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch job data.');
    } finally {
        client.release(); // コネクションを解放
    }
}

const FormSchema = z.object({
    title: z.string({
        invalid_type_error: 'タイトルは必須です',
    })
        .min(1, { message: 'タイトルは必須です' }),
    amount: z.coerce
        .number()
        .gt(0, { message: '年収は必須です' }),
    category_id: z.string({
        invalid_type_error: 'カテゴリは必須です',
    }),
});

export type State = {
    errors?: {
        title?: string[];
        amount?: string[];
        category_id?: string[];
    };
    message?: string | null;
};

export async function createJob(prevState: State, formData: FormData) {
    const client = await db.connect();
    const validatedFields = FormSchema.safeParse({
        category_id: formData.get('category_id'),
        amount: formData.get('amount'),
        title: formData.get('title'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: '求人の投稿に失敗しました',
        };
    }
    const { category_id, amount, title } = validatedFields.data;

    try {
        await client.sql`
      INSERT INTO jobs (category_id, title, amount)
      VALUES (${category_id}, ${title}, ${amount})
      `;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            message: 'Database Error: Failed to Post Job.',
        };
    } finally {
        client.release(); // コネクションを解放
    }

    revalidatePath('/');
    redirect('/');
}


const ITEMS_PER_PAGE = 5;
export async function fetchFilteredJobs(query: string[], amount: string, currentPage: number) {
    const client = await db.connect();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    // 条件を動的に組み立てる
    const conditions: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];
    if (amount) {
        conditions.push(`jobs.amount >= $${values.length + 1}`);
        values.push(Number(amount));
    }

    if (query.length === 0) {
        conditions.push(`FALSE`);
    } else {
        const queryConditions = query.map((_, index) => `categories.name ILIKE $${values.length + index + 1}`);
        conditions.push(`(${queryConditions.join(" OR ")})`);
        values.push(...query.map((q) => `%${q}%`));
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    try {
        // 全体の件数を取得するクエリ
        const countResult = await client.query(
            `
        SELECT COUNT(*) as total
        FROM jobs
        JOIN categories ON jobs.category_id = categories.id
        ${whereClause}
        `,
            values
        );
        const totalJobs = Number(countResult.rows[0].total);
        const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);
        const result = await client.query(
            `
        SELECT
          jobs.id,
          jobs.amount,
          jobs.title,
          categories.name AS category_name
        FROM jobs
        JOIN categories ON jobs.category_id = categories.id
        ${whereClause}
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `,
            [...values, ITEMS_PER_PAGE, offset]
        );
        return [totalPages,totalJobs, result.rows];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Jobs.');
    } finally {
        client.release(); // コネクションを解放
    }
}