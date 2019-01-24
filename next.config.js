// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
// const withOffline = require('next-offline')

module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'http://localhost:4000'
  }
}
