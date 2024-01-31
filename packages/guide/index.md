# 快速开始

## 安装

::: code-group

```bash [pnpm]
pnpm add @ryancui-/themis
```

```bash [npm]
npm install @ryancui-/themis
```

```bash [yarn]
yarn add @ryancui-/themis
```

:::


## 使用例子

```ts
import { formatNumberIntoLocalString } from '@ryancui-/themis'

const str = formatNumberIntoLocalString(1000) // 1,000
```

## 与 AutoImport 配合使用

Themis 提供了用于 [`unplugin-auto-import`](https://github.com/unplugin/unplugin-auto-import) 的 preset 配置，你可以直接添加到 `AutoImport` 插件的配置中。

```ts{9}
// vite.config.ts
import { ThemisAutoImportPreset } from '@ryancui-/themis'

export default {
  plugins: [
    AutoImport({
      imports: [
        'vue',
        ThemisAutoImportPreset,
      ],
    }),
  ],
}
```
