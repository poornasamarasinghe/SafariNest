"use client";

import { useState, useEffect } from "react";

const CACHE_KEY = "safarinest_usd_lkr_rate";
const FALLBACK_RATE = 305; // fallback if API is unreachable

interface RateCache {
  rate: number;
  fetchedAt: string; // ISO date string YYYY-MM-DD
}

/**
 * Returns the current USD → LKR exchange rate.
 * Rate is fetched once per calendar day and cached in localStorage.
 * Falls back to a static rate if the API is unreachable.
 */
export function useLkrRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchRate = async () => {
      try {
        // Check localStorage cache first
        const cached = localStorage.getItem(CACHE_KEY);
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        if (cached) {
          const parsed: RateCache = JSON.parse(cached);
          if (parsed.fetchedAt === today && parsed.rate > 0) {
            setRate(parsed.rate);
            setLastUpdated(parsed.fetchedAt);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh rate from Frankfurter (free, no API key needed)
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=LKR",
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Rate fetch failed");

        const data = await res.json();
        const lkrRate: number = data?.rates?.LKR;

        if (!lkrRate || lkrRate <= 0) throw new Error("Invalid rate in response");

        const cache: RateCache = { rate: lkrRate, fetchedAt: today };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

        setRate(lkrRate);
        setLastUpdated(today);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.warn("Could not fetch live LKR rate, using fallback:", err);

        // Try to use cached rate even if stale
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: RateCache = JSON.parse(cached);
          setRate(parsed.rate);
          setLastUpdated(parsed.fetchedAt + " (cached)");
        } else {
          setRate(FALLBACK_RATE);
          setLastUpdated("offline estimate");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
    return () => controller.abort();
  }, []);

  return { rate, loading, lastUpdated };
}
