"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Camera,
  Compass,
  Radio,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  RefreshCw,
  Eye,
  Settings
} from "lucide-react";

// Gallery Items Configuration
const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Wildlife",
    title: "Leopard Sighting",
    // Realistic photo of Sri Lankan leopard
    realisticUrl: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "Sri Lankan Leopard resting on a granite boulder in Yala's Zone 1.",
    photographer: "Julian Drake"
  },
  {
    id: 2,
    category: "Wildlife",
    title: "Gentle Giant in Grassland",
    // Realistic photo of elephant
    realisticUrl: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "A mature bull elephant grazing along the edge of Yala main lake.",
    photographer: "Sarah Lowes"
  },
  {
    id: 3,
    category: "Safari Tours",
    title: "Elite Expedition at Rock Base",
    // Realistic photo of safari jeeps
    realisticUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "Jeeps waiting during an afternoon tracker ping near Elephant rock.",
    photographer: "Aiden Marcus"
  },
  {
    id: 4,
    category: "Safari Tours",
    title: "Cruising the Savanna",
    // Realistic photo of jeep on dirt road
    realisticUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "Premium modified 4x4 cruising through Yala dry savanna.",
    photographer: "Chathura De Silva"
  },
  {
    id: 5,
    category: "Tourist Experiences",
    title: "Pathing through the Forest",
    // Realistic photo of hikers
    realisticUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "Explorers hiking the protected corridors with an expert tracker.",
    photographer: "Emma Watson"
  },
  {
    id: 6,
    category: "Tourist Experiences",
    title: "Night Basecamp Bonfire",
    // Realistic photo of safari tent campfire
    realisticUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "Eco-camp setting near Block 5 under Yala's dark starry sky.",
    photographer: "Marcus Aurelius"
  },
  {
    id: 7,
    category: "Wildlife",
    title: "Yala Malabar Hornbill",
    // Realistic photo of hornbill bird
    realisticUrl: "https://images.unsplash.com/photo-1444464666168-49d633b867df?auto=format&fit=crop&w=800&q=80",
    sampleUrl: "/images/package-leopard.png",
    description: "An exotic hornbill bird perches on a branch in Block 1 sanctuary.",
    photographer: "Nirmal Perera"
  }
];

export default function GalleryPage() {
  // Config state: toggle between realistic photos and single sample leopard image
  const [useRealistic, setUseRealistic] = useState(true);
  
  // Category Filtering States
  const [selectedCategory, setSelectedCategory] = useState("All Explorations");
  const categories = ["All Explorations", "Wildlife", "Safari Tours", "Tourist Experiences"];

  // Lightbox View State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Load More Simulation State
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<any[]>([]);

  // Filter logic
  const getFilteredItems = () => {
    let items = [...GALLERY_ITEMS, ...additionalImages];
    if (selectedCategory !== "All Explorations") {
      items = items.filter(item => item.category === selectedCategory);
    }
    return items;
  };

  const activeItems = getFilteredItems();

  // Load More Simulation
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      // Add 3 mock new items
      const newItems = [
        {
          id: GALLERY_ITEMS.length + additionalImages.length + 1,
          category: "Wildlife",
          title: "Golden Hour Python",
          realisticUrl: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80",
          sampleUrl: "/images/package-leopard.png",
          description: "A python slithers through forest foliage.",
          photographer: "Dave Grohl"
        },
        {
          id: GALLERY_ITEMS.length + additionalImages.length + 2,
          category: "Safari Tours",
          title: "Dawn Crossing",
          realisticUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
          sampleUrl: "/images/package-leopard.png",
          description: "Jeeps crossing Yala river in early morning mist.",
          photographer: "Julian Drake"
        },
        {
          id: GALLERY_ITEMS.length + additionalImages.length + 3,
          category: "Tourist Experiences",
          title: "Sunset Lookout",
          realisticUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
          sampleUrl: "/images/package-leopard.png",
          description: "Scenic lookout view of Yala national park sunset.",
          photographer: "Aiden Marcus"
        }
      ];
      setAdditionalImages(prev => [...prev, ...newItems]);
      setIsLoadingMore(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-55 font-sans antialiased text-zinc-900">
      <Header />

      <main className="flex-grow">
        
        {/* Hero Section with Live Tracker Overlay */}
        <section className="relative h-[480px] w-full overflow-hidden flex items-center">
          <Image
            src="/images/safaris-hero.png"
            alt="Yala Savanna Golden sunset background"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/25"></div>

          {/* Grid Layout inside Hero */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            {/* Left Column: Text */}
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Safari Memories
              </h1>
              <p className="text-zinc-200 text-xs md:text-sm font-sans font-light leading-relaxed max-w-md">
                Explore the untamed beauty of Yala through the lenses of our explorers and expert guides.
              </p>
            </div>

            {/* Right Column: Live Tracker glassmorphic widget */}
            <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white max-w-xs w-full shadow-2xl relative">
              {/* Pulse light indicator */}
              <div className="absolute top-6 right-6 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>

              {/* Card Header */}
              <div className="flex items-center gap-2 mb-6">
                <Radio size={14} className="text-red-400 animate-pulse" />
                <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                  Live Tracker
                </h3>
              </div>

              {/* Sightings List */}
              <div className="space-y-4">
                {/* Sighting 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mt-0.5 flex-shrink-0">
                    <Radio size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100">Leopard Sighting</h4>
                    <p className="text-[9px] text-zinc-400 font-semibold font-sans mt-0.5">
                      Block 1 • 4 mins ago
                    </p>
                  </div>
                </div>

                {/* Sighting 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mt-0.5 flex-shrink-0">
                    <Compass size={14} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100">Elephant Herd</h4>
                    <p className="text-[9px] text-zinc-400 font-semibold font-sans mt-0.5">
                      Main Lake • 12 mins ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Demo Toggle Control Bar */}
        <section className="bg-zinc-100 border-b border-zinc-200 py-3 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-semibold flex items-center gap-1.5">
              <Settings size={14} />
              Customize visual source content:
            </span>
            <div className="flex bg-white rounded-lg border border-zinc-200 p-0.5 shadow-sm">
              <button
                onClick={() => setUseRealistic(true)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  useRealistic
                    ? "bg-[#101b15] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Realistic Demo Photos
              </button>
              <button
                onClick={() => setUseRealistic(false)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  !useRealistic
                    ? "bg-[#101b15] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                Single Sample Leopard
              </button>
            </div>
          </div>
        </section>

        {/* Category Filters Pills */}
        <section className="py-12 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 px-6">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-sm font-bold scale-[1.03]"
                      : "bg-white text-zinc-500 hover:bg-zinc-50 border border-zinc-200/50 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery Grid (3, 3, 1 centered layout) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          {activeItems.length === 0 ? (
            <div className="text-center py-16 bg-white border border-zinc-200/50 rounded-2xl max-w-md mx-auto shadow-sm">
              <p className="text-zinc-400 text-2xl mb-2">📷</p>
              <h3 className="text-sm font-bold text-zinc-800">No Photos In Category</h3>
              <p className="text-[11px] text-zinc-400 mt-1">There are currently no images under {selectedCategory}.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Row 1 & 2: Grid of 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeItems.slice(0, 6).map((item, idx) => {
                  const imageSrc = useRealistic ? item.realisticUrl : item.sampleUrl;
                  const itemIndex = idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setLightboxIndex(itemIndex)}
                      className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer aspect-square relative"
                    >
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-w-768px) 100vw, 33vw"
                        unoptimized={imageSrc.startsWith("http")}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#fba260] mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold leading-tight font-sans tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-zinc-300 font-light mt-1 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                          <Maximize2 size={12} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Row 3: Single Centered Card */}
              {activeItems.length >= 7 && (
                <div className="flex justify-center pt-2">
                  {activeItems.slice(6, 7).map((item) => {
                    const imageSrc = useRealistic ? item.realisticUrl : item.sampleUrl;
                    const itemIndex = 6;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setLightboxIndex(itemIndex)}
                        className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer w-full md:w-1/3 aspect-square relative"
                      >
                        <Image
                          src={imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-w-768px) 100vw, 33vw"
                          unoptimized={imageSrc.startsWith("http")}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#fba260] mb-1">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold leading-tight font-sans tracking-wide">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-zinc-300 font-light mt-1 line-clamp-1">
                            {item.description}
                          </p>
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                            <Maximize2 size={12} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Row: dynamic grid elements loaded */}
              {activeItems.length > 7 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200/40">
                  {activeItems.slice(7).map((item, idx) => {
                    const imageSrc = useRealistic ? item.realisticUrl : item.sampleUrl;
                    const itemIndex = 7 + idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setLightboxIndex(itemIndex)}
                        className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer aspect-square relative animate-fade-in"
                      >
                        <Image
                          src={imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-w-768px) 100vw, 33vw"
                          unoptimized={imageSrc.startsWith("http")}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#fba260] mb-1">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold leading-tight font-sans tracking-wide">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-zinc-300 font-light mt-1 line-clamp-1">
                            {item.description}
                          </p>
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                            <Maximize2 size={12} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Load More Button */}
        <section className="pb-24 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="border border-[#8c5a2b] hover:bg-[#8c5a2b] text-[#8c5a2b] hover:text-white font-extrabold px-6 py-3 rounded-lg text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 select-none"
          >
            {isLoadingMore ? (
              <>
                <RefreshCw size={12} className="animate-spin" />
                Loading Memories...
              </>
            ) : (
              <>
                Load More Memories
                <RefreshCw size={12} />
              </>
            )}
          </button>
        </section>

      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 md:p-12 transition-opacity duration-300">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-[#fba260] transition-colors cursor-pointer w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Left Arrow (if multiple) */}
          {lightboxIndex > 0 && (
            <button
              onClick={() => setLightboxIndex(lightboxIndex - 1)}
              className="absolute left-6 text-white hover:text-[#fba260] transition-colors cursor-pointer w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-lg font-bold"
            >
              ‹
            </button>
          )}

          {/* Active Image container */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-video md:h-[500px] overflow-hidden rounded-xl">
              <Image
                src={useRealistic ? activeItems[lightboxIndex].realisticUrl : activeItems[lightboxIndex].sampleUrl}
                alt={activeItems[lightboxIndex].title}
                fill
                className="object-contain"
                unoptimized={(useRealistic ? activeItems[lightboxIndex].realisticUrl : activeItems[lightboxIndex].sampleUrl).startsWith("http")}
              />
            </div>
            
            {/* Meta */}
            <div className="w-full text-left mt-6 max-w-2xl text-white space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#fba260]">
                {activeItems[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold font-sans">
                {activeItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-zinc-400 font-light font-sans leading-relaxed">
                {activeItems[lightboxIndex].description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[10px] text-zinc-500 font-semibold uppercase">
                <Camera size={10} />
                <span>Captured by {activeItems[lightboxIndex].photographer}</span>
              </div>
            </div>
          </div>

          {/* Right Arrow (if multiple) */}
          {lightboxIndex < activeItems.length - 1 && (
            <button
              onClick={() => setLightboxIndex(lightboxIndex + 1)}
              className="absolute right-6 text-white hover:text-[#fba260] transition-colors cursor-pointer w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-lg font-bold"
            >
              ›
            </button>
          )}
        </div>
      )}

      <Footer variant="dark" />
    </div>
  );
}
