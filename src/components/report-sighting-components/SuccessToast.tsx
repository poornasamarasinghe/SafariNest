import { CheckCircle2, X } from "lucide-react";

interface SuccessToastProps {
  onDismiss: () => void;
}

export default function SuccessToast({ onDismiss }: SuccessToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1c261e] border border-stone-800 text-white rounded-xl shadow-2xl p-4 max-w-sm flex gap-3.5 items-start animate-in slide-in-from-bottom duration-300">
      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-stone-100">Telemetry Dispatched</span>
        <span className="text-[10px] text-stone-400 leading-normal">
          Sighting successfully archived. Sighting ID: RPT-{(Math.floor(1000 + Math.random() * 9000))}
        </span>
      </div>
      <button
        onClick={onDismiss}
        className="text-stone-400 hover:text-stone-200 shrink-0 self-center cursor-pointer p-0.5 hover:bg-white/5 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
