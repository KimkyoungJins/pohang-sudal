"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { tours } from "@/lib/tours";
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

    setSubmitted(true);
    setLoading(false);
  };

  const update = (field: keyof BookingData, value: string) =>
    setData((p) => ({ ...p, [field]: value }));

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-md p-8">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="Any special requests, dietary needs, or questions?"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
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
