// components/admin/StatsCard.tsx

type Props = {
  title: string;
  value: string;
  change?: string;
};

export default function StatsCard({ title, value, change }: Props) {
  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm">
      <div className="flex justify-between">
        <span className="text-sm text-slate-500">
          {title}
        </span>

        {change && (
          <span className="text-green-600 text-sm font-medium">
            {change}
          </span>
        )}
      </div>

      <h3 className="text-4xl font-bold mt-4">
        {value}
      </h3>
    </div>
  );
}