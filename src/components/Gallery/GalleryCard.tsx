"use client";

import Image from "next/image";
import { Eye } from "lucide-react";

export default function GalleryCard({ image, onClick }: any) {
    return (
        <div 
            onClick={onClick}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer bg-gray-100 border border-gray-150"
        >
            <Image
                src={image.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={image.title || "Safari Gallery Image"}
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                unoptimized
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-[#102110]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center scale-90 group-hover:scale-100 transition-all duration-300 text-[#102110]">
                    <Eye size={22} />
                </div>
            </div>
        </div>
    );
}