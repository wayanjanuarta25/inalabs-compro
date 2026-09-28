'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, ShieldCheck, HeartHandshake, Sparkles, CheckCircle } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUsSection() {
  const stats = [
    {
      value: 50,
      suffix: '+',
      title: 'Digital Projects Completed',
      subtitle: 'From enterprise portals to AI microservices',
      icon: Award,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      value: 20,
      suffix: '+',
      title: 'Business Partners',
      subtitle: 'Trusted across Indonesian & APAC tech ecosystem',
      icon: Users,
      color: 'from-purple-500 to-indigo-400'
    },
    {
      value: 5,
      suffix: '+',
      title: 'Years Experience',
      subtitle: 'Deep domain mastery in software engineering',
      icon: ShieldCheck,
      color: 'from-cyan-400 to-blue-600'
    },
    {
      value: 99,
      suffix: '%',
      title: 'Client Satisfaction',
      subtitle: 'Benchmark client feedback across all deliverables',
      icon: HeartHandshake,
      color: 'from-emerald-400 to-teal-400'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEASURABLE EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
            Why Choose Inalabs Indonesia
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            We don&apos;t just write code; we partner with forward-thinking leadership to eliminate operational bottlenecks, ship mission-critical software, and unlock tangible ROI.
          </p>
        </div>

        {/* Animated Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.1] to-white/[0.02] hover:from-blue-500/40 hover:to-cyan-500/30 transition-all duration-300"
              >
                <div className="h-full rounded-[15px] bg-[#090912]/90 backdrop-blur-xl p-7 flex flex-col justify-between border border-white/[0.04]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">
                        METRIC #0{idx + 1}
                      </span>
                    </div>

                    <div className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-3 flex items-baseline">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {stat.title}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {stat.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
