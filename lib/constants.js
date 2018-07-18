import toHash from 'tohash'

export const FONTS = [
  { id: 'Anonymous Pro', name: 'Anonymous Pro' },
  { id: 'Droid Sans Mono', name: 'Droid Sans Mono' },
  { id: 'Fantasque Sans Mono', name: 'Fantasque Sans Mono' },
  { id: 'Fira Code', name: 'Fira Code' },
  { id: 'Monoid', name: 'Monoid' },
  { id: 'Hack', name: 'Hack' },
  { id: 'IBM Plex Mono', name: 'IBM Plex Mono' },
  { id: 'Iosevka', name: 'Iosevka' },
  { id: 'Inconsolata', name: 'Inconsolata' },
  { id: 'Source Code Pro', name: 'Source Code Pro' },
  { id: 'Ubuntu Mono', name: 'Ubuntu Mono' }
]

export const THEMES = [
  {
    id: '3024-night',
    name: '3024 Night'
  },
  {
    id: 'blackboard',
    name: 'Blackboard'
  },
  {
    id: 'base16-dark',
    name: 'Base 16 (Dark)'
  },
  {
    id: 'base16-light',
    name: 'Base 16 (Light)'
  },
  {
    id: 'cobalt',
    name: 'Cobalt'
  },
  {
    id: 'dracula',
    name: 'Dracula'
  },
  {
    id: 'duotone-dark',
    name: 'Duotone'
  },
  {
    id: 'hopscotch',
    name: 'Hopscotch'
  },
  {
    id: 'material',
    name: 'Material'
  },
  {
    id: 'monokai',
    name: 'Monokai'
  },
  {
    id: 'night-owl',
    name: 'Night Owl'
  },
  {
    id: 'nord',
    name: 'Nord'
  },
  {
    id: 'oceanic-next',
    name: 'Oceanic Next'
  },
  {
    id: 'one-dark',
    name: 'One Dark'
  },
  {
    id: 'panda-syntax',
    name: 'Panda'
  },
  {
    id: 'paraiso-dark',
    name: 'Paraiso'
  },
  {
    id: 'seti',
    name: 'Seti'
  },
  {
    id: 'solarized dark',
    name: 'Solarized (Dark)',
    hasStylesheet: false
  },
  {
    id: 'solarized light',
    name: 'Solarized (Light)',
    hasStylesheet: false
  },
  {
    id: 'tomorrow-night-bright',
    name: 'Tomorrow Night'
  },
  {
    id: 'lucario',
    name: 'Lucario'
  },
  {
    id: 'twilight',
    name: 'Twilight'
  },
  {
    id: 'verminal',
    name: 'Verminal'
  },
  {
    id: 'yeti',
    name: 'Yeti'
  },
  {
    id: 'zenburn',
    name: 'Zenburn'
  }
]

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
    name: 'F# / OCaml',
    mode: 'mllike'
  },
  {
    name: 'GraphQL',
    mode: 'graphql',
    custom: true
  },
  {
    name: 'Go',
    mode: 'go'
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
    name: 'TypeScript',
    mode: 'javascript',
    mime: 'application/typescript',
    short: 'typescript'
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
  { id: '1x', name: '1x', value: '1' },
  { id: '2x', name: '2x', value: '2' },
  { id: '4x', name: '4x', value: '4' }
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
  HOVER: '#1F1F1F'
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
  paddingVertical: '48px',
  paddingHorizontal: '32px',
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
  titleBar: '',
  watermark: false,
  squaredImage: false,
  timestamp: false
}
