import Sidebar from "../../components/AdminDash/sidebar";
import DashboardContent from "../../components/AdminDash/DashboardContent";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <main className="p-8 bg-slate-50">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
