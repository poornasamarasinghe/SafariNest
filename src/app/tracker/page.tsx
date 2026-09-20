"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sighting } from "@/components/tracker-components/types";
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

// NEXT_PUBLIC_API_URL is "http://localhost:5000/api" — strip trailing /api for our own path building
const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/api$/, "");
const POLL_INTERVAL_MS = 30_000;
const SIGHTING_EXPIRE_MS = 20 * 60 * 1000;

// Map an API sighting record → the Sighting shape used by the sidebar / overlay map
// We store createdAt so we can recompute elapsed minutes live at render time.
function apiToSighting(raw: {
  id: string;
  animal: string;
  emoji?: string;
  latitude: number;
  longitude: number;
  block: string;
  location: string;
  createdAt: string | number | Date;
}): Sighting {
  const createdAtMs = new Date(raw.createdAt).getTime();
  const elapsedMin = Math.round((Date.now() - createdAtMs) / 60_000);
  const timeAgo = elapsedMin === 0 ? "just now" : `${elapsedMin}m ago`;

  return {
    id: raw.id,
    animal: raw.animal as Sighting["animal"],
    name: `${raw.emoji ?? ""} ${raw.animal}`.trim(),
    timeAgo,
    timestamp: elapsedMin,
    createdAt: createdAtMs,
    block: raw.block,
    location: raw.location,
    lat: raw.latitude,   // real GPS — Leaflet map uses these directly
    lng: raw.longitude,
  };
}

/** Recompute elapsed minutes from a stored createdAt epoch (used at render time). */
function liveElapsed(createdAt: number): number {
  return Math.max(0, Math.round((Date.now() - createdAt) / 60_000));
}

/** Start-of-today in ms (midnight local time). */
function startOfToday(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function TrackerPage() {
  // Filter States
  const [animalFilter, setAnimalFilter] = useState<string>("All");
  const [zoneFilter, setZoneFilter] = useState<string>("All Blocks");
  const [timeFilter, setTimeFilter] = useState<string>("1h"); // '1h' | '3h' | 'today'

  // ── Real sightings fetched from API (shared across all users) ──────────────
  const [apiSightings, setApiSightings] = useState<Sighting[]>([]);

  // ── Optimistic user sightings (appear immediately when user marks a pin) ───
  // These are shown at the top of the feed until the next API poll syncs them.
  const [userSightings, setUserSightings] = useState<Sighting[]>([]);
  const [userSightingMeta, setUserSightingMeta] = useState<Record<string, number>>({});

  // ── Poll the backend for live sightings ────────────────────────────────────
  const fetchSightings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/sightings`);
      if (!res.ok) return;
      const raw = await res.json();
      setApiSightings((raw as Array<Parameters<typeof apiToSighting>[0]>).map(apiToSighting));
    } catch (err) {
      console.warn("[TrackerPage] Could not fetch sightings:", err);
    }
  }, []);

  useEffect(() => {
    fetchSightings(); // initial load
    const id = setInterval(fetchSightings, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchSightings]);

  // After each API poll, drop optimistic items that are now present in apiSightings
  useEffect(() => {
    const apiIds = new Set(apiSightings.map((s) => s.id));
    setUserSightings((prev) => prev.filter((s) => !apiIds.has(s.id)));
  }, [apiSightings]);

  // ── Callbacks wired to WildlifeMap ─────────────────────────────────────────
  const handleSightingAdded = (s: Sighting) => {
    const now = Date.now();
    // Keep createdAt from the sighting (set by toSighting from u.createdAt)
    // so the live time-filter logic can recompute elapsed minutes correctly.
    setUserSightings((prev) => [{ ...s, timeAgo: "just now", timestamp: 0 }, ...prev]);
    setUserSightingMeta((prev) => ({ ...prev, [s.id]: now }));
  };


  const handleSightingRemoved = (id: string) => {
    setUserSightings((prev) => prev.filter((s) => s.id !== id));
    setUserSightingMeta((prev) => { const n = { ...prev }; delete n[id]; return n; });
    // Also remove from apiSightings immediately so it doesn't re-appear before next poll
    setApiSightings((prev) => prev.filter((s) => s.id !== id));
  };

  // Tick every 30 s: refresh timeAgo labels + auto-remove expired optimistic pins
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
            const elapsed = Math.round((now - created) / 60_000);
            return { ...s, timeAgo: elapsed === 0 ? "just now" : `${elapsed}m ago`, timestamp: elapsed };
          })
      );
    }, 30_000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSightingMeta]);

  // Map Navigation / Zoom State — handled by Leaflet internally now
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Interactive Tooltip Sighting
  const [hoveredSighting, setHoveredSighting] = useState<Sighting | null>(null);

  // Manual refresh — re-fetch from API immediately
  const handleRefreshMap = () => {
    setIsRefreshing(true);
    fetchSightings().finally(() => {
      setTimeout(() => setIsRefreshing(false), 800);
    });
  };

  // ── Filter sightings for display ───────────────────────────────────────────
  // Re-derive elapsed minutes live (from stored createdAt) so time filters stay
  // accurate even if the sightings were fetched many minutes ago.
  const todayStart = startOfToday();

  const filteredBase = apiSightings
    .map((s) => {
      const elapsed = liveElapsed(s.createdAt);
      const timeAgo = elapsed === 0 ? "just now" : `${elapsed}m ago`;
      return { ...s, timestamp: elapsed, timeAgo };
    })
    .filter((s) => {
      if (animalFilter !== "All" && s.animal !== animalFilter) return false;
      if (zoneFilter !== "All Blocks" && s.block !== zoneFilter) return false;
      if (timeFilter === "1h" && s.timestamp > 60) return false;
      if (timeFilter === "3h" && s.timestamp > 180) return false;
      // "today" — keep sightings created after midnight local time
      if (timeFilter === "today" && s.createdAt < todayStart) return false;
      return true;
    });

  // Optimistic user sightings always shown at top (unfiltered — they are real-time)
  const filteredSightings = [...userSightings, ...filteredBase];

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
