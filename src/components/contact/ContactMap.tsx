"use client";

import Image from "next/image";
import { Compass, ExternalLink } from "lucide-react";

export default function ContactMap() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
      <div className="relative h-80 rounded-xl overflow-hidden border border-zinc-200 shadow-sm flex items-center justify-center">
        {/* Topographic map image */}
        <Image
          src="/images/topo-map.png"
          alt="Topographic contour map visualization"
          fill
          className="object-cover opacity-85"
        />
        {/* Floating marker card */}
        <div className="relative z-10 bg-white border border-zinc-150 rounded-xl p-6 shadow-xl max-w-xs text-center flex flex-col items-center">
          <div className="w-10 h-10 bg-[#e8e4e0] text-[#8c5a2b] rounded-full flex items-center justify-center mb-3">
            <Compass size={18} className="animate-spin-slow" />
          </div>
          <h4 className="font-extrabold text-sm text-zinc-900 font-sans">YalaWild Basecamp</h4>
          <p className="text-[10px] text-zinc-500 font-semibold mt-1">Gate 1, Palatupana</p>
          
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold text-[#9b591b] hover:text-[#804814] uppercase tracking-wider border-t border-zinc-100 pt-3.5 w-full justify-center transition-colors cursor-pointer"
          >
            Get Directions
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}
