"use client";

import Image from "next/image";
import { Calendar, Maximize2 } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  uploaded: string;
}

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

export default function GalleryCard({ image, onClick }: GalleryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Image
          src={image.image}
          alt={image.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={image.id <= 2}
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-3 bg-white text-[#1d2b22] rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95">
            <Maximize2 size={20} />
          </div>
        </div>

        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1d2b22] text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full shadow-sm">
          {image.category}
        </span>
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 group-hover:text-[#1d2b22] transition-colors duration-200 line-clamp-1">
            {image.title}
          </h3>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            <span>{image.uploaded}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
