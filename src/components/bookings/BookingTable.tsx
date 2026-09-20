"use client";

import { Check, X, Trash2 } from "lucide-react";

const statusStyles: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export interface Booking {
  id: string;
  bookingId?: string;
  guest: string;
  phone?: string;
  package: string;
  zone?: string;
  date: string;
  time?: string;
  guests?: number | string;
  price?: string | number;
  status: string;
}

interface BookingTableProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function BookingTable({
  bookings,
  onUpdateStatus,
  onDelete,
}: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-[#E8EAE8] rounded-xl p-12 text-center text-gray-400 text-sm shadow-sm">
        No bookings match the current filters.
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E8EAE8] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-4">Guest</th>
              <th className="text-left px-6 py-4">Safari Package</th>
              <th className="text-left px-6 py-4">Date &amp; Time</th>
              <th className="text-left px-6 py-4">Guests</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-50/50 transition-colors">
                {/* Guest */}
                <td className="px-6 py-5">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{booking.guest}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      {booking.bookingId || booking.id}
                    </p>
                    {booking.phone && (
                      <p className="text-xs text-gray-400 mt-0.5">{booking.phone}</p>
                    )}
                  </div>
                </td>

                {/* Package */}
                <td className="px-6 py-5">
                  <p className="font-medium text-gray-800 text-sm">{booking.package}</p>
                  {booking.zone && (
                    <p className="text-xs text-orange-500 mt-0.5">Zone: {booking.zone}</p>
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-5">
                  <p className="text-sm text-gray-700">{booking.date}</p>
                  {booking.time && (
                    <p className="text-xs text-gray-400 mt-0.5">{booking.time}</p>
                  )}
                </td>

                {/* Guests count */}
                <td className="px-6 py-5 text-sm text-gray-600">{booking.guests ?? "—"}</td>

                {/* Price */}
                <td className="px-6 py-5 font-semibold text-gray-900 text-sm">
                  {booking.price ?? "—"}
                </td>

                {/* Status badge */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[booking.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex gap-3 items-center">
                    {booking.status !== "Confirmed" && (
                      <button
                        title="Approve"
                        onClick={() => onUpdateStatus(booking.id, "Confirmed")}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <Check size={15} />
                      </button>
                    )}
                    {booking.status !== "Cancelled" && (
                      <button
                        title="Cancel"
                        onClick={() => onUpdateStatus(booking.id, "Cancelled")}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={15} />
                      </button>
                    )}
                    <button
                      title="Delete"
                      onClick={() => onDelete(booking.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}