import { X, Compass, FileText, Terminal, RotateCw, CheckCircle2 } from "lucide-react";
import { ModalType } from "./types";

interface AnalyticsModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  deployStep: number;
  deployLogs: string[];
}

export default function AnalyticsModals({
  activeModal,
  onClose,
  deployStep,
  deployLogs,
}: AnalyticsModalsProps) {
  return (
    <>
      {/* Coordinates Modal */}
      {activeModal === "coordinates" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
          <div className="bg-white rounded-xl shadow-2xl border border-stone-200 p-6 max-w-md w-full z-10 animate-[scaleIn_0.2s_ease-out] relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 cursor-pointer"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-stone-900">
              <Compass className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-extrabold">Geospatial Telemetry Details</h3>
            </div>
            <div className="py-4 flex flex-col gap-3 text-xs text-stone-600 font-medium">
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-100 flex flex-col gap-2 font-mono text-[10px] text-stone-700">
                <div className="flex justify-between"><span>GPS Lat/Long:</span><span className="text-stone-900 font-bold">6°13&apos;47.2&quot;N 81°29&apos;08.4&quot;E</span></div>
                <div className="flex justify-between"><span>Grid Quadrant:</span><span className="text-stone-900 font-bold">Block 1 North (Sector 2A)</span></div>
                <div className="flex justify-between"><span>Vegetation Cover:</span><span className="text-stone-900 font-bold">0.78 (Dense Shrub)</span></div>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-bold text-stone-900">Active Heat Intensity:</span>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden"><div className="bg-amber-600 h-full w-[82%]" /></div>
                <span className="text-[10px] text-stone-400 text-right">82% probability threshold reached</span>
              </div>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs cursor-pointer">Close details</button>
            </div>
          </div>
        </div>
      )}

      {/* Deploy Modal */}
      {activeModal === "deploy" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
          <div className="bg-stone-950 text-stone-100 rounded-xl shadow-2xl border border-white/10 p-6 max-w-xl w-full z-10 font-mono text-xs animate-[scaleIn_0.2s_ease-out] relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-white/10 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 pb-3.5 border-b border-white/10 text-white">
              <Terminal className="w-5 h-5 text-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold">Deployment console v5.1-experimental</h3>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-lg p-4 h-64 overflow-y-auto flex flex-col gap-1.5 my-4 text-[10px] text-stone-300 leading-normal select-none">
              {deployLogs.map((log, idx) => {
                let color = "text-stone-300";
                if (log.includes("[SUCCESS]")) color = "text-emerald-400 font-bold";
                if (log.includes("[WARN]")) color = "text-amber-400";
                if (log.includes("[INFO]")) color = "text-cyan-400";
                return <div key={idx} className={color}>{log}</div>;
              })}
              {deployStep === 1 && (
                <div className="text-stone-500 flex items-center gap-1.5 animate-pulse pt-1">
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-500" />Executing stack routine compilation...
                </div>
              )}
            </div>
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {deployStep === 1 && <span className="text-[10px] bg-amber-950 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded font-bold uppercase animate-pulse">Deploying</span>}
                {deployStep === 2 && (
                  <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />Success
                  </span>
                )}
              </div>
              <button onClick={onClose} className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-xs font-bold text-stone-400 hover:text-white cursor-pointer">
                {deployStep === 2 ? "Finish" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {activeModal === "logs" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
          <div className="bg-white rounded-xl shadow-2xl border border-stone-200 p-6 max-w-lg w-full z-10 animate-[scaleIn_0.2s_ease-out] relative select-none">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-stone-700 cursor-pointer"><X className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-stone-900">
              <FileText className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-extrabold">Calibration Logs &amp; Model History</h3>
            </div>
            <div className="py-4 flex flex-col gap-3 h-80 overflow-y-auto pr-1">
              {[
                { time: "Today 10:14 AM", type: "SUCCESS", msg: "Leopard Tracker v4.2 calibrated with infra drone array (Sector 4B). Sighting variance reduced by 4." },
                { time: "Yesterday 05:42 PM", type: "INFO", msg: "Rhino Sentry AI hyperparameter weights updated (decay factor = 0.015, epoch limit = 200)." },
                { time: "Yesterday 08:12 AM", type: "WARN", msg: "Weather Bias V1 flagged elevation discrepancy in wetlands. Retraining scheduled." },
                { time: "Jun 20, 11:25 AM", type: "SUCCESS", msg: "Elephant Corridor Neural model updated with migration telemetry from Yala Zone 2." },
                { time: "Jun 19, 04:30 PM", type: "INFO", msg: "Logs rotated. Cleared 1,420 deprecated coordinates indexes." },
              ].map((log, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 font-bold text-[10px]">{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${log.type === "SUCCESS" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : log.type === "WARN" ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse" : "bg-stone-200 text-stone-700"}`}>{log.type}</span>
                  </div>
                  <p className="text-stone-600 font-medium leading-relaxed mt-1">{log.msg}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button onClick={onClose} className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs cursor-pointer">Close logs</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
