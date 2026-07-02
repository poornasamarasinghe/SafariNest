"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";

interface PackageCardProps {
  data: any;
  onRefresh: () => void;
}

export default function PackageCard({ data, onRefresh }: PackageCardProps) {
  const [preview, setPreview] = useState(data.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Controlled form states
  const [name, setName] = useState(data.name || "");
  const [price, setPrice] = useState(data.price || 0);
  const [zone, setZone] = useState(data.zone || "");
  const [duration, setDuration] = useState(data.duration || "");
  const [guests, setGuests] = useState(data.guests || 0);
  const [description, setDescription] = useState(data.description || "");

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    setPreview(data.image);
    setName(data.name || "");
    setPrice(data.price || 0);
    setZone(data.zone || "");
    setDuration(data.duration || "");
    setGuests(data.guests || 0);
    setDescription(data.description || "");
    setSelectedFile(null);
  }, [data]);

  const changeImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("zone", zone);
    formData.append("duration", duration);
    formData.append("guests", guests.toString());
    formData.append("description", description);
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages/${data.id}`;
      const res = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update package details.");
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
      onRefresh();
    } catch (err: any) {
      alert(err.message || "An error occurred while saving package changes.");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-slate-200/60 p-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left (Image preview and upload) */}
        <div>
          <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
            <Image
              src={preview}
              alt={name}
              fill
              className="object-cover"
              unoptimized={preview.startsWith("http") || preview.startsWith("blob:")}
            />
          </div>

          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#1d2b22] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#2d4034] transition">
            <Upload size={16} />
            Change Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={changeImage}
            />
          </label>
        </div>

        {/* Right (Form details) */}
        <div className="space-y-5 text-slate-800">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Package Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Zone
              </label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Maximum Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1.5 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#1d2b22] focus:border-[#1d2b22] resize-none"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#1d2b22] text-white px-8 py-3 rounded-lg hover:bg-[#2d4034] transition disabled:opacity-50 font-bold text-sm cursor-pointer flex items-center gap-2"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
            
            {saveStatus === "success" && (
              <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                ✓ Saved successfully!
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-red-600 text-xs font-bold">
                Failed to save.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}