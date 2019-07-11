const withOffline = require('next-offline')

module.exports = withOffline({
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
