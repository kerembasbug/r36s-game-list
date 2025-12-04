import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add HSTS header for security
  // max-age: 31536000 = 1 year
  // includeSubDomains: Apply HSTS to all subdomains
  // preload: Allow inclusion in HSTS preload lists
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add Content-Language header based on geolocation
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-vercel-ip-country') || 
                  request.geo?.country ||
                  'US';
  
  // Map country to language (simplified, can be expanded)
  const geoToLang: Record<string, string> = {
    US: 'en', GB: 'en', CA: 'en', AU: 'en',
    DE: 'de', AT: 'de', CH: 'de',
    ES: 'es', MX: 'es', AR: 'es',
    FR: 'fr', BE: 'fr',
    IT: 'it',
    PT: 'pt', BR: 'pt',
    JP: 'ja',
    SA: 'ar', AE: 'ar',
    NL: 'nl',
    SE: 'sv',
    DK: 'da',
    NO: 'no',
    KR: 'ko',
    TR: 'tr',
    CN: 'zh', TW: 'zh', HK: 'zh',
  };

  const lang = geoToLang[country] || 'en';
  response.headers.set('Content-Language', lang);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

