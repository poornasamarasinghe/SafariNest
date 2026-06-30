"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Footprints,
  Plus,
  Minus,
  Navigation,
  Compass,
  RefreshCw,
  ChevronDown,
  Info
} from "lucide-react";

// Types for wildlife sightings
interface Sighting {
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

// Initial mock sightings matching the screenshot details and extra markers for interactivity
const INITIAL_SIGHTINGS: Sighting[] = [
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

export default function TrackerPage() {
  // Filter States
  const [animalFilter, setAnimalFilter] = useState<string>("All");
  const [zoneFilter, setZoneFilter] = useState<string>("All Blocks");
  const [timeFilter, setTimeFilter] = useState<string>("1h"); // '1h' | '3h' | 'today'

  // Sighting Data State
  const [sightings, setSightings] = useState<Sighting[]>(INITIAL_SIGHTINGS);

  // Map Navigation / Zoom State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Interactive Tooltip Sighting
  const [hoveredSighting, setHoveredSighting] = useState<Sighting | null>(null);

  // Auto-centering effect when zone changes (simulating focus)
  useEffect(() => {
    if (zoneFilter === "All Blocks") {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoomLevel(1.5);
      // Pan towards specific coordinates depending on the selected block
      switch (zoneFilter) {
        case "Block 1":
          setPan({ x: 30, y: 40 });
          break;
        case "Block 2":
          setPan({ x: 0, y: 10 });
          break;
        case "Block 3":
          setPan({ x: -10, y: 80 });
          break;
        case "Block 4":
          setPan({ x: 10, y: -80 });
          break;
        case "Block 5":
          setPan({ x: -80, y: -40 });
          break;
        default:
          setPan({ x: 0, y: 0 });
      }
    }
  }, [zoneFilter]);

  // Handle Drag / Pan of Map
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel === 1) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    // Bound the pan value based on zoom
    const bound = (zoomLevel - 1) * 200;
    setPan({
      x: Math.max(-bound, Math.min(bound, newX)),
      y: Math.max(-bound, Math.min(bound, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom helpers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(2.5, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(1, prev - 0.25);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetLocation = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setZoneFilter("All Blocks");
  };

  // Refresh Sighting Data (Simulation)
  const handleRefreshMap = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Randomly adjust marker positions slightly to simulate real-time updating
      setSightings(prev =>
        prev.map(s => ({
          ...s,
          lat: Math.max(15, Math.min(85, s.lat + (Math.random() - 0.5) * 4)),
          lng: Math.max(15, Math.min(85, s.lng + (Math.random() - 0.5) * 4))
        }))
      );
    }, 1000);
  };

  // Filter Sighting lists
  const filteredSightings = sightings.filter(s => {
    // 1. Animal Filter
    if (animalFilter !== "All" && s.animal !== animalFilter) return false;

    // 2. Zone Filter
    if (zoneFilter !== "All Blocks" && s.block !== zoneFilter) return false;

    // 3. Time Filter
    if (timeFilter === "1h" && s.timestamp > 60) return false;
    if (timeFilter === "3h" && s.timestamp > 180) return false;
    // 'today' shows all initial entries (up to 6 hours)

    return true;
  });

  // Dynamically calculate sidebar stats based on current visible filtered sightings
  const activeZoneText = zoneFilter !== "All Blocks" ? zoneFilter : "Block 2";
  const totalVisibleHits = filteredSightings.length;

  return (
    <div className="flex-1 bg-[#FAF9F5] text-stone-900 font-sans min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-12 pb-8 flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#102110]">
          Track Wildlife in Real Time
        </h1>
        <p className="max-w-[720px] text-sm md:text-base text-[#556052] leading-relaxed">
          Experience the pulse of Yala National Park. Our AI-driven tracking network fuses field
          ranger data with satellite infrared imaging to bring you live sightings of Sri Lanka's most
          elusive predators and giants.
        </p>
      </section>

      {/* Interactive Sighting Area */}
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Stats & Sighting Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Row of stats cards */}
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">

            {/* Most Seen Today Card */}
            <div className="flex-1 bg-[#F5F3ED] rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between relative min-h-[120px]">
              <div>
                <span className="text-[9px] font-bold tracking-wider text-[#8F5C1B] uppercase block mb-1">
                  Most Seen Today
                </span>
                <h3 className="text-xl font-bold text-[#102110]">Leopard (12)</h3>
              </div>
              <p className="text-[11px] text-[#707070] mt-2">Primarily in Block 1</p>
              <div className="absolute top-5 right-5 text-[#8F5C1B]/80">
                <Footprints className="w-5 h-5 transform rotate-45" />
              </div>
            </div>

            {/* Active Zone & Total Hits Row */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Active Zone */}
              <div className="bg-white rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between min-h-[120px]">
                <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block mb-1">
                  Active Zone
                </span>
                <h3 className="text-xl font-bold text-[#102110]">{activeZoneText}</h3>
                <span className="h-2 block"></span>
              </div>
              {/* Total Hits */}
              <div className="bg-white rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between min-h-[120px]">
                <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block mb-1">
                  Total Hits
                </span>
                <h3 className="text-2xl font-bold text-[#102110]">{totalVisibleHits}</h3>
                <span className="h-2 block"></span>
              </div>
            </div>

          </div>

          {/* Live Sighting Feed Card */}
          <div className="bg-[#1E2D27] rounded-2xl p-6 text-white flex flex-col flex-1 shadow-lg min-h-[460px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg tracking-tight">Live Sighting Feed</h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              </div>
              <Info className="w-4 h-4 text-stone-400 cursor-help" />
            </div>

            {/* Scrollable feed list */}
            <div className="flex-grow flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {filteredSightings.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-stone-400 gap-2">
                  <Footprints className="w-8 h-8 opacity-45" />
                  <p className="text-sm">No live sightings match the current filters.</p>
                </div>
              ) : (
                filteredSightings.map((sighting) => (
                  <div
                    key={sighting.id}
                    className="flex items-center justify-between pb-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 p-2 rounded-xl transition duration-150"
                  >
                    <div className="flex items-center gap-4">
                      {/* Round Indicator */}
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Footprints
                          className={`w-4 h-4 transform rotate-12 ${sighting.animal === "Leopard"
                              ? "text-orange-400"
                              : sighting.animal === "Elephant"
                                ? "text-teal-400"
                                : sighting.animal === "Sloth Bear"
                                  ? "text-stone-300"
                                  : "text-amber-400"
                            }`}
                        />
                      </div>

                      {/* Sighting Text */}
                      <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight tracking-wide">
                          {sighting.name}
                        </span>
                        <span className="text-[11px] text-[#A2ADA7] mt-0.5">
                          Yala {sighting.block} • {sighting.location}
                        </span>
                      </div>
                    </div>

                    {/* Sighting Duration */}
                    <span className="text-xs font-semibold text-[#FFB080] shrink-0 text-right">
                      {sighting.timeAgo}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Bottom history link */}
            <div className="pt-5 mt-auto flex justify-center border-t border-white/10">
              <Link
                href="/analytics"
                className="text-stone-300 hover:text-white transition duration-200 text-[10px] tracking-[0.15em] font-bold uppercase underline"
              >
                View All History
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column: Zoomable Satellite Map & Floating Filters */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 h-[650px] md:h-[750px] lg:h-[800px] bg-stone-900 select-none">

          {/* Map Image and Marker Container */}
          <div
            className={`w-full h-full relative transition-transform duration-300 ease-out ${zoomLevel > 1 ? "cursor-grab" : ""
              } ${isDragging ? "cursor-grabbing" : ""}`}
            style={{
              transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
              transformOrigin: "center"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src="/yala_tracker_map.png"
              alt="Yala National Park Aerial Tracking Map"
              fill
              priority
              className="object-cover pointer-events-none opacity-85"
            />

            {/* Map Sighting Hotspot Pins */}
            {filteredSightings.map((s) => {
              const isActiveHovered = hoveredSighting?.id === s.id;
              let pinColor = "bg-orange-500 border-orange-300";
              let ringColor = "bg-orange-400";

              if (s.animal === "Elephant") {
                pinColor = "bg-teal-500 border-teal-300";
                ringColor = "bg-teal-400";
              } else if (s.animal === "Sloth Bear") {
                pinColor = "bg-stone-300 border-stone-100";
                ringColor = "bg-stone-200";
              } else if (s.animal === "Birds") {
                pinColor = "bg-amber-400 border-amber-200";
                ringColor = "bg-amber-300";
              }

              return (
                <div
                  key={s.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  style={{ top: `${s.lat}%`, left: `${s.lng}%` }}
                  onClick={() => setHoveredSightingToggle(s)}
                  onMouseEnter={() => setHoveredSighting(s)}
                  onMouseLeave={() => setHoveredSighting(null)}
                >
                  {/* Glowing Pulse Ring */}
                  <span className="absolute -inset-2 flex h-7 w-7 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${ringColor}`}></span>
                  </span>

                  {/* Marker Dot */}
                  <div
                    className={`relative w-3.5 h-3.5 rounded-full border-2 shadow-md transition-all duration-200 ${pinColor} ${isActiveHovered ? "scale-150 shadow-lg" : "scale-100"
                      }`}
                  />

                  {/* Desktop Tooltip overlay */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-stone-900/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[11px] font-medium pointer-events-none transition-all duration-200 shadow-xl border border-white/10 z-30 flex flex-col gap-0.5 items-center ${isActiveHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none hidden"
                      }`}
                  >
                    <span className="font-bold whitespace-nowrap">{s.name}</span>
                    <span className="text-[9px] text-[#A2ADA7] whitespace-nowrap">
                      {s.location} • {s.timeAgo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Filter Overlay */}
          <div className="absolute top-6 left-6 z-20 w-[280px] bg-white/75 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">

            {/* Title */}
            <div>
              <h3 className="font-bold text-base text-stone-900 tracking-tight">Tracker Filters</h3>
            </div>

            {/* Animal Type Pill Filter */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-stone-500 tracking-wider uppercase">
                Animal Type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["All", "Leopard", "Elephant", "Sloth Bear", "Birds"].map((type) => {
                  const isActive = animalFilter === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setAnimalFilter(type)}
                      className={`text-[10px] font-medium py-1 px-2.5 rounded-full transition duration-150 cursor-pointer ${isActive
                          ? "bg-[#1E2D27] text-white shadow-sm"
                          : "bg-white/80 text-stone-700 hover:bg-stone-200 border border-stone-200/40"
                        }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Safari Zone Dropdown Select */}
            <div className="flex flex-col gap-1.5 relative">
              <span className="text-[9px] font-bold text-stone-500 tracking-wider uppercase">
                Safari Zone
              </span>
              <div className="relative w-full">
                <select
                  value={zoneFilter}
                  onChange={(e) => setZoneFilter(e.target.value)}
                  className="bg-white/80 border border-stone-200/60 text-stone-800 text-xs rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full appearance-none pr-8 cursor-pointer font-medium"
                >
                  <option value="All Blocks">All Blocks</option>
                  <option value="Block 1">Block 1</option>
                  <option value="Block 2">Block 2</option>
                  <option value="Block 3">Block 3</option>
                  <option value="Block 4">Block 4</option>
                  <option value="Block 5">Block 5</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
              </div>
            </div>

            {/* Time Range Radios */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-stone-500 tracking-wider uppercase">
                Time Range
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Last 1h", value: "1h" },
                  { label: "Last 3h", value: "3h" },
                  { label: "Today", value: "today" }
                ].map((t) => {
                  const isChecked = timeFilter === t.value;
                  return (
                    <label
                      key={t.value}
                      className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-700 select-none group"
                    >
                      <input
                        type="radio"
                        name="timeRange"
                        value={t.value}
                        checked={isChecked}
                        onChange={() => setTimeFilter(t.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-3.5 h-3.5 rounded-full border border-stone-300 flex items-center justify-center transition duration-150 ${isChecked
                            ? "border-[#8F5C1B] bg-[#FAF9F5]"
                            : "group-hover:border-stone-400 bg-white"
                          }`}
                      >
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-[#8F5C1B]" />}
                      </div>
                      <span>{t.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefreshMap}
              disabled={isRefreshing}
              className="mt-2 w-full bg-[#8F5C1B] hover:bg-[#a66d24] disabled:bg-[#8F5C1B]/70 text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-md select-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "REFRESHING..." : "REFRESH MAP"}</span>
            </button>

          </div>

          {/* Floating Map Zoom / Center Controls (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2.5">
            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 rounded-full bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 shadow-xl transition-all duration-150 border border-stone-200 active:scale-95 cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 rounded-full bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 shadow-xl transition-all duration-150 border border-stone-200 active:scale-95 cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Reset / Center Map */}
            <button
              onClick={handleResetLocation}
              className="w-10 h-10 rounded-full bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 shadow-xl transition-all duration-150 border border-stone-200 active:scale-95 cursor-pointer"
              title="Recenter Map"
            >
              <Navigation className="w-4 h-4 transform rotate-45" />
            </button>
          </div>

          {/* Map Scale or Compass Indicator (Top-Right) */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-stone-900/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-white text-[10px] tracking-wide font-medium">
            <Compass className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>YALA BLOCK I SATELLITE ARRAY</span>
          </div>

        </div>

      </main>


    </div>
  );
}

// Temporary helper to handle click events on mobile for tooltip toggling
function setHoveredSightingToggle(sighting: Sighting) {
  // Can expand into a modal details view or keep tooltip active on mobile
}
