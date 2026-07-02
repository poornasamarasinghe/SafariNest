"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface GalleryToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ["All", "Wildlife", "Birds", "Landscapes", "Safari Jeeps"];

export default function GalleryToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: GalleryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">

      {/* Search */}
      <div className="relative flex-1 min-w-[220px]">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F6200]/50 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search images…"
          className="w-full h-10 bg-white border border-[#C4CDC4] hover:border-[#102110]/40 focus:border-[#102110] rounded-xl pl-9 pr-4 font-sans text-[13px] text-[#102110] placeholder-[#7F6200]/40 outline-none transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <SlidersHorizontal size={14} className="text-[#C4CDC4] flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-9 px-4 rounded-full font-jetbrains text-[11px] tracking-[0.06em] border transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#102110] border-[#102110] text-white shadow-sm"
                : "bg-white border-[#C4CDC4] text-[#444B43] hover:border-[#102110]/50 hover:text-[#102110]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}