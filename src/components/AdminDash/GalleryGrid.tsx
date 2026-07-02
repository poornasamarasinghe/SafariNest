// components/gallery/GalleryGrid.tsx
"use client";

import Image from "next/image";
import { Trash2, Eye, Plus } from "lucide-react";
import { GalleryImage } from "../../app/admin/gallery/page";

interface GalleryGridProps {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  activeTab: string;
  onDelete: (id: string | number) => void;
  onAddMediaClick: () => void;
}

export default function GalleryGrid({
  images,
  loading,
  error,
  activeTab,
  onDelete,
  onAddMediaClick,
}: GalleryGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 bg-white border rounded-xl shadow-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900 mb-4"></div>
        <p className="font-semibold">Loading media library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-white border border-red-100 rounded-xl shadow-sm max-w-lg mx-auto">
        <p className="text-red-500 font-bold text-lg">Error Loading Media</p>
        <p className="text-slate-500 text-sm mt-1 font-medium">{error}</p>
      </div>
    );
  }

  const filteredImages = activeTab === "All"
    ? images
    : images.filter((img) => img.category === activeTab);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredImages.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-xl border bg-white group flex flex-col justify-between shadow-sm hover:shadow-md transition"
        >
          <div>
            {/* Image Box */}
            <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
              <Image
                src={image.image}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover group-hover:scale-102 transition duration-300"
                unoptimized
              />

              <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded text-white bg-slate-900/80 backdrop-blur-xs">
                {image.category}
              </span>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <a 
                  href={image.image}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition shadow-sm"
                  title="View original"
                >
                  <Eye size={16} />
                </a>
                <button 
                  onClick={() => onDelete(image.id)}
                  className="bg-red-600 p-2 rounded-lg text-white hover:bg-red-700 transition shadow-sm"
                  title="Delete image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Title / Info */}
            <div className="p-3">
              <h3 className="text-xs font-bold text-slate-800 truncate" title={image.title}>
                {image.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                {image.uploaded}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Add Media Card */}
      <div 
        onClick={onAddMediaClick}
        className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl min-h-[200px] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition group"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-200 transition flex items-center justify-center">
          <Plus size={20} className="text-slate-500" />
        </div>

        <p className="text-xs font-bold text-slate-500 mt-2">
          Add Media
        </p>
      </div>
    </div>
  );
}