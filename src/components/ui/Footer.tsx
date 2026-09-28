'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer
      className={`relative z-10 border-t transition-colors ${
        isLight
          ? 'bg-slate-50 border-black/[0.08] text-slate-600'
          : 'bg-[#050505] border-white/[0.07] text-neutral-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <img
                src="/images/logo-ci.png"
                alt="Inalabs Indonesia Logo"
                className={`w-7 h-7 object-contain transition-all duration-300 group-hover:scale-105 ${
                  isLight ? '' : 'invert brightness-125'
                }`}
              />
              <span
                className={`text-lg font-medium tracking-tight font-display ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                INALABS INDONESIA
              </span>
            </Link>

            <p
              className={`text-sm font-light max-w-sm leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              {t.footer.brandDesc}
            </p>

            <p
              className={`text-xs font-light max-w-sm leading-relaxed pt-1 ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              Jl. Raya Kalibata 2-9, RT.1, Rawajati, Kec. Pancoran, Kota Jakarta Selatan, DKI Jakarta 12750
            </p>

            <div
              className={`pt-2 flex items-center gap-4 text-xs font-mono ${
                isLight ? 'text-slate-500' : 'text-neutral-500'
              }`}
            >
              <span>JAKARTA &bull; TOKYO R&amp;D</span>
              <span>&bull;</span>
              <span>UTC+7 / UTC+9</span>
            </div>
          </div>

          {/* Index Links */}
          <div className="md:col-span-3 space-y-3">
            <span
              className={`text-xs font-mono uppercase tracking-widest block mb-2 ${
                isLight ? 'text-slate-900 font-semibold' : 'text-neutral-300'
              }`}
            >
              {t.footer.studioIndex}
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link
                  href="/#about"
                  className={
                    isLight
                      ? 'text-slate-600 hover:text-slate-950 transition-colors'
                      : 'text-neutral-400 hover:text-white transition-colors'
                  }
                >
                  {t.footer.idxAbout}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className={
                    isLight
                      ? 'text-slate-600 hover:text-slate-950 transition-colors'
                      : 'text-neutral-400 hover:text-white transition-colors'
                  }
                >
                  {t.footer.idxServices}
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className={
                    isLight
                      ? 'text-slate-600 hover:text-slate-950 transition-colors'
                      : 'text-neutral-400 hover:text-white transition-colors'
                  }
                >
                  {t.footer.idxProjects}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className={
                    isLight
                      ? 'text-slate-600 hover:text-slate-950 transition-colors'
                      : 'text-neutral-400 hover:text-white transition-colors'
                  }
                >
                  {t.footer.idxContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Communication / Socials */}
          <div className="md:col-span-4 space-y-3">
            <span
              className={`text-xs font-mono uppercase tracking-widest block mb-2 ${
                isLight ? 'text-slate-900 font-semibold' : 'text-neutral-300'
              }`}
            >
              {t.footer.comms}
            </span>
            <div className="space-y-1 text-xs font-mono">
              <p className={isLight ? 'text-slate-800' : 'text-neutral-300'}>
                hello@inalabs.id
              </p>
              <a
                href="https://wa.me/6281776803118"
                target="_blank"
                rel="noopener noreferrer"
                className={`block transition-colors ${
                  isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-500 hover:text-white'
                }`}
              >
                +62 817-7680-3118
              </a>
            </div>

            <div
              className={`pt-4 flex items-center gap-2 ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              <a
                href="https://github.com/inalabs-indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isLight
                    ? 'bg-black/[0.04] hover:bg-black/[0.08] hover:text-slate-950'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] hover:text-white'
                }`}
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isLight
                    ? 'bg-black/[0.04] hover:bg-black/[0.08] hover:text-slate-950'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] hover:text-white'
                }`}
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isLight
                    ? 'bg-black/[0.04] hover:bg-black/[0.08] hover:text-slate-950'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] hover:text-white'
                }`}
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Studio Colophon Bottom Bar */}
        <div
          className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
            isLight
              ? 'border-black/[0.08] text-slate-500'
              : 'border-white/[0.07] text-neutral-500'
          }`}
        >
          <p>&copy; {new Date().getFullYear()} Inalabs Indonesia. {t.footer.allRightsReserved}</p>
          <p className={isLight ? 'text-slate-400' : 'text-neutral-600'}>
            {t.footer.colophon}
          </p>
        </div>
      </div>
    </footer>
  );
}
