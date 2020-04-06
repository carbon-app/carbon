import React from 'react'

// Feature flag
const ACTIVE = false

const key = 'CARBON_CTA_3'

function Toast() {
  const [open, setState] = React.useState(false)

  React.useEffect(() => {
    window.localStorage.removeItem('CARBON_CTA_2')
    window.localStorage.removeItem('CARBON_CTA_3')
    if (!window.localStorage.getItem(key)) {
      setState(true)
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  if (!ACTIVE) {
    return null
  }

  if (!open) {
    return null
  }

  function close() {
    setState(false)
    window.localStorage.setItem(key, true)
  }

  return (
    <div className="toast mb4">
      <div className="toast-content">
        <p>Help fight climate change by offsetting your carbon output</p> —
        <a href="/offsets" target="_blank" rel="noreferrer noopener">
          Find out how
        </a>
        <button className="close-toast" onClick={close}>
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
            max-width: 100vw;
            margin-left: auto;
            margin-right: auto;
          }

          .toast-content {
            display: flex;
            align-items: center;
          }

          a {
            text-decoration: underline;
            margin-left: 12px;
          }

          .close-toast {
            padding-left: 0;
            padding-right: 0;
            background: transparent;
            color: white;
            border: none;
            font-size: 100%;
            margin-left: 16px;
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

export default Toast
