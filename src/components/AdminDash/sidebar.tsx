"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Package,
  Image,
  Eye,
  X,
  Menu,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin" },
  { name: "Bookings", icon: BookOpen, path: "/admin/bookings" },
  { name: "Packages", icon: Package, path: "/admin/packages" },
  { name: "Gallery", icon: Image, path: "/admin/gallery" },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close drawer on route change (mobile)
  useEffect(() => {
    if (onClose) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const content = (
    <aside className="h-full w-[220px] bg-[#0d1a0d] flex flex-col border-r border-white/8">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5A8A3C] to-[#2d5016] flex items-center justify-center flex-shrink-0">
            <Eye size={13} className="text-white" />
          </div>
          <div>
            <p className="font-jetbrains font-bold text-[13px] text-white leading-none tracking-[-0.01em]">SafariNest</p>
            <p className="font-jetbrains text-[10px] text-[#FFB080]/60 tracking-[0.06em] mt-0.5">Admin Console</p>
          </div>
        </Link>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-white/40 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="font-jetbrains text-[9px] tracking-[0.15em] text-white/20 uppercase px-3 mb-3">Navigation</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path !== "/admin" && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium transition-all duration-200 group ${isActive
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
            >
              <Icon
                size={15}
                className={`flex-shrink-0 transition-colors duration-200 ${isActive ? "text-[#FFB080]" : "text-white/30 group-hover:text-white/60"}`}
              />
              {item.name}
              {isActive && (
                <span className="ml-auto w-1 h-1 rounded-full bg-[#FFB080]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Live indicator */}
      <div className="px-4 py-3 border-t border-white/8">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="font-jetbrains text-[10px] tracking-[0.06em] text-white/35">System Online</span>
        </div>
      </div>

      {/* User */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-200 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FFB080] to-[#e8873a] flex items-center justify-center flex-shrink-0">
            <span className="font-jetbrains font-bold text-[10px] text-[#7F3300]">AD</span>
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-sans text-[12px] font-semibold text-white/80 leading-none truncate">Admin</p>
            <p className="font-jetbrains text-[10px] text-white/30 mt-0.5">SuperUser</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:flex h-screen w-[220px] sticky top-0 shrink-0">
        {content}
      </div>

      {/* Mobile: slide-in drawer + backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
            }`}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {content}
        </div>
      </div>
    </>
  );
}