"use client";
import Overview from "@/Components/Dashboard/Overview";
import OverviewCounts from "@/Components/Dashboard/OverviewCounts";

export default function Home() {
  return (
    <div className="bg-slate-900 bg-[url('@/assets/images/bg-image.jpg')] bg-cover bg-center  p-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 ">
      {/* First Overview */}
      <div className="w-full md:w-7/12 ">
        <Overview />
      </div>

      {/* Second Overview */}
      <div className="w-full md:w-5/12 ">
        <OverviewCounts />
      </div>
    </div>
  );
}
