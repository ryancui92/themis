# downloadURL

下载 URL 的文件。

## Usage

```ts
downloadURL('https://httpbin.org/get', 'response.json')
```

::: warning
URL 的返回必须满足两个条件之一才能下载：
1. URL 与发起请求网站同源，跨域请求会导致浏览器忽略 `download` 属性，并在当前窗口打开 URL. 常见的使用方法是相对路径请求，但此时没有进行鉴权，可能存在安全问题。
```ts
downloadURL('/api/v1/download?id=1', 'test.csv')
``` 

2. URL 的响应头应该包含 `Content-Disposition` 字段，且值为 `attachment`，这样浏览器才会下载文件，而不是直接打开。

参考：[Stack Overflow](https://stackoverflow.com/questions/20508788/do-i-need-content-type-application-octet-stream-for-file-download)
:::
