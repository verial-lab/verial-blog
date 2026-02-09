'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      
      {/* Secondary accent glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Geometric dot pattern */}
      <div className="absolute inset-0 opacity-[0.025]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Gradient line accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-medium"
          >
            <span className="w-8 h-px bg-primary/30" />
            Essays &middot; Philosophy &middot; Systems
            <span className="w-8 h-px bg-primary/30" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-normal leading-[1.15] tracking-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Truth-seeking.{' '}
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_100%]">
              Applied.
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Low frequency, high density essays on philosophy, systems thinking, 
            and practical wisdom for building in the exponential age.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="/essays"
              className="group relative inline-flex items-center gap-2 text-base font-medium bg-foreground text-background px-7 py-3.5 rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Read Essays</span>
              <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            
            <motion.a
              href="#subscribe"
              className="inline-flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-foreground px-7 py-3.5 rounded-lg border border-border/50 hover:border-border transition-all hover:bg-muted/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Updates
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div 
          className="w-5 h-8 border border-muted-foreground/20 rounded-full flex justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="w-0.5 h-2 bg-muted-foreground/30 rounded-full mt-1.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
