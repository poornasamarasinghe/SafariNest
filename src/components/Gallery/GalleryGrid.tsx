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

export default function GalleryGrid({ searchQuery, selectedCategory }: GalleryGridProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/gallery`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch gallery images");
        }
        const data = await res.json();
        setImages(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#102110] mb-4"></div>
        <p className="font-medium text-[#102110]">Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white border border-red-100 rounded-2xl shadow-sm max-w-lg mx-auto">
        <p className="text-red-500 font-medium text-lg">Error Loading Gallery</p>
        <p className="text-gray-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

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
          <div className="w-full max-w-[1440px] flex justify-end items-center py-2 text-white z-10">
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
                unoptimized
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
          <div className="w-full max-w-[1440px] flex justify-end items-center py-4 border-t border-white/10 text-gray-400 text-xs z-10">
            <span className="font-mono text-sm tracking-widest text-white">
              {selectedImageIndex + 1} / {filteredImages.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}