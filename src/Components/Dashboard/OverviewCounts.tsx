"use client";

import { useState, useMemo } from 'react'; // Import hooks for local state management
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
import { clsx } from 'clsx'; // Utility for conditional classes

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
import Link from 'next/link';

const INITIAL_VISIBLE_COUNT = 2; // The number of items to show initially

const OverviewCounts = () => {
  const dispatch = useDispatch();
  
  const selectedData = useSelector(selectSelectedData);

  // --- START: New State and Logic for Expansion ---
  const [isExpanded, setIsExpanded] = useState(false);

  // Derive the data to display based on the expanded state
  const displayedData = useMemo(() => {
    if (isExpanded) {
      return selectedData; // If expanded, show all selected data
    }
    // If collapsed, show only the first 2 items
    return selectedData.slice(0, INITIAL_VISIBLE_COUNT);
  }, [selectedData, isExpanded]);
  // --- END: New State and Logic ---


  // Unchanged part of your component
  const counts = {
    total: "27893",
    PAYLOAD: "13997",
    "ROCKET BODY": "2167",
    UNKNOWN: "559",
    DEBRIS: "10595",
  };

  const summary = [
    { title: "Payloads", count: counts.PAYLOAD, icon: <FaSatellite size={30} />, color: "bg-green-500" },
    { title: "Rocket Bodies", count: counts["ROCKET BODY"], icon: <FaRocket size={30} />, color: "bg-yellow-400" },
    { title: "Debris", count: counts.DEBRIS, icon: <FaBomb size={30} />, color: "bg-red-500" },
    { title: "Unknown", count: counts.UNKNOWN, icon: <FaQuestionCircle size={30} />, color: "bg-gray-500" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 text-white space-y-10 flex flex-col">
      {/* --- This section is UNCHANGED --- */}
      <div>
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
        <div className="grid grid-cols-2 gap-8">
          {summary.map((item, index) => (
            <div key={index} className="bg-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center" >
              <div className={`w-18 h-18 rounded-full flex items-center justify-center ${item.color} mb-3`} >
                {item.icon}
              </div>
              <div className="text-s text-slate-300">{item.title}</div>
              <div className="text-xl font-semibold mt-1">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODIFIED Selected Items Table --- */}
       <div className="p-6 md:p-8 rounded-3xl bg-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Selected Data ({selectedData.length})
          </h2>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:bg-red-900/50 disabled:cursor-not-allowed cursor-pointer"
            onClick={() => {
              dispatch(clearAllData());
              dispatch(clearAllIdsData());
            }}
            disabled={selectedData.length === 0}
          >
            Clear All
          </button>
        </div>

        {/* 1. Add a relative parent wrapper for positioning the arrow button */}
        <div className="relative">
          <div className="w-full rounded-lg border-2 border-slate-800 overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-800 text-slate-200 font-semibold">
              <div className="p-4">NORAD ID</div>
              <div className="p-4">NAME</div>
              <div className="p-4">Orbit</div>
              <div className="p-4 text-center">Action</div>
            </div>

            <div
             className={clsx(
  "overflow-y-auto transition-all duration-300",
  isExpanded ? "h-[250px]" : "h-auto",
  "[&::-webkit-scrollbar]:w-2",
  "[&::-webkit-scrollbar-track]:rounded-full",
  "[&::-webkit-scrollbar-track]:bg-slate-800",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-slate-500",
  "dark:[&::-webkit-scrollbar-track]:bg-neutral-700",
  "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
)}
            >
              {displayedData.length > 0 ? (
                displayedData.map((satellite, index) => (
                  <div
                    key={satellite.noradCatId}
                    className={`grid grid-cols-4 items-center border-b border-slate-600 text-slate-100 ${
                      index % 2 === 0 ? "bg-slate-700" : "bg-slate-800"
                    }`}
                  >
                    <div className={clsx("p-4", !isExpanded && "truncate")}>{satellite.noradCatId}</div>
                    <div className={clsx("p-4", !isExpanded && "truncate")}>{satellite.name}</div>
                    <div className={clsx("p-4", !isExpanded && "truncate")}>{satellite.orbitCode}</div>
                    <div className="p-4 flex justify-center">
                      <button
                        onClick={() => {
                          dispatch(toggleSatelliteData(satellite));
                          dispatch(toggleSelection(satellite.noradCatId));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400">
                  No data selected.
                </div>
              )}
            </div>
          </div>

          {/* 2. Conditionally render the absolute-positioned arrow button */}
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

        <div className="flex justify-between items-center mt-6">
          <Link
  className={clsx(
    "px-4 py-2 rounded-lg flex items-center justify-center gap-2",
    selectedData.length === 0
      ? "text-slate-500 cursor-not-allowed"
      : "text-cyan-300 hover:bg-cyan-800"
  )}
  href={selectedData.length === 0 ? "#" : "/selected-details"}
  onClick={(e) => {
    if (selectedData.length === 0) {
      e.preventDefault();
    }
  }}
>
  Proceed <FaArrowRight size={16} />
</Link>

          {/* 3. Conditionally render the "Show Less" button when expanded */}
          
        </div>
      </div>
    </div>
  );
};

export default OverviewCounts;