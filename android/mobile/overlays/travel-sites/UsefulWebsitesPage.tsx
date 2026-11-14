import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { native } from '@/shared/platform/native-runtime'
import { entryCopy } from '@/shared/onboarding/copy'
import { listTravelSites, SITE_FILTERS } from './sites.mjs'
import type { TravelSiteFilter } from './sites.mjs'
import './sites.css'

const labels = {
  fa: {
    back: 'بازگشت', title: 'وب‌سایت‌های کاربردی سفر',
    intro: 'ابزارهایی برای برنامه‌ریزی سفر، پیدا کردن محل اقامت و آشنایی با افراد محلی.',
    search: 'جست‌وجو بین وب‌سایت‌ها', all: 'همه', flights: 'پرواز', stays: 'اقامت', volunteering: 'همکاری',
    model: 'مدل فعالیت', visit: 'مشاهده وب‌سایت', empty: 'وب‌سایتی با این مشخصات پیدا نشد.',
    notice: 'این وب‌سایت‌ها مستقل از Advertio هستند. پیش از ثبت‌نام، پرداخت یا توافق با میزبان، شرایط و سوابق افراد را بررسی کنید.',
    error: 'باز کردن لینک ممکن نشد. دوباره تلاش کنید.',
  },
  en: {
    back: 'Back', title: 'Useful travel websites',
    intro: 'Practical tools to plan trips, find places to stay and connect with locals.',
    search: 'Search websites', all: 'All', flights: 'Flights', stays: 'Stays', volunteering: 'Volunteering',
    model: 'Model', visit: 'Visit website', empty: 'No websites match your search.',
    notice: 'These services are independent of Advertio. Review their terms and users’ references before signing up, paying or agreeing to a stay.',
    error: 'Could not open the website. Please try again.',
  },
}

export function UsefulWebsitesPage() {
  const navigate = useNavigate()
  const lang = entryCopy().lang === 'fa' ? 'fa' : 'en'
  const copy = labels[lang]
  const [category, setCategory] = useState<TravelSiteFilter>('all')
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const sites = useMemo(() => listTravelSites({ category, query, locale: lang }), [category, query, lang])

  useEffect(() => native.registerBack(() => navigate('/')), [navigate])

  const open = async (url: string) => {
    setError(null)
    try { await native.openExternal(url) }
    catch { setError(url) }
  }

  return <main className="android-useful-sites" lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} aria-labelledby="useful-sites-heading">
    <header className="android-useful-sites-header">
      <button className="android-useful-sites-back" type="button" onClick={() => navigate('/')} aria-label={copy.back}>
        <span aria-hidden="true">{lang === 'fa' ? '‹' : '‹'}</span>{copy.back}
      </button>
      <h1 id="useful-sites-heading">{copy.title}</h1>
      <p>{copy.intro}</p>
    </header>

    <section className="android-useful-sites-content" aria-label={copy.title}>
      <label className="android-useful-sites-search">
        <span className="android-useful-sites-search-icon" aria-hidden="true">⌕</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search}/>
      </label>
      <div className="android-useful-sites-filters" role="group" aria-label={copy.title}>
        {SITE_FILTERS.map((filter) => <button type="button" key={filter} aria-pressed={category === filter}
          className={category === filter ? 'active' : ''}
          onClick={() => setCategory(filter)}>{copy[filter]}</button>)}
      </div>
      <div className="android-useful-sites-grid">
        {sites.map((site) => {
          const item = site[lang]
          return <article className="android-useful-sites-card" key={site.id}>
            <div className="android-useful-sites-card-top">
              <div className="android-useful-sites-mark" aria-hidden="true">{site.category === 'flights' ? '✈' : site.category === 'volunteering' ? '◇' : '⌂'}</div>
              <div className="android-useful-sites-card-heading"><h2>{item.title}</h2><p>{item.category}</p></div>
            </div>
            <p className="android-useful-sites-description">{item.description}</p>
            <p className="android-useful-sites-detail">{item.detail}</p>
            <div className="android-useful-sites-card-bottom">
              <div className="android-useful-sites-model"><span>{copy.model}</span><strong>{site.model}</strong></div>
              <button type="button" className="android-useful-sites-visit" onClick={() => void open(site.url)}>
                {copy.visit}<span aria-hidden="true">↗</span>
              </button>
            </div>
            {error === site.url && <p className="android-useful-sites-error" role="alert">{copy.error}</p>}
          </article>
        })}
      </div>
      {sites.length === 0 && <p className="android-useful-sites-empty">{copy.empty}</p>}
      <p className="android-useful-sites-disclaimer">{copy.notice}</p>
    </section>
  </main>
}
