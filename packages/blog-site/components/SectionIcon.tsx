'use client';

import { useEffect, useRef } from 'react';

interface SectionIconProps {
  /** Path to the WebM (transparent) or MP4 video */
  src: string;
  /** Fallback MP4 for browsers that don't support WebM alpha */
  fallbackSrc?: string;
  /** Size in pixels (square) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Animated 3D section icon — renders a looping video with transparent background.
 * Uses WebM (VP9 + alpha) for transparency, falls back to MP4.
 * Forces autoplay on mobile via ref-based play() call.
 */
export function SectionIcon({ src, fallbackSrc, size = 200, className = '' }: SectionIconProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Force play on mount + after any pause (mobile browser policies)
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    // Also retry on visibility change (tab switch, scroll back)
    const onVisible = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  return (
    <div
      className={`relative z-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
      >
        {/* WebM with alpha transparency (Chrome, Firefox, Edge) */}
        <source src={src} type="video/webm" />
        {/* MP4 fallback (Safari, older browsers) */}
        {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
      </video>
    </div>
  );
}
