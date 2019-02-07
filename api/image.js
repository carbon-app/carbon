/* global domtoimage */
const qs = require('querystring')
const url = require('url')
const { json, send } = require('micro')
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const ARBITRARY_WAIT_TIME = 250

const DOM_TO_IMAGE_URL = 'https://unpkg.com/dom-to-image@2.6.0/dist/dom-to-image.min.js'

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  try {
    const page = await browser.newPage()
    const { state, ...params } =
      req.method === 'GET' ? url.parse(req.url, true) : await json(req, { limit: '6mb' })

    // TODO uncomment this when we want to support standard query params
    if (!state) return send(res, 400, 'Invalid Request')

    const queryString = state ? `state=${state}` : qs.stringify(params)

    await page.goto(`http://carbon.now.sh?${queryString}`)
    await page.addScriptTag({ url: DOM_TO_IMAGE_URL })

    // wait for page to detect language
    await delay(ARBITRARY_WAIT_TIME)

    const targetElement = await page.$('.export-container')

    const dataUrl = await page.evaluate((target = document) => {
      const query = new URLSearchParams(document.location.search.slice(1))

      const EXPORT_SIZES_HASH = {
        '1x': '1',
        '2x': '2',
        '4x': '4'
      }

      const exportSize = EXPORT_SIZES_HASH[query.get('es')] || '2'

      target.querySelectorAll('span[role="presentation"]').forEach(node => {
        if (node.innerText && node.innerText.match(/%[A-Za-z0-9]{2}/)) {
          node.innerText = encodeURIComponent(node.innerText)
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
