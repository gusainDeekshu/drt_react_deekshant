import axios from "axios";
import { SatelliteData, FetchParams } from "@/types";

// Define default attributes you're always requesting
const DEFAULT_ATTRIBUTES = [
  "noradCatId",
  "name",
  "launchDate",
  "objectType",
  "countryCode",
  "orbitCode",
  "intlDes"
].join(",");

// Load local data
async function loadLocalData(): Promise<SatelliteData[]> {
  const res = await fetch("/data/satellites.json");
  const json = await res.json();
  return json.data; // since your file has { data: [...] }
}

export const fetchSatellites = async (
  params: FetchParams
): Promise<SatelliteData[]> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const queryParams = {
    objectTypes: params.objectTypes?.join(","),
    orbitCodes: params.orbitCodes?.join(","),
    attributes: DEFAULT_ATTRIBUTES
  };

  if (BASE_URL) {
    const response = await axios.get(BASE_URL, { params: queryParams });
    return response.data.data;
  } else {
    return await loadLocalData();
  }
};
