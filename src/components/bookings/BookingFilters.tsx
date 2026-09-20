"use client";

import { Search, Calendar, X } from "lucide-react";

export interface BookingFilterState {
  search: string;
  status: string;
  zone: string;
  dateFrom: string;
  dateTo: string;
}

interface BookingFiltersProps {
  filters: BookingFilterState;
  onChange: (f: BookingFilterState) => void;
  zones: string[];
  totalShowing: number;
  totalAll: number;
}

export default function BookingFilters({
  filters,
  onChange,
  zones,
  totalShowing,
  totalAll,
}: BookingFiltersProps) {
  const set = (patch: Partial<BookingFilterState>) =>
    onChange({ ...filters, ...patch });

  const hasActive =
    filters.search || filters.status || filters.zone || filters.dateFrom || filters.dateTo;

  const clearAll = () =>
    onChange({ search: "", status: "", zone: "", dateFrom: "", dateTo: "" });

  return (
    <div className="bg-white rounded-xl border border-[#E8EAE8] p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">

        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            id="booking-search"
            type="text"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Search guest name or booking ID…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E8EAE8] rounded-lg outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
          />
          {filters.search && (
            <button
              onClick={() => set({ search: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Status */}
        <select
          id="booking-status-filter"
          value={filters.status}
          onChange={(e) => set({ status: e.target.value })}
          className="border border-[#E8EAE8] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition bg-white text-gray-700 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Safari Zone */}
        <select
          id="booking-zone-filter"
          value={filters.zone}
          onChange={(e) => set({ zone: e.target.value })}
          className="border border-[#E8EAE8] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition bg-white text-gray-700 cursor-pointer"
        >
          <option value="">All Zones</option>
          {zones.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>

        {/* Date From */}
        <div className="flex items-center gap-1.5 border border-[#E8EAE8] rounded-lg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-amber-400/40 focus-within:border-amber-400 transition">
          <Calendar size={14} className="text-gray-400 flex-shrink-0" />
          <input
            id="booking-date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => set({ dateFrom: e.target.value })}
            className="outline-none bg-transparent text-gray-700 text-sm cursor-pointer w-[130px]"
            title="From date"
          />
        </div>

        {/* Date To */}
        <div className="flex items-center gap-1.5 border border-[#E8EAE8] rounded-lg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-amber-400/40 focus-within:border-amber-400 transition">
          <Calendar size={14} className="text-gray-400 flex-shrink-0" />
          <input
            id="booking-date-to"
            type="date"
            value={filters.dateTo}
            onChange={(e) => set({ dateTo: e.target.value })}
            className="outline-none bg-transparent text-gray-700 text-sm cursor-pointer w-[130px]"
            title="To date"
          />
        </div>

        {/* Clear */}
        {hasActive && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-gray-500 hover:text-red-500 transition flex items-center gap-1 border border-[#E8EAE8] rounded-lg px-3 py-2"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Result count */}
      {hasActive && (
        <p className="text-[11px] text-gray-400 mt-3 font-medium">
          Showing <span className="text-gray-700 font-semibold">{totalShowing}</span> of{" "}
          <span className="text-gray-700 font-semibold">{totalAll}</span> bookings
        </p>
      )}
    </div>
  );
}