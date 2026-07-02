"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../components/AdminDash/sidebar";
import PackageCard from "@/components/packages/PackageCard";

export default function PackagePage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch packages from server");
      }
      const data = await res.json();
      setPackages(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex font-sans">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#102110]">Package Management</h1>

          <p className="text-gray-500 mt-2 font-medium">
            Edit safari packages available for visitors.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700 mb-4"></div>
            <p className="font-semibold text-green-800">Loading packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white border border-red-100 rounded-2xl shadow-sm max-w-lg mx-auto">
            <p className="text-red-500 font-bold text-lg">Error Loading Packages</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {packages.map((item) => (
              <PackageCard key={item.id} data={item} onRefresh={fetchPackages} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}