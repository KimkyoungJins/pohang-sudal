"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { tours } from "@/lib/tours";
import { validateCoupon } from "@/lib/coupons";
import { useAuth } from "@/components/AuthProvider";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  tourSlug: string;
  date: string;
  groupSize: string;
  message: string;
  nationality: string;
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedTour = searchParams.get("tour") || "";
  const { user } = useAuth();

  const [data, setData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    tourSlug: preselectedTour,
    date: "",
    groupSize: "",
    message: "",
    nationality: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        name: prev.name || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      await addDoc(collection(db, "bookings"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "new",
      });
    } catch {
      // Firebase not configured yet
    }

    // Send email notification
    const tourTitle =
      tours.find((t) => t.slug === data.tourSlug)?.title || data.tourSlug;
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          data: { ...data, tourTitle },
        }),
      });
    } catch {
      // Email send failed silently — booking is still saved
    }

    setSubmitted(true);
    setLoading(false);
  };

  const update = (field: keyof BookingData, value: string) =>
    setData((p) => ({ ...p, [field]: value }));

  const selectedTour = tours.find((t) => t.slug === data.tourSlug);
  const tourPrice = selectedTour?.price || 0;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const groupNum = parseInt(data.groupSize) || 1;
    const result = validateCoupon(couponCode, tourPrice, groupNum);
    if (result.valid && result.discount) {
      setCouponDiscount(result.discount);
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponMessage(`${result.coupon!.description} (-$${result.discount})`);
    } else {
      setCouponDiscount(0);
      setAppliedCoupon("");
      setCouponMessage(result.error || "Invalid coupon");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-md p-8">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-serif text-2xl text-dark mb-2">
          Booking Request Received!
        </h2>
        <p className="text-gray-500 mb-2">
          Thank you, {data.name}! We&apos;ll get back to you within 24 hours
          to confirm your tour.
        </p>
        <p className="text-gray-400 text-sm">
          Check your email ({data.email}) for a confirmation message.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8"
    >
      <h2 className="font-serif text-2xl text-dark mb-6">
        Book Your Pohang Adventure
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
            placeholder="John Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
            placeholder="+1 234 567 8900"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <input
            type="text"
            value={data.nationality}
            onChange={(e) => update("nationality", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
            placeholder="e.g., American, British"
          />
        </div>

        {/* Tour Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Tour *
          </label>
          <select
            required
            value={data.tourSlug}
            onChange={(e) => update("tourSlug", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none bg-white"
          >
            <option value="">Choose a tour...</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title} (${tour.price}/person)
              </option>
            ))}
            <option value="custom">Custom Tour (contact us)</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            required
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
          />
        </div>

        {/* Group Size */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of People *
          </label>
          <select
            required
            value={data.groupSize}
            onChange={(e) => update("groupSize", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none bg-white"
          >
            <option value="">Select group size...</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6+">6+ people</option>
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Message
          </label>
          <textarea
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none"
            placeholder="Any special requests, dietary needs, or questions?"
          />
        </div>
      </div>

      {/* Coupon Code */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none uppercase"
            placeholder="Enter coupon code"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-sky text-white px-5 py-3 rounded-xl font-medium hover:bg-sky/90 transition-colors text-sm"
          >
            Apply
          </button>
        </div>
        {couponMessage && (
          <p
            className={`text-xs mt-1 ${
              appliedCoupon ? "text-green-600" : "text-coral"
            }`}
          >
            {couponMessage}
          </p>
        )}
        {appliedCoupon && tourPrice > 0 && (
          <div className="mt-2 bg-green-50 rounded-lg p-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Original price:</span>
              <span>${tourPrice}/person</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount ({appliedCoupon}):</span>
              <span>-${couponDiscount}</span>
            </div>
            <div className="flex justify-between text-dark font-bold border-t border-green-200 mt-1 pt-1">
              <span>Final price:</span>
              <span>${(tourPrice - couponDiscount).toFixed(2)}/person</span>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-gradient-to-r from-sky to-pink text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Booking Request"}
      </button>

      <p className="text-gray-400 text-xs text-center mt-3">
        No payment required now. We&apos;ll confirm availability and send you
        payment details via email.
      </p>
    </form>
  );
}
