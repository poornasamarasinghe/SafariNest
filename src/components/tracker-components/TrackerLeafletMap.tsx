"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Sighting } from "./types";

// Yala Block I centroid — good default centre for the tracker view
const YALA_CENTER: [number, number] = [6.3725, 81.5185];

// Rough zone → [lat, lng, zoom] focus points for block auto-pan
const BLOCK_VIEWS: Record<string, [number, number, number]> = {
  "Block 1": [6.3200, 81.5000, 13],
  "Block 2": [6.3800, 81.4900, 13],
  "Block 3": [6.3900, 81.5400, 13],
  "Block 4": [6.4800, 81.5700, 12],
  "Block 5": [6.4900, 81.4700, 12],
};

/** Returns a colour hex for a given animal type. */
function animalColour(animal: string): string {
  switch (animal) {
    case "Leopard":    return "#e74c3c";
    case "Elephant":  return "#27ae60";
    case "Sloth Bear":
    case "Bear":      return "#8e44ad";
    case "Crocodile": return "#16a085";
    case "Peacock":   return "#2980b9";
    case "Birds":     return "#f39c12";
    case "Deer":      return "#d35400";
    default:          return "#7f8c8d";
  }
}

// ── FlyTo helper ──────────────────────────────────────────────────────────────
function ZoneController({ zoneFilter }: { zoneFilter: string }) {
  const map = useMap();
  const prevZone = useRef<string>("");

  useEffect(() => {
    if (zoneFilter === prevZone.current) return;
    prevZone.current = zoneFilter;

    if (zoneFilter === "All Blocks") {
      map.flyTo(YALA_CENTER, 12, { duration: 1 });
    } else {
      const view = BLOCK_VIEWS[zoneFilter];
      if (view) map.flyTo([view[0], view[1]], view[2], { duration: 1 });
    }
  }, [zoneFilter, map]);

  return null;
}

// ── Hover sync: fly to the hovered sighting ───────────────────────────────────
function HoverController({ hoveredSighting }: { hoveredSighting: Sighting | null }) {
  const map = useMap();
  useEffect(() => {
    if (!hoveredSighting) return;
    map.panTo([hoveredSighting.lat, hoveredSighting.lng], { animate: true, duration: 0.5 });
  }, [hoveredSighting, map]);
  return null;
}

// ── Main exported component ───────────────────────────────────────────────────
interface TrackerLeafletMapProps {
  filteredSightings: Sighting[];
  hoveredSighting: Sighting | null;
  setHoveredSighting: (s: Sighting | null) => void;
  zoneFilter: string;
}

export default function TrackerLeafletMap({
  filteredSightings,
  hoveredSighting,
  setHoveredSighting,
  zoneFilter,
}: TrackerLeafletMapProps) {
  return (
    <MapContainer
      center={YALA_CENTER}
      zoom={12}
      style={{ height: "100%", width: "100%", borderRadius: 0 }}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <ZoneController zoneFilter={zoneFilter} />
      <HoverController hoveredSighting={hoveredSighting} />

      {filteredSightings.map((s) => {
        const isHovered = hoveredSighting?.id === s.id;
        const colour = animalColour(s.animal);
        return (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={isHovered ? 12 : 8}
            pathOptions={{
              color: "#fff",
              weight: isHovered ? 3 : 2,
              fillColor: colour,
              fillOpacity: isHovered ? 1 : 0.85,
            }}
            eventHandlers={{
              mouseover: () => setHoveredSighting(s),
              mouseout: () => setHoveredSighting(null),
            }}
          >
            <Popup>
              <div style={{ fontFamily: "system-ui, sans-serif", minWidth: 160 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: colour, marginBottom: 3 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                  📍 {s.location}
                </div>
                <div style={{ fontSize: 11, color: "#999" }}>
                  {s.block} · {s.timeAgo}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
