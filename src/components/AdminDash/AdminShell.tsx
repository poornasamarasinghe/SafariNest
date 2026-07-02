"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminShell({ children, title, subtitle, action }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-[#f5f5f3] font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E8EAE8] px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-1 text-[#444B43] hover:text-[#102110] transition-colors rounded-lg hover:bg-[#F4F6F4]"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="font-jetbrains text-[10px] tracking-[0.12em] text-[#7F6200] uppercase mb-0.5">
                Admin Console
              </p>
              <h1 className="font-sans font-bold text-[18px] md:text-[22px] leading-tight tracking-[-0.02em] text-[#102110]">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {subtitle && (
              <p className="hidden md:block font-sans text-[13px] text-[#444B43] max-w-[380px] text-right leading-[1.5]">
                {subtitle}
              </p>
            )}
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
