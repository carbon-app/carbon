const CodeMirror = require('codemirror')


CodeMirror.defineMode("nimrod", function(conf, parserConf) {
  var ERRORCLASS = 'error';

  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b");
  }

  var operators = new RegExp("\\=\\+\\-\\*\\/\\<\\>\\@\\$\\~\\&\\%\\|\\!\\?\\^\\:\\\\");
  var identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*");

  var commonkeywords = ['addr', 'asm', 'atomic',
                        'bind', 'block', 'break', 'case', 'cast',
                        'const', 'continue', 'converter',
                        'discard', 'distinct', 'do',
                        'elif', 'else', 'end', 'enum', 'except', 'export',
                        'finally', 'for', 'from',
                        'generic',
                        'if', 'import', 'include', 'interface', 'iterator',
                        'lambda', 'let',
                        'macro', 'method', 'mixin', 'nil',
                        'object', 'out',
                        'proc', 'ptr',
                        'raise', 'ref', 'return',
                        'shared', 'static',
                        'template', 'try', 'tuple', 'type',
                        'using',
                        'var',
                        'when', 'while', 'with', 'without',
                        'yield',

                        // keyword operators
                        'shl', 'shr', 'and', 'or', 'xor', 'not',
                        'div', 'mod', 'is', 'isnot', 'in', 'as', 'of'];

  var commonBuiltins = ["int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16",
                        "uint32", "uint64", "float", "float32", "float64", "bool", "char",
                        "string", "cstring", "pointer", "range", "array", "openarray",
                        "seq", "set", "Byte", "Natural", "Positive", "TObject", "PObject",
                        "Conversion", "TResult", "TAddress", "BiggestInt", "BiggestFloat",
                        "cchar", "cschar", "cshort", "cint", "csize", "cuchar", "cushort",
                        "clong", "clonglong", "cfloat", "cdouble", "clongdouble", "cuint",
                        "culong", "culonglong", "cchar", "cstringArray", "TEndian", "PFloat32",
                        "PFloat64", "PInt64", "PInt32", "TGC_Strategy", "TFile", "TFileMode",
                        "TFileHandle", "isMainModule", "CompileDate", "CompileTime", "NimrodVersion",
                        "NimrodMajor", "NimrodMinor", "NimrodPatch", "cpuEndian", "hostOS", "hostCPU",
                        "inf", "neginf", "nan", "QuitSuccess", "QuitFailure", "dbgLineHook", "stdin",
                        "stdout", "stderr", "defined", "new", "high", "low", "sizeof", "succ", "pred",
                        "inc", "dec", "newSeq", "len", "incl", "excl", "card", "ord", "chr", "ze",
                        "ze64", "toU8", "toU16", "toU32", "abs", "min", "max", "add", "repr", "contains",
                        "toFloat", "toBiggestFloat", "toInt", "toBiggestInt", "addQuitProc", "copy",
                        "setLen", "newString", "zeroMem", "copyMem", "moveMem", "equalMem", "alloc",
                        "alloc0", "realloc", "dealloc", "setLen", "assert", "swap", "getRefcount",
                        "getCurrentException", "Msg", "getOccupiedMem", "getFreeMem", "getTotalMem",
                        "isNil", "seqToPtr", "find", "pop", "GC_disable", "GC_enable", "GC_fullCollect",
                        "GC_setStrategy", "GC_enableMarkAnd", "Sweep", "GC_disableMarkAnd", "Sweep",
                        "GC_getStatistics", "GC_ref", "GC_ref", "GC_ref", "GC_unref", "GC_unref",
                        "GC_unref", "quit", "OpenFile", "OpenFile", "CloseFile", "EndOfFile",
                        "readChar", "FlushFile", "readFile", "write", "readLine", "writeln",
                        "writeln", "getFileSize", "ReadBytes", "ReadChars", "readBuffer",
                        "writeBytes", "writeChars", "writeBuffer", "setFilePos", "getFilePos",
                        "fileHandle", "countdown", "countup", "items", "lines",
                        "true", "false",

                        // exceptions
                        "E_Base", "EAsynch", "ESynch", "ESystem", "EIO", "EOS", "ERessourceExhausted",
                        "EArithmetic", "EDivByZero", "EOverflow", "EAccessViolation", "EAssertionFailed",
                        "EControlC", "EInvalidValue", "EOutOfMemory", "EInvalidIndex", "EInvalidField",
                        "EOutOfRange", "EStackOverflow", "ENoExceptionToReraise", "EInvalidObjectAssignment",
                        "EInvalidObject", "EInvalidLibrary", "EInvalidKey", "EInvalidObjectConversion",
                        "EFloatingPoint", "EFloatInvalidOp", "EFloatDivByZero", "EFloatOverflow",
                        "EFloatInexact", "EDeadThrea"];

  if(parserConf.extra_keywords != undefined)
    commonkeywords = commonkeywords.concat(parserConf.extra_keywords);

  if(parserConf.extra_builtins != undefined)
    commonBuiltins = commonBuiltins.concat(parserConf.extra_builtins);

  var keywords = wordRegexp(commonkeywords);
  var builtins = wordRegexp(commonBuiltins);

  var indentInfo = null;

  var stringPrefixes = new RegExp("^(('{3}|\"{3}|['\"]))", "i");

  // tokenizers
  function tokenBase(stream, state) {
    // Handle scope changes
    if (stream.sol()) {
      var scopeOffset = state.scopes[0].offset;
      if (stream.eatSpace()) {
        var lineOffset = stream.indentation();
        if (lineOffset > scopeOffset) {
          indentInfo = 'indent';
        } else if (lineOffset < scopeOffset) {
          indentInfo = 'dedent';
        }
        return null;
      } else {
        if (scopeOffset > 0) {
          dedent(stream, state);
        }
      }
    }

    if (stream.eatSpace())
      return null;

    var ch = stream.peek();

    // Handle Comments
    if (ch === '#') {
      stream.skipToEnd();
      return 'comment';
    }

    // Handle Number Literals
    if (stream.match(/^[0-9\.]/, false)) {
      var floatLiteral = false;
      // Floats
      if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
      if (stream.match(/^\d+\.\d*/)) { floatLiteral = true; }
      if (stream.match(/^\.\d+/)) { floatLiteral = true; }
      if (floatLiteral) {
          // Float literals may be "imaginary"
          stream.eat(/J/i);
          return 'number';
      }
      // Integers
      var intLiteral = false;
      // Hex
      if (stream.match(/^0x[0-9a-f]+/i)) { intLiteral = true; }
      // Binary
      if (stream.match(/^0b[01]+/i)) { intLiteral = true; }
      // Octal
      if (stream.match(/^0o[0-7]+/i)) { intLiteral = true; }
      // Decimal
      if (stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/)) {
        // Decimal literals may be "imaginary"
        stream.eat(/J/i);
        // TODO - Can you have imaginary longs?
        intLiteral = true;
      }
      // Zero by itself with no other piece of number.
      if (stream.match(/^0(?![\dx])/i)) { intLiteral = true; }
      if (intLiteral) {
        // Integer literals may be "long"
        stream.eat(/L/i);
        return 'number';
      }
    }

    // Handle Strings
    if (stream.match(stringPrefixes)) {
      state.tokenize = tokenStringFactory(stream.current());
      return state.tokenize(stream, state);
    }

    if (stream.match(operators))
      return 'operator';

    if (stream.match(keywords))
      return 'keyword';

    if (stream.match(builtins))
      return 'builtin';

    if (stream.match(identifiers)) {
      if (state.lastToken != null &&
          state.lastToken.match(/proc|iterator|macro|template|class|converter/)) {
        return 'def';
      }

      return 'variable';
    }

    // Handle non-detected items
    stream.next();
    return ERRORCLASS;
  }

  function tokenStringFactory(delimiter) {
    var singleline = delimiter.length == 1;
    var OUTCLASS = 'string';

    function tokenString(stream, state) {
      while (!stream.eol()) {
        stream.eatWhile(/[^'"\\]/);
        if (stream.eat('\\')) {
          stream.next();
          if (singleline && stream.eol()) {
              return OUTCLASS;
          }
        } else if (stream.match(delimiter)) {
          state.tokenize = tokenBase;
          return OUTCLASS;
        } else {
          stream.eat(/['"]/);
        }
      }
      if (singleline) {
        if (parserConf.singleLineStringErrors) {
          return ERRORCLASS;
        } else {
          state.tokenize = tokenBase;
        }
      }
      return OUTCLASS;
    }

    tokenString.isString = true;
    return tokenString;
  }

  function indent(stream, state, type) {
    type = type || 'nim';
    var indentUnit = 0;
    if (type === 'nim') {
      if (state.scopes[0].type !== 'nim') {
        state.scopes[0].offset = stream.indentation();
        return;
      }
      for (var i = 0; i < state.scopes.length; ++i) {
        if (state.scopes[i].type === 'nim') {
          indentUnit = state.scopes[i].offset + conf.indentUnit;
          break;
        }
      }
    } else {
      indentUnit = stream.column() + stream.current().length;
    }

    state.scopes.unshift({
      offset: indentUnit,
      type: type
    });
  }

  function dedent(stream, state, type) {
      type = type || 'nim';
      if (state.scopes.length == 1) return;
      if (state.scopes[0].type === 'nim') {
          var _indent = stream.indentation();
          var _indent_index = -1;
          for (var i = 0; i < state.scopes.length; ++i) {
              if (_indent === state.scopes[i].offset) {
                  _indent_index = i;
                  break;
              }
          }
          if (_indent_index === -1) {
              return true;
          }
          while (state.scopes[0].offset !== _indent) {
              state.scopes.shift();
          }
          return false;
      } else {
          if (type === 'nim') {
              state.scopes[0].offset = stream.indentation();
              return false;
          } else {
              if (state.scopes[0].type != type) {
                  return true;
              }
              state.scopes.shift();
              return false;
          }
      }
  }

  function tokenLexer(stream, state) {
    indentInfo = null;
    var style = state.tokenize(stream, state);
    var current = stream.current();

    // Handle '.' connected identifiers
    if (current === '.') {
      style = stream.match(identifiers, false) ? null : ERRORCLASS;
      if (style === null && state.lastStyle === 'meta') {
        // Apply 'meta' style to '.' connected identifiers when
        // appropriate.
        style = 'meta';
      }
      return style;
    }

    if ((style === 'variable' || style === 'builtin')
        && state.lastStyle === 'meta') {
      style = 'meta';
    }

    // Handle scope changes.
    if (current.match(/return|break|continue|raise/) ||
        (current === 'discard' && stream.eol()))
      state.dedent += 1;

    if (current === 'lambda' || current === 'proc')
      state.lambda = true;

    var delimiter_index = '[({'.indexOf(current);

    if (delimiter_index !== -1) {
      indent(stream, state, '])}'.slice(delimiter_index, delimiter_index+1));
    }
    else if(stream.eol() && current.match(/\=|\:|import|include|type|const|var|let/)) {
      indent(stream, state);
    }

    if (indentInfo === 'dedent') {
      if (dedent(stream, state)) {
        return ERRORCLASS;
      }
    }

    delimiter_index = '])}'.indexOf(current);
    if (delimiter_index !== -1) {
      if (dedent(stream, state, current)) {
        return ERRORCLASS;
      }
    }

    if (state.dedent > 0 && stream.eol() && state.scopes[0].type == 'nim') {
      if (state.scopes.length > 1) state.scopes.shift();
      state.dedent -= 1;
    }

    return style;
  }

  var external = {
    startState: function(basecolumn) {
      return {
        tokenize: tokenBase,
        scopes: [{offset:basecolumn || 0, type:'nim'}],
        lastStyle: null,
        lastToken: null,
        lambda: false,
        dedent: 0
      };
    },

    token: function(stream, state) {
      var style = tokenLexer(stream, state);

      state.lastStyle = style;

      var current = stream.current();
      if (current && style)
        state.lastToken = current;

      if (stream.eol() && state.lambda)
        state.lambda = false;

      return style;
    },

    indent: function(state) {
      if (state.tokenize != tokenBase)
        return state.tokenize.isString ? CodeMirror.Pass : 0;

      return state.scopes[0].offset;
    },

    lineComment: "#",
    fold: "indent"
  };

  return external;
});

CodeMirror.defineMIME("text/x-nimrod", "nimrod");

