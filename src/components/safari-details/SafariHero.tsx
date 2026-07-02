"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Tag } from "lucide-react";
import { SafariPackage } from "@/data/safariPackages";

interface SafariHeroProps {
  packageData: SafariPackage;
}

export default function SafariHero({ packageData }: SafariHeroProps) {
  return (
    <section className="relative min-h-[480px] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <Image
        src={packageData.image}
        alt={packageData.name}
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 text-white z-10">
        <div className="max-w-3xl mt-8">
          {/* Tagline Badge */}
          <span className="text-[#FFB080] font-jetbrains tracking-[0.15em] text-[11px] font-bold uppercase mb-3 block">
            {packageData.heroBadge}
          </span>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.15]">
            {packageData.name}
          </h1>

          {/* Metadata Grid/Row */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-zinc-200 text-xs md:text-sm font-medium mb-8 border-t border-b border-white/10 py-4 max-w-xl">
            <div className="flex items-center gap-2">
              <MapPin className="text-[#FFB080]" size={16} />
              <span>Location: {packageData.zone}, Yala</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-[#FFB080]" size={16} />
              <span>Duration: {packageData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="text-[#FFB080]" size={16} />
              <span>Starting from ${packageData.price}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/booking?package=${packageData.bookingPackageId}`}
              className="bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-bold px-8 py-4 rounded-full text-xs tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-[#FFB080]/15 active:scale-95 cursor-pointer"
            >
              Book Now
            </Link>
            <Link
              href="/#packages"
              className="border border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              Back to Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
