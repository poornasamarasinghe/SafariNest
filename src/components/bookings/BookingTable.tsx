"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  Trash2,
  Loader2,
} from "lucide-react";

const statusStyles = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingTable() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await res.json();
      setBookings(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${id}/status`;
      const res = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update booking status");
      }
      fetchBookings();
    } catch (err: any) {
      alert(err.message || "An error occurred while updating booking status.");
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${id}`;
      const res = await fetch(apiUrl, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete booking");
      }
      fetchBookings();
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting booking.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-500" size={32} />
        <p className="text-sm text-gray-500 font-medium">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

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
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50/50"
              >
                <td className="px-6 py-5">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {booking.guest}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      ID: {booking.bookingId || booking.id}
                    </p>
                    {booking.phone && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {booking.phone}
                      </p>
                    )}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div>
                    <p className="font-medium text-gray-800">{booking.package}</p>
                    <p className="text-xs text-orange-500 mt-0.5">
                      Zone: {booking.zone}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-gray-700">
                  <p>{booking.date}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {booking.time}
                  </p>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">
                  {booking.guests}
                </td>

                <td className="px-6 py-5 font-semibold text-gray-900">
                  {booking.price}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[
                        booking.status as keyof typeof statusStyles
                      ] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-4">
                    {booking.status !== "Confirmed" && (
                      <Check
                        size={16}
                        onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                        className="cursor-pointer text-green-600 hover:text-green-800 transition-colors"
                        title="Approve Booking"
                      />
                    )}
                    {booking.status !== "Cancelled" && (
                      <X
                        size={16}
                        onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                        className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                        title="Cancel Booking"
                      />
                    )}
                    <Trash2
                      size={16}
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="cursor-pointer text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Booking"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-5 border-t bg-gray-50/50">
        <p className="text-sm text-gray-500">
          Showing {bookings.length} of {bookings.length} entries
        </p>
      </div>
    </div>
  );
}