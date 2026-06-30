// components/admin/AIAnalytics.tsx

export default function AIAnalytics() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-2xl font-semibold mb-4">
        AI Intelligence
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-slate-500">
            Prediction Accuracy
          </p>

          <h3 className="text-4xl font-bold">
            88.4%
          </h3>
        </div>

        <div className="h-44 flex items-end gap-2">
          {[25, 40, 15, 55, 30, 65, 48, 25].map((v, i) => (
            <div
              key={i}
              style={{ height: `${v}%` }}
              className="flex-1 bg-slate-300 rounded-t"
            />
          ))}
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Processing Load</span>
            <span>Optimal</span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full mt-2">
            <div className="w-3/4 h-2 bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}