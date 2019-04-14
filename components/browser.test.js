import { isSafari } from './Editor'

describe('Safari detection', () => {
  test('UA is Safari if UA contains `Safari` and does not contain `Chrome`', () => {
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15'
    const result = isSafari(ua)

    expect(result).toBe(true)
  })

  test('UA is not Safari if UA contains `Chrome`', () => {
    const ua =
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
    const result = isSafari(ua)

    expect(result).toBe(false)
  })
})
