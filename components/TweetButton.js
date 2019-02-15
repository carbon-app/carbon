import React from 'react'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import Button from './Button'

function useWindowListener(key, fn) {
  React.useEffect(() => {
    window.addEventListener(key, fn)
    return () => window.removeEventListener(key, fn)
  }, [])
}

function useOnlineListener() {
  const [online, setOnline] = React.useState(true)

  React.useEffect(() => {
    setOnline(
      typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true
    )
  }, [])

  useWindowListener('offline', () => setOnline(false))
  useWindowListener('online', () => setOnline(true))

  return online
}

function TweetButton(props) {
  const online = useOnlineListener()
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

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
