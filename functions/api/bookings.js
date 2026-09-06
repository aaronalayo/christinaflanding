// Cloudflare Pages Function: /api/bookings
// Edge serverless handler interacting with Cloudflare D1 (env.DB) and Resend Email API

export async function onRequestGet({ env }) {
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
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, email, phone, booking_date, booking_time, intentions } = data;

    if (!name || !email || !phone || !booking_date || !booking_time) {
      return Response.json({
        success: false,
        error: "Udfyld venligst alle obligatoriske felter."
      }, { status: 400 });
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
    ).bind(booking_date, booking_time).first();

    if (existing) {
      return Response.json({
        success: false,
        error: "Dette tidspunkt er desværre lige blevet booket. Vælg venligst et andet."
      }, { status: 409 });
    }

    await env.DB.prepare(
      "INSERT INTO bookings (name, email, phone, booking_date, booking_time, intentions) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(name, email, phone, booking_date, booking_time, intentions || '').run();


    // 2. Send emails via Resend API (if configured in Cloudflare environment variables)
    const resendApiKey = env?.RESEND_API_KEY;
    const senderEmail = env?.FROM_EMAIL || "Christina Flanding <onboarding@resend.dev>";
    const healerEmail = env?.HEALER_EMAIL || env?.NOTIFICATION_EMAIL;

    if (resendApiKey) {
      // 2A. Confirmation email to the CLIENT (in Danish)
      const clientHtml = `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1E3D14; background-color: #F8FAF6; border: 1px solid #C5DEB8; borderRadius: 12px;">
          <h2 style="color: #1E3D14; margin-top: 0;">🌿 Tak for din booking hos Christina Flanding</h2>
          <p style="font-size: 16px; line-height: 1.6;">Kære ${escapeHtml(name)},</p>
          <p style="font-size: 15px; line-height: 1.6; color: #4A6B35;">
            Vi har modtaget din forespørgsel på en healingsession. Her er detaljerne for din reservation:
          </p>

          <div style="background-color: #EEF6E8; border-left: 4px solid #3D6B2C; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
            <p style="margin: 6px 0;"><strong>📅 Dato:</strong> ${escapeHtml(booking_date)}</p>
            <p style="margin: 6px 0;"><strong>⏰ Tidspunkt:</strong> ${escapeHtml(booking_time)}</p>
            <p style="margin: 6px 0;"><strong>📞 Dit telefonnummer:</strong> ${escapeHtml(phone)}</p>
            ${intentions ? `<p style="margin: 6px 0;"><strong>🎯 Dine intentioner:</strong> ${escapeHtml(intentions)}</p>` : ''}
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
            to: [email],
            subject: `Bekræftelse på din healingsession (${booking_date} kl. ${booking_time})`,
            html: clientHtml
          })
        });
        if (!clientRes.ok) {
          const errData = await clientRes.json().catch(() => ({}));
          console.error("Resend error sending to client:", errData);
        }
      } catch (err) {
        console.error("Failed sending email to client:", err);
      }

      // 2B. Notification email to CHRISTINA
      if (healerEmail) {
        const healerHtml = `
          <div style="font-family: sans-serif; max-width: 560px; padding: 20px; color: #1E3D14;">
            <h2 style="color: #2D5A1B;">✨ Ny Healingsession Booking</h2>
            <p>Du har modtaget en ny booking via din hjemmeside:</p>
            <ul>
              <li><strong>Navn:</strong> ${escapeHtml(name)}</li>
              <li><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
              <li><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></li>
              <li><strong>Dato:</strong> ${escapeHtml(booking_date)}</li>
              <li><strong>Tidspunkt:</strong> ${escapeHtml(booking_time)}</li>
              <li><strong>Intentioner / Mål:</strong> ${escapeHtml(intentions || 'Ingen angivet')}</li>
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
              subject: `✨ Ny booking: ${name} (${booking_date} kl. ${booking_time})`,
              html: healerHtml
            })
          });
          if (!healerRes.ok) {
            const errData = await healerRes.json().catch(() => ({}));
            console.error("Resend error sending to healer:", errData);
          }
        } catch (err) {
          console.error("Failed sending email to healer:", err);
        }
      }
    }

    // 3. Fallback to Web3Forms if RESEND_API_KEY is not set but WEB3FORMS_ACCESS_KEY is set
    const web3Key = env?.WEB3FORMS_ACCESS_KEY;
    if (!resendApiKey && web3Key && web3Key !== "YOUR_ACCESS_KEY_HERE") {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `✨ Ny Healing Booking: ${name} (${booking_date} kl. ${booking_time})`,
            from_name: "Christina Flanding Booking",
            "Klient Navn": name,
            "Klient E-mail": email,
            "Klient Telefon": phone,
            "Dato": booking_date,
            "Tidspunkt": booking_time,
            "Intentioner": intentions || "Ingen angivet",
          })
        });
      } catch (emailErr) {
        console.error("Web3Forms dispatch error:", emailErr);
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

