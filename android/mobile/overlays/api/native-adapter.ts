import axios, { AxiosError, AxiosHeaders, CanceledError, type AxiosAdapter } from 'axios'
import { Capacitor, CapacitorHttp } from '@capacitor/core'
import { nativeRequest } from './native-request.mjs'
import { apiUrl } from './policy.mjs'

export function nativeAdapter(origin: string): AxiosAdapter | undefined {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return undefined
  return async config => {
    const url = apiUrl(axios.getUri(config), origin)
    const headers: Record<string,string> = {}
    for (const [key,value] of Object.entries(config.headers.toJSON(true))) if (value != null) headers[key] = String(value)
    try {
      const result = await nativeRequest(CapacitorHttp, origin, {url, method: config.method, headers,
        data: config.data, timeout: config.timeout, signal: config.signal})
      if (config.signal?.aborted) throw new CanceledError('Request cancelled', config)
      const response = { data: result.data, status: result.status, statusText: '', headers: new AxiosHeaders(result.headers), config }
      if (config.validateStatus && !config.validateStatus(result.status)) {
        throw new AxiosError('API request failed', result.status >= 500 ? 'ERR_BAD_RESPONSE' : 'ERR_BAD_REQUEST', config, undefined, response)
      }
      return response
    } catch (error) {
      if (config.signal?.aborted) throw new CanceledError('Request cancelled', config)
      if (axios.isAxiosError(error)) throw error
      // Native errors can include URLs; expose a fixed public code only.
      throw new AxiosError('Native API request failed', 'ERR_NETWORK', config)
    }
  }
}

// Restore/revoke use an explicit captured token, independent of the active store.
export async function capturedTokenRequest(origin: string, path: string, token: string, method = 'GET') {
  const url = apiUrl(path, origin)
  if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
    return nativeRequest(CapacitorHttp, origin, {url, method, headers:{Authorization:`Bearer ${token}`}, timeout:10000})
  }
  const response = await fetch(url, {method, headers:{Authorization:`Bearer ${token}`}, redirect:'error', signal:AbortSignal.timeout(10000)})
  return {status:response.status,data:response.ok && method === 'GET' ? await response.json() : null}
}
