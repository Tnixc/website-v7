import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { imageService } from "@unpic/astro/service";
// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

import opengraphImage from "astro-opengraph-image";

import partytown from "@astrojs/partytown";

import vercel from "@astrojs/vercel";

import { readFile } from "node:fs/promises";

/** @type {import('astro-opengraph-image').Options} */
const openGraphConfig = {
  // what color do you want your background to be?
  background: "#000000",

  // what size do you want your images to be?
  // 1200x630 is a good default across platforms,
  // and 3x scale is a convenient choice.
  width: 1200,
  height: 630,
  scale: 3,

  // the fonts you picked before. you will have to include the particular
  // weights and variants you want to use.
  fonts: [
    // {
    //   name: "Inter",
    //   data: await readFile("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"),
    //   style: "normal",
    //   weight: 400,
    // },
    // {
    //   name: "Inter",
    //   data: await readFile("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"),
    //   style: "normal",
    //   weight: 700,
    // },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: "https://tnixc.space",
  integrations: [mdx(), sitemap(), svelte(), opengraphImage(openGraphConfig), partytown()],

  image: {
    service: imageService(),
  },

  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
