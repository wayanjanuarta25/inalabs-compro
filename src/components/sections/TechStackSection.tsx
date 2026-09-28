'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Cloud, Sparkles, Layers } from 'lucide-react';

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'ai', label: 'AI & Automation' }
  ];

  const stacks = [
    // Frontend
    { name: 'React 19', category: 'frontend', glow: 'text-cyan-400 border-cyan-500/30', role: 'Component Architecture' },
    { name: 'Next.js 15', category: 'frontend', glow: 'text-white border-white/30', role: 'App Router & SSR' },
    { name: 'TypeScript', category: 'frontend', glow: 'text-blue-400 border-blue-500/30', role: 'Type-Safe Core' },
    { name: 'Tailwind CSS', category: 'frontend', glow: 'text-cyan-300 border-cyan-400/30', role: 'Modern Design System' },
    // Backend
    { name: 'Node.js', category: 'backend', glow: 'text-emerald-400 border-emerald-500/30', role: 'Asynchronous Runtime' },
    { name: 'NestJS', category: 'backend', glow: 'text-red-400 border-red-500/30', role: 'Enterprise Microservices' },
    { name: 'Python', category: 'backend', glow: 'text-amber-300 border-amber-500/30', role: 'AI & Data Pipelines' },
    // Database
    { name: 'PostgreSQL', category: 'database', glow: 'text-blue-300 border-blue-400/30', role: 'Relational & pgvector' },
    { name: 'Redis', category: 'database', glow: 'text-red-400 border-red-500/30', role: 'In-Memory High-Speed Cache' },
    // Cloud
    { name: 'AWS', category: 'cloud', glow: 'text-amber-400 border-amber-500/30', role: 'Scalable Infrastructure' },
    { name: 'Docker', category: 'cloud', glow: 'text-blue-400 border-blue-500/30', role: 'Container Orchestration' },
    { name: 'CI/CD Pipelines', category: 'cloud', glow: 'text-purple-400 border-purple-500/30', role: 'Automated Deployment' },
    // AI
    { name: 'OpenAI API', category: 'ai', glow: 'text-emerald-300 border-emerald-400/30', role: 'GPT-4o & Embeddings' },
    { name: 'Machine Learning', category: 'ai', glow: 'text-purple-300 border-purple-400/30', role: 'Predictive Classifiers' },
    { name: 'Automation Workflows', category: 'ai', glow: 'text-cyan-400 border-cyan-500/30', role: 'Multi-Agent Autonomous Loops' }
  ];

  const filtered = activeTab === 'all' ? stacks : stacks.filter((s) => s.category === activeTab);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 overflow-hidden bg-[#050508]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>CUTTING-EDGE ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-6">
            Technology We Use
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            We architect every solution using modern battle-tested technologies engineered for sub-second latency, zero downtime, and seamless scaling.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Floating Glowing Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-xl p-[1px] bg-gradient-to-b from-white/[0.08] to-transparent hover:from-cyan-500/40 hover:to-blue-500/30 transition-all"
            >
              <div className="h-full rounded-[11px] bg-[#090914] p-4 flex flex-col justify-between border border-white/[0.04]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase text-gray-500">
                    {item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
