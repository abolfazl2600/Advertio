import { useWallet } from '@/shared/api/useWallet'
import { PhoneGate } from '@/shared/auth/PhoneGate'
import { AppHeader } from '@/shared/components/layout/AppHeader'
import { Screen, ScrollArea } from '@/shared/components/layout/Screen'
import { PurchaseHistory } from '@/shared/wallet/PurchaseHistory'
import { WalletActivity } from '@/shared/wallet/WalletActivity'
import { PAYMENT_NOTICE } from '@/shared/payments/policy.mjs'
function ReadOnlyWallet() {
  const query=useWallet()
  return <>
    {query.isLoading ? <p role="status">Loading balance…</p> : query.isError ? <button type="button" onClick={()=>{void query.refetch()}}>Retry balance</button> : <p>Balance: {query.data?.balance??'—'}</p>}
    <p role="status" lang="fa" dir="rtl">{PAYMENT_NOTICE}</p>
    <h2>History</h2><PurchaseHistory/><h2>Activity</h2><WalletActivity/>
  </>
}
export function WalletPage() {
  return <Screen><AppHeader title="Wallet"/><ScrollArea><PhoneGate reason="Verify your phone to view your balance and history."><ReadOnlyWallet/></PhoneGate></ScrollArea></Screen>
}
