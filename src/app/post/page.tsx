"use client";
import { useActionState, useEffect, useState } from "react";
import { fetchCategory } from "@/app/lib/action";
import { createJob, State } from "@/app/lib/action";
import { Category } from "@/app/lib/definetions";

export default function Page() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createJob, initialState);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data); // データを state に保存
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form action={formAction} className="m-20">
      <h1 className="text-2xl font-bold my-8">求人投稿</h1>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人カテゴリ選択</h1>
        <select
          name="category_id"
          aria-describedby="category-error"
          defaultValue=""
          className="px-4 pr-16 py-2  border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        >
          <option disabled value="">カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div id="category-error" aria-live="polite" aria-atomic="true">
          {state.errors?.category_id &&
            state.errors.category_id.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </label>

      <label>
        <h1 className="text-lg py-2 font-bold self-start">年収</h1>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="年収を入力してください (単位:万円)"
          aria-describedby="amount-error"
          className="px-4 pr-16 py-2  border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount &&
            state.errors.amount.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </label>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人タイトル</h1>
        <input
          type="text"
          name="title"
          placeholder="求人タイトルを入力してください"
          aria-describedby="title-error"
          className="px-4 pr-16 py-2 w-2/3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </label>
      <button
        type="submit"
        className="block w-1/5 px-6 py-3 mt-4 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
      >
        投稿
      </button>
      <div id="field-error" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </form>
  );
}
