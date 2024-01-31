import { usePlatform } from './index'

describe('usePlatform', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
    })
  })
  const {
    isAndroid,
    isiOS,
    isWeChat,
    isMacOS,
    isWindows,
    isLinux,
    isMobile,
    isDesktop,
    detect,
  } = usePlatform()

  it('iOS', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.124 Mobile/15E148 Safari/604.1',
    })
    detect()
    expect(isAndroid.value).toBe(false)
    expect(isiOS.value).toBe(true)
    expect(isWeChat.value).toBe(false)
    expect(isMobile.value).toBe(true)
    expect(isDesktop.value).toBe(false)
  })

  it('is Android', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux Android 10 Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
    })
    detect()
    expect(isAndroid.value).toBe(true)
    expect(isiOS.value).toBe(false)
    expect(isWeChat.value).toBe(false)
    expect(isMobile.value).toBe(true)
    expect(isDesktop.value).toBe(false)
  })

  it('微信浏览器', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux Android 9 SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36 MicroMessenger/7.0.9.1560(0x2700093B) Process/appbrand0 NetType/WIFI Language/zh_CN',
    })
    detect()
    expect(isAndroid.value).toBe(true)
    expect(isiOS.value).toBe(false)
    expect(isWeChat.value).toBe(true)
    expect(isMobile.value).toBe(true)
    expect(isDesktop.value).toBe(false)
  })

  it('is MacOS', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    detect()
    expect(isMacOS.value).toBe(true)
    expect(isWindows.value).toBe(false)
    expect(isLinux.value).toBe(false)
    expect(isDesktop.value).toBe(true)
  })

  it('is Windows', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    })
    detect()
    expect(isMacOS.value).toBe(false)
    expect(isWindows.value).toBe(true)
    expect(isLinux.value).toBe(false)
    expect(isDesktop.value).toBe(true)
  })

  it('is Linux', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    })
    detect()
    expect(isMacOS.value).toBe(false)
    expect(isWindows.value).toBe(false)
    expect(isLinux.value).toBe(true)
    expect(isDesktop.value).toBe(true)
  })

  it('is Desktop', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    detect()
    expect(isAndroid.value).toBe(false)
    expect(isiOS.value).toBe(false)
    expect(isWeChat.value).toBe(false)
    expect(isMobile.value).toBe(false)
    expect(isDesktop.value).toBe(true)
  })
})
