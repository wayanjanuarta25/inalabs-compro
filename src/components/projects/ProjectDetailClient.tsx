'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Calendar,
  User,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { Project } from '@/types/project';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

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
          className={`rounded-3xl p-[1px] mb-12 shadow-2xl transition-all ${
            isLight
              ? 'bg-gradient-to-b from-black/[0.1] via-black/[0.04] to-transparent shadow-slate-200/50'
              : 'bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-cyan-500/10'
          }`}
        >
          <div
            className={`rounded-[23px] p-6 sm:p-10 border transition-colors ${
              isLight
                ? 'bg-white/95 backdrop-blur-2xl border-black/[0.06]'
                : 'bg-[#090912]/95 backdrop-blur-2xl border-white/[0.06]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 1:1 Large Showcase Image */}
              <div
                className={`lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden border shadow-xl ${
                  isLight ? 'border-black/[0.08]' : 'border-white/10'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-cyan-300 font-mono text-xs border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold uppercase">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Core Details */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 mb-2">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span className={isLight ? 'text-slate-500' : 'text-neutral-400'}>
                      {t.projectDetail.published} {dateFormatted}
                    </span>
                  </div>

                  <h1
                    className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight transition-colors ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {project.title}
                  </h1>

                  <p
                    className={`text-base sm:text-lg mt-4 leading-relaxed font-light ${
                      isLight ? 'text-slate-600' : 'text-neutral-300'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Metadata Tags */}
                <div
                  className={`grid grid-cols-2 gap-4 py-4 border-y ${
                    isLight ? 'border-black/[0.06]' : 'border-white/[0.06]'
                  }`}
                >
                  <div>
                    <p
                      className={`text-[11px] font-mono flex items-center gap-1.5 mb-1 ${
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
                      className={`text-[11px] font-mono flex items-center gap-1.5 mb-1 ${
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
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
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
                <div className="flex items-center gap-4 pt-2">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-medium shadow-lg shadow-blue-600/30 transition-all"
                    >
                      <span>{t.projectDetail.visitLive}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Link
                    href="/#contact"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-medium transition-colors border ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-500 mb-4">
                  <span>{t.projectDetail.challengeBadge}</span>
                </div>
                <h3
                  className={`text-xl font-bold font-display mb-3 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.challengeTitle}
                </h3>
                <p
                  className={`text-sm leading-relaxed font-light ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {caseStudy.challenge}
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-500 mb-4">
                  <span>{t.projectDetail.solutionBadge}</span>
                </div>
                <h3
                  className={`text-xl font-bold font-display mb-3 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.solutionTitle}
                </h3>
                <p
                  className={`text-sm leading-relaxed font-light ${
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
                className={`p-8 rounded-2xl border ${
                  isLight
                    ? 'bg-white border-black/[0.08] shadow-sm'
                    : 'bg-[#080808] border-white/[0.06]'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/20 border border-emerald-500/20 text-xs font-mono text-emerald-500 mb-4">
                  <span>{t.projectDetail.resultsBadge}</span>
                </div>
                <h3
                  className={`text-xl font-bold font-display mb-4 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.projectDetail.resultsTitle}
                </h3>
                <div className="space-y-3">
                  {caseStudy.results.map((res, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 text-sm font-light ${
                        isLight ? 'text-slate-700' : 'text-neutral-300'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
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
            className={`pt-12 border-t ${
              isLight ? 'border-black/[0.08]' : 'border-white/[0.08]'
            }`}
          >
            <h3
              className={`text-2xl font-bold font-display mb-6 ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              {t.projectDetail.exploreMore}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group rounded-2xl p-[1px] transition-all block"
                >
                  <div
                    className={`rounded-[15px] p-4 border transition-colors ${
                      isLight
                        ? 'bg-white border-black/[0.08] shadow-sm hover:border-black/[0.2]'
                        : 'bg-[#090912] border-white/[0.06] hover:border-white/[0.2]'
                    }`}
                  >
                    <div className="aspect-square w-full rounded-xl overflow-hidden mb-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
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
    </div>
  );
}
