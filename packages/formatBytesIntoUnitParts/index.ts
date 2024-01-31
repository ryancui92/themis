import { type FormatNumberOptions, formatNumberIntoLocalString } from '@packages/formatNumberIntoLocalString'

export function formatBytesIntoUnitParts(value: number, options?: FormatNumberOptions): [string, string] {
  if (value < 0)
    throw new Error('[formatBytesIntoUnitParts]: Value cannot be negative.')

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  let unitIndex = 0
  let formattedValue = value

  while (formattedValue >= 1024 && unitIndex < units.length - 1) {
    formattedValue /= 1024
    unitIndex++
  }
  const res = formatNumberIntoLocalString(formattedValue, options)

  return [res, units[unitIndex]]
}
