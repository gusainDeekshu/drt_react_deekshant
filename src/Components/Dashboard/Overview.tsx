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

interface ClientFilters {
  orbitCodes?: string[];
}

export default function Overview() {
  // --- STATE MANAGEMENT ---

  const [params, setParams] = useState<FetchParams>({
    attributes: [
      "noradCatId",
      "name",
      "launchDate",
      "objectType",
      "countryCode",
      "orbitCode",
    ],
  });
  const [clientFilters, setClientFilters] = useState<ClientFilters>({});
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const debouncedSearch = useDebounce(search, 300);

  // --- DATA FETCHING ---
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<SatelliteData[]>({
    queryKey: ["satellites", params],
    queryFn: () => fetchSatellites(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // --- DATA PROCESSING ---
  const processedData = useMemo(() => {
    if (!data) return [];
    let result = [...data];

    // --- THIS IS THE UPDATED LOGIC ---
    // Apply client-side filters with partial matching
    if (clientFilters.orbitCodes && clientFilters.orbitCodes.length > 0) {
      result = _.filter(result, (satellite) => {
        // A satellite should be included if its orbitCode is not null/empty...
        if (!satellite.orbitCode) {
          return false;
        }
        // ...and AT LEAST ONE of the selected filter codes is a substring of the satellite's orbitCode.
        // e.g., if selected is ["MEO"] and satellite.orbitCode is "NSO/MEO", it's a match.
        // This is the "type guard"
        if (clientFilters.orbitCodes && clientFilters.orbitCodes.length > 0) {
          return clientFilters.orbitCodes.some((selectedCode) =>
            satellite.orbitCode.includes(selectedCode)
          );
        } else {
          return false;
        }
      });
    }
    // --- END OF UPDATED LOGIC ---

    // Then, apply client-side search
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
  }, [data, debouncedSearch, sortConfig, clientFilters]);

  // --- EVENT HANDLERS ---
  const handleSort = (key: SortKey) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleFilterApply = (filters: {
    objectTypes?: string[];
    orbitCodes?: string[];
  }) => {
    setParams((prev) => ({
      ...prev,
      objectTypes: filters.objectTypes,
    }));
    setClientFilters({
      orbitCodes: filters.orbitCodes,
    });
  };

  // --- RENDER LOGIC ---
  return (
    <div className="p-4 md:p-8 space-y-8">
      <SearchBar onSearch={setSearch} />

      <Filters
        onApply={handleFilterApply}
        resultCount={processedData.length}
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
