import React from 'react'
import Dropdown from './dropdown'
import ColorPicker from './colorpicker'
import Settings from './settings'
import Button from './button'

const themes = [
  {
    name: 'dracula'
  },
  {
    name: 'solarized'
  }
]

const langauges = [
  'Auto Detect',
  'Plain Text',
  'AppleScript',
  'BoxNote',
  'C',
  'C#',
  'CSS',
  'CSV',
  'Closure',
  'CoffeeScript',
  'Cold Fusion',
  'Crystal',
  'Cypher',
  'D',
  'Dart',
  'Diff',
  'Docker',
  'Erlang',
  'F#',
  'Fortran',
  'Gherkin',
  'Go',
  'Groovy',
  'HTML',
  'Haskell',
  'Haxe',
  'Java',
  'JavaScript',
  'JSON',
  'Julia',
  'Kotlin',
  'LaTex',
  'Lisp',
  'Lua',
  'MATLAB',
  'MUMPS',
  'Markdown (raw)',
  'OCaml',
  'Objective-C',
  'PHP',
  'Pascal',
  'Perl',
  'Pig',
  'Post',
  'Puppet',
  'Python',
  'R',
  'Ruby',
  'Rust',
  'SQL',
  'Sass',
  'Scheme',
  'Smalltalk',
  'Swift',
  'TSV',
  'VB.NET',
  'VBScript',
  'Velocity',
  'Verilog',
  'XML',
  'YAML'
].map(name => ({ name }))

export default class extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="toolbar">
        <Dropdown list={themes} />
        <Dropdown list={langauges} />
        <ColorPicker />
        <Settings />
        <Button title="Copy Imgur Link" bg="#84ACFC" style={{ borderRadius: '3px 0px 0px 3px' }}/>
        <Button title="Save Image" bg="#C3E98D" />
        <style jsx>{`
          #toolbar {
            width: 100%;
            height: 40px; // TODO fix
            margin-bottom: 16px;
            display: flex;
            position: relative;
            z-index: 1;
          }
        `}</style>
      </div>
    )
  }
}
