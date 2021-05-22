// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
import CodeMirror from 'codemirror'

let defaults = {
  pairs: '()[]{}\'\'""',
  closeBefore: ')]}\'":;>',
  triples: '',
  explode: '[]{}',
}

let Pos = CodeMirror.Pos

CodeMirror.defineOption('autoCloseBrackets', false, function (cm, val, old) {
  if (old && old != CodeMirror.Init) {
    cm.removeKeyMap(keyMap)
    cm.state.closeBrackets = null
  }
  if (val) {
    ensureBound(getOption(val, 'pairs'))
    cm.state.closeBrackets = val
    cm.addKeyMap(keyMap)
  }
})

function getOption(conf, name) {
  if (name == 'pairs' && typeof conf == 'string') return conf
  if (typeof conf == 'object' && conf[name] != null) return conf[name]
  return defaults[name]
}

let keyMap = { Backspace: handleBackspace, Enter: handleEnter }
function ensureBound(chars) {
  for (let i = 0; i < chars.length; i++) {
    let ch = chars.charAt(i),
      key = "'" + ch + "'"
    if (!keyMap[key]) keyMap[key] = handler(ch)
  }
}
ensureBound(defaults.pairs + '`')

function handler(ch) {
  return function (cm) {
    return handleChar(cm, ch)
  }
}

function getConfig(cm) {
  let deflt = cm.state.closeBrackets
  if (!deflt || deflt.override) return deflt
  let mode = cm.getModeAt(cm.getCursor())
  return mode.closeBrackets || deflt
}

function handleBackspace(cm) {
  let conf = getConfig(cm)
  if (!conf || cm.getOption('disableInput')) return CodeMirror.Pass

  let pairs = getOption(conf, 'pairs')
  let ranges = cm.listSelections()
  for (let i = 0; i < ranges.length; i++) {
    if (!ranges[i].empty()) return CodeMirror.Pass
    let around = charsAround(cm, ranges[i].head)
    if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass
  }
  for (let i = ranges.length - 1; i >= 0; i--) {
    let cur = ranges[i].head
    cm.replaceRange('', Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1), '+delete')
  }
}

function handleEnter(cm) {
  let conf = getConfig(cm)
  let explode = conf && getOption(conf, 'explode')
  if (!explode || cm.getOption('disableInput')) return CodeMirror.Pass

  let ranges = cm.listSelections()
  for (let i = 0; i < ranges.length; i++) {
    if (!ranges[i].empty()) return CodeMirror.Pass
    let around = charsAround(cm, ranges[i].head)
    if (!around || explode.indexOf(around) % 2 != 0) return CodeMirror.Pass
  }
  cm.operation(function () {
    let linesep = cm.lineSeparator() || '\n'
    cm.replaceSelection(linesep + linesep, null)
    moveSel(cm, -1)
    ranges = cm.listSelections()
    for (let i = 0; i < ranges.length; i++) {
      let line = ranges[i].head.line
      cm.indentLine(line, null, true)
      cm.indentLine(line + 1, null, true)
    }
  })
}

function moveSel(cm, dir) {
  let newRanges = [],
    ranges = cm.listSelections(),
    primary = 0
  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i]
    if (range.head == cm.getCursor()) primary = i
    let pos =
      range.head.ch || dir > 0
        ? { line: range.head.line, ch: range.head.ch + dir }
        : { line: range.head.line - 1 }
    newRanges.push({ anchor: pos, head: pos })
  }
  cm.setSelections(newRanges, primary)
}

function contractSelection(sel) {
  let inverted = CodeMirror.cmpPos(sel.anchor, sel.head) > 0
  return {
    anchor: new Pos(sel.anchor.line, sel.anchor.ch + (inverted ? -1 : 1)),
    head: new Pos(sel.head.line, sel.head.ch + (inverted ? 1 : -1)),
  }
}

function handleChar(cm, ch) {
  let conf = getConfig(cm)
  if (!conf || cm.getOption('disableInput')) return CodeMirror.Pass

  let pairs = getOption(conf, 'pairs')
  let pos = pairs.indexOf(ch)
  if (pos == -1) return CodeMirror.Pass

  let closeBefore = getOption(conf, 'closeBefore')

  let triples = getOption(conf, 'triples')

  let identical = pairs.charAt(pos + 1) == ch
  let ranges = cm.listSelections()
  let opening = pos % 2 == 0

  let type
  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i],
      cur = range.head,
      curType
    let next = cm.getRange(cur, Pos(cur.line, cur.ch + 1))
    if (opening && !range.empty()) {
      curType = 'surround'
    } else if ((identical || !opening) && next == ch) {
      if (identical && stringStartsAfter(cm, cur)) curType = 'both'
      else if (
        triples.indexOf(ch) >= 0 &&
        cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == ch + ch + ch
      )
        curType = 'skipThree'
      else curType = 'skip'
    } else if (
      identical &&
      cur.ch > 1 &&
      triples.indexOf(ch) >= 0 &&
      cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch
    ) {
      if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2))))
        return CodeMirror.Pass
      curType = 'addFour'
    } else if (identical) {
      let prev = cur.ch == 0 ? ' ' : cm.getRange(Pos(cur.line, cur.ch - 1), cur)
      if (!CodeMirror.isWordChar(next) && prev != ch && !CodeMirror.isWordChar(prev))
        curType = 'both'
      else return CodeMirror.Pass
    } else if (
      opening &&
      (next.length === 0 || /\s/.test(next) || closeBefore.indexOf(next) > -1)
    ) {
      curType = 'both'
    } else {
      return CodeMirror.Pass
    }
    if (!type) type = curType
    else if (type != curType) return CodeMirror.Pass
  }

  let left = pos % 2 ? pairs.charAt(pos - 1) : ch
  let right = pos % 2 ? ch : pairs.charAt(pos + 1)
  cm.operation(function () {
    if (type == 'skip') {
      moveSel(cm, 1)
    } else if (type == 'skipThree') {
      moveSel(cm, 3)
    } else if (type == 'surround') {
      let sels = cm.getSelections()
      for (let i = 0; i < sels.length; i++) sels[i] = left + sels[i] + right
      cm.replaceSelections(sels, 'around')
      sels = cm.listSelections().slice()
      for (let i = 0; i < sels.length; i++) sels[i] = contractSelection(sels[i])
      cm.setSelections(sels)
    } else if (type == 'both') {
      cm.replaceSelection(left + right, null)
      cm.triggerElectric(left + right)
      moveSel(cm, -1)
    } else if (type == 'addFour') {
      cm.replaceSelection(left + left + left + left, 'before')
      moveSel(cm, 1)
    }
  })
}

function charsAround(cm, pos) {
  let str = cm.getRange(Pos(pos.line, pos.ch - 1), Pos(pos.line, pos.ch + 1))
  return str.length == 2 ? str : null
}

function stringStartsAfter(cm, pos) {
  let token = cm.getTokenAt(Pos(pos.line, pos.ch + 1))
  return (
    /\bstring/.test(token.type) &&
    token.start == pos.ch &&
    (pos.ch == 0 || !/\bstring/.test(cm.getTokenTypeAt(pos)))
  )
}
