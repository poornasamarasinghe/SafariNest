"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

const bookings = [
  {
    guest: "Sarah Jenkins",
    id: "BK-8821",
    package: "Leopard Tracker Elite",
    zone: "Block 1",
    date: "Oct 24, 2023",
    time: "05:30 AM",
    guests: "2 Adult, 1 Child",
    price: "$450",
    status: "Confirmed",
  },
  {
    guest: "David Miller",
    id: "BK-9042",
    package: "Gentle Giants Expedition",
    zone: "Kumana",
    date: "Oct 25, 2023",
    time: "03:00 PM",
    guests: "4 Adults",
    price: "$680",
    status: "Pending",
  },
  {
    guest: "Elena Rodriguez",
    id: "BK-7719",
    package: "Birding Paradise Tour",
    zone: "Bundala",
    date: "Oct 26, 2023",
    time: "06:00 AM",
    guests: "1 Adult",
    price: "$210",
    status: "Cancelled",
  },
];

const statusStyles = {
  Confirmed:
    "bg-green-100 text-green-700",
  Pending:
    "bg-yellow-100 text-yellow-700",
  Cancelled:
    "bg-red-100 text-red-700",
};

export default function BookingTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="text-left px-6 py-4">Guest</th>
            <th className="text-left px-6 py-4">Safari Package</th>
            <th className="text-left px-6 py-4">Date & Time</th>
            <th className="text-left px-6 py-4">Guests</th>
            <th className="text-left px-6 py-4">Price</th>
            <th className="text-left px-6 py-4">Status</th>
            <th className="text-left px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-t"
            >
              <td className="px-6 py-5">
                <div>
                  <h4 className="font-semibold">
                    {booking.guest}
                  </h4>

                  <p className="text-sm text-gray-500">
                    ID: {booking.id}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                <div>
                  <p>{booking.package}</p>

                  <p className="text-sm text-orange-500">
                    Zone: {booking.zone}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                <p>{booking.date}</p>
                <p className="text-sm text-gray-500">
                  {booking.time}
                </p>
              </td>

              <td className="px-6 py-5">
                {booking.guests}
              </td>

              <td className="px-6 py-5 font-semibold">
                {booking.price}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusStyles[
                      booking.status as keyof typeof statusStyles
                    ]
                  }`}
                >
                  {booking.status}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex gap-3">
                  <Check
                    size={16}
                    className="cursor-pointer text-green-600"
                  />
                  <X
                    size={16}
                    className="cursor-pointer text-red-600"
                  />
                  <Pencil
                    size={16}
                    className="cursor-pointer"
                  />
                  <Eye
                    size={16}
                    className="cursor-pointer"
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-5 border-t">
        <p className="text-sm text-gray-500">
          Showing 1 to 10 of 244 entries
        </p>

        <div className="flex gap-2">
          <button className="w-9 h-9 border rounded">
            1
          </button>

          <button className="w-9 h-9 border rounded">
            2
          </button>

          <button className="w-9 h-9 border rounded">
            3
          </button>
        </div>
      </div>
    </div>
  );
}