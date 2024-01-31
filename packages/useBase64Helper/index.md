# useBase64Helper

响应式 Base64 处理。支持转换 Blob 类型、提取 mimeType、下载。

## Usage

直接传入完整的 Base64 的字符串，可以构造对应的 Blob 对象，并提供一个下载该文件的方法。

```ts
const { 
  blob, 
  download, 
} = useBase64Helper('data:text/plain;base64,SGVsbG8gV29ybGQh')

download('file.txt')
```

### Raw

通过提供 `raw` 和 `mimeType` 选项，可以将部分 Base64 字符串转换为 Blob 对象。

```ts
const { 
  base64, 
} = useBase64Helper('SGVsbG8gV29ybGQh', { 
  raw: true, 
  mimeType: 'text/plain',
})

console.log(base64.value) // data:text/plain;base64,SGVsbG8gV29ybGQh
```
