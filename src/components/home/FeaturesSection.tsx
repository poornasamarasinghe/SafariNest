import React from 'react';

const features = [
  {
    title: 'Leopard Sighting AI',
    description: 'Our algorithms analyze real-time radio and visual reports to predict leopard movement across Block 1 and 5 with unparalleled accuracy.',
    icon: (
      <svg className="w-6 h-6 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Premium Jeep Rentals',
    description: 'Modified 4x4 off-road vehicles equipped with silent-drive modes and AI dashboard overlays for a superior, low-impact viewing experience.',
    icon: (
      <svg className="w-6 h-6 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zM13 16h6a1 1 0 001-1v-4a1 1 0 00-1-1h-6v6z" />
      </svg>
    ),
  },
  {
    title: 'Smart Block Selection',
    description: "Don't follow the crowds. Our AI recommends park entry blocks based on current wildlife activity and vehicle density to ensure exclusivity.",
    icon: (
      <svg className="w-6 h-6 text-[#7F6200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="1.5" />
        <path d="M17 14l2.5 2.5L22 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.5 16.5v5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-start p-8 rounded-2xl border border-[#C4CDC4]/40 bg-white hover:border-[#102110] hover:-translate-y-1 hover:shadow-[0_12px_30px_-15px_rgba(16,33,16,0.15)] transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F4F6F4] flex items-center justify-center mb-6 group-hover:bg-[#102110] group-hover:text-white transition-all duration-300">
              <div className="group-hover:scale-110 transition-transform duration-300 text-[#7F6200] group-hover:text-[#FFB080]">
                {feature.icon}
              </div>
            </div>
            <h3 className="font-sans font-semibold text-[20px] leading-[28px] text-[#102110] mb-4">
              {feature.title}
            </h3>
            <p className="font-sans font-normal text-[15px] leading-[24px] text-[#444B43]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
