import React from 'react'
import { useAsyncCallback } from 'actionsack'

import Button from './Button'

import { COLORS } from '../lib/constants'

function ImgurButton({ onClick }) {
  const [showUploaded, { loading: uploaded }] = useAsyncCallback(
    () => new Promise(res => setTimeout(res, 1000))
  )

  const [uploadToImgur, { loading }] = useAsyncCallback(async (...args) => {
    await onClick(...args)
    showUploaded()
  })

  return (
    <Button padding="8px" color={COLORS.BLUE} onClick={uploadToImgur}>
      {loading ? 'Uploading...' : uploaded ? 'Uploaded!' : 'Upload to imgur'}
    </Button>
  )
}

export default React.memo(ImgurButton)
