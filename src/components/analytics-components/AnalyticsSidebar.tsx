import Link from "next/link";
import { Activity, FileText, X } from "lucide-react";
import { ModalType, NavItem } from "./types";

interface AnalyticsSidebarProps {
  navItems: NavItem[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  onOpenLogs: () => void;
}

export default function AnalyticsSidebar({
  navItems,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenLogs,
}: AnalyticsSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-stone-200/80 bg-[#F5F4F0] p-6 hidden lg:flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 px-2">
            <span className="text-xl font-black text-stone-900 tracking-tight font-serif">SafariNest</span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${item.active ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"}`}>
                  <Icon className={`w-4 h-4 ${item.active ? "text-amber-500" : "text-stone-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-1 pt-6 border-t border-stone-200/80">
          <Link href="#" className="flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 transition-all cursor-pointer">
            <Activity className="w-4 h-4 text-stone-500" />System Health
          </Link>
          <button onClick={onOpenLogs} className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 transition-all text-left cursor-pointer">
            <FileText className="w-4 h-4 text-stone-500" />Logs
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative flex flex-col justify-between w-64 max-w-xs bg-[#FAF9F5] border-r border-stone-200 p-6 h-full z-10 animate-[slideIn_0.3s_ease-out]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black tracking-tight font-serif">SafariNest</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md hover:bg-stone-200/50">
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${item.active ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-200/50"}`}>
                      <Icon className="w-4 h-4" />{item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex flex-col gap-1 pt-4 border-t border-stone-200">
              <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50">
                <Activity className="w-4 h-4" />System Health
              </Link>
              <button onClick={() => { setMobileMenuOpen(false); onOpenLogs(); }} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 text-left">
                <FileText className="w-4 h-4" />Logs
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
