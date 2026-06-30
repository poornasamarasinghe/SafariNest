"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sighting, INITIAL_SIGHTINGS } from "@/components/tracker-components/types";
import TrackerHero from "@/components/tracker-components/TrackerHero";
import SightingsSidebar from "@/components/tracker-components/SightingsSidebar";
import TrackerMap from "@/components/tracker-components/TrackerMap";

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


      <TrackerHero />

      {/* Interactive Sighting Area */}
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">

        <SightingsSidebar
          filteredSightings={filteredSightings}
          activeZoneText={activeZoneText}
          totalVisibleHits={totalVisibleHits}
        />

        <TrackerMap
          filteredSightings={filteredSightings}
          hoveredSighting={hoveredSighting}
          setHoveredSighting={setHoveredSighting}
          zoomLevel={zoomLevel}
          pan={pan}
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetLocation={handleResetLocation}
          animalFilter={animalFilter}
          setAnimalFilter={setAnimalFilter}
          zoneFilter={zoneFilter}
          setZoneFilter={setZoneFilter}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          isRefreshing={isRefreshing}
          onRefreshMap={handleRefreshMap}
        />

      </main>


    </div>
  );
}
