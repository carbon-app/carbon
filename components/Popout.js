import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import WindowPointer from './WindowPointer'
import { COLORS } from '../lib/constants'
import { toggle } from '../lib/util'

export const managePopout = WrappedComponent => {
  class PopoutManager extends React.Component {
    state = {
      isVisible: false,
    }

    toggleVisibility = () => this.setState(toggle('isVisible'))

    handleClickOutside = () => this.setState({ isVisible: false })

    handleKeyDown = e => {
      if (e.key === 'Escape') {
        this.handleClickOutside()
      }
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isVisible={this.state.isVisible}
          toggleVisibility={this.toggleVisibility}
        />
      )
    }
  }

  return enhanceWithClickOutside(PopoutManager)
}

class Popout extends React.PureComponent {
  static defaultProps = {
    borderColor: COLORS.SECONDARY,
    style: {},
  }

  render() {
    const { id, children, borderColor, style, hidden, pointerLeft, pointerRight } = this.props

    if (hidden) {
      return null
    }

    return (
      <div id={id} className="popout" style={style}>
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

export default Popout
