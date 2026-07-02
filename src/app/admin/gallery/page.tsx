// app/admin/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminShell from "../../../components/AdminDash/AdminShell";
import GalleryStats from "../../../components/AdminDash/GalleryStats";
import GalleryToolbar from "../../../components/AdminDash/GalleryToolbar";
import GalleryGrid from "../../../components/AdminDash/GalleryGrid";
import UploadDropzone from "../../../components/AdminDash/UploadDropzone";
import { Upload, X } from "lucide-react";

export interface GalleryImage {
  id: string | number;
  title: string;
  category: string;
  image: string;
  uploaded: string;
  status: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const fetchImages = async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/gallery`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch gallery images");
      const data = await res.json();
      setImages(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/gallery/${id}`;
      const res = await fetch(apiUrl, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete image");
      fetchImages();
    } catch (err: any) {
      alert(err.message || "Failed to delete image");
    }
  };

  const uploadAction = (
    <button
      onClick={() => setShowUpload(!showUpload)}
      className={`flex items-center gap-2 h-9 px-4 rounded-xl font-jetbrains text-[12px] font-semibold border transition-all duration-200 cursor-pointer ${
        showUpload
          ? "bg-[#102110] border-[#102110] text-white"
          : "bg-white border-[#C4CDC4] text-[#102110] hover:border-[#102110]/50"
      }`}
    >
      {showUpload ? <X size={14} /> : <Upload size={14} />}
      {showUpload ? "Close Upload" : "Upload Media"}
    </button>
  );

  return (
    <AdminShell
      title="Gallery Management"
      subtitle="Curate and manage the visual library of safari expeditions."
      action={uploadAction}
    >
      <div className="space-y-6">
        <GalleryStats images={images} />

        <GalleryToolbar
          onUploadClick={() => setShowUpload(!showUpload)}
          showUpload={showUpload}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {showUpload && (
          <div className="bg-white border border-[#E8EAE8] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-jetbrains text-[10px] tracking-[0.12em] text-[#7F6200] uppercase mb-0.5">Upload</p>
                <h2 className="font-sans font-bold text-[16px] text-[#102110]">Upload Media Assets</h2>
              </div>
              <button
                onClick={() => setShowUpload(false)}
                className="w-8 h-8 rounded-full border border-[#C4CDC4] flex items-center justify-center text-[#444B43] hover:text-[#102110] hover:border-[#102110] transition-all duration-200 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <UploadDropzone onUploadComplete={() => { setShowUpload(false); fetchImages(); }} />
          </div>
        )}

        <GalleryGrid
          images={images}
          loading={loading}
          error={error}
          activeTab={activeTab}
          onDelete={handleDelete}
          onAddMediaClick={() => setShowUpload(true)}
        />
      </div>
    </AdminShell>
  );
}