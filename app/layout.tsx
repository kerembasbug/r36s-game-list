import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/i18n/LanguageContext';
import { locales } from '../lib/i18n/locales';

export const metadata: Metadata = {
  title: 'R36S Game List - Complete List of Supported Games',
  description: 'Complete list of all games supported on the R36S console. PSP, PlayStation 1, Dreamcast, SNES, Famicom and Arcade games. R36S game list, r36s supported games, r36s games.',
  keywords: 'r36s game list, r36s supported games, r36s games, psp games, playstation 1 games, dreamcast games, snes games, famicom games, arcade games',
  openGraph: {
    title: 'R36S Game List - Complete List of Supported Games',
    description: 'Complete list of all games supported on the R36S console. PSP, PlayStation 1, Dreamcast, SNES, Famicom and Arcade games.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://r36sgamelist.com',
    languages: Object.fromEntries(
      locales.map(locale => [locale, `https://r36sgamelist.com?lang=${locale}`])
    ),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://r36sgamelist.com" />
        {/* Hreflang tags for SEO */}
        {locales.map(locale => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`https://r36sgamelist.com?lang=${locale}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://r36sgamelist.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'R36S Game List',
              description: 'Complete list of all games supported on the R36S console',
              url: 'https://r36sgamelist.com',
              inLanguage: locales,
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://r36sgamelist.com?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

