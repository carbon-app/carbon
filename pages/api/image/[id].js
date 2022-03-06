/* global domtoimage */
import qs from 'querystring'
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

const NOTO_COLOR_EMOJI_URL =
  'https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
}

export default async function id(req, res) {
  // TODO proper auth
  if (req.method === 'GET') {
    if (
      req.referer ||
      (req.headers['user-agent'].indexOf('Twitterbot') < 0 &&
        // Slack does not honor robots.txt: https://api.slack.com/robots
        req.headers['user-agent'].indexOf('Slackbot') < 0 &&
        req.headers['user-agent'].indexOf('Slack-ImgProxy') < 0)
    ) {
      return res.status(401).send('Unauthorized')
    }
  } else {
    if (!req.headers.origin && !req.headers.authorization) {
      return res.status(401).send('Unauthorized')
    }
  }

  const host = (req.headers && req.headers.host) || 'carbon.now.sh'

  try {
    await chrome.font(NOTO_COLOR_EMOJI_URL)
  } catch (e) {
    console.error(e)
  }

  const browser = await puppeteer.launch({
    args: [...chrome.args, '--hide-scrollbars'],
    defaultViewport: chrome.defaultViewport,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
    ignoreHTTPSErrors: true,
  })

  try {
    const { state, id: _id, ...params } = req.method === 'GET' ? req.query : req.body
    const id = _id && _id !== 'index' ? _id : undefined

    const page = await browser.newPage()

    const queryString = state ? `state=${state}` : qs.stringify(params)

    await page.goto(`https://${host}/${id ? id : `?${queryString}`}`)
    await page.evaluate(() => import('../../../lib/dom-to-image'))

    await page.waitForSelector('.export-container', { visible: true, timeout: 9500 })

    const targetElement = await page.$('.export-container')

    const dataUrl = await page.evaluate((target = document) => {
      const query = new URLSearchParams(document.location.search)

      const EXPORT_SIZES_HASH = {
        '1x': '1',
        '2x': '2',
        '4x': '4',
      }

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

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'image/png')
      const data = new Buffer(dataUrl.split(',')[1], 'base64')
      return res.status(200).send(data)
    }
    return res.status(200).send(dataUrl)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return res.status(500).end()
  } finally {
    await browser.close()
  }
}
