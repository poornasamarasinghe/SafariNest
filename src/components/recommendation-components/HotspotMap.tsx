"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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

// ============================================================
// DYNAMIC IMPORTS: Leaflet must only load on the client side
// (SSR will crash with "window is not defined" otherwise)
// ============================================================
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface HotspotMapProps {
  activePrediction: PredictionResult;
  isScanning: boolean;
  scanProgress: number;
  showTooltip: boolean;
  setShowTooltip: (v: boolean) => void;
  setZoomLevel: (fn: (prev: number) => number) => void;
  onRecenter: () => void;
}

// ============================================================
// YALA NATIONAL PARK ZONE DATA (Approximate Coordinates)
// ============================================================
const YALA_CENTER: [number, number] = [6.3724, 81.5000];

const ZONES: Record<string, { name: string; color: string; coords: [number, number][]; center: [number, number] }> = {
  Z1: { name: "Waterhole", color: "#3b82f6", center: [6.3900, 81.4800], coords: [[6.3950, 81.4750], [6.3950, 81.4850], [6.3850, 81.4850], [6.3850, 81.4750]] },
  Z2: { name: "Riverbank", color: "#06b6d4", center: [6.3800, 81.5000], coords: [[6.3850, 81.4950], [6.3850, 81.5050], [6.3750, 81.5050], [6.3750, 81.4950]] },
  Z3: { name: "Grassland", color: "#84cc16", center: [6.3700, 81.5200], coords: [[6.3750, 81.5150], [6.3750, 81.5250], [6.3650, 81.5250], [6.3650, 81.5150]] },
  Z4: { name: "Dense Forest", color: "#22c55e", center: [6.3550, 81.4900], coords: [[6.3600, 81.4850], [6.3600, 81.4950], [6.3500, 81.4950], [6.3500, 81.4850]] },
  Z5: { name: "Rocky Scrub", color: "#f59e0b", center: [6.3600, 81.5150], coords: [[6.3650, 81.5100], [6.3650, 81.5200], [6.3550, 81.5200], [6.3550, 81.5100]] },
  Z6: { name: "Forest Edge", color: "#a855f7", center: [6.3450, 81.5000], coords: [[6.3500, 81.4950], [6.3500, 81.5050], [6.3400, 81.5050], [6.3400, 81.4950]] },
};

// Helper component to move the map when prediction changes
// This is also dynamically imported because it uses useMap()
const MapController = dynamic(
  () =>
    Promise.resolve(({ center, zoom }: { center: [number, number]; zoom: number }) => {
      const { useMap } = require("react-leaflet");
      const map = useMap();
      useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
      }, [center, zoom, map]);
      return null;
    }),
  { ssr: false }
);

export default function HotspotMap({
  activePrediction,
  isScanning,
  scanProgress,
  showTooltip,
  setShowTooltip,
  setZoomLevel,
  onRecenter,
}: HotspotMapProps) {
  // Prevent hydration errors - only render map on client
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(YALA_CENTER);
  const [mapZoom, setMapZoom] = useState(13);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Load Leaflet only on the client
    import("leaflet").then((leaflet) => {
      // Fix for missing marker icons
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setL(leaflet.default);
    });
  }, []);

  // ✅ Read the zone key directly from the AI response
  const predictedZoneKey = activePrediction.zoneKey || "Z1";
  const predictedZone = ZONES[predictedZoneKey];

  useEffect(() => {
    if (!isScanning && activePrediction.zoneKey) {
      setMapCenter(predictedZone.center);
      setMapZoom(15);
    }
  }, [activePrediction, isScanning, predictedZone]);

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(18, prev + 1));
    setZoomLevel((prev) => Math.min(2, prev + 0.1));
  };
  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(10, prev - 1));
    setZoomLevel((prev) => Math.max(0.8, prev - 0.1));
  };
  const handleRecenterClick = () => {
    setMapCenter(predictedZone.center);
    setMapZoom(15);
    onRecenter();
  };

  // Create a custom red icon for the hotspot (only when Leaflet is loaded)
  const hotspotIcon = (isMounted && L) ? L.divIcon({
    className: "custom-hotspot-marker",
    html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(239, 68, 68, 0.8); animation: pulse 1.5s infinite;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  }) : null;

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
      <div className="relative aspect-[1.7] w-full bg-stone-800 rounded-2xl shadow-xl overflow-hidden border-2 border-stone-200/80 z-0">
        {isMounted && L && (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%", background: "#292524" }}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {Object.entries(ZONES).map(([key, zone]) => {
              const isPredicted = key === predictedZoneKey && !isScanning;
              return (
                <Polygon
                  key={key}
                  positions={zone.coords}
                  pathOptions={{
                    color: isPredicted ? "#ef4444" : zone.color,
                    fillColor: isPredicted ? "#ef4444" : zone.color,
                    fillOpacity: isPredicted ? 0.6 : 0.15,
                    weight: isPredicted ? 3 : 1.5,
                  }}
                >
                  <Popup>
                    {isPredicted ? (
                      // If this is the PREDICTED zone -> show the AI message
                      <div style={{ textAlign: "center", padding: "4px", minWidth: "180px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "13px", color: "#dc2626" }}>
                          {activePrediction.hotspotLabel}
                        </div>
                        <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                          {key} - {zone.name}
                        </div>
                      </div>
                    ) : (
                      // If this is ANY OTHER zone -> show the same style but for that zone
                      <div style={{ textAlign: "center", padding: "4px", minWidth: "180px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "13px", color: "#444" }}>
                          No prediction for {key} - {zone.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>
                          Try generating a new prediction
                        </div>
                      </div>
                    )}
                  </Popup>
                </Polygon>
              );
            })}

            {!isScanning && hotspotIcon && (
              <Marker position={predictedZone.center} icon={hotspotIcon}>
                <Popup>
                  <strong>{activePrediction.hotspotLabel}</strong>
                </Popup>
              </Marker>
            )}

            <MapController center={mapCenter} zoom={mapZoom} />
          </MapContainer>
        )}

        {/* Live Telemetry Panel Overlay */}
        {/*<div className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-md border border-white/10 rounded-xl p-4 w-60 z-[1000] shadow-2xl select-none pointer-events-none">
          <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
            <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Telemetry</span>
          </div>
          <div className="flex flex-col gap-2.5 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Animal Density</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${activePrediction.density === "High" ? "bg-red-950/80 border border-red-500/30 text-red-400" : activePrediction.density === "Medium" ? "bg-amber-950/80 border border-amber-500/30 text-amber-400" : "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400"}`}>
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
        </div>*/}

        {/* Scanning Radar Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-[2000] select-none">
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

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-[1000]">
          <button onClick={handleZoomIn} className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer" title="Zoom In">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleZoomOut} className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer" title="Zoom Out">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleRecenterClick} className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer" title="Recenter Map">
            <Locate className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Overlay note */}
        <div className="absolute bottom-4 left-4 z-[1000] pointer-events-none select-none">
          <div className="flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-sm rounded-md px-2 py-1 text-[9px] font-semibold text-stone-300 border border-white/5 shadow-md">
            <Info className="w-3 h-3 text-stone-400" />
            Yala National Park. Live AI Predictions.
          </div>
        </div>
      </div>


      {/* Add pulse animation for the hotspot marker */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}