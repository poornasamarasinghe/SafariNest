import Link from "next/link";
import { Brain, TrendingUp, ArrowRight } from "lucide-react";

interface StatsRowProps {
  matchesSearch: (text: string) => boolean;
  predictionsCount: number;
  droneFeedActive: boolean;
  setDroneFeedActive: (v: boolean) => void;
  sensorActive: boolean;
  setSensorActive: (v: boolean) => void;
}

export default function StatsRow({
  matchesSearch,
  predictionsCount,
  droneFeedActive,
  setDroneFeedActive,
  sensorActive,
  setSensorActive,
}: StatsRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Active Models Card */}
      {matchesSearch("active models leopard elephant tracker migration engines") && (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group">
          <div className="absolute top-4 right-4 p-2 bg-amber-50 rounded-lg text-amber-700 group-hover:scale-110 transition-transform">
            <Brain className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Active Models</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-800">Leopard Tracker v4.2</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded text-[9px] font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-800">Elephant Migration</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded text-[9px] font-extrabold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
                </span>
              </div>
            </div>
          </div>
          <div className="pt-5 border-t border-stone-100 mt-4 text-[10px] font-bold text-stone-400">
            <span className="text-stone-900">12</span> Engines Running
          </div>
        </div>
      )}

      {/* Total Predictions Card */}
      {matchesSearch("total predictions growth chart week count") && (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Total Predictions</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900 tracking-tight">{(predictionsCount / 1000).toFixed(1)}k</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />12% growth this week
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-12 pt-4 mt-2">
            <div className="flex-1 bg-amber-100 rounded-t h-[40%] hover:bg-amber-200 transition-colors" title="Day 1" />
            <div className="flex-1 bg-amber-200/80 rounded-t h-[55%] hover:bg-amber-300 transition-colors" title="Day 2" />
            <div className="flex-1 bg-amber-100 rounded-t h-[30%] hover:bg-amber-200 transition-colors" title="Day 3" />
            <div className="flex-1 bg-amber-200 rounded-t h-[70%] hover:bg-amber-300 transition-colors" title="Day 4" />
            <div className="flex-1 bg-amber-700 rounded-t h-[95%] hover:bg-amber-800 transition-colors animate-pulse" title="Today" />
          </div>
        </div>
      )}

      {/* Real-Time Data Streams Card */}
      {matchesSearch("real time data streams thermal drone sensors satellite launch tracker") && (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300 select-none">
          <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Real-Time Data Streams</span>
          <div className="flex flex-col gap-2.5 flex-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-stone-700">
                <span className={`w-2 h-2 rounded-full ${droneFeedActive ? "bg-emerald-500 animate-pulse" : "bg-stone-300"}`} />
                Thermal Drone Feed B1
              </div>
              <button onClick={() => setDroneFeedActive(!droneFeedActive)} className="text-[9px] font-bold text-stone-400 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 rounded px-1.5 py-0.5">
                {droneFeedActive ? "PAUSE" : "ACTIVATE"}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2 text-stone-700">
                <span className={`w-2 h-2 rounded-full ${sensorActive ? "bg-emerald-500 animate-pulse" : "bg-stone-300"}`} />
                Acoustic Sensors (Block 4)
              </div>
              <button onClick={() => setSensorActive(!sensorActive)} className="text-[9px] font-bold text-stone-400 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 rounded px-1.5 py-0.5">
                {sensorActive ? "PAUSE" : "ACTIVATE"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-400">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />Satellite High-Res (Pending)
            </div>
          </div>
          <div className="pt-2">
            <Link href="/Recommendation" id="btn-launch-tracker"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-wide cursor-pointer">
              Launch Tracker<ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
