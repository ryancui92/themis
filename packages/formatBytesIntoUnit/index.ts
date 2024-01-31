import { formatBytesIntoUnitParts } from '@packages/formatBytesIntoUnitParts'
import type { FormatNumberOptions } from '@packages/formatNumberIntoLocalString'

export function formatBytesIntoUnit(value: number, options?: FormatNumberOptions): string {
  return formatBytesIntoUnitParts(value, options).join(' ')
}
