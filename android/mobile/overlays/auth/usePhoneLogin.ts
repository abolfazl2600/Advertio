import { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { API } from '@/shared/api/endpoints'
import { acceptSession, session } from '@/shared/stores/auth.store'

export type LoginStep = 'phone' | 'code'
interface Challenge { expiresInSeconds: number; resendAvailableInSeconds: number; codeLength: number }
export function usePhoneLogin() {
  const client = useQueryClient()
  const operation = useRef(0)
  const [step, setStep] = useState<LoginStep>('phone')
  const [phone, setPhone] = useState('')
  const [codeLength, setCodeLength] = useState(6)
  const [resendIn, setResendIn] = useState(0)
  const [deadline, setDeadline] = useState(0)
  useEffect(() => {
    if (!resendIn) return
    const timer = setTimeout(() => setResendIn((v) => Math.max(0, v - 1)), 1000)
    return () => clearTimeout(timer)
  }, [resendIn])
  const requestCode = useMutation({
    mutationFn: async (value: string) => {
      const epoch = session.epoch(), current = ++operation.current
      const {data} = await apiClient.post<Challenge>(API.auth.requestOtp, {phone: value})
      if (epoch !== session.epoch() || current !== operation.current) throw new Error('LOGIN_CANCELLED')
      if (!Number.isInteger(data.codeLength) || data.codeLength < 4 || data.codeLength > 12 || !Number.isFinite(data.expiresInSeconds) || data.expiresInSeconds <= 0) throw new Error('INVALID_CHALLENGE')
      return {challenge: data, phone: value}
    },
    onSuccess: ({challenge, phone}) => {
      setPhone(phone); setCodeLength(challenge.codeLength)
      setResendIn(Math.max(0, challenge.resendAvailableInSeconds)); setDeadline(Date.now() + challenge.expiresInSeconds * 1000)
      setStep('code')
    },
  })
  const submitCode = useMutation({
    mutationFn: async (code: string) => {
      if (Date.now() >= deadline || !new RegExp(`^\\d{${codeLength}}$`).test(code)) throw new Error('CODE_INVALID_OR_EXPIRED')
      const epoch = session.epoch(), current = operation.current
      const {data} = await apiClient.post<{token: string; userId: string}>(API.auth.provider('phone'), {credential: JSON.stringify({phone, code})})
      if (epoch !== session.epoch() || current !== operation.current) throw new Error('LOGIN_CANCELLED')
      await acceptSession(data.token, data.userId)
      return data
    },
    onSuccess: () => { void client.invalidateQueries() },
  })
  const editPhone = useCallback(() => { ++operation.current; setStep('phone'); setPhone(''); setDeadline(0); requestCode.reset(); submitCode.reset() }, [requestCode, submitCode])
  return {step, phone, codeLength, resendIn, requestCode, submitCode, editPhone, isBusy: requestCode.isPending || submitCode.isPending,
    error: requestCode.error || submitCode.error ? 'Could not sign in. Check the code or try again.' : null}
}
