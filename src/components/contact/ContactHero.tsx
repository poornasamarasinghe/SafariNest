"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    <div className="relative h-90 w-full overflow-hidden flex items-center justify-center text-center">
      <Image
        src="/images/contact-hero.png"
        alt="Yala Savanna Sunset Landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-serif mb-4 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-zinc-200 text-sm max-w-xl mx-auto leading-relaxed font-sans font-light">
            Begin your journey into the untamed heart of Sri Lanka. Our trackers and
            expedition experts are standing by.
          </p>
        </div>
      </div>
    </div>
  );
}
