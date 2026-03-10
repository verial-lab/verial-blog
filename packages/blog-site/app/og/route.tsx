import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Verial';
  const description = searchParams.get('description') || 'Truth-seeking. Applied.';
  const isHomepage = title === 'Verial';

  // Load Inter font for cleaner rendering
  const interBold = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf')
  ).then(res => res.arrayBuffer());

  const interRegular = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf')
  ).then(res => res.arrayBuffer());

  if (isHomepage) {
    // Special homepage card — bold, branded
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
            background: 'linear-gradient(145deg, #0a0a0f 0%, #0F0F1A 40%, #0d1530 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Subtle glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(77, 128, 255, 0.08) 0%, transparent 70%)',
            }}
          />

          {/* Accent line */}
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, #4D80FF, #1A80B3)',
              marginBottom: '32px',
            }}
          />

          {/* Brand name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#E6F2FF',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Verial
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: 'rgba(230, 242, 255, 0.6)',
              letterSpacing: '0.08em',
              marginBottom: '40px',
            }}
          >
            Truth-seeking. Applied.
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: 'rgba(230, 242, 255, 0.35)',
              maxWidth: '600px',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Essays on philosophy, systems thinking, and practical wisdom for the exponential age.
          </div>

          {/* Bottom URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: 16,
              color: 'rgba(77, 128, 255, 0.6)',
              letterSpacing: '0.1em',
            }}
          >
            verial.xyz
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
          { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        ],
      },
    );
  }

  // Content pages — title + description
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
          background: 'linear-gradient(145deg, #0a0a0f 0%, #0F0F1A 40%, #0d1530 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '10%',
            width: '500px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(77, 128, 255, 0.06) 0%, transparent 70%)',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #4D80FF, #1A80B3)',
            marginBottom: '40px',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 42 : title.length > 30 ? 48 : 56,
            fontWeight: 700,
            color: '#E6F2FF',
            lineHeight: 1.2,
            marginBottom: '24px',
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
              fontSize: 22,
              fontWeight: 400,
              color: 'rgba(230, 242, 255, 0.45)',
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
            bottom: '50px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#4D80FF',
              letterSpacing: '0.08em',
            }}
          >
            VERIAL
          </div>
          <div
            style={{
              width: '1px',
              height: '16px',
              background: 'rgba(230, 242, 255, 0.15)',
            }}
          />
          <div style={{ fontSize: 16, fontWeight: 400, color: 'rgba(230, 242, 255, 0.25)' }}>
            verial.xyz
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
