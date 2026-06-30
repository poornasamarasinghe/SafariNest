import Image from "next/image";
import { Activity, RotateCw, Layers, Cpu, AlertTriangle, Compass } from "lucide-react";

interface HotspotHeatmapRowProps {
  matchesSearch: (text: string) => boolean;
  onInspectCoordinates: () => void;
  onDeploy: () => void;
}

export default function HotspotHeatmapRow({
  matchesSearch,
  onInspectCoordinates,
  onDeploy,
}: HotspotHeatmapRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-black text-stone-950 select-none">Predictive Hotspot Heatmap</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Sloth Bear Surge Card */}
        {matchesSearch("sloth bear surge emerging trend activity block west palatupana conf") && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="relative h-44 w-full bg-stone-900">
              <Image src="/sloth_bear_trend.png" alt="Sloth Bear Headshot Close Up" fill className="object-cover object-center opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />Emerging Trend
                </span>
                <h4 className="text-sm font-extrabold text-stone-900">Sloth Bear Surge</h4>
                <p className="text-[11px] text-stone-400 font-semibold leading-relaxed">Increased activity in Block 1 West near Palatupana.</p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400">Confidence</span><span className="text-stone-900">94%</span>
              </div>
            </div>
          </div>
        )}

        {/* Nocturnal Migration Card */}
        {matchesSearch("nocturnal migration shift detected elephants movement zone block sector window conf") && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="relative h-44 w-full bg-stone-900">
              <Image src="/elephant_migration.png" alt="Elephant Herd Migrating Sunset" fill className="object-cover object-center opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />Shift Detected
                </span>
                <h4 className="text-sm font-extrabold text-stone-900">Nocturnal Migration</h4>
                <p className="text-[11px] text-stone-400 font-semibold leading-relaxed">Elephants shifting movement to 11PM - 3AM window.</p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400">Confidence</span><span className="text-stone-900">89%</span>
              </div>
            </div>
          </div>
        )}

        {/* Geospatial Intelligence Card */}
        {matchesSearch("geospatial intelligence block north heat intensifying leopard territory high probability inspect coordinates") && (
          <div className="bg-stone-900 text-white rounded-xl shadow-sm p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="flex flex-col gap-3 z-10 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight">Geospatial Intelligence</h4>
                  <p className="text-[10px] text-stone-400">Block 1 North Heat Intensifying</p>
                </div>
                <Compass className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <div className="h-20 bg-stone-950/60 border border-white/5 rounded-lg flex items-center justify-center p-3 overflow-hidden relative">
                <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,35 Q10,15 25,30 T50,15 T75,25 T100,5" fill="none" stroke="#d97706" strokeWidth="1.5" className="animate-pulse" />
                  <path d="M0,35 Q10,15 25,30 T50,15 T75,25 T100,5 L100,40 L0,40 Z" fill="rgba(217, 119, 6, 0.08)" />
                </svg>
                <span className="absolute top-[45%] left-[50%] flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-1.5 py-0.5 rounded text-[8px] bg-rose-950 border border-rose-800 text-rose-300 font-extrabold tracking-wider uppercase">Leopard Territory</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-950 border border-amber-800 text-amber-300 font-extrabold tracking-wider uppercase">High Probability</span>
              </div>
            </div>
            <div className="pt-4 z-10 relative">
              <button onClick={onInspectCoordinates} id="btn-inspect-coordinates"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white text-stone-900 text-xs font-bold rounded-lg shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                Inspect Coordinates
              </button>
            </div>
          </div>
        )}
      </div>

      {/* System Status Footer */}
      <div className="bg-[#FAF9F5] border border-stone-200/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5 select-none">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600"><Activity className="w-4 h-4" /></div>
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">System Health</span>
              <span className="text-xs font-black text-stone-900">Optimum (99.2%)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600"><RotateCw className="w-4 h-4" /></div>
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Last Training Run</span>
              <span className="text-xs font-black text-stone-900">14 mins ago</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600"><Layers className="w-4 h-4" /></div>
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Model Stack</span>
              <span className="text-xs font-black text-stone-900">v5.0-production</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto shrink-0">
          <button onClick={onDeploy} id="btn-deploy-experimental"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-black rounded-full shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Cpu className="w-3.5 h-3.5 text-amber-500 animate-pulse" />Deploy Experimental
          </button>
        </div>
      </div>
    </div>
  );
}
