'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Category } from "@/app/lib/definetions";

type CheckboxProps = {
  categories: Category[];
};

export default function Checkbox({ categories }: CheckboxProps){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    const currentQueries = params.getAll('query');
    params.set('page', '1');
    if (currentQueries.includes(term)) {
      const updatedQueries = currentQueries.filter((query) => query !== term);
      params.delete('query');
      updatedQueries.forEach((query) => params.append('query', query));
    } else {
      params.append('query', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
    return (
      <>
        <h1 className="text-lg pb-4 font-bold">求人カテゴリ</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  value={category.name}
                  type="checkbox"
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                  className=
                  "appearance-none h-4 w-4 border-2 border-gray-300  checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </>
    );
}