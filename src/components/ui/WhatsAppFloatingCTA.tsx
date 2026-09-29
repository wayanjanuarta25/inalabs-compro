'use client';

import React, { useState } from 'react';
import { MessageSquare, ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function WhatsAppFloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281776803118';
  const defaultMessage = encodeURIComponent(t.whatsappCTA.defaultMsg);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Minimal Studio Popover */}
      {isOpen && (
        <div
          className={`mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-72 rounded-2xl p-4 sm:p-5 shadow-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            isLight
              ? 'bg-white/95 backdrop-blur-xl border-black/[0.1]'
              : 'bg-[#0a0a0a]/95 backdrop-blur-xl border-white/[0.1]'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              isLight ? 'border-black/[0.06]' : 'border-white/[0.07]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <p
                className={`text-xs font-mono font-medium ${
                  isLight ? 'text-slate-900' : 'text-neutral-300'
                }`}
              >
                {t.whatsappCTA.lineTitle}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 transition-colors ${
                isLight
                  ? 'text-slate-400 hover:text-slate-950'
                  : 'text-neutral-500 hover:text-white'
              }`}
              aria-label="Close message popup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p
            className={`text-xs my-3 leading-relaxed font-light ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            {t.whatsappCTA.lineDesc}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full font-medium text-xs transition-all duration-200 active:scale-[0.98] ${
              isLight
                ? 'bg-slate-950 text-white hover:bg-slate-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <span>{t.whatsappCTA.chatBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Understated Studio Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ${
          isLight
            ? 'bg-white border-black/[0.12] hover:border-black/30 text-slate-800 shadow-slate-300/40'
            : 'bg-[#0a0a0a] border-white/[0.15] hover:border-white/40 text-neutral-300 hover:text-white'
        }`}
        aria-label="Chat with Inalabs via WhatsApp"
      >
        {isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <MessageSquare className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
