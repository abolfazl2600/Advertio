// Curated, official HTTPS destinations only. This module never accepts remote user-supplied URLs.
export const TRAVEL_SITES = Object.freeze([
  {
    id: 'google-flights',
    category: 'flights',
    url: 'https://www.google.com/travel/flights',
    model: 'Travel Search',
    fa: {
      title: 'Google Flights',
      category: 'جست‌وجوی پرواز',
      description: 'جست‌وجو و مقایسه پروازها، مشاهده تقویم قیمت و بررسی گزینه‌های سفر در تاریخ‌های مختلف.',
      detail: 'برای برنامه‌ریزی سفر و بررسی تغییر قیمت بلیت‌ها.',
    },
    en: {
      title: 'Google Flights',
      category: 'Flight search',
      description: 'Search and compare flights, explore price calendars and review travel options across dates.',
      detail: 'For trip planning and tracking flight-price changes.',
    },
  },
  {
    id: 'bewelcome',
    category: 'stays',
    url: 'https://www.bewelcome.org/',
    model: 'Community + Donations',
    fa: {
      title: 'BeWelcome',
      category: 'اقامت و آشنایی با افراد محلی',
      description: 'شبکه غیرانتفاعی مهمان‌نوازی و تبادل فرهنگی که مسافران را با میزبان‌های محلی مرتبط می‌کند.',
      detail: 'اقامت مهمان‌نوازانه بدون هزینه اقامت؛ با پشتیبانی داوطلبان و کمک‌های مالی.',
    },
    en: {
      title: 'BeWelcome',
      category: 'Stays and local connections',
      description: 'A nonprofit hospitality-exchange network connecting travelers with local hosts.',
      detail: 'Free hospitality stays, supported by volunteers and donations.',
    },
  },
  {
    id: 'worldpackers',
    category: 'volunteering',
    url: 'https://www.worldpackers.com/',
    model: 'Membership + Travel Opportunities',
    fa: {
      title: 'Worldpackers',
      category: 'سفر داوطلبانه',
      description: 'پیدا کردن میزبان‌هایی که در ازای همکاری و انجام فعالیت‌های مشخص، اقامت و گاهی مزایای دیگری ارائه می‌کنند.',
      detail: 'معمولاً فرصت تبادل مهارت و کار داوطلبانه است، نه استخدام با حقوق؛ درخواست‌ها به عضویت نیاز دارند.',
    },
    en: {
      title: 'Worldpackers',
      category: 'Volunteer travel',
      description: 'Find hosts offering accommodation and sometimes other benefits in exchange for agreed activities.',
      detail: 'Usually a skills exchange, not paid employment; applying requires membership.',
    },
  },
  {
    id: 'couchsurfing',
    category: 'stays',
    url: 'https://www.couchsurfing.com/',
    model: 'Community + Subscription',
    fa: {
      title: 'Couchsurfing',
      category: 'اقامت و ارتباط اجتماعی',
      description: 'ارتباط با میزبان‌ها و مسافران در شهرهای مختلف برای اقامت مهمان‌نوازانه، ملاقات و تبادل فرهنگی.',
      detail: 'اقامت معمولاً رایگان است، اما دسترسی به قابلیت‌های پلتفرم به عضویت پولی نیاز دارد.',
    },
    en: {
      title: 'Couchsurfing',
      category: 'Stays and community',
      description: 'Connect with hosts and travelers worldwide for hospitality stays, meetups and cultural exchange.',
      detail: 'Stays are generally free; platform access requires a paid membership.',
    },
  },
])

export const SITE_FILTERS = Object.freeze(['all', 'flights', 'stays', 'volunteering'])

export function listTravelSites({ category = 'all', query = '', locale = 'fa' } = {}) {
  const selected = SITE_FILTERS.includes(category) ? category : 'all'
  const language = locale === 'fa' ? 'fa' : 'en'
  const term = String(query).trim().toLocaleLowerCase()
  return TRAVEL_SITES.filter((site) =>
    (selected === 'all' || site.category === selected)
    && (!term || [site[language].title, site[language].category, site[language].description, site.model]
      .some((value) => value.toLocaleLowerCase().includes(term))))
}
