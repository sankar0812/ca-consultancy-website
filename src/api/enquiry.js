// Vercel serverless function: POST /api/enquiry
// Validates the enquiry, then sends it to the firm's inbox through Resend.
// Secrets live in server-side environment variables and never reach the browser bundle.

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map(); // best-effort per-instance rate limit

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Remove control characters, trim and cap length.
const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

// Single-line fields must never contain line breaks (prevents header injection).
const line = (value, max) => clean(value, max).replace(/[\r\n\u2028\u2029]+/g, ' ');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function validate(body) {
  const data = {
    fullName: line(body.fullName, 100),
    email: line(body.email, 254),
    phone: line(body.phone, 30),
    company: line(body.company, 120),
    service: line(body.service, 120),
    subject: line(body.subject, 150),
    message: clean(body.message, 2000),
    consent: body.consent === true,
  };
  const errors = {};
  const phoneDigits = data.phone.replace(/\D/g, '');

  if (data.fullName.length < 2) errors.fullName = 'Enter your full name.';
  if (!EMAIL_PATTERN.test(data.email)) errors.email = 'Enter a valid email address.';
  if (!/^\+?[\d\s\-()]+$/.test(data.phone) || phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Enter a phone number with 10 to 13 digits.';
  }
  if (data.subject.length < 3) errors.subject = 'Add a short subject.';
  if (data.message.length < 20) errors.message = 'Write at least 20 characters.';
  if (!data.consent) errors.consent = 'Please confirm your consent.';

  return { data, errors };
}

function buildEmail(data) {
  const submittedAt = new Date();
  const when = `${submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST (${submittedAt.toISOString()})`;
  const rows = [
    ['Name', data.fullName],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Company', data.company || 'Not provided'],
    ['Service required', data.service || 'Not specified'],
    ['Subject', data.subject],
    ['Submitted', when],
    ['Consent given', data.consent ? 'Yes' : 'No'],
  ];

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', 'Message:', data.message].join('\n');
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0f1a33;max-width:640px">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 12px 8px 0;font-weight:bold;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
    </div>`;
  return { text, html };
}

const send = (res, status, payload) => res.status(status).json(payload);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  // Optional origin allow-list (recommended in production).
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (allowed.length && (!origin || !allowed.includes(origin))) {
    return send(res, 403, { ok: false, message: 'This request is not allowed from your current site.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return send(res, 429, { ok: false, message: 'Too many enquiries in a short time. Please try again in a few minutes.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  if (!body || typeof body !== 'object') {
    return send(res, 400, { ok: false, message: 'The enquiry could not be read. Please try again.' });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.website, 200)) {
    return send(res, 200, { ok: true });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    return send(res, 422, { ok: false, message: 'Please correct the highlighted fields.', fieldErrors: errors });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error('Enquiry email is not configured: set RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL.');
    return send(res, 500, {
      ok: false,
      message: 'Our enquiry form is not available right now. Please email or call us directly.',
    });
  }

  const fromName = line(process.env.ENQUIRY_FROM_NAME || 'Website enquiry', 80).replace(/["<>]/g, '');
  const { text, html } = buildEmail(data);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${fromName} <${ENQUIRY_FROM_EMAIL}>`,
        to: ENQUIRY_TO_EMAIL.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `New enquiry: ${data.subject}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('Resend rejected the email', response.status, detail);
      return send(res, 502, {
        ok: false,
        message: 'We could not deliver your enquiry right now. Please try again shortly, or email us directly.',
      });
    }

    const result = await response.json().catch(() => ({}));
    return send(res, 200, { ok: true, id: result.id });
  } catch (error) {
    console.error('Email request failed', error);
    return send(res, 502, {
      ok: false,
      message: 'We could not reach our email service. Please try again shortly, or email us directly.',
    });
  }
}
