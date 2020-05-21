import React from 'react'

const Spinner = () => {
  return (
    <div className="spinner-border">
      <div className="ball"></div>
      <div className="ball lg"></div>
      <div className="ball"></div>
      <style jsx>
        {`
          .ball {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 100%;
            background-color: white;
            vertical-align: middle;
            margin: 0.5rem auto;
          }

          .lg {
            width: 0.75rem;
            height: 0.75rem;
          }

          @-webkit-keyframes spinner-border {
            0% {
              transform: rotate(90deg);
            }
            50% {
              transform: rotate(270deg);
            }
            100% {
              transform: rotate(450deg);
            }
          }

          @keyframes spinner-border {
            0% {
              transform: rotate(90deg);
            }
            50% {
              transform: rotate(270deg);
            }
            100% {
              transform: rotate(450deg);
            }
          }

          .spinner-border {
            display: inline-block;
            overflow: hidden;
            margin: 0px auto;
            text-align: center;
            top: 35%;
            left: 50%;
            position: relative;
            transform: rotate(90deg);
            animation-fill-mode: both;
            -webkit-animation: spinner-border 1s 0s infinite cubic-bezier(0.6, -0.1, 0.25, 0.6);
            animation: spinner-border 1.5s 0s infinite cubic-bezier(0.6, -0.1, 0.25, 0.6);
          }
        `}
      </style>
    </div>
  )
}

export default Spinner
