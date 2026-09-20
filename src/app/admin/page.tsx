"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSessionValid } from "@/lib/adminAuth";

/**
 * /admin root — redirect to overview if authenticated with a valid session,
 * otherwise send to login. Real content lives at /admin/overview.
 */
export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (isSessionValid()) {
      router.replace("/admin/overview");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return null;
}
