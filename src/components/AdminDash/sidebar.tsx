"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Package,
  Image,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin" },
  { name: "Bookings", icon: BookOpen, path: "/admin/bookings" },
  { name: "Package Manager", icon: Package, path: "/admin/packages" },
  { name: "Gallery Manager", icon: Image, path: "/admin/gallery" },
  { name: "Review Moderation", icon: ShieldCheck, path: "/admin/reviews" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-white border-r flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b">
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          <div>
            <h1 className="text-sm font-semibold">SafariNest</h1>
            <p className="text-xs text-gray-500">Safari Admin</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-4 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="px-4 py-4 border-t flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500"></div>
        <div>
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-gray-500">User</p>
        </div>
      </div>
    </div>
  );
}