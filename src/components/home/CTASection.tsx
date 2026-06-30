import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
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
              className="h-12 px-8 bg-[#FFB080] hover:bg-[#ffa066] text-[#7F6200] font-sans font-semibold text-[15px] rounded-full flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 text-center"
            >
              Book Your Yala Jeep
            </Link>
            <Link
              href="/guide.pdf"
              className="h-12 px-8 border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-sans font-medium text-[15px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 text-center"
            >
              Download Yala Guide (PDF)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
