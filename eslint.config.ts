import defineConfig from '@antfu/eslint-config';

export default defineConfig(
  {
    jsx: true,
    pnpm: true,
    markdown: true,
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },
  {
    rules: {
      'ts/explicit-function-return-type': 'off',
    },
  },
);
