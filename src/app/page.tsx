import "@/app/ui/global.css";
import Sidebar from "@/app/ui/sidebar";
import Mainbar from "@/app/ui/mainbar";
export default function Home() {
  return (
    <>
      <div className=" flex min-h-screen min-w-screen">
        <Sidebar/>
        <Mainbar/>
      </div>
    </>
  );
}
