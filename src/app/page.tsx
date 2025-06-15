"use client";
import Overview from "@/Components/Dashboard/Overview";
import OverviewCounts from "@/Components/Dashboard/OverviewCounts";

export default function Home() {
  return (
    // Main container using CSS Grid
    // - p-6: Added slightly more padding for better spacing.
    // - grid: Enables the grid layout.
    // - grid-cols-1: On mobile (default), it's a single-column layout.
    // - lg:grid-cols-12: On large screens (1024px+), it switches to a 12-column grid.
    // - gap-6: Defines the space between grid items, works for rows and columns.
    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* First Overview (Main Content) */}
      {/* - col-span-1: On mobile, it spans the single available column.
          - lg:col-span-7: On large screens, it takes up 7 of the 12 columns. */}
      <div className="lg:col-span-7">
        <Overview />
      </div>

      {/* Second Overview (Side Content) */}
      {/* - col-span-1: On mobile, it spans the single available column.
          - lg:col-span-5: On large screens, it takes up the remaining 5 of the 12 columns. */}
      <div className="lg:col-span-5">
        <OverviewCounts />
      </div>

    </div>
  );
}