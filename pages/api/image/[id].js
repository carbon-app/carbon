/* global domtoimage */
const qs = require('querystring')
const c = require('chrome-aws-lambda')
const p = require('puppeteer-core')

// TODO expose local version of dom-to-image
const DOM_TO_IMAGE_URL = 'https://unpkg.com/dom-to-image@2.6.0/dist/dom-to-image.min.js'
const NOTO_COLOR_EMOJI_URL =
  'https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf'

const EXPORT_SIZES_HASH = {
  '1x': '1',
  '2x': '2',
  '4x': '4',
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
}

module.exports = async (req, res) => {
  const get = req.method === 'GET'
  const { headers: h } = req
  // TODO proper auth
  if (get) {
    if (
      req.referer ||
      (h['user-agent'].indexOf('Twitterbot') < 0 &&
        // Slack does not honor robots.txt: https://api.slack.com/robots
        h['user-agent'].indexOf('Slackbot') < 0 &&
        h['user-agent'].indexOf('Slack-ImgProxy') < 0)
    ) {
      return res.status(401).send('Unauthorized')
    }
  } else {
    if (!h.origin && !h.authorization) {
      return res.status(401).send('Unauthorized')
    }
  }

  const host = (h && h.host) || 'carbon.now.sh'

  try {
    await c.font(`https://${host}/static/fonts/NotoSansSC-Regular.otf`)
    await c.font(NOTO_COLOR_EMOJI_URL)
  } catch (e) {
    console.error(e)
  }

  const b = await p.launch({
    args: c.args,
    executablePath: await c.executablePath,
    headless: c.headless,
  })

  try {
    const { state, id, ...params } = get ? req.query : req.body

    const page = await b.newPage()

    const queryString = state ? `state=${state}` : qs.stringify(params)

    await page.goto(`https://${host}/${id ? id : `?${queryString}`}`)
    await page.addScriptTag({ url: DOM_TO_IMAGE_URL })

    await page.waitForSelector('.export-container', { visible: true, timeout: 9500 })

    const targetElement = await page.$('.export-container')

    const dataUrl = await page.evaluate((target = document) => {
      const query = new URLSearchParams(document.location.search)

      const exportSize = EXPORT_SIZES_HASH[query.get('es')] || '2'

      target.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%[A-Fa-f0-9]{2}/)) {
          node.innerText.match(/%[A-Fa-f0-9]{2}/g).forEach(t => {
            node.innerHTML = node.innerHTML.replace(t, encodeURIComponent(t))
          })
        }
      })

      const width = target.offsetWidth * exportSize
      const height =
        query.get('si') === 'true' || query.get('si') === true
          ? target.offsetWidth * exportSize
          : target.offsetHeight * exportSize

      const config = {
        style: {
          transform: `scale(${exportSize})`,
          'transform-origin': 'center',
          background: query.get('si') ? query.get('bg') : 'none',
        },
        filter: n => {
          if (n.className) {
            return String(n.className).indexOf('eliminateOnRender') < 0
          }
          return true
        },
        width,
        height,
      }

      return domtoimage.toPng(target, config)
    }, targetElement)

    if (get) {
      res.setHeader('Content-Type', 'image/png')
      return res.status(200).send(Buffer.from(dataUrl.split(',')[1], 'base64'))
    }
    return res.status(200).send(dataUrl)
  } catch (e) {
    return res.status(500).send()
  } finally {
    await b.close()
  }
}
