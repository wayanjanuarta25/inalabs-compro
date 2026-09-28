'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="about"
      className={`relative py-28 sm:py-36 overflow-hidden border-t transition-colors ${
        isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 sm:mb-32">
          
          {/* Left: Large Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <span
              className={`text-[11px] font-mono tracking-[0.2em] uppercase block mb-6 ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              {t.about.kicker}
            </span>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] font-display transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.about.title1} <br />
              <span className={isLight ? 'text-slate-500' : 'text-neutral-500'}>
                {t.about.title2}
              </span>
            </h2>
          </motion.div>

          {/* Right: Short Story & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 pt-2"
          >
            <p
              className={`text-xl sm:text-2xl leading-relaxed font-light transition-colors ${
                isLight ? 'text-slate-800' : 'text-neutral-200'
              }`}
            >
              {t.about.story1}
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed font-light max-w-xl transition-colors ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              {t.about.story2}
            </p>

            <div
              className={`pt-4 flex items-center gap-6 text-xs font-mono ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLight ? 'bg-slate-500' : 'bg-neutral-400'
                  }`}
                />
                <span>{t.about.badgeStudio}</span>
              </span>
              <span>{t.about.badgeLocation}</span>
            </div>
          </motion.div>

        </div>

        {/* Small Capability List - Clean Editorial Grid, NO Cards */}
        <div
          className={`pt-12 border-t transition-colors ${
            isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <span
              className={`text-xs font-mono tracking-[0.2em] uppercase ${
                isLight ? 'text-slate-600 font-semibold' : 'text-neutral-500'
              }`}
            >
              {t.about.capabilitiesTitle}
            </span>
            <span
              className={`text-xs font-mono ${
                isLight ? 'text-slate-400' : 'text-neutral-600'
              }`}
            >
              {t.about.capabilitiesSub}
            </span>
          </div>

          <div
            className={`divide-y transition-colors ${
              isLight ? 'divide-black/[0.08]' : 'divide-white/[0.07]'
            }`}
          >
            {t.about.capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-colors duration-300 ${
                  isLight ? 'hover:bg-black/[0.02]' : 'hover:bg-white/[0.015]'
                }`}
              >
                <div
                  className={`md:col-span-2 text-xs font-mono transition-colors ${
                    isLight
                      ? 'text-slate-500 group-hover:text-slate-900'
                      : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                >
                  {cap.index}
                </div>

                <div className="md:col-span-4">
                  <h3
                    className={`text-xl sm:text-2xl font-normal tracking-tight group-hover:translate-x-1 transition-transform duration-300 font-display ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {cap.title}
                  </h3>
                </div>

                <div className="md:col-span-5">
                  <p
                    className={`text-sm leading-relaxed font-light ${
                      isLight ? 'text-slate-600' : 'text-neutral-400'
                    }`}
                  >
                    {cap.description}
                  </p>
                </div>

                <div className="hidden md:flex md:col-span-1 justify-end">
                  <ArrowUpRight
                    className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${
                      isLight
                        ? 'text-slate-400 group-hover:text-slate-900'
                        : 'text-neutral-600 group-hover:text-white'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
