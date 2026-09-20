"use client";

import { useState, useEffect, useMemo } from "react";
import AdminShell from "../../../components/AdminDash/AdminShell";
import BookingFilters, {
  BookingFilterState,
} from "@/components/bookings/BookingFilters";
import BookingTable, { Booking } from "@/components/bookings/BookingTable";
import StatsCard from "@/components/AdminDash/StatsCard";
import { Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const EMPTY_FILTERS: BookingFilterState = {
  search: "",
  status: "",
  zone: "",
  dateFrom: "",
  dateTo: "",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BookingFilterState>(EMPTY_FILTERS);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/bookings`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API}/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Failed to update status");
      }
      await fetchBookings();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating booking");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API}/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Failed to delete");
      }
      await fetchBookings();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting booking");
    }
  };

  // ── Derived stats (live from fetched data) ─────────────────────────────────
  const stats = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    const cancRate = bookings.length
      ? ((cancelled / bookings.length) * 100).toFixed(1) + "%"
      : "—";
    return { total: bookings.length, confirmed, pending, cancRate };
  }, [bookings]);

  // ── All unique zones for the dropdown ─────────────────────────────────────
  const zones = useMemo(() => {
    const s = new Set(bookings.map((b) => b.zone).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [bookings]);

  // ── Client-side filtering ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return bookings.filter((b) => {
      // Search: guest name or booking id
      if (q) {
        const guestMatch = b.guest?.toLowerCase().includes(q);
        const idMatch =
          (b.bookingId ?? b.id)?.toLowerCase().includes(q);
        if (!guestMatch && !idMatch) return false;
      }
      // Status
      if (filters.status && b.status !== filters.status) return false;
      // Zone
      if (filters.zone && b.zone !== filters.zone) return false;
      // Date range — compare booking date string (assumes "YYYY-MM-DD" or parseable)
      if (filters.dateFrom || filters.dateTo) {
        const bDate = new Date(b.date).getTime();
        if (filters.dateFrom && bDate < new Date(filters.dateFrom).getTime()) return false;
        if (filters.dateTo && bDate > new Date(filters.dateTo).getTime()) return false;
      }
      return true;
    });
  }, [bookings, filters]);

  return (
    <AdminShell
      title="Booking Management"
      subtitle="Manage and monitor all safari reservations across the premium fleet."
    >
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard title="Total Bookings" value={String(stats.total)} />
          <StatsCard title="Confirmed" value={String(stats.confirmed)} positive />
          <StatsCard title="Pending" value={String(stats.pending)} />
          <StatsCard title="Cancellation Rate" value={stats.cancRate} />
        </div>

        {/* Filters */}
        <BookingFilters
          filters={filters}
          onChange={setFilters}
          zones={zones}
          totalShowing={filtered.length}
          totalAll={bookings.length}
        />

        {/* Table */}
        {loading ? (
          <div className="bg-white border border-[#E8EAE8] rounded-xl p-12 flex flex-col items-center justify-center gap-4 shadow-sm">
            <Loader2 className="animate-spin text-amber-500" size={32} />
            <p className="text-sm text-gray-500 font-medium">Loading bookings…</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-[#E8EAE8] rounded-xl p-12 text-center text-red-500 font-medium shadow-sm">
            {error}
          </div>
        ) : (
          <BookingTable
            bookings={filtered}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        )}

        {/* Footer count */}
        {!loading && !error && (
          <p className="text-xs text-gray-400 text-right">
            Showing {filtered.length} of {bookings.length} bookings
          </p>
        )}
      </div>
    </AdminShell>
  );
}