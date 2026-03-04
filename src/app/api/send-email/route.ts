import { NextRequest, NextResponse } from "next/server";
import { getTourBySlug } from "@/lib/tours";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kkjin722@gmail.com";

function buildAdminEmailHtml(data: Record<string, string>, price: number | null): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6CB4EE 0%,#F28DAC 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">New Booking Request</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">${data.tourTitle}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8ed;border-radius:8px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;width:140px;">Name</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Email</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;"><a href="mailto:${data.email}" style="color:#6CB4EE;text-decoration:none;">${data.email}</a></td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Phone</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.phone || "\u2014"}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Nationality</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.nationality || "\u2014"}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Tour</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.tourTitle}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Price</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;font-weight:600;">${price !== null ? `$${price} / person` : "N/A"}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Date</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.date}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e8e8ed;">Group Size</td>
                  <td style="padding:12px 16px;color:#111827;border-bottom:1px solid #e8e8ed;">${data.groupSize} people</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-weight:600;color:#374151;">Message</td>
                  <td style="padding:12px 16px;color:#111827;">${data.message || "\u2014"}</td>
                </tr>
              </table>

              <!-- Dashboard Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="https://pohang-sudal.vercel.app/admin"
                       style="display:inline-block;background:linear-gradient(135deg,#6CB4EE 0%,#F28DAC 100%);color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                      Open Admin Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f9fafb;text-align:center;border-top:1px solid #e8e8ed;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">Pohang Sudal Admin Notification</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCustomerEmailHtml(data: Record<string, string>, price: number | null): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6CB4EE 0%,#F28DAC 100%);padding:40px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:36px;line-height:1;">&#129446;</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Pohang Sudal</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.9);font-size:14px;letter-spacing:0.5px;">Your Local Guide in Pohang</p>
            </td>
          </tr>
          <!-- Confirmation Headline -->
          <tr>
            <td style="padding:32px 32px 8px;text-align:center;">
              <h2 style="margin:0;color:#111827;font-size:24px;font-weight:700;">Booking Confirmed!</h2>
              <p style="margin:10px 0 0;color:#6b7280;font-size:15px;">Thank you, ${data.name}. We've received your booking request.</p>
            </td>
          </tr>
          <!-- Booking Summary Card -->
          <tr>
            <td style="padding:16px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Booking Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;color:#6b7280;font-size:14px;">Tour</td>
                        <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${data.tourTitle}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-bottom:1px solid #e5e7eb;padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#6b7280;font-size:14px;">Date</td>
                        <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${data.date}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-bottom:1px solid #e5e7eb;padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#6b7280;font-size:14px;">Group Size</td>
                        <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${data.groupSize} people</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-bottom:1px solid #e5e7eb;padding:0;"></td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#6b7280;font-size:14px;">Price</td>
                        <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${price !== null ? `$${price} / person` : "Contact for pricing"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- What's Next Section -->
          <tr>
            <td style="padding:0 32px 32px;">
              <h3 style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:700;">What's Next?</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:linear-gradient(135deg,#6CB4EE,#F28DAC);border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:700;font-size:15px;">1</td>
                        <td style="padding-left:14px;">
                          <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">We review your request</p>
                          <p style="margin:2px 0 0;color:#6b7280;font-size:13px;">Our team will check availability for your selected date.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:linear-gradient(135deg,#6CB4EE,#F28DAC);border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:700;font-size:15px;">2</td>
                        <td style="padding-left:14px;">
                          <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">Confirmation within 24 hours</p>
                          <p style="margin:2px 0 0;color:#6b7280;font-size:13px;">We'll email you to confirm your booking and share meeting details.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:linear-gradient(135deg,#6CB4EE,#F28DAC);border-radius:50%;text-align:center;vertical-align:middle;color:#ffffff;font-weight:700;font-size:15px;">3</td>
                        <td style="padding-left:14px;">
                          <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">Get ready to explore!</p>
                          <p style="margin:2px 0 0;color:#6b7280;font-size:13px;">Pack your bags and get excited for your Pohang adventure.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background:#f9fafb;text-align:center;border-top:1px solid #e8e8ed;">
              <p style="margin:0 0 4px;color:#374151;font-size:14px;font-weight:600;">Pohang Sudal (&#xD3EC;&#xD56D;&#xC218;&#xB2EC;)</p>
              <p style="margin:0 0 4px;color:#6b7280;font-size:13px;">Licensed Tour Interpreter Guide in Pohang, South Korea</p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:13px;">
                <a href="mailto:kkjin722@gmail.com" style="color:#6CB4EE;text-decoration:none;">kkjin722@gmail.com</a>
              </p>
              <p style="margin:0;color:#9ca3af;font-size:11px;">Questions? Simply reply to this email and we'll get back to you.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
      // Look up tour price from tours data
      const tour = data.tourSlug ? getTourBySlug(data.tourSlug) : null;
      const price = tour?.price ?? null;

      const results: { admin: boolean; customer: boolean; errors: string[] } = {
        admin: false,
        customer: false,
        errors: [],
      };

      // Send admin notification email
      try {
        await resend.emails.send({
          from: "Pohang Sudal <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: `New Booking: ${data.name} - ${data.tourTitle}`,
          html: buildAdminEmailHtml(data, price),
        });
        results.admin = true;
      } catch (adminError) {
        console.error("Admin email send error:", adminError);
        results.errors.push("admin email failed");
      }

      // Send customer confirmation email
      try {
        await resend.emails.send({
          from: "Pohang Sudal <onboarding@resend.dev>",
          to: data.email,
          subject: "Booking Confirmed! - Pohang Sudal",
          html: buildCustomerEmailHtml(data, price),
        });
        results.customer = true;
      } catch (customerError) {
        console.error("Customer email send error:", customerError);
        results.errors.push("customer email failed");
      }

      // Return partial success if at least one email sent
      if (!results.admin && !results.customer) {
        return NextResponse.json(
          { error: "All emails failed to send", details: results.errors },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        adminSent: results.admin,
        customerSent: results.customer,
        errors: results.errors.length > 0 ? results.errors : undefined,
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
