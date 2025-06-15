"use client";

import { useState, useMemo } from "react";
import {
  FaSatellite,
  FaRocket,
  FaQuestionCircle,
  FaBomb,
  FaGlobe,
  FaTimes,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { clsx } from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedData,
  toggleSatelliteData,
  clearAllData,
} from "@/app/store/satelliteDataSlice";
import {
  toggleSelection,
  clearAllIdsData,
} from "@/app/store/satelliteSelectionSlice";
import Link from "next/link";

const INITIAL_VISIBLE_COUNT = 2;

const OverviewCounts = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector(selectSelectedData);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedData = useMemo(() => {
    if (isExpanded) {
      return selectedData;
    }
    return selectedData.slice(0, INITIAL_VISIBLE_COUNT);
  }, [selectedData, isExpanded]);

  const counts = {
    total: "27893",
    PAYLOAD: "13997",
    "ROCKET BODY": "2167",
    UNKNOWN: "559",
    DEBRIS: "10595",
  };

  const summary = [
    {
      title: "Payloads",
      count: counts.PAYLOAD,
      icon: <FaSatellite size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Rocket Bodies",
      count: counts["ROCKET BODY"],
      icon: <FaRocket size={30} />,
      color: "bg-yellow-400",
    },
    {
      title: "Debris",
      count: counts.DEBRIS,
      icon: <FaBomb size={30} />,
      color: "bg-red-500",
    },
    {
      title: "Unknown",
      count: counts.UNKNOWN,
      icon: <FaQuestionCircle size={30} />,
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 text-white space-y-10 flex flex-col">
      {/* --- This section is MODIFIED for responsiveness --- */}
      <div className="order-2 md:order-1">
        <div className="bg-slate-700 rounded-2xl p-6 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
              <FaGlobe size={28} />
            </div>
            <div>
              <div className="text-2xl text-slate-300">Total Objects</div>
              <div className="text-4xl font-bold">{counts.total}</div>
            </div>
          </div>
        </div>
        {/*
          RESPONSIVE CHANGE:
          - Default to a single column for mobile (grid-cols-1).
          - Switch to two columns on small screens and up (sm:grid-cols-2).
          - Adjust gap for better spacing on mobile.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {summary.map((item, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center"
            >
              <div
                className={`w-18 h-18 rounded-full flex items-center justify-center ${item.color} mb-3`}
              >
                {item.icon}
              </div>
              <div className="text-s text-slate-300">{item.title}</div>
              <div className="text-xl font-semibold mt-1">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- This "Selected Data" section is UNCHANGED, as requested --- */}
      <div className="order-1 md:order-2 p-4 md:p-6 lg:p-8 rounded-3xl bg-slate-700 shadow-xl mb-8">
        {/* --- Responsive Header --- */}
        {/* On mobile: stacks vertically. On desktop: becomes a row. */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Selected Data ({selectedData.length})
          </h2>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:bg-red-900/50 disabled:cursor-not-allowed cursor-pointer self-start md:self-auto"
            onClick={() => {
              dispatch(clearAllData());
              dispatch(clearAllIdsData());
            }}
            disabled={selectedData.length === 0}
          >
            Clear All
          </button>
        </div>

        <div className="relative">
          {/* --- Main Data Container --- */}
          <div className="w-full rounded-lg border-2 border-slate-800 overflow-hidden">
            {/* --- Desktop-Only Grid Header --- */}
            {/* This header is hidden on mobile and appears as a grid on medium screens and up. */}
            <div className="hidden md:grid md:grid-cols-4 bg-slate-800 text-slate-200 font-semibold">
              <div className="p-4">NORAD ID</div>
              <div className="p-4">NAME</div>
              <div className="p-4">Orbit</div>
              <div className="p-4 text-center">Action</div>
            </div>

            {/* --- Scrollable Data List --- */}
            <div
              className={clsx(
                "overflow-y-auto transition-all duration-300",
                isExpanded ? "max-h-[300px]" : "max-h-[160px]", // Use max-h for better flexibility
                // (Your scrollbar styles are great and unchanged)
                "[&::-webkit-scrollbar]:w-2"
                // ...
              )}
            >
              {displayedData.length > 0 ? (
                // On mobile, this will be a list of cards. On desktop, a grid.
                <div className="flex flex-col md:block">
                  {displayedData.map((satellite) => (
                    <div
                      key={satellite.noradCatId}
                      // This is the core responsive switch:
                      // Mobile (default): A block-level card with padding and relative positioning.
                      // Desktop (md:): Switches to a grid row.
                      className="p-4 md:p-0 border-b border-slate-600 bg-slate-800/50 md:grid md:grid-cols-4 md:items-center relative"
                    >
                      {/* --- Mobile Card Layout (using flexbox & responsive utilities) --- */}
                      <div className="md:hidden flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">
                            {satellite.name}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-400">NORAD ID: </span>
                          <span className="text-slate-200">
                            {satellite.noradCatId}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-400">Orbit: </span>
                          <span className="text-slate-200">
                            {satellite.orbitCode}
                          </span>
                        </div>
                      </div>

                      {/* --- Desktop Grid Cell Layout (hidden on mobile) --- */}
                      <div
                        className={clsx(
                          "hidden md:block p-4",
                          !isExpanded && "truncate"
                        )}
                      >
                        {satellite.noradCatId}
                      </div>
                      <div
                        className={clsx(
                          "hidden md:block p-4",
                          !isExpanded && "truncate"
                        )}
                      >
                        {satellite.name}
                      </div>
                      <div
                        className={clsx(
                          "hidden md:block p-4",
                          !isExpanded && "truncate"
                        )}
                      >
                        {satellite.orbitCode}
                      </div>

                      {/* --- Action Button (works for both layouts) --- */}
                      <div className="absolute top-2 right-2 md:relative md:top-auto md:right-auto md:p-4 md:flex md:justify-center">
                        <button
                          onClick={() => {
                            dispatch(toggleSatelliteData(satellite));
                            dispatch(toggleSelection(satellite.noradCatId));
                          }}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-slate-700"
                        >
                          <FaTimes size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-400">
                  No data selected.
                </div>
              )}
            </div>
          </div>

          {/* --- "Show More" Button (unchanged, still works great) --- */}
          {selectedData.length > INITIAL_VISIBLE_COUNT && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-600 hover:bg-slate-500 text-white rounded-full h-8 w-8 flex items-center justify-center transition-colors shadow-lg"
              aria-label={isExpanded ? "Show less" : "Show more"}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}
        </div>

        {/* --- Footer (unchanged, `justify-between` works fine) --- */}
        <div className="flex justify-between items-center mt-8">
          <Link
            className={clsx("flex")}
            href={selectedData.length === 0 ? "#" : "/selected-details"}
          >
            Proceed <FaArrowRight className="mt-1 ms-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewCounts;
