// components/admin/DashboardContent.tsx

import StatsCard from "./StatsCard";
import RecentBookings from "./RecentBookings";
import AIAnalytics from "./AIAnalytics";
import VerifySightings from "./VerifySightings";
import PackageManager from "./PackageManager";

export default function DashboardContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Operations Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value="1,284"
          change="+12%"
        />

        <StatsCard
          title="Total Sightings"
          value="452"
        />

        <StatsCard
          title="Active Packages"
          value="18"
        />

        <StatsCard
          title="Revenue ($)"
          value="142,500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentBookings />
        </div>

        <AIAnalytics />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <VerifySightings />
        <PackageManager />
      </div>
    </div>
  );
}