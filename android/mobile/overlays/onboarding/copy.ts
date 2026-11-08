const en = {
  lang: 'en', dir: 'ltr' as const, welcome: 'Welcome to Advertio', intro: 'Find your next opportunity.',
  detail: 'Explore active housing, passenger cargo and job listings. No sign-in needed to look around.',
  slides: [
    { title: 'Make every trip rewarding!', detail: 'Turn spare luggage space into extra income. Connect with senders heading your way.' },
    { title: 'Find a travel buddy for your parcel!', detail: 'Find travelers headed to your destination and arrange delivery of parcels and documents worldwide.' },
    { title: 'Trust begins with knowing who you meet', detail: 'Connect with more confidence through Telegram account verification and clearer communication.' },
  ],
  next: 'Next', slideProgress: 'Onboarding progress',
  signIn: 'Sign in to Advertio', browse: 'Browse without signing in', later: 'You can sign in later from Profile.', back: 'Back',
  home: 'Home', search: 'Search', post: 'Post', profile: 'Profile', navigation: 'Main navigation',
  housing: 'Housing', cargo: 'Passenger cargo', jobs: 'Jobs', future: 'In a future update',
  walletTitle: 'Your wallet is on the way', walletDetail: 'Wallet and coin features will be added in a future version. For now, discover active listings.',
  explore: 'Explore listings', loginReason: 'Sign in with your existing Advertio account. You can also browse listings as a guest.',
}
const fa = {
  lang: 'fa', dir: 'rtl' as const, welcome: 'به ادورتیو خوش آمدید', intro: 'فرصت بعدی شما اینجاست.',
  detail: 'آگهی‌های فعال مسکن، حمل بار مسافری و کار را ببینید. برای گشتن در آگهی‌ها نیازی به ورود نیست.',
  slides: [
    { title: 'هر سفر، یک فرصت درآمد!', detail: 'فضای خالی چمدونت رو به درآمد تبدیل کن! با فرستنده‌های هم‌مسیر ارتباط بگیر و از سفرهات درآمد داشته باش.' },
    { title: 'برای بسته‌ات، هم‌سفر پیدا کن!', detail: 'از هر جای دنیا به هر مقصدی، مسافر مناسب رو پیدا کن و برای ارسال سریع‌تر و راحت‌تر بسته یا مدارکت هماهنگ شو.' },
    { title: 'اعتماد از شناخت شروع می‌شه!', detail: 'با تأیید حساب از طریق تلگرام، با شناخت بیشتری با مسافرها و فرستنده‌ها ارتباط بگیر و برای ارسال هماهنگ کن.' },
  ],
  next: 'بعدی', slideProgress: 'مراحل معرفی اپ',
  signIn: 'ورود به ادورتیو', browse: 'مشاهده آگهی‌ها بدون ورود', later: 'بعداً هم می‌توانید از پروفایل وارد حساب شوید.', back: 'بازگشت',
  home: 'خانه', search: 'جستجو', post: 'ثبت آگهی', profile: 'پروفایل', navigation: 'منوی اصلی',
  housing: 'مسکن', cargo: 'بار مسافری', jobs: 'کار', future: 'در نسخه‌های بعدی',
  walletTitle: 'کیف پول در راه است', walletDetail: 'امکانات کیف پول و سکه‌ها در نسخه‌های بعدی اضافه می‌شوند. فعلاً آگهی‌های فعال را کشف کنید.',
  explore: 'مشاهدهٔ آگهی‌ها', loginReason: 'با حساب فعلی ادورتیو وارد شوید؛ مشاهده آگهی‌ها بدون ورود هم امکان‌پذیر است.',
}
export function entryCopy() { return document.documentElement.lang.toLowerCase().startsWith('fa') ? fa : en }
