"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Clock, AlertTriangle } from "lucide-react";

function ConfirmSlotContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const waitingListId = searchParams.get("id");

  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmState, setConfirmState] = useState<
    "idle" | "submitting" | "success" | "error" | "already_confirmed" | "expired"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Fetch waiting list entry details on mount
  useEffect(() => {
    if (!waitingListId) {
      setConfirmState("error");
      setErrorMessage("Missing waiting list ID in URL.");
      setLoading(false);
      return;
    }

    const fetchEntry = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/waiting-list/${waitingListId}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Unable to retrieve your waiting list details.");
        }
        const data = await res.json();
        setEntry(data);

        // Pre-check status
        if (data.status === "confirmed") {
          setConfirmState("already_confirmed");
        } else if (data.status === "expired") {
          setConfirmState("expired");
        }
      } catch (err: any) {
        console.error(err);
        setConfirmState("error");
        setErrorMessage(err.message || "Failed to load waiting list details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [waitingListId]);

  const handleConfirm = async () => {
    setConfirmState("submitting");
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/waiting-list/${waitingListId}/confirm`;
      const res = await fetch(apiUrl, { method: "PATCH" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setConfirmState("expired");
          setErrorMessage(data.message || "This slot was taken by someone else.");
          return;
        }
        if (res.status === 410) {
          setConfirmState("expired");
          setErrorMessage(data.message || "This offer has expired.");
          return;
        }
        throw new Error(data.message || "Failed to confirm slot.");
      }

      setConfirmedBooking(data.data);
      setConfirmState("success");
    } catch (err: any) {
      console.error(err);
      setConfirmState("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-lg mx-auto shadow-sm flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-500" size={36} />
        <p className="text-zinc-600 font-medium">Loading your slot details...</p>
      </div>
    );
  }

  if (confirmState === "success") {
    return (
      <div className="bg-white rounded-2xl border border-green-200 shadow-sm overflow-hidden max-w-lg mx-auto">
        <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500" />
        <div className="p-10 md:p-12 text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-950 mb-3">Slot Confirmed! 🎉</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">
            Congratulations! Your safari slot has been successfully confirmed. A booking confirmation email has been sent to{" "}
            <strong className="text-zinc-700">{entry?.email}</strong>.
          </p>

          {confirmedBooking && (
            <div className="bg-zinc-50 rounded-xl p-4 text-left text-xs mb-8 space-y-2 border border-zinc-200/60">
              <p className="text-zinc-400 uppercase tracking-wider font-semibold text-[10px]">Your Booking</p>
              <div className="h-px bg-zinc-200 my-1" />
              <p>
                <strong className="text-zinc-600">Booking ID:</strong>{" "}
                <span className="font-mono text-zinc-900 font-bold">{confirmedBooking.bookingId}</span>
              </p>
              <p><strong className="text-zinc-600">Package:</strong> <span className="text-zinc-900">{confirmedBooking.package}</span></p>
              <p><strong className="text-zinc-600">Date &amp; Time:</strong> <span className="text-zinc-900">{confirmedBooking.date} @ {confirmedBooking.time}</span></p>
              <p><strong className="text-zinc-600">Guests:</strong> <span className="text-zinc-900">{confirmedBooking.guests}</span></p>
            </div>
          )}

          <button
            onClick={() => router.push("/")}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (confirmState === "already_confirmed") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-10 md:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-3">Already Confirmed</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          This slot has already been confirmed. Please check your email for your booking confirmation details.
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

  if (confirmState === "expired") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-10 md:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-3">Slot No Longer Available</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          {errorMessage || "Unfortunately this slot was claimed by someone else before you could confirm. We're sorry for the inconvenience!"}
        </p>
        <button
          onClick={() => router.push("/booking")}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
        >
          Browse Other Dates
        </button>
      </div>
    );
  }

  if (confirmState === "error") {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200 p-10 md:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-3">Something Went Wrong</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          {errorMessage || "We encountered an issue processing your request."}
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

  // Default: idle / ready to confirm
  return (
    <div className="bg-white rounded-2xl border border-green-200 shadow-sm overflow-hidden max-w-lg mx-auto">
      <div className="h-1.5 bg-gradient-to-r from-green-400 to-emerald-500" />
      <div className="p-10 md:p-12 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          🎉
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 mb-2">Your Slot is Available!</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
          Great news, <strong className="text-zinc-700">{entry?.guest}</strong>! A cancellation has freed up the slot you were waiting for. Confirm now to claim it before someone else does.
        </p>

        {/* Slot details */}
        {entry && (
          <div className="bg-zinc-50 rounded-xl p-4 text-left text-xs mb-8 space-y-2 border border-zinc-200/60">
            <p className="text-zinc-400 uppercase tracking-wider font-semibold text-[10px]">Slot Details</p>
            <div className="h-px bg-zinc-200 my-1" />
            <p><strong className="text-zinc-600">Package:</strong> <span className="text-zinc-900">{entry.package}</span></p>
            <p><strong className="text-zinc-600">Date &amp; Time:</strong> <span className="text-zinc-900">{entry.date} @ {entry.time}</span></p>
            <p><strong className="text-zinc-600">Guests:</strong> <span className="text-zinc-900">{entry.guests}</span></p>
            <p><strong className="text-zinc-600">Price:</strong> <span className="text-zinc-900 font-bold">{entry.price}</span></p>
          </div>
        )}

        {/* Urgency notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 flex items-start gap-2 text-left">
          <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            <strong>Act quickly!</strong> This slot is offered first-come, first-served to waiting list members. It won&apos;t be held indefinitely.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="border border-zinc-300 hover:border-zinc-400 text-zinc-700 font-bold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            Not Interested
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirmState === "submitting"}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {confirmState === "submitting" ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Confirming...
              </>
            ) : (
              "✓ Confirm My Slot"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmSlotPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <p className="text-zinc-500 font-medium">Loading slot details...</p>
        </div>
      }
    >
      <div className="min-h-screen bg-zinc-50 py-12 px-4">
        <ConfirmSlotContent />
      </div>
    </Suspense>
  );
}
