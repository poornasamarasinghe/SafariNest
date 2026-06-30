import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 flex flex-col items-center text-center">
      <h2 className="font-jetbrains font-semibold text-[12px] leading-[18px] tracking-[0.15em] text-[#7F6200] mb-8 uppercase">
        Yala Expedition Journals
      </h2>
      
      {/* Giant quotation mark icon */}
      <div className="text-[#FFB080] font-jetbrains font-bold text-[96px] leading-[0px] h-[30px] select-none">
        “
      </div>

      <p className="max-w-[820px] font-sans font-semibold text-[22px] md:text-[32px] leading-[32px] md:leading-[44px] tracking-[-0.02em] text-[#102110] mb-10">
        The SafariNest tracker was incredible. We were the only jeep at a Sloth Bear sighting because the AI predicted its movement towards the Palu trees. A truly exclusive Sri Lankan safari experience.
      </p>

      {/* Profile Card */}
      <div className="flex items-center gap-4 text-left">
        <div className="w-12 h-12 rounded-full bg-[#102110] border border-[#C4CDC4] flex items-center justify-center text-white font-sans font-bold text-[18px]">
          MR
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-[16px] leading-[22px] text-[#102110]">
            Mark Richardson
          </span>
          <span className="font-sans font-normal text-[13px] leading-[18px] text-[#444B43]">
            Wildlife Photographer, 2026
          </span>
        </div>
      </div>
    </section>
  );
}
