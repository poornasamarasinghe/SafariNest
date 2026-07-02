"use client";

import AdminShell from "../../../components/AdminDash/AdminShell";
import VerifySightings from "@/components/AdminDash/VerifySightings";

export default function SightingsPage() {
  return (
    <AdminShell
      title="Verify Sightings"
      subtitle="Review and verify real-time wildlife sightings contributed by visitors and guides."
    >
      <VerifySightings />
    </AdminShell>
  );
}
