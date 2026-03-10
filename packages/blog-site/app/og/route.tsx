import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Design tokens — must match the actual site
const bg = '#000000';           // background: hsl(0, 0%, 0%)
const fg = '#f5f5f5';           // foreground: hsl(0, 0%, 96%)
const muted = '#c7c7c7';        // muted-foreground: hsl(0, 0%, 78%)
const mutedDim = 'rgba(245, 245, 245, 0.4)';
const primary = '#d9d0c1';      // primary: hsl(40, 15%, 85%) — warm gold
const border = 'rgba(255, 255, 255, 0.08)';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Verial';
  const description = searchParams.get('description') || 'Truth-seeking. Applied.';
  const isHomepage = title === 'Verial';

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
          {/* Subtle warm glow */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '300px',
              background: 'radial-gradient(ellipse, rgba(217, 208, 193, 0.04) 0%, transparent 70%)',
            }}
          />

          {/* Accent line — warm primary */}
          <div
            style={{
              width: '48px',
              height: '2px',
              background: primary,
              marginBottom: '32px',
              opacity: 0.6,
            }}
          />

          {/* Brand name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: fg,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Verial
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: muted,
              letterSpacing: '0.04em',
              marginBottom: '36px',
            }}
          >
            Truth-seeking. Applied.
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: mutedDim,
              maxWidth: '520px',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Essays on philosophy, systems thinking, and practical wisdom for the exponential age.
          </div>

          {/* Bottom border line + URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 400, color: mutedDim }}>
              verial.xyz
            </div>
          </div>
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
        {/* Top accent line */}
        <div
          style={{
            width: '48px',
            height: '2px',
            background: primary,
            marginBottom: '36px',
            opacity: 0.6,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 40 : title.length > 30 ? 48 : 56,
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
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: muted,
              lineHeight: 1.5,
              maxWidth: '750px',
            }}
          >
            {description.length > 140 ? description.slice(0, 137) + '...' : description}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: primary,
              letterSpacing: '0.06em',
              opacity: 0.7,
            }}
          >
            VERIAL
          </div>
          <div
            style={{
              width: '1px',
              height: '14px',
              background: border,
            }}
          />
          <div style={{ fontSize: 14, fontWeight: 400, color: mutedDim }}>
            verial.xyz
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
