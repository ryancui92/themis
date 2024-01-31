import { downloadFile } from './index'

describe('downloadFile', () => {
  beforeAll(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(),
      revokeObjectURL: vi.fn(),
    })
  })
  it('添加下载节点', () => {
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
    const createElementSpy = vi.spyOn(document, 'createElement')
    expect(createElementSpy).not.toHaveBeenCalled()
    downloadFile(blob)
    expect(createElementSpy).toHaveBeenCalled()
  })
  it('移除下载节点', () => {
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL')
    downloadFile(new Blob(['Hello, world!'], { type: 'text/plain' }), 'test')
    expect(revokeObjectURL).toHaveBeenCalled()
  })
  it('非浏览器环境', async () => {
    vi.stubGlobal('window', undefined)
    const createElementSpy = vi.spyOn(document, 'createElement')
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
    expect(createElementSpy).not.toHaveBeenCalled()
    downloadFile(blob)
    expect(createElementSpy).not.toHaveBeenCalled()
  })
})
