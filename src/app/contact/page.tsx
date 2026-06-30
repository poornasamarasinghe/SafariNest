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

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }
    setIsSubmitted(true);
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
            <div className="lg:col-span-7">
              <ContactForm
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                subject={subject}
                setSubject={setSubject}
                message={message}
                setMessage={setMessage}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                onSubmit={handleSubmit}
              />
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
