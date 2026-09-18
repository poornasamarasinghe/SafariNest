'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';

export default function Home() {


  const features = [
    {
      title: 'AI Supported Safari Experience',
      description: 'Accurate predictions for animal tracking through our AI models — so you spend less time searching and more time marvelling. Happy safari!',
      icon: (
        <svg className="w-6 h-6 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Premium Jeep Rentals',
      description: 'Modified 4x4 off-road vehicles equipped with silent-drive modes and AI dashboard overlays for a superior, low-impact viewing experience.',
      icon: (
        <svg className="w-6 h-6 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zM13 16h6a1 1 0 001-1v-4a1 1 0 00-1-1h-6v6z" />
        </svg>
      ),
    },
  ];

  const [packages, setPackages] = useState<any[]>([
    {
      id: 'leopard-tracker-elite',
      image: '/images/package-leopard.png',
      block: 'YALA BLOCK 1',
      price: '$450/8 Hours',
      title: 'Leopard Tracker Elite',
      description: 'Premium leopard tracking safari through Block 1.',
      duration: '8 Hours',
      type: 'Private 4x4 Jeep',
    },
    {
      id: 'gentle-giants-expedition',
      image: '/images/package-elephant.png',
      block: 'ELEPHANT CORRIDOR',
      price: '$680/Full Day',
      title: 'Gentle Giants Expedition',
      description: "Experience Sri Lanka's elephant gathering.",
      duration: 'Full Day',
      type: 'Electric Hybrid',
    },
  ]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((pkg: any) => {
            const isLeopard = pkg.id === "leopard-tracker-elite";
            const isElephant = pkg.id === "gentle-giants-expedition";
            return {
              id: pkg.id,
              image: pkg.image || (isLeopard ? '/images/package-leopard.png' : isElephant ? '/images/package-elephant.png' : '/images/package-bear.png'),
              block: pkg.zone || (isLeopard ? 'YALA BLOCK 1' : 'ELEPHANT CORRIDOR'),
              price: `$${pkg.price}/${pkg.duration || 'Session'}`,
              title: pkg.name || (isLeopard ? 'Leopard Tracker Elite' : 'Gentle Giants Expedition'),
              description: pkg.description || '',
              duration: pkg.duration || '6 Hours',
              type: isLeopard ? 'Private 4x4 Jeep' : 'Electric Hybrid',
            };
          });
          const ordered = [
            formatted.find((p: any) => p.id === 'leopard-tracker-elite'),
            formatted.find((p: any) => p.id === 'gentle-giants-expedition'),
          ].filter(Boolean);

          if (ordered.length > 0) {
            setPackages(ordered);
          } else {
            setPackages(formatted.slice(0, 2));
          }
        }
      } catch (err) {
        console.error("Failed to fetch packages on homepage:", err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102110] overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Grid Section */}
      <FeatureSection features={features} />

      {/* 3. Curated Yala Packages Section */}
      <section id="packages" className="w-full bg-[#F4F6F4] border-t border-b border-[#C4CDC4]/40 py-20 md:py-28">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col">
          {/* Section Header */}
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 md:mb-16">
            <div className="flex flex-col gap-3">
              <h2 className="font-sans font-bold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] tracking-[-0.02em] text-[#102110]">
                Curated Yala Packages
              </h2>
              <p className="font-sans font-normal text-[16px] leading-[24px] text-[#444B43]">
                Exclusive Sri Lankan wildlife encounters designed by experts.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8">
            {packages.map((pkg, idx) => (
              <Link
                key={idx}
                href={`/safaris/${pkg.id}`}
                className="w-full md:max-w-[420px] md:flex-[0_0_calc(50%-1rem)] bg-white rounded-2xl border border-[#C4CDC4]/40 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-20px_rgba(16,33,16,0.25)] hover:border-[#7F6200]/50 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden bg-[#102110]">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102110]/30 to-transparent" />
                  {/* Price badge over image */}
                  <div className="absolute top-4 right-4 bg-[#102110]/80 backdrop-blur-sm border border-white/10 text-white font-sans font-bold text-[13px] px-3 py-1.5 rounded-full">
                    {pkg.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-jetbrains font-bold text-[11px] leading-[16px] tracking-[0.1em] text-[#7F6200]">
                      {pkg.block}
                    </span>
                    <span className="flex items-center gap-1.5 font-jetbrains text-[10px] text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-[20px] leading-[28px] text-[#102110] mb-3 group-hover:text-[#5a6e00] transition-colors duration-200">
                    {pkg.title}
                  </h3>

                  <p className="font-sans font-normal text-[14px] leading-[22px] text-[#444B43] mb-6 flex-1">
                    {pkg.description}
                  </p>

                  <div className="w-full h-[1px] bg-[#C4CDC4]/40 mb-6" />

                  {/* Meta + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5 font-sans font-medium text-[12px] text-[#444B43]">
                        <svg className="w-4 h-4 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1.5 font-sans font-medium text-[12px] text-[#444B43]">
                        <svg className="w-4 h-4 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {pkg.type}
                      </div>
                    </div>
                    <span className="font-jetbrains text-[11px] text-[#7F6200] font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      View
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Yala Expedition Journals (Testimonial) Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 flex flex-col items-center text-center">
        <span className="font-jetbrains font-semibold text-[12px] leading-[18px] tracking-[0.15em] text-[#7F6200] mb-8 uppercase">
          Yala Expedition Journals
        </span>

        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className="w-5 h-5 text-[#FFB080]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote mark */}
        <div className="text-[#FFB080] font-jetbrains font-bold text-[80px] leading-[0px] h-[28px] select-none mb-4">&ldquo;</div>

        <p className="max-w-[820px] font-sans font-semibold text-[22px] md:text-[30px] leading-[32px] md:leading-[42px] tracking-[-0.02em] text-[#102110] mb-10">
          The SafariNest tracker was incredible. We were the only jeep at a Sloth Bear sighting because the AI predicted its movement towards the Palu trees. A truly exclusive Sri Lankan safari experience.
        </p>

        {/* Profile */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#102110] to-[#2d5016] border border-[#C4CDC4] flex items-center justify-center text-white font-sans font-bold text-[17px] shadow-md">
            MR
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-[16px] leading-[22px] text-[#102110]">Mark Richardson</span>
            <span className="font-sans font-normal text-[13px] leading-[18px] text-[#444B43]">Wildlife Photographer, 2026</span>
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
        <div className="relative w-full rounded-3xl bg-[#102110] overflow-hidden py-16 md:py-24 px-6 md:px-16 flex flex-col items-center text-center shadow-xl">
          {/* Subtle background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: "url('/images/hero-leopard.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#102110]/50 to-[#102110]" />

          {/* CTA Content */}
          <div className="relative z-10 max-w-[640px] flex flex-col items-center">
            <h2 className="font-sans font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] tracking-[-0.03em] text-white mb-6">
              Ready for the Sri Lankan Wild?
            </h2>

            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] text-white/80 mb-10">
              Yala&apos;s leopards are waiting. Our AI booking assistant will help you select the best park entry times and jeep type for your visit this season.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="h-12 px-8 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-sans font-semibold text-[15px] rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-[0_8px_24px_-8px_rgba(255,176,128,0.6)] active:scale-95 text-center"
              >
                Book Your Yala Jeep
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Scroll-reveal sub-components ──────────────────────────── */

function FeatureSection({ features }: { features: any[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-[900px] mx-auto w-full">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card flex flex-col items-start p-8 rounded-2xl border border-[#C4CDC4]/40 bg-white hover:border-[#102110] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-16px_rgba(16,33,16,0.18)] transition-all duration-300 group"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 0.12}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${idx * 0.12}s, box-shadow 0.3s, border-color 0.3s`,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#F4F6F4] flex items-center justify-center mb-6 group-hover:bg-[#102110] transition-all duration-300">
              <div className="transition-transform duration-300 group-hover:scale-110 text-[#7F6200] group-hover:text-[#FFB080]">
                {feature.icon}
              </div>
            </div>
            <h3 className="font-sans font-semibold text-[20px] leading-[28px] text-[#102110] mb-4">
              {feature.title}
            </h3>
            <p className="font-sans font-normal text-[15px] leading-[24px] text-[#444B43]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
