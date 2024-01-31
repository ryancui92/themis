# usePlatform

客户端检测，用于区分 PC 端与移动端、判断用户操作系统与设备类型，检查是否为微信（包含企业微信）内置浏览器。

## Usage

```ts
const {
  isAndroid,
  isiOS,
  isWeChat,
  isMacOS,
  isWindows,
  isLinux,
  isMobile,
  isDesktop,
  detect
} = usePlatform()
```
