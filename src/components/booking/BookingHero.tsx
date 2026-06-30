"use client";

import Image from "next/image";

export default function BookingHero() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden flex items-center">
      <Image
        src="/images/booking-hero.png"
        alt="Yala Savanna Sunrise"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center px-6 md:px-16">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
            Reserve Your Safari
          </h1>
          <p className="text-zinc-200 text-sm md:text-base max-w-xl leading-relaxed font-sans font-light">
            Embark on a curated journey through the untamed wilderness of Yala.
            Expert guides, luxury comfort, and real-time wildlife tracking await.
          </p>
        </div>
      </div>
    </div>
  );
}
