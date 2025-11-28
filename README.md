# R36S Game List

R36S konsolu için desteklenen tüm oyunların SEO-optimize edilmiş web uygulaması.

## Özellikler

- ✅ **2644+ oyun** - R36S konsolu için desteklenen tüm oyunlar
- 🔍 **Gelişmiş Arama** - Oyun adı, konsol ve arama terimlerine göre filtreleme
- 🎮 **Konsol Filtreleme** - PSP, PlayStation 1, Dreamcast, SNES, Famicom, Arcade
- 📱 **Responsive Tasarım** - Mobil ve masaüstü uyumlu
- 🔎 **SEO Optimizasyonu** - Meta tags, structured data, sitemap, robots.txt
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

## SEO Özellikleri

- **Meta Tags**: Title, description, keywords, Open Graph
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Otomatik oluşturulan XML sitemap
- **Robots.txt**: Arama motorları için optimize edilmiş
- **Canonical URLs**: Duplicate content önleme
- **Semantic HTML**: Erişilebilirlik ve SEO için optimize edilmiş

## Proje Yapısı

```
r36s-game-list/
├── app/
│   ├── layout.tsx          # Ana layout ve SEO meta tags
│   ├── page.tsx            # Ana sayfa (oyun listesi)
│   ├── globals.css         # Global stiller
│   ├── sitemap.ts          # XML sitemap
│   ├── robots.ts           # Robots.txt
│   └── game/
│       └── [slug]/
│           └── page.tsx    # Oyun detay sayfaları
├── src/
│   └── data/
│       └── games.json       # Parse edilmiş oyun listesi
├── parse-games.js          # HTML'den oyun parse scripti
└── package.json
```

## Lisans

MIT

