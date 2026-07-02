export interface PackageFeature {
  text: string;
  icon: string;
}

export interface PackageAnalytics {
  title: string;
  text: string;
  tags: string[];
}

export interface PackageEssentials {
  duration: string;
  safariType: string;
  timeSlots: string;
  facilities: string[];
}

export interface SafariPackage {
  id: string;
  name: string;
  image: string;
  sightingChance: string | null;
  zone: string;
  animal: string;
  duration: string;
  features: PackageFeature[];
  price: number;
  bookingPackageId: string;
  
  // Details Page Specific Fields
  heroBadge: string;
  descriptionTitle: string;
  descriptionParagraphs: string[];
  analyticsCard: PackageAnalytics;
  essentials: PackageEssentials;
}

export const ALL_PACKAGES: SafariPackage[] = [
  {
    id: "block-1-leopard",
    name: "HALF DAY",
    image: "/images/package-leopard.png",
    sightingChance: "85% Sighting Chance",
    zone: "Block 1",
    animal: "Leopard",
    duration: "Morning",
    features: [
      { text: "AI-Aided Sighting", icon: "Cpu" },
      { text: "Modified 4x4 Jeep", icon: "Car" },
      { text: "Expert Tracker", icon: "UserCheck" }
    ],
    price: 120,
    bookingPackageId: "dawn-predator",
    heroBadge: "EXCLUSIVE BLOCK 1 ACCESS",
    descriptionTitle: "The Immersive Leopard Experience",
    descriptionParagraphs: [
      "Embark on a specialized tracking mission within the heart of Block 1, the most leopard-dense region of Yala National Park. Unlike standard safaris, our 'Leopard Prime Tracker' package is designed for the serious wildlife enthusiast. Guided by elite trackers who have spent decades deciphering the subtle signs of the savanna, you will navigate through rugged terrains and hidden watering holes where the apex predator of Sri Lanka thrives.",
      "Our custom-built luxury 4x4 vehicles provide unobstructed 360-degree views, ensuring every twitch of a tail or shimmer of a coat is captured. We utilize real-time AI-assisted wildlife sighting data to increase encounter probabilities, making this the most technologically advanced yet raw safari experience available."
    ],
    analyticsCard: {
      title: "Advanced Sighting Analytics",
      text: "Our trackers are equipped with high-tech tablets featuring live sighting heatmaps, providing a 42% higher chance of leopard sightings compared to standard tours.",
      tags: ["Live GPS Tracking", "Thermal Imaging Ready"]
    },
    essentials: {
      duration: "6 Hours (Half Day)",
      safariType: "Private Luxury 4x4 Jeep",
      timeSlots: "Morning (5:30 AM) or Evening (2:30 PM)",
      facilities: [
        "4x4 Luxury Jeep",
        "Professional Expert Tracker",
        "Bottled Water & Refreshments",
        "Park Entry Fees & Insurance"
      ]
    }
  },
  {
    id: "gentle-giants",
    name: "FULL DAY",
    image: "/images/package-elephant.png",
    sightingChance: null,
    zone: "Elephant Corridors",
    animal: "Elephant",
    duration: "Full Day",
    features: [
      { text: "Elephant Corridor Focus", icon: "Route" },
      { text: "Low-noise Electric Hybrid", icon: "Leaf" },
      { text: "Kid-Friendly Guide", icon: "Users" }
    ],
    price: 180,
    bookingPackageId: "elephant-corridor",
    heroBadge: "ELEPHANT CORRIDOR EXPEDITION",
    descriptionTitle: "The Majestic Elephant Gathering",
    descriptionParagraphs: [
      "Venture deep into the designated Elephant Corridors of Yala. This expedition is carefully timed and routed to observe the magnificent herds as they migrate between water basins. Watch matriarchs lead their families, calves playing in the mud, and massive bulls foraging in the scrub.",
      "Our eco-friendly, low-noise hybrid vehicles ensure we can approach closely without disturbing the animals, offering an intimate look at their complex social behaviors. Under the guidance of our expert naturalist guide, you will learn to read footprints and track movement."
    ],
    analyticsCard: {
      title: "Corridor Movement Tracker",
      text: "Our custom satellite-linked trackers provide real-time herd telemetry, allowing us to locate grazing groups with a 90% accuracy rate while maintaining a respectful distance.",
      tags: ["Satellite Telemetry", "Eco Hybrid Drive"]
    },
    essentials: {
      duration: "Full Day",
      safariType: "Low-Noise Electric Hybrid",
      timeSlots: "Full Day (6:00 AM - 6:00 PM)",
      facilities: [
        "Low-Noise Hybrid Jeep",
        "Expert Naturalist Guide",
        "Gourmet Lunch & Snacks",
        "Park Entry Fees & Insurance"
      ]
    }
  },
  {
    id: "block-5-wilderness",
    name: "Block 5 Hidden Wilderness",
    image: "/images/package-bear.png",
    sightingChance: null,
    zone: "Block 5",
    animal: "Sloth Bear",
    duration: "Full Day",
    features: [
      { text: "Sloth Bear Priority", icon: "Target" },
      { text: "Off-Path Navigation", icon: "Compass" },
      { text: "Full Day Immersion", icon: "Clock" }
    ],
    price: 75,
    bookingPackageId: "night-ranger",
    heroBadge: "EXCLUSIVE BLOCK 5 WILDERNESS",
    descriptionTitle: "The Untamed Hidden Wilderness",
    descriptionParagraphs: [
      "Explore the rugged terrain of Block 5, Yala's hidden wilderness known for its dense scrub forest and rich bear populations. This off-the-beaten-path safari takes you through paths less traveled, offering an exclusive and private wilderness experience.",
      "Our expert trackers leverage their deep knowledge of the seasonal Palu tree blooms to guide you directly to sloth bear feeding areas. Enjoy a fully immersive, full-day experience away from the tourist crowds."
    ],
    analyticsCard: {
      title: "Wilderness Activity Prediction",
      text: "Using microclimate sensors and historical sighting datasets, our predictive models anticipate wildlife movement at local watering holes with exceptional accuracy.",
      tags: ["Microclimate Analytics", "Off-Path Navigation Ready"]
    },
    essentials: {
      duration: "Full Day",
      safariType: "Modified 4x4 Jeep",
      timeSlots: "Full Day (6:00 AM - 6:00 PM)",
      facilities: [
        "Off-road 4x4 Jeep",
        "Expert Sloth Bear Tracker",
        "Gourmet Lunch & Hydration Pack",
        "Park Entry Fees & Insurance"
      ]
    }
  }
];

export function getPackageById(id: string): SafariPackage | undefined {
  return ALL_PACKAGES.find(pkg => pkg.id === id);
}

export function getMergedPackage(dbPkg: any): SafariPackage {
  const fallbackId = dbPkg.id === "leopard-tracker-elite" ? "block-1-leopard" 
                   : dbPkg.id === "gentle-giants-expedition" ? "gentle-giants"
                   : dbPkg.id;
  
  const fallback = ALL_PACKAGES.find(p => p.id === fallbackId) || ALL_PACKAGES[0];
  
  return {
    ...fallback,
    id: dbPkg.id,
    name: dbPkg.name || fallback.name,
    price: dbPkg.price !== undefined ? Number(dbPkg.price) : fallback.price,
    image: dbPkg.image || fallback.image,
    descriptionTitle: dbPkg.name || fallback.descriptionTitle,
    descriptionParagraphs: dbPkg.description 
      ? [dbPkg.description, ...(fallback.descriptionParagraphs.slice(1))]
      : fallback.descriptionParagraphs,
    zone: dbPkg.zone || fallback.zone,
    duration: dbPkg.duration || fallback.duration,
    essentials: {
      ...fallback.essentials,
      duration: dbPkg.duration || fallback.essentials.duration,
    }
  };
}
