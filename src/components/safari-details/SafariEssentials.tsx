"use client";

import { Clock, Car, Compass, Check } from "lucide-react";
import { SafariPackage } from "@/data/safariPackages";

interface SafariEssentialsProps {
  packageData: SafariPackage;
}

export default function SafariEssentials({ packageData }: SafariEssentialsProps) {
  const essentials = packageData.essentials;

  return (
    <div className="bg-[#F8F9F8] border border-zinc-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
      {/* Title */}
      <h3 className="font-serif text-xl font-bold text-zinc-950 mb-6">
        Package Essentials
      </h3>

      {/* Essentials Items */}
      <div className="space-y-5">
        {/* Duration */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-150 flex items-center justify-center text-[#7F6200] mr-4 shadow-sm flex-shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-0.5">
              Duration
            </span>
            <span className="text-xs md:text-sm font-bold text-zinc-800 leading-tight">
              {essentials.duration}
            </span>
          </div>
        </div>

        {/* Safari Type */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-150 flex items-center justify-center text-[#7F6200] mr-4 shadow-sm flex-shrink-0">
            <Car size={18} />
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-0.5">
              Safari Type
            </span>
            <span className="text-xs md:text-sm font-bold text-zinc-800 leading-tight">
              {essentials.safariType}
            </span>
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-150 flex items-center justify-center text-[#7F6200] mr-4 shadow-sm flex-shrink-0">
            <Compass size={18} />
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-0.5">
              Time Slots
            </span>
            <span className="text-xs md:text-sm font-bold text-zinc-800 leading-tight">
              {essentials.timeSlots}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-zinc-200/60 my-6" />

      {/* Included Facilities */}
      <div>
        <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-4">
          Included Facilities
        </span>

        <ul className="space-y-3.5">
          {essentials.facilities.map((facility, index) => (
            <li key={index} className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#7F6200] mr-3 flex-shrink-0 shadow-sm">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-xs md:text-sm text-zinc-700 font-medium">
                {facility}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
