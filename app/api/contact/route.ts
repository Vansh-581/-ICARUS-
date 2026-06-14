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

  const endpoint = `https://formsubmit.co/ajax/${SITE.email}`;
  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: origin,
      Referer: `${origin}/`,
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || 'Not provided',
      program: program || 'Not selected',
      message,
      _replyto: email,
      _subject: `New ICARUS enquiry from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === 'false') {
    return NextResponse.json(
      { message: data.message || 'Unable to send enquiry right now.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: 'Enquiry sent successfully.' });
}
