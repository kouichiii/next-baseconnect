import { db } from '@vercel/postgres';

const categories = [
    { id: '05442b33-0c54-4297-9bd1-445cc0caae66', name: 'エンジニア' },
    { id: 'd3386a37-a3a3-4c20-b250-8491b259407c', name: 'マーケティング' },
    { id: 'a9b23497-58b3-4789-a2d7-ae37c70e7c78', name: '営業' },
    { id: '6d6c7993-c124-4c05-bc2e-3eab1719fecb', name: '人事' },
    { id: '8e684b19-2dfb-4b3f-a3f3-fe323366aaad', name: '財務・経理' },
    { id: '7f3d18c7-de5b-4906-8315-f2249ed4ba25', name: '医療・介護' },
    { id: '2fa1dfe7-c6cf-40f8-8af7-e03905b16676', name: 'カスタマーサポート' },
    { id: '7e009674-914f-4333-916b-4a9253fbfbd8', name: '製造' },
    { id: '59b4ed1a-fbd2-4c81-83fe-e00d894f9ba0', name: 'デザイン' },
    { id: '7c4a634d-a385-46c0-9194-31aee9d438c2', name: '事務' }
  ]

const client = await db.connect();

async function seedJobs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount INT NOT NULL
    );
  `;

}



export async function GET() {
    try {
      await client.sql`BEGIN`;
      //await seedJobs();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    } finally {
        client.release(); // コネクションを解放
    }
  }