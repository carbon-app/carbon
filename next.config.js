// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
// const withOffline = require('next-offline')

module.exports = (/* phase  { defaultConfig } */) => {
  const config = {
    async exportPathMap() {
      return {
        '/about': { page: '/about' },
        '/embed': { page: '/embed' },
        '/index': { page: '/index' },
        '/': { page: '/' }
      }
    },
    publicRuntimeConfig: {
      API_URL:
        process.env.NODE_ENV === 'production'
          ? 'https://carbon-api.now.sh'
          : 'http://localhost:4000'
    }
  }

  return config
}
