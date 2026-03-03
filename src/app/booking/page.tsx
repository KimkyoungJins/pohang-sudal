import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tour - Pohang Sudal",
  description:
    "Book your Pohang tour with a certified local guide. Choose from sunrise tours, seafood markets, heritage walks, hiking, and more. Easy booking, no upfront payment.",
};

export default function BookingPage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Book a Tour
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Fill out the form below and we&apos;ll confirm your tour within 24
            hours. No upfront payment required.
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
