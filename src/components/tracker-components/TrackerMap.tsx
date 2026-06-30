import React from "react";
import Image from "next/image";
import {
  Plus,
  Minus,
  Navigation,
  Compass,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Sighting } from "./types";

interface TrackerMapProps {
  filteredSightings: Sighting[];
  hoveredSighting: Sighting | null;
  setHoveredSighting: (s: Sighting | null) => void;
  zoomLevel: number;
  pan: { x: number; y: number };
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetLocation: () => void;
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
  zoomLevel,
  pan,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onZoomIn,
  onZoomOut,
  onResetLocation,
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

      {/* Map Image and Marker Container */}
      <div
        className={`w-full h-full relative transition-transform duration-300 ease-out ${zoomLevel > 1 ? "cursor-grab" : ""
          } ${isDragging ? "cursor-grabbing" : ""}`}
        style={{
          transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
          transformOrigin: "center"
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
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
          onClick={onRefreshMap}
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
          onClick={onZoomIn}
          className="w-10 h-10 rounded-full bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 shadow-xl transition-all duration-150 border border-stone-200 active:scale-95 cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          className="w-10 h-10 rounded-full bg-white text-stone-700 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 shadow-xl transition-all duration-150 border border-stone-200 active:scale-95 cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Reset / Center Map */}
        <button
          onClick={onResetLocation}
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
  );
}
