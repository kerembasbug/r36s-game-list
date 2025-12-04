# R36S Game List

R36S konsolu için desteklenen tüm oyunların SEO-optimize edilmiş web uygulaması.

## Özellikler

- ✅ **15,000+ oyun** - R36S konsolu için desteklenen tüm oyunlar (21 farklı konsol)
- 🌍 **15 Dil Desteği** - İngilizce, Almanca, İspanyolca, Fransızca, İtalyanca, Portekizce, Japonca, Arapça, Hollandaca, İsveççe, Danca, Norveççe, Korece, Türkçe, Çince
- 🔍 **Gelişmiş Arama** - Oyun adı, konsol ve arama terimlerine göre filtreleme
- 🎮 **Konsol Filtreleme** - PSP, PlayStation 1, Dreamcast, SNES, Famicom, Arcade, Game Boy Advance, NES ve daha fazlası
- 🎨 **Cyberpunk Tasarım** - Modern ve renkli kullanıcı arayüzü
- 📱 **Responsive Tasarım** - Mobil ve masaüstü uyumlu
- 🔎 **SEO Optimizasyonu** - Meta tags, structured data, sitemap, robots.txt, hreflang tags
- 🌐 **Geolocation Bazlı Dil Algılama** - Kullanıcının konumuna göre otomatik dil seçimi
- ⚡ **Hızlı Performans** - Next.js 14 App Router ile optimize edilmiş

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Oyun listesini parse et (HTML dosyasından)
npm run parse

# Geliştirme sunucusunu başlat
npm run dev
```

## Kullanım

1. HTML dosyasından oyunları parse etmek için:
   ```bash
   npm run parse
   ```

2. Geliştirme modunda çalıştırmak için:
   ```bash
   npm run dev
   ```

3. Production build için:
   ```bash
   npm run build
   npm start
   ```

## Coolify Deployment

### Environment Variables

Coolify'da deployment yaparken aşağıdaki environment variable'ları ekleyin:

```bash
# Zorunlu (Production için)
NODE_ENV=production

# Önerilen (Site URL'i için - canonical URLs ve structured data)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Coolify Ayarları

1. **Repository**: `https://github.com/kerembasbug/r36s-game-list`
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start` (veya `sh start.sh` veya `node .next/standalone/server.js`)
4. **Port**: Coolify otomatik olarak `PORT` environment variable'ını ayarlar
5. **Node Version**: `18.x` veya `20.x` (önerilen: `20.x`)

**Önemli**: 
- `output: 'standalone'` modu `next.config.mjs`'de ayarlı
- `start.sh` script'i PORT'u doğru şekilde ayarlar
- Coolify PORT environment variable'ını otomatik olarak ayarlar
- Eğer hala sorun yaşıyorsanız, Start Command olarak direkt `node .next/standalone/server.js` kullanabilirsiniz

### Environment Variables Ekleme

Coolify dashboard'unda:
1. Projenizi seçin
2. "Environment Variables" sekmesine gidin
3. Aşağıdaki variable'ları ekleyin:

| Variable | Value | Açıklama |
|----------|-------|----------|
| `NODE_ENV` | `production` | Production modu |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Site URL'i (canonical URLs için) |

**Not**: `NEXT_PUBLIC_SITE_URL` değişkenini kendi domain'inizle değiştirin.

## SEO Özellikleri

- **Meta Tags**: Title, description, keywords, Open Graph
- **Structured Data**: JSON-LD schema markup (çoklu dil desteği)
- **Hreflang Tags**: 15 dil için hreflang etiketleri
- **Content-Language Header**: Otomatik dil başlığı
- **Sitemap**: Otomatik oluşturulan XML sitemap
- **Robots.txt**: Arama motorları için optimize edilmiş
- **Canonical URLs**: Duplicate content önleme
- **Semantic HTML**: Erişilebilirlik ve SEO için optimize edilmiş
- **Geolocation SEO**: Ülkeye özel içerik sunumu

## Proje Yapısı

```
r36s-game-list/
├── app/
│   ├── layout.tsx               # Ana layout ve SEO meta tags
│   ├── page.tsx                 # Ana sayfa (oyun listesi)
│   ├── globals.css              # Global stiller
│   ├── sitemap.ts               # XML sitemap
│   ├── robots.ts                # Robots.txt
│   ├── components/
│   │   └── LanguageSelector.tsx # Dil seçici component
│   ├── api/
│   │   └── geo/
│   │       └── route.ts         # Geolocation API
│   └── game/
│       └── [slug]/
│           ├── page.tsx         # Oyun detay sayfaları
│           └── GameDetailClient.tsx
├── lib/
│   └── i18n/
│       ├── locales.ts           # Dil konfigürasyonu
│       ├── translations.ts      # Tüm çeviriler (15 dil)
│       └── LanguageContext.tsx  # React Context ve Provider
├── src/
│   └── data/
│       └── games.json           # Parse edilmiş oyun listesi
├── middleware.ts                # Content-Language header
├── parse-games.js               # HTML'den oyun parse scripti
├── README.md                    # Proje dokümantasyonu
├── README_I18N.md               # i18n dokümantasyonu
└── package.json
```

## Çoklu Dil Desteği (i18n)

Bu proje 15 farklı dilde çalışmaktadır. Detaylı bilgi için [README_I18N.md](README_I18N.md) dosyasına bakın.

### Desteklenen Diller
🇬🇧 EN | 🇩🇪 DE | 🇪🇸 ES | 🇫🇷 FR | 🇮🇹 IT | 🇵🇹 PT | 🇯🇵 JA | 🇸🇦 AR | 🇳🇱 NL | 🇸🇪 SV | 🇩🇰 DA | 🇳🇴 NO | 🇰🇷 KO | 🇹🇷 TR | 🇨🇳 ZH

### Özellikler
- ✅ Geolocation bazlı otomatik dil algılama
- ✅ Tarayıcı dili algılama
- ✅ LocalStorage ile seçimi hatırlama
- ✅ SEO optimize edilmiş (hreflang tags)
- ✅ Sayfa yenileme olmadan dil değişimi

## Lisans

MIT

