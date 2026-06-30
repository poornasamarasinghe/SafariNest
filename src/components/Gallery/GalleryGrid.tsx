"use client";

import { useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  uploaded: string;
}

interface GalleryGridProps {
  searchQuery: string;
  selectedCategory: string;
}

const images: GalleryImage[] = [
  {
    id: 1,
    title: "Leopard Resting",
    category: "Wildlife",
    image: "/images/leopard-sighting.png",
    uploaded: "24 Jun 2026",
  },
  {
    id: 2,
    title: "Elephant Herd",
    category: "Wildlife",
    image: "/images/package-elephant.png",
    uploaded: "25 Jun 2026",
  },
  {
    id: 3,
    title: "Sloth Bear in Nature",
    category: "Wildlife",
    image: "/images/package-bear.png",
    uploaded: "27 Jun 2026",
  },
  {
    id: 4,
    title: "King of the Wilderness",
    category: "Wildlife",
    image: "/images/hero-leopard.png",
    uploaded: "28 Jun 2026",
  },
  {
    id: 5,
    title: "Leopard on Patrol",
    category: "Wildlife",
    image: "/images/package-leopard.png",
    uploaded: "29 Jun 2026",
  },
  {
    id: 6,
    title: "Scenic Safari Nest Base",
    category: "Landscapes",
    image: "/images/booking-hero.png",
    uploaded: "30 Jun 2026",
  },
  {
    id: 7,
    title: "Wilderness Horizon",
    category: "Landscapes",
    image: "/images/contact-hero.png",
    uploaded: "01 Jul 2026",
  }
];

export default function GalleryGrid({ searchQuery, selectedCategory }: GalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Filter images based on search query and category
  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  const handlePrev = () => {
    if (selectedImageIndex === null || filteredImages.length === 0) return;
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex! - 1
    );
  };

  const handleNext = () => {
    if (selectedImageIndex === null || filteredImages.length === 0) return;
    setSelectedImageIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex! + 1
    );
  };

  const activeImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <div className="space-y-6">
      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, idx) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-gray-400 font-medium text-lg">No images match your search criteria.</p>
          <p className="text-gray-300 text-sm mt-1">Try resetting the filters or typing a different keyword.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between items-center p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Lightbox Header */}
          <div className="w-full max-w-[1440px] flex justify-between items-center py-2 text-white z-10">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                {activeImage.category}
              </span>
              <h2 className="text-xl font-bold mt-2 tracking-tight">{activeImage.title}</h2>
            </div>
            
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="p-3 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white"
              aria-label="Close lightbox"
            >
              <X size={26} />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="relative flex-1 w-full max-w-[1440px] flex items-center justify-between gap-4">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white z-10 shrink-0 select-none active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image Wrapper */}
            <div 
              className="relative flex-1 h-[70vh] max-h-[750px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain transition-transform duration-300 scale-98"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white z-10 shrink-0 select-none active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div className="w-full max-w-[1440px] flex justify-between items-center py-4 border-t border-white/10 text-gray-400 text-xs z-10">
            <span>Captured & Uploaded: {activeImage.uploaded}</span>
            <span className="font-mono text-sm tracking-widest text-white">
              {selectedImageIndex + 1} / {filteredImages.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}