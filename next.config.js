const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-offline')

const withBundleAnalyzer = bundleAnalyzer({ enabled: true })

const config = withOffline({
  target: 'serverless',
  dontAutoRegisterSw: true,
  workboxOpts: {
    // TODO get default config from `next-offline`?
    swDest: 'static/service-worker.js',
    globPatterns: ['static/**/*'],
    globDirectory: '.',
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
  }
})

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(config) : config
