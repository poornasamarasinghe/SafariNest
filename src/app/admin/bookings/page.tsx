"use client";

import Sidebar from "../../../components/AdminDash/sidebar";
import StatsCard from "@/components/bookings/StatsCard";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingTable from "@/components/bookings/BookingTable";

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Booking Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and monitor all safari reservations across our premium fleet.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Pending Requests" value="24" />
          <StatsCard title="Total Confirmed" value="1,482" />
          <StatsCard title="Revenue (Monthly)" value="$142,800" />
          <StatsCard title="Cancellation Rate" value="2.4%" />
        </div>

        {/* Filters */}
        <BookingFilters />

        {/* Table */}
        <BookingTable />
      </main>
    </div>
  );
}