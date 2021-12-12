const bundleAnalyzer = require('@next/bundle-analyzer')
const withOffline = require('next-pwa')

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

module.exports = withBundleAnalyzer(
  withOffline({
    target: 'serverless',
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public',
      register: false,
      skipWaiting: false,
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/graphql-language-service-parser/,
        use: [options.defaultLoaders.babel],
      })
      config.plugins.push(
        new options.webpack.IgnorePlugin({
          resourceRegExp: /\.html$/,
          contextRegExp: /node_modules/,
        })
      )
      config.plugins.push(
        new options.webpack.IgnorePlugin({
          resourceRegExp: /\.css$/,
          contextRegExp: /node_modules\/codemirror\/mode/,
        })
      )

      return config
    },
    headers() {
      return [
        {
          source: '/api/oembed',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Headers', value: '*' },
          ],
        },
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
