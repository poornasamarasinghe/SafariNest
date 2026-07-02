"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

export default function GalleryCard({ image, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-[#F4F6F4] border border-[#C4CDC4]/40 hover:border-[#C4CDC4] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(16,33,16,0.18)] transition-all duration-400"
    >
      {/* Photo */}
      <Image
        src={image.image}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt={image.title || "Safari Gallery Image"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        unoptimized
      />

      {/* Permanent bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />

      {/* Category chip — always visible top-left */}
      {image.category && (
        <div className="absolute top-3 left-3">
          <span className="font-jetbrains text-[9px] tracking-[0.12em] text-[#FFB080] uppercase bg-black/50 backdrop-blur-sm border border-[#FFB080]/20 px-2 py-1 rounded-full">
            {image.category}
          </span>
        </div>
      )}

      {/* Expand icon — top right, fades in on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
          <Expand size={13} />
        </div>
      </div>

      {/* Bottom title — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out">
        <p className="font-sans font-semibold text-[13px] text-white leading-tight truncate drop-shadow-md">
          {image.title}
        </p>
        {image.uploaded && (
          <p className="font-jetbrains text-[10px] text-white/45 mt-0.5 tracking-wide">
            {new Date(image.uploaded).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Shimmer accent line on hover (top) */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFB080]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </div>
  );
}