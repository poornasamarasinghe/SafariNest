"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BookingSummary {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
  recent: {
    id: string;
    bookingId: string;
    guest: string;
    package: string;
    date: string;
    status: string;
  }[];
}

const statusStyle: Record<string, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Pending: "bg-amber-50  text-amber-700  border border-amber-100",
  Cancelled: "bg-red-50    text-red-600    border border-red-100",
};

export default function RecentBookings() {
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    fetch(`${apiUrl}/bookings/summary`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<BookingSummary>;
      })
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E8EAE8] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EAE8]">
        <div>
          <p className="font-jetbrains text-[10px] tracking-[0.12em] text-[#7F6200] uppercase mb-0.5">
            Live data
          </p>
          <h2 className="font-sans font-bold text-[17px] text-[#102110]">
            Booking Summary
          </h2>
        </div>
        <Link
          href="/admin/bookings"
          className="font-jetbrains text-[11px] tracking-[0.06em] text-[#7F6200] hover:text-[#102110] flex items-center gap-1.5 transition-colors duration-200"
        >
          View all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {loading && (
        <div className="px-6 py-8 text-center font-jetbrains text-[12px] text-[#444B43]/50">
          Loading…
        </div>
      )}

      {error && (
        <div className="px-6 py-8 text-center font-jetbrains text-[12px] text-red-500">
          Failed to load: {error}
        </div>
      )}

      {summary && (
        <>
          {/* Summary counts */}
          <div className="grid grid-cols-4 divide-x divide-[#E8EAE8] border-b border-[#E8EAE8]">
            {[
              { label: "Total", value: summary.total, color: "text-[#102110]" },
              { label: "Confirmed", value: summary.confirmed, color: "text-emerald-600" },
              { label: "Pending", value: summary.pending, color: "text-amber-600" },
              { label: "Cancelled", value: summary.cancelled, color: "text-red-500" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-4 text-center">
                <p className={`font-sans font-bold text-[22px] ${s.color}`}>{s.value}</p>
                <p className="font-jetbrains text-[10px] tracking-[0.1em] text-[#444B43]/50 uppercase mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Revenue strip */}
          <div className="px-6 py-3 border-b border-[#E8EAE8] bg-[#F9FAF9] flex items-center justify-between">
            <span className="font-jetbrains text-[10px] tracking-[0.12em] text-[#444B43]/50 uppercase">
              Total Revenue
            </span>
            <span className="font-sans font-bold text-[15px] text-[#102110]">
              ${summary.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>

          {/* Recent bookings list */}
          <div className="divide-y divide-[#E8EAE8]/60">
            {summary.recent.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-6 py-3 hover:bg-[#F9FAF9] transition-colors duration-150">
                <div className="min-w-0">
                  <p className="font-sans font-medium text-[13px] text-[#102110] truncate">{b.guest}</p>
                  <p className="font-jetbrains text-[11px] text-[#444B43]/50 truncate">{b.package} · {b.date}</p>
                </div>
                <span className={`ml-4 shrink-0 inline-flex items-center font-jetbrains text-[10px] tracking-[0.06em] font-bold uppercase px-2.5 py-1 rounded-full ${statusStyle[b.status] ?? ""}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}