"use client";

import { useState } from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import ContactVisuals from "@/components/contact/ContactVisuals";
import ContactMap from "@/components/contact/ContactMap";

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
        <ContactHero />

        {/* 3 Contact Quick Info Cards (overlapping hero) */}
        <ContactCards />

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
            <div className="lg:col-span-5">
              <ContactVisuals />
            </div>

          </div>
        </div>

        {/* Map directions container */}
        <ContactMap />

      </main>
    </div>
  );
}
