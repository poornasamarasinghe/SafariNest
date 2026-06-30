// components/admin/VerifySightings.tsx

export default function VerifySightings() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Verify Sightings
      </h2>

      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex gap-4 p-4 border rounded-xl"
          >
            <div className="w-20 h-20 bg-slate-200 rounded-lg" />

            <div className="flex-1">
              <h3 className="font-semibold">
                Leopard Sighting
              </h3>

              <p className="text-sm text-slate-500">
                Near Main Entrance
              </p>

              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1 bg-green-600 text-white rounded">
                  Approve
                </button>

                <button className="px-3 py-1 border rounded">
                  Flag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}