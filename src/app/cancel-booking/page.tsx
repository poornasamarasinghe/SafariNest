"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";

function CancelBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("id");

  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelState, setCancelState] = useState<"confirm" | "submitting" | "success" | "error">("confirm");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch booking details on mount to show the user what they are cancelling
  useEffect(() => {
    if (!bookingId) {
      setCancelState("error");
      setErrorMessage("Missing booking reference ID in URL.");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${bookingId}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Unable to retrieve booking details. It may have been deleted.");
        }
        const data = await res.json();
        setBookingDetails(data);
        
        if (data.status === "Cancelled") {
          setCancelState("success");
        }
      } catch (err: any) {
        console.error(err);
        setCancelState("error");
        setErrorMessage(err.message || "Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleConfirmCancellation = async () => {
    setCancelState("submitting");
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${bookingId}/status`;
      const res = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update booking status.");
      }

      setCancelState("success");
    } catch (err: any) {
      console.error(err);
      setCancelState("error");
      setErrorMessage(err.message || "Failed to cancel reservation. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-150 p-12 text-center max-w-lg mx-auto my-24 shadow-sm flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-500" size={36} />
        <p className="text-zinc-600 font-medium">Retrieving your reservation details...</p>
      </div>
    );
  }

  if (cancelState === "success") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-150 p-10 md:p-12 text-center max-w-lg mx-auto my-24 shadow-sm">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-3">Reservation Cancelled</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          Your safari reservation {bookingDetails?.bookingId && <strong className="text-zinc-800">{bookingDetails.bookingId}</strong>} has been successfully cancelled. No charges have been made. We hope to host you on another adventure soon.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  if (cancelState === "error") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-150 p-10 md:p-12 text-center max-w-lg mx-auto my-24 shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-3">Cancellation Error</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          {errorMessage || "We encountered an issue processing your cancellation request."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-zinc-950 hover:bg-zinc-900 text-white font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-150 p-10 md:p-12 text-center max-w-lg mx-auto my-24 shadow-sm">
      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-zinc-950 mb-3">Cancel Reservation?</h2>
      <p className="text-zinc-500 text-sm leading-relaxed mb-6">
        Are you sure you want to cancel your safari reservation? This action will release your reserved vehicle and tracker.
      </p>

      {bookingDetails && (
        <div className="bg-zinc-50 rounded-xl p-4 text-left text-xs mb-8 space-y-1.5 border border-zinc-200/60">
          <p className="text-zinc-400">RESERVATION SUMMARY</p>
          <div className="h-px bg-zinc-200 my-2"></div>
          <p><strong className="text-zinc-700">Booking ID:</strong> <span className="font-mono text-zinc-900 font-bold">{bookingDetails.bookingId}</span></p>
          <p><strong className="text-zinc-700">Guest:</strong> {bookingDetails.guest}</p>
          <p><strong className="text-zinc-700">Package:</strong> {bookingDetails.package}</p>
          <p><strong className="text-zinc-700">Date:</strong> {bookingDetails.date} @ {bookingDetails.time}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push("/")}
          className="border border-zinc-250 hover:border-zinc-400 text-zinc-700 font-bold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer order-2 sm:order-1"
        >
          Keep Reservation
        </button>
        <button
          onClick={handleConfirmCancellation}
          disabled={cancelState === "submitting"}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
        >
          {cancelState === "submitting" ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              Cancelling...
            </>
          ) : (
            "Yes, Cancel Reservation"
          )}
        </button>
      </div>
    </div>
  );
}

export default function CancelBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500 font-medium">Loading cancellation portal...</p>
      </div>
    }>
      <div className="min-h-screen bg-zinc-50 py-12 px-4">
        <CancelBookingContent />
      </div>
    </Suspense>
  );
}
