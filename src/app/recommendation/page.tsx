"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Footprints,
  Sun,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  CloudSun,
  Calendar,
  Sparkles,
  Compass,
  Plus,
  Minus,
  Navigation,
  Activity,
  Truck,
  Wifi,
  MapPin,
  Locate,
  Info
} from "lucide-react";

// Types
type AnimalType = "leopard" | "elephant" | "sloth_bear";
type TimeOfDay = "dawn" | "midday" | "afternoon";
type WeatherType = "sunny" | "rainy" | "overcast";
type SeasonType = "dry" | "wet";

interface PredictionResult {
  path: string;
  hotspotX: number;
  hotspotY: number;
  hotspotLabel: string;
  probability: number;
  density: "High" | "Medium" | "Low";
  vehicles: number;
  gridSector: string;
}

export default function RecommendationPage() {
  // Input parameters
  const [animal, setAnimal] = useState<AnimalType>("leopard");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("dawn");
  const [weather, setWeather] = useState<WeatherType>("sunny");
  const [season, setSeason] = useState<SeasonType>("dry");

  // Interaction states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showTooltip, setShowTooltip] = useState(true);

  // Active prediction display
  const [activePrediction, setActivePrediction] = useState<PredictionResult>({
    path: "M 40,240 Q 160,120 290,250 T 510,190 T 660,230",
    hotspotX: 290,
    hotspotY: 250,
    hotspotLabel: "LEOPARD PATHWAY (94% Sighting Probability)",
    probability: 94,
    density: "High",
    vehicles: 4,
    gridSector: "Yala Zone 1 - Sector 4B",
  });

  // Calculate mock prediction data based on user input parameters
  const targetPrediction = useMemo(() => {
    let baseProb = 75;
    let baseVehicles = 4;
    let density: "High" | "Medium" | "Low" = "Medium";
    let grid = "Sector 4B";
    let path = "M 40,240 Q 150,140 280,260 T 520,200 T 680,240";
    let hX = 280;
    let hY = 260;
    let locationName = "Primary Hotspot";

    if (animal === "leopard") {
      locationName = "Leopard Tracker Path";
      if (timeOfDay === "dawn") {
        baseProb = 94;
        baseVehicles = 3;
        density = "High";
        grid = "Zone 1 - Sector 4B";
        path = "M 50,220 C 150,150 220,320 380,250 C 480,210 540,110 650,180";
        hX = 380;
        hY = 250;
      } else if (timeOfDay === "midday") {
        baseProb = 42;
        baseVehicles = 5;
        density = "Low";
        grid = "Zone 2 - Sector 1A";
        path = "M 60,180 C 180,100 280,220 390,140 C 490,80 560,240 660,190";
        hX = 390;
        hY = 140;
      } else {
        baseProb = 85;
        baseVehicles = 6;
        density = "High";
        grid = "Zone 1 - Sector 3C";
        path = "M 40,260 C 120,220 250,280 340,180 C 450,80 580,200 670,150";
        hX = 340;
        hY = 180;
      }

      if (weather === "rainy") {
        baseProb = Math.max(15, baseProb - 35);
        density = "Low";
        baseVehicles = Math.max(1, baseVehicles - 2);
      }
      if (season === "wet") {
        grid = grid.replace("Sector", "High-Ground Sector");
      }
    } else if (animal === "elephant") {
      locationName = "Elephant Migration Route";
      if (timeOfDay === "midday") {
        baseProb = 89;
        baseVehicles = 8;
        density = "High";
        grid = "Zone 2 - Sector 2A";
        path = "M 30,120 C 180,260 320,100 450,220 C 520,280 620,180 690,140";
        hX = 450;
        hY = 220;
      } else if (timeOfDay === "dawn") {
        baseProb = 76;
        baseVehicles = 4;
        density = "Medium";
        grid = "Zone 2 - Sector 5B";
        path = "M 40,160 C 160,120 300,240 420,150 C 510,90 600,210 680,270";
        hX = 420;
        hY = 150;
      } else {
        baseProb = 82;
        baseVehicles = 6;
        density = "High";
        grid = "Zone 1 - Sector 4C";
        path = "M 80,180 C 220,140 380,260 490,190 C 560,140 630,220 700,160";
        hX = 490;
        hY = 190;
      }

      if (weather === "rainy") {
        baseProb = Math.min(98, baseProb + 10);
        density = "High";
      }
    } else {
      // Sloth Bear
      locationName = "Bear Foraging Trail";
      if (timeOfDay === "dawn") {
        baseProb = 73;
        baseVehicles = 2;
        density = "Medium";
        grid = "Zone 1 - Sector 3C";
        path = "M 60,300 C 180,180 340,300 480,160 C 580,70 630,220 680,260";
        hX = 480;
        hY = 160;
      } else if (timeOfDay === "midday") {
        baseProb = 28;
        baseVehicles = 1;
        density = "Low";
        grid = "Zone 2 - Sector 1B";
        path = "M 30,220 C 150,300 310,180 430,260 C 530,300 620,180 670,220";
        hX = 310;
        hY = 180;
      } else {
        baseProb = 64;
        baseVehicles = 4;
        density = "Medium";
        grid = "Zone 3 - Sector 4A";
        path = "M 40,260 C 210,150 360,250 490,180 C 560,130 630,220 680,150";
        hX = 490;
        hY = 180;
      }

      if (season === "dry") {
        baseProb = Math.min(92, baseProb + 12);
        density = "High";
      }
    }

    return {
      path,
      hotspotX: hX,
      hotspotY: hY,
      hotspotLabel: `${locationName} (${baseProb}% Probability)`,
      probability: baseProb,
      density,
      vehicles: baseVehicles,
      gridSector: grid,
    };
  }, [animal, timeOfDay, weather, season]);

  // Handle the prediction generation simulation
  const handleGenerate = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setActivePrediction(targetPrediction);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isScanning, targetPrediction]);

  // Smooth scroll trigger to prediction map
  const scrollToPrediction = () => {
    const element = document.getElementById("prediction-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 bg-[#FAF9F5] text-stone-900 font-sans min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative h-[520px] w-full overflow-hidden flex items-center shrink-0">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/safari_hero_bg.png"
            alt="Yala National Park Savanna Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Gradient Overlay for dark elegant feel and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent opacity-95" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 z-10 text-white select-none max-w-7xl">
          <div className="max-w-2xl flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              AI Powered <br />
              <span className="text-amber-500 bg-clip-text">Safari Intelligence</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Harness the power of neural tracking. Our AI analyzes migratory patterns, weather data, and real-time sightings to predict where wildlife will emerge.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToPrediction}
                id="btn-hero-start"
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
              >
                Start Prediction Engine
                <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Section */}
      <section
        id="prediction-section"
        className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl pb-24 relative z-20 -mt-16 sm:-mt-24 flex-grow"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Target Parameters Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl border border-stone-100 p-6 flex flex-col gap-6">

            {/* Card Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">Target Parameters</h2>
                <p className="text-xs text-stone-400">Configure search parameters</p>
              </div>
            </div>

            {/* Animal Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
                Animal Type
              </label>
              <div className="relative">
                <select
                  id="select-animal"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value as AnimalType)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <option value="leopard">Leopard (Panthera pardus kotiya)</option>
                  <option value="elephant">Sri Lankan Elephant (Elephas maximus)</option>
                  <option value="sloth_bear">Sloth Bear (Melursus ursinus)</option>
                </select>
                <div className="absolute left-3.5 top-3.5 text-stone-400 pointer-events-none">
                  <Footprints className="w-4 h-4" />
                </div>
                <div className="absolute right-3.5 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-500 w-0 h-0" />
              </div>
            </div>

            {/* Time of Day */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
                Time of Day
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-lg">
                {[
                  { id: "dawn", label: "Dawn", icon: Sunrise },
                  { id: "midday", label: "Midday", icon: Sun },
                  { id: "afternoon", label: "Afternoon", icon: Sunset },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = timeOfDay === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`btn-time-${item.id}`}
                      onClick={() => setTimeOfDay(item.id as TimeOfDay)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-md transition-all duration-300 cursor-pointer ${isActive
                        ? "bg-white text-stone-900 shadow-sm font-semibold scale-100"
                        : "text-stone-500 hover:text-stone-800 hover:bg-white/40"
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-stone-400"}`} />
                      <span className="text-[10px] tracking-wide uppercase font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weather & Season Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Weather */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
                  Weather
                </label>
                <div className="relative">
                  <select
                    id="select-weather"
                    value={weather}
                    onChange={(e) => setWeather(e.target.value as WeatherType)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
                  >
                    <option value="sunny">Sunny</option>
                    <option value="rainy">Rainy</option>
                    <option value="overcast">Overcast</option>
                  </select>
                  <div className="absolute left-3 top-3 text-stone-400 pointer-events-none">
                    {weather === "sunny" && <CloudSun className="w-3.5 h-3.5" />}
                    {weather === "rainy" && <CloudRain className="w-3.5 h-3.5" />}
                    {weather === "overcast" && <Cloud className="w-3.5 h-3.5" />}
                  </div>
                  <div className="absolute right-3 top-3.5 pointer-events-none border-l-3 border-r-3 border-t-3 border-transparent border-t-stone-500 w-0 h-0" />
                </div>
              </div>

              {/* Season */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
                  Season
                </label>
                <div className="relative">
                  <select
                    id="select-season"
                    value={season}
                    onChange={(e) => setSeason(e.target.value as SeasonType)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
                  >
                    <option value="dry">Dry Season</option>
                    <option value="wet">Wet Season</option>
                  </select>
                  <div className="absolute left-3 top-3 text-stone-400 pointer-events-none">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute right-3 top-3.5 pointer-events-none border-l-3 border-r-3 border-t-3 border-transparent border-t-stone-500 w-0 h-0" />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                id="btn-generate-prediction"
                disabled={isScanning}
                onClick={handleGenerate}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-bold text-white rounded-lg shadow-md cursor-pointer transition-all duration-300 active:scale-[0.98] ${isScanning
                  ? "bg-stone-700/80 cursor-wait"
                  : "bg-stone-900 hover:bg-stone-800 active:bg-black"
                  }`}
              >
                <Sparkles className={`w-4 h-4 ${isScanning ? "animate-spin text-amber-400" : "text-amber-500"}`} />
                {isScanning ? `Processing Telemetry (${scanProgress}%)` : "Generate Prediction"}
              </button>
            </div>
          </div>

          {/* Predictive Hotspot Map Card */}
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
                  onClick={() => {
                    setZoomLevel(1);
                    setShowTooltip(true);
                  }}
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
        </div>
      </section>

      {/* Styled inline keyframes for dotted route animations */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
