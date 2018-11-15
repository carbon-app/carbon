/* global domtoimage */
const ARBITRARY_WAIT_TIME = 500

module.exports = browser => async (req, res) => {
  const page = await browser.newPage()
  const { state } = req.body

  if (!state) res.status(400).send()

  try {
    await page.goto(`http://carbon.now.sh?state=${state}`)
    await page.addScriptTag({ path: './customDomToImage.js' })

    // wait for page to detect language
    await delay(ARBITRARY_WAIT_TIME)

    const targetElement = await page.$('.export-container')

    targetElement.querySelectorAll('span[role="presentation"]').forEach(node => {
      if (node.innerText && node.innerText.match(/%\d\S/)) {
        node.innerText = encodeURIComponent(node.innerText)
      }
    })

    const dataUrl = await page.evaluate((target = document) => {
      const config = {
        style: {
          transform: 'scale(2)',
          'transform-origin': 'center'
        },
        filter: n => {
          if (n.className) {
            return String(n.className).indexOf('eliminateOnRender') < 0
          }
          return true
        },
        width: target.offsetWidth * 2,
        height: target.offsetHeight * 2
      }

      return domtoimage.toPng(target, config)
    }, targetElement)

    res.status(200).json({ dataUrl })
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
