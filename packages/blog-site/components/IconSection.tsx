'use client';

import { motion } from 'framer-motion';

interface IconSectionProps {
  /** Heading text displayed beside the icon */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** WebM source (transparent, preferred) */
  videoSrc: string;
  /** MP4 fallback source */
  videoFallback?: string;
  /** PNG poster/fallback frame */
  poster: string;
  /** Flip layout: icon on right instead of left */
  reverse?: boolean;
  /** Optional link */
  href?: string;
}

export function IconSection({
  title,
  description,
  videoSrc,
  videoFallback,
  poster,
  reverse = false,
  href,
}: IconSectionProps) {
  const content = (
    <div
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14`}
    >
      {/* Icon */}
      <motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          width={280}
          height={280}
          poster={poster}
          className="w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
        >
          <source src={videoSrc} type="video/webm" />
          {videoFallback && <source src={videoFallback} type="video/mp4" />}
        </video>
      </motion.div>

      {/* Text */}
      <motion.div
        className={`${reverse ? 'md:text-right' : 'md:text-left'} text-center`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-wide mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block group hover:opacity-90 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}
