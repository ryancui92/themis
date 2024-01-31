# formatBytesIntoUnit

格式化文件大小并转换单位，接收一个数值作为格式化的输入，可选参数 options 可参阅 `formatNumberIntoLocalString`.

## Usage

```ts
formatBytesIntoUnit(1024 * 1000) // '1,000 KB'
formatBytesIntoUnit(1024 * 1024 * 1000) // '1,000 MB'
formatBytesIntoUnit(1024 * 1024 * 1000, { kSeparator: false }) // '1000 MB'
```
