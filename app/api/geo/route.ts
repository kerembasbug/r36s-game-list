import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Try to get country from Cloudflare headers (if deployed on Cloudflare)
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-vercel-ip-country') || 
                  request.geo?.country ||
                  'US'; // Default to US

  return NextResponse.json({ country });
}

