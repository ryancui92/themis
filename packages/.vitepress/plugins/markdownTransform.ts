import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import fs from 'fs-extra'
import { functions } from '../../metadata'

// see https://github.com/vueuse/vueuse/blob/v10.7.0/packages/.vitepress/plugins/markdownTransform.ts
export function MarkdownTransform(): Plugin {
  const functionNames = functions.map(f => f.name)
  function getFunction(name: string) {
    return functions.find(f => f.name === name)
  }

  return {
    name: 'themis-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md$/))
        return null

      // linkify function names
      code = code.replace(
        new RegExp(`\`(${functionNames.join('|')})\``, 'g'),
        (_, name, ending) => {
          if (ending === ']') // already a link
            return _
          const fn = getFunction(name)!
          return `[\`${fn.name}\`](/${fn.name}/)`
        },
      )

      const [_name, i] = id.split('/').slice(-2)

      const name = functionNames.find(n => n.toLowerCase() === _name.toLowerCase()) || _name

      if (functionNames.includes(name) && i === 'index.md') {
        const frontmatterEnds = code.indexOf('---\n\n')
        const firstHeader = code.search(/\n#{2,6}\s.+/)
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

        const { footer, header } = await getFunctionMarkdown(name)
        if (header)
          code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex)
        if (footer)
          code += footer
      }
      return code
    },
  }
}

const DIR_PACKAGES = resolve(__dirname, '../..')
const GITHUB_BLOB_URL = 'https://github.com/ryancui92/themis/blob/main/packages'

export async function getFunctionMarkdown(name: string) {
  const URL = `${GITHUB_BLOB_URL}/${name}`

  const dirname = join(DIR_PACKAGES, name)
  const demoPath = ['demo.vue', 'demo.client.vue'].find(i => fs.existsSync(join(dirname, i)))

  const links = ([
    ['Source', `${URL}/index.ts`],
    demoPath ? ['Demo', `${URL}/${demoPath}`] : undefined,
    ['Docs', `${URL}/index.md`],
  ])
    .filter(i => i)
    .map(i => `[${i![0]}](${i![1]})`).join(' • ')

  const sourceSection = `## Source\n\n${links}\n`

  const demoSection = demoPath
    ? demoPath.endsWith('.client.vue')
      ? `
<script setup>
import { defineAsyncComponent } from 'vue'
const Demo = defineAsyncComponent(() => import('./${demoPath}'))
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<ClientOnly>
  <Suspense>
    <Demo/>
    <template #fallback>
      Loading demo...
    </template>
  </Suspense>
</ClientOnly>
</DemoContainer>
`
      : `
<script setup>
import Demo from \'./${demoPath}\'
</script>

## Demo

<DemoContainer>
<p class="demo-source-link"><a href="${URL}/${demoPath}" target="_blank">source</a></p>
<Demo/>
</DemoContainer>
`
    : ''

  const footer = `${sourceSection}\n`

  const header = demoSection

  return {
    footer,
    header,
  }
}
