"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      await addDoc(collection(db, "newsletter"), {
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
    } catch {
      // Silent fail — still show success
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-pink-light text-sm">
          Thanks for subscribing! We&apos;ll keep you updated.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-pink-light"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-sky to-pink text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
