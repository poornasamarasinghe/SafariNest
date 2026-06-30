'use client';

import React from 'react';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import PackagesSection from '@/components/home/PackagesSection';
import DashboardSection from '@/components/home/DashboardSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#102110] overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Features Grid Section */}
      <FeaturesSection />

      {/* 3. Curated Yala Packages Section */}
      <PackagesSection />

      {/* 4. Yala AI Dashboard & Biometrics Section */}
      <DashboardSection />

      {/* 5. Yala Expedition Journals (Testimonial) Section */}
      <TestimonialsSection />

      {/* 6. Bottom CTA Section */}
      <CTASection />
    </div>
  );
}
