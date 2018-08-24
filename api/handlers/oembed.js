/*
 * See oEmbed standard here: https://oembed.com/
 */
const url = require('url')

const toIFrame = (url, width, height) =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  style="transform:scale(0.7); width:${width}px; height:${height}px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

module.exports = (req, res) => {
  let embedUrl = req.query.url

  try {
    embedUrl = decodeURIComponent(req.query.url)
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
    /* URL is already decoded */
  }

  try {
    const { query } = url.parse(embedUrl)

    const width = Math.min(Number(req.query.maxwidth) || Infinity, 1024)
    const height = Math.min(Number(req.query.maxheight) || Infinity, 473)

    const obj = {
      version: '1.0',
      type: 'rich',
      provider_name: 'Carbon',
      width,
      height,
      html: toIFrame(`?${query}`, width, height)
    }

    return res.json(obj)
  } catch (e) {
    return res.status(500).send()
  }
}
