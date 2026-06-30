"use client";

import { CheckCircle } from "lucide-react";

interface BookingConfirmationProps {
  fullName: string;
  email: string;
  packageName: string;
  date: string;
  selectedSlot: string;
  adults: number;
  childrenCount: number;
  totalAmount: number;
  formatDate: (dateStr: string) => string;
  onReset: () => void;
}

export default function BookingConfirmation({
  fullName,
  email,
  packageName,
  date,
  selectedSlot,
  adults,
  childrenCount,
  totalAmount,
  formatDate,
  onReset,
}: BookingConfirmationProps) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-150 p-8 md:p-12 shadow-sm text-center max-w-xl mx-auto my-12">
      <div className="w-16 h-16 bg-[#e6f4eb] text-[#137333] rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">Reservation Confirmed!</h2>
      <p className="text-zinc-500 text-sm leading-relaxed mb-6">
        Thank you for reserving your safari, <strong className="text-zinc-800">{fullName}</strong>. A confirmation email has been sent to <span className="text-[#915720] font-medium">{email}</span>. Our guides will reach out soon.
      </p>
      <div className="bg-[#0b1611] text-zinc-300 p-5 rounded-xl text-left text-xs mb-6 space-y-2">
        <p><strong>Package:</strong> {packageName}</p>
        <p><strong>Date & Time:</strong> {formatDate(date)} @ {selectedSlot} AM</p>
        <p><strong>Guests:</strong> {adults} Adults, {childrenCount} Children</p>
        <p><strong>Amount Paid:</strong> ${totalAmount.toFixed(2)}</p>
      </div>
      <button
        onClick={onReset}
        className="bg-[#fba260] hover:bg-[#e99150] text-zinc-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
      >
        Book Another Safari
      </button>
    </div>
  );
}
