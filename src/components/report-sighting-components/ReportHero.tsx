import Image from "next/image";

export default function ReportHero() {
  return (
    <section className="relative h-[400px] w-full overflow-hidden flex items-center justify-center shrink-0">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/safari_hero_bg.png"
          alt="Yala Savannah Acacias Sunset"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Rich gradients for high-fidelity transition and typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/30 to-transparent opacity-95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center select-none max-w-4xl flex flex-col gap-4">
        <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase">CITIZEN CONSERVATION MATRIX</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Report Wildlife Sighting
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Contribute to our AI-driven conservation network by sharing your sightings in real-time. Help us protect the untamed beauty of Yala.
        </p>
      </div>
    </section>
  );
}
