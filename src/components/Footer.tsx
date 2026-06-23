"use client";

import Link from "next/link";
import { Share2, Instagram, Mail, Phone, ArrowRight, Globe } from "lucide-react";

interface FooterProps {
  variant?: "dark" | "light" | "light-full";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  if (variant === "dark") {
    return (
      <footer className="bg-[#0b1611] text-zinc-400 py-16 px-6 md:px-12 border-t border-[#1a2d24]">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
              <Link href="/" className="text-white text-2xl font-bold font-sans tracking-tight">
                Safari<span className="font-extrabold text-zinc-100">Nest</span>
              </Link>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans font-light">
                Redefining Sri Lankan wildlife expeditions through AI-driven tracking and premium jeep services in Yala National Park.
              </p>
              <div className="flex gap-3 pt-2">
                <button aria-label="Share" className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer">
                  <Share2 size={16} />
                </button>
                <button aria-label="Instagram" className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer">
                  <Instagram size={16} />
                </button>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col gap-3 justify-start pt-2 font-sans font-medium text-sm">
              <Link href="/" className="text-zinc-300 hover:text-white transition-colors">Home</Link>
              <Link href="/jeep-rentals" className="text-zinc-300 hover:text-white transition-colors">Jeep Rentals</Link>
              <Link href="/leopard-tracker" className="text-zinc-300 hover:text-white transition-colors">Leopard Tracker</Link>
              <Link href="/ai-pathing" className="text-zinc-300 hover:text-white transition-colors">AI Pathing</Link>
            </div>

            {/* Column 3: Regional Links */}
            <div className="flex flex-col gap-3 justify-start pt-2 font-sans font-medium text-sm">
              <span className="text-zinc-300 hover:text-white transition-colors">Block 1 (Main)</span>
              <span className="text-zinc-300 hover:text-white transition-colors">Block 5 (Hidden)</span>
              <span className="text-zinc-300 hover:text-white transition-colors">Kumana National Park</span>
              <span className="text-zinc-300 hover:text-white transition-colors">Elephant Corridors</span>
            </div>

            {/* Column 4: Contact & Newsletter */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Mail size={16} className="text-zinc-500" />
                <a href="mailto:expeditions@safarinest.lk" className="hover:underline">expeditions@safarinest.lk</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Phone size={16} className="text-zinc-500" />
                <a href="tel:+94470000000" className="hover:underline">+94 47 000 0000</a>
              </div>

              {/* Email Input */}
              <div className="pt-2">
                <div className="flex items-center bg-zinc-800 rounded-lg overflow-hidden max-w-xs border border-zinc-700">
                  <input
                    type="email"
                    placeholder="Yala Updates"
                    className="bg-transparent px-4 py-2 text-sm text-white focus:outline-none w-full placeholder-zinc-500"
                  />
                  <button aria-label="Subscribe" className="px-3 text-zinc-400 hover:text-white cursor-pointer">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
            <span>© 2026 Safari Nest Sri Lanka. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "light-full") {
    return (
      <footer className="bg-zinc-50 text-zinc-650 py-16 px-6 md:px-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
              <Link href="/" className="text-zinc-900 text-2xl font-bold font-sans tracking-tight">
                Safari<span className="font-extrabold text-zinc-800">Nest</span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed font-sans font-light">
                Redefining Sri Lankan wildlife expeditions through AI-driven tracking and premium jeep services in Yala National Park.
              </p>
              <div className="flex gap-3 pt-2">
                <button aria-label="Share" className="w-10 h-10 rounded-full border border-zinc-350 flex items-center justify-center hover:bg-zinc-200 hover:text-zinc-900 transition-colors cursor-pointer text-zinc-600">
                  <Share2 size={16} />
                </button>
                <button aria-label="Instagram" className="w-10 h-10 rounded-full border border-zinc-350 flex items-center justify-center hover:bg-zinc-200 hover:text-zinc-900 transition-colors cursor-pointer text-zinc-600">
                  <Instagram size={16} />
                </button>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col gap-3 justify-start pt-2 font-sans text-sm">
              <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">Navigation</h4>
              <Link href="/" className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium">Home</Link>
              <Link href="/jeep-rentals" className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium">Jeep Rentals</Link>
              <Link href="/leopard-tracker" className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium">Leopard Tracker</Link>
              <Link href="/ai-pathing" className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium">AI Pathing</Link>
            </div>

            {/* Column 3: Regional Links */}
            <div className="flex flex-col gap-3 justify-start pt-2 font-sans text-sm">
              <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">Yala Blocks</h4>
              <span className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium cursor-pointer">Block 1 (Main)</span>
              <span className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium cursor-pointer">Block 5 (Hidden)</span>
              <span className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium cursor-pointer">Kumana National Park</span>
              <span className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium cursor-pointer">Elephant Corridors</span>
            </div>

            {/* Column 4: Contact & Newsletter */}
            <div className="space-y-4 pt-2 font-sans text-sm">
              <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">Contact</h4>
              <div className="flex items-center gap-3 text-zinc-650">
                <Mail size={16} className="text-zinc-400" />
                <a href="mailto:expeditions@safarinest.lk" className="hover:underline font-medium">expeditions@safarinest.lk</a>
              </div>
              <div className="flex items-center gap-3 text-zinc-650">
                <Phone size={16} className="text-zinc-400" />
                <a href="tel:+94470000000" className="hover:underline font-medium">+94 47 000 0000</a>
              </div>

              {/* Email Input */}
              <div className="pt-2">
                <div className="flex items-center bg-zinc-200/50 rounded-lg overflow-hidden max-w-xs border border-zinc-200">
                  <input
                    type="email"
                    placeholder="Yala Updates"
                    className="bg-transparent px-4 py-2 text-sm text-zinc-800 focus:outline-none w-full placeholder-zinc-400 font-medium"
                  />
                  <button aria-label="Subscribe" className="px-3 text-zinc-600 hover:text-zinc-900 cursor-pointer">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 gap-4 font-sans font-medium">
            <span>© 2026 SafariNest Sri Lanka. All rights reserved.</span>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-zinc-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-zinc-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Light Footer for Contact Page
  return (
    <footer className="bg-[#e4e1de] text-zinc-600 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-zinc-300 pb-10 mb-8">
          {/* Brand */}
          <div className="max-w-sm space-y-3">
            <Link href="/" className="text-zinc-900 text-xl font-bold font-sans tracking-tight">
              Safari<span className="font-extrabold text-zinc-850">Nest</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Curated expeditions into the wild heart of Sri Lanka, where luxury meets the untamed.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-zinc-700">
            <Link href="/terms-of-service" className="hover:text-zinc-950 transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-zinc-950 transition-colors">Privacy Policy</Link>
            <Link href="/park-rules" className="hover:text-zinc-950 transition-colors">Park Rules</Link>
            <Link href="/contact" className="hover:text-zinc-950 transition-colors font-bold border-b border-zinc-800 pb-0.5">Contact Us</Link>
          </div>

          {/* Icons */}
          <div className="flex gap-4">
            <button aria-label="Share" className="w-8 h-8 rounded-full border border-zinc-350 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer">
              <Share2 size={14} />
            </button>
            <button aria-label="Language selection" className="w-8 h-8 rounded-full border border-zinc-350 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer">
              <Globe size={14} />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center text-[10px] text-zinc-550 tracking-wide font-sans">
          <span>© 2026 SafariNest Sri Lanka. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
