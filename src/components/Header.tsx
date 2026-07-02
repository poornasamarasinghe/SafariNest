'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeWidth="2" />
      <path strokeLinecap="round" strokeWidth="2" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Live Tracker', href: '/tracker' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-header)] backdrop-blur-lg border-b border-[var(--border-subtle)] shadow-[0_2px_20px_-4px_rgba(16,33,16,0.08)]'
          : 'bg-[var(--bg-header)] border-b border-[var(--border-subtle)]/50'
      }`}
    >
      <div className="w-full max-w-[1440px] h-20 mx-auto px-6 md:px-16 flex justify-between items-center relative">

        {/* Logo */}
        <div className="w-[165px] h-[30px] flex items-center z-10">
          <Link
            href="/"
            className="font-jetbrains font-bold text-[24px] tracking-[-0.03em] text-[var(--text-primary)] hover:opacity-85 transition-all duration-200"
          >
            SafariNest
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative font-jetbrains font-medium text-[12px] transition-colors duration-200 group py-1 ${
                  isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--text-primary)] rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side: Theme toggle + Book Now + Mobile Toggle */}
        <div className="flex items-center gap-2 z-10">

          {/* Dark / Light toggle */}
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] active:scale-90"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link
            href="/book"
            className="h-8 px-5 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-jetbrains font-medium text-[12px] rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-[0_4px_14px_-4px_rgba(255,176,128,0.55)] active:scale-95"
          >
            Book Now
          </Link>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          className={`absolute top-20 left-0 w-full bg-[var(--bg-header)] backdrop-blur-md shadow-lg border-b border-[var(--border-subtle)] flex flex-col p-6 gap-4 z-50 md:hidden transition-all duration-300 origin-top ${
            isMobileMenuOpen
              ? 'opacity-100 scale-y-100 pointer-events-auto'
              : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-jetbrains font-medium text-[14px] py-2 transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Theme toggle inside mobile menu too */}
          <button
            onClick={toggle}
            className="flex items-center gap-2 font-jetbrains font-medium text-[14px] py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  );
}
