'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.projects, href: '/#projects' },
    { name: t.nav.contact, href: '/#contact' },
  ];

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'py-3.5 bg-white/85 backdrop-blur-xl border-b border-black/[0.07] shadow-sm'
            : 'py-3.5 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.07]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Minimal Precision Studio */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/logo-ci.png"
              alt="Inalabs Indonesia"
              className={`w-7 h-7 object-contain transition-all duration-300 group-hover:scale-105 ${
                isLight ? '' : 'invert brightness-125'
              }`}
            />
            <span
              className={`font-medium tracking-tight text-base sm:text-lg font-display transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              INALABS
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase ml-1">
              INDONESIA
            </span>
          </Link>

          {/* Desktop Navigation - Subtle Pill */}
          <nav
            className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full transition-colors ${
              isLight
                ? 'bg-black/[0.03] border border-black/[0.08]'
                : 'bg-white/[0.03] border border-white/[0.07]'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1 text-xs font-mono rounded-full transition-colors duration-200 ${
                  isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-black/[0.04]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Controls & Clean Studio Button (Desktop md and up) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <div
              className={`flex items-center p-0.5 rounded-full border text-[11px] font-mono transition-colors ${
                isLight
                  ? 'bg-black/[0.04] border-black/[0.08]'
                  : 'bg-white/[0.04] border-white/[0.08]'
              }`}
              title={t.nav.switchLang}
            >
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  language === 'id'
                    ? isLight
                      ? 'bg-white text-slate-950 shadow-xs font-semibold'
                      : 'bg-white text-black shadow-xs font-semibold'
                    : isLight
                    ? 'text-slate-500 hover:text-slate-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  language === 'en'
                    ? isLight
                      ? 'bg-white text-slate-950 shadow-xs font-semibold'
                      : 'bg-white text-black shadow-xs font-semibold'
                    : isLight
                    ? 'text-slate-500 hover:text-slate-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${
                isLight
                  ? 'bg-black/[0.04] border-black/[0.08] text-slate-700 hover:text-slate-950 hover:bg-black/[0.08]'
                  : 'bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:text-white hover:bg-white/[0.08]'
              }`}
              aria-label={isLight ? t.nav.toggleThemeDark : t.nav.toggleThemeLight}
              title={isLight ? t.nav.toggleThemeDark : t.nav.toggleThemeLight}
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="w-3.5 h-3.5 transition-transform duration-300 hover:rotate-45" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/#contact"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-tight transition-all duration-200 active:scale-[0.98] ${
                isLight
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <span>{t.nav.initiateProject}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile & Tablet Actions (< md): Quick Controls & Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            {/* Quick Language Toggle Pill */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              className={`px-2.5 py-1 rounded-full border text-[11px] font-mono transition-colors ${
                isLight
                  ? 'bg-black/[0.04] border-black/[0.1] text-slate-900 font-semibold'
                  : 'bg-white/[0.05] border-white/[0.12] text-white font-semibold'
              }`}
              aria-label={t.nav.switchLang}
            >
              {language.toUpperCase()}
            </button>

            {/* Quick Theme Toggle on Mobile Bar */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-colors ${
                isLight
                  ? 'bg-black/[0.04] border-black/[0.1] text-slate-800'
                  : 'bg-white/[0.05] border-white/[0.12] text-neutral-300'
              }`}
              aria-label={isLight ? t.nav.toggleThemeDark : t.nav.toggleThemeLight}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                isLight
                  ? 'text-slate-800 border-black/[0.1] hover:bg-black/[0.04]'
                  : 'text-neutral-400 hover:text-white border-white/[0.08] hover:bg-white/[0.04]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-3 p-4 sm:p-5 rounded-2xl border shadow-2xl flex flex-col gap-2.5 transition-colors ${
              isLight
                ? 'bg-white/95 backdrop-blur-2xl border-black/[0.08]'
                : 'bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/[0.08]'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 text-sm font-mono rounded-xl transition-colors ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-black/[0.03]'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Controls Row (Language & Theme) */}
            <div
              className={`pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                isLight ? 'border-black/[0.06]' : 'border-white/[0.07]'
              }`}
            >
              {/* Language Switch */}
              <div className="flex items-center gap-1 text-xs font-mono">
                <Globe className={`w-3.5 h-3.5 mr-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`} />
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    language === 'id'
                      ? isLight
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-white text-black font-semibold'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    language === 'en'
                      ? isLight
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-white text-black font-semibold'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                  isLight
                    ? 'bg-slate-100 border-black/[0.08] text-slate-800'
                    : 'bg-white/[0.05] border-white/[0.08] text-neutral-300'
                }`}
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {/* CTA */}
            <div
              className={`pt-2 border-t ${
                isLight ? 'border-black/[0.06]' : 'border-white/[0.07]'
              }`}
            >
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-medium transition-all ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <span>{t.nav.initiateProject}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
