"use client";

import { useState } from "react";
import Link from "next/link";
import { tours } from "@/lib/tours";

interface SurveyData {
  interests: string[];
  duration: string;
  budget: string;
  groupSize: string;
  fitnessLevel: string;
  travelDates: string;
  email: string;
  name: string;
  specialRequests: string;
}

const initialData: SurveyData = {
  interests: [],
  duration: "",
  budget: "",
  groupSize: "",
  fitnessLevel: "",
  travelDates: "",
  email: "",
  name: "",
  specialRequests: "",
};

export default function SurveyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const getRecommendations = (): string[] => {
    const scores: Record<string, number> = {};
    tours.forEach((t) => (scores[t.slug] = 0));

    if (data.interests.includes("sunrise")) scores["homigot-sunrise"] += 3;
    if (data.interests.includes("food")) scores["seafood-market"] += 3;
    if (data.interests.includes("history")) scores["guryongpo-heritage"] += 3;
    if (data.interests.includes("nature")) scores["temple-waterfall-hiking"] += 3;
    if (data.interests.includes("city")) scores["steel-city-ocean-view"] += 3;
    if (data.interests.includes("photography")) {
      scores["homigot-sunrise"] += 2;
      scores["steel-city-ocean-view"] += 1;
    }

    if (data.fitnessLevel === "low") {
      scores["temple-waterfall-hiking"] -= 2;
      scores["seafood-market"] += 1;
    }
    if (data.fitnessLevel === "high") {
      scores["temple-waterfall-hiking"] += 2;
    }

    if (data.duration === "half-day") {
      scores["seafood-market"] += 1;
      scores["homigot-sunrise"] += 1;
      scores["steel-city-ocean-view"] += 1;
    }
    if (data.duration === "full-day") {
      scores["guryongpo-heritage"] += 1;
      scores["temple-waterfall-hiking"] += 1;
    }

    if (data.budget === "budget") {
      scores["seafood-market"] += 1;
      scores["steel-city-ocean-view"] += 1;
    }
    if (data.budget === "premium") {
      scores["guryongpo-heritage"] += 1;
      scores["temple-waterfall-hiking"] += 1;
    }

    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .filter(([, score]) => score > 0)
      .slice(0, 3)
      .map(([slug]) => slug);

    return sorted.length > 0 ? sorted : ["homigot-sunrise", "seafood-market"];
  };

  const handleSubmit = async () => {
    setLoading(true);
    const recs = getRecommendations();
    setRecommended(recs);

    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      await addDoc(collection(db, "surveys"), {
        ...data,
        recommendations: recs,
        createdAt: serverTimestamp(),
      });
    } catch {
      // Firebase not configured yet — still show recommendations
    }

    setSubmitted(true);
    setLoading(false);
  };

  const steps = [
    // Step 0: Interests
    <div key="interests">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        What interests you most?
      </h2>
      <p className="text-gray-500 mb-6">Select all that apply</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { id: "sunrise", label: "🌅 Sunrise & Scenery" },
          { id: "food", label: "🦐 Food & Markets" },
          { id: "history", label: "🏘️ History & Culture" },
          { id: "nature", label: "⛰️ Nature & Hiking" },
          { id: "city", label: "🏙️ City & Modern" },
          { id: "photography", label: "📸 Photography" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => toggleInterest(item.id)}
            className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.interests.includes(item.id)
                ? "border-teal-500 bg-teal-50 text-teal-700"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>,

    // Step 1: Duration & Budget
    <div key="logistics">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tour preferences
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred tour length
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "half-day", label: "Half Day (3-4h)" },
              { id: "full-day", label: "Full Day (5-7h)" },
              { id: "flexible", label: "Flexible" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setData((p) => ({ ...p, duration: item.id }))}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.duration === item.id
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget range (per person)
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "budget", label: "Under $80" },
              { id: "mid", label: "$80 - $120" },
              { id: "premium", label: "$120+" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setData((p) => ({ ...p, budget: item.id }))}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.budget === item.id
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // Step 2: Group & Fitness
    <div key="group">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        About your group
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "solo", label: "Solo / Couple" },
              { id: "small", label: "3-5 people" },
              { id: "large", label: "6+ people" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setData((p) => ({ ...p, groupSize: item.id }))}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.groupSize === item.id
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fitness level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "low", label: "Relaxed / Easy" },
              { id: "moderate", label: "Moderate" },
              { id: "high", label: "Active / Fit" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setData((p) => ({ ...p, fitnessLevel: item.id }))
                }
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.fitnessLevel === item.id
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // Step 3: Contact Info
    <div key="contact">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Almost done!
      </h2>
      <p className="text-gray-500 mb-6">
        Leave your contact info and we&apos;ll send you personalized
        recommendations.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travel dates (approximate)
          </label>
          <input
            type="text"
            value={data.travelDates}
            onChange={(e) =>
              setData((p) => ({ ...p, travelDates: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="e.g., March 15-20, 2026"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special requests or questions (optional)
          </label>
          <textarea
            value={data.specialRequests}
            onChange={(e) =>
              setData((p) => ({ ...p, specialRequests: e.target.value }))
            }
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="Any dietary needs, accessibility requirements, or questions?"
          />
        </div>
      </div>
    </div>,
  ];

  if (submitted) {
    const recTours = tours.filter((t) => recommended.includes(t.slug));
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Here are your recommended tours!
        </h2>
        <p className="text-gray-500 mb-8">
          Based on your preferences, we think you&apos;ll love these:
        </p>
        <div className="space-y-4">
          {recTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {tour.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{tour.subtitle}</p>
                  <p className="text-teal-600 font-semibold mt-1">
                    From ${tour.price} · {tour.duration.split("(")[0].trim()}
                  </p>
                </div>
                <span className="text-teal-600 text-2xl">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 space-y-3">
          <Link
            href="/booking"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            Book a Tour Now
          </Link>
          <p className="text-gray-400 text-sm">
            We&apos;ll also email you these recommendations if you provided your
            email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-teal-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
        {steps[step]}

        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Getting your results..." : "Get My Recommendations"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
