import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, includeNotes } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error('BUTTONDOWN_API_KEY not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const tags = ['essays'];
    if (includeNotes) {
      tags.push('notes', 'framework');
    }

    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags,
        type: 'regular',
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    const data = await response.json();

    // Buttondown returns 400 if already subscribed
    if (response.status === 400 && JSON.stringify(data).includes('already')) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error('Buttondown error:', response.status, data);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: response.status }
    );
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
