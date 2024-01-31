# measureText
`measureText` 函数用于测量给定文本在指定字体大小下的宽度，返回一个包含文本内容宽度的对象。允许用户添加自定义的 style 设置文本的其他样式。

## Usage

```ts
measureText('hello word!', { fontSize: '12px', fontWeight: 'bold' }) // { width: 86 }
// 兼容模式
measureText('hello word!', 12) // { width: 79 }
measureText('hello word!', '12px') // { width: 79 }
```
