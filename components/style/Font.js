/*
 * See https://developers.google.com/web/updates/2016/02/font-display and
 * https://css-tricks.com/font-display-masses/#article-header-id-2
 * for `font-display` information
 */
import React from 'react'

export default function Font() {
  return (
    <style jsx global>
      {`
        @font-face {
          font-family: 'Iosevka';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/npm/@typopro/web-iosevka@3.7.5/TypoPRO-iosevka-term-bold.woff')
            format('woff');
        }

        @font-face {
          font-family: 'Monoid';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/npm/@typopro/web-monoid@3.7.5/TypoPRO-Monoid-Regular.woff')
              format('woff2'),
            url('//cdn.jsdelivr.net/npm/@typopro/web-monoid@3.7.5/TypoPRO-Monoid-Regular.woff')
              format('woff');
        }

        @font-face {
          font-family: 'Fantasque Sans Mono';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/npm/@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono-Regular.woff')
              format('woff2'),
            url('//cdn.jsdelivr.net/npm/@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono-Regular.woff')
              format('woff');
        }

        @font-face {
          font-family: 'Hack';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/font-hack/2.020/fonts/woff2/hack-regular-webfont.woff2?v=2.020')
              format('woff2'),
            url('//cdn.jsdelivr.net/font-hack/2.020/fonts/woff/hack-regular-webfont.woff?v=2.020')
              format('woff');
        }

        @font-face {
          font-family: 'Fira Code';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/npm/firacode@latest/distr/woff2/FiraCode-Regular.woff2')
              format('woff2'),
            url('//cdn.jsdelivr.net/npm/firacode@latest/distr/woff/FiraCode-Regular.woff')
              format('woff');
        }

        @font-face {
          font-family: 'JetBrains Mono';
          font-display: swap;
          src: url('//cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Regular.woff2')
              format('woff2'),
            url('//cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Regular.woff')
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'IBM Plex Mono';
          font-display: swap;
          font-weight: 500;
          src: local('IBM Plex Mono Regular'), local('IBMPlexMono-Regular'),
            url(//fonts.gstatic.com/s/ibmplexmono/v6/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Anonymous Pro';
          font-display: swap;
          src: local('Anonymous Pro Regular'), local('AnonymousPro-Regular'),
            url(//fonts.gstatic.com/s/anonymouspro/v11/Zhfjj_gat3waL4JSju74E3n3cbdKJftHIk87C9ihfO8.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Droid Sans Mono';
          font-display: swap;
          src: local('Droid Sans Mono Regular'), local('DroidSansMono-Regular'),
            url(//fonts.gstatic.com/s/droidsansmono/v9/ns-m2xQYezAtqh7ai59hJVlgUn8GogvcKKzoM9Dh-4E.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Inconsolata';
          font-display: swap;
          src: local('Inconsolata Regular'), local('Inconsolata-Regular'),
            url(//fonts.gstatic.com/s/inconsolata/v16/BjAYBlHtW3CJxDcjzrnZCIgp9Q8gbYrhqGlRav_IXfk.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Source Code Pro';
          font-display: swap;
          src: local('Source Code Pro'), local('SourceCodePro-Regular'),
            url(//fonts.gstatic.com/s/sourcecodepro/v7/mrl8jkM18OlOQN8JLgasD5bPFduIYtoLzwST68uhz_Y.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Ubuntu Mono';
          font-display: swap;
          src: local('Ubuntu Mono'), local('UbuntuMono-Regular'),
            url(//fonts.gstatic.com/s/ubuntumono/v7/ViZhet7Ak-LRXZMXzuAfkYgp9Q8gbYrhqGlRav_IXfk.woff2)
              format('woff2');
        }

        /* latin */
        @font-face {
          font-family: 'Space Mono';
          font-display: swap;
          src: local('Space Mono'), local('SpaceMono-Regular'),
            url(https://fonts.gstatic.com/s/spacemono/v2/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2)
              format('woff2');
        }
      `}
    </style>
  )
}
