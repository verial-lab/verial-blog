import { NextRequest, NextResponse } from 'next/server';

const BUTTONDOWN_API = 'https://api.buttondown.com/v1/subscribers';

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

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${apiKey}`,
    };

    const tags = ['essays'];
    if (includeNotes) {
      tags.push('posts', 'systems');
    }

    // Try creating new subscriber
    const createRes = await fetch(BUTTONDOWN_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email_address: email,
        tags,
        // Omit type to use Buttondown's default double opt-in
        // Subscriber starts as "unactivated" until they confirm via email
      }),
    });

    if (createRes.ok) {
      return NextResponse.json({ success: true });
    }

    const createData = await createRes.json();

    // If subscriber already exists (active or inactive), try reactivating
    if (createRes.status === 400 || createRes.status === 409) {
      // Look up the subscriber
      const lookupRes = await fetch(
        `${BUTTONDOWN_API}/${encodeURIComponent(email)}`,
        { headers }
      );

      if (lookupRes.ok) {
        const subscriber = await lookupRes.json();

        // If they're already active and confirmed
        if (subscriber.subscriber_type === 'regular') {
          return NextResponse.json({ success: true, alreadySubscribed: true });
        }

        // Reactivate: set to unactivated so they get a new confirmation email
        const updateRes = await fetch(
          `${BUTTONDOWN_API}/${subscriber.id}`,
          {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              subscriber_type: 'unactivated',
              tags,
            }),
          }
        );

        if (updateRes.ok) {
          return NextResponse.json({ success: true });
        }

        console.error('Buttondown reactivate error:', updateRes.status, await updateRes.text());
      }
    }

    console.error('Buttondown error:', createRes.status, createData);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
