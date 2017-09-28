import { COLORS } from '../../lib/constants'

export default () => (
  <style jsx global>{`
    /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
    */

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    html,
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      background: ${COLORS.BLACK};
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue',
        sans-serif;
      font-weight: 400;
      font-style: normal;
      text-transform: initial;
      letter-spacing: initial;
      overflow-y: auto;
      min-width: 848px;
      min-height: 704px;
    }

    * {
      box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 500;
    }

    a {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }

    *::selection {
      background: rgba(255, 255, 255, 0.99);
      color: #121212;
    }

    .link {
      color: #fff;
      text-decoration: none;
      padding-bottom: 3px;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.7) 100%
      );
      background-size: 1px 1px;
      background-position: 0 100%;
      background-repeat: repeat-x;
    }

    .link:hover {
      color: ${COLORS.PRIMARY};
      background: none;
    }
  `}</style>
)
