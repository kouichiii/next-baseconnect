
//一度に表示するデータ数
//const displayCount = 5;

export default async function Mainbar (){

  return (
    <div className="w-2/3 h-screen pt-20 px-8 flex flex-col justify-between">
      <div>
        <h1 className="text-xl  font-bold">求人一覧</h1>
        <p className="pb-4">該当件数: 0件</p>
        {/* {JobsToShow.map((job) => (
            <div key={job.id} className="bg-white p-4 mb-2 border rounded shadow">
            <h1 className="text-lg font-semibold">{job.title}</h1>
            <p className="text-gray-700">カテゴリ: {job.category_name}</p>
            <p className="text-gray-700">年収: {job.income}万円</p>
            </div>
        ))} */}
      </div>
      <div className="w-full flex justify-center mb-2 ">

      </div>
    </div>
  );
};

