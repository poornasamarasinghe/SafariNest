interface AccuracyChartRowProps {
  matchesSearch: (text: string) => boolean;
  onOpenLogs: () => void;
}

const CHART_DATA = [
  { day: "MON", pred: "h-[45%]", ver: "h-[35%]", pVal: "45%", vVal: "35%" },
  { day: "TUE", pred: "h-[65%]", ver: "h-[58%]", pVal: "65%", vVal: "58%" },
  { day: "WED", pred: "h-[42%]", ver: "h-[38%]", pVal: "42%", vVal: "38%" },
  { day: "THU", pred: "h-[80%]", ver: "h-[75%]", pVal: "80%", vVal: "75%" },
  { day: "FRI", pred: "h-[35%]", ver: "h-[28%]", pVal: "35%", vVal: "28%" },
  { day: "SAT", pred: "h-[62%]", ver: "h-[55%]", pVal: "62%", vVal: "55%" },
  { day: "SUN", pred: "h-[68%]", ver: "h-[72%]", pVal: "68%", vVal: "72%" },
];

export default function AccuracyChartRow({ matchesSearch, onOpenLogs }: AccuracyChartRowProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

      {/* Prediction Accuracy Chart */}
      {matchesSearch("prediction accuracy sighting verification model output chart monday sunday") && (
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-stone-200/60 p-6 flex flex-col gap-6 justify-between select-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-stone-900">Prediction Accuracy</h3>
              <p className="text-[11px] text-stone-400 font-semibold">Real Sighting Verification vs. Model Output</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-stone-600">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-stone-200" />Predicted</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-700" />Verified</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-2 h-56 pt-2 border-b border-stone-100 px-2 sm:px-6 relative">
              <div className="absolute left-0 right-0 top-0 border-t border-dashed border-stone-100 w-full pointer-events-none" />
              <div className="absolute left-0 right-0 top-[25%] border-t border-dashed border-stone-100 w-full pointer-events-none" />
              <div className="absolute left-0 right-0 top-[50%] border-t border-dashed border-stone-100 w-full pointer-events-none" />
              <div className="absolute left-0 right-0 top-[75%] border-t border-dashed border-stone-100 w-full pointer-events-none" />
              {CHART_DATA.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end relative">
                  <div className="absolute -top-6 bg-stone-900 text-white rounded text-[8px] px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10 font-bold">
                    <span>P:{item.pVal}</span><span>V:{item.vVal}</span>
                  </div>
                  <div className="flex items-end gap-1 sm:gap-2 h-full w-full justify-center">
                    <div className={`w-3 sm:w-4 bg-stone-200 rounded-t ${item.pred} group-hover:bg-stone-300 transition-colors`} />
                    <div className={`w-3 sm:w-4 bg-amber-700 rounded-t ${item.ver} group-hover:bg-amber-800 transition-colors`} />
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 tracking-wider mt-1">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Model Calibrations Card */}
      {matchesSearch("model calibrations success retrained infrared yala hyperparameter tuning weather bias calibration") && (
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-stone-200/60 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-stone-900 select-none">Model Calibrations</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 pb-3 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Leopard Tracker v4.2</span>
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[9px] font-black uppercase">98% Success</span>
                </div>
                <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">Retrained with infrared sensor data from Yala Block 1.</p>
              </div>
              <div className="flex flex-col gap-1.5 pb-3 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Rhino Sentry AI</span>
                  <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-700 rounded text-[9px] font-black uppercase">94% Success</span>
                </div>
                <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">Hyperparameter tuning completed. Improved nocturnal detection.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Weather Bias V1</span>
                  <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-600 rounded text-[9px] font-black uppercase animate-pulse">Calibrating</span>
                </div>
                <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">Adjusting for monsoon humidity shifts in visual clarity.</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-stone-100 mt-4">
            <button onClick={onOpenLogs} id="btn-view-logs"
              className="w-full flex items-center justify-center py-2 border border-stone-200 rounded-lg text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer">
              View All Logs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
