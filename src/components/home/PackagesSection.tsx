import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Package {
  image: string;
  block: string;
  price: string;
  title: string;
  description: string;
  duration: string;
  type?: string;
}

const packages: Package[] = [
  {
    image: '/images/package-leopard.png',
    block: 'YALA BLOCK 1',
    price: '$120/Session',
    title: ' HALF DAY',
    description: 'Explore the most famous leopard territory in the world with an AI-aided expert tracker and a modified luxury jeep.',
    duration: '6 Hours',
  },
  {
    image: '/images/package-elephant.png',
    block: 'ELEPHANT CORRIDOR',
    price: '$180/Full Day',
    title: 'FULL DAY',
    description: 'Follow the seasonal migration of Asian elephant herds between Yala and Lunugamvehera using satellite-linked tracking data.',
    duration: 'Full Day',
  },
];

export default function PackagesSection() {
  return (
    <section className="w-full bg-[#F4F6F4] border-t border-b border-[#C4CDC4]/40 py-20 md:py-28">
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
          <Link 
            href="/rentals" 
            className="font-jetbrains font-semibold text-[13px] leading-[18px] tracking-[0.05em] text-[#7F6200] hover:text-[#102110] flex items-center gap-2 transition-colors duration-200"
          >
            VIEW ALL SAFARI BLOCKS
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="w-full md:max-w-[420px] md:flex-[0_0_calc(50%-1rem)] bg-white rounded-2xl border border-[#C4CDC4]/40 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
            >
              {/* Image aspect-ratio container */}
              <div className="relative w-full h-56 overflow-hidden bg-[#102110]">
                <Image 
                  src={pkg.image} 
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102110]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-jetbrains font-bold text-[11px] leading-[16px] tracking-[0.1em] text-[#7F6200]">
                    {pkg.block}
                  </span>
                  <span className="font-sans font-bold text-[15px] leading-[20px] text-[#102110]">
                    {pkg.price}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-[20px] leading-[28px] text-[#102110] mb-3 group-hover:text-[#7F6200] transition-colors duration-200">
                  {pkg.title}
                </h3>

                <p className="font-sans font-normal text-[14px] leading-[22px] text-[#444B43] mb-6 flex-1">
                  {pkg.description}
                </p>

                <div className="w-full h-[1px] bg-[#C4CDC4]/40 mb-6" />

                {/* Meta details */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 font-sans font-medium text-[12px] text-[#444B43]">
                    <svg className="w-4 h-4 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </div>
                  {pkg.type && (
                    <div className="flex items-center gap-2 font-sans font-medium text-[12px] text-[#444B43]">
                      <svg className="w-4 h-4 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {pkg.type}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
