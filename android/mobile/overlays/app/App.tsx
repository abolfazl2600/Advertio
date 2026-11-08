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
  // The illustrations are shown once per installation. A returning guest starts at login.
  const [welcoming, setWelcoming] = useState(() => !hasSeenWelcome(storage()))
  const [signingIn, setSigningIn] = useState(() => hasSeenWelcome(storage()))
  const finishWelcome = () => { completeWelcome(storage()); setWelcoming(false) }
  const signIn = () => { finishWelcome(); setSigningIn(true) }
  const browse = () => { finishWelcome(); setSigningIn(false); navigate('/', { replace: true }) }
  useEffect(() => {
    if (session.status === 'authenticated') {
      completeWelcome(storage())
      setWelcoming(false)
      setSigningIn(false)
    }
  }, [session.status])
  useEffect(() => signingIn && !welcoming ? native.registerBack(browse) : undefined, [signingIn, welcoming])
  const copy = entryCopy()
  return <div className="app-vh">
    {welcoming ? <WelcomePage onSignIn={signIn} onBrowse={browse}/> : signingIn && session.status !== 'authenticated' ?
      <main className="android-entry-login" lang={copy.lang} dir={copy.dir}>
        <header className="android-entry-login-header"><button type="button" onClick={browse}>{copy.back}</button><strong>advertio</strong></header>
        <div className="android-entry-login-body"><LoginScreen reason={copy.loginReason}/><button type="button" className="android-entry-secondary" onClick={browse}>{copy.browse}</button></div>
      </main> : <><AppRoutes/>{!isJourneyPath(pathname) && <TabBar/>}</>}
  </div>
}
