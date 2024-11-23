import Checkbox from "@/app/ui/criteria/checkbox";
import Amount from "@/app/ui/criteria/select-amount";
import { fetchCategory } from "@/app/lib/action";

const categories = await fetchCategory();

export default function Sidebar() {
  return (
    <div className="container w-1/3 content-start  align-items py-20 px-6 bg-gray-100">
      <Checkbox categories={categories} />
      <Amount />
    </div>
  );
}
