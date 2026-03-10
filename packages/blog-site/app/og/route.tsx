import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import {
  bg, fg, muted, accent, border,
  brandName, brandTagline, brandSubtitle, brandHostname,
} from '@/lib/og-theme';

export const runtime = 'edge';

const mutedDim = 'hsla(0, 0%, 96%, 0.4)'; // fg at 40%

/** Shared footer — single source of truth for both homepage and content OG cards */
function OgFooter({ left }: { left?: string }) {
  return (
    <div style={{ position: 'absolute', bottom: '40px', ...(left ? { left } : {}), display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent, letterSpacing: '0.06em' }}>
        {brandName.toUpperCase()}
      </div>
      <div style={{ width: '1px', height: '20px', background: border }} />
      <div style={{ fontSize: 22, fontWeight: 400, color: muted }}>
        {brandHostname}
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || brandName;
  const description = searchParams.get('description') || brandTagline;
  const isHomepage = title === brandName;

  const interBold = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf')
  ).then(res => res.arrayBuffer());

  const interRegular = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf')
  ).then(res => res.arrayBuffer());

  const fonts = [
    { name: 'Inter' as const, data: interBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Inter' as const, data: interRegular, weight: 400 as const, style: 'normal' as const },
  ];

  if (isHomepage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: bg,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Accent line */}
          <div style={{ width: '48px', height: '2px', background: accent, marginBottom: '32px', opacity: 0.6 }} />

          {/* Brand name */}
          <div style={{ fontSize: 80, fontWeight: 700, color: fg, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {brandName}
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 32, fontWeight: 400, color: muted, letterSpacing: '0.04em', marginBottom: '40px' }}>
            {brandTagline}
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 20, fontWeight: 400, color: mutedDim, maxWidth: '600px', textAlign: 'center', lineHeight: 1.6 }}>
            {brandSubtitle}
          </div>

          <OgFooter />
        </div>
      ),
      { width: 1200, height: 630, fonts },
    );
  }

  // Content pages
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: bg,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Accent line */}
        <div style={{ width: '48px', height: '2px', background: accent, marginBottom: '36px', opacity: 0.6 }} />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 48 : title.length > 30 ? 56 : 64,
            fontWeight: 700,
            color: fg,
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '950px',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div style={{ fontSize: 24, fontWeight: 400, color: muted, lineHeight: 1.5, maxWidth: '800px' }}>
            {description.length > 140 ? description.slice(0, 137) + '...' : description}
          </div>
        )}

        <OgFooter left="80px" />
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
