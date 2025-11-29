import { MetadataRoute } from 'next';
import gamesData from '../src/data/games.json';

interface Game {
  name: string;
  console: string;
  slug: string;
  searchTerms: string[];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://r36sgamelist.com';
  
  const games = gamesData as Game[];
  
  // Main page
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Add top 1000 game pages to sitemap (to avoid build issues with 15k+ pages)
  // This ensures important games are indexed while keeping build time reasonable
  const gamePages: MetadataRoute.Sitemap = games
    .slice(0, 1000)
    .map((game) => ({
      url: `${baseUrl}/game/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticPages, ...gamePages];
}

