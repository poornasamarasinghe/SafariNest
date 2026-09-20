// Shared types for Tracker page components

export type AnimalKey =
  | "Leopard"
  | "Elephant"
  | "Sloth Bear"
  | "Bear"
  | "Crocodile"
  | "Peacock"
  | "Birds"
  | "Deer"
  | "Sri Lankan Smbar";

export interface Sighting {
  id: string;
  animal: AnimalKey;
  name: string;
  timeAgo: string;
  timestamp: number; // minutes since sighting — recomputed live from createdAt
  createdAt: number; // Unix epoch ms — source of truth for time filters
  block: string;
  location: string;
  lat: number; // GPS latitude  (decimal degrees)
  lng: number; // GPS longitude (decimal degrees)
}
