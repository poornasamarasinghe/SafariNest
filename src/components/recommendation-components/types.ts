// Shared types for Recommendation page components

export type AnimalType = "leopard" | "elephant" | "sloth_bear";
export type TimeOfDay = "dawn" | "midday" | "afternoon";
export type WeatherType = "sunny" | "rainy" | "overcast";
export type SeasonType = "dry" | "wet";

export interface PredictionResult {
  path: string;
  hotspotX: number;
  hotspotY: number;
  hotspotLabel: string;
  probability: number;
  density: "High" | "Medium" | "Low";
  vehicles: number;
  gridSector: string;
}
