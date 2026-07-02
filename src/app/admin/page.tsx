"use client";

import AdminShell from "../../components/AdminDash/AdminShell";
import DashboardContent from "../../components/AdminDash/DashboardContent";

export default function AdminPage() {
  return (
    <AdminShell
      title="Operations Overview"
      subtitle="Monitor bookings, sightings, and safari package performance in real time."
    >
      <DashboardContent />
    </AdminShell>
  );
}
