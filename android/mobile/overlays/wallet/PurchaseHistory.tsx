import { useMyPayments } from '@/shared/wallet/useTopUp'
export function PurchaseHistory() {
  const query=useMyPayments()
  if(query.isLoading) return <p role="status">Loading history…</p>
  if(query.isError) return <button type="button" onClick={()=>{void query.refetch()}}>Retry history</button>
  return <ul>{(query.data??[]).map((item)=><li key={item.id}>{item.coins} · {item.status} · {new Date(item.createdAtUtc).toLocaleDateString()}</li>)}</ul>
}
