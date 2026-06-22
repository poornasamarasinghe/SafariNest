// components/gallery/GalleryToolbar.tsx

"use client";

export default function GalleryToolbar() {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg">
            Select All
          </button>

          <button className="border px-4 py-2 rounded-lg">
            Move To
          </button>

          <button className="border px-4 py-2 rounded-lg">
            Export
          </button>

          <button className="text-red-600 border border-red-200 px-4 py-2 rounded-lg">
            Bulk Delete
          </button>
        </div>

        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg">
          Upload New Images
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        {["All", "Wildlife", "Tours", "Guests"].map((tab) => (
          <button
            key={tab}
            className="px-3 py-1 rounded-lg border text-sm"
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}