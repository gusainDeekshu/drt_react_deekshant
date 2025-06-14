// app/dashboard/components/Filters.tsx

"use client";
import { FC, useState } from "react";
import { ORBIT_CODES, OBJECT_TYPES } from "@/lib/constants";

// NEW: Props for the reusable FilterGroup component
interface FilterGroupProps {
  title: string;
  options: readonly string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  activeColor: string;
}

// NEW: A reusable sub-component for a group of filter buttons
const FilterGroup: FC<FilterGroupProps> = ({ title, options, selectedItems, onToggle, activeColor }) => (
  <div>
    <p className="text-white font-semibold mb-2">{title}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`px-3 py-1 text-sm rounded-lg transition-colors text-slate-400 cursor-pointer ${
            selectedItems.includes(item) ? activeColor : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

// UPDATED: Props for the main Filters component
interface FiltersProps {
  onApply: (filters: { objectTypes?: string[]; orbitCodes?: string[] }) => void;
  resultCount: number;
  isUpdating: boolean;
}

// UPDATED: The main Filters component is now much cleaner
const Filters: FC<FiltersProps> = ({ onApply, resultCount, isUpdating }) => {
  const [objectTypes, setObjectTypes] = useState<string[]>([]);
  const [orbitCodes, setOrbitCodes] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((currentList) =>
      currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item]
    );
  };

  const handleApply = () => {
    onApply({
      // Pass empty arrays, the parent will handle converting to undefined
      objectTypes: objectTypes.length > 0 ? objectTypes : undefined,
      orbitCodes: orbitCodes.length > 0 ? orbitCodes : undefined,
    });
  };

  const handleClear = () => {
    setObjectTypes([]);
    setOrbitCodes([]);
    onApply({
      objectTypes: undefined,
      orbitCodes: undefined,
    });
  };

  const buttonsDisabled = isUpdating;

  return (
    <div className="space-y-6 bg-slate-800 p-6 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FilterGroup
          title="Object Types"
          options={OBJECT_TYPES}
          selectedItems={objectTypes}
          onToggle={(item) => toggleSelection(item, objectTypes, setObjectTypes)}
          activeColor="bg-purple-700 text-white"
        />
        <FilterGroup
          title="Orbit Codes"
          options={ORBIT_CODES}
          selectedItems={orbitCodes}
          onToggle={(item) => toggleSelection(item, orbitCodes, setOrbitCodes)}
          activeColor="bg-purple-700 text-white"
        />
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-slate-700">
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleApply}
            disabled={buttonsDisabled}
          >
            Apply Filters
          </button>
          <button
            className="px-6 py-2 bg-gray-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={handleClear}
            disabled={buttonsDisabled}
          >
            Clear
          </button>
        </div>
        <div className="text-slate-300">
          {isUpdating ? (
            <span className="italic">Updating...</span>
          ) : (
            <span>
              Showing <span className="font-bold text-white">{resultCount.toLocaleString()}</span> results
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;