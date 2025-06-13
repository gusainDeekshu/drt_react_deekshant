"use client";
import { FC } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { SatelliteData } from "@/types";

// These types are now in your shared types file, but keeping them here for context is fine
// if this component is the only place they are used.
// Best practice is to import them from '@/types'
type SortKey = keyof SatelliteData;
interface SortConfig {
  key: SortKey;
  direction: 'asc' | 'desc';
}

interface SatellitesTableProps {
  data: SatelliteData[];
  onSort: (key: SortKey) => void;
  sortConfig: SortConfig;
}

const ROW_HEIGHT = 50;

// A small component for the sort icon
const SortIcon = ({ direction }: { direction: 'asc' | 'desc' }) => {
  return <span className="ml-2">{direction === 'asc' ? '▲' : '▼'}</span>;
};

const SatellitesTable: FC<SatellitesTableProps> = ({ data, onSort, sortConfig }) => {
  
  // A reusable component for the clickable table headers
  const HeaderCell: FC<{ title: string; sortKey: SortKey; className?: string }> = ({ title, sortKey, className }) => (
    <div 
      className={`p-3 w-1/7 font-semibold cursor-pointer select-none flex items-center ${className || ''}`} 
      onClick={() => onSort(sortKey)}
    >
      {title}
      {sortConfig.key === sortKey && <SortIcon direction={sortConfig.direction} />}
    </div>
  );
  
  const Row = ({ index, style }: ListChildComponentProps) => {
    const sat = data[index];
    return (
      <div
        style={style}
        className="border-t border-slate-600 hover:bg-slate-600 flex w-full items-center"
      >
        <div className="p-3 w-1/7 flex items-center justify-center">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-2"
            onChange={(e) => {
              // Handle checkbox change here
              console.log(`Satellite ${sat.name} selected:`, e.target.checked);
            }}
          />
        </div>
        <div className="p-3 w-1/7 truncate">{sat.name}</div>
        <div className="p-3 w-1/7 truncate">{sat.noradCatId}</div>
        <div className="p-3 w-1/7 truncate">{sat.orbitCode}</div>
        <div className="p-3 w-1/7 truncate">{sat.objectType}</div>
        <div className="p-3 w-1/7 truncate">{sat.countryCode}</div>
        <div className="p-3 w-1/7 truncate">{sat.launchDate}</div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto bg-slate-700 rounded-2xl">
      {/* Table Header */}
      <div className="bg-slate-800 text-slate-300 uppercase sticky top-0 z-10">
        <div className="flex w-full min-w-full items-center">
          <div className="p-3 w-1/7 font-semibold flex items-center justify-center">
            {/* You could add a select-all checkbox here */}
          </div>
          <HeaderCell title="Name" sortKey="name" />
          {/* --- CHANGES START HERE --- */}
          <HeaderCell title="NORAD ID" sortKey="noradCatId" />
          <HeaderCell title="Orbit Code" sortKey="orbitCode" />
          <HeaderCell title="Object Type" sortKey="objectType" />
          <HeaderCell title="Country" sortKey="countryCode" />
          <HeaderCell title="Launch Date" sortKey="launchDate" />
          {/* --- CHANGES END HERE --- */}
        </div>
      </div>
      
      {/* Virtualized Table Body */}
      {data.length > 0 ? (
        <div className="text-sm text-left text-slate-200">
          <List
            height={600}
            itemCount={data.length}
            itemSize={ROW_HEIGHT}
            width="100%"
          >
            {Row}
          </List>
        </div>
      ) : (
        <div className="text-center p-8 text-slate-400">
          No satellites match your criteria.
        </div>
      )}
    </div>
  );
};

export default SatellitesTable;