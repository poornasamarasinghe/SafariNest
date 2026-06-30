// Shared types for Tracker page components

export interface Sighting {
  id: string;
  animal: "Leopard" | "Elephant" | "Sloth Bear" | "Birds";
  name: string;
  timeAgo: string;
  timestamp: number; // in minutes ago for filtering
  block: string;
  location: string;
  lat: number; // percentage from top (0-100)
  lng: number; // percentage from left (0-100)
}

// Initial mock sightings data
export const INITIAL_SIGHTINGS: Sighting[] = [
  {
    id: "s1",
    animal: "Leopard",
    name: "Sri Lankan Leopard",
    timeAgo: "2m ago",
    timestamp: 2,
    block: "Block 1",
    location: "Palatupana",
    lat: 38.5,
    lng: 48.2
  },
  {
    id: "s2",
    animal: "Elephant",
    name: "Asian Elephant Herd",
    timeAgo: "15m ago",
    timestamp: 15,
    block: "Block 5",
    location: "Katagamuwa",
    lat: 58.2,
    lng: 65.4
  },
  {
    id: "s3",
    animal: "Sloth Bear",
    name: "Sloth Bear",
    timeAgo: "34m ago",
    timestamp: 34,
    block: "Block 2",
    location: "Manik River",
    lat: 48.9,
    lng: 54.1
  },
  {
    id: "s4",
    animal: "Leopard",
    name: "Sri Lankan Leopard",
    timeAgo: "1h ago",
    timestamp: 60,
    block: "Block 1",
    location: "Leopard Rock",
    lat: 28.1,
    lng: 35.8
  },
  {
    id: "s5",
    animal: "Birds",
    name: "Crested Serpent Eagle",
    timeAgo: "2h ago",
    timestamp: 120,
    block: "Block 3",
    location: "Heenwewa Tank",
    lat: 22.4,
    lng: 51.3
  },
  {
    id: "s6",
    animal: "Elephant",
    name: "Lone Bull Elephant",
    timeAgo: "3h ago",
    timestamp: 180,
    block: "Block 1",
    location: "Buthawa Lagoon",
    lat: 42.1,
    lng: 70.8
  },
  {
    id: "s7",
    animal: "Leopard",
    name: "Sri Lankan Leopard",
    timeAgo: "4h ago",
    timestamp: 240,
    block: "Block 4",
    location: "Pilinnawa Plain",
    lat: 72.5,
    lng: 46.9
  },
  {
    id: "s8",
    animal: "Sloth Bear",
    name: "Sloth Bear Trio",
    timeAgo: "5h ago",
    timestamp: 300,
    block: "Block 2",
    location: "Talgasmankada",
    lat: 51.0,
    lng: 39.5
  },
  {
    id: "s9",
    animal: "Birds",
    name: "Flock of Painted Storks",
    timeAgo: "6h ago",
    timestamp: 360,
    block: "Block 1",
    location: "Uraniya Plain",
    lat: 34.8,
    lng: 42.1
  }
];
