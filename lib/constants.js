if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/clojure/clojure')
  require('codemirror/mode/cobol/cobol')
  require('codemirror/mode/coffeescript/coffeescript')
  require('codemirror/mode/commonlisp/commonlisp')
  require('codemirror/mode/crystal/crystal')
  require('codemirror/mode/css/css')
  require('codemirror/mode/d/d')
  require('codemirror/mode/dart/dart')
  require('codemirror/mode/django/django')
  require('codemirror/mode/dockerfile/dockerfile')
  require('codemirror/mode/elm/elm')
  require('codemirror/mode/erlang/erlang')
  require('codemirror/mode/fortran/fortran')
  require('codemirror/mode/go/go')
  require('codemirror/mode/groovy/groovy')
  require('codemirror/mode/handlebars/handlebars')
  require('codemirror/mode/haskell/haskell')
  require('codemirror/mode/haxe/haxe')
  require('codemirror/mode/htmlembedded/htmlembedded')
  require('codemirror/mode/htmlmixed/htmlmixed')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/julia/julia')
  require('codemirror/mode/lua/lua')
  require('codemirror/mode/markdown/markdown')
  require('codemirror/mode/mathematica/mathematica')
  require('codemirror/mode/nginx/nginx')
  require('codemirror/mode/pascal/pascal')
  require('codemirror/mode/perl/perl')
  require('codemirror/mode/php/php')
  require('codemirror/mode/python/python')
  require('codemirror/mode/r/r')
  require('codemirror/mode/ruby/ruby')
  require('codemirror/mode/rust/rust')
  require('codemirror/mode/shell/shell')
  require('codemirror/mode/smalltalk/smalltalk')
  require('codemirror/mode/spreadsheet/spreadsheet')
  require('codemirror/mode/sql/sql')
  require('codemirror/mode/swift/swift')
  require('codemirror/mode/tcl/tcl')
  require('codemirror/mode/vb/vb')
  require('codemirror/mode/verilog/verilog')
  require('codemirror/mode/vhdl/vhdl')
  require('codemirror/mode/vue/vue')
  require('codemirror/mode/xml/xml')
  require('codemirror/mode/yaml/yaml')
}

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
    id: 'oceanic',
    name: 'Oceanic'
  },
  {
    id: '3024-day',
    name: '3024 Day',
    light: true
  }
]

export const LANGUAGES = [
  {
    name: 'Auto Detect'
  },
  {
    name: 'Plain Text'
  },
  {
    name: 'Clojure'
  },
  {
    name: 'Cobol'
  },
  {
    name: 'CoffeeScript'
  },
  {
    name: 'Crystal'
  },
  {
    name: 'CSS'
  },
  {
    name: 'D'
  },
  {
    name: 'Dart'
  },
  {
    name: 'Django'
  },
  {
    name: 'Docker'
  },
  {
    name: 'Elm'
  },
  {
    name: 'Erlang'
  },
  {
    name: 'Fortran'
  },
  {
    name: 'Groovy'
  },
  {
    name: 'Handlebars'
  },
  {
    name: 'Haskell'
  },
  {
    name: 'Haxe'
  },
  {
    name: 'HTML'
  },
  {
    name: 'JavaScript'
  },
  {
    name: 'JSX'
  },
  {
    name: 'Julia'
  },
  {
    name: 'Lua'
  },
  {
    name: 'Markdown'
  },
  {
    name: 'Mathematica'
  },
  {
    name: 'NGINX'
  },
  {
    name: 'Pascal'
  },
  {
    name: 'Perl'
  },
  {
    name: 'PHP'
  },
  {
    name: 'Python'
  },
  {
    name: 'R'
  },
  {
    name: 'Ruby'
  },
  {
    name: 'Rust'
  },
  {
    name: 'Sass'
  },
  {
    name: 'Smalltalk'
  },
  {
    name: 'SQL'
  },
  {
    name: 'Swift'
  },
  {
    name: 'TCL'
  },
  {
    name: 'VB.NET'
  },
  {
    name: 'Verilog'
  },
  {
    name: 'VHDL'
  },
  {
    name: 'Vue'
  },
  {
    name: 'XML'
  },
  {
    name: 'YAML'
  }
]

export const PALETTE = {
  'EDITOR_BG': '#1A1A1A'
}

export const DEFAULT_CODE = `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}
  `
