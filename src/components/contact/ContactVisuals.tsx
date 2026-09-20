"use client";

import Image from "next/image";
import { Radio, Leaf, CheckCircle } from "lucide-react";

export default function ContactVisuals() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Card 1: Leopard Live Alert */}
      <div className="relative h-64 rounded-xl overflow-hidden shadow-sm group">
        <Image
          src="/images/leopard-sighting.png"
          alt="Sri Lankan Leopard close-up profile"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Floating sighting alert badge overlay */}

      </div>

      {/* Card 2: Conservation First Card */}
      <div className="bg-[#101b15] text-white rounded-xl p-8 flex flex-col justify-between grow shadow-sm">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2.5">
            <Leaf className="text-emerald-500" size={20} />
            Conservation First
          </h3>
          <p className="text-xs text-zinc-450 leading-relaxed font-sans font-light">
            Every expedition contributes directly to the Yala Wildlife Preservation Fund.
            We operate with zero-impact principles to ensure future generations can witness
            the same raw beauty we do today.
          </p>
        </div>

        <div className="flex gap-3 mt-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 text-[9px] font-bold text-zinc-350 px-3.5 py-2 rounded-full tracking-wider uppercase">
            <CheckCircle size={10} className="text-emerald-500" />
            Eco-Certified
          </span>
          <span className="inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 text-[9px] font-bold text-zinc-350 px-3.5 py-2 rounded-full tracking-wider uppercase">
            <CheckCircle size={10} className="text-[#fca260]" />
            Tracker Verified
          </span>
        </div>
      </div>
    </div>
  );
}
