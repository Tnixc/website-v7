import antfu from '@antfu/eslint-config';

export default antfu({
  astro: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
});
