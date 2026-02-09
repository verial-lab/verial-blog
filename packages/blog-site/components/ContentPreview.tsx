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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={href}>
        <div className="border border-border/50 rounded-xl p-6 h-full hover:border-primary/20 transition-all duration-300 bg-muted/5 hover:bg-muted/15 hover:shadow-lg hover:shadow-primary/[0.03]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 font-medium">
                {badge}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
            {description}
          </p>
          
          <div className="flex items-center text-sm text-primary/80 group-hover:text-primary transition-colors font-medium">
            <span>Explore {title.toLowerCase()}</span>
            <svg 
              className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" 
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
