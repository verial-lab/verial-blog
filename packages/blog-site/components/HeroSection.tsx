'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* 3D Hero Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-[min(80vw,600px)] h-[min(80vw,600px)] object-contain opacity-40"
          src="/hero-3d.mp4"
        />
        {/* Radial fade so edges blend into black bg */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,transparent_30%,black_75%)]" />
      </div>

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
            <span className="w-8 h-px bg-muted-foreground/20" />
            Essays &middot; Philosophy &middot; Systems
            <span className="w-8 h-px bg-muted-foreground/20" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-normal leading-[1.15] tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Truth-seeking.{' '}
            <span className="text-foreground/70">
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
              className="group relative inline-flex items-center gap-2 text-base font-medium bg-foreground text-background px-7 py-3.5 rounded-lg overflow-hidden transition-all hover:opacity-90"
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
    </section>
  );
}
