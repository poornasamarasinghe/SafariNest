"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimalType, TimeOfDay, WeatherType, SeasonType, PredictionResult } from "@/components/recommendation-components/types";
import HeroSection from "@/components/recommendation-components/HeroSection";
import ParametersCard from "@/components/recommendation-components/ParametersCard";
import HotspotMap from "@/components/recommendation-components/HotspotMap";

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

  // Recenter the map (reset zoom and show tooltip)
  const handleRecenter = () => {
    setZoomLevel(1);
    setShowTooltip(true);
  };

  return (
    <div className="flex-1 bg-[#FAF9F5] text-stone-900 font-sans min-h-screen flex flex-col">

      <HeroSection onScrollToPrediction={scrollToPrediction} />

      {/* Main Dashboard Section */}
      <section
        id="prediction-section"
        className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl pb-24 relative z-20 -mt-16 sm:-mt-24 flex-grow"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <ParametersCard
            animal={animal}
            setAnimal={setAnimal}
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            weather={weather}
            setWeather={setWeather}
            season={season}
            setSeason={setSeason}
            isScanning={isScanning}
            scanProgress={scanProgress}
            onGenerate={handleGenerate}
          />

          <HotspotMap
            activePrediction={activePrediction}
            isScanning={isScanning}
            scanProgress={scanProgress}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            setZoomLevel={setZoomLevel}
            onRecenter={handleRecenter}
          />

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
