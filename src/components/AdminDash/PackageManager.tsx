// components/admin/PackageManager.tsx

export default function PackageManager() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Package Manager
        </h2>

        <button className="bg-amber-700 text-white px-4 py-2 rounded-lg">
          Add Package
        </button>
      </div>

      <div className="space-y-4">
        {[
          "Royal Elephant Suite",
          "Eco-Tent Wilderness",
          "Pro Photographer Workshop",
        ].map((pkg) => (
          <div
            key={pkg}
            className="border rounded-xl p-4"
          >
            <h3 className="font-semibold">
              {pkg}
            </h3>

            <p className="text-sm text-slate-500">
              Active Bookings: 4
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}