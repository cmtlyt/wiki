import defineConfig from '@antfu/eslint-config';

export default defineConfig(
  {
    jsx: true,
    markdown: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    ignores: ['**/*.md'],
  },
  {
    rules: {
      'ts/explicit-function-return-type': 'off',
    },
  },
);
