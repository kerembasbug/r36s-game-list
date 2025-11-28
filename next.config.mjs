/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure proper server configuration for Coolify
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./src/data/games.json'],
    },
  },
};

export default nextConfig;

