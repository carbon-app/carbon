import React from 'react'
import { useAsyncCallback, useOnline as useOnlineListener } from 'actionsack'

import { useAPI } from './ApiContext'
import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import { Down as ArrowDown } from './svg/Arrows'

const popoutStyle = { width: '144px', right: 8 }

function ShareMenu({ isVisible, toggleVisibility, tweet, imgur }) {
  const api = useAPI()
  const online = useOnlineListener()

  const [onClickTweet, { loading: tweeting }] = useAsyncCallback(tweet)
  const [onClickImgur, { loading: imguring }] = useAsyncCallback(imgur)

  if (!api || !api.tweet) {
    return null
  }

  if (!online) {
    return null
  }

  return (
    <div className="share-menu-container">
      <div className="flex">
        <Button
          center
          border
          large
          padding="0 16px"
          margin="0"
          onClick={onClickTweet}
          color={COLORS.BLUE}
          style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
        >
          {tweeting ? 'Loading…' : 'Tweet'}
        </Button>
        <Button
          id="share-menu"
          border
          large
          center
          color={COLORS.BLUE}
          padding="0 8px"
          margin="0 8px 0 -1px"
          onClick={toggleVisibility}
          data-cy="share-button"
          style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
          title="Share menu dropdown"
        >
          <ArrowDown color={COLORS.BLUE} />
        </Button>
      </div>
      <Popout hidden={!isVisible} borderColor={COLORS.BLUE} pointerRight="7px" style={popoutStyle}>
        <div className="share-row flex">
          <Button padding="8px" color={COLORS.BLUE} onClick={onClickImgur}>
            {imguring ? 'Uploading...' : 'Upload to Imgur (beta)'}
          </Button>
        </div>
      </Popout>
      <style jsx>
        {`
          .share-menu-container {
            position: relative;
            color: ${COLORS.BLUE};
            flex: 1;
          }

          .share-row {
            flex-direction: column;
            /* justify-content: space-between; */
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(ShareMenu))
