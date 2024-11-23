import "@/app/ui/global.css";
import { fetchFilteredJobs } from "@/app/lib/action";
import Sidebar from "@/app/ui/sidebar";
import Pagination from "@/app/ui/pagenation";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string | string[];
    amount?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query =
    typeof searchParams?.query === "string"
      ? [searchParams.query] // 単一値を配列に変換
      : searchParams?.query || []; // 配列もしくは空配列
  const amount = searchParams?.amount || "";
  const currentPage = Number(searchParams?.page) || 1;

  const [totalPages, totalJobs, filteredJobs] = await fetchFilteredJobs(
    query,
    amount,
    currentPage
  );

  
  return (
    <>
      <div className=" flex min-h-screen min-w-screen">
        <Sidebar />
        <div className="w-2/3 h-screen pt-20 px-8 flex flex-col justify-between">
          <div>
            <h1 className="text-xl  font-bold">求人一覧</h1>
            <p className="pb-4">該当件数: {totalJobs}件</p>
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-4 mb-2 border rounded shadow"
                >
                  <h1 className="text-lg font-semibold">{job.title}</h1>
                  <p className="text-gray-700">カテゴリ: {job.category_name}</p>
                  <p className="text-gray-700">年収: {job.amount}万円</p>
                </div>
              ))}
          </div>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  );
}
