import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Providers } from '@/app/providers'
import { AppRoutes } from '@/app/router'
import { TabBar } from '@/shared/components/layout/TabBar'
import { isJourneyPath } from '@/shared/config/journeys.config'
import { LoginScreen } from '@/shared/auth/LoginScreen'
import { useSession } from '@/shared/auth/useSession'
import { useThemeSync } from '@/shared/platform/useThemeSync'
import { native } from '@/shared/platform/native-runtime'
import { WelcomePage } from '@/shared/onboarding/WelcomePage'
import { entryCopy } from '@/shared/onboarding/copy'
import { completeWelcome, hasSeenWelcome } from '@/shared/onboarding/entry.mjs'

function storage() { try { return window.localStorage } catch { return undefined } }
export function App() { return <Providers><AndroidEntry /></Providers> }
function AndroidEntry() {
  useThemeSync()
  const session = useSession()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [welcoming, setWelcoming] = useState(() => !hasSeenWelcome(storage()))
  const [signingIn, setSigningIn] = useState(false)
  const finish = () => { completeWelcome(storage()); setWelcoming(false) }
  const browse = () => { finish(); navigate('/', { replace: true }) }
  useEffect(() => {
    if (welcoming && session.status === 'authenticated') {
      completeWelcome(storage()); setWelcoming(false)
    }
  }, [session.status, welcoming])
  useEffect(() => signingIn && welcoming ? native.registerBack(() => setSigningIn(false)) : undefined, [signingIn, welcoming])
  const copy = entryCopy()
  return <div className="app-vh">
    {welcoming ? signingIn ? <main className="android-entry-login" lang={copy.lang} dir={copy.dir}>
      <header className="android-entry-login-header"><button type="button" onClick={() => setSigningIn(false)}>{copy.back}</button><strong>advertio</strong></header>
      <div className="android-entry-login-body"><LoginScreen reason={copy.loginReason}/><button type="button" className="android-entry-secondary" onClick={browse}>{copy.browse}</button></div>
    </main> : <WelcomePage onSignIn={() => setSigningIn(true)} onBrowse={browse}/> : <><AppRoutes/>{!isJourneyPath(pathname) && <TabBar/>}</>}
  </div>
}
