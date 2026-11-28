import nodemailer from 'nodemailer';

// Auto-load .env for local Node / dev environments if not already loaded
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // Hosted environments like Vercel inject variables directly into process.env
}

/**
 * Validates basic email format
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Escapes HTML characters for safe template rendering
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { fullName, email, phone, company, service, subject, message, website } = data;

    // Honeypot check: bots fill hidden 'website' input
    if (website) {
      // Silently succeed so bots don't adapt
      return res.status(200).json({ ok: true, message: 'Enquiry received' });
    }

    // Server-side validation
    const fieldErrors = {};
    if (!fullName || !fullName.trim()) {
      fieldErrors.fullName = 'Please enter your full name.';
    }
    if (!email || !isValidEmail(email)) {
      fieldErrors.email = 'Please provide a valid email address.';
    }
    if (!phone || !phone.trim()) {
      fieldErrors.phone = 'Please provide a valid phone number.';
    }
    if (!message || !message.trim()) {
      fieldErrors.message = 'Please enter your message.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Please review the highlighted fields.',
        fieldErrors,
      });
    }

    // SMTP Configuration from process.env
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const toEmail = process.env.ENQUIRY_TO_EMAIL || smtpUser;
    const fromName = process.env.SMTP_FROM_NAME || 'Shan and Co Website';
    const fromAddress = process.env.SMTP_FROM || `"${fromName}" <${smtpUser}>`;

    if (!smtpUser || !smtpPass) {
      console.error('SMTP configuration missing: SMTP_USER or SMTP_PASS is not set in environment.');
      return res.status(500).json({
        ok: false,
        message: 'Email service is currently misconfigured. Please contact us directly by phone or email.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(fullName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeCompany = escapeHtml((company || '').trim()) || 'Not specified';
    const safeService = escapeHtml((service || '').trim()) || 'General Enquiry';
    const safeSubject = escapeHtml((subject || '').trim()) || safeService;
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const emailSubject = `New Website Enquiry: ${safeService} - ${fullName.trim()}`;

    const textContent = `
New Client Enquiry Received:
-------------------------------------------
Full Name: ${fullName.trim()}
Email: ${email.trim()}
Phone: ${phone.trim()}
Company: ${(company || '').trim() || 'Not specified'}
Service: ${(service || '').trim() || 'General Enquiry'}
Subject: ${(subject || '').trim() || safeService}

Message:
${message.trim()}
-------------------------------------------
Sent from Shan and Co Website Contact Form
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #1f2937; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
    .header { background: #0e1e38; color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #d97706; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #cbd5e1; }
    .body { padding: 32px; }
    .row { display: flex; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
    .label { width: 140px; font-weight: 600; color: #4b5563; font-size: 14px; }
    .value { flex: 1; color: #111827; font-size: 14px; }
    .message-box { margin-top: 24px; padding: 18px 20px; background-color: #f8fafc; border-left: 4px solid #d97706; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; }
    .footer { padding: 16px 32px; background: #f9fafb; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Website Enquiry</h1>
      <p>Received through Shan and Co Website Contact Form</p>
    </div>
    <div class="body">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; width: 130px; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Full Name:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Email:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Phone:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;"><a href="tel:${safePhone}" style="color: #2563eb; text-decoration: none;">${safePhone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Company:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${safeCompany}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Service:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;"><span style="display: inline-block; background: #fef3c7; color: #92400e; padding: 2px 10px; border-radius: 4px; font-weight: 600; font-size: 13px;">${safeService}</span></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600; color: #4b5563; font-size: 14px; vertical-align: top;">Subject:</td>
          <td style="padding: 10px 0; color: #111827; font-size: 14px;">${safeSubject}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; font-weight: 600; color: #4b5563; font-size: 14px;">Client Message:</div>
      <div class="message-box">${safeMessage}</div>
    </div>
    <div class="footer">
      Sent from Shan and Co Website &bull; <a href="https://shanandco.in" style="color: #4b5563; text-decoration: none;">shanandco.in</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      replyTo: `"${fullName.trim()}" <${email.trim()}>`,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    return res.status(200).json({
      ok: true,
      message: 'Your enquiry has been sent successfully.',
    });
  } catch (error) {
    console.error('Error sending enquiry email via SMTP:', error);
    return res.status(500).json({
      ok: false,
      message: 'Failed to send enquiry due to a mail server error. Please try again or contact us directly.',
    });
  }
}
