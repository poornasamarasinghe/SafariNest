"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search,
  Sparkles,
  Info,
  ChevronDown,
  Cpu,
  Car,
  UserCheck,
  Route,
  Leaf,
  Users,
  Target,
  Compass,
  Clock,
  Quote,
  ArrowRight
} from "lucide-react";

// Helper to map icon strings to components dynamically
const iconMap: Record<string, any> = {
  Cpu,
  Car,
  UserCheck,
  Route,
  Leaf,
  Users,
  Target,
  Compass,
  Clock
};

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={16} />;
}

// Packages Data
const ALL_PACKAGES = [
  {
    id: "leopard-tracker-elite",
    name: "Block 1 Leopard Prime Tracker",
    image: "/images/package-leopard.png",
    sightingChance: "85% Sighting Chance",
    zone: "Block 1",
    animal: "Leopard",
    duration: "Morning",
    features: [
      { text: "AI-Aided Sighting", icon: "Cpu" },
      { text: "Modified 4x4 Jeep", icon: "Car" },
      { text: "Expert Tracker", icon: "UserCheck" }
    ],
    price: 65,
    bookingPackageId: "dawn-predator"
  },
  {
    id: "gentle-giants-expedition",
    name: "Gentle Giants Expedition",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80",
    sightingChance: null,
    zone: "Elephant Corridors",
    animal: "Elephant",
    duration: "Morning",
    features: [
      { text: "Elephant Corridor Focus", icon: "Route" },
      { text: "Low-noise Electric Hybrid", icon: "Leaf" },
      { text: "Kid-Friendly Guide", icon: "Users" }
    ],
    price: 55,
    bookingPackageId: "elephant-corridor"
  },
  {
    id: "block-5-wilderness",
    name: "Block 5 Hidden Wilderness",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    sightingChance: null,
    zone: "Block 5",
    animal: "Sloth Bear",
    duration: "Full Day",
    features: [
      { text: "Sloth Bear Priority", icon: "Target" },
      { text: "Off-Path Navigation", icon: "Compass" },
      { text: "Full Day Immersion", icon: "Clock" }
    ],
    price: 75,
    bookingPackageId: "night-ranger"
  }
];

const TESTIMONIALS = [
  {
    initials: "JD",
    name: "Julian Drake",
    role: "Nature Photographer",
    quote: "The AI tracking actually works! Our guide received a ping about a leopard sighting 2km away and we were the first ones there. Incredible technology combined with wild nature."
  },
  {
    initials: "SL",
    name: "Sarah Lowes",
    role: "Conservationist",
    quote: "Quiet, professional, and respectful of the animals. The hybrid jeep made such a difference—we could actually hear the birds and the rustling leaves instead of a diesel engine."
  },
  {
    initials: "AM",
    name: "Aiden Marcus",
    role: "Solo Traveler",
    quote: "Booked Block 5 for a sloth bear search and wasn't disappointed. The knowledge of the trackers is unparalleled. They know every path and every resident animal's name."
  }
];

export default function SafarisPage() {
  // Filter States
  const [selectedZone, setSelectedZone] = useState("All Blocks");
  const [selectedAnimal, setSelectedAnimal] = useState("Any Sighting");
  const [selectedDuration, setSelectedDuration] = useState("Morning");
  
  const [packages, setPackages] = useState<any[]>(ALL_PACKAGES);
  // Active Filtered Packages list
  const [filteredPackages, setFilteredPackages] = useState(ALL_PACKAGES);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const dbData = await res.json();
          const merged = dbData.map((dbPkg: any) => {
            const fallbackId = dbPkg.id === "leopard-tracker-elite" ? "leopard-tracker-elite"
                             : dbPkg.id === "gentle-giants-expedition" ? "gentle-giants-expedition"
                             : dbPkg.id;
            const fallback = ALL_PACKAGES.find(p => p.id === fallbackId) || ALL_PACKAGES[0];
            return {
              ...fallback,
              id: dbPkg.id,
              name: dbPkg.name || fallback.name,
              price: dbPkg.price !== undefined ? Number(dbPkg.price) : fallback.price,
              image: dbPkg.image || fallback.image,
              zone: dbPkg.zone || fallback.zone,
              duration: dbPkg.duration || fallback.duration,
              description: dbPkg.description || fallback.name,
            };
          });
          setPackages(merged);
          setFilteredPackages(merged);
        }
      } catch (err) {
        console.error("Failed to load dynamic packages:", err);
      }
    };
    fetchPackages();
  }, []);

  // Search filter trigger
  const handleSearch = () => {
    let result = packages;

    if (selectedZone !== "All Blocks") {
      result = result.filter(pkg => pkg.zone === selectedZone);
    }

    if (selectedAnimal !== "Any Sighting") {
      result = result.filter(pkg => pkg.animal === selectedAnimal);
    }

    // Filter duration
    result = result.filter(pkg => pkg.duration === selectedDuration || selectedDuration === "All");

    setFilteredPackages(result);
    setHasSearched(true);
  };

  // Reset helper
  const handleReset = () => {
    setSelectedZone("All Blocks");
    setSelectedAnimal("Any Sighting");
    setSelectedDuration("Morning");
    setFilteredPackages(packages);
    setHasSearched(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative h-[480px] w-full overflow-hidden flex items-center justify-center">
          <Image
            src="/images/safaris-hero.png"
            alt="Yala Savanna Sunset Landscape"
            fill
            className="object-cover object-bottom"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/10"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 text-white">
            <div className="max-w-2xl mt-[-40px]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
                Choose Your Yala <br />Experience
              </h1>
              <p className="text-zinc-200 text-xs md:text-sm max-w-lg leading-relaxed font-light">
                Curated expeditions into the heart of Sri Lanka's wild sanctuary, powered by advanced tracking technology.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar (floating over hero) */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl border border-zinc-200/50 shadow-xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
            
            {/* Filter 1: Zone */}
            <div className="flex-1 flex flex-col gap-1.5 md:border-r border-zinc-100 pr-0 md:pr-4">
              <label className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400">
                Safari Zone
              </label>
              <div className="relative">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-3 text-xs text-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 appearance-none pr-10 cursor-pointer transition-all hover:bg-zinc-100/60"
                >
                  <option>All Blocks</option>
                  <option>Block 1</option>
                  <option>Block 5</option>
                  <option>Elephant Corridors</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Filter 2: Animal */}
            <div className="flex-1 flex flex-col gap-1.5 md:border-r border-zinc-100 pr-0 md:pr-4">
              <label className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400">
                Animal Priority
              </label>
              <div className="relative">
                <select
                  value={selectedAnimal}
                  onChange={(e) => setSelectedAnimal(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-3 text-xs text-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 appearance-none pr-10 cursor-pointer transition-all hover:bg-zinc-100/60"
                >
                  <option>Any Sighting</option>
                  <option value="Leopard">Leopard Focus</option>
                  <option value="Elephant">Elephant Focus</option>
                  <option value="Sloth Bear">Sloth Bear Focus</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Filter 3: Duration */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400">
                Duration
              </label>
              <div className="relative">
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-3 text-xs text-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500 appearance-none pr-10 cursor-pointer transition-all hover:bg-zinc-100/60"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Full Day">Full Day</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col justify-end pt-2 md:pt-0">
              <button
                onClick={handleSearch}
                className="bg-[#8c5a2b] hover:bg-[#734921] active:bg-[#5c3a19] text-white font-bold px-6 py-3 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Search size={14} />
                Find Safari
              </button>
            </div>
            
          </div>
        </section>

        {/* Packages Cards Grid Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          
          {/* Header if filter searched with no results */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-16 bg-white border border-zinc-150 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
              <span className="text-zinc-400 text-3xl font-light mb-3 block">☹</span>
              <h3 className="text-lg font-bold text-zinc-800 mb-1">No Matching Packages Found</h3>
              <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                We couldn't find a safari matching those specific filter selections. Try changing your parameters or resetting.
              </p>
              <button
                onClick={handleReset}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-5 py-2.5 rounded-full text-[10px] tracking-wider uppercase transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {filteredPackages.length > 0 && (
            <div>
              {/* Header to display search filters active */}
              {hasSearched && (
                <div className="flex justify-between items-center mb-8 bg-zinc-100/60 border border-zinc-200/50 rounded-xl px-5 py-3 text-xs">
                  <span className="text-zinc-650">
                    Showing <strong className="text-zinc-800 font-bold">{filteredPackages.length}</strong> available safari experience{filteredPackages.length > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={handleReset}
                    className="text-[#8c5a2b] hover:underline font-extrabold uppercase tracking-wider text-[10px]"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl overflow-hidden border border-zinc-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Card Image Area */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-w-758px) 100vw, 33vw"
                        unoptimized
                      />
                      
                      {/* Sighting Chance Overlay Badge */}
                      {pkg.sightingChance && (
                        <div className="absolute top-4 right-4 bg-black/45 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white shadow-lg text-[9px] font-extrabold tracking-wider uppercase text-[#fba260]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#fba260] animate-pulse"></div>
                          {pkg.sightingChance}
                        </div>
                      )}
                    </div>

                    {/* Card Body content */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-zinc-900 leading-tight mb-4 font-sans font-extrabold group-hover:text-[#8c5a2b] transition-colors">
                          {pkg.name}
                        </h3>

                        {/* Features List */}
                        <div className="space-y-3.5 mb-8">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-zinc-650 text-xs font-medium">
                              <div className="w-7 h-7 rounded-lg bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-600">
                                <FeatureIcon name={feature.icon} className="text-zinc-650" />
                              </div>
                              <span>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer row */}
                      <div className="border-t border-zinc-100 pt-6 flex items-center justify-between mt-auto">
                        {/* Pricing */}
                        <div>
                          <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wide block">From</span>
                          <div className="text-zinc-900 font-extrabold font-sans">
                            <span className="text-2xl">${pkg.price}</span>
                            <span className="text-xs text-zinc-400 font-semibold font-mono">/Jeep</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3.5">
                          {/* Info Button */}
                          <button
                            aria-label="Package Details"
                            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-450 hover:bg-zinc-50 hover:text-zinc-900 transition-all cursor-pointer"
                          >
                            <Info size={14} />
                          </button>
                          
                          {/* Book Now Button */}
                          <Link
                            href={`/booking?package=${pkg.bookingPackageId}`}
                            className="bg-[#101b15] hover:bg-[#1f3026] text-white font-bold px-5 py-2.5 rounded-full text-xs tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* Testimonials Section */}
        <section className="bg-[#f6f5f4] border-y border-zinc-200/50 py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mb-3">
                What Explorers Say
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm font-sans font-light leading-relaxed">
                Real experiences from our community of wildlife enthusiasts.
              </p>
            </div>

            {/* Testimonials Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200/50 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Quote & Icon */}
                  <div>
                    <Quote className="text-[#fba260] mb-5 transform rotate-180" size={24} fill="currentColor" />
                    <p className="text-zinc-700 italic text-xs leading-relaxed font-sans mb-8">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3.5 border-t border-zinc-100 pt-5">
                    {/* Initials Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#f6f5f4] flex items-center justify-center font-bold text-xs text-zinc-800 shadow-inner">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{t.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-medium tracking-wide mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-[#101b15] py-24 px-6 md:px-12 text-center text-white overflow-hidden">
          {/* Map topography texture overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image
              src="/images/topo-map.png"
              alt="Map Contour Overlay"
              fill
              className="object-cover object-center scale-110 filter invert"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Ready to start your adventure?
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans leading-relaxed max-w-lg mx-auto">
              Join the next elite expedition. Live availability updates every 60 seconds based on park traffic and animal movement.
            </p>
            <div className="pt-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[#8c5a2b] hover:bg-[#734921] text-white font-extrabold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 shadow-lg cursor-pointer"
              >
                Check Live Availability
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}