'use client';

import React from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Live Tracker', href: '/tracker' },
];

const blocks = [
  { label: 'Block 1', href: '/blocks/block-1' },
  { label: 'Block 2', href: '/parks/kumana' },
  { label: 'Block 3', href: '/corridors/elephant' },
  { label: 'Block 4', href: '/book' },
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

  return (
    <footer
      className="w-full relative overflow-hidden footer-animate"
      style={{
        background: 'linear-gradient(180deg, #080f08 0%, #0a1408 40%, #06100a 100%)',
      }}
    >
      {/* ── Luxury top accent border ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,176,128,0.15) 20%, rgba(255,176,128,0.6) 50%, rgba(255,176,128,0.15) 80%, transparent 100%)',
        }}
      />
      {/* Thin green accent under it */}
      <div
        className="absolute top-[1px] left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(90,200,80,0.08) 30%, rgba(90,200,80,0.2) 50%, rgba(90,200,80,0.08) 70%, transparent 100%)',
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* ── Glows ── */}
      {/* Amber glow — top right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(255,176,128,0.06) 0%, transparent 60%)' }}
      />
      {/* Green glow — mid left */}
      <div
        className="absolute top-[20%] left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at left, rgba(80,180,60,0.055) 0%, transparent 65%)' }}
      />
      {/* Deep amber glow — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[220px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,150,80,0.04) 0%, transparent 70%)' }}
      />

      {/* ── Decorative large watermark text ── */}
      <div
        className="absolute bottom-12 right-6 md:right-16 lg:right-24 select-none pointer-events-none"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(60px, 10vw, 130px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,176,128,0.05)',
          userSelect: 'none',
        }}
      >
        YALA
      </div>

      {/* ── Main content ── */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-20 pb-0">

        {/* ── Top brand bar ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-[400px]">
            <Link href="/" className="group relative w-fit leading-none">
              <span
                className="font-jetbrains font-bold text-[40px] tracking-[-0.03em] leading-none relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #FFD5A8 45%, #FFB080 70%, #e8956a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'filter 0.3s',
                }}
              >
                SafariNest
              </span>
              {/* Underline shimmer on hover */}
              <span
                className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }}
              />
            </Link>
            <p className="font-sans text-[14px] leading-[24px] text-white/45">
              Redefining Sri Lankan wildlife expeditions through AI-driven tracking and premium jeep services in Yala National Park.
            </p>

          </div>
        </div>


        {/* ── Link columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

          {/* Navigation */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-[1px]" style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }} />
              <span className="font-jetbrains text-[10px] tracking-[0.16em] text-[#FFB080] uppercase">Navigation</span>
            </div>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 font-sans text-[14px] text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-[1px] group-hover:w-4 transition-all duration-300 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yala Blocks */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-[1px]" style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }} />
              <span className="font-jetbrains text-[10px] tracking-[0.16em] text-[#FFB080] uppercase">Yala Blocks</span>
            </div>
            <ul className="flex flex-col gap-3">
              {blocks.map((b) => (
                <li key={b.label}>
                  <Link
                    href={b.href}
                    className="group flex items-center gap-2.5 font-sans text-[14px] text-white/45 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-[1px] group-hover:w-4 transition-all duration-300 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }} />
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-[1px]" style={{ background: 'linear-gradient(90deg, #FFB080, transparent)' }} />
              <span className="font-jetbrains text-[10px] tracking-[0.16em] text-[#FFB080] uppercase">Contact</span>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:expeditions@safarinest.lk"
                className="group flex items-start gap-3 text-white/45 hover:text-white transition-colors duration-200"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,176,128,0.08)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,176,128,0.2)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)'; }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] tracking-[0.06em] text-white/25 mb-0.5 uppercase">Email</span>
                  <span className="font-sans text-[13px] leading-[18px]">expeditions@safarinest.lk</span>
                </div>
              </a>
              <a
                href="tel:+94711654050"
                className="group flex items-start gap-3 text-white/45 hover:text-white transition-colors duration-200"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,176,128,0.08)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,176,128,0.2)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)'; }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] tracking-[0.06em] text-white/25 mb-0.5 uppercase">Phone</span>
                  <span className="font-sans text-[13px] leading-[18px]">+94 711 654 050</span>
                </div>
              </a>
              <div className="flex items-start gap-3 text-white/45">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] tracking-[0.06em] text-white/25 mb-0.5 uppercase">Location</span>
                  <span className="font-sans text-[13px] leading-[18px]">Thanamalwila, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-7">
          {/* Copyright */}
          <p className="font-sans text-[11px] text-white/25 text-center md:text-left order-3 md:order-1 tracking-[0.04em]">
            © 2026 SafariNest Sri Lanka. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/35 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,176,128,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,176,128,0.06)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-5 order-2 md:order-3">
            <Link href="/privacy" className="font-sans text-[11px] text-white/25 hover:text-white/60 transition-colors duration-200 tracking-[0.04em]">
              Privacy Policy
            </Link>
            <span className="w-[1px] h-3 rounded-full" style={{ background: 'rgba(255,176,128,0.2)' }} />
            <Link href="/terms" className="font-sans text-[11px] text-white/25 hover:text-white/60 transition-colors duration-200 tracking-[0.04em]">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes footerFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .footer-animate {
          animation: footerFadeIn 0.9s ease both;
        }
      `}</style>
    </footer>
  );
}
