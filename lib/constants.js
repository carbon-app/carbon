import toHash from 'tohash'

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
    id: 'twilight',
    name: 'Twilight'
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
    mode: 'javascript'
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
    mode: 'php'
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
    name: 'SQL (MySQL)',
    mode: 'sql',
    mime: 'text/x-mysql',
    short: 'mysql'
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

export const LANGUAGE_MIME_HASH = toHash(LANGUAGES, 'mime')
export const LANGUAGE_MODE_HASH = toHash(LANGUAGES, 'mode')
export const LANGUAGE_NAME_HASH = toHash(LANGUAGES, 'short')

export const DEFAULT_LANGUAGE = 'auto'
export const DEFAULT_THEME = THEMES_HASH.seti

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

  LANGUAGES.filter(
    language => language.mode !== 'auto' && language.mode !== 'text'
  ).forEach(language => {
    if (language.mode && !alreadyLoaded.has(language.mode)) {
      alreadyLoaded.add(language.mode)
      language.custom
        ? require(`./customModes/${language.mode}`)
        : require(`codemirror/mode/${language.mode}/${language.mode}`)
    }
  })
}
