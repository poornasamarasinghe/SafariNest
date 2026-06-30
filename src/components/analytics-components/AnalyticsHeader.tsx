import Image from "next/image";
import { Search, Bell, Settings, HelpCircle, Menu } from "lucide-react";

interface AnalyticsHeaderProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  notificationCount: number;
  onClearNotifications: () => void;
  onOpenMobileMenu: () => void;
}

export default function AnalyticsHeader({
  searchQuery,
  setSearchQuery,
  notificationCount,
  onClearNotifications,
  onOpenMobileMenu,
}: AnalyticsHeaderProps) {
  return (
    <header className="h-16 border-b border-stone-200/60 bg-white/50 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 select-none">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onOpenMobileMenu} className="p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 lg:hidden cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <input type="text" id="search-input" placeholder="Global search..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-stone-100 border border-stone-200/60 rounded-full text-stone-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-200" />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400 pointer-events-none" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2 text-[10px] bg-stone-200 hover:bg-stone-300 rounded-full px-1.5 py-0.5 text-stone-600 font-bold">CLEAR</button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-1.5">
          <button id="btn-notifications" onClick={onClearNotifications}
            className="relative p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer" title="Notifications">
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-600 text-white rounded-full w-4 h-4 text-[9px] font-black flex items-center justify-center animate-bounce">{notificationCount}</span>
            )}
          </button>
          <button className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer" title="Settings"><Settings className="w-4 h-4" /></button>
          <button className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer" title="Help"><HelpCircle className="w-4 h-4" /></button>
        </div>
        <div className="w-[1px] h-6 bg-stone-200" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-stone-900">Admin User</p>
            <p className="text-[10px] font-semibold text-stone-400 tracking-tight">Senior Warden</p>
          </div>
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-stone-200">
            <Image src="/warden_avatar.png" alt="Admin Warden Profile Avatar" fill className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
