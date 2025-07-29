// app/api/subscribe/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, phone, university, course } = body;

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing MailerLite API key' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey,
      },
      body: JSON.stringify({
        email,
        fields: {
          phone,
          university,
          course,
        },
        resubscribe: true,
        ...(groupId && { groups: [groupId] }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    return NextResponse.json({ message: 'User subscribed successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}
