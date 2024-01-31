import { formatNumberIntoUnit } from './index'

describe('formatNumberIntoUnit', () => {
  it.concurrent('should use zero', () => {
    expect(formatNumberIntoUnit(0)).toBe('0')
    expect(formatNumberIntoUnit(-0)).toBe('0')
  })

  it.concurrent('should have k-separated effect', () => {
    expect(formatNumberIntoUnit(3)).toBe('3')
    expect(formatNumberIntoUnit(3.1)).toBe('3.1')
    expect(formatNumberIntoUnit(4133.1)).toBe('4,133.1')
    expect(formatNumberIntoUnit(1234)).toBe('1,234')
    expect(formatNumberIntoUnit(1000)).toBe('1,000')
    expect(formatNumberIntoUnit(12345678)).toBe('1,234.57 万')
  })

  it.concurrent('should support digits parameters', () => {
    expect(formatNumberIntoUnit(3.5678, { digits: 2 })).toBe('3.57')
    expect(formatNumberIntoUnit(3, { digits: 2 })).toBe('3')
    expect(formatNumberIntoUnit(3.6, { digits: 2 })).toBe('3.6')
    expect(formatNumberIntoUnit(10000, { digits: 3 })).toBe('1 万')
    expect(formatNumberIntoUnit(12340, { digits: 3 })).toBe('1.234 万')
    expect(formatNumberIntoUnit(12340, 3)).toBe('1.234 万')
  })

  it.concurrent('should support 万 unit', () => {
    expect(formatNumberIntoUnit(10000)).toBe('1 万')
    expect(formatNumberIntoUnit(11000)).toBe('1.1 万')
    expect(formatNumberIntoUnit(12300)).toBe('1.23 万')
    expect(formatNumberIntoUnit(123446)).toBe('12.34 万')
    expect(formatNumberIntoUnit(123789)).toBe('12.38 万')
    expect(formatNumberIntoUnit(23789.678)).toBe('2.38 万')
  })

  it.concurrent('should support 亿 unit', () => {
    expect(formatNumberIntoUnit(100000000)).toBe('1 亿')
    expect(formatNumberIntoUnit(110000000)).toBe('1.1 亿')
    expect(formatNumberIntoUnit(123000000)).toBe('1.23 亿')
    expect(formatNumberIntoUnit(123456789)).toBe('1.23 亿')
    expect(formatNumberIntoUnit(123456789, { digits: 3 })).toBe('1.235 亿')
  })

  it.concurrent('should support negative number', () => {
    expect(formatNumberIntoUnit(-123456789)).toBe('-1.23 亿')
    expect(formatNumberIntoUnit(-123)).toBe('-123')
    expect(formatNumberIntoUnit(-12345)).toBe('-1.23 万')
    expect(formatNumberIntoUnit(-30000)).toBe('-3 万')
  })
})
