'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function ContactSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'AI Systems & Engineering',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@inalabs.id';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281776803118';
  const phoneDisplay = '+62 817-7680-3118';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      className={`relative py-28 sm:py-36 overflow-hidden border-t transition-colors ${
        isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Editorial Statement & Studio Details */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span
                className={`text-[11px] font-mono tracking-[0.2em] uppercase block mb-4 ${
                  isLight ? 'text-slate-500' : 'text-neutral-500'
                }`}
              >
                {t.contact.kicker}
              </span>
              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] font-display transition-colors ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {t.contact.title1} <br />
                <span className={isLight ? 'text-slate-500' : 'text-neutral-500'}>
                  {t.contact.title2}
                </span>
              </h2>
            </div>

            <p
              className={`text-base font-light leading-relaxed max-w-md ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              {t.contact.description}
            </p>

            {/* Direct Studio Contact Lines - Pure Minimalist Typography */}
            <div
              className={`pt-8 border-t space-y-6 ${
                isLight ? 'border-black/[0.08]' : 'border-white/[0.07]'
              }`}
            >
              <div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.contact.generalInquiries}
                </span>
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className={`inline-flex items-center gap-2 text-base font-mono transition-colors ${
                    isLight
                      ? 'text-slate-950 hover:text-slate-700'
                      : 'text-white hover:text-neutral-300'
                  }`}
                >
                  <span>{contactEmail}</span>
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy
                      className={`w-3.5 h-3.5 ${
                        isLight ? 'text-slate-400' : 'text-neutral-500'
                      }`}
                    />
                  )}
                </button>
              </div>

              <div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.contact.directLine}
                </span>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base font-mono transition-colors ${
                    isLight
                      ? 'text-slate-700 hover:text-slate-950'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {phoneDisplay}
                </a>
              </div>

              <div>
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-slate-500' : 'text-neutral-500'
                  }`}
                >
                  {t.contact.studioHQ}
                </span>
                <p
                  className={`text-sm font-light ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {t.contact.studioHQValue}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Form with Large Spacing */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 sm:py-24 space-y-4"
              >
                <span className="text-xs font-mono text-emerald-500 tracking-wider uppercase block">
                  {t.contact.inquiryReceived}
                </span>
                <h3
                  className={`text-3xl font-normal font-display ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {t.contact.thankYou}
                </h3>
                <p
                  className={`text-sm font-light max-w-md leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}
                >
                  {t.contact.thankYouDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={`pt-6 text-xs font-mono underline underline-offset-4 ${
                    isLight
                      ? 'text-slate-600 hover:text-slate-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.contact.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
                {/* Field 1: Name */}
                <div className="space-y-2">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider block ${
                      isLight ? 'text-slate-500' : 'text-neutral-500'
                    }`}
                  >
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className={`w-full pb-3 bg-transparent border-b font-light text-base sm:text-lg transition-colors focus:outline-none ${
                      isLight
                        ? 'border-black/[0.15] focus:border-slate-950 text-slate-950 placeholder:text-slate-400'
                        : 'border-white/[0.12] focus:border-white text-white placeholder:text-neutral-600'
                    }`}
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-2">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider block ${
                      isLight ? 'text-slate-500' : 'text-neutral-500'
                    }`}
                  >
                    {t.contact.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full pb-3 bg-transparent border-b font-light text-base sm:text-lg transition-colors focus:outline-none ${
                      isLight
                        ? 'border-black/[0.15] focus:border-slate-950 text-slate-950 placeholder:text-slate-400'
                        : 'border-white/[0.12] focus:border-white text-white placeholder:text-neutral-600'
                    }`}
                  />
                </div>

                {/* Field 3: Scope */}
                <div className="space-y-2">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider block ${
                      isLight ? 'text-slate-500' : 'text-neutral-500'
                    }`}
                  >
                    {t.contact.scopeLabel}
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className={`w-full pb-3 bg-transparent border-b font-light text-base sm:text-lg transition-colors cursor-pointer focus:outline-none ${
                      isLight
                        ? 'border-black/[0.15] focus:border-slate-950 text-slate-950'
                        : 'border-white/[0.12] focus:border-white text-white'
                    }`}
                  >
                    {t.contact.scopeOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className={isLight ? 'bg-white text-slate-950' : 'bg-[#111111] text-white'}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 4: Message */}
                <div className="space-y-2">
                  <label
                    className={`text-xs font-mono uppercase tracking-wider block ${
                      isLight ? 'text-slate-500' : 'text-neutral-500'
                    }`}
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className={`w-full pb-3 bg-transparent border-b font-light text-base sm:text-lg transition-colors resize-none focus:outline-none ${
                      isLight
                        ? 'border-black/[0.15] focus:border-slate-950 text-slate-950 placeholder:text-slate-400'
                        : 'border-white/[0.12] focus:border-white text-white placeholder:text-neutral-600'
                    }`}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 disabled:opacity-50 active:scale-[0.98] ${
                      isLight
                        ? 'bg-slate-950 text-white hover:bg-slate-800'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isSubmitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
