// components/gallery/GalleryStats.tsx
"use client";

import { GalleryImage } from "../../app/admin/gallery/page";

interface GalleryStatsProps {
  images: GalleryImage[];
}

export default function GalleryStats({ images = [] }: GalleryStatsProps) {
  const wildlifeCount = images.filter((img) => img.category === "Wildlife").length;
  // Estimate size: assume average 1.5MB per image
  const storageMB = (images.length * 1.5).toFixed(1);

  const cards = [
    {
      title: "Total Media Assets",
      value: images.length.toString(),
    },
    {
      title: "Est. Storage Used",
      value: `${storageMB} MB`,
    },
    {
      title: "Wildlife Captures",
      value: wildlifeCount.toString(),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border p-5 shadow-sm"
        >
          <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
            {card.title}
          </p>

          <h3 className="text-3xl font-bold mt-2 text-slate-800">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}