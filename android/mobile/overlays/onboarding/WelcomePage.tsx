import { useEffect, useState } from 'react'
import { native } from '@/shared/platform/native-runtime'
import { entryCopy } from './copy'
import './entry.css'

const slideImages = [
  '/onboarding/slide-01.webp',
  '/onboarding/slide-02.webp',
  '/onboarding/slide-03.webp',
] as const

export function WelcomePage({ onSignIn, onBrowse }: { onSignIn: () => void; onBrowse: () => void }) {
  const [index, setIndex] = useState(0)
  const copy = entryCopy()
  const slide = copy.slides[index]
  const lastSlide = index === slideImages.length - 1

  useEffect(() => {
    if (index === 0) return
    return native.registerBack(() => setIndex(current => Math.max(0, current - 1)))
  }, [index])

  const advance = () => lastSlide ? onSignIn() : setIndex(current => Math.min(slideImages.length - 1, current + 1))
  return <main className="android-welcome" lang={copy.lang} dir={copy.dir}>
    <div className="android-onboarding-slide" key={index}>
      <div className="android-onboarding-art"><img src={slideImages[index]} alt="" draggable={false}/></div>
      <div className="android-onboarding-copy" aria-live="polite" aria-atomic="true">
        <h1>{slide.title}</h1>
        <p className="android-entry-description">{slide.detail}</p>
      </div>
    </div>
    <div className="android-onboarding-controls">
      <div className="android-onboarding-dots" role="group" aria-label={copy.slideProgress}>
        {slideImages.map((_, i) => <span key={i} className={i === index ? 'active' : ''} aria-label={`${i + 1} / ${slideImages.length}`} aria-current={i === index ? 'step' : undefined}/>)}
      </div>
      <button type="button" className="android-entry-primary" onClick={advance}>{lastSlide ? copy.signIn : copy.next}</button>
      <button type="button" className="android-onboarding-skip" onClick={onBrowse}>{copy.browse}</button>
    </div>
  </main>
}
