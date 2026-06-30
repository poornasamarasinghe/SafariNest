"use client";

import { Globe, Calendar, Users } from "lucide-react";

interface BookingSummaryProps {
  packageName: string;
  date: string;
  selectedSlot: string;
  adults: number;
  childrenCount: number;
  basePrice: number;
  conservationFees: number;
  taxesAndService: number;
  totalAmount: number;
  formatDate: (dateStr: string) => string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BookingSummary({
  packageName,
  date,
  selectedSlot,
  adults,
  childrenCount,
  basePrice,
  conservationFees,
  taxesAndService,
  totalAmount,
  formatDate,
  onSubmit,
}: BookingSummaryProps) {
  return (
    <div className="bg-[#101b15] text-white rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-bold mb-6 font-sans">Summary</h3>

      {/* Booking parameters overview */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4">
          <Globe size={18} className="text-zinc-500 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Package</p>
            <p className="text-sm font-semibold text-zinc-200">{packageName}</p>
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
        <div className="flex justify-between items-center text-zinc-450">
          <span>Base Price (Luxury Jeep)</span>
          <span className="font-semibold text-zinc-200">${basePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-zinc-450">
          <span>Conservation Fees ({adults + childrenCount}x)</span>
          <span className="font-semibold text-zinc-200">${conservationFees.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-zinc-450">
          <span>Taxes & Service Charge</span>
          <span className="font-semibold text-zinc-200">${taxesAndService.toFixed(2)}</span>
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
        onClick={onSubmit}
        className="w-full bg-[#9b591b] hover:bg-[#864b15] text-white font-bold py-3.5 px-6 rounded-lg text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
      >
        Confirm Reservation
      </button>

      <p className="text-center text-[10px] text-zinc-500 mt-4 leading-relaxed">
        Free cancellation up to 48 hours before departure.
      </p>
    </div>
  );
}
