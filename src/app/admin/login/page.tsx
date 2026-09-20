"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { isSessionValid, setSession } from "@/lib/adminAuth";

// Hard-coded admin credentials (client-side guard — not a security boundary,
// just access control for the admin UI)
const ADMIN_USER = "admin";
const ADMIN_PASS = "safarinest2024";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // If already authenticated with a valid session, skip straight to overview
  useEffect(() => {
    setMounted(true);
    if (isSessionValid()) {
      router.replace("/admin/overview");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief auth check
    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
        setSession(); // stores auth + creation timestamp
        router.push("/admin/overview");
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 700);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a160a] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a4a1a]/30 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFB080]/10 blur-[100px]" />
      </div>

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-[420px]">

        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5A8A3C] to-[#2d5016] flex items-center justify-center mb-4 shadow-lg shadow-green-900/40">
              <Leaf size={24} className="text-white" />
            </div>
            <h1 className="font-bold text-white text-2xl tracking-tight">SafariNest</h1>
            <p className="text-white/40 text-sm mt-1 font-mono tracking-widest uppercase text-xs">Admin Console</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-8" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] text-white/40 uppercase">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Enter username"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#5A8A3C] focus:bg-white/8 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] text-white/40 uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#5A8A3C] focus:bg-white/8 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors p-1"
                  tabIndex={-1}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="text-red-400 text-xs font-medium">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-gradient-to-r from-[#5A8A3C] to-[#3d6428] hover:from-[#6ba348] hover:to-[#4a7a30] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-900/30"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating…
                </>
              ) : (
                "Sign In to Console"
              )}
            </button>

          </form>

          {/* Footer note */}
          <p className="text-center text-white/20 text-[11px] mt-6 font-mono">
            Restricted access · SafariNest Operations
          </p>

        </div>
      </div>
    </div>
  );
}
