/*
 * See oEmbed standard here: https://oembed.com/
 */
const url = require('url')

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
  let embedUrl = req.query.url

  try {
    embedUrl = decodeURIComponent(embedUrl)
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
    /* URL is already decoded */
  }

  try {
    const { query: queryString, pathname } = url.parse(embedUrl)

    const snippetID = pathname.split('/').pop()

    const width = Math.min(Number(req.query.maxwidth) || Infinity, 1024)
    const height = Math.min(Number(req.query.maxheight) || Infinity, 480)

    const obj = {
      version: '1.0',
      type: 'rich',
      provider_name: 'Carbon',
      width,
      height,
      html: toIFrame(
        `${snippetID && snippetID !== 'undefined' ? `/${snippetID}` : ''}?${
          queryString ? queryString : ''
        }`,
        width,
        height
      ),
    }

    return res.status(200).json(obj)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return res.status(500).send(e.message)
  }
}
