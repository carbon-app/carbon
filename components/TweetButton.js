import React from 'react'
import { useAsyncCallback, useOnline as useOnlineListener } from 'actionsack'

import { useAPI } from './ApiContext'
import Button from './Button'

import { COLORS } from '../lib/constants'

function TweetButton(props) {
  const api = useAPI()
  const online = useOnlineListener()
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  if (!api || !api.tweet) {
    return null
  }

  if (!online) {
    return null
  }

  return (
    <Button padding="8px" onClick={onClick} color={COLORS.BLUE}>
      {loading ? 'Loading…' : 'Tweet'}
    </Button>
  )
}

export default React.memo(TweetButton)
