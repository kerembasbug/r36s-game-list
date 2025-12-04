'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales, geoToLocale } from './locales';
import { Translation, translations } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  // Detect locale on mount
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocaleState(savedLocale);
      return;
    }

    // Try to detect from browser
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (locales.includes(browserLang)) {
        setLocaleState(browserLang);
        return;
      }
    }

    // Try geolocation detection (async)
    detectLocaleFromGeo();
  }, []);

  const detectLocaleFromGeo = async () => {
    try {
      // Use Cloudflare's geo detection if available
      const response = await fetch('/api/geo');
      if (response.ok) {
        const data = await response.json();
        const country = data.country;
        if (country && geoToLocale[country]) {
          setLocaleState(geoToLocale[country]);
        }
      }
    } catch (error) {
      // Fallback to default locale
      console.log('Geo detection failed, using default locale');
    }
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  };

  const t = translations[locale] || translations[defaultLocale];

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

