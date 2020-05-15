import React from 'react'

export const Sharp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 81 81"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <rect id="a1" width="81" height="81" rx="3" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b1" fill="white">
        <use xlinkHref="#a1" />
      </mask>
      <use fill="#616161" xlinkHref="#a1" />
      <g transform="translate(16 32)" mask="url(#b1)">
        <path
          fill="#000000"
          fillRule="nonzero"
          d="M66.0458013,46.1092762 C66.0458013,48.3193105 64.2622787,50.1077029 62.050805,50.1077029 L0.174089069,50.1077029 L0.174089069,6.16868499 C0.174089069,0.174657534 0.174089069,0.174657534 0.174089069,0.174657534 L66.0458013,0.174657534 L66.0458013,46.1092762 Z"
        />
        <g transform="translate(19.96 15.27)">
          <ellipse
            cx="7.045"
            cy="7.048"
            fill="#FF5E55"
            fillRule="nonzero"
            stroke="#E0443E"
            strokeWidth=".5"
            rx="7.045"
            ry="7.048"
          />
          <ellipse
            cx="30.526"
            cy="7.048"
            fill="#FFC02C"
            fillRule="nonzero"
            stroke="#DEA123"
            strokeWidth=".5"
            rx="7.045"
            ry="7.048"
          />
        </g>
      </g>
    </g>
  </svg>
)

export const BW = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 81 81"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <rect id="a2" width="81" height="81" rx="3" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b2" fill="white">
        <use xlinkHref="#a2" />
      </mask>
      <use fill="#616161" xlinkHref="#a2" />
      <g transform="translate(17 33)" mask="url(#b2)">
        <path
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="2"
          d="M65.0458013,49.1077029 C66.0458013,49.1077029 0.174089069,49.1077029 0.174089069,49.1077029 L0.174089069,5.16868499 C0.174089069,2.41055979 2.40986586,0.174657534 5.17268563,0.174657534 L65.0458013,0.174657534 L65.0458013,49.1077029 Z"
        />
        <g fillRule="nonzero" stroke="#878787" transform="translate(18.96 14.27)">
          <ellipse cx="7.045" cy="7.048" rx="7.045" ry="7.048" />
          <ellipse cx="30.526" cy="7.048" rx="7.045" ry="7.048" />
        </g>
      </g>
    </g>
  </svg>
)

export const None = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 81 81"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <rect id="a3" width="81" height="81" rx="3" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b3" fill="white">
        <use xlinkHref="#a3" />
      </mask>
      <use fill="#616161" xlinkHref="#a3" />
      <g transform="translate(16 32)" mask="url(#b3)">
        <path
          fill="#000000"
          fillRule="nonzero"
          d="M66.0458013,46.1092762 C66.0458013,48.3193105 64.2622787,50.1077029 62.050805,50.1077029 L0.174089069,50.1077029 L0.174089069,6.16868499 C0.174089069,2.85738806 2.85846845,0.174657534 6.17268563,0.174657534 L66.0458013,0.174657534 L66.0458013,46.1092762 Z"
        />
        <g fillRule="nonzero" strokeWidth=".5" transform="translate(19.96 15.27)">
          <ellipse cx="7.045" cy="7.048" fill="#FF5E55" stroke="#E0443E" rx="7.045" ry="7.048" />
          <ellipse cx="30.526" cy="7.048" fill="#FFC02C" stroke="#DEA123" rx="7.045" ry="7.048" />
        </g>
      </g>
    </g>
  </svg>
)

export const Boxy = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect id="a3" width="81" height="81" rx="3" />
      <clipPath id="clip0">
        <rect width="60" height="60" transform="matrix(-1 0 0 1 60 0)" fill="#878787" />
      </clipPath>
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b3" fill="#878787">
        <use xlinkHref="#a3" />
      </mask>
      <use fill="#616161" xlinkHref="#a3" />
      <g clipPath="url(#clip0)">
        <path
          d="M-0.774667 57.8587C-0.774667 59.4958 0.54646 60.8205 2.18459 60.8205H48.0192V28.2731C48.0192 25.8203 46.0308 23.8331 43.5758 23.8331H-0.774667V57.8587Z"
          fill="black"
        />
        <path
          d="M18.3333 34H10.3333C9.78105 34 9.33333 34.4477 9.33333 35V43C9.33333 43.5523 9.78105 44 10.3333 44H18.3333C18.8856 44 19.3333 43.5523 19.3333 43V35C19.3333 34.4477 18.8856 34 18.3333 34Z"
          stroke="#878787"
        />
        <path
          d="M29.3333 34.8333L37.6667 43.1667"
          stroke="#878787"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.3333 43.1667L37.6667 34.8333"
          stroke="#878787"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
)
