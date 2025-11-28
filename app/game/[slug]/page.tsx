import { notFound } from 'next/navigation';
import gamesData from '@/src/data/games.json';
import type { Metadata } from 'next';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full mb-4">
              {game.console}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {game.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              This game is supported on the R36S {game.console} console.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Related Games ({game.console})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedGames.map((relatedGame) => (
                <a
                  key={relatedGame.slug}
                  href={`/game/${relatedGame.slug}`}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                >
                  <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                    {relatedGame.name}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to All Games
            </a>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoGame',
              name: game.name,
              gamePlatform: game.console,
              description: `${game.name} is a game supported on the R36S ${game.console} console.`,
            }),
          }}
        />
      </div>
    </div>
  );
}

