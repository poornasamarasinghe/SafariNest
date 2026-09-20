"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSessionValid } from "@/lib/adminAuth";

/**
 * Wraps any admin page — redirects to /admin/login if not authenticated
 * or if the session has expired (> 4 h since login).
 * Shows a blank dark screen while checking to prevent any flash of content.
 */
export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (isSessionValid()) {
      setVerified(true);
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!verified) {
    return (
      <div className="min-h-screen bg-[#0a160a] flex items-center justify-center">
        <svg className="animate-spin w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}
