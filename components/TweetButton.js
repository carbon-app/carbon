import React from 'react'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import Button from './Button'

function TweetButton(props) {
  const [onClick, { loading }] = useAsyncCallback(props.onClick)
  return (
    <Button border large padding="0 16px" margin="0 8px 0 0" onClick={onClick} color="#57b5f9">
      {loading ? 'Loading...' : 'Tweet'}
    </Button>
  )
}

export default React.memo(TweetButton)
