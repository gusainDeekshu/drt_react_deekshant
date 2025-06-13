// types/index.ts

export interface SatelliteData {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string | null;
  decayDate: string | null;
  objectType: string;
  launchSiteCode: string;
  countryCode: string;
  orbitCode: string;
}

export interface FetchParams {
  objectTypes?: string[];
  attributes?: string[];
  orbitCodes?: string[];
}

// --- ADDITIONS FOR SORTING FUNCTIONALITY ---

/**
 * A type-safe representation of a sortable column key.
 * It uses the `keyof` operator to ensure that we can only sort
 * by properties that actually exist on the SatelliteData interface.
 * e.g., "name" | "noradCatId" | "launchDate"
 */
export type SortKey = keyof SatelliteData;

/**
 * Defines the structure for the sorting state used in the Overview component
 * and passed to the SatellitesTable component.
 */
export interface SortConfig {
  key: SortKey;
  direction: 'asc' | 'desc';
}