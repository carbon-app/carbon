const url = require('url')
const clipboardy = require('clipboardy')

module.exports = async markdown => {
  const URL = process.env.URL || process.env.NOW_URL || clipboardy.readSync()
  const { host } = url.parse(URL)

  if (host) {
    let name
    try {
      name = require('./now.json').name
    } catch (e) {
      /* pass */
    }

    if (!name) {
      try {
        name = require('./package.json').name
      } catch (e) {
        /* pass */
      }
    }

    const prefix = name ? `\`${name}\`: ` : ''

    return [`${prefix}https://${host}`, '', markdown].join('\n')
  }

  // Use the available data to create a custom release
  return markdown
}
