// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import rehypeAnimationDelay from './plugins/rehypeAnimationDelay.js';
import linkToComponent from './plugins/linkToComponent.js';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import { execSync } from 'node:child_process';

import opengraphImages from 'astro-opengraph-images';
import fs from 'node:fs';
import { fnRender } from './src/OgRender.tsx';

const commitHash = execSync('git rev-parse HEAD').toString().trim();
const commitDate = execSync('git log -1 --format=%cI').toString().trim();

// https://astro.build/config
export default defineConfig({
  site: 'https://tnixc.space',
  integrations: [
    mdx(),
    sitemap(),
    partytown(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: 'Crimson Pro',
            weight: 400,
            style: 'normal',
            data: fs.readFileSync('node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff'),
          },
        ],
      },
      render: fnRender,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'ayu-dark',
    },
    rehypePlugins: [
      linkToComponent,
      rehypeAnimationDelay,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          headingProperties: {
            className: ['rehype-heading'],
          },
          properties: {
            className: ['rehype-heading-link'],
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // These variables are replaced at build time.
      BUILD_COMMIT: JSON.stringify(commitHash.slice(0, 7)),
      BUILD_DATE: JSON.stringify(commitDate),
    },
  },

  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },

  output: 'static',
  adapter: vercel(),
});
