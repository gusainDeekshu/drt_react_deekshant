"use client";
import Overview from "@/Components/Dashboard/Overview";
import OverviewCounts from "@/Components/Dashboard/OverviewCounts";

export default function Home() {
  return (
    <div className=" p-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 ">
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
