// app/admin/gallery/page.tsx

import Sidebar from "../../../components/AdminDash/sidebar";
import GalleryStats from "../../../components/AdminDash/GalleryStats";
import GalleryToolbar from "../../../components/AdminDash/GalleryToolbar";
import GalleryGrid from "../../../components/AdminDash/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Gallery Management
            </h1>

            <p className="text-slate-500 mt-2">
              Curate and manage the visual library of safari expeditions and
              guest memories.
            </p>
          </div>

          <GalleryStats />

          <GalleryToolbar />

          <GalleryGrid />
        </div>
      </main>
    </div>
  );
}