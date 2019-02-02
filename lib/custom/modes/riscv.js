/*
  RISC-V Code Mirror Mode

  Based on the mode present in the Venus Simulator
    Author: kvakil
    Source: https://github.com/kvakil/venus

  Forked by Matthew Nielsen (github.com/matthewnielsen27)
*/

const CodeMirror = require('codemirror')

CodeMirror.defineMode('riscv', function(/* config */) {
  function regexFromWords(words, ins) {
    return new RegExp('^(?:' + words.join('|') + ')$', ins)
  }

  // Instructions
  // Part 1) Base Integer Instructions
  //        a) Loads
  //        b) Stores
  //        c) Shifts
  //        d) Arithmetic
  //        e) Logical
  //        f) Compare
  //        g) Branches
  //        h) Jump & Link
  //        i) Synch
  //        j) System
  //        k) Counters
  // Part 2) RV Priveleged Instructions
  //        a) CSR Access
  //        b) Change Level
  //        c) Trap Redirect
  // Part 3) Optional Multiply-Divide Instruction Extension: RVM
  //        a) Multiply
  //        b) Divide
  //        c) Remainder
  // Part 4) Pseudo Instructions
  //        a) Standard
  //        b) Non-Standard

  // NOT INCLUDED (TODO in future updates):
  // Part 5) Optional Compressed (16-bit) Instruction Extension: RVC
  // Part 6) Optional Atomic Instruction Extrnsion: RVA
  // Part 7) Optional Floating-Point Instruction Extension: RVF, RVD, & RVQ
  var instructions = regexFromWords(
    [
      // Part 1) Base Integer Instructions
      //        a) Loads
      //          I) RV32I
      'lb',
      'lh',
      'lw',
      'lbu',
      'lhu',
      //          II) RV64I and RV128I
      'ld',
      'lq',
      'lwu',
      'ldu',
      //        b) Stores
      //          I) RV32I
      'sb',
      'sh',
      'sw',
      //          II) RV64I and RV128I
      'sd',
      'sq',
      //        c) Shifts
      //          I) RV32I
      'sll',
      'slli',
      'srl',
      'srli',
      'sra',
      'srai',
      //          II) RV64I and RV128I
      'sllw',
      'slliw',
      'srlw',
      'srliw',
      'sraw',
      'sraiw',
      'slld',
      'sllid',
      'srld',
      'srlid',
      'srad',
      'sraid',
      //        d) Arithmetic
      //          I) RV32I
      'add',
      'addi',
      'sub',
      'lui',
      'auipc',
      //          II) RV64I and RV128I
      'addw',
      'addiw',
      'subw',
      'addd',
      'addid',
      'subd',
      //        e) Logical
      'xor',
      'xori',
      'or',
      'ori',
      'and',
      'andi',
      //        f) Compare
      'slt',
      'slti',
      'sltu',
      'sltiu',
      //        g) Branches
      'beq',
      'bne',
      'blt',
      'bge',
      'bltu',
      'bgeu',
      //        h) Jump & Link
      'jal',
      'jalr',
      //        i) Synch
      'fence',
      'fence.i',
      //        j) System
      'scall',
      'sbreak',
      //        k) Counters
      'rdcycle',
      'rdcycleh',
      'rdtime',
      'rdtimeh',
      'rdinstret',
      'rdinstreth',

      // Part 2) RV Priveleged Instructions
      //        a) CSR Access
      'csrrw',
      'csrrs',
      'csrrc',
      'csrrwi',
      'csrrsi',
      'csrrci',
      //        b) Change Level
      'ecall',
      'ebreak',
      'eret',
      //        c) Trap Redirect
      'mrts',
      'mrth',
      'hrts',

      // Part 3) Optional Multiply-Divide Instruction Extension: RVM
      //        a) Multiply
      //          I) RV32M
      'mul',
      'mulh',
      'mulhsu',
      //          II) RV64M and RV128M
      'mulw',
      'muld',
      //        b) Divide
      //          I) RV32M
      'div',
      'divu',
      //          II) RV64M and RV128M
      'divw',
      'divd',
      //        c) Remainder
      //          I) RV32M
      'rem',
      'remu',
      //          II) RV64M and RV128M
      'remw',
      'remuw',
      'remd',
      'remud',

      // Part 4) Pseudo Instructions
      //        a) Standard Psuedo Instructions
      'beqz',
      'bgez',
      'bgt',
      'bgtu',
      'bgtz',
      'ble',
      'bleu',
      'blez',
      'bltz',
      'bnez',
      'call',
      'j',
      'jr',
      'la',
      'li',
      'mv',
      'neg',
      'nop',
      'ret',
      'not',
      'ret',
      'seqz',
      'sgtz',
      'sltz',
      'snez',
      'tail',
      //        b) Non-Standard Psuedo Instructions
      'seq',
      'sge',
      'sgeu',
      'sgt',
      'sgtu',
      'sle',
      'sleu',
      'sne'
    ],
    'i'
  )

  // Registers
  // Part 1) Actual Register Values
  // Part 2) Application Binary Interface
  var registers = regexFromWords(
    [
      // Part 1) Actual Register Values
      'x0',
      'x1',
      'x2',
      'x3',
      'x4',
      'x5',
      'x6',
      'x7',
      'x8',
      'x9',
      'x10',
      'x11',
      'x12',
      'x13',
      'x14',
      'x15',
      'x16',
      'x17',
      'x18',
      'x19',
      'x20',
      'x21',
      'x22',
      'x23',
      'x24',
      'x25',
      'x26',
      'x27',
      'x28',
      'x29',
      'x30',
      'x31',

      // Part 2) Application Binary Interface
      'zero',
      'ra',
      'sp',
      'gp',
      'tp',
      't0',
      't1',
      't2',
      's0',
      's1',
      'a0',
      'a1',
      'a2',
      'a3',
      'a4',
      'a5',
      'a6',
      'a7',
      's2',
      's3',
      's4',
      's5',
      's6',
      's7',
      's8',
      's9',
      's10',
      's11',
      't3',
      't4',
      't5',
      't6',
      'pc'
    ],
    ''
  )

  // Keywords
  // Part 1) Pseudo Operations
  var keywords = regexFromWords(
    [
      // Part 1) Pseudo Operations
      '.align',
      '.file',
      '.globl',
      '.local',
      '.comm',
      '.common',
      '.ident',
      '.section',
      '.size',
      '.text',
      '.data',
      '.rodata',
      '.bss',
      '.string',
      '.asciz',
      '.asciiz',
      '.equ',
      '.macro',
      '.endm',
      '.type',
      '.option',
      '.byte',
      '.2byte',
      '.half',
      '.short',
      '.4byte',
      '.word',
      '.long',
      '.8byte',
      '.dword',
      '.quad',
      '.dtprelword',
      '.dtpreldword',
      '.sleb128',
      '.uleb128',
      '.p2align',
      '.balign',
      '.zero',
      '.float',
      '.double'
    ],
    'i'
  )

  function normal(stream, state) {
    var ch = stream.next()

    if (ch == '#') {
      stream.skipToEnd()

      return 'comment'
    }

    if (ch == '"' || ch == "'") {
      state.cur = string(ch)

      return state.cur(stream, state)
    }

    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w.%]/)

      // Handle numeric labels
      if (stream.peek() === ':') {
        return 'variable'
      }

      return 'number'
    }

    if (/[.\w_]/.test(ch)) {
      stream.eatWhile(/[\w\\\-_.]/)

      return 'variable'
    }

    return null
  }

  function string(quote) {
    return function(stream, state) {
      var escaped = false,
        ch

      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) break

        escaped = !escaped && ch == '\\'
      }
      if (!escaped) state.cur = normal

      return 'string'
    }
  }

  return {
    startState: function(basecol) {
      return { basecol: basecol || 0, indentDepth: 0, cur: normal }
    },

    token: function(stream, state) {
      if (stream.eatSpace()) return null

      var style = state.cur(stream, state)

      var word = stream.current()

      if (style == 'variable') {
        if (keywords.test(word)) style = 'keyword'
        else if (instructions.test(word)) style = 'builtin'
        else if (registers.test(word)) style = 'variable-2'
      }
      return style
    }
  }
})

CodeMirror.defineMIME('text/riscv', 'riscv')
