import {
  Footprints,
  Sun,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  CloudSun,
  Calendar,
  Sparkles,
} from "lucide-react";
import { AnimalType, TimeOfDay, WeatherType, SeasonType } from "./types";

interface ParametersCardProps {
  animal: AnimalType;
  setAnimal: (v: AnimalType) => void;
  timeOfDay: TimeOfDay;
  setTimeOfDay: (v: TimeOfDay) => void;
  weather: WeatherType;
  setWeather: (v: WeatherType) => void;
  season: SeasonType;
  setSeason: (v: SeasonType) => void;
  isScanning: boolean;
  scanProgress: number;
  onGenerate: () => void;
}

export default function ParametersCard({
  animal,
  setAnimal,
  timeOfDay,
  setTimeOfDay,
  weather,
  setWeather,
  season,
  setSeason,
  isScanning,
  scanProgress,
  onGenerate,
}: ParametersCardProps) {
  return (
    <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl border border-stone-100 p-6 flex flex-col gap-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
        <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700">
          <Footprints className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Target Parameters</h2>
          <p className="text-xs text-stone-400">Configure search parameters</p>
        </div>
      </div>

      {/* Animal Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
          Animal Type
        </label>
        <div className="relative">
          <select
            id="select-animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value as AnimalType)}
            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
          >
            <option value="leopard">Leopard</option>
            <option value="elephant">Elephant</option>
            <option value="sloth_bear">Sloth Bear </option>
            <option value="deer">Deer </option>
            <option value="peacock">Peacock </option>
          </select>
          <div className="absolute left-3.5 top-3.5 text-stone-400 pointer-events-none">
            <Footprints className="w-4 h-4" />
          </div>
          <div className="absolute right-3.5 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-500 w-0 h-0" />
        </div>
      </div>

      {/* Time of Day */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
          Time of Day
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-lg">
          {[
            { id: "dawn", label: "Dawn", icon: Sunrise },
            { id: "midday", label: "Midday", icon: Sun },
            { id: "afternoon", label: "Afternoon", icon: Sunset },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = timeOfDay === item.id;
            return (
              <button
                key={item.id}
                id={`btn-time-${item.id}`}
                onClick={() => setTimeOfDay(item.id as TimeOfDay)}
                className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-md transition-all duration-300 cursor-pointer ${isActive
                  ? "bg-white text-stone-900 shadow-sm font-semibold scale-100"
                  : "text-stone-500 hover:text-stone-800 hover:bg-white/40"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-stone-400"}`} />
                <span className="text-[10px] tracking-wide uppercase font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather & Season Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Weather */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
            Weather
          </label>
          <div className="relative">
            <select
              id="select-weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value as WeatherType)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
            >
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="overcast">Overcast</option>
            </select>
            <div className="absolute left-3 top-3 text-stone-400 pointer-events-none">
              {weather === "sunny" && <CloudSun className="w-3.5 h-3.5" />}
              {weather === "rainy" && <CloudRain className="w-3.5 h-3.5" />}
              {weather === "overcast" && <Cloud className="w-3.5 h-3.5" />}
            </div>
            <div className="absolute right-3 top-3.5 pointer-events-none border-l-3 border-r-3 border-t-3 border-transparent border-t-stone-500 w-0 h-0" />
          </div>
        </div>

        {/* Season */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-stone-400 tracking-wider uppercase">
            Season
          </label>
          <div className="relative">
            <select
              id="select-season"
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonType)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer hover:bg-stone-100/50 transition-colors"
            >
              <option value="dry">Dry Season</option>
              <option value="wet">Wet Season</option>
            </select>
            <div className="absolute left-3 top-3 text-stone-400 pointer-events-none">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="absolute right-3 top-3.5 pointer-events-none border-l-3 border-r-3 border-t-3 border-transparent border-t-stone-500 w-0 h-0" />
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="pt-2">
        <button
          id="btn-generate-prediction"
          disabled={isScanning}
          onClick={onGenerate}
          className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-4 text-sm font-bold text-white rounded-lg shadow-md cursor-pointer transition-all duration-300 active:scale-[0.98] ${isScanning
            ? "bg-stone-700/80 cursor-wait"
            : "bg-stone-900 hover:bg-stone-800 active:bg-black"
            }`}
        >
          <Sparkles className={`w-4 h-4 ${isScanning ? "animate-spin text-amber-400" : "text-amber-500"}`} />
          {isScanning ? `Processing Telemetry (${scanProgress}%)` : "Generate Prediction"}
        </button>
      </div>
    </div>
  );
}
