module.exports = {
  // TODO remove `next.configs.js` when this closes: https://github.com/zeit/next.js/issues/1195
  webpack (cfg) {
    cfg.plugins = cfg.plugins
      .filter(plugin => (plugin.constructor.name !== 'UglifyJsPlugin'))
    return cfg
  },
}
