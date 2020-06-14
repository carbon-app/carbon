/*
  RISC-V Code Mirror Mode

  Based on the mode present in the Venus Simulator
    Author: kvakil
    Source: https://github.com/kvakil/venus

  Forked by Matthew Nielsen (github.com/matthewnielsen27)
*/

const CodeMirror = require('codemirror')

CodeMirror.defineMode('riscv', function (/* config */) {
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
  // Part 5) Optional Compressed (16-bit) Instruction Extension: RVC
  //        a) Loads
  //        b) Stores
  //        c) Arithmetic
  //        d) Shifts
  //        e) Branches
  //        f) Jump
  //        g) Jump & Link
  //        h) System
  // Part 6) Optional Atomic Instruction Extension: RVA
  //        a) Load
  //        b) Store
  //        c) Swap
  //        d) Add
  //        e) Logical
  //        f) Min\Max
  // Part 7) Optional Floating-Point Instruction Extension: RVF, RVD, & RVQ
  //        a) Move
  //        b) Convert
  //        c) Load
  //        d) Store
  //        e) Arithmetic
  //        f) Mui-Add
  //        g) Sign Inject
  //        h) Min/Max
  //        i) Compare
  //        j) Categorization
  //        k) Configuration
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
      'sne',
      // Part 5) Optional Compressed (16-bit) Instruction Extension: RVC
      //        a) Loads
      'c.lw',
      'c.lwsp',
      'c.ld',
      'c.ldsp',
      'c.lq',
      'c.lqsp',
      //        b) Stores
      'c.sw',
      'c.swsp',
      'c.sd',
      'c.sdsp',
      'c.sq',
      'c.sqsp',
      //        c) Arithmetic
      'c.add',
      'c.addw',
      'c.addi',
      'c.addiw',
      'c.addi16sp',
      'c.addi2spn',
      'c.li',
      'c.lui',
      'c.mv',
      'c.sub',
      //        d) Shifts
      'c.slli',
      //        e) Branches
      'c.beqz',
      'c.bnez',
      //        f) Jump
      'c.j',
      'c.jr',
      //        g) Jump & Link
      'c.jal',
      'c.jalr',
      //        h) System
      'c.ebreak',
      // Part 6) Optional Atomic Instruction Extrnsion: RVA
      //        a) Load
      //          I) RV32A
      'lr.w',
      //          II) RV64A and RV128A
      'lr.d',
      'lr.q',
      //        b) Store
      //          I) RV32A
      'sc.w',
      //          II) RV64A and RV128A
      'sc.d',
      'sc.q',
      //        c) Swap
      //          I) RV32A
      'amoswap.w',
      //          II) RV64A and RV128A
      'amoswap.d',
      'amoswap.q',
      //        d) Add
      //          I) RV32A
      'amoadd.w',
      //          II) RV64A and RV128A
      'amoadd.d',
      'amoadd.q',
      //        e) Logical
      //          I) RV32A
      'amoxor.w',
      'amoand.w',
      'amoor.w',
      //          II) RV64A and RV128A
      'amoxor.d',
      'amoand.d',
      'amoor.d',
      'amoxor.q',
      'amoand.q',
      'amoor.q',
      //        f) Min\Max
      //          I) RV32A
      'amomin.w',
      'amomax.w',
      'amominu.w',
      'amomax.w',
      //          II) RV64A and RV128A
      'amomin.d',
      'amomax.d',
      'amominu.d',
      'amomax.d',
      'amomin.q',
      'amomax.q',
      'amominu.q',
      'amomax.q',
      // Part 7) Optional Floating-Point Instruction Extension: RVF, RVD, & RVQ
      //        a) Move
      //          I) RV32-
      'fmv.h.x',
      'fmv.s.s',
      'fmv.x.h',
      'fmv.x.s',
      //          II) RV64- and RV128-
      'fmv.d.x',
      'fmv.q.s',
      'fmv.d.h',
      'fmv.q.s',
      //        b) Convert
      //          I) RV32-
      'fcvt.h.w',
      'fcvt.s.w',
      'fcvt.d.w',
      'fcvt.q.w',
      'fcvt.h.wu',
      'fcvt.s.wu',
      'fcvt.d.wu',
      'fcvt.q.wu',
      'fcvt.w.h',
      'fcvt.w.s',
      'fcvt.w.d',
      'fcvt.w.q',
      'fcvt.wu.h',
      'fcvt.w.s',
      'fcvt.w.d',
      'fcvt.w.q',
      //          II) RV64- and RV128-
      'fcvt.h.l',
      'fcvt.h.t',
      'fcvt.h.lu',
      'fcvt.h.tu',
      'fcvt.s.l',
      'fcvt.s.t',
      'fcvt.s.lu',
      'fcvt.s.tu',
      'fcvt.d.l',
      'fcvt.d.t',
      'fcvt.d.lu',
      'fcvt.d.tu',
      'fcvt.q.l',
      'fcvt.q.t',
      'fcvt.q.lu',
      'fcvt.q.tu',
      'fcvt.l.h',
      'fcvt.t.h',
      'fcvt.lu.h',
      'fcvt.tu.h',
      'fcvt.l.s',
      'fcvt.t.s',
      'fcvt.lu.s',
      'fcvt.tu.s',
      'fcvt.l.d',
      'fcvt.t.d',
      'fcvt.lu.d',
      'fcvt.tu.d',
      'fcvt.l.q',
      'fcvt.t.q',
      'fcvt.lu.q',
      'fcvt.tu.q',
      //        c) Load
      'flw',
      'fld',
      'flq',
      //        d) Store
      'fsw',
      'fsd',
      'fsq',
      //        e) Arithmetic
      'fadd.s',
      'fsub.s',
      'fmul.s',
      'fdiv.s',
      'fsqrt.s',
      'fadd.d',
      'fsub.d',
      'fmul.d',
      'fdiv.d',
      'fsqrt.d',
      'fadd.q',
      'fsub.q',
      'fmul.q',
      'fdiv.q',
      'fsqrt.q',
      //        f) Mul-Add
      'fmadd.d',
      'fmsub.d',
      'fnmsub.d',
      'fnmadd.d',
      'fmadd.d',
      'fmsub.d',
      'fnmsub.d',
      'fnmadd.d',
      'fmadd.q',
      'fmsub.q',
      'fnmsub.q',
      'fnmadd.q',
      //        g) Sign Inject
      'fsgnj.s',
      'fsgnjn.s',
      'fsgnjx.s',
      'fsgnj.d',
      'fsgnjn.d',
      'fsgnjx.d',
      'fsgnj.q',
      'fsgnjn.q',
      'fsgnjx.q',
      //        h) Min/Max
      'fmin.s',
      'fmax.s',
      'fmin.d',
      'fmax.d',
      'fmin.q',
      'fmax.q',
      //        i) Compare
      'feq.s',
      'flt.s',
      'fle.s',
      'feq.d',
      'flt.d',
      'fle.d',
      'feq.q',
      'flt.q',
      'fle.q',
      //        j) Categorization
      'fclass.s',
      'fclass.d',
      'fclass.q',
      //        k) Configuration
      'frcsr',
      'frrm',
      'frflags',
      'fscsr',
      'fsrm',
      'fsflags',
      'fsrmi',
      'fsflagsi',
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
      'pc',
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
      '.double',
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
    return function (stream, state) {
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
    startState: function (basecol) {
      return { basecol: basecol || 0, indentDepth: 0, cur: normal }
    },

    token: function (stream, state) {
      if (stream.eatSpace()) return null

      var style = state.cur(stream, state)

      var word = stream.current()

      if (style == 'variable') {
        if (keywords.test(word)) style = 'keyword'
        else if (instructions.test(word)) style = 'builtin'
        else if (registers.test(word)) style = 'variable-2'
      }
      return style
    },
  }
})

CodeMirror.defineMIME('text/riscv', 'riscv')
