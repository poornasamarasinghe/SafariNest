// components/gallery/GalleryGrid.tsx

const images = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Safari Image ${i + 1}`,
  status: i % 3 === 0 ? "Pending" : "Approved",
}));

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-xl border bg-white group"
        >
          <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-4xl text-slate-400">🦁</span>
          </div>

          <span className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded text-white ${
            image.status === "Approved" ? "bg-green-500" : "bg-yellow-500"
          }`}>
            {image.status}
          </span>

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button className="bg-white px-3 py-2 rounded-lg text-sm font-medium">
              View
            </button>
          </div>
        </div>
      ))}

      <div className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
        <div className="text-4xl">+</div>

        <p className="text-sm text-slate-500 mt-2">
          Add Media
        </p>
      </div>
    </div>
  );
}