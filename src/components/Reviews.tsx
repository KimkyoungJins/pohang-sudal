"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

interface Review {
  id: string;
  name: string;
  country: string;
  tourSlug: string;
  rating: number;
  comment: string;
  date: string;
}

const sampleReviews: Review[] = [
  {
    id: "1",
    name: "Sarah M.",
    country: "USA",
    tourSlug: "homigot-sunrise",
    rating: 5,
    comment:
      "The sunrise at Homigot was absolutely magical. Our guide picked us up early and knew the perfect spot. The Korean breakfast afterwards was delicious. A truly unforgettable experience!",
    date: "2026-02-15",
  },
  {
    id: "2",
    name: "James K.",
    country: "UK",
    tourSlug: "seafood-market",
    rating: 5,
    comment:
      "I never would have known what to try at Jukdo Market without our guide. The gwamegi was surprisingly delicious, and the fresh sashimi was the best I've ever had. Highly recommend!",
    date: "2026-02-08",
  },
  {
    id: "3",
    name: "Emma L.",
    country: "Australia",
    tourSlug: "guryongpo-heritage",
    rating: 5,
    comment:
      "The history behind Guryongpo is fascinating. Our guide brought the stories to life and we had an amazing seafood lunch at a hidden local spot. So much better than exploring alone.",
    date: "2026-01-25",
  },
];

export default function Reviews({ tourSlug }: { tourSlug?: string }) {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", tourSlug: tourSlug || "" });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load reviews from Firebase
    const loadReviews = async () => {
      try {
        const { db } = await import("@/lib/firebase");
        const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseReviews = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Review[];
          setReviews([...firebaseReviews, ...sampleReviews]);
        }
      } catch {
        // Use sample reviews
      }
    };
    loadReviews();
  }, []);

  const handleSubmitReview = async () => {
    if (!user || !newReview.comment.trim()) return;
    setSubmitting(true);

    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "reviews"), {
        name: user.displayName || "Anonymous",
        country: "",
        tourSlug: newReview.tourSlug,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        createdAt: serverTimestamp(),
      });
    } catch {
      // Silent fail
    }

    setReviews((prev) => [
      {
        id: Date.now().toString(),
        name: user.displayName || "Anonymous",
        country: "",
        tourSlug: newReview.tourSlug,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setNewReview({ rating: 5, comment: "", tourSlug: tourSlug || "" });
    setShowForm(false);
    setSubmitting(false);
  };

  const filtered = tourSlug
    ? reviews.filter((r) => r.tourSlug === tourSlug)
    : reviews;

  const avgRating =
    filtered.length > 0
      ? (filtered.reduce((sum, r) => sum + r.rating, 0) / filtered.length).toFixed(1)
      : "5.0";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-dark">{avgRating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-lg text-yellow-400">★</span>
              ))}
            </div>
            <span className="text-gray-400 text-sm">({filtered.length} reviews)</span>
          </div>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm bg-sky-pale text-sky px-4 py-2 rounded-full font-medium hover:bg-sky hover:text-white transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review form */}
      {showForm && user && (
        <div className="bg-sky-pale/30 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewReview((p) => ({ ...p, rating: star }))}
                  className={`text-2xl ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
            placeholder="Share your experience..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky focus:border-transparent outline-none mb-3"
          />
          <button
            onClick={handleSubmitReview}
            disabled={submitting || !newReview.comment.trim()}
            className="bg-gradient-to-r from-sky to-pink text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {filtered.slice(0, 6).map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky to-pink flex items-center justify-center text-white font-medium">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-medium text-dark text-sm">{review.name}</p>
                  {review.country && (
                    <p className="text-gray-400 text-xs">{review.country}</p>
                  )}
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            <p className="text-gray-300 text-xs mt-2">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
