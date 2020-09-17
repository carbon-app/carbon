import React from 'react'

function Toast(props) {
  const [display, on] = React.useState(true)

  function off() {
    return on(false)
  }

  React.useEffect(() => {
    if (props.timeout) {
      const to = setTimeout(off, props.timeout)
      return () => clearTimeout(to)
    }
  }, [props.timeout])

  return (
    <div className={`toast mb2 ${display ? '' : 'out'}`}>
      <div className="toast-content">
        {props.children}
        {props.closable && (
          <button className="close" onClick={off}>
            &times;
          </button>
        )}
      </div>
      <style jsx>
        {`
          @keyframes in {
            from {
              transform: translateX(16rem);
            }
            to {
              transform: translateX(0rem);
            }
          }
          @keyframes out {
            from {
              transform: translateX(0rem);
            }
            97% {
              transform: translateX(20rem);
            }
            to {
              transform: translateX(20rem);
              display: none;
              height: 0;
              padding: 0;
              margin: 0;
            }
          }

          .toast {
            padding: 8px 16px;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 2px;
            background: #000;
            font-size: 14px;
            animation-name: in;
            animation-duration: 600ms;
            animation-direction: forwards;
            animation-fill-mode: both;
            animation-timing-function: ease-out;
          }

          .toast.out {
            animation-name: out;
          }

          .toast-content {
            display: flex;
            align-items: center;
          }

          .toast :global(.close) {
            padding-left: 0;
            padding-right: 0;
            background: transparent;
            color: white;
            border: none;
            font-size: 100%;
            margin-left: 1rem;
            text-decoration: none;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}

function ToastContainer(props) {
  return (
    <div className="toast">
      {props.toasts
        .slice()
        .reverse()
        .map(toast => (
          <Toast key={toast.children} {...toast} />
        ))}
      <style jsx>
        {`
          .toast {
            position: fixed;
            z-index: 9999;
            bottom: 1rem;
            right: 1rem;
          }
        `}
      </style>
    </div>
  )
}

export default ToastContainer
