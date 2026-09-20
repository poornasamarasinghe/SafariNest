"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  RefreshCw,
  ChevronDown,
  Compass,
} from "lucide-react";
import { Sighting } from "./types";

// Load the Leaflet map client-side only (Leaflet touches `window` on import)
const TrackerLeafletMap = dynamic(() => import("./TrackerLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-400 text-sm">
      Loading map…
    </div>
  ),
});

interface TrackerMapProps {
  filteredSightings: Sighting[];
  hoveredSighting: Sighting | null;
  setHoveredSighting: (s: Sighting | null) => void;
  animalFilter: string;
  setAnimalFilter: (v: string) => void;
  zoneFilter: string;
  setZoneFilter: (v: string) => void;
  timeFilter: string;
  setTimeFilter: (v: string) => void;
  isRefreshing: boolean;
  onRefreshMap: () => void;
}

export default function TrackerMap({
  filteredSightings,
  hoveredSighting,
  setHoveredSighting,
  animalFilter,
  setAnimalFilter,
  zoneFilter,
  setZoneFilter,
  timeFilter,
  setTimeFilter,
  isRefreshing,
  onRefreshMap,
}: TrackerMapProps) {
  return (
    <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 h-[650px] md:h-[750px] lg:h-[800px] bg-stone-900 select-none">

      {/* Real Leaflet map — fills the entire card */}
      <TrackerLeafletMap
        filteredSightings={filteredSightings}
        hoveredSighting={hoveredSighting}
        setHoveredSighting={setHoveredSighting}
        zoneFilter={zoneFilter}
      />

      {/* Floating Filter Overlay */}
      <div className="absolute top-6 left-6 z-[1000] w-[280px] bg-white/75 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">

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
            {["All", "Leopard", "Elephant", "Sloth Bear", "Bear", "Crocodile", "Peacock", "Birds", "Deer"].map((type) => {
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
          onClick={onRefreshMap}
          disabled={isRefreshing}
          className="mt-2 w-full bg-[#8F5C1B] hover:bg-[#a66d24] disabled:bg-[#8F5C1B]/70 text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-md select-none"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{isRefreshing ? "REFRESHING..." : "REFRESH MAP"}</span>
        </button>

      </div>

      {/* Map badge (Top-Right) */}
      <div className="absolute top-6 right-6 z-[1000] flex items-center gap-2 bg-stone-900/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-white text-[10px] tracking-wide font-medium">
        <Compass className="w-3.5 h-3.5 animate-pulse text-amber-400" />
        <span>YALA BLOCK I LIVE TRACKER</span>
      </div>

      {/* Pin count badge (Bottom-Right) */}
      {filteredSightings.length > 0 && (
        <div className="absolute bottom-6 right-6 z-[1000] bg-stone-900/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-white text-[10px] font-semibold">
          {filteredSightings.length} sighting{filteredSightings.length !== 1 ? "s" : ""} visible
        </div>
      )}

    </div>
  );
}
