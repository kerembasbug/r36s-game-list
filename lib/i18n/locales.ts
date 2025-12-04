export const locales = [
  'en', // English
  'de', // German
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'pt', // Portuguese
  'ja', // Japanese
  'ar', // Arabic
  'nl', // Dutch
  'sv', // Swedish
  'da', // Danish
  'no', // Norwegian
  'ko', // Korean
  'tr', // Turkish
  'zh', // Chinese
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  ar: 'العربية',
  nl: 'Nederlands',
  sv: 'Svenska',
  da: 'Dansk',
  no: 'Norsk',
  ko: '한국어',
  tr: 'Türkçe',
  zh: '中文',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
  pt: '🇵🇹',
  ja: '🇯🇵',
  ar: '🇸🇦',
  nl: '🇳🇱',
  sv: '🇸🇪',
  da: '🇩🇰',
  no: '🇳🇴',
  ko: '🇰🇷',
  tr: '🇹🇷',
  zh: '🇨🇳',
};

// Geolocation to locale mapping
export const geoToLocale: Record<string, Locale> = {
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  FR: 'fr',
  BE: 'fr',
  IT: 'it',
  PT: 'pt',
  BR: 'pt',
  JP: 'ja',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  NL: 'nl',
  SE: 'sv',
  DK: 'da',
  NO: 'no',
  KR: 'ko',
  TR: 'tr',
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
};

