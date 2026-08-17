/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,
  printWidth: 100,
  trailingComma: 'all',

  // prettier-plugin-tailwindcss must come last — it reorders class attributes
  // and needs to run after every other plugin has finished formatting.
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      // Content files are Justin's to edit. Don't let Prettier reflow his
      // prose or reorder frontmatter keys.
      files: ['src/content/**/*.md', 'src/content/**/*.mdx'],
      options: { proseWrap: 'preserve' },
    },
  ],
};
