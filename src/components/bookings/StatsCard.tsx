interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="uppercase text-xs tracking-widest text-gray-400">
        {title}
      </p>

      <h3 className="text-4xl font-bold mt-3 text-gray-900">
        {value}
      </h3>
    </div>
  );
}