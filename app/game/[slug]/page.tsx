import { notFound } from 'next/navigation';
import gamesData from '../../../src/data/games.json';
import type { Metadata } from 'next';
import GameDetailClient from './GameDetailClient';

interface Game {
  name: string;
  console: string;
  slug: string;
  searchTerms: string[];
}

export async function generateStaticParams() {
  const games = gamesData as Game[];
  return games.slice(0, 500).map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const games = gamesData as Game[];
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    return {
      title: 'Game Not Found - R36S Game List',
    };
  }

  return {
    title: `${game.name} - R36S ${game.console} Game | R36S Game List`,
    description: `${game.name} is a game supported on the R36S ${game.console} console. Find ${game.name} in the R36S game list.`,
    keywords: `${game.name}, r36s ${game.name}, ${game.console} ${game.name}, r36s game list, r36s supported games`,
    openGraph: {
      title: `${game.name} - R36S ${game.console}`,
      description: `${game.name} is a game supported on the R36S ${game.console} console.`,
      type: 'article',
    },
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const games = gamesData as Game[];
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  const relatedGames = games
    .filter((g) => g.console === game.console && g.slug !== game.slug)
    .slice(0, 10);

  return <GameDetailClient game={game} relatedGames={relatedGames} />;
}

