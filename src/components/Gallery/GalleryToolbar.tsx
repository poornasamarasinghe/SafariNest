"use client";

import { Search } from "lucide-react";

interface GalleryToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function GalleryToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: GalleryToolbarProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-8 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images by title..."
            className="w-full border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-[#1d2b22] focus:ring-1 focus:ring-[#1d2b22] transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#1d2b22] bg-white cursor-pointer transition-colors"
        >
          <option value="All">All Categories</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Birds">Birds</option>
          <option value="Landscapes">Landscapes</option>
          <option value="Safari Jeeps">Safari Jeeps</option>
        </select>
      </div>
    </div>
  );
}