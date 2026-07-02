"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingHero from "@/components/booking/BookingHero";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingForm from "@/components/booking/BookingForm";
import LiveAvailability from "@/components/booking/LiveAvailability";
import BookingSummary from "@/components/booking/BookingSummary";

// Package definition type
interface SafariPackage {
  id: string;
  name: string;
  price: number;
}

const FALLBACK_PACKAGES: SafariPackage[] = [
  { id: "leopard-tracker-elite", name: "Leopard Tracker Elite", price: 450.00 },
  { id: "gentle-giants-expedition", name: "Gentle Giants Expedition", price: 680.00 },
  { id: "block-5-wilderness", name: "Block 5 Hidden Wilderness", price: 75.00 }
];

function BookingContent() {
  const searchParams = useSearchParams();
  const pkgQueryParam = searchParams.get("package");

  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packages, setPackages] = useState<SafariPackage[]>(FALLBACK_PACKAGES);
  const [selectedPackageId, setSelectedPackageId] = useState("leopard-tracker-elite");
  const [date, setDate] = useState("2024-10-24");
  const [timeSlot, setTimeSlot] = useState("Morning (05:30 AM - 10:00 AM)");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("06:30");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Load packages from backend on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/packages`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const dbData = await res.json();
          if (Array.isArray(dbData) && dbData.length > 0) {
            const formatted = dbData.map((pkg: any) => ({
              id: pkg.id,
              name: pkg.name,
              price: Number(pkg.price)
            }));
            setPackages(formatted);
            // Default select the first package if no query param is there yet
            if (!pkgQueryParam) {
              setSelectedPackageId(formatted[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch backend packages, using fallback data", err);
      }
    };
    fetchPackages();
  }, [pkgQueryParam]);

  // Handle URL query parameter pre-selection
  useEffect(() => {
    if (pkgQueryParam && packages.length > 0) {
      let mappedId = pkgQueryParam;
      // Handle legacy mappings
      if (pkgQueryParam === "dawn-predator") mappedId = "leopard-tracker-elite";
      if (pkgQueryParam === "elephant-corridor") mappedId = "gentle-giants-expedition";
      if (pkgQueryParam === "night-ranger") mappedId = "block-5-wilderness";

      const exists = packages.some(p => p.id === mappedId);
      if (exists) {
        setSelectedPackageId(mappedId);
      }
    }
  }, [pkgQueryParam, packages]);

  // Derive package info
  const currentPackage = packages.find(p => p.id === selectedPackageId) || packages[0] || FALLBACK_PACKAGES[0];
  
  // Calculate price components
  const basePrice = currentPackage.price;
  const guestCount = adults + childrenCount;
  const conservationFeeRate = 25.00; // $25 per guest
  const conservationFees = guestCount * conservationFeeRate;
  
  const subtotal = basePrice + conservationFees;
  const taxRate = 0.10; // 10% Taxes & Service Charge
  const taxesAndService = subtotal * taxRate;
  const totalAmount = subtotal + taxesAndService;

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill out all required traveler details (Name, Email, Phone).");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          packageId: selectedPackageId,
          date,
          timeSlot,
          selectedSlot,
          adults,
          childrenCount,
          specialRequests
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to submit reservation.");
      }

      setCreatedBooking(resData.data);
      setIsSubmitted(true);
    } catch (err: any) {
      alert(err.message || "An error occurred while confirming your reservation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Main Content */}
      <main className="flex-grow pb-24">
        {/* Hero Section */}
        <BookingHero />

        {/* Dynamic Forms Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
          {isSubmitted ? (
            <BookingConfirmation
              bookingId={createdBooking?.bookingId}
              fullName={createdBooking?.guest || fullName}
              email={createdBooking?.email || email}
              packageName={createdBooking?.package || currentPackage.name}
              date={createdBooking?.date || date}
              selectedSlot={createdBooking?.time || selectedSlot}
              adults={createdBooking?.adults || adults}
              childrenCount={createdBooking?.childrenCount || childrenCount}
              totalAmount={createdBooking?.priceNumeric || totalAmount}
              formatDate={formatDate}
              onReset={() => {
                setIsSubmitted(false);
                setCreatedBooking(null);
                setFullName("");
                setEmail("");
                setPhone("");
                setSpecialRequests("");
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Traveler Details Form */}
              <div className="lg:col-span-7">
                <BookingForm
                  fullName={fullName}
                  setFullName={setFullName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  selectedPackageId={selectedPackageId}
                  setSelectedPackageId={setSelectedPackageId}
                  packages={packages}
                  date={date}
                  setDate={setDate}
                  timeSlot={timeSlot}
                  setTimeSlot={setTimeSlot}
                  adults={adults}
                  setAdults={setAdults}
                  childrenCount={childrenCount}
                  setChildrenCount={setChildrenCount}
                  specialRequests={specialRequests}
                  setSpecialRequests={setSpecialRequests}
                  onSubmit={handleConfirmReservation}
                />
              </div>

              {/* Right Column: Live Slots + Pricing Summary */}
              <div className="lg:col-span-5 space-y-6">
                {/* Live Availability Card */}
                <LiveAvailability
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                />

                {/* Summary Card */}
                <BookingSummary
                  packageName={currentPackage.name}
                  date={date}
                  selectedSlot={selectedSlot}
                  adults={adults}
                  childrenCount={childrenCount}
                  basePrice={basePrice}
                  conservationFees={conservationFees}
                  taxesAndService={taxesAndService}
                  totalAmount={totalAmount}
                  formatDate={formatDate}
                  onSubmit={handleConfirmReservation}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500 font-medium">Loading booking portal...</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
