import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import WindowPointer from './WindowPointer'
import { COLORS } from '../lib/constants'

class Popout extends React.PureComponent {
  static defaultProps = {
    borderColor: COLORS.SECONDARY,
    style: {},
    onClickOutside: () => {}
  }

  handleClickOutside = e => !this.props.hidden && this.props.onClickOutside(e)

  render() {
    const { children, borderColor, style, hidden, pointerLeft, pointerRight } = this.props

    if (hidden) {
      return null
    }

    return (
      <div className="popout" style={style}>
        <WindowPointer fromLeft={pointerLeft} fromRight={pointerRight} color={borderColor} />
        {children}
        <style jsx>
          {`
            .popout {
              position: absolute;
              background-color: ${COLORS.BLACK};
              border: 2px solid ${borderColor};
              border-radius: 3px;
              margin-top: 10px;
              font-size: 12px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Popout)
