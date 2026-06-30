import Image from "next/image";
import {
  Activity,
  Truck,
  Plus,
  Minus,
  Locate,
  Info,
  Sparkles,
  Wifi,
  Compass,
} from "lucide-react";
import { PredictionResult } from "./types";

interface HotspotMapProps {
  activePrediction: PredictionResult;
  isScanning: boolean;
  scanProgress: number;
  showTooltip: boolean;
  setShowTooltip: (v: boolean) => void;
  setZoomLevel: (fn: (prev: number) => number) => void;
  onRecenter: () => void;
}

export default function HotspotMap({
  activePrediction,
  isScanning,
  scanProgress,
  showTooltip,
  setShowTooltip,
  setZoomLevel,
  onRecenter,
}: HotspotMapProps) {
  return (
    <div className="lg:col-span-8 flex flex-col gap-4">

      {/* Header section */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
          Predictive Hotspot Map
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-stone-200/50 border border-stone-300/30 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">Live Feed</span>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative aspect-[1.7] w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden border-2 border-stone-200/80">

        {/* Topographic Map Background Image */}
        <Image
          src="/safari_map_bg.png"
          alt="National Park Terrain Topology Map"
          fill
          priority
          className="object-cover opacity-85 select-none"
        />

        {/* Grid overlay lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay" />

        {/* Live Telemetry Panel Overlay */}
        <div className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-md border border-white/10 rounded-xl p-4 w-60 z-30 shadow-2xl select-none">
          <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
            <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Telemetry</span>
          </div>
          <div className="flex flex-col gap-2.5 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Animal Density</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${activePrediction.density === "High"
                ? "bg-red-950/80 border border-red-500/30 text-red-400"
                : activePrediction.density === "Medium"
                  ? "bg-amber-950/80 border border-amber-500/30 text-amber-400"
                  : "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400"
                }`}>
                {activePrediction.density}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Active Vehicles</span>
              <span className="text-white font-bold flex items-center gap-1.5">
                <Truck className="w-3 h-3 text-stone-400" />
                {activePrediction.vehicles} Grid Units
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Tracking Grid</span>
              <span className="text-white font-semibold text-right tracking-tight max-w-[120px] truncate">
                {activePrediction.gridSector}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Map SVG Overlays */}
        <svg
          viewBox="0 0 700 380"
          className="absolute inset-0 w-full h-full z-10 select-none"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="path-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
            </filter>
            <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {!isScanning && (
            <>
              <path
                d={activePrediction.path}
                fill="none"
                stroke="rgba(0, 0, 0, 0.4)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#path-shadow)"
                className="transition-all duration-1000 ease-in-out"
              />
              <path
                d={activePrediction.path}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="transition-all duration-1000 ease-in-out [stroke-dashoffset:0] animate-[dash_30s_linear_infinite]"
              />
            </>
          )}

          {!isScanning && (
            <g className="transition-all duration-1000 ease-in-out">
              <circle
                cx={activePrediction.hotspotX}
                cy={activePrediction.hotspotY}
                r="22"
                fill="rgba(245, 158, 11, 0.15)"
                stroke="rgba(245, 158, 11, 0.5)"
                strokeWidth="1.5"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: `${activePrediction.hotspotX}px ${activePrediction.hotspotY}px`,
                }}
              />
              <circle
                cx={activePrediction.hotspotX}
                cy={activePrediction.hotspotY}
                r="12"
                fill="rgba(245, 158, 11, 0.4)"
                filter="url(#glow-orange)"
              />
              <circle
                cx={activePrediction.hotspotX}
                cy={activePrediction.hotspotY}
                r="6"
                fill="#d97706"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="cursor-pointer"
                onClick={() => setShowTooltip(!showTooltip)}
              />
            </g>
          )}
        </svg>

        {/* Hotspot Sighting Probability Tooltip */}
        {!isScanning && showTooltip && (
          <div
            style={{
              left: `${(activePrediction.hotspotX / 700) * 100}%`,
              top: `${(activePrediction.hotspotY / 380) * 100}%`,
            }}
            className="absolute z-20 -translate-x-1/2 -translate-y-[135%] transition-all duration-1000 ease-in-out pointer-events-none select-none shadow-xl"
          >
            <div className="bg-stone-900 text-white rounded-lg px-3 py-1.5 border border-amber-500/50 text-[10px] font-bold flex flex-col items-center gap-0.5 whitespace-nowrap">
              <span className="text-[8px] text-amber-500 tracking-wider uppercase font-semibold">Primary Hotspot</span>
              <span className="tracking-tight text-white/90">{activePrediction.probability}% Sighting Probability</span>
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-stone-900 border-t-amber-500/50" />
            </div>
          </div>
        )}

        {/* Scanning Radar Scan Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-40 select-none">
            <div className="relative w-48 h-48 rounded-full border border-amber-500/20 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-amber-500/10" />
              <div className="absolute inset-12 rounded-full border border-amber-500/10" />
              <div className="absolute inset-0 rounded-full border-r border-amber-500/60 animate-spin" style={{ animationDuration: "1.8s" }} />
              <div className="absolute inset-0 rounded-full border-t border-amber-500/40 animate-spin" style={{ animationDuration: "2.5s" }} />

              <div className="flex flex-col items-center gap-1">
                <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-stone-200 uppercase tracking-widest">Scanning Grid</span>
                <span className="text-[12px] font-extrabold text-amber-400">{scanProgress}%</span>
              </div>
            </div>
            <div className="absolute bottom-6 flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 border border-white/5 rounded-lg text-[9px] font-bold text-stone-300 tracking-widest uppercase">
              <Wifi className="w-3 h-3 text-amber-500 animate-pulse" />
              Crunching Real-time Neural Sightings...
            </div>
          </div>
        )}

        {/* Map Floating Control Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-30">
          <button
            id="btn-zoom-in"
            onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.1))}
            className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-zoom-out"
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
            className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-recenter"
            onClick={onRecenter}
            className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Locate className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overlay note */}
        <div className="absolute bottom-4 left-4 z-30 pointer-events-none select-none">
          <div className="flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-sm rounded-md px-2 py-1 text-[9px] font-semibold text-stone-300 border border-white/5 shadow-md">
            <Info className="w-3 h-3 text-stone-400" />
            Yala Park Topology. Contours indicate elevation.
          </div>
        </div>
      </div>

      {/* Explanatory description card */}
      <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 flex gap-3 text-stone-700">
        <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-amber-900">Neural Migration Prediction:</span> Our ML tracking algorithms analyze local dry/wet climate patterns, real-time vehicle dispatch densities, and historical seasonal routes of the Yala leopard subspecies. Select target parameters on the left to recalculate predicted wildlife trails and high-probability sighting corridors.
        </div>
      </div>
    </div>
  );
}
