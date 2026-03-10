import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { colors } from '@verial/design-tokens/colors';
import { brand } from '@verial/design-tokens/brand';

export const runtime = 'edge';

// Derive OG colors from the design system — no hardcoded values
const bg = colors.background;
const fg = colors.foreground;
const muted = colors['muted-foreground'];
const mutedDim = `${fg}66`; // foreground at 40% opacity
const accent = colors.primary;
const borderColor = colors.border;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || brand.name;
  const description = searchParams.get('description') || brand.tagline;
  const isHomepage = title === brand.name;

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
          {/* Accent line from design system primary */}
          <div
            style={{
              width: '48px',
              height: '2px',
              background: accent,
              marginBottom: '32px',
              opacity: 0.6,
            }}
          />

          {/* Brand name from design tokens */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: fg,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            {brand.name}
          </div>

          {/* Tagline from design tokens */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: muted,
              letterSpacing: '0.04em',
              marginBottom: '40px',
            }}
          >
            {brand.tagline}
          </div>

          {/* Subtitle from design tokens */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: mutedDim,
              maxWidth: '600px',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            {brand.subtitle}
          </div>

          {/* Footer URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: 14,
              fontWeight: 400,
              color: mutedDim,
            }}
          >
            {new URL(brand.url).hostname}
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
        {/* Accent line */}
        <div
          style={{
            width: '48px',
            height: '2px',
            background: accent,
            marginBottom: '36px',
            opacity: 0.6,
          }}
        />

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
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: muted,
              lineHeight: 1.5,
              maxWidth: '800px',
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
              color: accent,
              letterSpacing: '0.06em',
              opacity: 0.7,
            }}
          >
            {brand.name.toUpperCase()}
          </div>
          <div
            style={{
              width: '1px',
              height: '14px',
              background: borderColor,
            }}
          />
          <div style={{ fontSize: 14, fontWeight: 400, color: mutedDim }}>
            {new URL(brand.url).hostname}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
