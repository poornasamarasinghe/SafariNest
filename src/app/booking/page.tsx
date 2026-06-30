"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Globe, 
  Calendar, 
  Users, 
  ChevronDown, 
  Plus, 
  Minus,
  Sparkles,
  CheckCircle,
  HelpCircle
} from "lucide-react";

// Package definition type
interface SafariPackage {
  id: string;
  name: string;
  price: number;
}

const PACKAGES: SafariPackage[] = [
  { id: "dawn-predator", name: "Dawn Predator Quest (Luxury)", price: 320.00 },
  { id: "night-ranger", name: "Night Ranger Safari (Premium)", price: 280.00 },
  { id: "elephant-corridor", name: "Elephant Patrol (Standard)", price: 220.00 }
];

export default function BookingPage() {
  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("dawn-predator");
  const [date, setDate] = useState("2024-10-24");
  const [timeSlot, setTimeSlot] = useState("Morning (05:30 AM - 10:00 AM)");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("06:30");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derive package info
  const currentPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  
  // Calculate price components
  const basePrice = currentPackage.price;
  const guestCount = adults + childrenCount;
  const conservationFeeRate = 25.00; // $25 per guest
  const conservationFees = guestCount * conservationFeeRate;
  
  const subtotal = basePrice + conservationFees;
  const taxRate = 0.10; // 10% Taxes & Service Charge
  const taxesAndService = subtotal * taxRate;
  const totalAmount = subtotal + taxesAndService;

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill out all required traveler details (Name, Email, Phone).");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-55">
      {/* Main Content */}
      <main className="flex-grow pb-24">
        {/* Hero Section */}
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

        {/* Dynamic Forms Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
          {isSubmitted ? (
            <div className="bg-white rounded-2xl border border-zinc-150 p-8 md:p-12 shadow-sm text-center max-w-xl mx-auto my-12">
              <div className="w-16 h-16 bg-[#e6f4eb] text-[#137333] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">Reservation Confirmed!</h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Thank you for reserving your safari, <strong className="text-zinc-800">{fullName}</strong>. A confirmation email has been sent to <span className="text-[#915720] font-medium">{email}</span>. Our guides will reach out soon.
              </p>
              <div className="bg-[#0b1611] text-zinc-300 p-5 rounded-xl text-left text-xs mb-6 space-y-2">
                <p><strong>Package:</strong> {currentPackage.name}</p>
                <p><strong>Date & Time:</strong> {formatDate(date)} @ {selectedSlot} AM</p>
                <p><strong>Guests:</strong> {adults} Adults, {childrenCount} Children</p>
                <p><strong>Amount Paid:</strong> ${totalAmount.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-[#fba260] hover:bg-[#e99150] text-zinc-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200"
              >
                Book Another Safari
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Traveler Details Form */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200/60 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-zinc-800 mb-8 font-sans">
                  Traveler Details
                </h2>

                <form className="space-y-6" onSubmit={handleConfirmReservation}>
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 placeholder-zinc-400 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 placeholder-zinc-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone and Package */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 77 123 4567"
                        className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 placeholder-zinc-400 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Safari Package
                      </label>
                      <div className="relative">
                        <select
                          value={selectedPackageId}
                          onChange={(e) => setSelectedPackageId(e.target.value)}
                          className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full bg-white pr-10"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name} (${pkg.price.toFixed(0)})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Date and Time Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Time Slot
                      </label>
                      <div className="relative">
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full bg-white pr-10"
                        >
                          <option>Morning (05:30 AM - 10:00 AM)</option>
                          <option>Evening (02:00 PM - 06:30 PM)</option>
                          <option>Full Day (05:30 AM - 06:30 PM)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Adults and Children Counter */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Adults
                      </label>
                      <div className="flex items-center justify-between border border-zinc-200 rounded-lg px-3 py-2 text-zinc-850">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold text-sm w-12 text-center text-zinc-800">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Children
                      </label>
                      <div className="flex items-center justify-between border border-zinc-200 rounded-lg px-3 py-2 text-zinc-850">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold text-sm w-12 text-center text-zinc-800">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Special Requests / Dietary Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any specific wildlife focus or dietary needs for the onboard picnic?"
                      className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 placeholder-zinc-400 resize-none font-medium"
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Slots + Pricing Summary */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Live Availability Card */}
                <div className="bg-white rounded-xl border border-zinc-200/60 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                      <h3 className="font-bold text-zinc-800 text-sm">Live Availability</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-3 py-1.5 rounded-full tracking-wider uppercase flex items-center gap-1">
                      <Sparkles size={10} />
                      High Sighting Probability
                    </span>
                  </div>

                  {/* Slot Selection Buttons */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {/* 05:30 slot - Full */}
                    <button
                      type="button"
                      disabled
                      className="bg-[#171717] opacity-95 text-white p-3 rounded-lg flex flex-col items-center justify-center select-none cursor-not-allowed"
                    >
                      <span className="text-xs font-bold font-mono">05:30</span>
                      <span className="text-[8px] tracking-wider uppercase font-semibold text-zinc-450 mt-1">Full</span>
                    </button>

                    {/* 06:00 slot - 2 Slots */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot("06:00")}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedSlot === "06:00"
                          ? "border-2 border-zinc-900 bg-zinc-50 shadow-sm"
                          : "border border-zinc-200 hover:border-zinc-400 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-zinc-800 font-mono">06:00</span>
                      <span className="text-[8px] tracking-wider uppercase font-semibold text-amber-600 mt-1">2 Slots</span>
                    </button>

                    {/* 06:30 slot - Peak */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot("06:30")}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        selectedSlot === "06:30"
                          ? "border-2 border-[#fba260] bg-amber-50/20 shadow-sm"
                          : "border-2 border-zinc-200 hover:border-[#fba260]/60 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-zinc-900 font-mono">06:30</span>
                      <span className="text-[8px] tracking-wider uppercase font-extrabold text-[#f57c24] mt-1">Peak</span>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white"></div>
                    </button>

                    {/* 07:00 slot - 4 Slots */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot("07:00")}
                      className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedSlot === "07:00"
                          ? "border-2 border-zinc-900 bg-zinc-50 shadow-sm"
                          : "border border-zinc-200 hover:border-zinc-400 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-zinc-800 font-mono">07:00</span>
                      <span className="text-[8px] tracking-wider uppercase font-semibold text-emerald-600 mt-1">4 Slots</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    * Based on AI-driven data from the last 48 hours, leopard sightings are 40% higher between 06:00 and 07:30.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#101b15] text-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-6 font-sans">Summary</h3>

                  {/* Booking parameters overview */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4">
                      <Globe size={18} className="text-zinc-500 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Package</p>
                        <p className="text-sm font-semibold text-zinc-200">{currentPackage.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Calendar size={18} className="text-zinc-500 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Date & Time</p>
                        <p className="text-sm font-semibold text-zinc-200">{formatDate(date)} @ {selectedSlot} AM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Users size={18} className="text-zinc-500 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Guests</p>
                        <p className="text-sm font-semibold text-zinc-200">
                          {adults} Adult{adults > 1 ? "s" : ""}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? "ren" : ""}` : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 my-6"></div>

                  {/* Calculations */}
                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Base Price (Luxury Jeep)</span>
                      <span className="font-semibold text-zinc-250">${basePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Conservation Fees ({guestCount}x)</span>
                      <span className="font-semibold text-zinc-250">${conservationFees.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Taxes & Service Charge</span>
                      <span className="font-semibold text-zinc-250">${taxesAndService.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 my-6"></div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-3xl font-extrabold text-[#fba260] font-mono">${totalAmount.toFixed(2)}</span>
                  </div>

                  {/* Action */}
                  <button
                    type="submit"
                    onClick={handleConfirmReservation}
                    className="w-full bg-[#9b591b] hover:bg-[#864b15] text-white font-bold py-3.5 px-6 rounded-lg text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    Confirm Reservation
                  </button>
                  
                  <p className="text-center text-[10px] text-zinc-500 mt-4 leading-relaxed">
                    Free cancellation up to 48 hours before departure.
                  </p>
                </div>

              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
