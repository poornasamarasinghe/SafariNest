"use client";

import { useState, useEffect, useCallback } from "react";
import GalleryCard from "./GalleryCard";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

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
        if (!res.ok) throw new Error("Failed to fetch gallery images");
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

  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePrev = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImageIndex(null);
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImageIndex, handleNext, handlePrev]);

  const activeImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-2xl bg-[#F4F6F4] border border-[#C4CDC4]/40 animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="font-sans font-semibold text-red-500 mb-1">Failed to load gallery</p>
        <p className="font-sans text-[13px] text-[#444B43]">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Result count */}
      {filteredImages.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <Images size={14} className="text-[#C4CDC4]" />
          <span className="font-jetbrains text-[11px] tracking-[0.08em] text-[#444B43]/60">
            {filteredImages.length} {filteredImages.length === 1 ? "photograph" : "photographs"}
            {selectedCategory !== "All" && ` · ${selectedCategory}`}
          </span>
        </div>
      )}

      {/* Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image, idx) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F4F6F4] border border-[#C4CDC4]/40 flex items-center justify-center mb-4">
            <Images size={22} className="text-[#C4CDC4]" />
          </div>
          <p className="font-sans font-medium text-[#444B43] mb-1">No photographs found</p>
          <p className="font-sans text-[13px] text-[#444B43]/50">Try a different filter or search term.</p>
        </div>
      )}

      {/* ── Lightbox ── */}
      {activeImage && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/96 backdrop-blur-xl"
          style={{ animation: 'fadeIn 0.2s ease' }}
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & category */}
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-[15px] text-white leading-tight">
                {activeImage.title}
              </span>
              <span className="font-jetbrains text-[11px] tracking-[0.1em] text-[#FFB080] mt-0.5 uppercase">
                {activeImage.category}
              </span>
            </div>

            {/* Counter + close */}
            <div className="flex items-center gap-4">
              <span className="font-jetbrains text-[12px] tracking-[0.08em] text-white/40">
                {selectedImageIndex + 1} <span className="text-white/20">/</span> {filteredImages.length}
              </span>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Image area + nav */}
          <div className="relative flex-1 flex items-center justify-center gap-4 px-4">
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <div
              className="relative flex-1 h-[70vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
                unoptimized
              />
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Bottom strip — thumbnail dots */}
          <div
            className="flex items-center justify-center gap-1.5 py-4 border-t border-white/8"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  i === selectedImageIndex
                    ? "w-5 h-1.5 bg-[#FFB080]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}