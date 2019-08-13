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
  },
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_FE_APP_ID: process.env.FIREBASE_FE_APP_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
  }
})
