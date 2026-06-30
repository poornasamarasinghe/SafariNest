"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Footprints,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Camera,
  MapPin,
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  Navigation,
  Compass,
  UploadCloud,
  Check,
  Map,
  X,
  Info
} from "lucide-react";

// Types
type AnimalType = "leopard" | "elephant" | "sloth_bear" | "sambar_deer" | "crocodile" | "other";
type WeatherType = "sunny" | "overcast" | "rainy" | "windy";

interface SightingReport {
  id: string;
  animalType: AnimalType;
  count: number;
  latitude: number;
  longitude: number;
  sectorName: string;
  weather: WeatherType;
  fieldNotes: string;
  evidenceName: string | null;
  timestamp: string;
}

export default function ReportSightingPage() {
  // Form State
  const [animalType, setAnimalType] = useState<AnimalType>("leopard");
  const [count, setCount] = useState<number>(1);
  const [latitude, setLatitude] = useState<number>(6.3811);
  const [longitude, setLongitude] = useState<number>(81.4883);
  const [sectorName, setSectorName] = useState<string>("Block I - Palatupana");
  const [weather, setWeather] = useState<WeatherType>("sunny");
  const [fieldNotes, setFieldNotes] = useState<string>("");

  // Evidence Upload State
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Interaction State
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Map settings and scaling (simulating coordinates inside Yala National Park Block I)
  // Palatupana Gate coordinates around: Lat 6.3768, Lng 81.4429
  // Patanangala Beach coordinates around: Lat 6.3882, Lng 81.5173
  const mapRef = useRef<HTMLDivElement>(null);
  const mapBounds = {
    minLat: 6.3650,
    maxLat: 6.4250,
    minLng: 81.4250,
    maxLng: 81.5250
  };

  // Convert lat/lng to percentage coordinates on the mock SVG map
  const getMapCoords = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    // Latitude is inverted on map Y axis (higher lat is further up/North)
    const y = 100 - (((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * 100);
    return { x, y };
  };

  const mapCoords = getMapCoords(latitude, longitude);

  // Handle map click to pin coordinates
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current || isLocating) return;

    const rect = mapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pctX = clickX / rect.width;
    const pctY = 1 - (clickY / rect.height); // Invert Y for latitude

    // Compute lat/lng from percentage
    const newLng = mapBounds.minLng + pctX * (mapBounds.maxLng - mapBounds.minLng);
    const newLat = mapBounds.minLat + pctY * (mapBounds.maxLat - mapBounds.minLat);

    updateLocation(newLat, newLng);
  };

  // Update location helper, resolving sector names based on proximity
  const updateLocation = (lat: number, lng: number) => {
    setLatitude(parseFloat(lat.toFixed(5)));
    setLongitude(parseFloat(lng.toFixed(5)));

    // Mock resolve sector based on coordinates
    let sector = "Block I - Yala Savannahs";
    const xPct = (lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng);
    const yPct = (lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat);

    if (xPct < 0.4 && yPct > 0.5) {
      sector = "Block I - Palatupana Sector";
    } else if (xPct > 0.6 && yPct < 0.4) {
      sector = "Block I - Patanangala Coast";
    } else if (xPct < 0.5 && yPct < 0.5) {
      sector = "Block I - Heenwewa Tank";
    } else if (xPct > 0.5 && yPct > 0.6) {
      sector = "Block I - Buthawa Lagoon";
    } else if (xPct > 0.4 && xPct < 0.7 && yPct > 0.3 && yPct < 0.7) {
      sector = "Block I - Uraniya Plain";
    }
    setSectorName(sector);
  };

  // Trigger GPS locator simulation
  const handlePinLocation = () => {
    setIsLocating(true);
    let steps = 0;
    const interval = setInterval(() => {
      // Simulate GPS search jumps narrowing down on Yala Block 1
      const randLat = 6.3700 + Math.random() * 0.04;
      const randLng = 81.4350 + Math.random() * 0.07;
      updateLocation(randLat, randLng);

      steps++;
      if (steps >= 12) {
        clearInterval(interval);
        // Set final precise location near hot zone
        const finalLat = 6.3811 + (Math.random() - 0.5) * 0.015;
        const finalLng = 81.4883 + (Math.random() - 0.5) * 0.02;
        updateLocation(finalLat, finalLng);
        setIsLocating(false);
      }
    }, 150);
  };

  // Count handlers
  const incrementCount = () => setCount((prev) => Math.min(20, prev + 1));
  const decrementCount = () => setCount((prev) => Math.max(1, prev - 1));

  // File Upload Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG).");
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setUploadedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit Handler
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission with beautiful telemetry loading states
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setShowToast(true);

      // Save to localStorage for analytical persistence
      const newReport: SightingReport = {
        id: "RPT-" + Math.floor(100000 + Math.random() * 900000),
        animalType,
        count,
        latitude,
        longitude,
        sectorName,
        weather,
        fieldNotes,
        evidenceName: uploadedFile ? uploadedFile.name : null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today"
      };

      try {
        const stored = localStorage.getItem("safari_sightings");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newReport);
        localStorage.setItem("safari_sightings", JSON.stringify(list));
      } catch (err) {
        console.error("Local storage save failed:", err);
      }

      // Reset form fields after 2 seconds success screen
      setTimeout(() => {
        setIsSuccess(false);
        setCount(1);
        setFieldNotes("");
        setUploadedFile(null);
        setImagePreview(null);
      }, 3000);

      // Auto dismiss success toast after 5s
      setTimeout(() => {
        setShowToast(false);
      }, 5000);

    }, 2200);
  };

  // Map accuracy percentage
  const locationAccuracy = isLocating ? "Calculating..." : "88.4%";

  return (
    <div className="flex-1 bg-[#FAF9F5] text-stone-900 font-sans min-h-screen flex flex-col relative">

      {/* Hero Banner Section */}
      <section className="relative h-[400px] w-full overflow-hidden flex items-center justify-center shrink-0">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/safari_hero_bg.png"
            alt="Yala Savannah Acacias Sunset"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Rich gradients for high-fidelity transition and typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/30 to-transparent opacity-95" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 z-10 text-center select-none max-w-4xl flex flex-col gap-4">
          <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase">CITIZEN CONSERVATION MATRIX</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Report Wildlife Sighting
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Contribute to our AI-driven conservation network by sharing your sightings in real-time. Help us protect the untamed beauty of Yala.
          </p>
        </div>
      </section>

      {/* Main Form Dashboard Section */}
      <section className="container mx-auto px-4 md:px-16 max-w-7xl pb-24 relative z-10 -mt-16 sm:-mt-24 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Form Details Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-stone-200/40 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">

            {/* Elegant Background Accent */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700" />

            {/* Success Telemetry Screen Overlay */}
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 z-40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight mb-2">Telemetry Dispatched</h3>
                <p className="text-stone-500 text-sm max-w-sm leading-relaxed mb-6">
                  Thank you! Sighting data successfully encrypted and broadcast to local warden clusters and the leopard migration neural engine.
                </p>
                <div className="flex gap-2 items-center text-[11px] font-mono bg-stone-50 border border-stone-200 rounded px-3 py-1.5 text-stone-600">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>AI prediction mapping updating...</span>
                </div>
              </div>
            )}

            {/* Sighting form submission blocker */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 z-30 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
                <div className="relative w-20 h-20 rounded-full border border-amber-500/20 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-t-2 border-amber-600 animate-spin" />
                  <Compass className="w-8 h-8 text-amber-600 animate-pulse" />
                </div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest animate-pulse">Encrypting telemetry data...</span>
              </div>
            )}

            {/* Card Header */}
            <div className="flex items-center gap-3 pb-5 border-b border-stone-100">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
                <Footprints className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">Observation Details</h2>
                <p className="text-xs text-stone-400">Log animal species, count, environment metrics, and visual evidence</p>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmitReport} className="flex flex-col gap-5">

              {/* Row 1: Animal Type & Count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Animal Type Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                    Animal Type
                  </label>
                  <div className="relative">
                    <select
                      id="select-animal-type"
                      value={animalType}
                      onChange={(e) => setAnimalType(e.target.value as AnimalType)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
                    >
                      <option value="leopard">Leopard (Panthera pardus kotiya)</option>
                      <option value="elephant">Sri Lankan Elephant (Elephas maximus)</option>
                      <option value="sloth_bear">Sloth Bear (Melursus ursinus)</option>
                      <option value="sambar_deer">Sambar Deer (Rusa unicolor)</option>
                      <option value="crocodile">Mugger Crocodile (Crocodylus palustris)</option>
                      <option value="other">Other Wildlife</option>
                    </select>
                    <div className="absolute left-3.5 top-3.5 text-stone-400 pointer-events-none">
                      <Footprints className="w-4 h-4" />
                    </div>
                    <div className="absolute right-4 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-500 w-0 h-0" />
                  </div>
                </div>

                {/* Count selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                    Count
                  </label>
                  <div className="flex items-center w-full bg-stone-50 border border-stone-200 rounded-xl h-11 px-2">
                    <button
                      type="button"
                      onClick={decrementCount}
                      className="w-10 h-8 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200/50 hover:text-stone-900 active:scale-95 transition-all cursor-pointer font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-bold text-sm text-stone-800">{count}</span>
                    <button
                      type="button"
                      onClick={incrementCount}
                      className="w-10 h-8 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200/50 hover:text-stone-900 active:scale-95 transition-all cursor-pointer font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: GPS Coordinates input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                  GPS Coordinates
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={`${latitude}° N, ${longitude}° E (${sectorName})`}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-xs font-semibold select-all focus:outline-none"
                    />
                    <div className="absolute left-3.5 top-3.5 text-stone-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePinLocation}
                    disabled={isLocating}
                    className={`h-11 px-4 border border-stone-200 rounded-xl flex items-center gap-2 hover:bg-stone-50 active:scale-[0.97] transition-all font-semibold text-xs text-stone-700 shadow-sm cursor-pointer whitespace-nowrap ${isLocating ? "bg-stone-100 text-stone-400 cursor-wait" : "bg-white"
                      }`}
                  >
                    <Compass className={`w-4 h-4 text-amber-600 ${isLocating ? "animate-spin" : ""}`} />
                    Pin Location
                  </button>
                </div>
              </div>

              {/* Row 3: Current Weather */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                  Current Weather
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "sunny", label: "Sunny", icon: Sun },
                    { id: "overcast", label: "Overcast", icon: Cloud },
                    { id: "rainy", label: "Rainy", icon: CloudRain },
                    { id: "windy", label: "Windy", icon: Wind }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = weather === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setWeather(item.id as WeatherType)}
                        className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${isActive
                          ? "bg-[#1c261e] border-[#1c261e] text-white shadow-md font-bold scale-100"
                          : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                          }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-amber-500 animate-pulse" : "text-stone-400"}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Field Notes */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                  Field Notes
                </label>
                <textarea
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  placeholder="Describe the animal's behavior or any notable markings..."
                  rows={4}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-850 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 resize-none leading-relaxed transition-all"
                />
              </div>

              {/* Row 5: Evidence Photography Dropzone */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                  Evidence Photography
                </label>

                {imagePreview ? (
                  <div className="relative w-full border border-stone-200 rounded-xl bg-stone-50 p-4 flex items-center justify-between animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-stone-300 shadow-sm shrink-0">
                        <Image
                          src={imagePreview}
                          alt="Sighting evidence thumbnail preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                          {uploadedFile?.name}
                        </p>
                        <p className="text-[10px] font-medium text-stone-400 mt-0.5">
                          {(uploadedFile!.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 active:scale-90 transition-all cursor-pointer"
                      title="Remove uploaded image file"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed rounded-xl py-8 px-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${dragActive
                      ? "border-amber-600 bg-amber-50/30 scale-[1.01]"
                      : "border-stone-200 bg-stone-50/50 hover:border-amber-500/50 hover:bg-stone-50"
                      }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <UploadCloud className="w-8 h-8 text-stone-400 mb-3" />
                    <p className="text-xs font-bold text-stone-800">
                      Drop image here or click to upload
                    </p>
                    <p className="text-[10px] font-medium text-stone-400 mt-1">
                      Support: JPG, PNG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Report Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting || isLocating}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#1c261e] hover:bg-[#27352a] active:bg-stone-900 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Report
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Sighting Location Map & Explanations */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Card 1: Interactive Topo Map */}
            <div className="bg-white rounded-2xl shadow-xl border border-stone-200/40 p-5 flex flex-col gap-4 relative select-none">

              {/* Card Title & Live Badge */}
              <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm tracking-tight flex items-center gap-2">
                  <Map className="w-4 h-4 text-amber-600" />
                  Sighting Location
                </h3>
                <span className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  Live GPS
                </span>
              </div>

              {/* Map Box */}
              <div
                ref={mapRef}
                onClick={handleMapClick}
                className="relative h-64 bg-stone-950 border border-stone-200/60 rounded-xl overflow-hidden shadow-inner cursor-crosshair group"
              >
                {/* Fallback topo graphic drawn using nested SVGs */}
                <svg
                  viewBox="0 0 400 240"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full opacity-85 z-0"
                >
                  {/* Grid Lines */}
                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
                    <line x1="100" y1="0" x2="100" y2="240" />
                    <line x1="200" y1="0" x2="200" y2="240" />
                    <line x1="300" y1="0" x2="300" y2="240" />
                    <line x1="0" y1="60" x2="400" y2="60" />
                    <line x1="0" y1="120" x2="400" y2="120" />
                    <line x1="0" y1="180" x2="400" y2="180" />
                  </g>

                  {/* Ocean (Yala Coast on Southeast) */}
                  <path
                    d="M 280,240 Q 320,180 400,160 L 400,240 Z"
                    fill="#0f2b3c"
                    className="opacity-70"
                  />
                  <path
                    d="M 280,240 Q 320,180 400,160"
                    fill="none"
                    stroke="#1c6b90"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="opacity-80"
                  />

                  {/* Contours (Hills / Savannas / Dunes) */}
                  <g fill="none" stroke="rgba(110, 160, 100, 0.12)" strokeWidth="1">
                    {/* Ridge 1 */}
                    <path d="M 50,40 C 90,30 120,60 140,90 C 160,120 120,150 90,140 C 60,130 30,100 50,40 Z" />
                    <path d="M 60,50 C 95,42 110,65 125,90 C 140,115 110,135 90,128 C 70,120 45,95 60,50 Z" />
                    <path d="M 75,65 C 98,60 105,75 115,90 C 125,105 105,120 90,115 C 75,110 65,90 75,65 Z" />

                    {/* Ridge 2 (Near Coast) */}
                    <path d="M 250,90 C 290,70 330,80 340,110 C 350,140 310,160 280,150 C 250,140 220,110 250,90 Z" />
                    <path d="M 270,100 C 300,85 320,95 325,110 C 330,125 305,140 280,132 C 255,125 240,110 270,100 Z" />
                  </g>

                  {/* Main Water Tanks (e.g. Heenwewa) */}
                  <path
                    d="M 120,65 Q 130,55 140,68 T 160,60 T 145,85 T 120,65"
                    fill="#0f2638"
                    stroke="#1c486c"
                    strokeWidth="1"
                    className="opacity-90"
                  />

                  {/* Coast Label */}
                  <text x="330" y="210" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="bold" letterSpacing="1.5" transform="rotate(-15 330 210)">INDIAN OCEAN</text>

                  {/* Sectors Markers */}
                  <text x="35" y="20" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">BLOCK I - PALATUPANA</text>
                  <text x="250" y="30" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">BUTHAWA LAGOON</text>
                  <text x="110" y="190" fill="rgba(255,255,255,0.15)" fontSize="7" fontWeight="bold">URANIYA PLAIN</text>
                </svg>

                {/* Grid Overlay Lines (Fine details) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay" />

                {/* Live GPS scanning animation */}
                {isLocating && (
                  <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
                    <Compass className="w-8 h-8 text-amber-500 animate-spin mb-1.5" />
                    <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest animate-pulse">Syncing Telemetry Satellites...</span>
                  </div>
                )}

                {/* Sighting Marker Pin */}
                {!isLocating && (
                  <div
                    style={{
                      left: `${mapCoords.x}%`,
                      top: `${mapCoords.y}%`,
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-[85%] transition-all duration-300 ease-out pointer-events-none"
                  >
                    {/* Pulse Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-orange-500/40 bg-orange-500/10 animate-ping" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-orange-500/50 bg-orange-500/20" />

                    {/* SVG Pin Marker */}
                    <svg className="w-8 h-8 text-orange-500 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}

                {/* Interactive Map Helper Hint */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-md rounded-lg px-2.5 py-1 text-[9px] font-bold text-stone-300 border border-white/5 shadow-md">
                    <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    Click anywhere on the map to manually pin sighting
                  </div>
                </div>
              </div>

              {/* Map Footer Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2 divide-x divide-stone-100">

                {/* Sector display */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">PROBABILITY RADIUS</span>
                  <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5 truncate">
                    <Navigation className="w-3.5 h-3.5 text-amber-600 rotate-45 shrink-0" />
                    {sectorName}
                  </span>
                </div>

                {/* Accuracy display */}
                <div className="flex flex-col gap-1 pl-4">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">ACCURACY</span>
                  <span className="text-xs font-bold text-stone-800 font-mono tracking-tight">
                    {locationAccuracy}
                  </span>
                </div>

              </div>

            </div>

            {/* Card 2: Why report sightings? Card */}
            <div className="bg-[#1c261e] rounded-2xl shadow-xl border border-stone-850 p-6 md:p-8 flex flex-col gap-5 text-white relative overflow-hidden">
              {/* Background abstract texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <h3 className="font-bold text-lg tracking-tight select-none">
                Why report sightings?
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                Your data feed directly into our AI-driven conservation algorithm, helping rangers monitor leopard populations and mitigate human-wildlife conflict.
              </p>

              {/* Bullets with custom checkboxes */}
              <ul className="flex flex-col gap-4 pt-1">
                {[
                  { text: "Real-time population tracking", desc: "Monitors density map anomalies" },
                  { text: "Habitat expansion analysis", desc: "Plots territories against park development boundaries" },
                  { text: "Poaching prevention alert system", desc: "Triggers rapid patrol vectors in high-volume areas" }
                ].map((item) => (
                  <li key={item.text} className="flex gap-3.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-stone-100">{item.text}</span>
                      <span className="text-[10px] text-stone-400 mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

            </div>

          </div>

        </div>
      </section>

      {/* Floating Success Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c261e] border border-stone-800 text-white rounded-xl shadow-2xl p-4 max-w-sm flex gap-3.5 items-start animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-stone-100">Telemetry Dispatched</span>
            <span className="text-[10px] text-stone-400 leading-normal">
              Sighting successfully archived. Sighting ID: RPT-{(Math.floor(1000 + Math.random() * 9000))}
            </span>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-stone-400 hover:text-stone-200 shrink-0 self-center cursor-pointer p-0.5 hover:bg-white/5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
