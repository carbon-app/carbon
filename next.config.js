const path = require('path')
const withOffline = require('next-offline')

module.exports = withOffline({
  target: 'serverless',
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest: path.join(__dirname, 'public/service-worker.js')
  },
  experimental: {
    autoExport: true
  }
})
