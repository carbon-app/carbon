/* global domtoimage */
const ARBITRARY_WAIT_TIME = 250

module.exports = browser => async (req, res) => {
  const page = await browser.newPage()
  const { state } = req.body

  if (!state) res.status(400).send('Invalid Request')

  try {
    const path = require.resolve('dom-to-image')

    await page.goto(`http://carbon.now.sh?state=${state}`)
    await page.addScriptTag({ path })

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
        if (node.innerText && node.innerText.match(/%\S\S/)) {
          node.innerText = encodeURIComponent(node.innerText)
        }
      })

      const width = target.offsetWidth * exportSize
      const height = query.get('si')
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

    res.status(200).send(dataUrl)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    res.status(500).send()
  } finally {
    await page.close()
  }
}

// private
function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}
