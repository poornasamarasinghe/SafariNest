"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Radio,
  Leaf,
  Compass,
  ExternalLink,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function ContactPage() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Expedition Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setResult("Sending...");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "b347522c-fdb0-46ef-9218-a347a7932780");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("Success!");
        setIsSubmitted(true);
      } else {
        setResult("Error");
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setResult("Error");
      alert("An error occurred. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setSubject("Expedition Inquiry");
    setMessage("");
    setResult("");
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Main Content */}
      <main className="grow pb-20">
        {/* Hero Section */}
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
              <p className="text-zinc-200 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-sans font-light">
                Begin your journey into the untamed heart of Sri Lanka. Our trackers and
                expedition experts are standing by.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Contact Quick Info Cards (overlapping hero) */}
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

        {/* Main Grid: Send a Message & Visuals (Leopard, Conservation) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-[#f6f5f4] rounded-xl border border-zinc-200/50 p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-zinc-850 mb-8 font-sans">
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <div className="bg-white rounded-xl border border-zinc-150 p-8 text-center my-6">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-1">Inquiry Sent!</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                      Thanks for reaching out, <strong className="text-zinc-800">{fullName}</strong>. We have received your inquiry and our travel experts will respond to you within 2 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="bg-[#101b15] hover:bg-[#1f3026] text-white font-bold px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-colors duration-200"
                    >
                      New Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium placeholder-zinc-300"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium placeholder-zinc-300"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full pr-10"
                        >
                          <option>Expedition Inquiry</option>
                          <option>Custom Luxury Tour</option>
                          <option>Jeep Rental Booking</option>
                          <option>Photography Safari</option>
                          <option>Other Inquiries</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                          <Compass size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you plan your next expedition?"
                        className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium placeholder-zinc-350 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#101b15] hover:bg-[#1a2f24] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <ArrowRight size={14} />}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Leopard Image & Conservation Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Card 1: Leopard Live Alert */}
              <div className="relative h-64 rounded-xl overflow-hidden shadow-sm group">
                <Image
                  src="/images/leopard-sighting.png"
                  alt="Sri Lankan Leopard close-up profile"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Floating sighting alert badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/25 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-3.5 text-white shadow-lg">
                  <div className="w-9 h-9 rounded-full bg-[#fca260]/90 flex items-center justify-center text-zinc-950 animate-pulse">
                    <Radio size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-sans">Live Leopard Sighting</h4>
                    <p className="text-[10px] text-zinc-300 font-medium mt-0.5">
                      Zone 1 North • 12 mins ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Conservation First Card */}
              <div className="bg-[#101b15] text-white rounded-xl p-8 flex flex-col justify-between grow shadow-sm">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2.5">
                    <Leaf className="text-emerald-500" size={20} />
                    Conservation First
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                    Every expedition contributes directly to the Yala Wildlife Preservation Fund. 
                    We operate with zero-impact principles to ensure future generations can witness 
                    the same raw beauty we do today.
                  </p>
                </div>

                <div className="flex gap-3 mt-6 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 border border-zinc-700/60 bg-zinc-800/30 text-[9px] font-bold text-zinc-300 px-3.5 py-2 rounded-full tracking-wider uppercase">
                    <CheckCircle size={10} className="text-emerald-500" />
                    Eco-Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-zinc-700/60 bg-zinc-800/30 text-[9px] font-bold text-zinc-300 px-3.5 py-2 rounded-full tracking-wider uppercase">
                    <CheckCircle size={10} className="text-[#fca260]" />
                    Tracker Verified
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Map directions container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
          <div className="relative h-80 rounded-xl overflow-hidden border border-zinc-200 shadow-sm flex items-center justify-center">
            {/* Topographic map image */}
            <Image
              src="/images/topo-map.png"
              alt="Topographic contour map visualization"
              fill
              className="object-cover opacity-85"
            />
            {/* Floating marker card */}
            <div className="relative z-10 bg-white border border-zinc-150 rounded-xl p-6 shadow-xl max-w-xs text-center flex flex-col items-center">
              <div className="w-10 h-10 bg-[#e8e4e0] text-[#8c5a2b] rounded-full flex items-center justify-center mb-3">
                <Compass size={18} className="animate-spin-slow" />
              </div>
              <h4 className="font-extrabold text-sm text-zinc-900 font-sans">YalaWild Basecamp</h4>
              <p className="text-[10px] text-zinc-500 font-semibold mt-1">Gate 1, Palatupana</p>
              
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold text-[#9b591b] hover:text-[#804814] uppercase tracking-wider border-t border-zinc-100 pt-3.5 w-full justify-center transition-colors cursor-pointer"
              >
                Get Directions
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
