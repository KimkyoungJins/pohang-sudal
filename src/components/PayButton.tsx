"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { validateCoupon } from "@/lib/coupons";

export default function PayButton({
  tourSlug,
  tourTitle,
  price,
}: {
  tourSlug: string;
  tourTitle: string;
  price: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const { user } = useAuth();

  const finalPrice = Math.max(0, price - couponDiscount);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const result = validateCoupon(couponCode, price);
    if (result.valid && result.discount) {
      setCouponDiscount(result.discount);
      setCouponMsg(`${result.coupon!.description}`);
    } else {
      setCouponDiscount(0);
      setCouponMsg(result.error || "Invalid coupon");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourSlug,
          tourTitle,
          price: finalPrice,
          quantity: 1,
          customerEmail: user?.email || "",
          couponCode: couponDiscount > 0 ? couponCode : undefined,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Payment is not available at the moment. Please use the booking form instead.");
      }
    } catch {
      setError("Something went wrong. Please try the booking form instead.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky focus:border-transparent outline-none uppercase"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="text-sky text-sm font-medium hover:text-pink transition-colors px-2"
        >
          Apply
        </button>
      </div>
      {couponMsg && (
        <p className={`text-xs mb-2 ${couponDiscount > 0 ? "text-green-600" : "text-coral"}`}>
          {couponMsg}
        </p>
      )}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="block w-full border-2 border-sky text-sky text-center py-3 rounded-full font-semibold hover:bg-sky hover:text-white transition-all disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : couponDiscount > 0
          ? `Pay Now — $${finalPrice} (was $${price})`
          : `Pay Now — $${price}`}
      </button>
      {error && (
        <p className="text-coral text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
