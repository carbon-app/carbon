import React from 'react'

import Button from './Button'
import { COLORS } from '../lib/constants'
import * as Arrows from './svg/Arrows'

const MenuButton = React.memo(({ name, select, selected, noArrows }) => {
  return (
    <div className="menu-button">
      <Button
        padding="8px"
        onClick={select(name)}
        background={selected === name ? COLORS.BLACK : COLORS.DARK_GRAY}
      >
        {name}
        {!noArrows && (
          <div className="arrow-icon">
            <Arrows.Right />
          </div>
        )}
      </Button>
      <style jsx>
        {`
          .menu-button {
            display: flex;
            height: 33px;
            border-bottom: 1px solid ${COLORS.SECONDARY};
            position: relative;
            align-items: center;
          }

          .menu-button:last-child {
            ${selected === 'Misc' ? 'border-bottom: none;' : ''};
          }

          .arrow-icon {
            position: absolute;
            right: 14px;
            top: 11px;
          }
        `}
      </style>
    </div>
  )
})

export default MenuButton
