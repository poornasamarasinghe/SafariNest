import React from "react";
import Image from "next/image";
import {
  Footprints,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  MapPin,
  Sparkles,
  Plus,
  Minus,
  Compass,
  UploadCloud,
  Check,
  X,
} from "lucide-react";
import { AnimalType, WeatherType } from "./types";

interface ObservationFormProps {
  animalType: AnimalType;
  setAnimalType: (v: AnimalType) => void;
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
  latitude: number;
  longitude: number;
  sectorName: string;
  isLocating: boolean;
  onPinLocation: () => void;
  weather: WeatherType;
  setWeather: (v: WeatherType) => void;
  fieldNotes: string;
  setFieldNotes: (v: string) => void;
  dragActive: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  uploadedFile: File | null;
  imagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (e: React.MouseEvent) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ObservationForm({
  animalType,
  setAnimalType,
  count,
  incrementCount,
  decrementCount,
  latitude,
  longitude,
  sectorName,
  isLocating,
  onPinLocation,
  weather,
  setWeather,
  fieldNotes,
  setFieldNotes,
  dragActive,
  onDrag,
  onDrop,
  uploadedFile,
  imagePreview,
  fileInputRef,
  onFileChange,
  onRemoveFile,
  isSubmitting,
  isSuccess,
  onSubmit,
}: ObservationFormProps) {
  return (
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
      <form onSubmit={onSubmit} className="flex flex-col gap-5">

        {/* Row 1: Animal Type & Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Animal Type Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Animal Type</label>
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
            <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Count</label>
            <div className="flex items-center w-full bg-stone-50 border border-stone-200 rounded-xl h-11 px-2">
              <button type="button" onClick={decrementCount}
                className="w-10 h-8 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200/50 hover:text-stone-900 active:scale-95 transition-all cursor-pointer font-bold">
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center font-bold text-sm text-stone-800">{count}</span>
              <button type="button" onClick={incrementCount}
                className="w-10 h-8 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200/50 hover:text-stone-900 active:scale-95 transition-all cursor-pointer font-bold">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: GPS Coordinates input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">GPS Coordinates</label>
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
            <button type="button" onClick={onPinLocation} disabled={isLocating}
              className={`h-11 px-4 border border-stone-200 rounded-xl flex items-center gap-2 hover:bg-stone-50 active:scale-[0.97] transition-all font-semibold text-xs text-stone-700 shadow-sm cursor-pointer whitespace-nowrap ${isLocating ? "bg-stone-100 text-stone-400 cursor-wait" : "bg-white"}`}>
              <Compass className={`w-4 h-4 text-amber-600 ${isLocating ? "animate-spin" : ""}`} />
              Pin Location
            </button>
          </div>
        </div>

        {/* Row 3: Current Weather */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Current Weather</label>
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
                <button key={item.id} type="button" onClick={() => setWeather(item.id as WeatherType)}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${isActive
                    ? "bg-[#1c261e] border-[#1c261e] text-white shadow-md font-bold scale-100"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-500 animate-pulse" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Field Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Field Notes</label>
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
          <label className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">Evidence Photography</label>

          {imagePreview ? (
            <div className="relative w-full border border-stone-200 rounded-xl bg-stone-50 p-4 flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-stone-300 shadow-sm shrink-0">
                  <Image src={imagePreview} alt="Sighting evidence thumbnail preview" fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-800 truncate max-w-[200px] sm:max-w-xs">{uploadedFile?.name}</p>
                  <p className="text-[10px] font-medium text-stone-400 mt-0.5">{(uploadedFile!.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={onRemoveFile} className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 active:scale-90 transition-all cursor-pointer" title="Remove uploaded image file">
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={onDrag} onDragOver={onDrag} onDragLeave={onDrag} onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-xl py-8 px-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${dragActive
                ? "border-amber-600 bg-amber-50/30 scale-[1.01]"
                : "border-stone-200 bg-stone-50/50 hover:border-amber-500/50 hover:bg-stone-50"}`}>
              <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
              <UploadCloud className="w-8 h-8 text-stone-400 mb-3" />
              <p className="text-xs font-bold text-stone-800">Drop image here or click to upload</p>
              <p className="text-[10px] font-medium text-stone-400 mt-1">Support: JPG, PNG (Max 10MB)</p>
            </div>
          )}
        </div>

        {/* Submit Report Button */}
        <div className="pt-3">
          <button type="submit" disabled={isSubmitting || isLocating}
            className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#1c261e] hover:bg-[#27352a] active:bg-stone-900 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Submit Report
          </button>
        </div>

      </form>
    </div>
  );
}
