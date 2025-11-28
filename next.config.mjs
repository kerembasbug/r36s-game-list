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
      '/game/**': ['./src/data/games.json'],
    },
  },
  // Ensure all necessary files are included
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
    }
    return config;
  },
};

export default nextConfig;

