import React from 'react'

export const Controls = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5" />
      <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5" />
      <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5" />
    </g>
  </svg>
)

export const ControlsBW = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
    <g fill="none" fillRule="evenodd" stroke="#878787" transform="translate(1 1)">
      <circle cx="6" cy="6" r="6" />
      <circle cx="26" cy="6" r="6" />
      <circle cx="46" cy="6" r="6" />
    </g>
  </svg>
)

export const ControlsBoxy = () => (
  <svg width="58" height="14" viewBox="0 0 58 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 7H11" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M35 1H25C24.4477 1 24 1.44772 24 2V12C24 12.5523 24.4477 13 25 13H35C35.5523 13 36 12.5523 36 12V2C36 1.44772 35.5523 1 35 1Z"
      stroke="#878787"
    />
    <path d="M47 2L57 12" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M47 12L57 2" stroke="#878787" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ConstrolsXP = (props) => (
    <svg
      width={70}
      height={23}
      viewBox="0 0 48.45 14"
      fill="none"
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient
          xlinkHref="#a"
          id="d"
          cx={52.678}
          cy={27.118}
          fx={52.678}
          fy={27.118}
          r={9.978}
          gradientTransform="matrix(.01062 .7417 -.4646 .00665 48.283 -35.461)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#b"
          id="f"
          cx={4.67}
          cy={26.761}
          fx={4.67}
          fy={26.761}
          r={9.91}
          gradientTransform="matrix(.0243 1.64784 -1.34872 .01988 40.23 -5.45)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#c"
          id="e"
          cx={29.31}
          cy={27.217}
          fx={29.31}
          fy={27.217}
          r={9.924}
          gradientTransform="matrix(.0317 1.09429 -.93802 .02718 44.795 -29.715)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient id="c">
          <stop
            style={{
              stopColor: "#527ab9",
              stopOpacity: 1,
            }}
            offset={0}
          />
          <stop
            style={{
              stopColor: "#3058a2",
              stopOpacity: 1,
            }}
            offset={1}
          />
        </linearGradient>
        <linearGradient id="b">
          <stop
            style={{
              stopColor: "#5880bd",
              stopOpacity: 1,
            }}
            offset={0}
          />
          <stop
            style={{
              stopColor: "#3058a2",
              stopOpacity: 1,
            }}
            offset={1}
          />
        </linearGradient>
        <linearGradient id="a">
          <stop
            style={{
              stopColor: "#e5a394",
              stopOpacity: 1,
            }}
            offset={0}
          />
          <stop
            style={{
              stopColor: "#e14d31",
              stopOpacity: 1,
            }}
            offset={1}
          />
        </linearGradient>
      </defs>
      <path
        style={{
          fill: "#fff",
          fillOpacity: 1,
          strokeWidth: 2.53544,
          strokeOpacity: 0.984314,
        }}
        d="M32.777-.484h14.267v15.15H32.777z"
      />
      <path
        style={{
          fill: "#fff",
          fillOpacity: 1,
          strokeWidth: 2.54527,
          strokeOpacity: 0.984314,
        }}
        d="M17.178-.425h14.267v15.268H17.178z"
      />
      <path
        style={{
          fill: "#fff",
          fillOpacity: 1,
          strokeWidth: 2.56164,
          strokeOpacity: 0.984314,
        }}
        d="M1.637-.366h14.62v15.091H1.637z"
      />
      <path
        style={{
          fill: "#3058a2",
          fillOpacity: 1,
          strokeWidth: 0.108686,
        }}
        d="M48.463-1.508 24.245-1.5H-.003l-.002 8.673.008 8.325 24.484.014 23.996-.007-.015-8.384-.005-8.63zM45.585-.034l.488.247c.268.136.598.415.733.618l.246.368v12.11l-.246.368c-.135.203-.462.48-.728.614-.484.245-.487.244-5.977.234-3.02-.005-5.647-.053-5.835-.107-.444-.13-.977-.742-1.126-1.295-.08-.296-.108-2.3-.086-6.178l.031-5.74.307-.4c.628-.823.231-.774 6.536-.808l5.657-.031zm-21.081.007c5.426-.001 5.44 0 5.918.244.264.134.578.382.7.55.22.302.225.421.225 6.487s-.004 6.185-.224 6.486c-.123.169-.437.417-.7.551-.479.245-.486.226-5.977.216-3.021-.005-5.631-.033-5.804-.084-.408-.122-.921-.608-1.11-1.051-.122-.283-.15-1.46-.15-6.106 0-3.795.038-5.862.114-6.063.172-.455.747-1.001 1.184-1.123.23-.063 2.59-.107 5.824-.107zM5.64-.017c.862-.005 1.98 0 3.445.01 5.447.032 5.568.037 5.869.26.168.125.416.39.55.588l.247.358v12.11l-.246.358a2.902 2.902 0 0 1-.551.586c-.301.223-.411.23-5.979.25-3.789.013-5.778-.02-5.996-.097a2.063 2.063 0 0 1-.581-.345c-.572-.518-.561-.375-.561-6.807S1.826.97 2.398.444c.38-.349.658-.448 3.243-.461zm28.13 1.636zm3.953 2.496c.235.23.549.55.976.984-.427-.434-.74-.754-.976-.984zm2.82 1.847zm.835.792zm-.312.646zm-3.229 1.302z"
      />
      <path
        style={{
          fill: "url(#d)",
          fillOpacity: 1,
          strokeWidth: 1.80228,
          strokeOpacity: 0.984314,
        }}
        d="M40.075.516c-5.222 0-5.482.01-5.813.211-.19.116-.392.3-.448.407-.056.109-.136 2.758-.178 5.915-.085 6.352-.09 6.296.612 6.724.348.212.535.218 5.827.219 4.674 0 5.513-.024 5.785-.165.66-.34.65-.236.65-6.625 0-5.227-.02-5.852-.18-6.098-.389-.593-.34-.589-6.255-.588Zm2.956 2.991.377.38.377.378-1.41 1.44c-.775.79-1.409 1.49-1.409 1.551 0 .063.635.76 1.41 1.55l1.411 1.437-.378.379-.38.38-1.408-1.412c-.774-.777-1.47-1.426-1.547-1.442-.078-.016-.775.607-1.552 1.386-.776.778-1.44 1.416-1.475 1.416-.097 0-.646-.598-.646-.704 0-.052.647-.747 1.437-1.545l1.436-1.451-1.481-1.492-1.483-1.493.364-.373c.44-.454.317-.528 2.026 1.207.696.707 1.306 1.285 1.356 1.285.05 0 .74-.647 1.533-1.438z"
      />
      <path
        style={{
          fill: "url(#e)",
          fillOpacity: 1,
          strokeWidth: 1.80228,
          strokeOpacity: 0.984314,
        }}
        d="M24.39.516c-4.569 0-5.437.024-5.703.162-.681.352-.653.073-.653 6.553 0 3.966.037 5.978.114 6.123.064.119.272.31.462.426.331.202.591.211 5.757.212 6.048 0 6.04.002 6.332-.698.236-.567.236-11.513 0-12.08-.293-.699-.285-.698-6.31-.698Zm-3.531 3.151h7.173v7.173H20.86V7.254Zm.543 1.957V10.298h2.989c1.644 0 2.99-.037 2.992-.082l.026-2.338.025-2.254H24.42z"
      />
      <path
        style={{
          fill: "url(#f)",
          fillOpacity: 1,
          strokeWidth: 1.80228,
          strokeOpacity: 0.984314,
        }}
        d="M8.785.516c-5.288 0-5.464.006-5.81.22-.196.121-.41.373-.475.56-.08.227-.118 2.208-.118 6.033 0 6.22-.007 6.15.626 6.493.447.243 11.078.25 11.546.008.681-.353.653-.071.653-6.576 0-6.504.028-6.224-.653-6.576C14.288.54 13.412.516 8.785.516ZM5.1 8.884h4.673v1.956H5.1v-.978Z"
      />
    </svg>
)
