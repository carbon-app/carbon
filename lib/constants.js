import toHash from 'tohash'

export const FONTS = [
  { id: 'Anonymous Pro', name: 'Anonymous Pro' },
  { id: 'Droid Sans Mono', name: 'Droid Sans Mono' },
  { id: 'Fantasque Sans Mono', name: 'Fantasque Sans Mono' },
  { id: 'Fira Code', name: 'Fira Code' },
  { id: 'Hack', name: 'Hack' },
  { id: 'IBM Plex Mono', name: 'IBM Plex Mono' },
  { id: 'Inconsolata', name: 'Inconsolata' },
  { id: 'Iosevka', name: 'Iosevka' },
  { id: 'Monoid', name: 'Monoid' },
  { id: 'Source Code Pro', name: 'Source Code Pro' },
  { id: 'Space Mono', name: 'Space Mono' },
  { id: 'Ubuntu Mono', name: 'Ubuntu Mono' }
]

export const DEFAULT_HIGHLIGHTS = {
  background: '#fff',
  text: '#f50',
  variable: '#05a',
  definition: '#00f',
  keyword: '#708',
  operator: '#fff',
  property: '#fff',
  number: '#164',
  string: '#a11',
  tag: '#170',
  attribute: '#00c',
  comment: '#a50'
  //meta: '#555'
}

export const HIGHLIGHT_KEYS = Object.keys(DEFAULT_HIGHLIGHTS)

// TODO: Add more theme highlights
export const THEMES = [
  {
    id: '3024-night',
    name: '3024 Night',
    highlights: {
      background: '#090300',
      text: '#d6d5d4',
      comment: '#cdab53',
      keyword: '#db2d20',
      number: '#a16a94',
      property: '#01a252',
      string: '#fded02',
      variable: '#01a0e4',
      definition: '#e8bbd0'
    }
  },
  {
    id: 'blackboard',
    name: 'Blackboard',
    highlights: {
      background: '#0C1021',
      text: '#F8F8F8',
      keyword: '#FBDE2D',
      number: '#D8FA3C',
      definition: '#8DA6CE',
      variable: '#FF6400',
      comment: '#AEAEAE',
      string: '#61CE3C',
      meta: '#D8FA3C',
      tag: '#8DA6CE',
      attribute: '#8DA6CE'
    }
  },
  {
    id: 'base16-dark',
    name: 'Base 16 (Dark)',
    highlights: {
      background: '#151515',
      text: '#e0e0e0',
      property: '#90a959',
      keyword: '#ac4142',
      number: '#aa759f',
      definition: '#d28445',
      variable: '#6a9fb5',
      comment: '#8f5536',
      string: '#f4bf75',
      tag: '#ac4142'
    }
  },
  {
    id: 'base16-light',
    name: 'Base 16 (Light)',
    light: true,
    highlights: {
      background: '#f5f5f5',
      text: '#202020',
      property: '#90a959',
      tag: '#ac4142',
      attribute: '#90a959',
      comment: '#8f5536',
      definition: '#d28445',
      keyword: '#ac4142',
      number: '#aa759f',
      string: '#f4bf75',
      variable: '#90a959'
    }
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    highlights: {
      background: '#002240',
      text: '#fff',
      tag: '#9effff',
      attribute: '#ff80e1',
      comment: '#08f',
      definition: '#fff',
      keyword: '#ffee80',
      meta: '#ff9d00',
      number: '#ff80e1',
      operator: '#fff',
      property: '#fff',
      string: '#3ad900',
      variable: '#9effff'
    }
  },
  {
    id: 'dracula',
    name: 'Dracula',
    highlights: {
      background: '#282a36',
      text: '#f8f8f2',
      property: '#66d9ef',
      tag: '#ff79c6',
      attribute: '#50fa7b',
      comment: '#6272a4',
      definition: '#50fa7b',
      keyword: '#ff79c6',
      meta: '#f8f8f2',
      number: '#bd93f9',
      operator: '#ff79c6',
      string: '#f1fa8c',
      variable: '#fff'
    }
  },
  {
    id: 'duotone-dark',
    name: 'Duotone',
    highlights: {
      background: '#2a2734',
      color: '#6c6783',
      property: '#9a86fd',
      tag: '#eeebff',
      attribute: '#ffcc99',
      comment: '#6c6783',
      definition: '#eeebff',
      keyword: '#ffcc99',
      number: '#ffcc99',
      operator: '#ffad5c',
      string: '#ffb870',
      variable: '#ffcc99'
    }
  },
  {
    id: 'hopscotch',
    name: 'Hopscotch',
    highlights: {
      background: '#322931',
      text: '#d5d3d5',
      property: '#8fc13e',
      tag: '#dd464c',
      attribute: '#8fc13e',
      comment: '#b33508',
      definition: '#fd8b19',
      keyword: '#dd464c',
      number: '#c85e7c',
      string: '#fdcc59',
      variable: '#0066ff'
    }
  },
  {
    id: 'lucario',
    name: 'Lucario',
    highlights: {
      background: '#2b3e50',
      text: '#f8f8f2',
      property: '#f8f8f2',
      tag: '#ff6541',
      attribute: '#66D9EF',
      comment: '#5c98cd',
      definition: '#72C05D',
      keyword: '#ff6541',
      meta: '#f8f8f2',
      number: '#ca94ff',
      operator: '#66D9EF',
      string: '#E6DB74',
      variable: '#f8f8f2'
    }
  },
  {
    id: 'material',
    name: 'Material',
    highlights: {
      background: '#263238',
      text: 'rgba(233, 237, 237, 1)',
      property: '#80CBAE',
      tag: 'rgba(255, 83, 112, 1)',
      attribute: '#FFCB6B',
      comment: '#546E7A',
      definition: 'rgba(233, 237, 237, 1)',
      keyword: 'rgba(199, 146, 234, 1)',
      meta: '#80CBC4',
      number: '#F77669',
      operator: 'rgba(233, 237, 237, 1)',
      string: '#C3E88D',
      variable: '#80CBC4'
    }
  },
  {
    id: 'monokai',
    name: 'Monokai',
    highlights: {
      background: '#272822',
      text: '#f8f8f2',
      property: '#a6e22e',
      tag: '#bc6283',
      attribute: '#a6e22e',
      comment: '#75715e',
      definition: '#fd971f',
      keyword: '#f92672',
      number: '#ae81ff',
      string: '#e6db74',
      variable: '#9effff'
    }
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    highlights: {
      background: '#011627',
      text: '#abb2bf',
      property: '#fff',
      attribute: '#F78C6C',
      comment: '#5c6370',
      definition: '#82AAFF',
      keyword: '#c792ea',
      meta: '#7fdbca',
      number: '#F78C6C',
      operator: '#c792ea',
      string: '#ecc48d',
      variable: '#82AAFF'
    }
  },
  {
    id: 'nord',
    name: 'Nord',
    highlights: {
      background: '#2e3440',
      text: '#d8dee9',
      property: '#D8DEE9',
      tag: '#81A1C1',
      attribute: '#8FBCBB',
      comment: '#4C566A',
      definition: '#D8DEE9',
      keyword: '#81A1C1',
      meta: '#81A1C1',
      number: '#B48EAD',
      operator: '#81A1C1',
      string: '#A3BE8C',
      variable: '#88C0D0'
    }
  },
  {
    id: 'oceanic-next',
    name: 'Oceanic Next',
    highlights: {
      background: '#304148',
      text: '#f8f8f2',
      property: '#99C794',
      tag: '#C594C5',
      attribute: '#C594C5',
      comment: '#65737E',
      definition: '#6699CC',
      keyword: '#C594C5',
      number: '#F99157',
      string: '#99C794',
      variable: '#f8f8f2'
    }
  },
  {
    id: 'one-light',
    name: 'One Light',
    light: true,
    highlights: {
      background: '#fafafa',
      text: '#383a42',
      property: '#4078f2',
      tag: '#e45649',
      attribute: '#d19a66',
      comment: '#a0a1a7',
      definition: '#4078f2',
      keyword: '#a626a4',
      meta: '#383a42',
      number: '#986801',
      operator: '#0184bc',
      string: '#50a14f',
      variable: '#e06c75'
    }
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    highlights: {
      background: '#282c34',
      text: '#abb2bf',
      property: '#56b6c2',
      tag: '#e06c75',
      attribute: '#d19a66',
      comment: '#5c6370',
      definition: '#e5c07b',
      keyword: '#c678dd',
      meta: '#abb2bf',
      number: '#d19a66',
      operator: '#56b6c2',
      string: '#98c379',
      variable: '#e06c75'
    }
  },
  {
    id: 'panda-syntax',
    name: 'Panda',
    highlights: {
      background: '#292A2B',
      text: '#E6E6E6',
      property: '#f3f3f3',
      tag: '#ff2c6d',
      attribute: '#ffb86c',
      comment: '#676B79',
      definition: '#e6e6e6',
      keyword: '#FF75B5',
      meta: '#b084eb',
      number: '#FFB86C',
      operator: '#f3f3f3',
      string: '#19F9D8',
      variable: '#ff9ac1'
    }
  },
  {
    id: 'paraiso-dark',
    name: 'Paraiso',
    highlights: {
      background: '#2f1e2e',
      text: '#b9b6b0',
      property: '#48b685',
      tag: '#ef6155',
      attribute: '#48b685',
      comment: '#e96ba8',
      definition: '#f99b15',
      keyword: '#ef6155;',
      number: '#815ba4',
      string: '#fec418',
      variable: '#06b6ef'
    }
  },
  {
    id: 'seti',
    name: 'Seti',
    highlights: {
      background: '#151718',
      text: '#CFD2D1',
      property: '#a074c4',
      tag: '#55b5db',
      attribute: '#9fca56',
      comment: '#41535b',
      definition: '#55b5db',
      keyword: '#e6cd69',
      meta: '#55b5db',
      number: '#cd3f45',
      operator: '#9fca56',
      string: '#55b5db',
      variable: '#a074c4'
    }
  },
  {
    id: 'solarized dark',
    name: 'Solarized (Dark)',
    link: 'solarized',
    highlights: {
      background: '#002b36',
      text: '#839496',
      property: '#2aa198',
      tag: '#93a1a1',
      attribute: '#2aa198',
      comment: '#586e75',
      definition: '#2aa198',
      keyword: '#cb4b16',
      meta: '#859900',
      number: '#d33682',
      operator: '#6c71c4',
      string: '#859900',
      variable: '#b58900'
    }
  },
  {
    id: 'solarized light',
    name: 'Solarized (Light)',
    link: 'solarized',
    light: true,
    highlights: {
      background: '#fdf6e3',
      text: '#657b83',
      property: '#2aa198',
      tag: '#93a1a1',
      attribute: '#2aa198',
      comment: '#586e75',
      definition: '#2aa198',
      keyword: '#cb4b16',
      meta: '#859900',
      number: '#d33682',
      operator: '#6c71c4',
      string: '#859900',
      variable: '#839496'
    }
  },
  {
    id: 'tomorrow-night-bright',
    name: 'Tomorrow Night',
    highlights: {
      background: '#000000',
      text: '#eaeaea',
      property: '#99cc99',
      tag: '#d54e53',
      attribute: '#99cc99',
      comment: '#d27b53',
      definition: '#e78c45',
      keyword: '#d54e53',
      number: '#a16a94',
      string: '#e7c547',
      variable: '#7aa6da'
    }
  },
  {
    id: 'twilight',
    name: 'Twilight',
    highlights: {
      background: '#141414',
      text: '#f7f7f7',
      tag: '#997643',
      attribute: '#d6bb6d',
      comment: '#777',
      definition: '#607392',
      keyword: '#f9ee98',
      meta: '#f7f7f7',
      number: '#ca7841',
      operator: '#cda869',
      string: '#8f9d6a',
      variable: '#607392'
    }
  },
  {
    id: 'verminal',
    name: 'Verminal',
    highlights: {
      background: 'rgba(0, 0, 0, 0.85)',
      text: '#fff',
      property: '#0af',
      tag: '#e06c75',
      attribute: '#d19a66',
      comment: '#5c6370',
      definition: '#34B7FF',
      keyword: '#9AE1FF',
      meta: '#abb2bf',
      number: '#d19a66',
      operator: '#FA78C3',
      string: '#98c379',
      variable: '#ff9ba3'
    }
  },
  {
    id: 'yeti',
    name: 'Yeti',
    light: true,
    highlights: {
      background: '#ECEAE8',
      text: '#d1c9c0',
      property: '#a074c4',
      tag: '#96c0d8',
      attribute: '#9fb96e',
      comment: '#d4c8be',
      definition: '#55b5db',
      keyword: '#9fb96e',
      meta: '#96c0d8',
      number: '#a074c4',
      operator: '#9fb96e',
      string: '#96c0d8',
      variable: '#a074c4'
    }
  },
  {
    id: 'zenburn',
    name: 'Zenburn',
    highlights: {
      background: '#3f3f3f',
      text: '#dcdccc',
      property: '#dfaf8f',
      tag: '#93e0e3',
      attribute: '#dfaf8f',
      comment: '#7f9f7f',
      definition: '#dcdccc',
      keyword: '#f0dfaf',
      meta: '#f0dfaf',
      number: '#dcdccc',
      operator: '#f0efd0',
      string: '#cc9393',
      variable: '#dcdccc'
    }
  }
].map(t => ({ ...t, highlights: { ...DEFAULT_HIGHLIGHTS, ...(t.highlights || {}) } }))

export const THEMES_HASH = toHash(THEMES)

export const LANGUAGES = [
  {
    name: 'Auto',
    mode: 'auto'
  },
  {
    name: 'Apache',
    mode: 'apache',
    mime: 'text/apache',
    custom: true
  },
  {
    name: 'Bash',
    mode: 'shell',
    mime: 'application/x-sh'
  },
  {
    name: 'Plain Text',
    mode: 'text'
  },
  {
    name: 'C',
    mode: 'clike',
    mime: 'text/x-csrc',
    short: 'c'
  },
  {
    name: 'C++',
    mode: 'clike',
    mime: 'text/x-c++src',
    short: 'cpp'
  },
  {
    name: 'C#',
    mode: 'clike',
    mime: 'text/x-csharp',
    short: 'cs'
  },
  {
    name: 'Clojure',
    mode: 'clojure'
  },
  {
    name: 'Cobol',
    mode: 'cobol'
  },
  {
    name: 'CoffeeScript',
    mode: 'coffeescript'
  },
  {
    name: 'Crystal',
    mode: 'crystal'
  },
  {
    name: 'CSS',
    mode: 'css'
  },
  {
    name: 'D',
    mode: 'd'
  },
  {
    name: 'Dart',
    mode: 'dart'
  },
  {
    name: 'Diff',
    mode: 'diff',
    mime: 'text/x-diff'
  },
  {
    name: 'Django',
    mode: 'django'
  },
  {
    name: 'Docker',
    mode: 'dockerfile'
  },
  {
    name: 'Elixir',
    mode: 'elixir',
    custom: true
  },
  {
    name: 'Elm',
    mode: 'elm'
  },
  {
    name: 'Erlang',
    mode: 'erlang'
  },
  {
    name: 'Fortran',
    mode: 'fortran'
  },
  {
    name: 'F#',
    mode: 'mllike'
  },
  {
    name: 'GraphQL',
    mode: 'graphql',
    custom: true
  },
  {
    name: 'Go',
    mode: 'go',
    mime: 'text/x-go'
  },
  {
    name: 'Groovy',
    mode: 'groovy'
  },
  {
    name: 'Handlebars',
    mode: 'handlebars'
  },
  {
    name: 'Haskell',
    mode: 'haskell'
  },
  {
    name: 'Haxe',
    mode: 'haxe'
  },
  {
    name: 'HTML',
    mode: 'htmlmixed'
  },
  {
    name: 'Java',
    mode: 'clike',
    mime: 'text/x-java',
    short: 'java'
  },
  {
    name: 'JavaScript',
    mode: 'javascript',
    short: 'javascript'
  },
  {
    name: 'JSON',
    mode: 'javascript',
    mime: 'application/json',
    short: 'json'
  },
  {
    name: 'JSX',
    mode: 'jsx'
  },
  {
    name: 'Julia',
    mode: 'julia'
  },
  {
    name: 'Kotlin',
    mode: 'clike',
    mime: 'text/x-kotlin',
    short: 'kotlin'
  },
  {
    name: 'LaTeX',
    mode: 'stex'
  },
  {
    name: 'Lisp',
    mode: 'commonlisp'
  },
  {
    name: 'Lua',
    mode: 'lua'
  },
  {
    name: 'Markdown',
    mode: 'markdown'
  },
  {
    name: 'Mathematica',
    mode: 'mathematica'
  },
  {
    name: 'MATLAB/Octave',
    mode: 'octave',
    mime: 'text/x-octave'
  },
  {
    name: 'MySQL',
    mode: 'sql',
    mime: 'text/x-mysql',
    short: 'mysql'
  },
  {
    name: 'N-Triples',
    mode: 'ntriples',
    mime: 'application/n-triples'
  },
  {
    name: 'NGINX',
    mode: 'nginx'
  },
  {
    name: 'Nim',
    mode: 'nimrod',
    custom: true
  },
  {
    name: 'Objective C',
    mode: 'clike',
    mime: 'text/x-objectivec',
    short: 'objectivec'
  },
  {
    name: 'OCaml',
    mode: 'mllike'
  },
  {
    name: 'Pascal',
    mode: 'pascal'
  },
  {
    name: 'Perl',
    mode: 'perl'
  },
  {
    name: 'PHP',
    mode: 'php',
    mime: 'text/x-php',
    short: 'php'
  },
  {
    name: 'PowerShell',
    mode: 'powershell'
  },
  {
    name: 'Python',
    mode: 'python'
  },
  {
    name: 'R',
    mode: 'r'
  },
  {
    name: 'Ruby',
    mode: 'ruby'
  },
  {
    name: 'Rust',
    mode: 'rust'
  },
  {
    name: 'Sass',
    mode: 'sass'
  },
  {
    name: 'Scala',
    mode: 'clike',
    mime: 'text/x-scala',
    short: 'scala'
  },
  {
    name: 'Smalltalk',
    mode: 'smalltalk'
  },
  {
    name: 'SPARQL',
    mode: 'sparql',
    mime: 'application/sparql-query'
  },
  {
    name: 'SQL',
    mode: 'sql'
  },
  {
    name: 'Stylus',
    mode: 'stylus',
    mime: 'stylus'
  },
  {
    name: 'Swift',
    mode: 'swift'
  },
  {
    name: 'TCL',
    mode: 'tcl'
  },
  {
    name: 'TOML',
    mode: 'toml'
  },
  {
    name: 'Turtle',
    mode: 'turtle',
    mime: 'text/turtle'
  },
  {
    name: 'TypeScript',
    mode: 'javascript',
    mime: 'application/typescript',
    short: 'typescript'
  },
  {
    name: 'TSX',
    mode: 'jsx',
    mime: 'text/typescript-jsx',
    short: 'tsx'
  },
  {
    name: 'VB.NET',
    mode: 'vb'
  },
  {
    name: 'Verilog',
    mode: 'verilog'
  },
  {
    name: 'VHDL',
    mode: 'vhdl'
  },
  {
    name: 'Vue',
    mode: 'vue'
  },
  {
    name: 'XML',
    mode: 'xml'
  },
  {
    name: 'YAML',
    mode: 'yaml'
  }
]

export const EXPORT_SIZES = [
  { id: '1x', name: '1x', value: 1 },
  { id: '2x', name: '2x', value: 2 },
  { id: '4x', name: '4x', value: 4 }
]

export const EXPORT_SIZES_HASH = toHash(EXPORT_SIZES)

export const LANGUAGE_MIME_HASH = toHash(LANGUAGES, 'mime')
export const LANGUAGE_MODE_HASH = toHash(LANGUAGES, 'mode')
export const LANGUAGE_NAME_HASH = toHash(LANGUAGES, 'short')

export const DEFAULT_LANGUAGE = 'auto'
export const DEFAULT_THEME = THEMES_HASH.seti
export const DEFAULT_BG_COLOR = 'rgba(171, 184, 195, 1)'
export const DEFAULT_EXPORT_SIZE = EXPORT_SIZES_HASH['2x']

export const COLORS = {
  BLACK: '#121212',
  PRIMARY: '#F8E81C',
  SECONDARY: '#fff',
  GRAY: '#858585',
  DARK_GRAY: '#393939',
  HOVER: '#1F1F1F',
  PURPLE: '#C198FB',
  DARK_PURPLE: '#55436F',
  RED: 'red'
}

export const DEFAULT_CODE = `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  const alreadyLoaded = new Set()

  LANGUAGES.filter(language => language.mode !== 'auto' && language.mode !== 'text').forEach(
    language => {
      if (language.mode && !alreadyLoaded.has(language.mode)) {
        alreadyLoaded.add(language.mode)
        language.custom
          ? require(`./custom/modes/${language.mode}`)
          : require(`codemirror/mode/${language.mode}/${language.mode}`)
      }
    }
  )
}

export const DEFAULT_SETTINGS = {
  paddingVertical: '56px',
  paddingHorizontal: '56px',
  marginVertical: '45px',
  marginHorizontal: '45px',
  backgroundImage: null,
  backgroundImageSelection: null,
  backgroundMode: 'color',
  backgroundColor: DEFAULT_BG_COLOR,
  dropShadow: true,
  dropShadowOffsetY: '20px',
  dropShadowBlurRadius: '68px',
  theme: DEFAULT_THEME.id,
  windowTheme: 'none',
  language: DEFAULT_LANGUAGE,
  fontFamily: 'Hack',
  fontSize: '14px',
  lineHeight: '133%',
  windowControls: true,
  widthAdjustment: true,
  lineNumbers: false,
  exportSize: '2x',
  watermark: false,
  squaredImage: false
}

export const DEFAULT_PRESET_ID = 'preset:4'

export const DEFAULT_PRESETS = [
  {
    ...DEFAULT_SETTINGS,
    icon: '/static/presets/4.png',
    id: DEFAULT_PRESET_ID
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(74,144,226,1)',
    dropShadow: false,
    theme: 'material',
    fontFamily: 'Fira Code',
    lineHeight: '152%',
    icon: '/static/presets/7.png',
    id: 'preset:7'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(248,231,28,1)',
    dropShadow: false,
    theme: 'blackboard',
    fontFamily: 'Fira Code',
    lineHeight: '152%',
    icon: '/static/presets/8.png',
    id: 'preset:8'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(182,162,145,1)',
    dropShadow: false,
    theme: 'zenburn',
    windowTheme: 'bw',
    lineHeight: '152%',
    icon: '/static/presets/9.png',
    id: 'preset:9'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(121,72,185,1)',
    dropShadow: false,
    theme: 'verminal',
    windowTheme: 'bw',
    fontFamily: 'Fira Code',
    fontSize: '14px',
    lineHeight: '143%',
    icon: '/static/presets/0.png',
    id: 'preset:0'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(239,40,44,1)',
    theme: 'one-light',
    lineHeight: '143%',
    icon: '/static/presets/1.png',
    id: 'preset:1'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(31,129,109,1)',
    dropShadow: false,
    theme: 'night-owl',
    lineHeight: '143%',
    windowControls: false,
    icon: '/static/presets/2.png',
    id: 'preset:2'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(249,237,212,1)',
    theme: 'twilight',
    fontFamily: 'IBM Plex Mono',
    lineHeight: '143%',
    icon: '/static/presets/3.png',
    id: 'preset:3'
  },

  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(222,171,99,1)',
    theme: 'duotone-dark',
    icon: '/static/presets/5.png',
    id: 'preset:5'
  },
  {
    ...DEFAULT_SETTINGS,
    backgroundColor: 'rgba(187,187,187,1)',
    dropShadowOffsetY: '3px',
    dropShadowBlurRadius: '13px',
    theme: 'solarized light',
    windowTheme: 'sharp',
    icon: '/static/presets/6.png',
    id: 'preset:6'
  }
]
