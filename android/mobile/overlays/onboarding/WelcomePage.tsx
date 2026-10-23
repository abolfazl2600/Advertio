import { entryCopy } from './copy'
import './entry.css'
export function WelcomePage({ onSignIn, onBrowse }: { onSignIn: () => void; onBrowse: () => void }) {
  const copy = entryCopy()
  return <main className="android-welcome" lang={copy.lang} dir={copy.dir}>
    <div className="android-welcome-content">
      <div className="android-entry-brand"><img src="/logo-mark.png" width="36" height="36" alt=""/><strong>advertio</strong></div>
      <div className="android-entry-art" aria-hidden="true"><span>⌂</span><span>↗</span><span>✦</span></div>
      <p className="android-entry-eyebrow">{copy.welcome}</p><h1>{copy.intro}</h1>
      <p className="android-entry-description">{copy.detail}</p>
      <div className="android-entry-categories"><span>{copy.housing}</span><span>{copy.cargo}</span><span>{copy.jobs}</span></div>
      <div className="android-entry-actions"><button type="button" className="android-entry-primary" onClick={onSignIn}>{copy.signIn}</button><button type="button" className="android-entry-secondary" onClick={onBrowse}>{copy.browse}</button></div>
      <p className="android-entry-hint">{copy.later}</p>
    </div>
  </main>
}
