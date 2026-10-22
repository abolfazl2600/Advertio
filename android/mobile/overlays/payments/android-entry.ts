import '@/shared/platform/native-ux.css'
import { installNativeUX } from '@/shared/platform/native-ux'
import { installPaymentBoundary } from '@/shared/payments/bootstrap'
void installPaymentBoundary().then(()=>installNativeUX()).then(()=>import('./main')).catch(()=>{
  document.body.replaceChildren()
  const message=document.createElement('p');message.setAttribute('role','alert');message.textContent='Could not start Advertio. Please retry.'
  const retry=document.createElement('button');retry.type='button';retry.textContent='Retry';retry.onclick=()=>location.reload()
  document.body.append(message,retry)
})
