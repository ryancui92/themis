import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        'packages/index.ts',
        'packages/autoImportPreset/index.ts',
        'eslint.config.js',
        'packages/metadata',
        'packages/**/demo.vue',
      ],
    },
  },
}))
