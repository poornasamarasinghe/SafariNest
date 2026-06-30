"use client";

import { useState } from "react";
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

const PACKAGES: SafariPackage[] = [
  { id: "dawn-predator", name: "HALF DAY", price: 120.00 },
  { id: "elephant-corridor", name: "FULL DAY", price: 180.00 }
];

export default function BookingPage() {
  // Booking Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("dawn-predator");
  const [date, setDate] = useState("2024-10-24");
  const [timeSlot, setTimeSlot] = useState("Morning (05:30 AM - 10:00 AM)");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("06:30");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derive package info
  const currentPackage = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[0];
  
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

  const handleConfirmReservation = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill out all required traveler details (Name, Email, Phone).");
      return;
    }
    setIsSubmitted(true);
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
              fullName={fullName}
              email={email}
              packageName={currentPackage.name}
              date={date}
              selectedSlot={selectedSlot}
              adults={adults}
              childrenCount={childrenCount}
              totalAmount={totalAmount}
              formatDate={formatDate}
              onReset={() => setIsSubmitted(false)}
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
                  packages={PACKAGES}
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
