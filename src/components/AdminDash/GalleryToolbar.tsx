// components/gallery/GalleryToolbar.tsx
"use client";

interface GalleryToolbarProps {
  onUploadClick: () => void;
  showUpload: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function GalleryToolbar({
  onUploadClick,
  showUpload,
  activeTab,
  setActiveTab,
}: GalleryToolbarProps) {
  const tabs = ["All", "Wildlife", "Birds", "Landscapes", "Safari Jeeps"];

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button className="border text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
            Select All
          </button>

          <button className="border text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
            Move To
          </button>

          <button className="border text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
            Export
          </button>

          <button className="text-red-600 border border-red-100 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
            Bulk Delete
          </button>
        </div>

        <button 
          onClick={onUploadClick}
          className={`${
            showUpload ? "bg-slate-600 hover:bg-slate-700" : "bg-slate-900 hover:bg-slate-850"
          } text-white px-5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer shadow-sm`}
        >
          {showUpload ? "Cancel Upload" : "Upload New Images"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
              activeTab === tab
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}