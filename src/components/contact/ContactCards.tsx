"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Call Us */}
        <div className="bg-white rounded-xl border border-zinc-150 p-6 md:p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-[#fceada] flex items-center justify-center text-[#d7782b] mb-4">
            <Phone size={20} />
          </div>
          <h3 className="text-base font-bold text-zinc-850 font-sans">Call Us</h3>
          <span className="text-[9px] font-extrabold tracking-wider text-[#d7782b] uppercase mt-1 mb-3">
            24/7 Priority Line
          </span>
          <a
            href="tel:+94471234567"
            className="text-zinc-900 font-extrabold text-sm hover:text-[#d7782b] transition-colors mb-1"
          >
            +94 47 123 4567
          </a>
          <span className="text-[10px] text-zinc-400 font-medium">
            Available 24/7 for urgent tracking
          </span>
        </div>

        {/* Card 2: Email Us */}
        <div className="bg-white rounded-xl border border-zinc-150 p-6 md:p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-[#e3eae6] flex items-center justify-center text-[#46735a] mb-4">
            <Mail size={20} />
          </div>
          <h3 className="text-base font-bold text-zinc-850 font-sans">Email Us</h3>
          <span className="text-[9px] font-extrabold tracking-wider text-[#46735a] uppercase mt-1 mb-3">
            Expert Support
          </span>
          <a
            href="mailto:expeditions@safarinest.lk"
            className="text-zinc-900 font-extrabold text-sm hover:text-[#46735a] transition-colors mb-1"
          >
            expeditions@safarinest.lk
          </a>
          <span className="text-[10px] text-zinc-400 font-medium">
            Response within 2 hours
          </span>
        </div>

        {/* Card 3: Visit Basecamp */}
        <div className="bg-white rounded-xl border border-zinc-150 p-6 md:p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-[#e3e8ea] flex items-center justify-center text-[#466673] mb-4">
            <MapPin size={20} />
          </div>
          <h3 className="text-base font-bold text-zinc-850 font-sans">Visit Basecamp</h3>
          <span className="text-[9px] font-extrabold tracking-wider text-[#466673] uppercase mt-1 mb-3">
            Yala Junction
          </span>
          <span className="text-zinc-900 font-extrabold text-xs max-w-50 leading-relaxed mb-1">
            Tissamaharama Road, Palatupana, Yala, Sri Lanka
          </span>
        </div>
      </div>
    </div>
  );
}
