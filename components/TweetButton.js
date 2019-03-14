import React from 'react'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import ApiContext from './ApiContext'
import Button from './Button'

function useWindowListener(key, fn) {
  const callbackRef = React.useRef(fn)

  React.useEffect(() => {
    const cb = callbackRef.current
    window.addEventListener(key, cb)
    return () => window.removeEventListener(key, cb)
  }, [key])
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
