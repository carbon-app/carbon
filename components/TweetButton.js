import React from 'react'
import { useAsyncCallback, useOnline as useOnlineListener } from '@dawnlabs/tacklebox'

import ApiContext from './ApiContext'
import Button from './Button'

function TweetButton(props) {
  const api = React.useContext(ApiContext)
  const online = useOnlineListener()
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  if (!api || !api.tweet) {
    return null
  }

  if (!online) {
    return null
  }

  return (
    <Button
      center
      border
      large
      padding="0 16px"
      margin="0 8px 0 0"
      onClick={onClick}
      color="#57b5f9"
    >
      {loading ? 'Loading...' : 'Tweet'}
    </Button>
  )
}

export default React.memo(TweetButton)
