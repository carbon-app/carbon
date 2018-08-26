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

    const dataUrl = await page.evaluate((target = document) => {
      const config = {
        style: {
          transform: 'scale(2)',
          'transform-origin': 'center'
        },
        filter: n => {
          // %[00 -> 19] cause failures
          if (
            n.innerText &&
            n.innerText.match(/%\S\S/) &&
            n.className &&
            n.className.startsWith('cm-') // is CodeMirror primitive string
          ) {
            n.innerText = encodeURIComponent(n.innerText)
          }
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
