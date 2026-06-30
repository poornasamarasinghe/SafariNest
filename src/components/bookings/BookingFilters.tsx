"use client";

import {
  Search,
  Calendar,
} from "lucide-react";

export default function BookingFilters() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search Guest Name or Booking ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none"
          />
        </div>

        <select className="border rounded-lg px-4 py-2">
          <option>All Status</option>
        </select>

        <button className="border rounded-lg px-4 py-2 flex items-center gap-2">
          <Calendar size={16} />
          Oct 12 - Oct 19, 2023
        </button>

        <select className="border rounded-lg px-4 py-2">
          <option>All Safari Zones</option>
        </select>

        <button className="bg-[#1f3024] text-white px-6 rounded-lg">
          Apply Filters
        </button>
      </div>
    </div>
  );
}