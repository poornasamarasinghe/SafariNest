"use client";

import { useState } from "react";
import GalleryToolbar from "@/components/Gallery/GalleryToolbar";
import GalleryGrid from "@/components/Gallery/GalleryGrid";

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white font-sans text-[#102110]">

      {/* ── Hero banner — dark accent block matching site pattern ── */}
      <div className="relative w-full bg-[#102110] overflow-hidden">
        {/* Subtle image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/images/hero-leopard.png')" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102110]/95 via-[#102110]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102110]/60 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pt-14 pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB080] animate-pulse" />
            <span className="font-jetbrains text-[10px] tracking-[0.15em] text-[#FFB080] uppercase">
              Yala National Park — Sri Lanka
            </span>
          </div>

          <h1 className="font-sans font-bold text-[36px] md:text-[52px] leading-[1.08] tracking-[-0.03em] text-white mb-3 drop-shadow-md">
            Wildlife Gallery
          </h1>
          <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-white/55 max-w-[500px]">
            Breathtaking moments captured deep in the wilderness — from leopard sightings to elephant herds at dusk.
          </p>
        </div>
      </div>

      {/* ── Content on white ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-10">
        <GalleryToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <GalleryGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}