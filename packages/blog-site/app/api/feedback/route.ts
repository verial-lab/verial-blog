import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, email, page } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide more detail.' }, { status: 400 });
    }

    const token = process.env.GITHUB_FEEDBACK_TOKEN;
    if (!token) {
      console.error('GITHUB_FEEDBACK_TOKEN not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = [
      `**Feedback from visitor**`,
      '',
      message.trim(),
      '',
      '---',
      `**Page:** ${page || 'Unknown'}`,
      email ? `**Email:** ${email}` : '*No email provided*',
      `**Time:** ${new Date().toISOString()}`,
      `**User-Agent:** ${req.headers.get('user-agent') || 'Unknown'}`,
    ].join('\n');

    const title = message.trim().length > 80
      ? message.trim().slice(0, 77) + '...'
      : message.trim();

    const res = await fetch('https://api.github.com/repos/verial-lab/verial-blog/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        title: `[Feedback] ${title}`,
        body,
        labels: ['feedback'],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ success: true, issueNumber: data.number });
    }

    const errData = await res.text();
    console.error('GitHub API error:', res.status, errData);
    return NextResponse.json({ error: 'Failed to submit feedback.' }, { status: 500 });
  } catch (err) {
    console.error('Feedback error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
