import { NextResponse } from 'next/server';
import { SITE } from '@/lib/constants';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  program?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid form submission.' }, { status: 400 });
  }

  const name = payload.name?.trim() || '';
  const email = payload.email?.trim() || '';
  const phone = payload.phone?.trim() || '';
  const program = payload.program?.trim() || '';
  const message = payload.message?.trim() || '';

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || 'ICARUS <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;

  if (!apiKey) {
    return NextResponse.json(
      { message: 'Email service is not configured yet. Add RESEND_API_KEY in .env.local.' },
      { status: 503 },
    );
  }

  const html = `
    <h2>New ICARUS enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
    <p><strong>Program:</strong> ${escapeHtml(program || 'Not selected')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New ICARUS enquiry from ${name}`,
      html,
      text: [
        'New ICARUS enquiry',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Program: ${program || 'Not selected'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message || 'Email service rejected the enquiry.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: 'Enquiry sent successfully.' });
}
