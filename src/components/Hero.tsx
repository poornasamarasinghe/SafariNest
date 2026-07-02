'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[680px] lg:h-[750px] flex items-center overflow-hidden bg-[#102110]">
      {/* Background Image — subtle parallax via scale */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8000ms] ease-out"
        style={{
          backgroundImage: "url('/images/hero-leopard.png')",
          transform: mounted ? 'scale(1)' : 'scale(1.05)',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102110]/92 via-[#102110]/68 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#102110]/55 via-transparent to-[#102110]/25" />

      {/* Subtle animated noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Content */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-start z-10 text-white">

        {/* Pill Badge — delay 0ms */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FFB080] animate-pulse" />
          <span className="font-jetbrains font-medium text-[11px] leading-[11px] tracking-[0.15em] text-[#FFB080] uppercase">
            AI-Powered Yala Expeditions
          </span>
        </div>

        {/* Title — delay 150ms */}
        <h1
          className="max-w-[720px] font-sans font-bold text-[36px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-[-0.03em] mb-6 drop-shadow-md"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
          }}
        >
          Explore Yala&apos;s Wild Wonders Smarter
        </h1>

        {/* Subtitle — delay 350ms */}
        <p
          className="max-w-[580px] font-sans font-normal text-[15px] md:text-[18px] leading-[26px] md:leading-[28px] text-white/80 mb-10 drop-shadow-sm"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
          }}
        >
          Experience the highest leopard density in the world with SafariNest&apos;s proprietary AI tracking sightings and movement predictions. All dashboard overlays, ensuring you witness Sri Lanka&apos;s Big Three in their natural habitats.
        </p>

        {/* Buttons — delay 550ms */}
        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s',
          }}
        >
          <a
            href="#packages"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="h-12 px-8 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-sans font-semibold text-[15px] rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-[0_8px_24px_-8px_rgba(255,176,128,0.7)] active:scale-95 text-center cursor-pointer group"
          >
            Book a Jeep
            <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <Link
            href="/tracker"
            className="h-12 px-8 border border-white/30 hover:border-white/70 text-white hover:bg-white/10 font-sans font-medium text-[15px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 text-center backdrop-blur-sm"
          >
            Leopard Tracker
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
          style={{
            opacity: mounted ? 0.4 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <span className="font-jetbrains text-[9px] tracking-[0.2em] text-white uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
        </div>

      </div>
    </section>
  );
}
