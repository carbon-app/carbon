const port = parseInt(process.env.PORT, 10) || 3000

module.exports = browser => async (req, res) => {
  let page = await browser.newPage()
  let state = req.body.state

  if (!state) res.status(400).send()

  try {
    await page.goto(`http://localhost:${port}?state=${state}`)
    await page.addScriptTag({ path: `./lib/customDomToImage.js` })

    const targetElement = await page.$('#export-container')

    let dataUrl = await page.evaluate(target => {
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
    console.error(e)
    res.status(500).send()
  } finally {
    await page.close()
  }
}
