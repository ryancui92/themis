import { downloadURL } from '@packages/downloadURL'

export async function downloadFile(data: Blob, name?: string) {
  const url = URL.createObjectURL(data)
  downloadURL(url, name)
  URL.revokeObjectURL(url)
}
