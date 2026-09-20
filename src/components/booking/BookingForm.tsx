"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

interface Package {
  id: string;
  name: string;
  price: number;
}

interface BookingFormProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  selectedPackageId: string;
  setSelectedPackageId: (val: string) => void;
  packages: Package[];
  date: string;
  setDate: (val: string) => void;
  timeSlot: string;
  setTimeSlot: (val: string) => void;
  adults: number;
  setAdults: (val: number) => void;
  childrenCount: number;
  setChildrenCount: (val: number) => void;
  specialRequests: string;
  setSpecialRequests: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// ── Validation helpers ─────────────────────────────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

/**
 * Accepts:
 *  - International with country code: +1 800 555 0100, +94771234567, +44 20 7946 0958
 *  - Local formats: 077-123-4567, (077) 123 4567, 0771234567
 *  - Min 7 digits (some islands/special numbers), Max 15 (E.164 standard)
 */
const PHONE_REGEX = /^\+?[0-9]{1,4}[\s\-.]?(?:\(?[0-9]{1,4}\)?[\s\-.]?){1,4}[0-9]{1,9}$/;

function validatePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!value.trim()) return "Phone number is required.";
  if (digits.length < 7) return "Phone number is too short (minimum 7 digits).";
  if (digits.length > 15) return "Phone number is too long (maximum 15 digits).";
  if (!PHONE_REGEX.test(value.trim())) return "Enter a valid phone number (e.g. +94 77 123 4567 or +1 800 555 0100).";
  return "";
}

function validateEmail(value: string): string {
  if (!value.trim()) return "Email address is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address (e.g. john@example.com).";
  return "";
}
// ───────────────────────────────────────────────────────────────────────────

export default function BookingForm({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  selectedPackageId,
  setSelectedPackageId,
  packages,
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  specialRequests,
  setSpecialRequests,
  onSubmit,
}: BookingFormProps) {
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailTouched) setEmailError(validateEmail(val));
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (phoneTouched) setPhoneError(validatePhone(val));
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(validatePhone(phone));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Run full validation before submitting
    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);
    setEmailTouched(true);
    setPhoneTouched(true);
    setEmailError(eErr);
    setPhoneError(pErr);
    if (eErr || pErr) return; // block submission
    onSubmit(e);
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200/60 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-zinc-800 mb-8 font-sans">
        Traveler Details
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
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
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="john@example.com"
              className={`border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 text-zinc-800 placeholder-zinc-400 font-medium transition-colors ${
                emailError
                  ? "border-red-400 focus:ring-red-400/40 focus:border-red-400 bg-red-50/40"
                  : "border-zinc-200 focus:ring-amber-500/50 focus:border-amber-500"
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {emailError}
              </p>
            )}
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
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="+94 77 123 4567"
              className={`border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 text-zinc-800 placeholder-zinc-400 font-medium transition-colors ${
                phoneError
                  ? "border-red-400 focus:ring-red-400/40 focus:border-red-400 bg-red-50/40"
                  : "border-zinc-200 focus:ring-amber-500/50 focus:border-amber-500"
              }`}
            />
            {phoneError && (
              <p className="text-red-500 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {phoneError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Safari Package
            </label>
            <div className="relative">
              <select
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full bg-white pr-10 cursor-pointer"
              >
                {packages.map((pkg) => (
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
              className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium bg-white cursor-pointer"
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
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-800 font-medium appearance-none w-full bg-white pr-10 cursor-pointer"
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
                className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="font-semibold text-sm w-12 text-center text-zinc-800">{adults}</span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors cursor-pointer"
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
                className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="font-semibold text-sm w-12 text-center text-zinc-800">{childrenCount}</span>
              <button
                type="button"
                onClick={() => setChildrenCount(childrenCount + 1)}
                className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-550 border border-zinc-150 transition-colors cursor-pointer"
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
  );
}
