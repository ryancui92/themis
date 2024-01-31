import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    chunkSizeWarningLimit: 10000,
  },
  plugins: [
    vue(),
    vueJsx(),
    dts(),
    AutoImport({
      imports: ['vue', 'vitest', '@vueuse/core'],
      eslintrc: {
        enabled: true,
      },
      dts: true,
    }),
  ],
})
