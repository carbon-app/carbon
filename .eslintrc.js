module.exports = {
  env: { es6: true, jest: true },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'next'],
  rules: {
    'import/no-unresolved': 'error',
    'no-duplicate-imports': 'error',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': ['error', { allow: ['error'] }],
    // TODO re-enable these
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/link-passhref': 'off',
  },
}
