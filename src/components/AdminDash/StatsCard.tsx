type Props = {
  title: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
  positive?: boolean;
};

export default function StatsCard({ title, value, change, icon, positive = true }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8EAE8] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#F4F6F4] flex items-center justify-center text-[#7F6200] group-hover:bg-[#102110] group-hover:text-[#FFB080] transition-all duration-200">
            {icon}
          </div>
        )}
        {change && (
          <span className={`ml-auto font-jetbrains text-[11px] font-bold tracking-[0.04em] px-2.5 py-1 rounded-full ${
            positive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}>
            {change}
          </span>
        )}
      </div>

      <p className="font-jetbrains text-[11px] tracking-[0.1em] text-[#444B43]/60 uppercase mb-1">
        {title}
      </p>
      <p className="font-sans font-bold text-[32px] leading-none tracking-[-0.02em] text-[#102110]">
        {value}
      </p>
    </div>
  );
}