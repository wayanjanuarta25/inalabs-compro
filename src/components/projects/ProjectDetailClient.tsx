'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Calendar,
  User,
  ShieldAlert,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';
import { Project } from '@/types/project';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import ImageLightbox, { LightboxData } from '@/components/ui/ImageLightbox';

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [lightboxData, setLightboxData] = useState<LightboxData | null>(null);
  const isLight = theme === 'light';
  const caseStudy = project.case_study;

  const dateFormatted = new Date(project.created_at).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { year: 'numeric', month: 'short' }
  );

  return (
    <div
      className={`min-h-screen pt-28 pb-24 relative overflow-hidden transition-colors ${
        isLight ? 'bg-[var(--bg-main)] text-slate-800' : 'text-neutral-300'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 ${
          isLight ? 'bg-blue-400/[0.08]' : 'bg-blue-600/10'
        }`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className={`inline-flex items-center gap-2 text-xs font-mono transition-colors ${
              isLight
                ? 'text-slate-500 hover:text-slate-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.projectDetail.backToProjects}</span>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div
          className={`rounded-3xl p-[1px] mb-10 sm:mb-12 shadow-2xl transition-all ${
            isLight
              ? 'bg-gradient-to-b from-black/[0.1] via-black/[0.04] to-transparent shadow-slate-200/50'
              : 'bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-cyan-500/10'
          }`}
        >
          <div
            className={`rounded-[23px] p-4 sm:p-7 lg:p-10 border transition-colors ${
              isLight
                ? 'bg-white/95 backdrop-blur-2xl border-black/[0.06]'
                : 'bg-[#090912]/95 backdrop-blur-2xl border-white/[0.06]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Responsive Showcase Image (16:9 landscape ratio - Clickable) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setLightboxData({
                    image: project.image,
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    projectUrl: project.project_url,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setLightboxData({
                      image: project.image,
                      title: project.title,
                      category: project.category,
                      description: project.description,
                      projectUrl: project.project_url,
                    });
                  }
                }}
                className={`lg:col-span-6 relative aspect-video w-full rounded-2xl overflow-hidden border shadow-xl cursor-zoom-in group/heroimg transition-all ${
                  isLight ? 'border-black/[0.08]' : 'border-white/10'
                }`}
                title="Klik untuk memperbesar gambar"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover/heroimg:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-black/70 backdrop-blur-md text-cyan-300 font-mono text-[11px] sm:text-xs border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-blue-600 text-white font-mono text-[10px] sm:text-xs font-bold uppercase">
                      Featured
                    </span>
                  )}
                </div>

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/heroimg:opacity-100 transition-opacity duration-200 bg-black/30 pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 shadow-xl">
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                    <span>Perbesar Gambar (16:9)</span>
                  </span>
                </div>
              </div>

              {/* Core Details */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 mb-2">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className={isLight ? 'text-slate-500' : 'text-neutral-400'}>
                      {t.projectDetail.published} {dateFormatted}
                    </span>
                  </div>

                  <h1
                    className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight transition-colors ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {project.title}
                  </h1>

                  <p
                    className={`text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 leading-relaxed font-light ${
                      isLight ? 'text-slate-600' : 'text-neutral-300'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Metadata Tags */}
                <div
                  className={`grid grid-cols-2 gap-3 sm:gap-4 py-4 border-y ${
                    isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
                  }`}
                >
                  <div>
                    <p
                      className={`text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 mb-1 ${
                        isLight ? 'text-slate-500' : 'text-neutral-400'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{t.projectDetail.engagementPartner}</span>
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {caseStudy?.client || t.projectDetail.defaultPartner}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 mb-1 ${
                        isLight ? 'text-slate-500' : 'text-neutral-400'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple-500" />
                      <span>{t.projectDetail.timeline}</span>
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {caseStudy?.timeline || t.projectDetail.defaultTimeline}
                    </p>
                  </div>
                </div>

                {/* Tech Chips */}
                <div>
                  <p
                    className={`text-xs font-mono mb-2 ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    {t.projectDetail.techLibraries}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-mono border transition-colors ${
                          isLight
                            ? 'bg-slate-100 border-black/[0.08] text-slate-800'
                            : 'bg-white/[0.04] border-white/[0.08] text-cyan-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-medium shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
                    >
                      <span>{t.projectDetail.visitLive}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Link
                    href="/#contact"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-medium transition-colors border active:scale-[0.98] ${
                      isLight
                        ? 'border-black/[0.12] hover:border-black/30 text-slate-700 hover:text-slate-950'
                        : 'border-white/10 hover:border-cyan-500/40 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{t.projectDetail.requestSimilar}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Case Study Breakdown */}
        {caseStudy && (
          <div className="space-y-8 mb-16">
            {/* Disclaimer badge */}
            <div
              className={`flex items-center gap-2 p-3.5 rounded-xl border text-xs font-mono ${
                isLight
                  ? 'bg-slate-50 border-black/[0.08] text-slate-600'
                  : 'bg-white/[0.02] border-white/[0.08] text-neutral-400'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>{t.projectDetail.demoDisclaimer}</span>
            </div>

            {/* Metrics Highlight Grid */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {caseStudy.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isLight
                        ? 'bg-white border-black/[0.08] shadow-sm'
                        : 'bg-[#080808] border-white/[0.06]'
                    }`}
                  >
                    <p
                      className={`text-xs font-mono mb-2 ${
                        isLight ? 'text-slate-500' : 'text-neutral-400'
                      }`}
                    >
                      {m.label}
                    </p>
                    <p
                      className={`text-3xl sm:text-4xl font-extrabold font-display ${
                        isLight ? 'text-blue-600' : 'text-white'
                      }`}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div
                className={`p-5 sm:p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-500 mb-4">
                  <span>{t.projectDetail.challengeBadge}</span>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold font-display mb-3 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.challengeTitle}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-light ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {caseStudy.challenge}
                </p>
              </div>

              <div
                className={`p-5 sm:p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-500 mb-4">
                  <span>{t.projectDetail.solutionBadge}</span>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold font-display mb-3 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.solutionTitle}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-light ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Results & Key Deliverables */}
            {caseStudy.results && caseStudy.results.length > 0 && (
              <div
                className={`p-5 sm:p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/20 border border-emerald-500/20 text-xs font-mono text-emerald-500 mb-4">
                  <span>{t.projectDetail.resultsBadge}</span>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold font-display mb-4 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.resultsTitle}
                </h3>
                <div className="space-y-3">
                  {caseStudy.results.map((res, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-light ${
                        isLight ? 'text-slate-700' : 'text-neutral-300'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div
            className={`pt-10 sm:pt-12 border-t ${
              isLight ? 'border-black/[0.08]' : 'border-white/[0.08]'
            }`}
          >
            <h3
              className={`text-xl sm:text-2xl font-bold font-display mb-6 ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.projectDetail.exploreMore}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group rounded-2xl p-[1px] transition-all block"
                >
                  <div
                    className={`rounded-[15px] p-3.5 sm:p-4 border transition-colors ${
                      isLight
                        ? 'bg-white border-black/[0.08] shadow-sm hover:border-black/[0.2]'
                        : 'bg-[#090912] border-white/[0.06] hover:border-white/[0.2]'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLightboxData({
                          image: p.image,
                          title: p.title,
                          category: p.category,
                          description: p.description,
                          slug: p.slug,
                          projectUrl: p.project_url,
                        });
                      }}
                      className="relative aspect-video w-full rounded-xl overflow-hidden mb-3 cursor-zoom-in group/rel"
                      title="Klik untuk melihat pratinjau gambar"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/rel:opacity-100 transition-opacity bg-black/35 pointer-events-none">
                        <span className="p-1.5 rounded-full bg-black/80 text-white border border-white/20">
                          <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-500">{p.category}</span>
                    <h4
                      className={`text-sm font-bold line-clamp-1 mt-1 transition-colors ${
                        isLight
                          ? 'text-slate-900 group-hover:text-blue-600'
                          : 'text-white group-hover:text-cyan-300'
                      }`}
                    >
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      <ImageLightbox
        isOpen={!!lightboxData}
        onClose={() => setLightboxData(null)}
        data={lightboxData}
      />
    </div>
  );
}
