# downloadFile

下载文件，支持传入 Blob 对象作为参数。

## Usage

```ts
downloadFile(new Blob(['Hello, world!'], { type: 'text/plain' }), 'test.txt')
```
