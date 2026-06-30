export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-6">
      <div>
        <p className="text-sm text-slate-500">Admin dashboard</p>
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Create report
        </button>
      </div>
    </header>
  );
}
