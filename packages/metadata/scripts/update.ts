/*
 * 执行 update.ts 会更新下面几个地方
 *
 * packages/metadata/functions.json
 *   themis 提供的所有函数信息数组（每一个函数是一个文件夹）
 * packages/autoImportPreset/index.ts
 *   基于 functions.json 生成的 auto-import preset export
 * packages/index.ts
 *   基于 functions.json 生成的每一个函数的 export
 */
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { format } from 'prettier'
import type { ThemisFunction } from '@packages/metadata/types'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const DIR_PACKAGE = resolve(__dirname, '../..')

export async function listFunctions(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: [
      '_*',
      'dist',
      'node_modules',
      ...ignore,
    ],
  })
  files.sort()
  return files
}

async function run() {
  const dirs = await listFunctions(DIR_PACKAGE, [
    '.vitepress',
    'autoImportPreset',
    'metadata',
    'guide',
    'public',
    'utils',
  ])
  const themisFunctions: ThemisFunction[] = dirs.map(dir => ({ name: dir }))
  // packages/metadata/functions.json
  await fs.writeJSON(join(DIR_PACKAGE, 'metadata/functions.json'), themisFunctions, { spaces: 2 })

  // TODO: other useful metadata, such as git commit and tag

  // packages/autoImportPreset/index.ts
  const autoImportTpl = `
export const ThemisAutoImportPreset = {
  '@ryancui-/themis': ${JSON.stringify(themisFunctions.map(_ => _.name))},
}
`
  const formattedTS = (await format(autoImportTpl, {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    parser: 'typescript',
  })).trim()
  await fs.writeFile(join(DIR_PACKAGE, 'autoImportPreset/index.ts'), `${formattedTS}\n`)

  // packages/index.ts
  const exports = themisFunctions.map(func => `export * from './${func.name}'`)
  await fs.writeFile(join(DIR_PACKAGE, 'index.ts'), `export * from './autoImportPreset'\n\n${exports.join('\n')}\n`)

  // eslint-disable-next-line no-console
  console.log('🎉 metadata updated.')
}

run()
