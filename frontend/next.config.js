const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['placehold.co'],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['sharp'],
  },
  webpack: (config, { dev, isServer }) => {
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Enable tree shaking and purging
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        mergeDuplicateChunks: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        minimize: true,
      };
    }

    return config;
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/urunler',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/iletisim',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
