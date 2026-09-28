'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function ServicesSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="services"
      className={`relative py-28 sm:py-36 overflow-hidden border-t transition-colors ${
        isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 sm:mb-24">
          <div>
            <span
              className={`text-[11px] font-mono tracking-[0.2em] uppercase block mb-4 ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              {t.services.kicker}
            </span>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] font-display transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.services.title1} <br />
              <span className={isLight ? 'text-slate-500' : 'text-neutral-500'}>
                {t.services.title2}
              </span>
            </h2>
          </div>
          <p
            className={`text-sm max-w-sm font-light leading-relaxed transition-colors ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* Asymmetric Services Layout - Large Typography, Minimal Borders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {t.services.items.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${service.colSpan} relative rounded-2xl p-8 sm:p-12 transition-all duration-300 flex flex-col justify-between group ${
                isLight
                  ? 'bg-white border border-black/[0.08] hover:border-black/[0.22] shadow-sm'
                  : 'bg-[#080808] border border-white/[0.07] hover:border-white/[0.18]'
              }`}
            >
              <div>
                {/* Number & Service Category */}
                <div
                  className={`flex items-center justify-between pb-8 mb-8 border-b ${
                    isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
                  }`}
                >
                  <span
                    className={`text-2xl sm:text-3xl font-light font-mono tracking-tighter ${
                      isLight ? 'text-slate-400' : 'text-neutral-500'
                    }`}
                  >
                    {service.number}
                  </span>
                  <span
                    className={`text-xs font-mono tracking-widest uppercase ${
                      isLight ? 'text-slate-600 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {service.title}
                  </span>
                </div>

                {/* Large Editorial Headline */}
                <h3
                  className={`text-2xl sm:text-3xl lg:text-[2rem] font-normal tracking-tight leading-[1.2] mb-6 font-display transition-colors ${
                    isLight
                      ? 'text-slate-950 group-hover:text-slate-800'
                      : 'text-white group-hover:text-neutral-200'
                  }`}
                >
                  {service.headline}
                </h3>

                {/* Narrative Description */}
                <p
                  className={`text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {service.description}
                </p>
              </div>

              {/* Technologies / Deliverables */}
              <div
                className={`pt-6 border-t flex flex-wrap items-center gap-2 ${
                  isLight ? 'border-black/[0.06]' : 'border-white/[0.05]'
                }`}
              >
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors ${
                      isLight
                        ? 'bg-slate-100 border border-black/[0.06] text-slate-600'
                        : 'bg-white/[0.02] border border-white/[0.04] text-neutral-500'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
