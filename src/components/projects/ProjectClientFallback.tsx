'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Project } from '@/types/project';
import { getLocalProjects } from '@/lib/projectService';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface ProjectClientFallbackProps {
  slug: string;
}

export default function ProjectClientFallback({ slug }: ProjectClientFallbackProps) {
  const [project, setProject] = useState<Project | null | 'loading'>('loading');
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const all = getLocalProjects();
    const found = all.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    if (found) {
      setProject(found);
      const related = all
        .filter((p) => p.slug.toLowerCase() !== slug.toLowerCase())
        .slice(0, 3);
      setRelatedProjects(related);
    } else {
      setProject(null);
    }
  }, [slug]);

  if (project === 'loading') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-neutral-400">
            {language === 'id' ? 'Memuat proyek...' : 'Loading project...'}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-16 px-4">
        <div
          className={`max-w-md w-full rounded-2xl p-8 border text-center transition-colors ${
            isLight
              ? 'bg-white border-black/[0.08] shadow-lg'
              : 'bg-[#0a0a0a] border-white/[0.08]'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h2
            className={`text-xl font-bold font-display mb-2 ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {language === 'id' ? 'Proyek Tidak Ditemukan' : 'Project Not Found'}
          </h2>
          <p
            className={`text-xs font-light leading-relaxed mb-6 ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            {language === 'id'
              ? `Proyek dengan slug "${slug}" tidak ditemukan di database maupun penyimpanan lokal browser Anda.`
              : `The project with slug "${slug}" could not be found in the database or local storage.`}
          </p>
          <Link
            href="/#projects"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
              isLight
                ? 'bg-slate-950 text-white hover:bg-slate-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Kembali ke Portofolio' : 'Back to Projects'}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProjectDetailClient
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
