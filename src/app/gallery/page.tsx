"use client";

import { useState } from "react";
import GalleryToolbar from "@/components/Gallery/GalleryToolbar";
import GalleryGrid from "@/components/Gallery/GalleryGrid";

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#f7f7f5] p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#102110]">
          Wildlife Gallery
        </h1>
        <p className="mt-2 text-gray-600">
          Explore breathtaking moments captured in the wilderness of SafariNest.
        </p>
      </div>

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
  );
}