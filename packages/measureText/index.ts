export interface TextMetrics {
  width: number
}
export type CSSStyleObj = Partial<CSSStyleDeclaration> & { [propName: string]: string }

export function measureText(text: string, style?: CSSStyleObj): TextMetrics
export function measureText(text: string, fontSize?: string | number, appendStyle?: CSSStyleObj): TextMetrics
export function measureText(text: string, style?: string | number | CSSStyleObj, appendStyle?: CSSStyleObj): TextMetrics

export function measureText(text: string, style?: string | number | CSSStyleObj, appendStyle?: CSSStyleObj): TextMetrics {
  const normalStyle: CSSStyleObj = {
    'position': 'absolute',
    'float': 'left',
    'white-space': 'nowrap',
    'visibility': 'hidden',
  }
  if (typeof style === 'string' || typeof style === 'number')
    Object.assign(normalStyle, { fontSize: typeof style === 'string' ? style : `${style}px` })
  else
    Object.assign(normalStyle, style)

  Object.assign(normalStyle, { ...appendStyle })
  const container = document.createElement('div')

  // 将样式应用到 DOM 节点
  Object.assign(container.style, normalStyle)

  // 创建文本节点并添加到容器
  const textNode = document.createTextNode(text)
  container.appendChild(textNode)
  // 将容器添加到文档中
  document.body.appendChild(container)
  // 获取文本的宽度
  const width = container.clientWidth
  // 移除容器
  document.body.removeChild(container)
  return { width }
}
