'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  // Subtle interactive 3D tilt effect on the sculpture
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle soft ambient glow - sophisticated, never oversaturated */}
      <div
        className={`absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10 ${
          isLight ? 'bg-blue-500/[0.06]' : 'bg-blue-600/[0.04]'
        }`}
      />
      <div
        className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[150px] pointer-events-none -z-10 ${
          isLight ? 'bg-indigo-500/[0.05]' : 'bg-purple-600/[0.03]'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Minimal Studio Kicker */}
            <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 flex-wrap">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLight ? 'bg-slate-700' : 'bg-white/70'
                }`}
              />
              <span
                className={`text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase ${
                  isLight ? 'text-slate-600' : 'text-neutral-400'
                }`}
              >
                {t.hero.kickerStudio}
              </span>
              <span className={isLight ? 'text-slate-300' : 'text-neutral-700'}>/</span>
              <span
                className={`text-[10px] sm:text-[11px] font-mono tracking-wider ${
                  isLight ? 'text-slate-500' : 'text-neutral-500'
                }`}
              >
                {t.hero.kickerLocation}
              </span>
            </div>

            {/* Editorial Statement */}
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight sm:tracking-[-0.035em] leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-8 font-display transition-colors break-words ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.hero.titleMain} <br className="hidden sm:inline" />
              <span className={isLight ? 'text-slate-500' : 'text-neutral-400'}>
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl font-light transition-colors ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              {t.hero.description}
            </p>

            {/* Clean, High-Precision Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto">
              <Link
                href="/#contact"
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 active:scale-[0.98] ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800 shadow-sm'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <span>{t.hero.startProject}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#projects"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isLight
                    ? 'bg-transparent hover:bg-black/[0.04] border border-black/[0.12] hover:border-black/[0.25] text-slate-700 hover:text-slate-950'
                    : 'bg-transparent hover:bg-white/[0.05] border border-white/[0.12] hover:border-white/[0.25] text-neutral-300 hover:text-white'
                }`}
              >
                <span>{t.hero.selectedProjects}</span>
                <ArrowUpRight
                  className={`w-4 h-4 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}
                />
              </Link>
            </div>

            {/* Editorial Small Metrics - Pure Typography, No SaaS Cards */}
            <div
              className={`w-full pt-6 sm:pt-8 border-t grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 transition-colors ${
                isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
              }`}
            >
              <div>
                <p
                  className={`text-2xl sm:text-3xl font-normal tracking-tight font-display transition-colors ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  50
                  <span
                    className={`font-light ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}
                  >
                    +
                  </span>
                </p>
                <p
                  className={`text-[10px] sm:text-xs tracking-wider uppercase font-mono mt-1 leading-snug ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.hero.metricsProjects}
                </p>
              </div>

              <div>
                <p
                  className={`text-2xl sm:text-3xl font-normal tracking-tight font-display transition-colors ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  10
                  <span
                    className={`font-light ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}
                  >
                    +
                  </span>
                </p>
                <p
                  className={`text-[10px] sm:text-xs tracking-wider uppercase font-mono mt-1 leading-snug ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.hero.metricsIndustries}
                </p>
              </div>

              <div>
                <p
                  className={`text-2xl sm:text-3xl font-normal tracking-tight font-display transition-colors ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  5
                  <span
                    className={`font-light font-sans text-xl ml-0.5 ${
                      isLight ? 'text-slate-400' : 'text-neutral-500'
                    }`}
                  >
                    {t.hero.metricsYears}
                  </span>
                </p>
                <p
                  className={`text-[10px] sm:text-xs tracking-wider uppercase font-mono mt-1 leading-snug ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.hero.metricsYearsLabel}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Unique Abstract Visual (Innovation Laboratory) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center w-full"
          >
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className={`relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[480px] aspect-square rounded-2xl overflow-hidden p-[1px] shadow-2xl transition-colors mx-auto ${
                isLight
                  ? 'bg-gradient-to-b from-black/[0.12] via-black/[0.04] to-transparent'
                  : 'bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent'
              }`}
              style={{ perspective: 1000 }}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className={`relative w-full h-full rounded-[15px] overflow-hidden group cursor-crosshair ${
                  isLight ? 'bg-slate-900' : 'bg-[#080808]'
                }`}
              >
                {/* Visual Asset: Innovation Laboratory Digital Sculpture */}
                <img
                  src="/images/hero-sculpture.jpg"
                  alt="Inalabs Innovation Laboratory Kinetic Core"
                  className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-[1.08] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  loading="eager"
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Studio Telemetry Metadata Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                  <span className="px-2 py-0.5 sm:py-1 rounded bg-black/60 backdrop-blur-md border border-white/[0.12] text-[9px] sm:text-[10px] font-mono text-neutral-200 tracking-wider">
                    {t.hero.sculptureBadge}
                  </span>
                </div>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1.5 px-2 py-0.5 sm:py-1 rounded bg-black/60 backdrop-blur-md border border-white/[0.12] text-[9px] sm:text-[10px] font-mono text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{t.hero.sculptureStatus}</span>
                </div>

                {/* Bottom Architectural Caption */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 p-2.5 sm:p-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/[0.12] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white tracking-tight truncate">
                      {t.hero.sculptureTitle}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-neutral-300 font-mono mt-0.5 truncate">
                      {t.hero.sculptureDesc}
                    </p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 shrink-0">
                    {t.hero.sculptureSys}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
