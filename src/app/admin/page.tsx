"use client";

import { useEffect, useState, useMemo } from "react";
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

  // Date filter state
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

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

  const getTourPrice = (slug: string) =>
    tours.find((t) => t.slug === slug)?.price || 0;

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "\u2014";
    return ts.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- Stats computations ---
  const stats = useMemo(() => {
    const totalBookings = bookings.length;

    const estimatedRevenue = bookings.reduce((sum, b) => {
      const price = getTourPrice(b.tourSlug);
      const size = parseInt(b.groupSize, 10) || 1;
      return sum + price * size;
    }, 0);

    // Count bookings per tour
    const tourCounts: Record<string, number> = {};
    bookings.forEach((b) => {
      tourCounts[b.tourSlug] = (tourCounts[b.tourSlug] || 0) + 1;
    });

    let mostPopularTour = "\u2014";
    let maxCount = 0;
    Object.entries(tourCounts).forEach(([slug, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostPopularTour = getTourTitle(slug);
      }
    });

    // New this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = bookings.filter((b) => {
      if (!b.createdAt) return false;
      return b.createdAt.toDate() >= oneWeekAgo;
    }).length;

    return { totalBookings, estimatedRevenue, mostPopularTour, newThisWeek, tourCounts };
  }, [bookings]);

  // --- Bar chart data ---
  const chartData = useMemo(() => {
    const maxCount = Math.max(...Object.values(stats.tourCounts), 1);
    return tours
      .map((t) => ({
        slug: t.slug,
        title: t.title,
        count: stats.tourCounts[t.slug] || 0,
        pct: ((stats.tourCounts[t.slug] || 0) / maxCount) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, [stats.tourCounts]);

  const BAR_COLORS = [
    "bg-teal-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-cyan-500",
  ];

  // --- Date-filtered bookings ---
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (!filterFrom && !filterTo) return true;
      if (!b.createdAt) return false;
      const d = b.createdAt.toDate();
      if (filterFrom) {
        const from = new Date(filterFrom);
        from.setHours(0, 0, 0, 0);
        if (d < from) return false;
      }
      if (filterTo) {
        const to = new Date(filterTo);
        to.setHours(23, 59, 59, 999);
        if (d > to) return false;
      }
      return true;
    });
  }, [bookings, filterFrom, filterTo]);

  // --- CSV Export ---
  const exportCSV = () => {
    const header = ["Name", "Email", "Phone", "Tour", "Date", "Group Size", "Status", "Submitted"];
    const rows = bookings.map((b) => [
      b.name,
      b.email,
      b.phone,
      getTourTitle(b.tourSlug),
      b.date,
      b.groupSize,
      b.status,
      b.createdAt ? b.createdAt.toDate().toISOString() : "",
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Bookings */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stats.totalBookings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Estimated Revenue */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Revenue</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    ${stats.estimatedRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Most Popular Tour */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Most Popular Tour</p>
                  <p className="mt-1 text-lg font-bold text-gray-900 leading-tight">
                    {stats.mostPopularTour}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* New This Week */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">New This Week</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {stats.newThisWeek}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings by Tour Bar Chart */}
        {!loading && bookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Bookings by Tour
            </h2>
            <div className="space-y-3">
              {chartData.map((item, idx) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <div className="w-48 text-sm text-gray-700 truncate flex-shrink-0" title={item.title}>
                    {item.title}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-6 rounded-full ${BAR_COLORS[idx % BAR_COLORS.length]} transition-all duration-500`}
                      style={{ width: `${item.count > 0 ? Math.max(item.pct, 4) : 0}%` }}
                    />
                  </div>
                  <div className="w-8 text-sm font-semibold text-gray-700 text-right flex-shrink-0">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs + CSV Export */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 max-w-xs">
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
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export CSV
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading data...</div>
        ) : tab === "bookings" ? (
          /* Bookings Table */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Date Filter Row */}
            <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3 bg-gray-50">
              <span className="text-sm font-medium text-gray-600">Filter by date:</span>
              <input
                type="date"
                value={filterFrom}
                onChange={(e) => setFilterFrom(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-400">to</span>
              <input
                type="date"
                value={filterTo}
                onChange={(e) => setFilterTo(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {(filterFrom || filterTo) && (
                <button
                  onClick={() => {
                    setFilterFrom("");
                    setFilterTo("");
                  }}
                  className="px-3 py-1.5 bg-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              )}
              {(filterFrom || filterTo) && (
                <span className="text-xs text-gray-400 ml-auto">
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </span>
              )}
            </div>

            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-2">📭</div>
                {bookings.length === 0
                  ? "No bookings yet"
                  : "No bookings match the selected date range"}
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
                    {filteredBookings.map((booking) => (
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
                          {survey.name || "\u2014"}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {survey.email || "\u2014"}
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
                          {survey.travelDates || "\u2014"}
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
