module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['import', 'react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'import/no-unresolved': 'error',
    'no-duplicate-imports': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': ['error', { allow: ['error'] }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
