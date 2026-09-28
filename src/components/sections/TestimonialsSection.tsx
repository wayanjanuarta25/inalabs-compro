'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote, ShieldAlert, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/initialProjects';

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PARTNER PERSPECTIVES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
            Client Testimonials
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Hear from industry leaders and concept collaborators who experienced Inalabs Indonesia&apos;s digital engineering firsthand.
          </p>

          <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-gray-400">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transparency Notice: Showcase demo reviews illustrative of R&D deliverables</span>
          </div>
        </div>

        {/* Testimonials Dark Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.1] to-white/[0.02] hover:from-blue-500/30 hover:to-cyan-500/20 transition-all duration-300"
            >
              <div className="h-full rounded-[15px] bg-[#090912]/90 backdrop-blur-xl p-7 flex flex-col justify-between border border-white/[0.04]">
                <div>
                  {/* Star Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <MessageSquareQuote className="w-6 h-6 text-cyan-400/40" />
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-cyan-400/40 p-0.5"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {t.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {t.role}
                    </p>
                    <p className="text-[11px] font-mono text-cyan-400">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
