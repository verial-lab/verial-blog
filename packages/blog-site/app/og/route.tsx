import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Verial';
  const description = searchParams.get('description') || 'Truth-seeking. Applied.';

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
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0F0F1A 50%, #111 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #4D80FF, #1A80B3)',
            marginBottom: '40px',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 48 : 56,
            fontWeight: 600,
            color: '#E6F2FF',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && description !== 'Truth-seeking. Applied.' && (
          <div
            style={{
              fontSize: 24,
              color: 'rgba(230, 242, 255, 0.5)',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {description.length > 120 ? description.slice(0, 117) + '...' : description}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#4D80FF',
              letterSpacing: '0.05em',
            }}
          >
            VERIAL
          </div>
          <div style={{ fontSize: 18, color: 'rgba(230, 242, 255, 0.3)' }}>
            verial.xyz
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
