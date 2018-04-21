/* global domtoimage */
const PORT = parseInt(process.env.PORT, 10) || 3000
const ARBITRARY_WAIT_TIME = 500

module.exports = browser => async (req, res) => {
  const page = await browser.newPage()
  const { state } = req.body

  if (!state) res.status(400).send()

  try {
    await page.goto(`http://localhost:${PORT}?state=${state}`)
    await page.addScriptTag({ path: './lib/customDomToImage.js' })

    // wait for page to detect language
    await delay(ARBITRARY_WAIT_TIME)

    const targetElement = await page.$('#export-container')

    const dataUrl = await page.evaluate(target => {
      const config = {
        style: {
          transform: 'scale(2)',
          'transform-origin': 'center'
        },
        filter: n => (n.className ? String(n.className).indexOf('eliminateOnRender') < 0 : true),
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
