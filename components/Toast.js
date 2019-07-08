import React from 'react'

const key = 'CARBON_CTA_1'

class Toast extends React.Component {
  state = {
    open: false
  }

  close = () => {
    this.setState({ open: false })
    window.localStorage.setItem(key, true)
  }

  componentDidMount() {
    window.localStorage.removeItem('CARBON_DAWN_TOAST')
    window.localStorage.removeItem('CARBON_CTA')
    if (!window.localStorage.getItem(key)) {
      this.setState({ open: true })
    }
  }

  render() {
    if (!this.state.open) {
      return null
    }

    return (
      <div className="toast mb4">
        <div className="toast-content">
          <p>Never lose a Carbon again - save your work automatically!</p>
          Click &quot;Sign up&quot; to try it out!
          <button className="close-toast" onClick={this.close}>
            &times;
          </button>
        </div>
        <style jsx>
          {`
            @keyframes slide {
              from {
                transform: translateY(-128px);
              }
              to {
                transform: translateY(0px);
              }
            }

            .toast {
              padding: 8px 16px;
              color: #fff;
              border: 1px solid #fff;
              border-radius: 2px;
              margin-top: calc(var(--x4) * -1);
              animation-name: slide;
              animation-duration: 600ms;
            }

            .toast-content {
              display: flex;
              align-items: center;
            }

            a {
              text-decoration: underline;
            }

            .close-toast {
              padding-left: 0;
              padding-right: 0;
              background: transparent;
              color: white;
              border: none;
              font-size: 100%;
              margin-left: 32px;
              text-decoration: none;
              cursor: pointer;
            }

            p {
              margin: 0;
              margin-right: 12px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Toast
