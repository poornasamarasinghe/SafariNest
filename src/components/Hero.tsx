'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[680px] lg:h-[750px] flex items-center overflow-hidden bg-[#102110]">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: "url('/images/hero-leopard.png')" }}
      />

      {/* Dark Overlay (gradient for high legibility) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102110]/90 via-[#102110]/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102110]/50 via-transparent to-[#102110]/30" />

      {/* Hero Content */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-start z-10 text-white">

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#FFB080] animate-pulse" />
          <span className="font-jetbrains font-medium text-[11px] leading-[11px] tracking-[0.15em] text-[#FFB080] uppercase">
            AI-Powered Yala Expeditions
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-[720px] font-sans font-bold text-[36px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-[-0.03em] mb-6 drop-shadow-md">
          Explore Yala&apos;s Wild Wonders Smarter
        </h1>

        {/* Subtitle / Paragraph */}
        <p className="max-w-[580px] font-sans font-normal text-[15px] md:text-[18px] leading-[26px] md:leading-[28px] text-white/80 mb-10 drop-shadow-sm">
          Experience the highest leopard density in the world with SafariNest&apos;s proprietary AI tracking sightings and movement predictions. All dashboard overlays, ensuring you witness Sri Lanka&apos;s Big Three in their natural habitats.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/book"
            className="h-12 px-8 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-sans font-semibold text-[15px] rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-orange-500/10 active:scale-95 text-center"
          >
            Book a Jeep
          </Link>
          <Link
            href="/tracker"
            className="h-12 px-8 border border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-sans font-medium text-[15px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 text-center backdrop-blur-sm"
          >
            Leopard Tracker
          </Link>
        </div>

      </div>
    </section>
  );
}
