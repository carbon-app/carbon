import React from 'react'
import { useAsyncCallback } from 'actionsack'

import Button from './Button'

import { COLORS } from '../lib/constants'

function ImgurButton({ onClick }) {
  const [uploadToImgur, { loading }] = useAsyncCallback(onClick)

  return (
    <Button padding="8px" color={COLORS.BLUE} onClick={uploadToImgur}>
      {loading ? 'Uploading...' : 'Upload to Imgur'}
    </Button>
  )
}

export default React.memo(ImgurButton)
