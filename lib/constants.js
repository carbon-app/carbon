import { toHash } from './util'

export const THEMES_ARRAY = [
  {
    id: '3024-night',
    name: '3024 Night'
  },
  {
    id: 'ambiance',
    name: 'Ambiance'
  },
  {
    id: 'blackboard',
    name: 'Blackboard'
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
    id: 'solarized',
    name: 'Solarized',
    light: true
  },
  {
    id: 'twilight',
    name: 'Twilight'
  },
  {
    id: 'yeti',
    name: 'Yeti',
    light: true
  },
  {
    id: 'zenburn',
    name: 'Zenburn'
  }
]

export const THEMES = toHash(THEMES_ARRAY)

export const LANGUAGES = [
  {
    name: 'Auto'
  },
  {
    name: 'Plain Text'
  },
  {
    name: 'C',
    module: 'clike'
  },
  {
    name: 'Clojure',
    module: 'clojure'
  },
  {
    name: 'Cobol',
    module: 'cobol'
  },
  {
    name: 'CoffeeScript',
    module: 'coffeescript'
  },
  {
    name: 'Crystal',
    module: 'crystal'
  },
  {
    name: 'CSS',
    module: 'css'
  },
  {
    name: 'D',
    module: 'd'
  },
  {
    name: 'Dart',
    module: 'dart'
  },
  {
    name: 'Django',
    module: 'django'
  },
  {
    name: 'Docker',
    module: 'dockerfile'
  },
  {
    name: 'Elm',
    module: 'elm'
  },
  {
    name: 'Erlang',
    module: 'erlang'
  },
  {
    name: 'Fortran',
    module: 'fortran'
  },
  {
    name: 'F# / OCaml',
    module: 'mllike'
  },
  {
    name: 'Go',
    module: 'go'
  },
  {
    name: 'Groovy',
    module: 'groovy'
  },
  {
    name: 'Handlebars',
    module: 'handlebars'
  },
  {
    name: 'Haskell',
    module: 'haskell'
  },
  {
    name: 'Haxe',
    module: 'haxe'
  },
  {
    name: 'HTML',
    module: 'htmlmixed'
  },
  {
    name: 'JavaScript',
    module: 'javascript'
  },
  {
    name: 'JSX',
    module: 'jsx'
  },
  {
    name: 'Julia',
    module: 'julia'
  },
  {
    name: 'Lisp',
    module: 'commonlisp'
  },
  {
    name: 'Lua',
    module: 'lua'
  },
  {
    name: 'Markdown',
    module: 'markdown'
  },
  {
    name: 'Mathematica',
    module: 'mathematica'
  },
  {
    name: 'NGINX',
    module: 'nginx'
  },
  {
    name: 'Pascal',
    module: 'pascal'
  },
  {
    name: 'Perl',
    module: 'perl'
  },
  {
    name: 'PHP',
    module: 'php'
  },
  {
    name: 'Python',
    module: 'python'
  },
  {
    name: 'R',
    module: 'r'
  },
  {
    name: 'Ruby',
    module: 'ruby'
  },
  {
    name: 'Rust',
    module: 'rust'
  },
  {
    name: 'Sass',
    module: 'sass'
  },
  {
    name: 'Smalltalk',
    module: 'smalltalk'
  },
  {
    name: 'SQL',
    module: 'sql'
  },
  {
    name: 'Swift',
    module: 'swift'
  },
  {
    name: 'TCL',
    module: 'tcl'
  },
  {
    name: 'VB.NET',
    module: 'vb'
  },
  {
    name: 'Verilog',
    module: 'verilog'
  },
  {
    name: 'VHDL',
    module: 'vhdl'
  },
  {
    name: 'Vue',
    module: 'vue'
  },
  {
    name: 'XML',
    module: 'xml'
  },
  {
    name: 'YAML',
    module: 'yaml'
  }
]

export const DEFAULT_LANGUAGE = 'auto'

export const COLORS = {
  BLACK: '#121212',
  PRIMARY: '#F8E81C',
  SECONDARY: '#fff',
  GRAY: '#858585'
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
  LANGUAGES.forEach((language) => {
    if (language.module) {
      require(`codemirror/mode/${language.module}/${language.module}`)
    }
  })
}
