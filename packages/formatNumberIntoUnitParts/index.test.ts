import { formatNumberIntoUnitParts } from './index'

describe('formatNumberIntoUnitParts', () => {
  it('兼容不同类型的 options', () => {
    expect(formatNumberIntoUnitParts(123456789, 3)).toStrictEqual(['1.235', '亿'])
    expect(formatNumberIntoUnitParts(123456789, { digits: 3 })).toStrictEqual(['1.235', '亿'])
  })
})
