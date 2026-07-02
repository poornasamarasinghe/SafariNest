'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Leopard Tracker', href: '/tracker' },
  { label: 'AI Pathing', href: '/pathing' },
  { label: 'Gallery', href: '/gallery' },
];

const blocks = [
  { label: 'Block 1 — Patanangala', href: '/blocks/block-1' },
  { label: 'Block 5 — Hidden Zone', href: '/blocks/block-5' },
  { label: 'Kumana National Park', href: '/parks/kumana' },
  { label: 'Elephant Corridors', href: '/corridors/elephant' },
  { label: 'Book a Safari', href: '/book' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" fill="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('footer-visible'); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer
      ref={ref}
      className="w-full bg-[#0a1a0a] relative overflow-hidden"
      style={{ opacity: 0, transition: 'opacity 0.8s ease 0.1s' }}
    >
      {/* Animated background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Subtle green glow in top-right corner */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(90,138,60,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Subtle warm glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(255,176,128,0.05) 0%, transparent 65%)',
        }}
      />

      {/* ── Main footer body ── */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-16 pb-0">

        {/* ── Top brand bar ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-white/8">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[380px]">
            <Link href="/" className="font-jetbrains font-bold text-[36px] tracking-[-0.03em] text-white hover:text-[#FFB080] transition-colors duration-300 leading-none">
              SafariNest
            </Link>
            <p className="font-sans text-[15px] leading-[24px] text-white/50">
              Redefining Sri Lankan wildlife expeditions through AI-driven tracking and premium jeep services in Yala National Park.
            </p>

            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-white/10 bg-white/4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse flex-shrink-0" />
              <span className="font-jetbrains text-[10px] tracking-[0.12em] text-[#00FF66] uppercase">
                Live — Yala Block 1 Active
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 w-full lg:max-w-[360px]">
            <p className="font-jetbrains text-[11px] tracking-[0.12em] text-[#FFB080] uppercase">
              Yala Expedition Updates
            </p>
            <p className="font-sans text-[13px] text-white/40 leading-[20px]">
              Get early access to leopard sighting reports and seasonal safari packages.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-sans text-[13px] text-emerald-400">You&apos;re subscribed. Welcome to Yala.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 bg-white/5 border border-white/12 hover:border-white/20 focus:border-[#FFB080]/60 rounded-xl px-4 pr-14 font-sans text-[14px] text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 w-9 h-9 bg-[#FFB080] hover:bg-[#ffa066] rounded-lg flex items-center justify-center text-[#7F3300] transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-white/8">

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] text-[#FFB080] uppercase">Navigation</span>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 font-sans text-[14px] text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-[1px] bg-[#FFB080] group-hover:w-3 transition-all duration-300 rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yala Blocks */}
          <div className="flex flex-col gap-5">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] text-[#FFB080] uppercase">Yala Blocks</span>
            <ul className="flex flex-col gap-3">
              {blocks.map((b) => (
                <li key={b.label}>
                  <Link
                    href={b.href}
                    className="group flex items-center gap-2 font-sans text-[14px] text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-[1px] bg-[#FFB080] group-hover:w-3 transition-all duration-300 rounded-full flex-shrink-0" />
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] text-[#FFB080] uppercase">Contact</span>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:expeditions@safarinest.lk"
                className="group flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FFB080]/10 group-hover:border-[#FFB080]/20 transition-all duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] text-white/30 mb-0.5">Email</span>
                  <span className="font-sans text-[13px] leading-[18px]">expeditions@safarinest.lk</span>
                </div>
              </a>
              <a
                href="tel:+94470000000"
                className="group flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FFB080]/10 group-hover:border-[#FFB080]/20 transition-all duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] text-white/30 mb-0.5">Phone</span>
                  <span className="font-sans text-[13px] leading-[18px]">+94 47 000 0000</span>
                </div>
              </a>
              <div className="flex items-start gap-3 text-white/50">
                <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] text-white/30 mb-0.5">Location</span>
                  <span className="font-sans text-[13px] leading-[18px]">Yala, Southern Province, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-5">
            <span className="font-jetbrains text-[10px] tracking-[0.15em] text-[#FFB080] uppercase">Live Stats</span>
            <div className="flex flex-col gap-4">
              {[
                { value: '89.7%', label: 'Leopard Sighting Rate' },
                { value: '42+', label: 'Active Yala Jeeps' },
                { value: '1,200+', label: 'Safaris Completed' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-sans font-bold text-[22px] text-white tracking-tight leading-none">{stat.value}</span>
                  <span className="font-sans text-[12px] text-white/35 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          {/* Copyright */}
          <p className="font-sans text-[12px] text-white/30 text-center md:text-left order-3 md:order-1">
            © 2026 SafariNest Sri Lanka. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-6 order-2 md:order-3">
            <Link href="/privacy" className="font-sans text-[12px] text-white/30 hover:text-white/70 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="w-[1px] h-3 bg-white/15" />
            <Link href="/terms" className="font-sans text-[12px] text-white/30 hover:text-white/70 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* Fade-in keyframe via inline style */}
      <style>{`
        footer.footer-visible { opacity: 1 !important; }
      `}</style>
    </footer>
  );
}
