"use client";

import { Sparkles } from "lucide-react";

interface LiveAvailabilityProps {
  selectedSlot: string;
  setSelectedSlot: (val: string) => void;
}

export default function LiveAvailability({
  selectedSlot,
  setSelectedSlot,
}: LiveAvailabilityProps) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/60 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <h3 className="font-bold text-zinc-800 text-sm">Live Availability</h3>
        </div>
        <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-3 py-1.5 rounded-full tracking-wider uppercase flex items-center gap-1">
          <Sparkles size={10} />
          High Sighting Probability
        </span>
      </div>

      {/* Slot Selection Buttons */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {/* 05:30 slot - Full */}
        <button
          type="button"
          disabled
          className="bg-[#171717] opacity-95 text-white p-3 rounded-lg flex flex-col items-center justify-center select-none cursor-not-allowed"
        >
          <span className="text-xs font-bold font-mono">05:30</span>
          <span className="text-[8px] tracking-wider uppercase font-semibold text-zinc-450 mt-1">Full</span>
        </button>

        {/* 06:00 slot - 2 Slots */}
        <button
          type="button"
          onClick={() => setSelectedSlot("06:00")}
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
            selectedSlot === "06:00"
              ? "border-2 border-zinc-900 bg-zinc-50 shadow-sm"
              : "border border-zinc-200 hover:border-zinc-400 bg-white"
          }`}
        >
          <span className="text-xs font-bold text-zinc-800 font-mono">06:00</span>
          <span className="text-[8px] tracking-wider uppercase font-semibold text-amber-600 mt-1">2 Slots</span>
        </button>

        {/* 06:30 slot - Peak */}
        <button
          type="button"
          onClick={() => setSelectedSlot("06:30")}
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            selectedSlot === "06:30"
              ? "border-2 border-[#fba260] bg-amber-50/20 shadow-sm"
              : "border-2 border-zinc-200 hover:border-[#fba260]/60 bg-white"
          }`}
        >
          <span className="text-xs font-bold text-zinc-900 font-mono">06:30</span>
          <span className="text-[8px] tracking-wider uppercase font-extrabold text-[#f57c24] mt-1">Peak</span>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white"></div>
        </button>

        {/* 07:00 slot - 4 Slots */}
        <button
          type="button"
          onClick={() => setSelectedSlot("07:00")}
          className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
            selectedSlot === "07:00"
              ? "border-2 border-zinc-900 bg-zinc-50 shadow-sm"
              : "border border-zinc-200 hover:border-zinc-400 bg-white"
          }`}
        >
          <span className="text-xs font-bold text-zinc-800 font-mono">07:00</span>
          <span className="text-[8px] tracking-wider uppercase font-semibold text-emerald-600 mt-1">4 Slots</span>
        </button>
      </div>

      <p className="text-[10px] text-zinc-500 leading-relaxed">
        * Based on AI-driven data from the last 48 hours, leopard sightings are 40% higher between 06:00 and 07:30.
      </p>
    </div>
  );
}
