# 🌍 Çoklu Dil Desteği (i18n)

R36S Game List projesi artık **15 dil** ile çalışmaktadır!

## Desteklenen Diller

1. 🇬🇧 **İngilizce (EN)** - English
2. 🇩🇪 **Almanca (DE)** - Deutsch
3. 🇪🇸 **İspanyolca (ES)** - Español
4. 🇫🇷 **Fransızca (FR)** - Français
5. 🇮🇹 **İtalyanca (IT)** - Italiano
6. 🇵🇹 **Portekizce (PT)** - Português
7. 🇯🇵 **Japonca (JA)** - 日本語
8. 🇸🇦 **Arapça (AR)** - العربية
9. 🇳🇱 **Hollandaca (NL)** - Nederlands
10. 🇸🇪 **İsveççe (SV)** - Svenska
11. 🇩🇰 **Danca (DA)** - Dansk
12. 🇳🇴 **Norveççe (NO)** - Norsk
13. 🇰🇷 **Korece (KO)** - 한국어
14. 🇹🇷 **Türkçe (TR)** - Türkçe
15. 🇨🇳 **Çince (ZH)** - 中文

## Özellikler

### ✨ Akıllı Dil Algılama

1. **Geolocation Bazlı**: Kullanıcının ülkesine göre otomatik dil seçimi
2. **Tarayıcı Dili**: Kullanıcının tarayıcı dilini algılama
3. **LocalStorage**: Kullanıcının seçimini hatırlama

### 🎯 SEO Optimizasyonu

- **Hreflang Tags**: Her dil için ayrı hreflang etiketi
- **Content-Language Header**: Middleware ile otomatik dil başlığı
- **Structured Data**: JSON-LD ile çoklu dil desteği
- **Meta Tags**: Her dil için optimize edilmiş meta açıklamaları

### 🚀 Performans

- **Client-Side Rendering**: Hızlı dil değişimi
- **No Page Reload**: Sayfa yenilemeden dil değişimi
- **LocalStorage Cache**: Seçilen dili kaydetme

## Kullanım

### Language Selector

Sağ üst köşede bayraklı dil seçici bulunur. Kullanıcı dilini buradan seçebilir.

### Programatik Kullanım

```typescript
import { useLanguage } from '../lib/i18n/LanguageContext';

function MyComponent() {
  const { t, locale, setLocale } = useLanguage();
  
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
```

## Dosya Yapısı

```
lib/
  i18n/
    locales.ts           # Dil konfigürasyonu
    translations.ts      # Tüm çeviriler
    LanguageContext.tsx  # React Context ve Provider
app/
  components/
    LanguageSelector.tsx # Dil seçici component
  api/
    geo/
      route.ts           # Geolocation API
middleware.ts            # Content-Language header
```

## Yeni Dil Ekleme

### 1. `lib/i18n/locales.ts` Dosyasını Güncelleyin

```typescript
export const locales = [...existing, 'xx'] as const;

export const localeNames: Record<Locale, string> = {
  ...existing,
  xx: 'Language Name',
};

export const localeFlags: Record<Locale, string> = {
  ...existing,
  xx: '🇽🇽',
};

export const geoToLocale: Record<string, Locale> = {
  ...existing,
  XX: 'xx', // Country code
};
```

### 2. `lib/i18n/translations.ts` Dosyasını Güncelleyin

```typescript
export const translations: Record<Locale, Translation> = {
  ...existing,
  xx: {
    title: 'Translated Title',
    subtitle: 'Translated Subtitle',
    // ... diğer çeviriler
  },
};
```

### 3. `next.config.mjs` Dosyasını Güncelleyin

```javascript
i18n: {
  locales: [...existing, 'xx'],
  defaultLocale: 'en',
  localeDetection: true,
},
```

### 4. `middleware.ts` Dosyasını Güncelleyin

```typescript
const geoToLang: Record<string, string> = {
  ...existing,
  XX: 'xx',
};
```

## SEO Stratejisi

### Canonical URLs

Her sayfa için canonical URL belirtilmiştir:
```html
<link rel="canonical" href="https://r36sgamelist.com" />
```

### Hreflang Tags

Tüm diller için hreflang tags:
```html
<link rel="alternate" hrefLang="en" href="https://r36sgamelist.com?lang=en" />
<link rel="alternate" hrefLang="de" href="https://r36sgamelist.com?lang=de" />
<!-- ... diğer diller -->
<link rel="alternate" hrefLang="x-default" href="https://r36sgamelist.com" />
```

### Content-Language Header

Middleware otomatik olarak kullanıcının konumuna göre header ekler:
```
Content-Language: en
```

### Structured Data

JSON-LD ile çoklu dil desteği:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "inLanguage": ["en", "de", "es", "fr", "it", "pt", "ja", "ar", "nl", "sv", "da", "no", "ko", "tr", "zh"]
}
```

## Deployment

### Coolify

Environment variables:
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Vercel / Netlify

Otomatik olarak geolocation desteği vardır. Ek bir konfigürasyon gerekmez.

## Test

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### Dil Testi

1. Tarayıcıda `http://localhost:3004` adresini açın
2. Sağ üstteki dil seçiciyi kullanın
3. Dil değiştiğinde tüm metinlerin güncellendiğini kontrol edin
4. Sayfayı yenileyin - seçilen dilin hatırlandığını kontrol edin

## Sorun Giderme

### Dil Değişmiyor

- LocalStorage'ı temizleyin: `localStorage.clear()`
- Tarayıcı cache'ini temizleyin
- Development server'ı yeniden başlatın

### SEO Tags Görünmüyor

- `npm run build` ile production build alın
- View Source ile sayfanın HTML'ini kontrol edin
- Google Search Console'da kontrol edin

### Geolocation Çalışmıyor

- Deployment platformunun geolocation desteğini kontrol edin
- API route'un çalıştığını test edin: `/api/geo`
- Fallback mekanizması otomatik olarak browser language'ı kullanır

## Lisans

MIT

