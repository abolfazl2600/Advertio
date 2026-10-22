export const PURCHASES_ENABLED: false
export const CREDIT_SPENDING_ENABLED: false
export const PAYMENT_NOTICE: string
export function isPaymentLocation(value: unknown): boolean
export function assertRequestAllowed(method: string | undefined, value: string, origin: string): void
export function authorizeAuthLink(value: string): string
export function consumeAuthLink(value: string): string
export function isPaymentAction(label: string | null | undefined): boolean
