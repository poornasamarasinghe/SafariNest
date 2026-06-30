import { CheckCircle2 } from "lucide-react";

export default function WhyReportCard() {
  return (
    <div className="bg-[#1c261e] rounded-2xl shadow-xl border border-stone-850 p-6 md:p-8 flex flex-col gap-5 text-white relative overflow-hidden">
      {/* Background abstract texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <h3 className="font-bold text-lg tracking-tight select-none">Why report sightings?</h3>
      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
        Your data feed directly into our AI-driven conservation algorithm, helping rangers monitor leopard populations and mitigate human-wildlife conflict.
      </p>

      {/* Bullets with custom checkboxes */}
      <ul className="flex flex-col gap-4 pt-1">
        {[
          { text: "Real-time population tracking", desc: "Monitors density map anomalies" },
          { text: "Habitat expansion analysis", desc: "Plots territories against park development boundaries" },
          { text: "Poaching prevention alert system", desc: "Triggers rapid patrol vectors in high-volume areas" }
        ].map((item) => (
          <li key={item.text} className="flex gap-3.5 items-start">
            <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-stone-100">{item.text}</span>
              <span className="text-[10px] text-stone-400 mt-0.5">{item.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
