import React from "react";
import { Navigation, Compass, Map, Info } from "lucide-react";

interface LocationMapProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  onMapClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isLocating: boolean;
  mapCoordsX: number;
  mapCoordsY: number;
  sectorName: string;
  locationAccuracy: string;
}

export default function LocationMap({
  mapRef,
  onMapClick,
  isLocating,
  mapCoordsX,
  mapCoordsY,
  sectorName,
  locationAccuracy,
}: LocationMapProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-stone-200/40 p-5 flex flex-col gap-4 relative select-none">

      {/* Card Title & Live Badge */}
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <h3 className="font-bold text-stone-900 text-sm tracking-tight flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-600" />
          Sighting Location
        </h3>
        <span className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          Live GPS
        </span>
      </div>

      {/* Map Box */}
      <div
        ref={mapRef}
        onClick={onMapClick}
        className="relative h-64 bg-stone-950 border border-stone-200/60 rounded-xl overflow-hidden shadow-inner cursor-crosshair group"
      >
        {/* Topographic map drawn using nested SVGs */}
        <svg viewBox="0 0 400 240" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-85 z-0">
          {/* Grid Lines */}
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
            <line x1="100" y1="0" x2="100" y2="240" />
            <line x1="200" y1="0" x2="200" y2="240" />
            <line x1="300" y1="0" x2="300" y2="240" />
            <line x1="0" y1="60" x2="400" y2="60" />
            <line x1="0" y1="120" x2="400" y2="120" />
            <line x1="0" y1="180" x2="400" y2="180" />
          </g>

          {/* Ocean (Yala Coast on Southeast) */}
          <path d="M 280,240 Q 320,180 400,160 L 400,240 Z" fill="#0f2b3c" className="opacity-70" />
          <path d="M 280,240 Q 320,180 400,160" fill="none" stroke="#1c6b90" strokeWidth="2.5" strokeDasharray="4 2" className="opacity-80" />

          {/* Contours (Hills / Savannas / Dunes) */}
          <g fill="none" stroke="rgba(110, 160, 100, 0.12)" strokeWidth="1">
            {/* Ridge 1 */}
            <path d="M 50,40 C 90,30 120,60 140,90 C 160,120 120,150 90,140 C 60,130 30,100 50,40 Z" />
            <path d="M 60,50 C 95,42 110,65 125,90 C 140,115 110,135 90,128 C 70,120 45,95 60,50 Z" />
            <path d="M 75,65 C 98,60 105,75 115,90 C 125,105 105,120 90,115 C 75,110 65,90 75,65 Z" />
            {/* Ridge 2 (Near Coast) */}
            <path d="M 250,90 C 290,70 330,80 340,110 C 350,140 310,160 280,150 C 250,140 220,110 250,90 Z" />
            <path d="M 270,100 C 300,85 320,95 325,110 C 330,125 305,140 280,132 C 255,125 240,110 270,100 Z" />
          </g>

          {/* Main Water Tanks (e.g. Heenwewa) */}
          <path d="M 120,65 Q 130,55 140,68 T 160,60 T 145,85 T 120,65" fill="#0f2638" stroke="#1c486c" strokeWidth="1" className="opacity-90" />

          {/* Coast Label */}
          <text x="330" y="210" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="bold" letterSpacing="1.5" transform="rotate(-15 330 210)">INDIAN OCEAN</text>

          {/* Sectors Markers */}
          <text x="35" y="20" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">BLOCK I - PALATUPANA</text>
          <text x="250" y="30" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">BUTHAWA LAGOON</text>
          <text x="110" y="190" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">URANIYA PLAIN</text>
        </svg>

        {/* Grid Overlay Lines (Fine details) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay" />

        {/* Live GPS scanning animation */}
        {isLocating && (
          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
            <Compass className="w-8 h-8 text-amber-500 animate-spin mb-1.5" />
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest animate-pulse">Syncing Telemetry Satellites...</span>
          </div>
        )}

        {/* Sighting Marker Pin */}
        {!isLocating && (
          <div
            style={{ left: `${mapCoordsX}%`, top: `${mapCoordsY}%` }}
            className="absolute z-10 -translate-x-1/2 -translate-y-[85%] transition-all duration-300 ease-out pointer-events-none"
          >
            {/* Pulse Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-orange-500/40 bg-orange-500/10 animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-orange-500/50 bg-orange-500/20" />

            {/* SVG Pin Marker */}
            <svg className="w-8 h-8 text-orange-500 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* Interactive Map Helper Hint */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-md rounded-lg px-2.5 py-1 text-[9px] font-bold text-stone-300 border border-white/5 shadow-md">
            <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            Click anywhere on the map to manually pin sighting
          </div>
        </div>
      </div>

      {/* Map Footer Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-2 divide-x divide-stone-100">
        {/* Sector display */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">PROBABILITY RADIUS</span>
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5 truncate">
            <Navigation className="w-3.5 h-3.5 text-amber-600 rotate-45 shrink-0" />
            {sectorName}
          </span>
        </div>

        {/* Accuracy display */}
        <div className="flex flex-col gap-1 pl-4">
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">ACCURACY</span>
          <span className="text-xs font-bold text-stone-800 font-mono tracking-tight">{locationAccuracy}</span>
        </div>
      </div>

    </div>
  );
}
