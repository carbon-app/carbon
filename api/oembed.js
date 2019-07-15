/*
 * See oEmbed standard here: https://oembed.com/
 */
const url = require('url')
const { send } = require('micro')

const toIFrame = (url, width, height) =>
  `<iframe
  src="https://carbon.now.sh/embed${url}"
  width="${width}px"
  height="${height}px"
  style="width:${width}px; height:${height}px; border:0; overflow:auto;"
  sandbox="allow-scripts allow-same-origin"
  scrolling="auto">
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
    const { query: queryString, pathname } = url.parse(embedUrl)

    const gistID = pathname.split('/').pop()

    const width = Math.min(Number(parsed.query.maxwidth) || Infinity, 1024)
    const height = Math.min(Number(parsed.query.maxheight) || Infinity, 480)

    const obj = {
      version: '1.0',
      type: 'rich',
      provider_name: 'Carbon',
      width,
      height,
      html: toIFrame(
        `${gistID && gistID !== 'undefined' ? `/${gistID}` : ''}?${queryString ? queryString : ''}`,
        width,
        height
      )
    }

    return send(res, 200, obj)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return send(res, 500, e.message)
  }
}
