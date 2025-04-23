import { execSync } from 'node:child_process';
// @ts-check
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import { imageService } from '@unpic/astro/service';

import opengraphImage from 'astro-opengraph-image';
import { defineConfig } from 'astro/config';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const commitDate = execSync('git log -1 --format=%cI').toString().trim();

/** @type {import('astro-opengraph-image').Options} */
const openGraphConfig = {
  // what color do you want your background to be?
  background: '#000000',

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
  site: 'https://tnixc.space',
  integrations: [mdx(), sitemap(), opengraphImage(openGraphConfig), partytown()],

  image: {
    service: imageService(),
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      // These variables are replaced at build time.
      BUILD_COMMIT: JSON.stringify(commitHash.slice(0, 7)),
      BUILD_DATE: JSON.stringify(commitDate),
    },
  },
  // adapter: vercel(),
});
