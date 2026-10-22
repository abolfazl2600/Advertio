import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { API } from '@/shared/api/endpoints'
import { useAuthStore } from '@/shared/stores/auth.store'
import { PAYMENT_NOTICE } from '@/shared/payments/policy.mjs'
export interface CoinPack {id: string; coins: number; stars: number; cadCents: number}
export interface Checkout {paymentId: string; coins: number; amount: number; currency: string; provider: string; checkoutUrl: string}
export type PaymentRail = 'telegram_stars' | 'stripe'
export interface PaymentSummary {id: string; provider: string; coins: number; amount: number; currency: string; status: 'Pending'|'Succeeded'|'Failed'|'Refunded'; createdAtUtc: string; canRefund: boolean}
export interface ManualPaymentOptions {available: boolean; methods: string[]}
export interface ManualPaymentStart {requestId: string; botLink: string}
export const COIN_PACKS_QUERY_KEY=['wallet','packs'] as const
export const MANUAL_PAYMENT_OPTIONS_QUERY_KEY=['wallet','manual-payment-options'] as const
export const PAYMENTS_QUERY_KEY=['wallet','payments'] as const
function disabled(): never {throw new Error(PAYMENT_NOTICE)}
export function useCoinPacks() {return useQuery<CoinPack[]>({queryKey:COIN_PACKS_QUERY_KEY,queryFn:async()=>[],enabled:false,initialData:[]})}
export function useManualPaymentOptions() {return useQuery<ManualPaymentOptions>({queryKey:MANUAL_PAYMENT_OPTIONS_QUERY_KEY,queryFn:async()=>({available:false,methods:[]}),enabled:false,initialData:{available:false,methods:[]}})}
export function useStartTopUp() {return useMutation<Checkout,Error,{packId:string;provider:PaymentRail}>({mutationFn:async()=>disabled()})}
export function useStartManualPayment() {return useMutation<ManualPaymentStart,Error,void>({mutationFn:async()=>disabled()})}
export function useRefundPayment() {return useMutation<void,Error,string>({mutationFn:async()=>disabled()})}
export function useAwaitCredit() {return async (_previousBalance: number,_attempts=0): Promise<boolean>=>false}
export function useMyPayments() {
  const token=useAuthStore((s)=>s.token)
  return useQuery<PaymentSummary[]>({queryKey:PAYMENTS_QUERY_KEY,queryFn:async()=>(await apiClient.get(API.wallet.payments)).data,enabled:Boolean(token)})
}
