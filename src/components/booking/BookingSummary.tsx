"use client";

import { Globe, Calendar, Users, TrendingUp } from "lucide-react";
import { useLkrRate } from "@/hooks/useLkrRate";

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
  const { rate, loading, lastUpdated } = useLkrRate();

  const lkrTotal = rate ? totalAmount * rate : null;
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
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-base font-bold">Total</span>
        <span className="text-3xl font-extrabold text-[#fba260] font-mono">${totalAmount.toFixed(2)}</span>
      </div>

      {/* LKR Equivalent */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">≈ Sri Lankan Rupees</span>
        {loading ? (
          <span className="h-4 w-28 bg-zinc-700 rounded animate-pulse inline-block" />
        ) : lkrTotal ? (
          <span className="text-base font-bold text-emerald-400 font-mono">
            LKR {lkrTotal.toLocaleString("en-LK", { maximumFractionDigits: 0 })}
          </span>
        ) : null}
      </div>

      {/* Live Rate Badge */}
      {!loading && rate && (
        <div className="flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 mb-6">
          <TrendingUp size={11} className="text-emerald-400 flex-shrink-0" />
          <p className="text-[10px] text-zinc-400 leading-tight">
            <span className="text-emerald-400 font-semibold">1 USD = {rate.toFixed(2)} LKR</span>
            {" · "}
            <span>Updated: {lastUpdated}</span>
          </p>
        </div>
      )}

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
