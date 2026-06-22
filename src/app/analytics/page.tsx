"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Clock,
  Eye,
  Brain,
  Image as ImageIcon,
  Users,
  Activity,
  FileText,
  Search,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  X,
  TrendingUp,
  Cpu,
  Terminal,
  ArrowUpRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Compass,
  ArrowRight,
  Layers,
  Info
} from "lucide-react";

// Modal Types
type ModalType = "none" | "tracker" | "coordinates" | "deploy" | "logs";

export default function AnalyticsPage() {
  // Navigation & Interactive states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [notificationCount, setNotificationCount] = useState(3);
  
  // Real-time sensor statuses
  const [droneFeedActive, setDroneFeedActive] = useState(true);
  const [sensorActive, setSensorActive] = useState(true);
  
  // Simulated stats ticking
  const [predictionsCount, setPredictionsCount] = useState(84248);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time predictions trickling in
      setPredictionsCount(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Deploy simulation runner
  const startDeploySimulation = () => {
    setDeployStep(1);
    setDeployLogs(["[INFO] Initializing Experimental Model Stack v5.1-beta..."]);
    
    const logs = [
      "[INFO] Loading neural tracking weights (Yala-Leopard-v4.9)...",
      "[INFO] Fetching real-time weather telemetries...",
      "[WARN] Precipitation threshold at 82% in Sector 4B. Adjusting weights.",
      "[INFO] Compiling topological coordinates with grid layout...",
      "[SUCCESS] Neural pathway matrix optimized.",
      "[INFO] Uploading stack package to AWS Yala-Edge cluster...",
      "[INFO] Commencing container blue-green deployment...",
      "[SUCCESS] Production router switched to v5.1-experimental successfully!"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setDeployLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setDeployStep(2); // complete
        }
      }, (index + 1) * 900);
    });
  };

  // Close modals helper
  const closeModals = () => {
    setActiveModal("none");
    setDeployStep(0);
    setDeployLogs([]);
  };

  // Filter widgets or highlight them based on search query
  const matchesSearch = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="flex bg-[#FAF9F5] text-stone-900 font-sans min-h-screen relative overflow-x-hidden">
      
      {/* 1. Left Sidebar - Desktop View */}
      <aside className="w-64 border-r border-stone-200/80 bg-[#F5F4F0] p-6 hidden lg:flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-xl font-black text-stone-900 tracking-tight font-serif">SafariNest</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            {[
              { label: "Dashboard", icon: LayoutDashboard, href: "#" },
              { label: "Bookings", icon: Calendar, href: "#" },
              { label: "Packages", icon: Package, href: "#" },
              { label: "Slots", icon: Clock, href: "#" },
              { label: "Wildlife Reports", icon: Eye, href: "#" },
              { label: "AI Analytics", icon: Brain, href: "/analytics", active: true },
              { label: "Gallery", icon: ImageIcon, href: "#" },
              { label: "Users", icon: Users, href: "#" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    item.active
                      ? "bg-stone-900 text-white shadow-md"
                      : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.active ? "text-amber-500" : "text-stone-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Settings */}
        <div className="flex flex-col gap-1 pt-6 border-t border-stone-200/80">
          <Link
            href="#"
            className="flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 transition-all cursor-pointer"
          >
            <Activity className="w-4 h-4 text-stone-500" />
            System Health
          </Link>
          <button
            onClick={() => setActiveModal("logs")}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 transition-all text-left cursor-pointer"
          >
            <FileText className="w-4 h-4 text-stone-500" />
            Logs
          </button>
        </div>
      </aside>

      {/* Mobile Header and Collapsible Sidebar Drawer */}
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
                {[
                  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
                  { label: "Bookings", icon: Calendar, href: "#" },
                  { label: "Packages", icon: Package, href: "#" },
                  { label: "Slots", icon: Clock, href: "#" },
                  { label: "Wildlife Reports", icon: Eye, href: "#" },
                  { label: "AI Analytics", icon: Brain, href: "/analytics", active: true },
                  { label: "Gallery", icon: ImageIcon, href: "#" },
                  { label: "Users", icon: Users, href: "#" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        item.active
                          ? "bg-stone-900 text-white"
                          : "text-stone-600 hover:bg-stone-200/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex flex-col gap-1 pt-4 border-t border-stone-200">
              <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50">
                <Activity className="w-4 h-4" />
                System Health
              </Link>
              <button onClick={() => { setMobileMenuOpen(false); setActiveModal("logs"); }} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-200/50 text-left">
                <FileText className="w-4 h-4" />
                Logs
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        
        {/* Top Navbar Header */}
        <header className="h-16 border-b border-stone-200/60 bg-white/50 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 select-none">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 lg:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Input Box */}
            <div className="relative w-full max-w-md hidden sm:block">
              <input
                type="text"
                id="search-input"
                placeholder="Global search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-stone-100 border border-stone-200/60 rounded-full text-stone-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-[10px] bg-stone-200 hover:bg-stone-300 rounded-full px-1.5 py-0.5 text-stone-600 font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* User & Notification items */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-1.5">
              <button
                id="btn-notifications"
                onClick={() => setNotificationCount(0)}
                className="relative p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-600 text-white rounded-full w-4 h-4 text-[9px] font-black flex items-center justify-center animate-bounce">
                    {notificationCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer" title="Settings">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer" title="Help Documentation">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            
            {/* Divider */}
            <div className="w-[1px] h-6 bg-stone-200" />

            {/* Profile badge */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-stone-900">Admin User</p>
                <p className="text-[10px] font-semibold text-stone-400 tracking-tight">Senior Warden</p>
              </div>
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-stone-200">
                <Image
                  src="/warden_avatar.png"
                  alt="Admin Warden Profile Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Container */}
        <main className="flex-1 p-6 lg:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto">
          
          {/* Operations Intelligence Section Header */}
          <div className="flex flex-col gap-1.5 pb-4 border-b border-stone-200/60 select-none">
            <div className="flex items-center gap-2 text-amber-700">
              <div className="w-6 h-[2px] bg-amber-700" />
              <span className="text-[11px] font-bold tracking-widest uppercase">Operations Intelligence</span>
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">AI Analytics Manager</h1>
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Monitoring high-fidelity predictive models and real-time wildlife intelligence across Yala sectors. Leveraging deep learning to anticipate migration shifts and ensure safe safari routing.
            </p>
          </div>

          {/* Row 1: Active Models & Data Streams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Active Models */}
            {matchesSearch("active models leopard elephant tracker migration engines") && (
              <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group">
                <div className="absolute top-4 right-4 p-2 bg-amber-50 rounded-lg text-amber-700 group-hover:scale-110 transition-transform">
                  <Brain className="w-4 h-4" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Active Models</span>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-800">Leopard Tracker v4.2</span>
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded text-[9px] font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-800">Elephant Migration</span>
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded text-[9px] font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-stone-100 mt-4 text-[10px] font-bold text-stone-400">
                  <span className="text-stone-900">12</span> Engines Running
                </div>
              </div>
            )}

            {/* Card 2: Total Predictions */}
            {matchesSearch("total predictions growth chart week count") && (
              <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Total Predictions</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900 tracking-tight">
                      {(predictionsCount / 1000).toFixed(1)}k
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      12% growth this week
                    </span>
                  </div>
                </div>

                <div className="flex items-end gap-1.5 h-12 pt-4 mt-2">
                  <div className="flex-1 bg-amber-100 rounded-t h-[40%] hover:bg-amber-200 transition-colors" title="Day 1" />
                  <div className="flex-1 bg-amber-200/80 rounded-t h-[55%] hover:bg-amber-300 transition-colors" title="Day 2" />
                  <div className="flex-1 bg-amber-100 rounded-t h-[30%] hover:bg-amber-200 transition-colors" title="Day 3" />
                  <div className="flex-1 bg-amber-200 rounded-t h-[70%] hover:bg-amber-300 transition-colors" title="Day 4" />
                  <div className="flex-1 bg-amber-700 rounded-t h-[95%] hover:bg-amber-800 transition-colors animate-pulse" title="Today (Highest)" />
                </div>
              </div>
            )}

            {/* Card 3: Real-Time Data Streams */}
            {matchesSearch("real time data streams thermal drone sensors satellite launch tracker") && (
              <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300 select-none">
                <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Real-Time Data Streams</span>
                
                <div className="flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2 text-stone-700">
                      <span className={`w-2 h-2 rounded-full ${droneFeedActive ? "bg-emerald-500 animate-pulse" : "bg-stone-300"}`} />
                      Thermal Drone Feed B1
                    </div>
                    <button
                      onClick={() => setDroneFeedActive(!droneFeedActive)}
                      className="text-[9px] font-bold text-stone-400 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 rounded px-1.5 py-0.5 hover:cursor-pointer"
                    >
                      {droneFeedActive ? "PAUSE" : "ACTIVATE"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2 text-stone-700">
                      <span className={`w-2 h-2 rounded-full ${sensorActive ? "bg-emerald-500 animate-pulse" : "bg-stone-300"}`} />
                      Acoustic Sensors (Block 4)
                    </div>
                    <button
                      onClick={() => setSensorActive(!sensorActive)}
                      className="text-[9px] font-bold text-stone-400 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 rounded px-1.5 py-0.5 hover:cursor-pointer"
                    >
                      {sensorActive ? "PAUSE" : "ACTIVATE"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    Satellite High-Res (Pending)
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/Recommendation"
                    id="btn-launch-tracker"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-wide cursor-pointer"
                  >
                    Launch Tracker
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Charts & Calibrations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Column 1: Prediction Accuracy Chart (8 columns) */}
            {matchesSearch("prediction accuracy sighting verification model output chart monday sunday") && (
              <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-stone-200/60 p-6 flex flex-col gap-6 justify-between select-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Prediction Accuracy</h3>
                    <p className="text-[11px] text-stone-400 font-semibold">Real Sighting Verification vs. Model Output</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-stone-200" />
                      Predicted
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-700" />
                      Verified
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between gap-2 h-56 pt-2 border-b border-stone-100 px-2 sm:px-6 relative">
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed border-stone-100 w-full pointer-events-none" />
                    <div className="absolute left-0 right-0 top-[25%] border-t border-dashed border-stone-100 w-full pointer-events-none" />
                    <div className="absolute left-0 right-0 top-[50%] border-t border-dashed border-stone-100 w-full pointer-events-none" />
                    <div className="absolute left-0 right-0 top-[75%] border-t border-dashed border-stone-100 w-full pointer-events-none" />

                    {[
                      { day: "MON", pred: "h-[45%]", ver: "h-[35%]", pVal: "45%", vVal: "35%" },
                      { day: "TUE", pred: "h-[65%]", ver: "h-[58%]", pVal: "65%", vVal: "58%" },
                      { day: "WED", pred: "h-[42%]", ver: "h-[38%]", pVal: "42%", vVal: "38%" },
                      { day: "THU", pred: "h-[80%]", ver: "h-[75%]", pVal: "80%", vVal: "75%" },
                      { day: "FRI", pred: "h-[35%]", ver: "h-[28%]", pVal: "35%", vVal: "28%" },
                      { day: "SAT", pred: "h-[62%]", ver: "h-[55%]", pVal: "62%", vVal: "55%" },
                      { day: "SUN", pred: "h-[68%]", ver: "h-[72%]", pVal: "68%", vVal: "72%" }
                    ].map((item) => (
                      <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end relative">
                        <div className="absolute -top-6 bg-stone-900 text-white rounded text-[8px] px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10 font-bold">
                          <span>P:{item.pVal}</span>
                          <span>V:{item.vVal}</span>
                        </div>
                        <div className="flex items-end gap-1 sm:gap-2 h-full w-full justify-center">
                          <div className={`w-3 sm:w-4 bg-stone-200 rounded-t ${item.pred} group-hover:bg-stone-300 transition-colors`} />
                          <div className={`w-3 sm:w-4 bg-amber-700 rounded-t ${item.ver} group-hover:bg-amber-800 transition-colors`} />
                        </div>
                        <span className="text-[10px] font-bold text-stone-400 tracking-wider mt-1">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Column 2: Model Calibrations Card */}
            {matchesSearch("model calibrations success retrained infrared yala hyperparameter tuning weather bias calibration") && (
              <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-stone-200/60 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-bold text-stone-900 select-none">Model Calibrations</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 pb-3 border-b border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">Leopard Tracker v4.2</span>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[9px] font-black uppercase">
                          98% Success
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                        Retrained with infrared sensor data from Yala Block 1.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 pb-3 border-b border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">Rhino Sentry AI</span>
                        <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-700 rounded text-[9px] font-black uppercase">
                          94% Success
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                        Hyperparameter tuning completed. Improved nocturnal detection.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">Weather Bias V1</span>
                        <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-600 rounded text-[9px] font-black uppercase animate-pulse">
                          Calibrating
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                        Adjusting for monsoon humidity shifts in visual clarity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4">
                  <button
                    onClick={() => setActiveModal("logs")}
                    id="btn-view-logs"
                    className="w-full flex items-center justify-center py-2 border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    View All Logs
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Predictive Hotspot Heatmap */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-stone-950 select-none">Predictive Hotspot Heatmap</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Sloth Bear Surge */}
              {matchesSearch("sloth bear surge emerging trend activity block west palatupana conf") && (
                <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="relative h-44 w-full bg-stone-900">
                    <Image
                      src="/sloth_bear_trend.png"
                      alt="Sloth Bear Headshot Close Up"
                      fill
                      className="object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Emerging Trend
                      </span>
                      <h4 className="text-sm font-extrabold text-stone-900">Sloth Bear Surge</h4>
                      <p className="text-[11px] text-stone-400 font-semibold leading-relaxed">
                        Increased activity in Block 1 West near Palatupana.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-400">Confidence</span>
                      <span className="text-stone-900">94%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Nocturnal Migration */}
              {matchesSearch("nocturnal migration shift detected elephants movement zone block sector window conf") && (
                <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="relative h-44 w-full bg-stone-900">
                    <Image
                      src="/elephant_migration.png"
                      alt="Elephant Herd Migrating Sunset"
                      fill
                      className="object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        Shift Detected
                      </span>
                      <h4 className="text-sm font-extrabold text-stone-900">Nocturnal Migration</h4>
                      <p className="text-[11px] text-stone-400 font-semibold leading-relaxed">
                        Elephants shifting movement to 11PM - 3AM window.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-400">Confidence</span>
                      <span className="text-stone-900">89%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3: Geospatial Intelligence */}
              {matchesSearch("geospatial intelligence block north heat intensifying leopard territory high probability inspect coordinates") && (
                <div className="bg-stone-900 text-white rounded-xl shadow-sm border border-stone-850 p-5 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
                  <div className="flex flex-col gap-3 z-10 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-extrabold tracking-tight">Geospatial Intelligence</h4>
                        <p className="text-[10px] text-stone-400">Block 1 North Heat Intensifying</p>
                      </div>
                      <Compass className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "10s" }} />
                    </div>

                    <div className="h-20 bg-stone-950/60 border border-white/5 rounded-lg flex items-center justify-center p-3 overflow-hidden relative">
                      <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                        <path
                          d="M0,35 Q10,15 25,30 T50,15 T75,25 T100,5"
                          fill="none"
                          stroke="#d97706"
                          strokeWidth="1.5"
                          className="animate-pulse"
                        />
                        <path
                          d="M0,35 Q10,15 25,30 T50,15 T75,25 T100,5 L100,40 L0,40 Z"
                          fill="rgba(217, 119, 6, 0.08)"
                        />
                      </svg>
                      <span className="absolute top-[45%] left-[50%] flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-rose-950 border border-rose-800 text-rose-300 font-extrabold tracking-wider uppercase">
                        Leopard Territory
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-950 border border-amber-800 text-amber-300 font-extrabold tracking-wider uppercase">
                        High Probability
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 z-10 relative">
                    <button
                      onClick={() => setActiveModal("coordinates")}
                      id="btn-inspect-coordinates"
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white text-stone-900 text-xs font-bold rounded-lg shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Inspect Coordinates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Footer Details Bar */}
          <div className="bg-[#FAF9F5] border border-stone-200/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5 select-none">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">System Health</span>
                  <span className="text-xs font-black text-stone-900">Optimum (99.2%)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600">
                  <RotateCw className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Last Training Run</span>
                  <span className="text-xs font-black text-stone-900">14 mins ago</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-200/50 rounded-lg text-stone-600">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Model Stack</span>
                  <span className="text-xs font-black text-stone-900">v5.0-production</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={() => { setActiveModal("deploy"); startDeploySimulation(); }}
                id="btn-deploy-experimental"
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-black rounded-full shadow-md hover:shadow-stone-900/10 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                Deploy Experimental
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modals & Overlays */}
      {activeModal === "coordinates" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={closeModals} />
          <div className="bg-white rounded-xl shadow-2xl border border-stone-200 p-6 max-w-md w-full z-10 animate-[scaleIn_0.2s_ease-out] relative">
            <button onClick={closeModals} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-stone-900">
              <Compass className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-extrabold">Geospatial Telemetry Details</h3>
            </div>
            <div className="py-4 flex flex-col gap-3 text-xs text-stone-600 font-medium">
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-150 flex flex-col gap-2 font-mono text-[10px] text-stone-700">
                <div className="flex justify-between">
                  <span>GPS Lat/Long:</span>
                  <span className="text-stone-900 font-bold">6°13'47.2"N 81°29'08.4"E</span>
                </div>
                <div className="flex justify-between">
                  <span>Grid Quadrant:</span>
                  <span className="text-stone-900 font-bold">Block 1 North (Sector 2A)</span>
                </div>
                <div className="flex justify-between">
                  <span>Vegetation Cover index:</span>
                  <span className="text-stone-900 font-bold">0.78 (Dense Shrub)</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-bold text-stone-900">Active Heat Intensity:</span>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[82%]" />
                </div>
                <span className="text-[10px] text-stone-400 text-right">82% probability threshold reached</span>
              </div>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
              <button onClick={closeModals} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs cursor-pointer">
                Close details
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "deploy" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={closeModals} />
          <div className="bg-stone-950 text-stone-100 rounded-xl shadow-2xl border border-white/10 p-6 max-w-xl w-full z-10 font-mono text-xs animate-[scaleIn_0.2s_ease-out] relative">
            <button onClick={closeModals} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-white/10 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pb-3.5 border-b border-white/10 text-white">
              <Terminal className="w-5 h-5 text-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold">Deployment console v5.1-experimental</h3>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-lg p-4 h-64 overflow-y-auto flex flex-col gap-1.5 my-4 text-[10px] text-stone-300 leading-normal select-none">
              {deployLogs.map((log, idx) => {
                let color = "text-stone-300";
                if (log.includes("[SUCCESS]")) color = "text-emerald-400 font-bold";
                if (log.includes("[WARN]")) color = "text-amber-400";
                if (log.includes("[INFO]")) color = "text-cyan-400";
                return <div key={idx} className={color}>{log}</div>;
              })}
              {deployStep === 1 && (
                <div className="text-stone-500 flex items-center gap-1.5 animate-pulse pt-1">
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                  Executing stack routine compilation...
                </div>
              )}
            </div>
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {deployStep === 1 && (
                  <span className="text-[10px] bg-amber-950 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                    Deploying
                  </span>
                )}
                {deployStep === 2 && (
                  <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Success
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={closeModals} className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-xs font-bold text-stone-400 hover:text-white cursor-pointer">
                  {deployStep === 2 ? "Finish" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === "logs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={closeModals} />
          <div className="bg-white rounded-xl shadow-2xl border border-stone-200 p-6 max-w-lg w-full z-10 animate-[scaleIn_0.2s_ease-out] relative select-none">
            <button onClick={closeModals} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-stone-900">
              <FileText className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-extrabold">Calibration Logs & Model History</h3>
            </div>
            <div className="py-4 flex flex-col gap-3 h-80 overflow-y-auto pr-1">
              {[
                { time: "Today 10:14 AM", type: "SUCCESS", msg: "Leopard Tracker v4.2 calibrated with infra drone array (Sector 4B). Sighting variance reduced by 4." },
                { time: "Yesterday 05:42 PM", type: "INFO", msg: "Rhino Sentry AI hyperparameter weights updated (decay factor = 0.015, epoch limit = 200)." },
                { time: "Yesterday 08:12 AM", type: "WARN", msg: "Weather Bias V1 flagged elevation discrepancy in wetlands. Retraining scheduled." },
                { time: "Jun 20, 11:25 AM", type: "SUCCESS", msg: "Elephant Corridor Neural model updated with migration telemetry from Yala Zone 2." },
                { time: "Jun 19, 04:30 PM", type: "INFO", msg: "Logs rotated. Cleared 1,420 deprecated coordinates indexes." }
              ].map((log, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-3 bg-stone-50 rounded-lg border border-stone-150 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 font-bold text-[10px]">{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${
                      log.type === "SUCCESS"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-250"
                        : log.type === "WARN"
                        ? "bg-amber-50 text-amber-700 border border-amber-250 animate-pulse"
                        : "bg-stone-200 text-stone-700"
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <p className="text-stone-600 font-medium leading-relaxed mt-1">
                    {log.msg}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button onClick={closeModals} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs cursor-pointer">
                Close logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
