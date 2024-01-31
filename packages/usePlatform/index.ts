export function usePlatform() {
  const isiOS = ref(false)
  const isAndroid = ref(false)
  const isWeChat = ref(false)

  const isMacOS = ref(false)
  const isWindows = ref(false)
  const isLinux = ref(false)

  const isMobile = ref(false)
  const isDesktop = computed(() => !isMobile.value)

  const isClient = typeof window !== 'undefined'

  function detect() {
    const u = navigator.userAgent

    isMobile.value = !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

    isAndroid.value = u.includes('Android') || u.includes('Linux')

    isiOS.value = u.includes('iPhone') || u.includes('iOS')

    isWeChat.value = !!u.toLowerCase().match(/MicroMessenger/i)

    isMacOS.value = /Macintosh|Mac OS X/i.test(u)

    isWindows.value = /Windows/i.test(u)

    isLinux.value = /Linux/i.test(u)
  }
  if (isClient)
    getCurrentInstance() ? onMounted(detect) : detect()

  return {
    isAndroid,
    isiOS,
    isWeChat,
    isMacOS,
    isWindows,
    isLinux,
    isMobile,
    isDesktop,
    isClient,
    detect,
  }
}
