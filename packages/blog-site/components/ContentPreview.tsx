'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ContentPreviewProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
  /** Optional animated icon (WebM path) shown above the card */
  iconSrc?: string;
  /** MP4 fallback for the icon */
  iconFallback?: string;
  /** Icon size in pixels (default 160) */
  iconSize?: number;
}

export function ContentPreview({ title, description, href, badge, iconSrc, iconFallback, iconSize = 120 }: ContentPreviewProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={href}>
        {/* Icon floats above the card, left-aligned */}
        {iconSrc && (
          <div className="flex justify-start pl-2 -mb-4">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-contain"
              style={{ width: iconSize, height: iconSize }}
            >
              <source src={iconSrc} type="video/webm" />
              {iconFallback && <source src={iconFallback} type="video/mp4" />}
            </video>
          </div>
        )}

        <div className="relative border border-border/40 rounded-xl p-6 h-full transition-all duration-300 hover:bg-muted/[0.06] hover:border-border/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-serif font-normal group-hover:text-primary transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-wider text-primary/70 bg-primary/[0.06] px-2 py-0.5 rounded-full border border-primary/10 font-medium">
                {badge}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-4 text-base">
            {description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground/60 group-hover:text-primary/80 transition-colors font-medium">
            <span>Explore</span>
            <svg 
              className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
