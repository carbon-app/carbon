/* global domtoimage */
const qs = require('querystring')
const { json, send } = require('micro')
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const DOM_TO_IMAGE_URL = 'https://unpkg.com/dom-to-image@2.6.0/dist/dom-to-image.min.js'
const NOTO_COLOR_EMOJI_URL =
  'https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf'

module.exports = async (req, res) => {
  // if (req.method.toUpperCase() !== 'POST') {
  //   res.setHeader('Access-Control-Allow-Origin', '*')
  //   res.setHeader('Access-Control-Allow-Headers', '*')
  //   res.setHeader('Access-Control-Allow-Methods', '*')

  //   return send(res, 200)
  // }

  if (!req.headers.origin && !req.headers.authorization) {
    return send(res, 401, 'Unauthorized')
  }

  const host = (req.headers && req.headers.host) || 'carbon.now.sh'

  try {
    await chrome.font(`https://${host}/static/fonts/NotoSansSC-Regular.otf`)
    await chrome.font(NOTO_COLOR_EMOJI_URL)
  } catch (e) {
    console.error(e)
  }

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  try {
    const { state, ...params } =
      req.method === 'GET' ? req.query : await json(req, { limit: '6mb' })

    // TODO uncomment this when we want to support standard query params
    if (!state) return send(res, 400, 'Invalid Request')

    const page = await browser.newPage()

    const queryString = state ? `state=${state}` : qs.stringify(params)

    const snippetId = req.query && req.query.id
    await page.goto(
      `https://${host}${snippetId && snippetId.length ? `/${snippetId}` : ''}?${queryString}`
    )
    await page.addScriptTag({ url: DOM_TO_IMAGE_URL })

    await page.waitForSelector('.export-container', { visible: true, timeout: 9500 })

    const targetElement = await page.$('.export-container')

    const dataUrl = await page.evaluate((target = document) => {
      const query = new URLSearchParams(document.location.search)

      const EXPORT_SIZES_HASH = {
        '1x': '1',
        '2x': '2',
        '4x': '4'
      }

      const exportSize = EXPORT_SIZES_HASH[query.get('es')] || '2'

      target.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%[A-Fa-f0-9]{2}/)) {
          node.innerText.match(/%[A-Fa-f0-9]{2}/g).forEach(t => {
            node.innerText = node.innerText.replace(t, encodeURIComponent(t))
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
          background: query.get('si') ? query.get('bg') : 'none'
        },
        filter: n => {
          if (n.className) {
            return String(n.className).indexOf('eliminateOnRender') < 0
          }
          return true
        },
        width,
        height
      }

      return domtoimage.toPng(target, config)
    }, targetElement)

    return send(res, 200, dataUrl)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return send(res, 500)
  } finally {
    await browser.close()
  }
}
