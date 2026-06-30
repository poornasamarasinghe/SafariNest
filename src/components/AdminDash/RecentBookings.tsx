// components/admin/RecentBookings.tsx

const bookings = [
  {
    customer: "Julian Thorne",
    package: "Leopard Trail Explorer",
    date: "Oct 24",
    status: "Confirmed",
  },
  {
    customer: "Elena Rodriguez",
    package: "Dawn Birding Walk",
    date: "Oct 25",
    status: "Pending",
  },
  {
    customer: "Marcus Vane",
    package: "Savanna Night Ops",
    date: "Oct 22",
    status: "Cancelled",
  },
];

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Recent Bookings
        </h2>

        <button>View All</button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="pb-3">Customer</th>
            <th>Package</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.customer} className="border-b">
              <td className="py-4">{booking.customer}</td>
              <td>{booking.package}</td>
              <td>{booking.date}</td>

              <td>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}