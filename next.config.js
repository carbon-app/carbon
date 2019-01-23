// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
// const withOffline = require('next-offline')

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }

  // async exportPathMap() {
  //   return {
  //     '/about': { page: '/about' },
  //     '/embed': { page: '/embed' },
  //     '/index': { page: '/index' },
  //     '/': { page: '/' }
  //   }
  // },
  // publicRuntimeConfig: {
  //   API_URL:
  //     process.env.NODE_ENV === 'production' ? 'https://carbon-api.now.sh' : 'http://localhost:4000'
  // },
})
