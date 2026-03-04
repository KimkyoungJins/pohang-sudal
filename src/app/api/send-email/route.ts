import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kkjin722@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("RESEND_API_KEY not set — skipping email");
      return NextResponse.json({ success: true, skipped: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { type, data } = body;

    if (type === "booking") {
      // Email to admin
      await resend.emails.send({
        from: "Pohang Sudal <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `New Booking: ${data.name} - ${data.tourTitle}`,
        html: `
          <h2>New Booking Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nationality</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.nationality || "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Tour</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.tourTitle}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.date}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Group Size</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.groupSize}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${data.message || "—"}</td></tr>
          </table>
          <p style="margin-top:20px;"><a href="https://pohang-sudal.vercel.app/admin" style="background:#0d9488;color:white;padding:10px 20px;border-radius:20px;text-decoration:none;">View in Dashboard</a></p>
        `,
      });

      // Confirmation email to customer
      await resend.emails.send({
        from: "Pohang Sudal <onboarding@resend.dev>",
        to: data.email,
        subject: "Booking Received - Pohang Sudal",
        html: `
          <div style="max-width:500px;font-family:Arial,sans-serif;">
            <h2 style="color:#0d9488;">Thank you, ${data.name}! 🦦</h2>
            <p>We've received your booking request for <strong>${data.tourTitle}</strong> on <strong>${data.date}</strong>.</p>
            <p>We'll review your request and get back to you within <strong>24 hours</strong> to confirm availability and next steps.</p>
            <h3>Your Booking Details:</h3>
            <ul>
              <li>Tour: ${data.tourTitle}</li>
              <li>Date: ${data.date}</li>
              <li>Group Size: ${data.groupSize} people</li>
            </ul>
            <p>If you have any questions, reply to this email or contact us directly.</p>
            <p style="color:#888;font-size:12px;margin-top:30px;">— Pohang Sudal (포항수달)<br/>Licensed Tour Guide in Pohang, South Korea</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
