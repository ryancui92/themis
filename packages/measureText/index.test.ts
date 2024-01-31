import { type CSSStyleObj, measureText } from './index'

describe('measureText', () => {
  it('添加计算节点', () => {
    const text = 'Hello, world!'
    const appendStyle: CSSStyleObj = { fontSize: '16px', color: 'red' }
    const createElementSpy = vi.spyOn(document, 'createElement')
    const createTextNodeSpy = vi.spyOn(document, 'createTextNode')
    const appendSpy = vi.spyOn(document.body, 'appendChild')
    const measureTextSpy = vi.fn(measureText)

    expect(createElementSpy).not.toHaveBeenCalled()
    expect(createTextNodeSpy).not.toHaveBeenCalled()
    expect(appendSpy).not.toHaveBeenCalled()
    const result = measureTextSpy(text, appendStyle)

    expect(createElementSpy).toHaveBeenCalledWith('div')
    expect(createTextNodeSpy).toHaveBeenCalledWith(text)
    expect(appendSpy).toHaveBeenCalled()
    expect(measureTextSpy).toHaveReturned()
    expect(result).not.toBeNull()
  })
  it('移除计算节点', () => {
    const text = 'Hello, world!'
    const fontSize = 16
    const appendStyle = { color: 'red' }
    const removeSpy = vi.spyOn(document.body, 'removeChild')

    expect(removeSpy).not.toHaveBeenCalled()

    const result = measureText(text, fontSize, appendStyle)

    expect(removeSpy).toHaveBeenCalled()
    expect(result).not.toBeNull()
  })
  it('第二个参数为 number', () => {
    const text = 'Hello, world!'
    const createElementSpy = vi.spyOn(document, 'createElement')
    const measureTextSpy = vi.fn(measureText)
    expect(createElementSpy).not.toHaveBeenCalled()
    const result = measureTextSpy(text, 16)
    expect(measureTextSpy).toHaveReturned()
    expect(result).not.toBeNull()
  })
  it('第二个参数为 string', () => {
    const text = 'Hello, world!'
    const createElementSpy = vi.spyOn(document, 'createElement')
    const measureTextSpy = vi.fn(measureText)
    expect(createElementSpy).not.toHaveBeenCalled()
    const result = measureTextSpy(text, '16px')
    expect(measureTextSpy).toHaveReturned()
    expect(result).not.toBeNull()
  })
})
