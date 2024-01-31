# formatNumberIntoLocalString

将数字格式化成，带千分位和小数点的本地字符串。

## Usage

```ts
formatNumberIntoLocalString(1234) // '1,234'
formatNumberIntoLocalString(1234.567) // '1,234.58'
formatNumberIntoLocalString(1234.567, { digits: 1, kSeparator: false }) // '1234.5'
```

## options 参数
```ts
{
  /*
   * 小数位数，默认是2
   */
  digits: number
  /*
   * 是否开启千分位，默认为 true
   */
  kSeparator: boolean
}
```
