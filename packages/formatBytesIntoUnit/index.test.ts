import { formatBytesIntoUnit } from './index'

describe('formatNumberIntoUnit', () => {
  it('异常值', () => {
    expect(() => formatBytesIntoUnit(-1)).toThrowError(/negative/)
  })
  it('单位 - B', () => {
    const value = 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 B')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 B')
    expect(formatBytesIntoUnit(0)).toBe('0 B')
  })
  it('单位 - KB', () => {
    const value = 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 KB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 KB')
  })
  it('单位 - MB', () => {
    const value = 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 MB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 MB')
  })
  it('单位 - GB', () => {
    const value = 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 GB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 GB')
  })
  it('单位 - TB', () => {
    const value = 1024 * 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 TB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 TB')
  })
  it('单位 - PB', () => {
    const value = 1024 * 1024 * 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 PB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 PB')
  })
  it('单位 - EB', () => {
    const value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 EB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 EB')
  })
  it('单位 - ZB', () => {
    const value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 ZB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 ZB')
  })
  it('单位 - YB', () => {
    const value = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1000
    expect(formatBytesIntoUnit(value)).toBe('1,000 YB')
    expect(formatBytesIntoUnit(value, { kSeparator: false })).toBe('1000 YB')
  })
})
