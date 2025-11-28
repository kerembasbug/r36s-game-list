import { MetadataRoute } from 'next';
import gamesData from '@/src/data/games.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://r36s-gamelist.com';
  
  const gamePages: MetadataRoute.Sitemap = (gamesData as any[]).slice(0, 1000).map((game) => ({
    url: `${baseUrl}/game/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...gamePages,
  ];
}

