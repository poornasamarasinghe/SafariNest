// Shared types for ReportSighting page components

export type AnimalType = "leopard" | "elephant" | "sloth_bear" | "sambar_deer" | "crocodile" | "other";
export type WeatherType = "sunny" | "overcast" | "rainy" | "windy";

export interface SightingReport {
  id: string;
  animalType: AnimalType;
  count: number;
  latitude: number;
  longitude: number;
  sectorName: string;
  weather: WeatherType;
  fieldNotes: string;
  evidenceName: string | null;
  timestamp: string;
}

// Yala Block I map bounds for coordinate conversion
export const MAP_BOUNDS = {
  minLat: 6.3650,
  maxLat: 6.4250,
  minLng: 81.4250,
  maxLng: 81.5250,
};
