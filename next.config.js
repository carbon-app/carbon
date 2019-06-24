const withOffline = require('next-offline')

module.exports = withOffline({
  target: 'serverless',
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: require('path').resolve(__dirname, 'public/service-worker.js')
  },
  experimental: {
    autoExport: true
  }
})
