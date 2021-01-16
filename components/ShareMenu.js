import React from 'react'

import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'
import TweetButton from './TweetButton'
import ImgurButton from './ImgurButton'
import { Down as ArrowDown } from './svg/Arrows'

const popoutStyle = { width: '120px', right: 8 }

function ShareMenu({ isVisible, toggleVisibility, tweet, imgur }) {
  return (
    <div className="share-menu-container">
      <div className="flex">
        <TweetButton onClick={tweet} />
        <Button
          id="export-menu"
          border
          large
          center
          color={COLORS.BLUE}
          padding="0 8px"
          margin="0 8px 0 -1px"
          onClick={toggleVisibility}
          data-cy="export-button"
          style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
          title="Export menu dropdown"
        >
          <ArrowDown color={COLORS.BLUE} />
        </Button>
      </div>
      <Popout hidden={!isVisible} borderColor={COLORS.BLUE} pointerRight="7px" style={popoutStyle}>
        <div className="share-row flex">
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
            /* justify-content: space-between; */
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
