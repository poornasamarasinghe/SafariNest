"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Sighting } from "./tracker-components/types";

const EXPIRE_MS = 20 * 60 * 1000;
// NEXT_PUBLIC_API_URL is "http://localhost:5000/api" — we need the base without path segments
const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/api$/, "");
const YALA_CENTER: [number, number] = [6.3725, 81.5185];

const ANIMALS = [
    { key: "Leopard", emoji: "🐆", color: "#c0392b" },
    { key: "Elephant", emoji: "🐘", color: "#7d6608" },
    { key: "Bear", emoji: "🐻", color: "#6e2f1a" },
    { key: "Crocodile", emoji: "🐊", color: "#1e8449" },
    { key: "Peacock", emoji: "🦚", color: "#1a5276" },
    { key: "Birds", emoji: "🦅", color: "#117a65" },
    { key: "Deer", emoji: "🦌", color: "#784212" },
    { key: "Sri Lankan Smbar", emoji: "", color: "#4a235a" },
];

type AnimalOption = typeof ANIMALS[0];

interface UserSighting {
    id: string;
    latlng: LatLng;
    animal: string;
    emoji: string;
    color: string;
    createdAt: number;
    accuracy?: number;
}

interface WildlifeMapProps {
    onSightingAdded?: (s: Sighting) => void;
    onSightingRemoved?: (id: string) => void;
}

function buildIcon(emoji: string, color: string, fading = false) {
    const id = color.replace("#", "");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
    <filter id="sh${id}"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.35)"/></filter>
    <path filter="url(#sh${id})" d="M22 2C13.16 2 6 9.16 6 18c0 12 16 34 16 34s16-22 16-34C38 9.16 30.84 2 22 2z"
      fill="${color}" opacity="${fading ? 0.35 : 1}"/>
    <text x="22" y="22" font-size="14" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </svg>`;
    return L.divIcon({ html: svg, className: "", iconSize: [44, 54], iconAnchor: [22, 54], popupAnchor: [0, -58] });
}

const myLocationIcon = L.divIcon({
    html: `<div style="width:16px;height:16px;background:#2980b9;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 4px rgba(41,128,185,0.3)"></div>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

function useCountdown(createdAt: number) {
    const [remaining, setRemaining] = useState(Math.max(0, EXPIRE_MS - (Date.now() - createdAt)));
    useEffect(() => {
        const id = setInterval(() => {
            const left = Math.max(0, EXPIRE_MS - (Date.now() - createdAt));
            setRemaining(left);
            if (left === 0) clearInterval(id);
        }, 1000);
        return () => clearInterval(id);
    }, [createdAt]);
    return {
        mins: Math.floor(remaining / 60000),
        secs: Math.floor((remaining % 60000) / 1000),
        pct: (remaining / EXPIRE_MS) * 100,
        expired: remaining === 0,
    };
}

function SightingPopup({ s, onDelete }: { s: UserSighting; onDelete: (id: string) => void }) {
    const { mins, secs, pct, expired } = useCountdown(s.createdAt);
    const urgent = !expired && mins < 5;
    return (
        <div style={{ minWidth: 210, fontFamily: "system-ui, sans-serif" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{s.emoji}</span>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: s.color }}>{s.animal}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>
                        {s.latlng.lat.toFixed(5)}°N, {s.latlng.lng.toFixed(5)}°E
                        {s.accuracy ? ` · ±${Math.round(s.accuracy)}m` : ""}
                    </div>
                </div>
            </div>
            <div style={{ background: "#eee", borderRadius: 99, height: 7, overflow: "hidden", marginBottom: 5 }}>
                <div style={{ height: "100%", width: `${expired ? 0 : pct}%`, background: expired ? "#ccc" : urgent ? "#e74c3c" : "#27ae60", borderRadius: 99, transition: "width 1s linear, background 0.5s" }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: expired ? "#aaa" : urgent ? "#e74c3c" : "#27ae60" }}>
                {expired ? "⏰ Expired — animal has likely moved on" : `⏱ Expires in ${mins}m ${String(secs).padStart(2, "0")}s`}
            </div>
            <button onClick={() => onDelete(s.id)} style={{ padding: "5px 12px", fontSize: 12, border: "1px solid #ddd", borderRadius: 6, background: "#fafafa", cursor: "pointer", color: "#666" }}>
                🗑 Remove pin
            </button>
        </div>
    );
}

function FlyTo({ latlng }: { latlng: LatLng | null }) {
    const map = useMap();
    useEffect(() => {
        if (latlng) map.flyTo(latlng, 13, { duration: 1.2 });
    }, [latlng, map]);
    return null;
}

function AnimalPicker({ coords, onSelect, onCancel }: { coords: GeolocationCoordinates; onSelect: (a: AnimalOption) => void; onCancel: () => void }) {
    return (
        <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.58)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, padding: "28px 28px 20px", width: 380, maxWidth: "92vw", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
                <h3 style={{ margin: "0 0 2px", fontSize: 19, fontWeight: 800, color: "#1a2e1a" }}>🐾 What did you spot?</h3>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "#27ae60", fontWeight: 600 }}>
                    📡 {coords.latitude.toFixed(5)}°N, {coords.longitude.toFixed(5)}°E
                    {coords.accuracy ? ` · ±${Math.round(coords.accuracy)}m accuracy` : ""}
                </p>
                <p style={{ margin: "0 0 18px", fontSize: 13, color: "#888" }}>
                    Pin will <strong>auto-expire in 20 minutes</strong> — because animals move!
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {ANIMALS.map((a) => (
                        <button key={a.key} onClick={() => onSelect(a)}
                            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `2px solid ${a.color}33`, background: `${a.color}12`, cursor: "pointer", fontWeight: 600, color: a.color, fontSize: 14 }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${a.color}28`; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${a.color}12`; }}
                        >
                            <span style={{ fontSize: 22 }}>{a.emoji}</span>{a.key}
                        </button>
                    ))}
                </div>
                <button onClick={onCancel} style={{ marginTop: 14, width: "100%", padding: "9px", borderRadius: 8, border: "1px solid #e0e0e0", background: "#f8f8f8", color: "#999", cursor: "pointer", fontSize: 13 }}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

// Yala NP approximate geographic bounds for image mapping
const YALA_BOUNDS = {
    latMax: 6.60,  // north edge (top of image = 0%)
    latMin: 6.10,  // south edge (bottom = 100%)
    lngMin: 81.30, // west edge (left = 0%)
    lngMax: 81.78, // east edge (right = 100%)
};

// Returns true if the given coordinates fall within the Yala NP bounding box
function isInsideYala(lat: number, lng: number): boolean {
    return (
        lat >= YALA_BOUNDS.latMin &&
        lat <= YALA_BOUNDS.latMax &&
        lng >= YALA_BOUNDS.lngMin &&
        lng <= YALA_BOUNDS.lngMax
    );
}

function gpsToPercent(lat: number, lng: number): { lat: number; lng: number } {
    const latPct = ((YALA_BOUNDS.latMax - lat) / (YALA_BOUNDS.latMax - YALA_BOUNDS.latMin)) * 100;
    const lngPct = ((lng - YALA_BOUNDS.lngMin) / (YALA_BOUNDS.lngMax - YALA_BOUNDS.lngMin)) * 100;
    return {
        lat: Math.max(5, Math.min(95, latPct)),
        lng: Math.max(5, Math.min(95, lngPct)),
    };
}

function gpsToBlock(lat: number, lng: number): string {
    // Rough block assignment matching Yala NP zones
    if (lat > 6.45) return lng < 81.55 ? "Block 5" : "Block 4";
    if (lat > 6.35) return lng < 81.50 ? "Block 2" : "Block 3";
    if (lat > 6.25) return lng < 81.52 ? "Block 1" : "Block 3";
    return "Block 1";
}

function toSighting(u: UserSighting): Sighting {
    const elapsed = Math.round((Date.now() - u.createdAt) / 60000);
    const block = gpsToBlock(u.latlng.lat, u.latlng.lng);
    return {
        id: u.id,
        animal: u.animal as Sighting["animal"],
        name: `${u.emoji} ${u.animal}`,
        timeAgo: elapsed === 0 ? "just now" : `${elapsed}m ago`,
        timestamp: elapsed,
        createdAt: u.createdAt, // pass through so time filters stay accurate
        block,
        location: `${u.latlng.lat.toFixed(4)}°N ${u.latlng.lng.toFixed(4)}°E`,
        lat: u.latlng.lat,  // real GPS — TrackerLeafletMap uses these directly
        lng: u.latlng.lng,
    };
}


// ── Haversine distance in metres between two lat/lng points ───────────────────
function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(m: number): string {
    return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}

// ── Nearby animals panel ──────────────────────────────────────────────────────
interface NearbySighting extends UserSighting {
    distM: number;
}

function NearbyPanel({ sightings, myPosition }: { sightings: UserSighting[]; myPosition: LatLng }) {
    const ranked: NearbySighting[] = sightings
        .filter((s) => Date.now() - s.createdAt < EXPIRE_MS)
        .map((s) => ({
            ...s,
            distM: haversineM(myPosition.lat, myPosition.lng, s.latlng.lat, s.latlng.lng),
        }))
        .sort((a, b) => a.distM - b.distM);

    if (ranked.length === 0) return null;

    const closest = ranked[0];

    return (
        <div style={{
            marginBottom: 10,
            background: "#0d1f0d",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #2d5a27",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        }}>
            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px",
                background: "linear-gradient(90deg,#0d2e0d,#174a17)",
                borderBottom: "1px solid #2d5a2720",
            }}>
                <span style={{ fontSize: 18 }}>🦶</span>
                <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Animals Near You</div>
                    <div style={{ color: "#6dbf6d", fontSize: 11 }}>
                        Based on {ranked.length} active sighting{ranked.length !== 1 ? "s" : ""} reported nearby
                    </div>
                </div>
                {/* Closest alert badge */}
                <div style={{
                    background: closest.color + "22",
                    border: `1px solid ${closest.color}55`,
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 12,
                    color: closest.color,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                }}>
                    <span>{closest.emoji}</span>
                    <span>{closest.animal} — {formatDist(closest.distM)} away</span>
                </div>
            </div>

            {/* Ranked list */}
            <div style={{ padding: "8px 0" }}>
                {ranked.map((s, i) => {
                    const isClosest = i === 0;
                    const minsLeft = Math.max(0, Math.floor((EXPIRE_MS - (Date.now() - s.createdAt)) / 60000));
                    return (
                        <div key={s.id} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "9px 16px",
                            borderBottom: i < ranked.length - 1 ? "1px solid #ffffff08" : "none",
                            background: isClosest ? `${s.color}12` : "transparent",
                            transition: "background 0.2s",
                        }}>
                            {/* Rank badge */}
                            <div style={{
                                width: 24, height: 24, borderRadius: "50%",
                                background: isClosest ? s.color : "#ffffff15",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 11, fontWeight: 800,
                                color: isClosest ? "#fff" : "#aaa",
                                flexShrink: 0,
                            }}>
                                {i + 1}
                            </div>

                            {/* Emoji */}
                            <span style={{ fontSize: 22, flexShrink: 0 }}>{s.emoji}</span>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: isClosest ? s.color : "#e0e0e0" }}>
                                    {s.animal}
                                    {isClosest && (
                                        <span style={{
                                            marginLeft: 6, fontSize: 10, fontWeight: 600,
                                            background: s.color, color: "#fff",
                                            borderRadius: 4, padding: "1px 5px",
                                        }}>CLOSEST</span>
                                    )}
                                </div>
                                <div style={{ fontSize: 11, color: "#888", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {s.latlng.lat.toFixed(4)}°N, {s.latlng.lng.toFixed(4)}°E
                                </div>
                            </div>

                            {/* Distance + time left */}
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{
                                    fontWeight: 800, fontSize: 14,
                                    color: isClosest ? s.color : "#ccc",
                                }}>
                                    {formatDist(s.distM)}
                                </div>
                                <div style={{ fontSize: 10, color: minsLeft < 5 ? "#e74c3c" : "#6dbf6d", marginTop: 1 }}>
                                    ⏱ {minsLeft}m left
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function WildlifeMap({ onSightingAdded, onSightingRemoved }: WildlifeMapProps) {
    const [sightings, setSightings] = useState<UserSighting[]>([]);
    const [myPosition, setMyPosition] = useState<LatLng | null>(null);
    const [myAccuracy, setMyAccuracy] = useState<number>(0);
    const [pendingCoords, setPendingCoords] = useState<GeolocationCoordinates | null>(null);
    const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error" | "outside-yala">("idle");
    const [flyTarget, setFlyTarget] = useState<LatLng | null>(null);

    useEffect(() => {
        const id = setInterval(() => {
            const now = Date.now();
            setSightings((prev) => {
                const toRemove = prev.filter((s) => now - s.createdAt >= EXPIRE_MS + 5 * 60 * 1000);
                toRemove.forEach((s) => onSightingRemoved?.(s.id));
                return prev.filter((s) => now - s.createdAt < EXPIRE_MS + 5 * 60 * 1000);
            });
        }, 10_000);
        return () => clearInterval(id);
    }, [onSightingRemoved]);

    const handleLocateMe = useCallback(() => {
        if (!navigator.geolocation) { setGeoStatus("error"); return; }
        setGeoStatus("loading");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                // Only allow sighting marking when the user is inside Yala NP
                if (!isInsideYala(latitude, longitude)) {
                    setGeoStatus("outside-yala");
                    // Still show their location on the map so they can see why
                    setMyPosition(new LatLng(latitude, longitude));
                    setMyAccuracy(pos.coords.accuracy);
                    setFlyTarget(new LatLng(latitude, longitude));
                    // Do NOT set pendingCoords — blocks the AnimalPicker from appearing
                    return;
                }
                setGeoStatus("idle");
                const ll = new LatLng(latitude, longitude);
                setMyPosition(ll);
                setMyAccuracy(pos.coords.accuracy);
                setFlyTarget(ll);
                setPendingCoords(pos.coords);
            },
            () => setGeoStatus("error"),
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    const handleAnimalSelect = async (a: AnimalOption) => {
        if (!pendingCoords || !myPosition) return;

        // Build the local sighting object immediately (optimistic UI)
        const optimisticId = `u-${Date.now()}`;
        const newSighting: UserSighting = {
            id: optimisticId,
            latlng: myPosition,
            animal: a.key,
            emoji: a.emoji,
            color: a.color,
            createdAt: Date.now(),
            accuracy: pendingCoords.accuracy,
        };
        setSightings((prev) => [...prev, newSighting]);
        onSightingAdded?.(toSighting(newSighting));
        setPendingCoords(null);

        // Persist to backend (fire-and-forget, non-blocking)
        try {
            const body = {
                animal: a.key,
                emoji: a.emoji,
                color: a.color,
                latitude: myPosition.lat,
                longitude: myPosition.lng,
                block: gpsToBlock(myPosition.lat, myPosition.lng),
                location: `${myPosition.lat.toFixed(4)}°N ${myPosition.lng.toFixed(4)}°E`,
            };
            const res = await fetch(`${API_BASE}/api/sightings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                const saved = await res.json();
                // Swap the optimistic id with the real Firestore id
                setSightings((prev) =>
                    prev.map((s) => (s.id === optimisticId ? { ...s, id: saved.id } : s))
                );
            }
        } catch (err) {
            console.warn("[WildlifeMap] Failed to persist sighting to API:", err);
            // Sighting still lives in local state — no disruption to the user
        }
    };

    const handleDelete = useCallback(async (id: string) => {
        // Optimistic local removal
        setSightings((prev) => prev.filter((s) => s.id !== id));
        onSightingRemoved?.(id);

        // Persist deletion to backend
        try {
            await fetch(`${API_BASE}/api/sightings/${id}`, { method: "DELETE" });
        } catch (err) {
            console.warn("[WildlifeMap] Failed to delete sighting from API:", err);
        }
    }, [onSightingRemoved]);

    const activePins = sightings.filter((s) => Date.now() - s.createdAt < EXPIRE_MS).length;
    const activeSightings = sightings.filter((s) => Date.now() - s.createdAt < EXPIRE_MS);

    return (
        <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "12px 16px", marginBottom: 10, background: "linear-gradient(90deg,#1a3a1a,#2d5a27)", borderRadius: 12, color: "#fff" }}>
                <span style={{ fontSize: 20 }}>🛰️</span>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
                    <strong>Mark your location</strong> to report a sighting at your GPS coordinates. Pins expire after <strong>20 min</strong>.
                </div>
                <button
                    onClick={handleLocateMe}
                    disabled={geoStatus === "loading"}
                    style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 8, border: "none", background: geoStatus === "loading" ? "rgba(255,255,255,0.2)" : "#fff", color: geoStatus === "loading" ? "#fff" : "#1a3a1a", fontWeight: 700, fontSize: 13, cursor: geoStatus === "loading" ? "not-allowed" : "pointer" }}
                >
                    {geoStatus === "loading" ? "📡 Locating…" : "📍 Mark My Location"}
                </button>
                {activePins > 0 && (
                    <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "3px 12px", fontSize: 12 }}>
                        {activePins} active pin{activePins !== 1 ? "s" : ""}
                    </span>
                )}
            </div>

            {geoStatus === "error" && (
                <div style={{ background: "#fdecea", border: "1px solid #f5c6c6", borderRadius: 8, padding: "10px 14px", marginBottom: 10, fontSize: 13, color: "#c0392b" }}>
                    ⚠️ Could not get your location. Please allow location access in your browser settings.
                </div>
            )}

            {geoStatus === "outside-yala" && (
                <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 13, color: "#7b5800", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>🚧</span>
                    <div>
                        <strong style={{ display: "block", marginBottom: 3 }}>You are outside Yala National Park</strong>
                        Sightings can only be marked from within the park boundaries (lat&nbsp;6.10°–6.60°N,&nbsp;lng&nbsp;81.30°–81.78°E).
                        Please visit Yala and try again once you are inside the park.
                    </div>
                </div>
            )}

            {myPosition && (
                <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 8, padding: "8px 14px", marginBottom: 10, fontSize: 12, color: "#2e7d32", display: "flex", alignItems: "center", gap: 8 }}>
                    <span>📡</span>
                    <span>Your location: <strong>{myPosition.lat.toFixed(5)}°N, {myPosition.lng.toFixed(5)}°E</strong>{myAccuracy ? ` · ±${Math.round(myAccuracy)}m accuracy` : ""}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#66bb6a" }}>Blue dot on map ↓</span>
                </div>
            )}

            {/* Nearby animals ranked by distance */}
            {myPosition && activeSightings.length > 0 && (
                <NearbyPanel sightings={activeSightings} myPosition={myPosition} />
            )}

            {myPosition && activeSightings.length === 0 && (
                <div style={{ background: "#1a2e1a", border: "1px solid #2d5a27", borderRadius: 10, padding: "12px 16px", marginBottom: 10, fontSize: 13, color: "#6dbf6d", display: "flex", alignItems: "center", gap: 8 }}>
                    <span>🔍</span>
                    <span>No animal sightings reported near your area yet. Be the first — report what you see!</span>
                </div>
            )}

            <MapContainer center={YALA_CENTER} zoom={11} style={{ height: 560, width: "100%", borderRadius: 12 }}>
                <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FlyTo latlng={flyTarget} />

                {myPosition && (
                    <>
                        <Marker position={myPosition} icon={myLocationIcon}>
                            <Popup>
                                <div style={{ fontFamily: "system-ui", fontSize: 13 }}>
                                    <strong>📍 Your Location</strong><br />
                                    <span style={{ color: "#555", fontSize: 11 }}>
                                        {myPosition.lat.toFixed(5)}°N, {myPosition.lng.toFixed(5)}°E
                                        {myAccuracy ? <><br />Accuracy: ±{Math.round(myAccuracy)}m</> : ""}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                        {myAccuracy > 0 && (
                            <Circle center={myPosition} radius={myAccuracy} pathOptions={{ color: "#2980b9", fillColor: "#2980b9", fillOpacity: 0.08, weight: 1 }} />
                        )}
                    </>
                )}

                {sightings.map((s) => (
                    <Marker key={s.id} position={s.latlng} icon={buildIcon(s.emoji, s.color, Date.now() - s.createdAt > EXPIRE_MS)}>
                        <Popup><SightingPopup s={s} onDelete={handleDelete} /></Popup>
                    </Marker>
                ))}
            </MapContainer>

            {pendingCoords && (
                <AnimalPicker coords={pendingCoords} onSelect={handleAnimalSelect} onCancel={() => setPendingCoords(null)} />
            )}
        </div>
    );
}
