'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submit handler
  };

  return (
    <footer className="w-full bg-[#F4F6F4] border-t border-[#C4CDC4]">
      {/* Footer Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-24 pt-16 md:pt-24 pb-12 md:pb-16 flex flex-col font-sans">

        {/* Main Content Row */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between items-start gap-12 lg:gap-8 mb-16">

          {/* Column 1: Logo & Description */}
          <div className="w-full lg:w-[302px] flex flex-col gap-6">
            <Link
              href="/"
              className="font-sans font-semibold text-[32px] leading-[32px] tracking-[-0.02em] text-[#102110] hover:opacity-85 transition-opacity duration-200"
            >
              SafariNest
            </Link>
            <p className="font-sans font-normal text-[16px] leading-[24px] text-[#444B43]">
              Redefining Sri Lankan wildlife expeditions through AI-driven tracking and premium jeep services in Yala National Park.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Share Icon Button */}
              <button
                className="w-10 h-10 rounded-full border border-[#C4CDC4] flex items-center justify-center text-[#102110] hover:bg-[#102110] hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Share SafariNest"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 10.742l4.636-2.531m0 5.578l-4.636-2.531m0 0a3 3 0 110-3.042m0 3.042a3 3 0 110 3.042m0-3.042a3 3 0 110-3.042M12 4a3 3 0 110 6 3 3 0 010-6zm0 10a3 3 0 110 6 3 3 0 010-6z"
                  />
                </svg>
              </button>
              {/* Instagram Button */}
              <button
                className="w-10 h-10 rounded-full border border-[#C4CDC4] flex items-center justify-center text-[#102110] hover:bg-[#102110] hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="w-full lg:w-[162px] flex flex-col">
            <h4 className="font-jetbrains font-medium text-[12px] leading-[18px] tracking-[0.1em] text-[#7F6200] mb-6">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/tracker" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Leopard Tracker
                </Link>
              </li>
              <li>
                <Link href="/pathing" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  AI Pathing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Yala Blocks */}
          <div className="w-full lg:w-[218px] flex flex-col">
            <h4 className="font-jetbrains font-medium text-[12px] leading-[18px] tracking-[0.1em] text-[#7F6200] mb-6">
              YALA BLOCKS
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/blocks/block-1" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Block 1 (Main)
                </Link>
              </li>
              <li>
                <Link href="/blocks/block-5" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Block 5 (Hidden)
                </Link>
              </li>
              <li>
                <Link href="/parks/kumana" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Kumana National Park
                </Link>
              </li>
              <li>
                <Link href="/corridors/elephant" className="font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200">
                  Elephant Corridors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="w-full lg:w-[302px] flex flex-col">
            <h4 className="font-jetbrains font-medium text-[12px] leading-[18px] tracking-[0.1em] text-[#7F6200] mb-6">
              CONTACT
            </h4>
            <div className="flex flex-col gap-4 mb-6">
              <a
                href="mailto:expeditions@safarinest.lk"
                className="flex items-center gap-2 font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-[#102110] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                expeditions@safarinest.lk
              </a>
              <a
                href="tel:+94470000000"
                className="flex items-center gap-2 font-sans font-medium text-[16px] leading-[24px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-[#102110] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +94 47 000 0000
              </a>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubmit} className="w-full h-12 flex border border-[#C4CDC4] bg-transparent focus-within:border-[#102110] transition-colors duration-200">
              <input
                type="email"
                required
                placeholder="Yala Updates"
                className="flex-1 min-w-0 bg-transparent px-4 py-2 font-sans font-normal text-[16px] text-[#102110] placeholder-[#7F6200]/70 focus:outline-none"
              />
              <button
                type="submit"
                className="w-12 h-12 bg-[#102110] flex items-center justify-center text-white hover:bg-[#203c20] transition-colors duration-200 flex-shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-[#C4CDC4] mb-8" />

        {/* Copyright & Bottom Links Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-sans font-normal text-[12px] leading-[18px] text-[#444B43]">
            © 2026 SafariNest Sri Lanka. All rights reserved.
          </div>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-sans font-medium text-[12px] leading-[18px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans font-medium text-[12px] leading-[18px] text-[#102110] hover:text-[#7F6200] transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
