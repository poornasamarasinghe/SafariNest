"use client";

import AdminShell from "../../../components/AdminDash/AdminShell";
import StatsCard from "@/components/bookings/StatsCard";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingTable from "@/components/bookings/BookingTable";
import { BookOpen, CheckCircle, DollarSign, TrendingDown } from "lucide-react";

export default function BookingsPage() {
  return (
    <AdminShell
      title="Booking Management"
      subtitle="Manage and monitor all safari reservations across the premium fleet."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard title="Pending Requests" value="24" />
          <StatsCard title="Total Confirmed" value="1,482" />
          <StatsCard title="Revenue (Monthly)" value="$142,800" />
          <StatsCard title="Cancellation Rate" value="2.4%" />
        </div>

        <BookingFilters />
        <BookingTable />
      </div>
    </AdminShell>
  );
}