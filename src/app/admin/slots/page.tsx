import AdminShell from "../../../components/AdminDash/AdminShell";

export default function SlotsPage() {
  return (
    <AdminShell
      title="Scheduling Slots"
      subtitle="View and manage jeep availability and booking time slots."
    >
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#F4F6F4] border border-[#C4CDC4]/40 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-[#C4CDC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="font-sans font-medium text-[#444B43] mb-1">Slots management coming soon</p>
        <p className="font-sans text-[13px] text-[#444B43]/50">This module is under development.</p>
      </div>
    </AdminShell>
  );
}
