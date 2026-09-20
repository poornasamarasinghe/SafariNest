"use client";

import { useEffect, useState, useCallback } from "react";
import StatsCard from "./StatsCard";
import RecentBookings from "./RecentBookings";
import { BookOpen, Eye, Package, DollarSign, Brain, RefreshCw, Wifi, WifiOff } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/api$/, "");
const POLL_MS = 30_000;

interface BookingSummary {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
}

interface AIPrediction {
  animal: string;
  predicted_zone: string;
  confidence: Record<string, number>;
}

interface AIStatus {
  status: string;
  context: { time_of_day: string; season: string; weather: string };
  predictions: AIPrediction[];
  updatedAt: string;
}

// Zone labels mapping Z1…Z6 → human-readable Yala block names
const ZONE_LABELS: Record<string, string> = {
  Z1: "Block 1 – Palatupana",
  Z2: "Block 1 – Heenwewa",
  Z3: "Block 2 – Manik River",
  Z4: "Block 4 – Talgasmankada",
  Z5: "Block 5 – Katagamuwa",
  Z6: "Block 3 – Uraniya",
};

// Animal emoji map
const ANIMAL_EMOJI: Record<string, string> = {
  Leopard: "🐆",
  Elephant: "🐘",
  "Sloth Bear": "🐻",
};

const ANIMAL_COLORS: Record<string, string> = {
  Leopard: "#e8873a",
  Elephant: "#2ca58d",
  "Sloth Bear": "#8b7355",
};

export default function DashboardContent() {
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [aiError, setAiError] = useState(false);
  const [aiLoading, setAiLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ── Booking summary ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE}/api/bookings/summary`)
      .then((r) => (r.ok ? (r.json() as Promise<BookingSummary>) : Promise.reject()))
      .then(setSummary)
      .catch(() => {});
  }, []);

  // ── AI Status polling ──────────────────────────────────────────────────────
  const fetchAIStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ai/status`);
      if (!res.ok) throw new Error("not ok");
      const data: AIStatus = await res.json();
      setAiStatus(data);
      setAiError(false);
      setLastUpdated(new Date());
    } catch {
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAIStatus();
    const id = setInterval(fetchAIStatus, POLL_MS);
    return () => clearInterval(id);
  }, [fetchAIStatus]);

  const formatRevenue = (val: number) =>
    val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val.toLocaleString()}`;

  // Top confidence zone for a prediction
  const topZone = (p: AIPrediction) => {
    const entries = Object.entries(p.confidence);
    if (!entries.length) return p.predicted_zone;
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  };

  const topConf = (p: AIPrediction) => {
    const entries = Object.entries(p.confidence);
    if (!entries.length) return 0;
    return Math.round(entries.sort((a, b) => b[1] - a[1])[0][1] * 100);
  };

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bookings"
          value={summary ? String(summary.total) : "—"}
          icon={<BookOpen size={16} />}
        />
        <StatsCard
          title="Confirmed"
          value={summary ? String(summary.confirmed) : "—"}
          positive
          icon={<Eye size={16} />}
        />
        <StatsCard
          title="Pending"
          value={summary ? String(summary.pending) : "—"}
          icon={<Package size={16} />}
        />
        <StatsCard
          title="Revenue"
          value={summary ? formatRevenue(summary.totalRevenue) : "—"}
          positive
          icon={<DollarSign size={16} />}
        />
      </div>

      {/* Recent Bookings + AI Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentBookings />
        </div>

        {/* ── AI Intelligence Card ──────────────────────────────────────────── */}
        <div className="bg-[#0d1a0d] rounded-2xl border border-white/8 p-6 shadow-sm flex flex-col gap-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-jetbrains text-[10px] tracking-[0.12em] text-[#FFB080]/70 uppercase mb-0.5">
                AI System
              </p>
              <h3 className="font-sans font-bold text-[17px] text-white leading-tight">
                Yala Live Status
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Online / error badge */}
              {aiError ? (
                <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 px-2.5 py-1 rounded-full">
                  <WifiOff size={11} className="text-red-400" />
                  <span className="font-jetbrains text-[10px] text-red-400">Offline</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-jetbrains text-[10px] text-emerald-400">Live</span>
                </div>
              )}
              {/* Manual refresh */}
              <button
                onClick={fetchAIStatus}
                className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                title="Refresh now"
              >
                <RefreshCw size={13} className={aiLoading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {/* Context badges */}
          {aiStatus && (
            <div className="flex flex-wrap gap-1.5">
              {[
                aiStatus.context.time_of_day,
                aiStatus.context.season + " Season",
                aiStatus.context.weather,
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-jetbrains text-[9px] tracking-wider bg-white/6 border border-white/10 text-white/50 px-2 py-0.5 rounded-full uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Predictions */}
          <div className="flex flex-col gap-4">
            {aiLoading && !aiStatus && (
              <div className="flex items-center gap-2 text-white/30">
                <Brain size={14} className="animate-pulse" />
                <span className="font-jetbrains text-[11px]">Querying AI model…</span>
              </div>
            )}

            {aiError && (
              <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-red-400/80 text-[12px] font-sans">
                  AI model offline. Start the Python server at port 8000.
                </p>
              </div>
            )}

            {aiStatus?.predictions.map((p) => {
              const zone = topZone(p);
              const conf = topConf(p);
              const color = ANIMAL_COLORS[p.animal] ?? "#aaa";
              const label = ZONE_LABELS[zone] ?? zone;
              return (
                <div key={p.animal} className="flex flex-col gap-2">
                  {/* Animal + zone */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ANIMAL_EMOJI[p.animal] ?? "🐾"}</span>
                      <div>
                        <p className="font-sans text-[13px] font-semibold text-white/90 leading-none">
                          {p.animal}
                        </p>
                        <p className="font-jetbrains text-[10px] text-white/35 mt-0.5 leading-none">
                          → {label}
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-jetbrains font-bold text-[13px]"
                      style={{ color }}
                    >
                      {conf}%
                    </span>
                  </div>

                  {/* Confidence bar */}
                  <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${conf}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Last updated */}
          {lastUpdated && (
            <p className="font-jetbrains text-[9px] text-white/20 mt-auto">
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              {" · "}auto-refreshes every 30 s
            </p>
          )}
        </div>
      </div>
    </div>
  );
}