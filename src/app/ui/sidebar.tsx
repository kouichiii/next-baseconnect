//年収の検索条件
const incomes = [300, 400, 500, 600, 700, 800, 900, 1000]

export default async function Sidebar(){

  return (
    <div className="container w-1/3 content-start  align-items py-20 px-6 bg-gray-100">
      <h1 className="text-lg pb-4 font-bold">求人カテゴリ</h1>
      <ul>
        {/* {categories.map((category) => (
          <li key={category.id}>
            <Checkbox label={category.name} onChange={handleCheckboxChange} />
          </li>
        ))} */}
      </ul>
      <div>
        <label className="flex flex-col items-center">
          <h1 className="text-lg py-4 font-bold self-start">年収</h1>
          <select
            className="w-2/3 px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
            //onChange={handleIncomeChange}
          >
            <option value={""}>
              選択してください
            </option>
            {incomes.map((income) => (
              <option key={income} value={income}>
                {income}万円以上
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

