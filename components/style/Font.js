export default () => (
  <style jsx global>
    {`
      @font-face {
        font-family: 'Iosevka';
        src: url('//cdn.jsdelivr.net/npm/@typopro/web-iosevka@3.7.5/TypoPRO-iosevka-term-bold.woff')
          format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Monoid';
        src: url('//cdn.jsdelivr.net/npm/@typopro/web-monoid@3.7.5/TypoPRO-Monoid-Regular.woff')
            format('woff2'),
          url('//cdn.jsdelivr.net/npm/@typopro/web-monoid@3.7.5/TypoPRO-Monoid-Regular.woff')
            format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Fantasque Sans Mono';
        src: url('//cdn.jsdelivr.net/npm/@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono-Regular.woff')
            format('woff2'),
          url('//cdn.jsdelivr.net/npm/@typopro/web-fantasque-sans-mono@3.7.5/TypoPRO-FantasqueSansMono-Regular.woff')
            format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Hack';
        src: url('//cdn.jsdelivr.net/font-hack/2.020/fonts/woff2/hack-regular-webfont.woff2?v=2.020')
            format('woff2'),
          url('//cdn.jsdelivr.net/font-hack/2.020/fonts/woff/hack-regular-webfont.woff?v=2.020')
            format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Fira Code';
        src: url('//cdn.rawgit.com/tonsky/FiraCode/1.204/distr/woff2/FiraCode-Regular.woff2')
            format('woff2'),
          url('//cdn.rawgit.com/tonsky/FiraCode/1.204/distr/woff/FiraCode-Regular.woff')
            format('woff');
        font-weight: 400;
        font-style: normal;
      }

      /* latin */
      @font-face {
        font-family: 'IBM Plex Mono';
        font-style: italic;
        font-weight: 500;
        src: local('IBM Plex Mono Medium Italic'), local('IBMPlexMono-MediumItalic'),
          url(https://fonts.gstatic.com/s/ibmplexmono/v2/-F6sfjptAgt5VM-kVkqdyU8n1ioSJlR1gMoQPttozw.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2191, U + 2193, U + 2212,
          U + 2215, U + FEFF, U + FFFD;
      }

      /* latin */
      @font-face {
        font-family: 'Anonymous Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Anonymous Pro Regular'), local('AnonymousPro-Regular'),
          url(//fonts.gstatic.com/s/anonymouspro/v11/Zhfjj_gat3waL4JSju74E3n3cbdKJftHIk87C9ihfO8.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2212, U + 2215;
      }

      /* latin */
      @font-face {
        font-family: 'Droid Sans Mono';
        font-style: normal;
        font-weight: 400;
        src: local('Droid Sans Mono Regular'), local('DroidSansMono-Regular'),
          url(//fonts.gstatic.com/s/droidsansmono/v9/ns-m2xQYezAtqh7ai59hJVlgUn8GogvcKKzoM9Dh-4E.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2212, U + 2215;
      }

      /* latin */
      @font-face {
        font-family: 'Inconsolata';
        font-style: normal;
        font-weight: 400;
        src: local('Inconsolata Regular'), local('Inconsolata-Regular'),
          url(//fonts.gstatic.com/s/inconsolata/v16/BjAYBlHtW3CJxDcjzrnZCIgp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2212, U + 2215;
      }

      /* latin */
      @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Code Pro'), local('SourceCodePro-Regular'),
          url(//fonts.gstatic.com/s/sourcecodepro/v7/mrl8jkM18OlOQN8JLgasD5bPFduIYtoLzwST68uhz_Y.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2212, U + 2215;
      }

      /* latin */
      @font-face {
        font-family: 'Ubuntu Mono';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Mono'), local('UbuntuMono-Regular'),
          url(//fonts.gstatic.com/s/ubuntumono/v7/ViZhet7Ak-LRXZMXzuAfkYgp9Q8gbYrhqGlRav_IXfk.woff2)
            format('woff2');
        unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6, U + 02da,
          U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2212, U + 2215;
      }
    `}
  </style>
)
