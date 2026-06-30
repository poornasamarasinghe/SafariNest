"use client";

import { SafariPackage } from "@/data/safariPackages";

interface SafariDescriptionProps {
  packageData: SafariPackage;
}

export default function SafariDescription({ packageData }: SafariDescriptionProps) {
  return (
    <div className="space-y-8">
      {/* Description Header with Vertical Line */}
      <div className="border-l-[4px] border-[#7F6200] pl-5">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
          {packageData.descriptionTitle}
        </h2>
      </div>

      {/* Description Body Paragraphs */}
      <div className="space-y-6 text-zinc-600 text-sm leading-relaxed font-normal">
        {packageData.descriptionParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Analytics Info Card */}
      {packageData.analyticsCard && (
        <div className="bg-white rounded-2xl border border-zinc-250/40 p-6 md:p-8 shadow-sm">
          <h3 className="font-sans font-bold text-base text-zinc-900 mb-3">
            {packageData.analyticsCard.title}
          </h3>
          <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6">
            {packageData.analyticsCard.text}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {packageData.analyticsCard.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-zinc-100 border border-zinc-200 text-zinc-700 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
