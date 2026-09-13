// Cloudflare Pages Function: /api/bookings
// Edge serverless handler interacting with Cloudflare D1 (env.DB) and Resend Email API

interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  HEALER_EMAIL?: string;
  NOTIFICATION_EMAIL?: string;
}

interface BookingRequest {
  name?: string;
  email?: string;
  phone?: string;
  booking_date?: string;
  booking_time?: string;
}

type PagesContext = { env: Env; request: Request };

export async function onRequestGet({ env }: PagesContext): Promise<Response> {
  try {
    // If D1 is not bound yet (e.g. local dev without wrangler D1), return empty list gracefully
    if (!env || !env.DB) {
      return Response.json({
        success: true,
        booked: [],
        note: "D1 database not connected. Showing zero booked slots."
      });
    }

    const { results } = await env.DB.prepare(
      "SELECT booking_date as date, booking_time as time FROM bookings WHERE status != 'cancelled'"
    ).all();

    return Response.json({
      success: true,
      booked: results || []
    }, {
      headers: {
        "Cache-Control": "public, max-age=15",
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return Response.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  try {
    const data = await request.json() as BookingRequest;
    const { name, email, phone, booking_date, booking_time } = data;

    if (!name || !email || !phone || !booking_date || !booking_time) {
      return Response.json({
        success: false,
        error: "Udfyld venligst alle obligatoriske felter."
      }, { status: 400 });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const normalizedDate = booking_date.trim();
    const normalizedTime = booking_time.trim();

    if (normalizedName.length > 120 || normalizedEmail.length > 254 || normalizedPhone.length > 40 || normalizedDate.length !== 10 || normalizedTime.length > 40) {
      return Response.json({ success: false, error: "Et eller flere felter er for lange." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return Response.json({ success: false, error: "Indtast venligst en gyldig e-mailadresse." }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate) || Number.isNaN(Date.parse(`${normalizedDate}T00:00:00Z`))) {
      return Response.json({ success: false, error: "Vælg venligst en gyldig dato." }, { status: 400 });
    }

    if (!/^\d{2}:\d{2}\s*[–-]\s*\d{2}:\d{2}$/.test(normalizedTime) && !/^.{2,40}$/.test(normalizedTime)) {
      return Response.json({ success: false, error: "Indtast venligst et gyldigt tidspunkt." }, { status: 400 });
    }

    // 1. Verify D1 database binding
    if (!env || !env.DB) {
      console.error("Missing env.DB binding in Cloudflare Pages");
      return Response.json({
        success: false,
        error: "Databasen (D1) er ikke forbundet til Cloudflare Pages. Tilføj venligst bindingen 'DB' under Settings -> Functions -> D1 database bindings."
      }, { status: 500 });
    }

    // Check conflict and insert
    const existing = await env.DB.prepare(
      "SELECT id FROM bookings WHERE booking_date = ? AND booking_time = ? AND status != 'cancelled'"
    ).bind(normalizedDate, normalizedTime).first();

    if (existing) {
      return Response.json({
        success: false,
        error: "Dette tidspunkt er desværre lige blevet booket. Vælg venligst et andet."
      }, { status: 409 });
    }

    await env.DB.prepare(
      "INSERT INTO bookings (name, email, phone, booking_date, booking_time) VALUES (?, ?, ?, ?, ?)"
    ).bind(normalizedName, normalizedEmail, normalizedPhone, normalizedDate, normalizedTime).run();


    // 2. Send emails via Resend API (if configured in Cloudflare environment variables)
    const resendApiKey = String(env?.RESEND_API_KEY || "").replace(/^["']|["']$/g, "").trim();
    const senderEmail = env?.FROM_EMAIL || "Christina Flanding <onboarding@resend.dev>";
    const healerEmail = env?.HEALER_EMAIL || env?.NOTIFICATION_EMAIL;
    const emailErrors = [];

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set on this Pages deployment");
      emailErrors.push("E-mail er ikke konfigureret (mangler RESEND_API_KEY).");
    }

    if (resendApiKey) {
      // 2A. Confirmation email to the CLIENT (in Danish)
      const clientHtml = `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1E3D14; background-color: #F8FAF6; border: 1px solid #C5DEB8; borderRadius: 12px;">
          <h2 style="color: #1E3D14; margin-top: 0;">🌿 Tak for din booking hos Christina Flanding</h2>
          <p style="font-size: 16px; line-height: 1.6;">Kære ${escapeHtml(normalizedName)},</p>
          <p style="font-size: 15px; line-height: 1.6; color: #4A6B35;">
            Vi har modtaget din forespørgsel på en healingsession. Her er detaljerne for din reservation:
          </p>

          <div style="background-color: #EEF6E8; border-left: 4px solid #3D6B2C; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
            <p style="margin: 6px 0;"><strong>📅 Dato:</strong> ${escapeHtml(normalizedDate)}</p>
            <p style="margin: 6px 0;"><strong>⏰ Tidspunkt:</strong> ${escapeHtml(normalizedTime)}</p>
            <p style="margin: 6px 0;"><strong>📞 Dit telefonnummer:</strong> ${escapeHtml(normalizedPhone)}</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #4A6B35;">
            Christina gennemgår din tid og kontakter dig snarest for at bekræfte de praktiske detaljer.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4A6B35;">
            Hvis du har spørgsmål forinden, kan du besvare denne e-mail direkte.
          </p>

          <hr style="border: none; border-top: 1px solid #D9EDCC; margin: 24px 0;" />
          <p style="font-size: 13px; color: #7FAD65; margin-bottom: 0;">
            Kærlig hilsen,<br />
            <strong>Christina Flanding</strong>
          </p>
        </div>
      `;

      try {
        const clientRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [normalizedEmail],
            subject: `Bekræftelse på din healingsession (${normalizedDate} kl. ${normalizedTime})`,
            html: clientHtml
          })
        });
        if (!clientRes.ok) {
          const errData = await clientRes.json().catch(() => ({})) as { message?: string };
          console.error("Resend error sending to client:", errData);
          emailErrors.push(errData?.message || `Bekræftelsesmail kunne ikke sendes (${clientRes.status}).`);
        }
      } catch (err) {
        console.error("Failed sending email to client:", err);
        emailErrors.push("Bekræftelsesmail kunne ikke sendes.");
      }

      // 2B. Notification email to CHRISTINA
      if (healerEmail) {
        const healerHtml = `
          <div style="font-family: sans-serif; max-width: 560px; padding: 20px; color: #1E3D14;">
            <h2 style="color: #2D5A1B;">✨ Ny Healingsession Booking</h2>
            <p>Du har modtaget en ny booking via din hjemmeside:</p>
            <ul>
              <li><strong>Navn:</strong> ${escapeHtml(normalizedName)}</li>
              <li><strong>E-mail:</strong> <a href="mailto:${escapeHtml(normalizedEmail)}">${escapeHtml(normalizedEmail)}</a></li>
              <li><strong>Telefon:</strong> <a href="tel:${escapeHtml(normalizedPhone)}">${escapeHtml(normalizedPhone)}</a></li>
              <li><strong>Dato:</strong> ${escapeHtml(normalizedDate)}</li>
              <li><strong>Tidspunkt:</strong> ${escapeHtml(normalizedTime)}</li>
            </ul>
          </div>
        `;

        try {
          const healerRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: senderEmail,
              to: [healerEmail],
              subject: `✨ Ny booking: ${normalizedName} (${normalizedDate} kl. ${normalizedTime})`,
              html: healerHtml
            })
          });
          if (!healerRes.ok) {
            const errData = await healerRes.json().catch(() => ({})) as { message?: string };
            console.error("Resend error sending to healer:", errData);
            emailErrors.push(errData?.message || `Notifikationsmail kunne ikke sendes (${healerRes.status}).`);
          }
        } catch (err) {
          console.error("Failed sending email to healer:", err);
          emailErrors.push("Notifikationsmail kunne ikke sendes.");
        }
      }
    }

    return Response.json({
      success: true,
      emailSent: emailErrors.length === 0 && Boolean(resendApiKey),
      emailErrors
    });
  } catch (err) {
    return Response.json({ success: false, error: getErrorMessage(err) }, { status: 500 });
  }
}

function escapeHtml(str: string | undefined): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Ukendt serverfejl';
}

