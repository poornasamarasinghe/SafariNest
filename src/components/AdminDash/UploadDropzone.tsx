"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react";

type Category = "Wildlife" | "Birds" | "Landscapes" | "Safari Jeeps";
type Tab = "All" | Category;

type ImageFile = {
  file: File;
  preview: string;
  category: Category;
  title: string;
};

interface UploadDropzoneProps {
  onUploadComplete: () => void;
}

export function UploadDropzone({ onUploadComplete }: UploadDropzoneProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      const title = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      return {
        file,
        preview: URL.createObjectURL(file),
        category: "Wildlife" as Category,
        title,
      };
    });

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 20 * 1024 * 1024,
  });

  const onUploadAll = async () => {
    setIsUploading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/gallery`;

    try {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        setUploadProgress(`Uploading ${i + 1} of ${images.length}...`);

        const formData = new FormData();
        formData.append("image", img.file);
        formData.append("title", img.title);
        formData.append("category", img.category);

        const res = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to upload image: ${img.file.name}`);
        }
      }

      alert("All images uploaded successfully!");
      // Revoke preview object URLs to free up memory
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      setImages([]);
      onUploadComplete();
    } catch (err: any) {
      alert(err.message || "An error occurred during file upload.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const filteredImages =
    activeTab === "All"
      ? images
      : images.filter((img) => img.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
          isDragActive
            ? "bg-slate-50 border-slate-900"
            : "bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-350"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl">📤</div>

          <p className="font-bold text-slate-800">
            Drop images here or{" "}
            <span className="text-slate-950 underline cursor-pointer font-semibold">browse</span>
          </p>

          <p className="text-xs text-slate-500 font-medium">
            Supports PNG, JPG, JPEG, WEBP up to 20MB per file
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <>
          {/* Navigation/Tabs for Staged Files */}
          <div className="flex gap-4 text-xs font-semibold border-b pb-2">
            {(["All", "Wildlife", "Birds", "Landscapes", "Safari Jeeps"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition ${
                  activeTab === tab
                    ? "text-slate-950 border-b-2 border-slate-950 font-bold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Staged Images Editor Grid */}
          {filteredImages.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No images in this category</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredImages.map((img, index) => {
                // Find actual index in the state array (in case we are viewing filtered tabs)
                const actualIndex = images.findIndex((i) => i.preview === img.preview);

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-xs border p-3 hover:shadow-sm transition flex flex-col justify-between"
                  >
                    {/* Image Preview & Delete badge */}
                    <div className="relative">
                      <Image
                        src={img.preview}
                        alt="preview"
                        width={320}
                        height={160}
                        className="w-full h-36 object-cover rounded-lg bg-slate-50"
                        unoptimized
                      />

                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(img.preview);
                          setImages((prev) => prev.filter((_, i) => i !== actualIndex));
                        }}
                        className="absolute top-2 right-2 inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/90 text-red-600 shadow-xs hover:bg-red-50 hover:text-red-700 transition font-bold"
                        aria-label="Remove photo"
                      >
                        ×
                      </button>

                      <span className="absolute top-2 left-2 text-[9px] font-bold bg-slate-950 text-white px-2 py-0.5 rounded shadow-xs">
                        {img.category}
                      </span>
                    </div>

                    {/* Metadata Editors */}
                    <div className="mt-3 space-y-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Title
                        </label>
                        <input
                          type="text"
                          value={img.title}
                          onChange={(e) => {
                            setImages((prev) =>
                              prev.map((item, i) =>
                                i === actualIndex ? { ...item, title: e.target.value } : item
                              )
                            );
                          }}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Category
                        </label>
                        <select
                          value={img.category}
                          onChange={(e) => {
                            setImages((prev) =>
                              prev.map((item, i) =>
                                i === actualIndex
                                  ? { ...item, category: e.target.value as Category }
                                  : item
                              )
                            );
                          }}
                          className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none bg-white cursor-pointer font-medium"
                        >
                          <option value="Wildlife">Wildlife</option>
                          <option value="Birds">Birds</option>
                          <option value="Landscapes">Landscapes</option>
                          <option value="Safari Jeeps">Safari Jeeps</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-end items-center gap-3 mt-6 border-t pt-4">
            {isUploading && (
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mr-auto">
                <Loader2 size={14} className="animate-spin" />
                {uploadProgress}
              </span>
            )}

            <button
              onClick={() => {
                images.forEach((img) => URL.revokeObjectURL(img.preview));
                setImages([]);
              }}
              disabled={isUploading}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-50 transition cursor-pointer"
            >
              Clear All
            </button>

            <button
              onClick={onUploadAll}
              disabled={isUploading || images.length === 0}
              className="bg-slate-900 hover:bg-slate-850 text-white px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-50 transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              {isUploading ? "Uploading..." : `Upload ${images.length} Image(s)`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadDropzone;