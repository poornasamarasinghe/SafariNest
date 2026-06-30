"use client";

import Sidebar from "../../../components/AdminDash/sidebar";
import VerifySightings from "@/components/AdminDash/VerifySightings";

export default function SightingsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Verify Sightings
          </h1>

          <p className="text-gray-500 mt-2">
            Verify real-time wildlife sightings contributed by visitors and guides.
          </p>
        </div>

        {/* Content */}
        <VerifySightings />
      </main>
    </div>
  );
}
