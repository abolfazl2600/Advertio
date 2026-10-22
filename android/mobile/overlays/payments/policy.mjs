export const PURCHASES_ENABLED = false
export const CREDIT_SPENDING_ENABLED = false
export const PAYMENT_NOTICE = 'خرید سکه به‌زودی فعال می‌شود'
const authLinks = new Set()
const payment = /(?:^|[\/_\-?&=\s:.#])(buy(?:coins)?|top[-_]?up|checkout|purchase|payments?|invoice|billing|upgrade|stripe|telegram_stars|mp)(?:$|[\/_\-?&=\s:.#])/i
function decode(value) {
  let result=String(value)
  for(let i=0;i<6;i++) {
    const next=decodeURIComponent(result)
    if(next===result) return next
    result=next
  }
  throw new Error('PAYMENT_URL_REJECTED')
}
export function isPaymentLocation(value) {
  try {
    const decoded=decode(value)
    if(payment.test(decoded)) return true
    const url=new URL(decoded,'https://localhost')
    if(url.pathname.startsWith('/$')) return true
    for(const [name,child] of url.searchParams) if(payment.test(name) || payment.test(decode(child))) return true
    return false
  } catch { return true }
}
export function assertRequestAllowed(method,value,origin) {
  const url=new URL(value,origin)
  const path=new URL(decode(url.pathname),origin).pathname.replace(/\/+$/,'').toLowerCase()
  const verb=(method??'get').toUpperCase()
  if(url.origin!==origin || isPaymentLocation(path)) {
    // Read-only balance/history are explicit exceptions, never provider/checkout details.
    if(url.origin===origin && verb==='GET' && ['/api/wallet','/api/wallet/transactions','/api/wallet/payments'].includes(path)) return
    throw new Error('ANDROID_PAYMENTS_DISABLED')
  }
  if(path.startsWith('/api/wallet') && !(verb==='GET' && ['/api/wallet','/api/wallet/transactions','/api/wallet/payments'].includes(path))) throw new Error('ANDROID_PAYMENTS_DISABLED')
  if(!CREDIT_SPENDING_ENABLED && !['GET','HEAD','OPTIONS'].includes(verb) &&
    (path==='/api/leads' || /\/api\/leads\/[^/]+\/(renew|boost|contact)$/.test(path) || path==='/api/users/me/identity-verification')) throw new Error('ANDROID_CREDIT_SPENDING_DISABLED')
}
export function authorizeAuthLink(value) {
  const url=new URL(value)
  if(url.protocol!=='https:' || url.username || url.password || !['t.me','telegram.me'].includes(url.hostname) || !/^\/[A-Za-z0-9_]{5,32}$/.test(url.pathname) || url.searchParams.size!==1 || !url.searchParams.has('start') || isPaymentLocation(value)) throw new Error('AUTH_LINK_REJECTED')
  authLinks.add(url.href)
  if(authLinks.size>4) authLinks.delete(authLinks.values().next().value)
  return url.href
}
export function consumeAuthLink(value) {
  const url=new URL(value)
  if(!authLinks.delete(url.href)) throw new Error('ANDROID_EXTERNAL_LINK_DISABLED')
  return url.href
}
export function isPaymentAction(label) {
  return /\b(add\s+coins|buy\s+coins|top\s*up|upgrade|checkout|pay\s+now|purchase\s+coins|other\s+payment)\b|خرید\s*سکه|شارژ\s*(کیف\s*پول|سکه)/i.test(label??'')
}
