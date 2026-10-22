import axios from 'axios'
import { useAuthStore } from '@/shared/stores/auth.store'
import { apiUrl, httpsOrigin, normalizeMedia } from './policy.mjs'

const originList = (value: string | undefined) => (value ?? '').split(',').map((x) => x.trim()).filter(Boolean)
const approvedApis = originList(import.meta.env.VITE_ANDROID_API_ORIGINS)
const origin = httpsOrigin(import.meta.env.VITE_API_URL ?? '', approvedApis)
const approvedMedia = [origin, ...originList(import.meta.env.VITE_ANDROID_MEDIA_ORIGINS)]
// Validate every configured media origin before any request is possible.
for (const media of approvedMedia) httpsOrigin(media, approvedMedia)
export const apiClient = axios.create({ baseURL: origin, timeout: 10_000, withCredentials: false })
apiClient.interceptors.request.use((config) => {
  config.url = apiUrl(config.url ?? '', origin)
  config.baseURL = origin
  config.timeout = Math.min(Math.max(config.timeout ?? 10_000, 1), 60_000)
  const token = useAuthStore.getState().token
  config.headers.delete('Authorization')
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  // FormData keeps the browser-generated multipart boundary. No blanket Content-Type.
  return config
})
apiClient.interceptors.response.use((response) => {
  const contentType = String(response.headers['content-type'] ?? '')
  if (contentType.includes('json')) response.data = normalizeMedia(response.data, origin, approvedMedia)
  return response
}, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) useAuthStore.getState().logout()
  // Preserve the caller's error contract; never log the Axios object (contains token/config).
  return Promise.reject(error)
})
