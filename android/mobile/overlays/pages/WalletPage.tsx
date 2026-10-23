import { useNavigate } from 'react-router-dom'
import { Screen } from '@/shared/components/layout/Screen'
import { Icon } from '@/shared/components/ui/Icon'
import { entryCopy } from '@/shared/onboarding/copy'
import '@/shared/onboarding/entry.css'

// A static future feature: no wallet, balance, payment or transaction requests.
export function WalletPage() {
  const navigate = useNavigate()
  const copy = entryCopy()
  return <Screen><main className="android-wallet-future" lang={copy.lang} dir={copy.dir} aria-labelledby="wallet-future-title">
    <div className="android-wallet-card"><div className="android-wallet-icon" aria-hidden="true"><Icon name="wallet" size={32}/></div>
      <p className="android-wallet-badge">{copy.future}</p><h1 id="wallet-future-title">{copy.walletTitle}</h1>
      <p>{copy.walletDetail}</p><button type="button" className="android-entry-primary" onClick={() => navigate('/')}>{copy.explore}</button>
    </div>
  </main></Screen>
}
