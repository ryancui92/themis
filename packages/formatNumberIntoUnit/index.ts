import { formatNumberIntoUnitParts } from '@packages/formatNumberIntoUnitParts'
import type { FormatNumberOptions } from '@packages/formatNumberIntoLocalString'

export function formatNumberIntoUnit(value: number, options?: number): string
export function formatNumberIntoUnit(value: number, options?: FormatNumberOptions): string

export function formatNumberIntoUnit(value: number, options?: number | FormatNumberOptions) {
  if (typeof options === 'number')
    options = { digits: options }

  const [res, unit] = formatNumberIntoUnitParts(value, options)
  return unit ? `${res} ${unit}` : res
}
