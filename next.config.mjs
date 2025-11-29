/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Compression and optimization
  compress: true,
  // Optimize bundle size
  swcMinify: true,
  // Include JSON data files in standalone build
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./src/data/games.json'],
      '/game/*': ['./src/data/games.json'],
      '/game/**': ['./src/data/games.json'],
    },
    // Ensure static files are properly included in standalone build
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  // Ensure all necessary files are included
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
    }
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;

