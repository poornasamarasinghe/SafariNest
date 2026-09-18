"use client";

import React, { useState, useEffect } from "react";
import { AnimalType, TimeOfDay, WeatherType, SeasonType, PredictionResult } from "@/components/recommendation-components/types";
import HeroSection from "@/components/recommendation-components/HeroSection";
import ParametersCard from "@/components/recommendation-components/ParametersCard";
import HotspotMap from "@/components/recommendation-components/HotspotMap";
import axios from "axios";

// Zone metadata (name, grid label) - used to convert the AI's zone code (e.g. "Z4") into readable text
const ZONE_INFO: Record<string, { name: string; grid: string }> = {
  "Z1": { name: "Waterhole", grid: "Zone 1" },
  "Z2": { name: "Riverbank", grid: "Zone 2" },
  "Z3": { name: "Grassland", grid: "Zone 3" },
  "Z4": { name: "Dense Forest", grid: "Zone 4" },
  "Z5": { name: "Rocky Scrub", grid: "Zone 5" },
  "Z6": { name: "Forest Edge", grid: "Zone 6" },
};

export default function RecommendationPage() {
  // Input parameters (sent to the AI)
  const [animal, setAnimal] = useState<AnimalType>("leopard");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("dawn");
  const [weather, setWeather] = useState<WeatherType>("sunny");
  const [season, setSeason] = useState<SeasonType>("dry");

  // Interaction states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [aiResponse, setAiResponse] = useState<any>(null);

  // Active prediction display (fed to the map)
  const [activePrediction, setActivePrediction] = useState<PredictionResult>({
    path: "",
    hotspotX: 0,
    hotspotY: 0,
    hotspotLabel: "AWAITING SCAN",
    probability: 0,
    density: "Medium",
    vehicles: 0,
    gridSector: "Yala National Park",
    zoneKey: "Z1", // Default to Z1 for the initial map view
  });

  // Handle the prediction via API
  const handleGenerate = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setAiResponse(null);

    try {
      // Send data to Node.js backend
      const response = await axios.post("http://localhost:5000/api/ai/predict", {
        animal: animal,
        time_of_day: timeOfDay,
        weather: weather,
        season: season,
      });

      // Save the AI prediction
      setAiResponse(response.data.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Could not connect to the AI server. Make sure Python and Node.js backends are running.");
      setIsScanning(false);
    }
  };

  // When scanning completes, update the map with the real AI data
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        // If progress reaches 100, stop the animation
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);

          // If we have the REAL data from Python, update the map!
          if (aiResponse) {
            const zoneKey = aiResponse.predicted_zone; // e.g., "Z4"
            const zoneInfo = ZONE_INFO[zoneKey] || { name: "Unknown", grid: "Unknown" };
            const confidence = Math.round((aiResponse.confidence?.[zoneKey] ?? 0) * 100);

            setActivePrediction({
              path: "",
              hotspotX: 0,
              hotspotY: 0,
              hotspotLabel: `${animal.toUpperCase()} in ${zoneInfo.name} (${confidence}% Confidence)`,
              probability: confidence,
              density: confidence > 80 ? "High" : confidence > 50 ? "Medium" : "Low",
              vehicles: Math.floor(Math.random() * 5) + 1,
              gridSector: `${zoneInfo.grid} - ${zoneInfo.name}`,
              zoneKey: zoneKey, // <-- The map reads this
            });
          }
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isScanning, aiResponse, animal]);

  // Smooth scroll to map
  const scrollToPrediction = () => {
    const element = document.getElementById("prediction-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Recenter the map
  const handleRecenter = () => {
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
            setZoomLevel={() => { }} // No-op now, since Leaflet handles zoom itself
            onRecenter={handleRecenter}
          />
        </div>
      </section>
    </div>
  );
}