// lib/api.ts

import axios from "axios";
import { SatelliteData, FetchParams } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://<Your_URL>";

export const fetchSatellites = async (
  params: FetchParams
): Promise<SatelliteData[]> => {
  // We filter out undefined/null values before creating params
  const queryParams = {
    objectTypes: params.objectTypes?.join(","),
    orbitCodes: params.orbitCodes?.join(","), // <-- ADD THIS LINE
    attributes: params.attributes?.join(","),
  };

  const response = await axios.get(BASE_URL, { params: queryParams });
  return response.data.data;
};