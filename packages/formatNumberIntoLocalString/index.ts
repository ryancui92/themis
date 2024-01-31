export interface FormatNumberOptions {
  digits?: number
  kSeparator?: boolean
}

export function formatNumberIntoLocalString(value: number, options: FormatNumberOptions = {}): string {
  const { digits = 2, kSeparator = true } = options
  const valueFixed = Number.parseFloat(value.toFixed(digits))
  return kSeparator
    ? valueFixed.toLocaleString()
    : valueFixed.toString()
}
