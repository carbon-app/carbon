export const THEMES = [
  {
    id: 'dracula',
    name: 'Dracula'
  },
  {
    id: 'solarized',
    name: 'Solarized',
    light: true
  },
  {
    id: 'zenburn',
    name: 'Zenburn'
  },
  {
    id: 'yeti',
    name: 'Yeti',
    light: true
  },
  {
    id: 'twilight',
    name: 'Twilight'
  },
  {
    id: 'paraiso-dark',
    name: 'Paraiso'
  },
  {
    id: 'monokai',
    name: 'Monokai'
  },
  {
    id: 'material',
    name: 'Material'
  },
  {
    id: 'isotope',
    name: 'Isotope'
  },
  {
    id: 'cobalt',
    name: 'Cobalt'
  },
  {
    id: '3024-day',
    name: '3024 Day',
    light: true
  }
]

export const LANGUAGES = [
  {
    name: 'Auto'
  },
  {
    name: 'Plain Text'
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

export const COLORS = {
  BLACK: '#121212',
  PRIMARY: '#F8E81C',
  SECONDARY: '#fff',
  GRAY: '#b5b3a0'
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
