import React from 'react'
import { useAsyncCallback } from '@dawnlabs/tacklebox'

import Button from './Button'

function useWindowListener(key, fn) {
  React.useEffect(() => {
    window.addEventListener(key, fn)
    return () => window.removeEventListener(key, fn)
  }, [])
}

function TweetButton(props) {
  const [online, setOnline] = React.useState(true)
  const [onClick, { loading }] = useAsyncCallback(props.onClick)

  React.useEffect(() => {
    setOnline(Boolean(window && window.navigator && window.navigator.onLine))
  }, [])

  useWindowListener('offline', () => setOnline(false))
  useWindowListener('online', () => setOnline(true))

  if (!online) {
    return null
  }

  return (
    <Button border large padding="0 16px" margin="0 8px 0 0" onClick={onClick} color="#57b5f9">
      {loading ? 'Loading...' : 'Tweet'}
    </Button>
  )
}

export default React.memo(TweetButton)
