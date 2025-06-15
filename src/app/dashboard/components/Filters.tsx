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
    // Main Container:
    // - Use responsive padding for better spacing on mobile vs. desktop.
    <div className="space-y-6 bg-slate-800 p-4 md:p-6 rounded-xl">
      
      {/* Filter Groups */}
      {/* - This was already responsive, which is great! 
          - We can use responsive gaps for even finer control. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

      {/* Actions and Results Footer */}
      {/* - On mobile (default): Stacks vertically (flex-col) with a gap.
          - On medium screens+ (md:): Switches to a row, aligns items in the center, 
            and justifies with space between. */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-slate-700">
        
        {/* Button Group */}
        {/* - flex-wrap allows buttons to stack vertically on very narrow screens if needed. */}
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-800 disabled:cursor-not-allowed cursor-pointer"
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
        
        {/* Result Count and Status */}
        {/* - On mobile, text is centered for a cleaner look when stacked.
            - On desktop, it's aligned to the right. */}
        <div className="text-slate-300 text-center md:text-right">
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