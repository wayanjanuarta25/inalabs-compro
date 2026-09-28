'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';

export default function WorkProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      subtitle: 'Understanding business goals',
      desc: 'We analyze your workflows, identify high-friction bottlenecks, and define precise engineering & ROI metrics.',
      icon: Search,
      glow: 'border-blue-500/30 group-hover:border-blue-500'
    },
    {
      num: '02',
      title: 'Strategy',
      subtitle: 'Planning the right solution',
      desc: 'Formulating modular software architecture, data modeling, API contracts, and technology stack selection.',
      icon: Compass,
      glow: 'border-cyan-500/30 group-hover:border-cyan-500'
    },
    {
      num: '03',
      title: 'Design',
      subtitle: 'Creating modern experiences',
      desc: 'Crafting high-fidelity interactive wireframes, dark-mode design systems, and intuitive user journeys.',
      icon: Palette,
      glow: 'border-purple-500/30 group-hover:border-purple-500'
    },
    {
      num: '04',
      title: 'Development',
      subtitle: 'Building scalable products',
      desc: 'Writing clean, type-safe Next.js & backend code with rigorous CI/CD test coverage and AI agent orchestration.',
      icon: Code2,
      glow: 'border-indigo-500/30 group-hover:border-indigo-500'
    },
    {
      num: '05',
      title: 'Launch',
      subtitle: 'Deploy and optimize',
      desc: 'Production deployment with real-time telemetry monitoring, automated backups, and continuous performance tuning.',
      icon: Rocket,
      glow: 'border-emerald-500/30 group-hover:border-emerald-500'
    }
  ];

  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden bg-[#050508]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>SPRINT-READY METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
            How We Work
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Our systematic 5-phase delivery model ensures total transparency, rapid iteration, and enterprise-grade software shipped on schedule.
          </p>
        </div>

        {/* Illuminated Timeline Grid */}
        <div className="relative">
          {/* Connecting Line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-[2px] -translate-y-12 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 opacity-25" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.1] to-white/[0.02] hover:from-cyan-500/40 hover:to-blue-500/30 transition-all duration-300"
                >
                  <div className="h-full rounded-[15px] bg-[#090912]/95 backdrop-blur-xl p-6 flex flex-col justify-between border border-white/[0.04]">
                    <div>
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-display">
                          {step.num}
                        </span>
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs font-mono text-cyan-400/80 mb-3">
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-400 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-6 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-gray-500">
                      <span>PHASE 0{idx + 1}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
