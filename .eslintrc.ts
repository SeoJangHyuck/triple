const createConfig = require('@titicaca/eslint-config-triple/create-config')

module.exports = createConfig({ type: 'frontend', project: './tsconfig.json' })

module.exports = {
  extends: [
    // ...extendConfigs,
    // 확장할 규칙 이름...
  ],
  overrides: [
    // ...overrides,
    // 특정 파일 대상 규칙...
  ],
  rules: {
    // 개별 규칙
  },
}
