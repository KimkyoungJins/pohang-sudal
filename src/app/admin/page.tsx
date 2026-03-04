"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { tours } from "@/lib/tours";

const ADMIN_EMAIL = "kkjin722@gmail.com";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  tourSlug: string;
  date: string;
  groupSize: string;
  message: string;
  nationality: string;
  status: string;
  createdAt: Timestamp | null;
}

interface Survey {
  id: string;
  name: string;
  email: string;
  interests: string[];
  duration: string;
  budget: string;
  groupSize: string;
  fitnessLevel: string;
  travelDates: string;
  recommendations: string[];
  specialRequests: string;
  createdAt: Timestamp | null;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"bookings" | "surveys">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const bookingsQuery = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc")
        );
        const bookingsSnap = await getDocs(bookingsQuery);
        setBookings(
          bookingsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking))
        );

        const surveysQuery = query(
          collection(db, "surveys"),
          orderBy("createdAt", "desc")
        );
        const surveysSnap = await getDocs(surveysQuery);
        setSurveys(
          surveysSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Survey))
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [isAdmin]);

  const updateBookingStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "bookings", id), { status });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const getTourTitle = (slug: string) =>
    tours.find((t) => t.slug === slug)?.title || slug;

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "—";
    return ts.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Access Only
          </h1>
          <p className="text-gray-500">
            {user
              ? "You do not have admin access."
              : "Please sign in with an admin account."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage bookings and survey responses
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {bookings.filter((b) => b.status === "new").length} new bookings
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {surveys.length} surveys
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-6 max-w-xs">
          <button
            onClick={() => setTab("bookings")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              tab === "bookings"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setTab("surveys")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              tab === "surveys"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Surveys
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading data...</div>
        ) : tab === "bookings" ? (
          /* Bookings Table */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {bookings.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-2">📭</div>
                No bookings yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Tour</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Group</th>
                      <th className="px-4 py-3 font-medium">Submitted</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "new"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">
                            {booking.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {booking.email}
                          </div>
                          {booking.phone && (
                            <div className="text-gray-400 text-xs">
                              {booking.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {getTourTitle(booking.tourSlug)}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {booking.date}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {booking.groupSize} pax
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {formatDate(booking.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1">
                            {booking.status !== "confirmed" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "confirmed")
                                }
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "cancelled")
                                }
                                className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Surveys Table */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {surveys.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-2">📭</div>
                No surveys yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Interests</th>
                      <th className="px-4 py-3 font-medium">Travel Dates</th>
                      <th className="px-4 py-3 font-medium">Recommended</th>
                      <th className="px-4 py-3 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {surveys.map((survey) => (
                      <tr key={survey.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {survey.name || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {survey.email || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {(survey.interests || []).map((i) => (
                              <span
                                key={i}
                                className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-xs"
                              >
                                {i}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {survey.travelDates || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {(survey.recommendations || []).map((r) => (
                              <span
                                key={r}
                                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
                              >
                                {getTourTitle(r)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {formatDate(survey.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
