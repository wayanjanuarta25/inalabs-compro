'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function TrustSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden border-t transition-colors ${
        isLight
          ? 'bg-slate-100/60 border-black/[0.08]'
          : 'bg-[#070707] border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-8 sm:pb-12 mb-8 sm:mb-12 border-b ${
            isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
          }`}
        >
          <div>
            <span
              className={`text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase block mb-2 sm:mb-3 ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              {t.trust.kicker}
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-normal tracking-tight font-display transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.trust.title}
            </h3>
          </div>
          <p
            className={`text-xs font-mono ${
              isLight ? 'text-slate-500' : 'text-neutral-500'
            }`}
          >
            {t.trust.subtitle}
          </p>
        </div>

        {/* Minimal Editorial Sector Matrix - Balanced for Mobile & Tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {t.trust.sectors.map((sec, idx) => (
            <motion.div
              key={sec.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="space-y-1 p-2 sm:p-0"
            >
              <span
                className={`text-[10px] font-mono block ${
                  isLight ? 'text-slate-400' : 'text-neutral-600'
                }`}
              >
                {t.trust.sectorPrefix} 0{idx + 1}
              </span>
              <p
                className={`text-xs sm:text-sm font-normal font-display transition-colors ${
                  isLight ? 'text-slate-800' : 'text-neutral-300'
                }`}
              >
                {sec.name}
              </p>
              <p
                className={`text-[11px] sm:text-xs font-mono ${
                  isLight ? 'text-slate-500' : 'text-neutral-500'
                }`}
              >
                {sec.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
