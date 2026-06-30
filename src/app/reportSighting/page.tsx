"use client";

import React, { useState, useRef } from "react";
import { AnimalType, WeatherType, SightingReport, MAP_BOUNDS } from "@/components/report-sighting-components/types";
import ReportHero from "@/components/report-sighting-components/ReportHero";
import ObservationForm from "@/components/report-sighting-components/ObservationForm";
import LocationMap from "@/components/report-sighting-components/LocationMap";
import WhyReportCard from "@/components/report-sighting-components/WhyReportCard";
import SuccessToast from "@/components/report-sighting-components/SuccessToast";

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

  // Map ref for click-to-pin interaction
  const mapRef = useRef<HTMLDivElement>(null);

  // Convert lat/lng to percentage coordinates on the mock SVG map
  const getMapCoords = (lat: number, lng: number) => {
    const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
    // Latitude is inverted on map Y axis (higher lat is further up/North)
    const y = 100 - (((lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100);
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
    const newLng = MAP_BOUNDS.minLng + pctX * (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
    const newLat = MAP_BOUNDS.minLat + pctY * (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat);

    updateLocation(newLat, newLng);
  };

  // Update location helper, resolving sector names based on proximity
  const updateLocation = (lat: number, lng: number) => {
    setLatitude(parseFloat(lat.toFixed(5)));
    setLongitude(parseFloat(lng.toFixed(5)));

    // Mock resolve sector based on coordinates
    let sector = "Block I - Yala Savannahs";
    const xPct = (lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
    const yPct = (lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat);

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

      <ReportHero />

      {/* Main Form Dashboard Section */}
      <section className="container mx-auto px-4 md:px-16 max-w-7xl pb-24 relative z-10 -mt-16 sm:-mt-24 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <ObservationForm
            animalType={animalType}
            setAnimalType={setAnimalType}
            count={count}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            latitude={latitude}
            longitude={longitude}
            sectorName={sectorName}
            isLocating={isLocating}
            onPinLocation={handlePinLocation}
            weather={weather}
            setWeather={setWeather}
            fieldNotes={fieldNotes}
            setFieldNotes={setFieldNotes}
            dragActive={dragActive}
            onDrag={handleDrag}
            onDrop={handleDrop}
            uploadedFile={uploadedFile}
            imagePreview={imagePreview}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            onSubmit={handleSubmitReport}
          />

          {/* Right Column: Location Map & Why Report Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <LocationMap
              mapRef={mapRef}
              onMapClick={handleMapClick}
              isLocating={isLocating}
              mapCoordsX={mapCoords.x}
              mapCoordsY={mapCoords.y}
              sectorName={sectorName}
              locationAccuracy={locationAccuracy}
            />
            <WhyReportCard />
          </div>

        </div>
      </section>

      {/* Floating Success Toast notification */}
      {showToast && <SuccessToast onDismiss={() => setShowToast(false)} />}
    </div>
  );
}
