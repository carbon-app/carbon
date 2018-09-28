import React from 'react'

const Toast = () => (
  <div className="toast mb4">
    <div className="toast-content">
      <p>Enjoy using Carbon? Want to work with the team that created it?</p>
      <a href="https://dawnlabs.io/jobs">We&#39;re hiring!</a>
      <a className="close-toast" href="#">
        &times;
      </a>
    </div>
    <style jsx>
      {`
        .toast {
          width: 704px;
          padding: 8px 16px;
          background: #fff;
          color: #000;
          border-radius: 2px;
          margin-top: calc(var(--x4) * -1);
        }

        .toast-content {
          display: flex;
          align-items: center;
        }

        a {
          text-decoration: underline;
        }

        .close-toast {
          text-decoration: none;
          margin-left: auto;
        }

        p {
          margin: 0;
          margin-right: 12px;
        }
      `}
    </style>
  </div>
)

export default Toast
