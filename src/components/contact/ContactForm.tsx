"use client";

import { CheckCircle, Compass, ArrowRight } from "lucide-react";

interface ContactFormProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  fullName,
  setFullName,
  email,
  setEmail,
  subject,
  setSubject,
  message,
  setMessage,
  isSubmitted,
  setIsSubmitted,
  onSubmit,
}: ContactFormProps) {
  return (
    <div className="bg-[#f6f5f4] rounded-xl border border-zinc-200/50 p-8 flex flex-col justify-between h-full">
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
              onClick={() => setIsSubmitted(false)}
              className="bg-[#101b15] hover:bg-[#1f3026] text-white font-bold px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer"
            >
              New Message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
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
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full pr-10 cursor-pointer"
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
              className="bg-[#101b15] hover:bg-[#1a2f24] text-white font-bold py-3.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              Send Message
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
