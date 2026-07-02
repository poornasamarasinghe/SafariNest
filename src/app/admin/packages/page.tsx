"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../../components/AdminDash/AdminShell";
import PackageCard from "@/components/packages/PackageCard";

export default function PackagePage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch packages from server");
      const data = await res.json();
      setPackages(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  return (
    <AdminShell
      title="Package Management"
      subtitle="Edit and manage safari packages available for visitors."
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[#102110]/20 border-t-[#102110] animate-spin mb-4" />
          <p className="font-sans text-[14px] text-[#444B43]">Loading packages…</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-sans font-semibold text-red-500 mb-1">Error Loading Packages</p>
          <p className="font-sans text-[13px] text-[#444B43]">{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {packages.map((item) => (
            <PackageCard key={item.id} data={item} onRefresh={fetchPackages} />
          ))}
        </div>
      )}
    </AdminShell>
  );
}