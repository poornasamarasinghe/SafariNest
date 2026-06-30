"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

type Category = "Wildlife" | "Safari Community";
type Tab = "All" | Category;

type ImageFile = {
  file: File;
  preview: string;
  category: Category;
};

export function UploadDropzone() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      const category: Category = Math.random() > 0.5 ? "Wildlife" : "Safari Community";
      return {
        file,
        preview: URL.createObjectURL(file),
        category,
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

  const filteredImages =
    activeTab === "All"
      ? images
      : images.filter((img) => img.category === activeTab);

  return (
    <div className="space-y-6">
      {/* 🔽 Upload Box */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
        ${isDragActive ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-300"}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl">📤</div>

          <p className="font-medium">
            Drop images here or{" "}
            <span className="text-blue-600 underline">browse</span>
          </p>

          <p className="text-sm text-gray-500">
            Supports PNG, JPG, WEBP up to 20MB per file
          </p>
        </div>
      </div>

      {/* 🧭 Tabs */}
      <div className="flex gap-4 text-sm font-medium">
        {(['All', 'Wildlife', 'Safari Community'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🖼 Gallery */}
      {filteredImages.length === 0 ? (
        <p className="text-sm text-gray-500">No images uploaded</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-2 hover:shadow-md transition"
            >
              {/* Image + Badge */}
              <div className="relative">
                <Image
                  src={img.preview}
                  alt="preview"
                  width={320}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg"
                  unoptimized
                />

                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this photo?"
                      )
                    ) {
                      setImages((prev) => prev.filter((_, i) => i !== index));
                    }
                  }}
                  className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/90 text-red-600 shadow hover:bg-red-50 transition"
                  aria-label="Delete photo"
                >
                  ×
                </button>

                <span className="absolute top-2 left-2 text-[10px] bg-white px-2 py-1 rounded shadow">
                  {img.category}
                </span>
              </div>

              {/* Info */}
              <div className="mt-2">
                <p className="text-xs font-medium truncate">
                  {img.file.name}
                </p>
                <p className="text-[10px] text-gray-500">
                  Just uploaded
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination (UI only) */}
      <div className="flex justify-end gap-2 text-sm mt-4">
        <button className="px-3 py-1 border rounded cursor-pointer">Previous</button>
        <button className="px-3 py-1 border rounded bg-blue-600 text-white cursor-pointer">
          1
        </button>
        <button className="px-3 py-1 border rounded cursor-pointer">2</button>
        <button className="px-3 py-1 border rounded cursor-pointer">3</button>
        <button className="px-3 py-1 border rounded cursor-pointer">Next</button>
      </div>
    </div>
  );
}

export default UploadDropzone;