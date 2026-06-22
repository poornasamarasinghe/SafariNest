// components/gallery/GalleryStats.tsx

export default function GalleryStats() {
  const cards = [
    {
      title: "Total Media Assets",
      value: "1,284",
    },
    {
      title: "Storage Used",
      value: "42.8 GB",
    },
    {
      title: "Pending Review",
      value: "12",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border p-5 shadow-sm"
        >
          <p className="text-xs text-slate-500 uppercase">
            {card.title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}