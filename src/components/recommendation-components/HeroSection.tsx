import Image from "next/image";

interface HeroSectionProps {
  onScrollToPrediction: () => void;
}

export default function HeroSection({ onScrollToPrediction }: HeroSectionProps) {
  return (
    <section className="relative h-[520px] w-full overflow-hidden flex items-center shrink-0">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/safari_hero_bg.png"
          alt="Yala National Park Savanna Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Overlay for dark elegant feel and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent opacity-95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 z-10 text-white select-none max-w-7xl">
        <div className="max-w-2xl flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            AI Powered <br />
            <span className="text-amber-500 bg-clip-text">Safari Intelligence</span>
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
            Harness the power of neural tracking. Our AI analyzes migratory patterns, weather data, and real-time sightings to predict where wildlife will emerge.
          </p>
          <div className="pt-2">
            <button
              onClick={onScrollToPrediction}
              id="btn-hero-start"
              className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
            >
              Start Prediction Engine
              <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
