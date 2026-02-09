'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ContentPreviewProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function ContentPreview({ title, description, href, badge }: ContentPreviewProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={href}>
        <div className="relative border border-border/40 rounded-xl p-6 h-full transition-all duration-300 bg-muted/[0.03] hover:bg-muted/[0.08] hover:border-primary/20 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/[0.06]">
          {/* Top accent line on hover */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />
          
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-serif font-normal group-hover:text-primary transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-wider text-primary/70 bg-primary/[0.06] px-2 py-0.5 rounded-full border border-primary/10 font-medium">
                {badge}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground/80 leading-relaxed mb-4 text-[14px]">
            {description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground/50 group-hover:text-primary/80 transition-colors font-medium">
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
