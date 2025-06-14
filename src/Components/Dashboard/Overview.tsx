"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import _ from "lodash";
import { fetchSatellites } from "@/lib/api";
import { FetchParams, SatelliteData, SortConfig, SortKey } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/app/dashboard/components/SearchBar";
import Filters from "@/app/dashboard/components/Filters";
import SatellitesTable from "@/app/dashboard/components/SatellitesTable";
import TableSkeleton from "@/app/dashboard/components/TableSkeleton";

// 1. Expanded client-side filter interface
interface ClientFilters {
  orbitCodes?: string[];
  objectTypes?: string[];
}

export default function Overview() {
  // --- STATE MANAGEMENT ---

  // This state now primarily defines the attributes to fetch, but won't be changed by filters.
  const [params] = useState<FetchParams>({
    attributes: [
      "noradCatId",
      "name",
      "launchDate",
      "objectType",
      "countryCode",
      "orbitCode",
      "intlDes", 
    ],
  });

  // This state now holds ALL filters that will be applied client-side.
  const [clientFilters, setClientFilters] = useState<ClientFilters>({});
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const debouncedSearch = useDebounce(search, 300);

  // --- DATA FETCHING ---
  // 2. Simplified query. It fetches the data once and won't refetch on filter changes.
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<SatelliteData[]>({
    queryKey: ["satellites-all", params], // Use a distinct key for the full dataset
    queryFn: () => fetchSatellites(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // --- DATA PROCESSING ---
  // 3. All filtering logic is now consolidated here.
  const processedData = useMemo(() => {
    if (!data) return [];
    let result = [...data];

    // Apply client-side objectType filter
    if (clientFilters.objectTypes && clientFilters.objectTypes.length > 0) {
      result = _.filter(result, (satellite) =>
        clientFilters.objectTypes!.includes(satellite.objectType)
      );
    }

    // Apply client-side orbitCode filter (with partial matching)
    if (clientFilters.orbitCodes && clientFilters.orbitCodes.length > 0) {
      result = _.filter(result, (satellite) => {
        if (!satellite.orbitCode) return false;
        // Check if any selected code is a substring of the satellite's orbit code
        return clientFilters.orbitCodes!.some((selectedCode) =>
          satellite.orbitCode.includes(selectedCode)
        );
      });
    }

    // Apply client-side search (your existing logic is perfect)
    if (debouncedSearch.trim()) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = _.filter(
        result,
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.noradCatId.toString().includes(lowerSearch)
      );
    }

    // Finally, apply client-side sorting
    if (sortConfig.key) {
      result = _.orderBy(result, [sortConfig.key], [sortConfig.direction]);
    }

    return result;
  }, [data, debouncedSearch, sortConfig, clientFilters]); // Add clientFilters to dependency array

  // --- EVENT HANDLERS ---
  const handleSort = (key: SortKey) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  // 4. This handler now ONLY updates client-side filter state.
  const handleFilterApply = (filters: ClientFilters) => {
    setClientFilters(filters);
  };

  // --- RENDER LOGIC (Unchanged) ---
  return (
    <div className="p-4 md:p-8 space-y-8">
      <SearchBar onSearch={setSearch} />

      <Filters
        onApply={handleFilterApply}
        resultCount={processedData.length}
        // The `isUpdating` prop now reflects client-side processing, which is instant.
        // We can keep it tied to `isFetching` to show a spinner during the initial load or background refetches.
        isUpdating={isFetching && !isLoading}
      />

      <div className="mt-8">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <div className="bg-slate-800 p-8 rounded-lg text-center text-red-400">
            <p className="font-semibold">Error Fetching Data</p>
            <p className="text-slate-400 mt-2">
              Could not retrieve satellite information. Please try again later.
            </p>
          </div>
        ) : (
          <SatellitesTable
            data={processedData}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        )}
      </div>
    </div>
  );
}