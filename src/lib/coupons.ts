export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  description: string;
  minPurchase?: number;
  expiresAt?: string;
  maxUses?: number;
}

export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    description: "10% off your first tour",
    minPurchase: 0,
  },
  {
    code: "SPRING2026",
    type: "fixed",
    value: 15,
    description: "$15 off any tour",
    minPurchase: 50,
    expiresAt: "2026-05-31",
  },
  {
    code: "GROUP20",
    type: "percent",
    value: 20,
    description: "20% off for groups of 4+",
    minPurchase: 0,
  },
];

export interface CouponResult {
  valid: boolean;
  coupon?: Coupon;
  discount?: number;
  error?: string;
}

export function validateCoupon(
  code: string,
  price: number,
  groupSize?: number
): CouponResult {
  const coupon = coupons.find(
    (c) => c.code.toUpperCase() === code.toUpperCase()
  );

  if (!coupon) {
    return { valid: false, error: "Invalid coupon code" };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, error: "This coupon has expired" };
  }

  if (coupon.minPurchase && price < coupon.minPurchase) {
    return {
      valid: false,
      error: `Minimum purchase of $${coupon.minPurchase} required`,
    };
  }

  if (coupon.code === "GROUP20" && groupSize && groupSize < 4) {
    return {
      valid: false,
      error: "This coupon requires a group of 4 or more",
    };
  }

  let discount: number;
  if (coupon.type === "percent") {
    discount = Math.round((price * coupon.value) / 100 * 100) / 100;
  } else {
    discount = Math.min(coupon.value, price);
  }

  return { valid: true, coupon, discount };
}
