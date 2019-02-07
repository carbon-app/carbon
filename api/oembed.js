/*
 * See oEmbed standard here: https://oembed.com/
 */
const url = require('url')
const { send } = require('micro')

const toIFrame = (url, width, height) =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:${width}px; height:${height}px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

module.exports = (req, res) => {
  const parsed = url.parse(req.url, true)
  let embedUrl = parsed.query.url

  try {
    embedUrl = decodeURIComponent(embedUrl)
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
    /* URL is already decoded */
  }

  try {
    const { query: queryString } = url.parse(embedUrl)

    const width = Math.min(Number(parsed.query.maxwidth) || Infinity, 1024)
    const height = Math.min(Number(parsed.query.maxheight) || Infinity, 473)

    const obj = {
      version: '1.0',
      type: 'rich',
      provider_name: 'Carbon',
      width,
      height,
      html: toIFrame(`?${queryString}`, width, height)
    }

    return send(res, 200, obj)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return send(res, 500, e.message)
  }
}
