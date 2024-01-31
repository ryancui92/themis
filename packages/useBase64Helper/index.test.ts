import { useBase64Helper } from './index'

describe('useBase64Helper', () => {
  beforeEach(() => {
    // Mock the necessary dependencies
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(),
      revokeObjectURL: vi.fn(),
    })
  })
  describe('完整 base 64 数据', () => {
    it('默认 options', () => {
      const target = ref('data:text/plain;base64,SGVsbG8gV29ybGQh')
      const { base64, blob, mimeType } = useBase64Helper(target)
      expect(base64.value).toBe('data:text/plain;base64,SGVsbG8gV29ybGQh')
      expect(blob.value).toBeInstanceOf(Blob)
      expect(mimeType.value).toBe('text/plain')
    })
    it('options = { raw: true }', () => {
      const target = ref('data:text/plain;base64,SGVsbG8gV29ybGQh')
      const { base64 } = useBase64Helper(target, { raw: true })
      expect(base64.value).toBe('data:text/plain;base64,SGVsbG8gV29ybGQh')
    })
    it('options = { mimeType }', () => {
      const target = ref('data:text/plain;base64,SGVsbG8gV29ybGQh')
      const { mimeType } = useBase64Helper(target, { raw: true, mimeType: 'text/html' })
      expect(mimeType.value).toBe('text/plain')
    })
  })
  describe('原始 base64 数据', () => {
    it('默认 options', () => {
      expect(() => useBase64Helper('SGVsbG8gV29ybGQh')).toThrowError()
    })
    it('options = { raw: true }', () => {
      expect(() => useBase64Helper('SGVsbG8gV29ybGQh', { raw: true })).toThrowError()
    })
    it('options = { mimeType }', () => {
      const { base64, mimeType } = useBase64Helper('SGVsbG8gV29ybGQh', { mimeType: 'text/html' })
      expect(mimeType.value).toBe('text/html')
      expect(base64.value).toBe('data:text/html;base64,SGVsbG8gV29ybGQh')
    })
    it('options = { raw: true, mineType }', () => {
      const { base64, mimeType } = useBase64Helper('SGVsbG8gV29ybGQh', { raw: true, mimeType: 'text/html' })
      expect(mimeType.value).toBe('text/html')
      expect(base64.value).toBe('data:text/html;base64,SGVsbG8gV29ybGQh')
    })
  })
  it('默认空值处理', () => {
    const target = ref('')
    const { base64, mimeType } = useBase64Helper(target)
    expect(base64.value).toBe('')
    expect(mimeType.value).toBe('')
  })

  it('函数格式', () => {
    const target = () => 'data:text/plain;base64,SGVsbG8gV29ybGQh'
    const { base64, blob, mimeType } = useBase64Helper(target)
    expect(base64.value).toBe('data:text/plain;base64,SGVsbG8gV29ybGQh')
    expect(blob.value).toBeInstanceOf(Blob)
    expect(mimeType.value).toBe('text/plain')
  })
  it('下载调用', async () => {
    vi.mock('@packages/downloadFile')
    const { downloadFile: downloadFileSpy } = await import('@packages/downloadFile')
    const target = ref('data:text/plain;base64,SGVsbG8gV29ybGQh')
    const { download } = useBase64Helper(target)
    await download('file.txt')
    expect(downloadFileSpy).toHaveBeenCalled()
  })
})
