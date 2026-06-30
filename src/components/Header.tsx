'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Safari', href: '/safari' },
    { label: 'Live Tracker', href: '/tracker' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100/50">
      <div className="w-full max-w-[1440px] h-20 mx-auto px-6 md:px-16 flex justify-between items-center relative">
        
        {/* Logo */}
        <div className="w-[165px] h-[30px] flex items-center z-10">
          <Link 
            href="/" 
            className="font-jetbrains font-bold text-[24px] tracking-[-0.03em] text-[#102110] hover:opacity-85 transition-opacity duration-200"
          >
            SafariNest
          </Link>
        </div>

        {/* Desktop Navigation Links (Absolute Centered) */}
        <nav className="hidden md:flex gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-jetbrains font-medium text-[12px] text-[#444B43] hover:text-[#102110] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-4 z-10">
          <Link
            href="/book"
            className="h-8 px-6 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-jetbrains font-medium text-[12px] rounded-full flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
          >
            Book Now
          </Link>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#444B43] hover:text-[#102110] focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg border-b border-gray-100 flex flex-col p-6 gap-4 z-50 md:hidden animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-jetbrains font-medium text-[14px] text-[#444B43] hover:text-[#102110] py-2 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
