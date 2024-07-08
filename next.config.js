/* eslint @typescript-eslint/no-var-requires: [0], import/order: [0] */
const withPWA = require('next-pwa')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const formats = ['/(.*).webp', '/(.*).jpg', '/(.*).png', '/(.*).svg', '/(.*).ttf']

// eslint-disable-next-line no-console
console.log('start build env', process.env.NODE_ENV)

const pwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'staging',
  skipWaiting: true,
})

// /** @type {import('next').NextConfig} */
module.exports = pwa({
  env: {
    ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  distDir: './dist/app',
  basePath: '/app',
  reactStrictMode: false,
  trailingSlash: false,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  pageExtensions: ['p.ts', 'p.tsx'],
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://docuchain.io/',
        permanent: true,
      },
      {
        source: '/app',
        destination: 'https://docuchain.io/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return formats.map((format) => ({
      source: format,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=2678400, s-maxage=2678400, stale-while-revalidate=2678400',
        },
      ],
    }))
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.inline\.svg$/i,
      use: ['@svgr/webpack'],
    })

    const imageLoaderRule = config.module.rules.find((rule) => rule.loader === 'next-image-loader')
    imageLoaderRule.exclude = /\.inline\.svg$/

    return config
  },
})
