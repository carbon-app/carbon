const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-offline')

const withBundleAnalyzer = bundleAnalyzer({ enabled: true })

const config = withOffline({
  target: 'serverless',
  dontAutoRegisterSw: true,
  // https://github.com/hanford/next-offline/blob/master/packages/now2-example/next.config.js
  workboxOpts: {
    swDest: 'static/service-worker.js',
  },
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_FE_APP_ID: process.env.FIREBASE_FE_APP_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/graphql-language-service-parser/,
      use: [options.defaultLoaders.babel],
    })

    return config
  },
})

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(config) : config
