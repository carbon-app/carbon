module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'import/no-unresolved': 'error',
    'no-duplicate-imports': 'error',
    'jsx-a11y/click-events-have-key-events': 'off'
  },
  settings: {
    react: {
      version: '16.7'
    }
  }
}
