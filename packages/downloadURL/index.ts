export async function downloadURL(url: string, name?: string) {
  if (typeof window === 'undefined')
    return

  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  name && (link.download = name)
  link.click()
}
