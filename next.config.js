const withOffline = require('next-offline')

module.exports = withOffline({
  target: 'serverless',
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: 'public/service-worker.js'
  },
  experimental: {
    autoExport: true
  }
})
