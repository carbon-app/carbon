const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-offline')

const withBundleAnalyzer = bundleAnalyzer({ enabled: true })

const config = withOffline({
  target: 'serverless',
  experimental: {
    modern: true,
    granularChunks: true
  },
  dontAutoRegisterSw: true,
  // https://github.com/hanford/next-offline/blob/master/packages/now2-example/next.config.js
  workboxOpts: {
    swDest: 'static/service-worker.js',
    globDirectory: '.',
    globPatterns: ['static/**/*'],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  },
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_FE_APP_ID: process.env.FIREBASE_FE_APP_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
  }
})

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(config) : config
