"use client";

import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import RecentBookings from "./RecentBookings";
import { BookOpen, Eye, Package, DollarSign } from "lucide-react";

interface BookingSummary {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
}

export default function DashboardContent() {
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    fetch(`${apiUrl}/bookings/summary`)
      .then((r) => r.ok ? r.json() as Promise<BookingSummary> : Promise.reject())
      .then(setSummary)
      .catch(() => { }); // silently fall back to placeholder values
  }, []);

  const formatRevenue = (val: number) =>
    val >= 1000
      ? `$${(val / 1000).toFixed(1)}k`
      : `$${val.toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bookings"
          value={summary ? String(summary.total) : "—"}
          icon={<BookOpen size={16} />}
        />
        <StatsCard
          title="Confirmed"
          value={summary ? String(summary.confirmed) : "—"}
          positive
          icon={<Eye size={16} />}
        />
        <StatsCard
          title="Pending"
          value={summary ? String(summary.pending) : "—"}
          icon={<Package size={16} />}
        />
        <StatsCard
          title="Revenue"
          value={summary ? formatRevenue(summary.totalRevenue) : "—"}
          positive
          icon={<DollarSign size={16} />}
        />
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentBookings />
        </div>

        {/* Quick stats card */}
        <div className="bg-white rounded-2xl border border-[#E8EAE8] p-6 shadow-sm">
          <p className="font-jetbrains text-[10px] tracking-[0.12em] text-[#7F6200] uppercase mb-0.5">AI System</p>
          <h3 className="font-sans font-bold text-[17px] text-[#102110] mb-4">Yala Live Status</h3>
          <div className="space-y-3">
            {[
              { label: "Leopard Sighting Prob.", value: "89.7%", color: "bg-emerald-500" },
              { label: "Active Jeeps", value: "42", color: "bg-[#FFB080]" },
              { label: "Block 1 Density", value: "High", color: "bg-[#102110]" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-[#E8EAE8]/60 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.color}`} />
                  <span className="font-sans text-[13px] text-[#444B43]">{s.label}</span>
                </div>
                <span className="font-jetbrains font-bold text-[13px] text-[#102110]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}