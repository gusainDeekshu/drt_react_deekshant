"use client";

import { FC, memo, useCallback, useMemo } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { SatelliteData } from "@/types";
import { clsx } from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import {
  toggleSelection,
  selectSelectedIds,
  selectSelectionError,
  selectSelectionCount,
} from "@/app/store/satelliteSelectionSlice";
import { toggleSatelliteData } from "@/app/store/satelliteDataSlice";

// --- TYPES & CONFIGURATION (Unchanged) ---
type SortKey = keyof SatelliteData;
interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}
const SELECTION_LIMIT = 10;
const COLUMN_DEFINITIONS: {
  key: SortKey;
  label: string;
  width: string;
  align?: "left" | "right";
}[] = [
  { key: "name", label: "Name", width: "w-3/12" },
  { key: "noradCatId", label: "NORAD ID", width: "w-3/12" },
  { key: "orbitCode", label: "Orbit", width: "w-2/12" },
  { key: "objectType", label: "Type", width: "w-2/12" },
  { key: "countryCode", label: "Country", width: "w-2/12" },
  { key: "launchDate", label: "Launch Date", width: "w-3/12" },
];
interface SatellitesTableProps {
  data: SatelliteData[];
  onSort: (key: SortKey) => void;
  sortConfig: SortConfig;
}

// --- CHILD COMPONENTS (Unchanged) ---

const SortIcon = memo(({ direction }: { direction: "asc" | "desc" }) => (
  <span className="ml-2">{direction === "asc" ? "▲" : "▼"}</span>
));
SortIcon.displayName = "SortIcon";

const TableHeaderCell: FC<{
  label: string;
  sortKey: SortKey;
  isSorted: boolean;
  sortDirection: "asc" | "desc";
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}> = memo(
  ({ label, sortKey, isSorted, sortDirection, onSort, align = "left" }) => (
    <button
      onClick={() => onSort(sortKey)}
      className={clsx(
        "flex w-full items-center p-3 text-left text-xs font-semibold uppercase text-slate-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-500",
        align === "right" ? "justify-end" : "justify-start"
      )}
    >
      {" "}
      {label} {isSorted && <SortIcon direction={sortDirection} />}{" "}
    </button>
  )
);
TableHeaderCell.displayName = "TableHeaderCell";

const TableRow = memo(
  ({
    index,
    style,
    data: rowData,
  }: ListChildComponentProps<{
    satellites: SatelliteData[];
    columns: typeof COLUMN_DEFINITIONS;
    selectedIds: Set<string>;
    toggleSelection: (satellite: SatelliteData) => void;
  }>) => {
    const { satellites, columns, selectedIds, toggleSelection } = rowData;
    const sat = satellites[index];
    const isSelected = selectedIds.has(sat.noradCatId);

    return (
      <div
        style={style}
        className={clsx(
          "flex w-full items-center border-b border-slate-700/50 text-sm ",
          !isSelected
            ? "bg-[#1A202C] text-slate-200"
            : "bg-[#2D3748] text-cyan-300",
          "hover:bg-slate-600 transition-colors duration-150"
        )}
      >
        <div className="flex w-[5%] items-center justify-center p-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(sat)}
            className="h-4 w-4 cursor-pointer rounded-sm border-slate-500 bg-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            aria-label={`Select satellite ${sat.name}`}
          />
        </div>
        {columns.map((col) => (
          <div
            key={col.key}
            className={clsx(
              "p-3",
              isSelected ? "whitespace-normal break-words" : "truncate",
              col.width
            )}
          >
            {sat[col.key]}
          </div>
        ))}
      </div>
    );
  }
);
TableRow.displayName = "TableRow";

// --- MAIN COMPONENT (Refactored for Responsiveness) ---

const SatellitesTable: FC<SatellitesTableProps> = ({
  data,
  onSort,
  sortConfig,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const selectedIdsArray = useSelector(selectSelectedIds);
  const selectionCount = useSelector(selectSelectionCount);
  const selectionError = useSelector(selectSelectionError);

  const selectedIdsSet = useMemo(
    () => new Set(selectedIdsArray),
    [selectedIdsArray]
  );

  const handleToggleSelection = useCallback(
    (satellite: SatelliteData) => {
      dispatch(toggleSelection(satellite.noradCatId));
      dispatch(toggleSatelliteData(satellite));
    },
    [dispatch]
  );

  const itemData = {
    satellites: data,
    columns: COLUMN_DEFINITIONS,
    selectedIds: selectedIdsSet,
    toggleSelection: handleToggleSelection,
  };

  // The total height of the list container is 75vh or max 600px. The header is 48px (h-12).
  // This calculation makes the virtualized list's height responsive as well.
  const listHeight =
    typeof window !== "undefined"
      ? Math.min(window.innerHeight * 0.75, 600) - 48
      : 552; // Fallback for SSR

  return (
    // RESPONSIVE CHANGE: Adjusted padding for smaller screens
    <div className="space-y-4 bg-slate-800 p-4 md:p-6 rounded-xl">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Satellite Data</h2>
          <p className="text-sm text-slate-400 mt-1">
            Selected: {selectionCount} / {SELECTION_LIMIT}
          </p>
        </div>
        {selectionError && (
          <p className="text-sm text-red-400">{selectionError}</p>
        )}
      </div>

      {/* RESPONSIVE CHANGE: Added a wrapper to handle horizontal overflow on small screens */}
      <div className="overflow-x-auto">
        {/*
          RESPONSIVE CHANGE:
          1. A minimum width is set to prevent columns from becoming too squished. This triggers the overflow scrollbar.
          2. Height is now relative to the viewport height (vh) with a max-height to prevent it from being too tall on large monitors.
        */}
        <div className="flex w-full min-w-[800px] flex-col rounded-lg bg-[#1A202C] h-[75vh] max-h-[600px]">
          <div className="flex flex-shrink-0 bg-[#1A202C] h-12 rounded-t-lg">
            <div className="flex w-[5%] items-center justify-center p-3"></div>
            {COLUMN_DEFINITIONS.map((col) => (
              <div key={col.key} className={col.width}>
                <TableHeaderCell
                  label={col.label}
                  sortKey={col.key}
                  onSort={onSort}
                  isSorted={sortConfig.key === col.key}
                  sortDirection={sortConfig.direction}
                  align={col.align}
                />
              </div>
            ))}
          </div>

          <div className="flex-grow">
            {data.length > 0 ? (
              <List
                height={listHeight} // Use the dynamically calculated height
                itemCount={data.length}
                itemSize={48}
                width="100%"
                itemData={itemData}
                className="scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-track-slate-700 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full"
              >
                {TableRow}
              </List>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No satellites found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatellitesTable;