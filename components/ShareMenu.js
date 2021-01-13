import React from 'react'

import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import ShareSVG from './svg/Share'
import TweetButton from './TweetButton'
import ImgurButton from './ImgurButton'
const popoutStyle = { width: '140px', right: 0 }

function ShareMenu({ isVisible, toggleVisibility, tweet, imgur }) {
  return (
    <div className="share-menu-container">
      <div className="flex">
        <Button
          center
          border
          large
          padding="0 16px"
          margin="0 8px 0 0"
          onClick={toggleVisibility}
          color={COLORS.BLUE}
          title="Share menu"
        >
          <ShareSVG size={16} color={COLORS.BLUE} />
        </Button>
      </div>
      <Popout hidden={!isVisible} borderColor={COLORS.BLUE} pointerRight="24px" style={popoutStyle}>
        <div className="share-row flex">
          <span>Share...</span>
          <TweetButton onClick={tweet} />
          <ImgurButton onClick={imgur} />
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
            justify-content: space-between;
            border-bottom: 1px solid ${COLORS.BLUE};
          }

          .share-row :global(button) {
            border-top: 1px solid ${COLORS.BLUE};
          }

          .share-row > span {
            padding: 8px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(ShareMenu))
