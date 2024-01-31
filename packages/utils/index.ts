import type { MaybeRefOrGetter } from 'vue'

export type AnyFn = (...args: any[]) => any

export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unref(r)
}
