module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: ['plugin:harmony/latest', 'plugin:yml/standard'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'yml/quotes': ['error', { prefer: 'single' }]
  },
  overrides: [
    {
      extends: 'plugin:harmony/ts-recommended',
      files: ['*.ts', '*.tsx'],
      rules: {
        'harmony/ts-member-delimiter-style': 'off'
      }
    }
  ]
}
