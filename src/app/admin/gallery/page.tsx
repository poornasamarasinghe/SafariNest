// app/admin/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../../components/AdminDash/sidebar";
import GalleryStats from "../../../components/AdminDash/GalleryStats";
import GalleryToolbar from "../../../components/AdminDash/GalleryToolbar";
import GalleryGrid from "../../../components/AdminDash/GalleryGrid";
import UploadDropzone from "../../../components/AdminDash/UploadDropzone";

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

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) {
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/gallery/${id}`;
      const res = await fetch(apiUrl, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete image");
      // Refetch list
      fetchImages();
    } catch (err: any) {
      alert(err.message || "Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Gallery Management
            </h1>

            <p className="text-slate-500 mt-2 font-medium">
              Curate and manage the visual library of safari expeditions and
              guest memories.
            </p>
          </div>

          <GalleryStats images={images} />

          <GalleryToolbar 
            onUploadClick={() => setShowUpload(!showUpload)} 
            showUpload={showUpload}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {showUpload && (
            <div className="bg-white border rounded-xl p-6 shadow-sm animate-in slide-in-from-top duration-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">Upload Media Assets</h2>
                <button 
                  onClick={() => setShowUpload(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-semibold hover:underline"
                >
                  Close
                </button>
              </div>
              <UploadDropzone onUploadComplete={() => {
                setShowUpload(false);
                fetchImages();
              }} />
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
      </main>
    </div>
  );
}