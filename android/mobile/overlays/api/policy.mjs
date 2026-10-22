/** HTTPS-only policy. Browser networking remains responsible for TLS/CORS. */
export function httpsOrigin(value, allowed) {
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || !allowed.includes(url.origin))
    throw new Error('ANDROID_API_ORIGIN_REJECTED')
  if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.hostname.endsWith('.localhost'))
    throw new Error('ANDROID_LOOPBACK_REJECTED')
  return url.origin
}
export function apiUrl(value, origin) {
  const url = new URL(value, origin)
  if (url.origin !== origin || url.username || url.password || !url.pathname.startsWith('/api/'))
    throw new Error('ANDROID_API_URL_REJECTED')
  return url.href
}
export function mediaUrl(value, origin, allowed) {
  if (value == null || value === '') return value
  if (typeof value !== 'string') throw new Error('ANDROID_MEDIA_URL_REJECTED')
  const url = new URL(value, origin)
  if (url.protocol !== 'https:' || url.username || url.password || !allowed.includes(url.origin))
    throw new Error('ANDROID_MEDIA_URL_REJECTED')
  // Keep signed absolute URLs byte-for-byte; resolve only relative paths.
  return /^https:\/\//i.test(value) ? value : url.href
}
export function normalizeMedia(value, origin, allowed, key = '') {
  if (Array.isArray(value)) return value.map((item) => normalizeMedia(item, origin, allowed, key))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, normalizeMedia(item, origin, allowed, name)]))
  }
  // Only explicit media field names, never auth deepLink/payment/provider URLs.
  if (/^(avatarUrl|imageUrl|imageUrls|thumbnailUrl|thumbnailUrls|originalUrl|previewUrl)$/i.test(key))
    return mediaUrl(value, origin, allowed)
  return value
}
