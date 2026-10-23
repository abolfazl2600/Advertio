const en = {
  lang: 'en', dir: 'ltr' as const, welcome: 'Welcome to Advertio', intro: 'Find your next opportunity.',
  detail: 'Explore active housing, passenger cargo and job listings. No sign-in needed to look around.',
  signIn: 'Sign in', browse: 'Browse listings for now', later: 'You can sign in later from Profile.', back: 'Back',
  home: 'Home', search: 'Search', post: 'Post', profile: 'Profile', navigation: 'Main navigation',
  housing: 'Housing', cargo: 'Passenger cargo', jobs: 'Jobs', future: 'In a future update',
  walletTitle: 'Your wallet is on the way', walletDetail: 'Wallet and coin features will be added in a future version. For now, discover active listings.',
  explore: 'Explore listings', loginReason: 'Browsing is open to everyone. Sign in whenever you are ready to use your account.',
}
const fa = {
  lang: 'fa', dir: 'rtl' as const, welcome: 'به ادورتیو خوش آمدید', intro: 'فرصت بعدی شما اینجاست.',
  detail: 'آگهی‌های فعال مسکن، حمل بار مسافری و کار را ببینید. برای گشتن در آگهی‌ها نیازی به ورود نیست.',
  signIn: 'ورود به حساب', browse: 'فعلاً مشاهدهٔ آگهی‌ها', later: 'بعداً هم می‌توانید از پروفایل وارد حساب شوید.', back: 'بازگشت',
  home: 'خانه', search: 'جستجو', post: 'ثبت آگهی', profile: 'پروفایل', navigation: 'منوی اصلی',
  housing: 'مسکن', cargo: 'بار مسافری', jobs: 'کار', future: 'در نسخه‌های بعدی',
  walletTitle: 'کیف پول در راه است', walletDetail: 'امکانات کیف پول و سکه‌ها در نسخه‌های بعدی اضافه می‌شوند. فعلاً آگهی‌های فعال را کشف کنید.',
  explore: 'مشاهدهٔ آگهی‌ها', loginReason: 'مشاهدهٔ آگهی‌ها برای همه آزاد است. هر زمان خواستید از امکانات حساب استفاده کنید، وارد شوید.',
}
export function entryCopy() { return document.documentElement.lang.toLowerCase().startsWith('fa') ? fa : en }
