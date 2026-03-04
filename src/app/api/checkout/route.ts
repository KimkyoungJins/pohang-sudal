import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export async function POST(req: NextRequest) {
  const { tourSlug, tourTitle, price, quantity, customerEmail, couponCode } =
    await req.json();

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Please contact us to book." },
      { status: 400 }
    );
  }

  let finalPrice = price;
  if (couponCode) {
    const result = validateCoupon(couponCode, price);
    if (result.valid && result.discount) {
      finalPrice = Math.max(0, price - result.discount);
    }
  }

  try {
    const stripe = (await import("stripe")).default;
    const stripeClient = new stripe(secretKey);

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tourTitle,
              description: `Pohang Sudal - ${tourTitle}`,
            },
            unit_amount: Math.round(finalPrice * 100),
          },
          quantity: quantity || 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${req.nextUrl.origin}/booking?success=true&tour=${tourSlug}`,
      cancel_url: `${req.nextUrl.origin}/booking?canceled=true&tour=${tourSlug}`,
      metadata: {
        tourSlug,
        tourTitle,
        ...(couponCode ? { couponCode } : {}),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { error: err.message || "Payment failed" },
      { status: 500 }
    );
  }
}
