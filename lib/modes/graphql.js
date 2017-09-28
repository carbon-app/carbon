// Source: https://github.com/graphql/codemirror-graphql/blob/master/src/mode.js
const {
  LexRules,
  ParseRules,
  isIgnored,
  onlineParser,
} = require('graphql-language-service-parser');

module.exports = {
  module: 'graphql',
  definition
}

function indent(state, textAfter) {
  const levels = state.levels;
  // If there is no stack of levels, use the current level.
  // Otherwise, use the top level, pre-emptively dedenting for close braces.
  const level =
    !levels || levels.length === 0
      ? state.indentLevel
      : levels[levels.length - 1] -
        (this.electricInput.test(textAfter) ? 1 : 0);
  return level * this.config.indentUnit;
}

function definition (config) {
  const parser = onlineParser({
    eatWhitespace: stream => stream.eatWhile(isIgnored),
    lexRules: LexRules,
    parseRules: ParseRules,
    editorConfig: {tabSize: config.tabSize},
  });

  return {
    config,
    startState: parser.startState,
    token: parser.token,
    indent,
    electricInput: /^\s*[})\]]/,
    fold: 'brace',
    lineComment: '#',
    closeBrackets: {
      pairs: '()[]{}""',
      explode: '()[]{}',
    },
  };
}
