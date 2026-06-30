"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Clock,
  Eye,
  Brain,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import { ModalType } from "@/components/analytics-components/types";
import AnalyticsSidebar from "@/components/analytics-components/AnalyticsSidebar";
import AnalyticsHeader from "@/components/analytics-components/AnalyticsHeader";
import StatsRow from "@/components/analytics-components/StatsRow";
import AccuracyChartRow from "@/components/analytics-components/AccuracyChartRow";
import HotspotHeatmapRow from "@/components/analytics-components/HotspotHeatmapRow";
import AnalyticsModals from "@/components/analytics-components/AnalyticsModals";

export default function AnalyticsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [notificationCount, setNotificationCount] = useState(3);
  const [droneFeedActive, setDroneFeedActive] = useState(true);
  const [sensorActive, setSensorActive] = useState(true);
  const [predictionsCount, setPredictionsCount] = useState(84248);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictionsCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      "[SUCCESS] Production router switched to v5.1-experimental successfully!",
    ];
    logs.forEach((log, index) => {
      setTimeout(() => {
        setDeployLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) setDeployStep(2);
      }, (index + 1) * 900);
    });
  };

  const closeModals = () => {
    setActiveModal("none");
    setDeployStep(0);
    setDeployLogs([]);
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "#" },
    { label: "Bookings", icon: Calendar, href: "#" },
    { label: "Packages", icon: Package, href: "#" },
    { label: "Slots", icon: Clock, href: "#" },
    { label: "Wildlife Reports", icon: Eye, href: "#" },
    { label: "AI Analytics", icon: Brain, href: "/analytics", active: true },
    { label: "Gallery", icon: ImageIcon, href: "#" },
    { label: "Users", icon: Users, href: "#" },
  ];

  return (
    <div className="flex bg-[#FAF9F5] text-stone-900 font-sans min-h-screen relative overflow-x-hidden">

      <AnalyticsSidebar
        navItems={navItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenLogs={() => setActiveModal("logs")}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">

        <AnalyticsHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={notificationCount}
          onClearNotifications={() => setNotificationCount(0)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-6 lg:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto">

          {/* Page Title */}
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

          <StatsRow
            matchesSearch={matchesSearch}
            predictionsCount={predictionsCount}
            droneFeedActive={droneFeedActive}
            setDroneFeedActive={setDroneFeedActive}
            sensorActive={sensorActive}
            setSensorActive={setSensorActive}
          />

          <AccuracyChartRow
            matchesSearch={matchesSearch}
            onOpenLogs={() => setActiveModal("logs")}
          />

          <HotspotHeatmapRow
            matchesSearch={matchesSearch}
            onInspectCoordinates={() => setActiveModal("coordinates")}
            onDeploy={() => { setActiveModal("deploy"); startDeploySimulation(); }}
          />

        </main>
      </div>

      <AnalyticsModals
        activeModal={activeModal}
        onClose={closeModals}
        deployStep={deployStep}
        deployLogs={deployLogs}
      />

      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
