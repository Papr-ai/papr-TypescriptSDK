// @ts-check
import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    ignores: ['dist/**', 'dist-bundle/**', '**/*.mcpb'],
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs', '**/*.cjs'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
