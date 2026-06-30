"use client";

import Sidebar from "../../../components/AdminDash/sidebar";
import PackageCard from "@/components/packages/PackageCard";

const packages = [
  {
    id: 1,
    name: "Leopard Tracker Elite",
    price: 450,
    image: "/packages/leopard.jpg",
    description:
      "Premium leopard tracking safari through Block 1.",
    zone: "Yala Block 1",
    duration: "8 Hours",
    guests: 6,
  },
  {
    id: 2,
    name: "Gentle Giants Expedition",
    price: 680,
    image: "/packages/elephant.jpg",
    description:
      "Experience Sri Lanka's elephant gathering.",
    zone: "Kumana",
    duration: "Full Day",
    guests: 8,
  },
];

export default function PackagePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Package Management</h1>

          <p className="text-gray-500 mt-2">
            Edit safari packages available for visitors.
          </p>
        </div>

        <div className="space-y-8">
          {packages.map((item) => (
            <PackageCard key={item.id} data={item} />
          ))}
        </div>
      </main>
    </div>
  );
}