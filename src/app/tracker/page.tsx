"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sighting, INITIAL_SIGHTINGS } from "@/components/tracker-components/types";
import TrackerHero from "@/components/tracker-components/TrackerHero";
import SightingsSidebar from "@/components/tracker-components/SightingsSidebar";
import TrackerMap from "@/components/tracker-components/TrackerMap";

const WildlifeMap = dynamic(() => import("@/components/WildlifeMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f0", borderRadius: "12px" }}>
      <p style={{ color: "#555" }}>Loading map…</p>
    </div>
  ),
});

export default function TrackerPage() {
  // Filter States
  const [animalFilter, setAnimalFilter] = useState<string>("All");
  const [zoneFilter, setZoneFilter] = useState<string>("All Blocks");
  const [timeFilter, setTimeFilter] = useState<string>("1h"); // '1h' | '3h' | 'today'

  // Sighting Data State
  const [sightings, setSightings] = useState<Sighting[]>(INITIAL_SIGHTINGS);

  // User-reported sightings from the Leaflet map
  const [userSightings, setUserSightings] = useState<Sighting[]>([]);
  // Each user sighting stores its creation epoch so we can compute timeAgo live
  const [userSightingMeta, setUserSightingMeta] = useState<Record<string, number>>({});

  const SIGHTING_EXPIRE_MS = 20 * 60 * 1000;

  const handleSightingAdded = (s: Sighting) => {
    const now = Date.now();
    setUserSightings((prev) => [{ ...s, timeAgo: "just now", timestamp: 0 }, ...prev]);
    setUserSightingMeta((prev) => ({ ...prev, [s.id]: now }));
  };

  const handleSightingRemoved = (id: string) => {
    setUserSightings((prev) => prev.filter((s) => s.id !== id));
    setUserSightingMeta((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  // Tick every 30s: refresh timeAgo labels and auto-remove expired sightings
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setUserSightings((prev) =>
        prev
          .filter((s) => {
            const created = userSightingMeta[s.id];
            return created ? now - created < SIGHTING_EXPIRE_MS : true;
          })
          .map((s) => {
            const created = userSightingMeta[s.id];
            if (!created) return s;
            const elapsed = Math.round((now - created) / 60000);
            return { ...s, timeAgo: elapsed === 0 ? "just now" : `${elapsed}m ago`, timestamp: elapsed };
          })
      );
    }, 30_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSightingMeta]);

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
  const filteredBase = sightings.filter(s => {
    if (animalFilter !== "All" && s.animal !== animalFilter) return false;
    if (zoneFilter !== "All Blocks" && s.block !== zoneFilter) return false;
    if (timeFilter === "1h" && s.timestamp > 60) return false;
    if (timeFilter === "3h" && s.timestamp > 180) return false;
    return true;
  });

  // User sightings always shown at top (not subject to filters — they are real-time)
  const filteredSightings = [...userSightings, ...filteredBase];

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

      {/* Leaflet Wildlife Map */}
      <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#1a2e1a" }}>
          🗺️ Live Wildlife Map
        </h2>
        <WildlifeMap
          onSightingAdded={handleSightingAdded}
          onSightingRemoved={handleSightingRemoved}
        />
      </section>


    </div>
  );
}
