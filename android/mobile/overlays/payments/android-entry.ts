import { installPaymentBoundary } from '@/shared/payments/bootstrap'
void installPaymentBoundary().then(()=>import('./main')).catch(()=>{
  document.body.textContent='Could not start Advertio safely. Please restart the app.'
})
