import { apiUrl } from './policy.mjs'

// Explicit native transport only. No global fetch/XHR patch or TLS exception.
export async function nativeRequest(bridge, origin, request) {
  const url = apiUrl(request.url, origin)
  const headers = { ...request.headers }
  const timeout = Math.min(Math.max(request.timeout ?? 10000, 1), 60000)
  const options = { url, method: (request.method ?? 'GET').toUpperCase(), headers,
    connectTimeout: timeout, readTimeout: timeout, disableRedirects: true, responseType: 'json' }
  if (request.data instanceof FormData) {
    const entries = []
    let total = 0
    for (const [key, value] of request.data) {
      if (/[\r\n"\\]/.test(key)) throw new Error('INVALID_MULTIPART_FIELD')
      if (typeof value === 'string') {
        total += new TextEncoder().encode(value).length
        entries.push({ key, type: 'string', value })
      } else {
        total += value.size
        if (value.size > 15 * 1024 * 1024) throw new Error('UPLOAD_TOO_LARGE')
        if (total > 25 * 1024 * 1024) throw new Error('UPLOAD_TOO_LARGE')
        const bytes = new Uint8Array(await value.arrayBuffer())
        let binary = ''
        for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192))
        entries.push({ key, type: 'base64File', value: btoa(binary),
          fileName: (value.name ?? 'upload').replace(/[\r\n"\\/]/g, '_'),
          contentType: /^[\w.+-]+\/[\w.+-]+$/.test(value.type) ? value.type : 'application/octet-stream' })
      }
      if (total > 25 * 1024 * 1024) throw new Error('UPLOAD_TOO_LARGE')
    }
    for (const name of Object.keys(headers)) if (name.toLowerCase() === 'content-type') delete headers[name]
    headers['Content-Type'] = 'multipart/form-data'
    options.dataType = 'formData'
    options.data = entries
  } else if (request.data !== undefined) options.data = request.data
  if (request.signal?.aborted) throw new Error('REQUEST_CANCELLED')
  let timer
  let abort
  const stop = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('REQUEST_TIMEOUT')), timeout)
    abort = () => reject(new Error('REQUEST_CANCELLED'))
    request.signal?.addEventListener?.('abort', abort, { once: true })
  })
  let response
  try { response = await Promise.race([bridge.request(options), stop]) }
  finally { clearTimeout(timer); request.signal?.removeEventListener?.('abort', abort) }
  if (request.signal?.aborted) throw new Error('REQUEST_CANCELLED')
  if (response.url && apiUrl(response.url, origin) !== url) throw new Error('UNEXPECTED_RESPONSE_URL')
  return response
}
