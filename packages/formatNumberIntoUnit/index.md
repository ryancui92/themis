# formatNumberIntoUnit

格式化数字，支持千分位分隔符、小数点后保留位数。默认保留两位小数。

注意，未满小数位不会补 0.

可选参数 options 可参阅 `formatNumberIntoLocalString`.

## Usage

```ts
formatNumberIntoUnit(1000) === '1,000'
formatNumberIntoUnit(10000) === '1 万'
```
