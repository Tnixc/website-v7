import { type Config } from "prettier";

const config: Config = {
  trailingComma: "es5",
  singleQuote: false,
  semi: true,
  printWidth: 120,
  tabWidth: 2,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
