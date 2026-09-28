'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/project';
import { fetchAllProjects } from '@/lib/projectService';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

type FilterKey = 'all' | 'toolsAutomation' | 'webCompanyProfile' | 'designGraphic' | 'contentAI';

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isLight = theme === 'light';

  const loadProjects = async () => {
    try {
      const res = await fetchAllProjects();
      setProjects(res.projects);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener('inalabs_projects_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('inalabs_projects_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (activeFilter === 'all') return true;
      const cat = (p.category || '').toLowerCase();
      if (activeFilter === 'toolsAutomation') {
        return (
          cat.includes('tools') ||
          cat.includes('automation') ||
          cat.includes('engineering') ||
          cat.includes('software')
        );
      }
      if (activeFilter === 'webCompanyProfile') {
        return (
          cat.includes('profile') ||
          cat.includes('website') ||
          cat.includes('web') ||
          cat.includes('digital') ||
          cat.includes('portal')
        );
      }
      if (activeFilter === 'designGraphic') {
        return (
          cat.includes('design') ||
          cat.includes('graphic') ||
          cat.includes('branding') ||
          cat.includes('mobile')
        );
      }
      if (activeFilter === 'contentAI') {
        return (
          cat.includes('content') ||
          cat.includes('ai') ||
          cat.includes('intelligence')
        );
      }
      return true;
    });
  }, [projects, activeFilter]);

  const filterTabs: Array<{ key: FilterKey; label: string }> = [
    { key: 'all', label: t.portfolio.filters.all },
    { key: 'toolsAutomation', label: t.portfolio.filters.toolsAutomation },
    { key: 'webCompanyProfile', label: t.portfolio.filters.webCompanyProfile },
    { key: 'designGraphic', label: t.portfolio.filters.designGraphic },
    { key: 'contentAI', label: t.portfolio.filters.contentAI },
  ];

  return (
    <section
      id="projects"
      className={`relative py-28 sm:py-36 overflow-hidden border-t transition-colors ${
        isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span
              className={`text-[11px] font-mono tracking-[0.2em] uppercase block mb-4 ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              {t.portfolio.kicker}
            </span>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] font-display transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.portfolio.title}
            </h2>
          </div>

          {/* Dynamic Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap ${
                  activeFilter === tab.key
                    ? isLight
                      ? 'bg-slate-950 text-white font-medium shadow-xs'
                      : 'bg-white text-black font-medium shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-black/[0.04]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards in 1 Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between group ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-xs hover:border-black/[0.22] hover:shadow-md'
                    : 'bg-[#090909] border-white/[0.07] hover:border-white/[0.2] shadow-xl'
                }`}
              >
                <Link href={`/projects/${project.slug}`} className="flex flex-col h-full justify-between">
                  <div>
                    {/* Image Container (16:10 ratio) */}
                    <div
                      className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border transition-all ${
                        isLight
                          ? 'bg-slate-100 border-black/[0.06]'
                          : 'bg-[#111111] border-white/[0.06]'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Category & Featured Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/[0.12] text-[10px] font-mono text-neutral-200">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-600/90 text-[9px] font-mono text-white font-semibold uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4
                        className={`text-base font-medium tracking-tight font-display line-clamp-1 transition-colors ${
                          isLight
                            ? 'text-slate-950 group-hover:text-blue-600'
                            : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {project.title}
                      </h4>
                      <ArrowUpRight
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isLight
                            ? 'text-slate-400 group-hover:text-blue-600'
                            : 'text-neutral-500 group-hover:text-white'
                        }`}
                      />
                    </div>

                    {/* Description */}
                    <p
                      className={`text-xs font-light leading-relaxed line-clamp-2 mb-4 ${
                        isLight ? 'text-slate-600' : 'text-neutral-400'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div
                    className={`flex items-center justify-between text-[11px] font-mono pt-3 border-t mt-2 ${
                      isLight
                        ? 'border-black/[0.06] text-slate-500'
                        : 'border-white/[0.05] text-neutral-500'
                    }`}
                  >
                    <span className="truncate max-w-[130px]">
                      {project.technologies.slice(0, 2).join(' / ')}
                    </span>
                    <span>{new Date(project.created_at).getFullYear()}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm font-mono text-neutral-500">
              Tidak ada proyek ditemukan dalam kategori ini.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
