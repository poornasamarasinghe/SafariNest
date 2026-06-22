"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Safaris", href: "/safaris" },
    { name: "Live Tracker", href: "/live-tracker" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-100 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 font-sans">
            Safari<span className="font-extrabold text-zinc-800">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-zinc-900 ${
                  isActive ? "text-zinc-900 font-bold border-b-2 border-zinc-900 pb-1 -mb-[6px]" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <Link
          href="/booking"
          className="bg-[#fba260] hover:bg-[#e99150] text-zinc-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase shadow-sm transition-all duration-200"
        >
          Book Jeep
        </Link>
      </div>
    </header>
  );
}
