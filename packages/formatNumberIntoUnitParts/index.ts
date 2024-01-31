import { type FormatNumberOptions, formatNumberIntoLocalString } from '@packages/formatNumberIntoLocalString'

export function formatNumberIntoUnitParts(value: number, options?: number): [string, string]
export function formatNumberIntoUnitParts(value: number, options?: FormatNumberOptions): [string, string]

export function formatNumberIntoUnitParts(value: number, options?: number | FormatNumberOptions): [string, string] {
  if (typeof options === 'number')
    options = { digits: options }

  let res = ''
  let unit = ''
  if (Math.abs(value) >= 1e8) {
    res = formatNumberIntoLocalString(value / 1e8, options)
    unit = '亿'
  }
  else if (Math.abs(value) >= 1e4) {
    res = formatNumberIntoLocalString(value / 1e4, options)
    unit = '万'
  }
  else {
    res = formatNumberIntoLocalString(value, options)
    unit = ''
  }
  return [res, unit]
}
