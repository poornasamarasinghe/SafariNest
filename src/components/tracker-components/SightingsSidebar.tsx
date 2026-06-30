import Link from "next/link";
import { Footprints, Info } from "lucide-react";
import { Sighting } from "./types";

interface SightingsSidebarProps {
  filteredSightings: Sighting[];
  activeZoneText: string;
  totalVisibleHits: number;
}

export default function SightingsSidebar({
  filteredSightings,
  activeZoneText,
  totalVisibleHits,
}: SightingsSidebarProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">

      {/* Row of stats cards */}
      <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">

        {/* Most Seen Today Card */}
        <div className="flex-1 bg-[#F5F3ED] rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between relative min-h-[120px]">
          <div>
            <span className="text-[9px] font-bold tracking-wider text-[#8F5C1B] uppercase block mb-1">
              Most Seen Today
            </span>
            <h3 className="text-xl font-bold text-[#102110]">Leopard (12)</h3>
          </div>
          <p className="text-[11px] text-[#707070] mt-2">Primarily in Block 1</p>
          <div className="absolute top-5 right-5 text-[#8F5C1B]/80">
            <Footprints className="w-5 h-5 transform rotate-45" />
          </div>
        </div>

        {/* Active Zone & Total Hits Row */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Active Zone */}
          <div className="bg-white rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between min-h-[120px]">
            <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block mb-1">
              Active Zone
            </span>
            <h3 className="text-xl font-bold text-[#102110]">{activeZoneText}</h3>
            <span className="h-2 block"></span>
          </div>
          {/* Total Hits */}
          <div className="bg-white rounded-2xl border border-stone-200/40 p-5 flex flex-col justify-between min-h-[120px]">
            <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block mb-1">
              Total Hits
            </span>
            <h3 className="text-2xl font-bold text-[#102110]">{totalVisibleHits}</h3>
            <span className="h-2 block"></span>
          </div>
        </div>

      </div>

      {/* Live Sighting Feed Card */}
      <div className="bg-[#1E2D27] rounded-2xl p-6 text-white flex flex-col flex-1 shadow-lg min-h-[460px]">

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg tracking-tight">Live Sighting Feed</h3>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
          </div>
          <Info className="w-4 h-4 text-stone-400 cursor-help" />
        </div>

        {/* Scrollable feed list */}
        <div className="flex-grow flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin scrollbar-thumb-white/10">
          {filteredSightings.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-stone-400 gap-2">
              <Footprints className="w-8 h-8 opacity-45" />
              <p className="text-sm">No live sightings match the current filters.</p>
            </div>
          ) : (
            filteredSightings.map((sighting) => (
              <div
                key={sighting.id}
                className="flex items-center justify-between pb-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 p-2 rounded-xl transition duration-150"
              >
                <div className="flex items-center gap-4">
                  {/* Round Indicator */}
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Footprints
                      className={`w-4 h-4 transform rotate-12 ${sighting.animal === "Leopard"
                        ? "text-orange-400"
                        : sighting.animal === "Elephant"
                          ? "text-teal-400"
                          : sighting.animal === "Sloth Bear"
                            ? "text-stone-300"
                            : "text-amber-400"
                        }`}
                    />
                  </div>

                  {/* Sighting Text */}
                  <div className="flex flex-col">
                    <span className="font-bold text-sm leading-tight tracking-wide">
                      {sighting.name}
                    </span>
                    <span className="text-[11px] text-[#A2ADA7] mt-0.5">
                      Yala {sighting.block} • {sighting.location}
                    </span>
                  </div>
                </div>

                {/* Sighting Duration */}
                <span className="text-xs font-semibold text-[#FFB080] shrink-0 text-right">
                  {sighting.timeAgo}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Bottom history link */}
        <div className="pt-5 mt-auto flex justify-center border-t border-white/10">
          <Link
            href="/analytics"
            className="text-stone-300 hover:text-white transition duration-200 text-[10px] tracking-[0.15em] font-bold uppercase underline"
          >
            View All History
          </Link>
        </div>
      </div>

    </div>
  );
}
