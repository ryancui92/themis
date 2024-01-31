import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import { functions } from '../metadata'
import { MarkdownTransform } from './plugins/markdownTransform'

export default defineConfig({
  title: 'Themis',
  description: 'Themis is cool',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT ryancui',
    },
    nav: [
      { text: 'Github', link: 'https://github.com/ryancui92/themis' },
    ],
    sidebar: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Functions',
        items: functions.map(_ => ({ text: _.name, link: `/${_.name}/` })),
      },
    ],
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    ['meta', { name: 'author', content: 'ryancui' }],
    ['meta', { property: 'og:title', content: 'Themis' }],
    ['meta', { property: 'og:description', content: 'maybe useful utils' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
  vite: {
    resolve: {
      alias: {
        '@packages': resolve(__dirname, '..'),
      },
    },
    plugins: [
      MarkdownTransform(),
      AutoImport({ imports: ['vue'] }),
    ],
  },
})
