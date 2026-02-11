'use client';

import { motion } from 'framer-motion';

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
 */
export function SectionIcon({ src, fallbackSrc, size = 200, className = '' }: SectionIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
      >
        {/* WebM with alpha transparency (Chrome, Firefox, Edge) */}
        <source src={src} type="video/webm" />
        {/* MP4 fallback (Safari, older browsers) */}
        {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
      </video>
    </motion.div>
  );
}
