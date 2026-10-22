import { PAYMENT_NOTICE } from '@/shared/payments/policy.mjs'
// Compatibility boundary for every insufficient-balance path. There is no provider or payment sheet.
export function BuyCoinsSheet({onClose}: {onClose: () => void}) {
  return <div role="status" className="android-payment-notice" dir="rtl"><p>{PAYMENT_NOTICE}</p><button type="button" onClick={onClose}>بستن</button></div>
}
