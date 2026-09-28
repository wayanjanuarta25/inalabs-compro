'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Indonesian ('id') as requested by user
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('inalabs_lang') as Language;
    if (saved === 'id' || saved === 'en') {
      setLanguageState(saved);
    } else {
      // Default to Indonesian ('id')
      setLanguageState('id');
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('inalabs_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore in incognito or restricted storage
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'id' ? 'en' : 'id';
    setLanguage(nextLang);
  };

  const value: LanguageContextType = {
    language: mounted ? language : 'id',
    setLanguage,
    toggleLanguage,
    t: translations[mounted ? language : 'id'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
