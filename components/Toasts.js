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
              transform: translateX(8rem);
            }
            to {
              transform: translateX(0rem);
            }
          }
          @keyframes out {
            from {
              transform: translateX(0rem);
            }
            to {
              transform: translateX(20rem);
              display: none;
            }
          }

          .toast {
            padding: 8px 16px;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 2px;
            background: #000;
            animation-name: in;
            animation-duration: 600ms;
            font-size: 14px;
          }

          .toast.out {
            animation-name: out;
            animation-fill-mode: forwards;
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
      {props.toasts.reverse().map(toast => (
        <Toast key={toast.children} {...toast} />
      ))}
      <style jsx>
        {`
          .toast {
            position: fixed;
            z-index: 9999;
            top: 2rem;
            right: 1rem;
          }
        `}
      </style>
    </div>
  )
}

export default ToastContainer
