"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Amount() {
  const incomes = [300, 400, 500, 600, 700, 800, 900, 1000];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    // ページロード時にクエリをリセット
    replace(`${pathname}`);
  }, [pathname, replace]);

  const handleAmountSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const term = event.target.value;
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (params.has("amount")) {
        params.set("amount", term);
      } else {
        params.append("amount", term);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );
  return (
    <div>
      <label className="flex flex-col items-center">
        <h1 className="text-lg py-4 font-bold self-start">年収</h1>
        <select
          className="w-2/3 px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        defaultValue=""
          onChange={handleAmountSearch} // イベントをハンドラに渡す
        >
          <option disabled value="">選択してください</option>
          {incomes.map((income) => (
            <option key={income} value={income}>
              {income}万円以上
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
