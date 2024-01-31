import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { downloadFile } from '@packages/downloadFile'
import { toValue } from '@packages/utils'

export interface UseBase64HelperOptions {
  raw?: boolean // 是否只有数据部分 raw 为 true 时，mimeType 必须提供
  mimeType?: string
}
export interface UseBase64HelperReturn {
  base64: ComputedRef<string>
  blob: ComputedRef<Blob>
  mimeType: ComputedRef<string>
  download: (name: string) => Promise<void>
}
export function useBase64Helper(target: MaybeRefOrGetter<string>, options?: UseBase64HelperOptions): UseBase64HelperReturn {
  const mimeType = computed(() => {
    return extractBase64ContentType(toValue(target)) || (options?.mimeType ?? '')
  })
  const rawBase64 = computed(() => {
    const str = toValue(target)
    const _default = str.split?.(',')[1]
    if (options?.raw)
      return !_default ? str : _default
    return _default ?? str
  })
  const base64 = computed(() => {
    if (!rawBase64.value)
      return ''
    return `data:${mimeType.value};base64,${rawBase64.value}`
  })

  const blob = computed(() => {
    return rawBase64ToBlob(rawBase64.value, mimeType.value)
  })

  function check() {
    if (rawBase64.value && !mimeType.value)
      throw new Error('[useBase64Helper]: mimeType is required but not provided')
  }

  async function download(name: string): Promise<void> {
    await downloadFile(blob.value, name)
  }

  if (isRef(target) || typeof target === 'function')
    watch(target, check, { immediate: true })
  else
    check()

  return {
    base64,
    blob,
    mimeType,
    download,
  }
}

function rawBase64ToBlob(base64: string, mimeType: string) {
  const byteCharacters = atob(base64)
  const byteNumbers: number[] = Array.from({ length: byteCharacters.length })

  for (let i = 0; i < byteCharacters.length; i++)
    byteNumbers[i] = byteCharacters.charCodeAt(i)

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

function extractBase64ContentType(base64String: string): string {
  const matches = base64String.match(/^data:(.*?);/)
  return matches ? matches[1] : ''
}
