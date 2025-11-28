/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Include JSON data files in standalone build
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./src/data/games.json'],
      '/game/*': ['./src/data/games.json'],
    },
  },
};

export default nextConfig;

