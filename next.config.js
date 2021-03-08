const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-offline')

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

module.exports = withBundleAnalyzer(
  withOffline({
    target: 'serverless',
    dontAutoRegisterSw: true,
    // https://github.com/hanford/next-offline/blob/master/packages/now2-example/next.config.js
    workboxOpts: {
      swDest: 'static/service-worker.js',
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/graphql-language-service-parser/,
        use: [options.defaultLoaders.babel],
      })

      return config
    },
    headers() {
      return [
        {
          source: '/',
          headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
        },
        {
          source: '/(.*)',
          headers: [
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
            {
              key: 'Feature-Policy',
              value: "geolocation 'self'; microphone 'self'; camera 'self'",
            },
          ],
        },
      ]
    },
    redirects() {
      return [
        {
          source: '/privacy',
          destination: 'https://www.notion.so/PRIVACY-POLICY-e9847a7777714eb08ba15a7a8eaee937',
          permanent: false,
        },
        {
          source: '/terms',
          destination: 'https://www.notion.so/TERMS-OF-USE-ff2ce22a7e9848c89c6be46b44297583',
          permanent: false,
        },
        {
          source: '/offsets',
          destination:
            'https://www.wren.co/join/carbon?utm_campaign=share&utm_medium=profile_referral_link',
          permanent: false,
        },
      ]
    },
  })
)
