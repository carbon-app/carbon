const Uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  // TODO remove `next.configs.js` when this closes: https://github.com/zeit/next.js/issues/1195
  webpack: function(c) {
    c.plugins = c.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')

    c.plugins.push(new Uglify())

    return c
  }
}
