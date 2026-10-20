# قابلیت‌های فعلی قابل‌اثبات از مخزن FlightIranBot24

**Bot:** [@Flightiranbot](https://t.me/Flightiranbot) — «خدمات پرواز و ویزا - ادورتیو»  
**Source:** [abolfazl260/flightiranbot24](https://github.com/abolfazl260/flightiranbot24)  
**بررسی‌شده در:** revision [`909abfbaa7940a9e57a73d429eb3d1c1f4eddff4`](https://github.com/abolfazl260/flightiranbot24/commit/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4) (2026-10-13).  
**تاریخ برداشت پروفایل تلگرام:** 2026-10-20.

## تعریف سطح اطمینان

- **Implemented in source**: مسیر اجرا/Handler/Service مربوطه در کد موجود است؛ لزوماً به معنی فعال بودن روی سرور production نیست.
- **Conditional**: نیازمند تنظیمات، دیتای خارجی، همگام‌سازی، توکن یا دسترسی پشتیبانی است.
- **Placeholder / not a complete service**: دکمه یا کلاس/اسکلت وجود دارد، اما سرویس مورد ادعا هنوز برای کاربر آماده نیست.
- **Not verified live**: تست تعاملی با ربات تلگرام یا لاگ‌های سرور انجام نشده است.

## قابلیت‌های کاربردی موجود در کد

| قابلیت | شواهد و شرح دقیق | وضعیت |
| --- | --- | --- |
| شروع و منوی اصلی | فرمان‌های `/start` و `/help`؛ دسته‌بندی خدمات سفر؛ ثبت/شناسایی کاربر بر اساس Telegram ID و ثبت رخدادها | Implemented in source |
| چندزبانه بودن UI ربات | انتخاب زبان‌های فارسی، انگلیسی و عربی، ذخیره زبان کاربر؛ **Mini App فارسی/RTL است** | Implemented in source |
| مشاهده قیمت بلیت هواپیما | فهرست مبدأ و مقاصد، نرخ‌های دریافتی از ارائه‌دهنده `mz724.ir`، جدول نرخ‌ها، نمایش اختلاف/افت قیمت با داده‌های ثبت‌شده | Conditional: دسترسی به provider و تازه بودن snapshot |
| درخواست رزرو بلیت | گزینه `رزرو بلیط` درخواست/اطلاعات مسیر را **به جریان ارتباط با پشتیبانی** می‌برد؛ سامانه رزرو و پرداخت مستقیم در این مسیر اثبات نشده | Implemented support handoff; **NOT direct booking** |
| هشدار قیمت بلیت | ثبت زنگوله بر اساس سقف قیمت به تومان یا درصد افت از میانگین ثبت‌شده؛ مکانیسم notification در گذر از آستانه؛ مشاهده، توقف، فعال‌سازی مجدد و حذف | Conditional: سرویس قیمت، نمونه‌های معتبر و پیام‌رسانی |
| هشدار درصد تخفیف | انتخاب درصدهای ۵ تا ۵۰٪ در رابط؛ مقایسه با میانگین ۲۱ روزه و دست‌کم ۲ نمونه معتبر برای اجرای آستانه | Conditional |
| اطلاعات ویزا و ورود | `/visa`، انتخاب گذرنامه و مقصد، دسته‌بندی نوع ورود، وضعیت نیازمندی ویزا، مدت اقامت، مدارک، شرایط و ارجاع به منبع؛ گذرنامه ایران پیش‌فرض است و قابل‌تغییر | Conditional: دریافت و همگام‌سازی داده |
| فهرست کشورها براساس گذرنامه | `/visa_list`، جست‌وجوی نام/کد کشور، اطلاعات مستند از داده منبع | Conditional |
| هشدار تغییرات ویزا | `/visa_watch`، حداکثر ۲۰ اشتراک فعال برای جفت گذرنامه/مقصد، توقف/فعال‌سازی مجدد/حذف؛ هشدار درباره **تغییر معنایی داده‌های منتشرشده**، نه صرف تغییر تاریخ ویرایش | Conditional: sync، background jobs، delivery |
| محتوای کاربردی سفر | شش دسته: مدارک، پروازها، بار و چمدان، منابع بین‌المللی، پرداخت‌ها/بیمه، نکات سفر؛ شامل لینک‌های منتخب و منوهای بازگشت | Implemented curated links; پیوندها نیاز به بازبینی دوره‌ای دارند |
| Telegram Mini App | رابط فارسی RTL با مشاهده قیمت، راهنمای ویزا، مدیریت هشدارهای قیمت/ویزا، محتوای سفر؛ احراز هویت با signed Telegram `initData` و معماری Cloudflare Worker/D1 + bridge + SQLite | Implemented in source; استقرار live اثبات نشده |
| چک‌لیست سفر در Mini App | چک‌لیست ۱۲ مرحله‌ای همراه پیشرفت، ذخیره محلی وابسته به دستگاه/حساب و امکان پاک‌کردن؛ با چک‌لیست Android همگام‌سازی نمی‌شود | Implemented in Mini App source |
| پشتیبانی | منوی هدایت به حساب پشتیبانی تنظیم‌شده؛ آیدی پیش‌فرض/نمایشی بسته به config | Implemented; ساعات/کیفیت پاسخ نامشخص |
| لینک بازار حمل بار | دکمه Cargo به `https://t.me/advertio_cargo` هدایت می‌کند؛ **در منوی ربات ثبت سفارش یا matching کامل داخل همان سرویس انجام نمی‌شود** | Implemented external link |
| گزارش مدیریتی ربات | گزینه محدودشده به ادمین و گزارش وضعیت/آمار در صورت اتصال به دیتابیس؛ اعلان کاربر جدید و رخدادها | Conditional, admin-only |

## وضعیت سرویس‌های ناقص یا نادرست برای تبلیغ به‌عنوان «فعال»

- **اطلاعات فرودگاه‌ها:** دکمه در منو هست، اما Handler فعلی پیام `به‌زودی در دسترس قرار می‌گیرد` می‌دهد. وجود کاتالوگ/Service یا قابلیت جداگانه Android به معنای فعال بودن این بخش در ربات تلگرام نیست.
- **قوانین مسافر:** Handler اصلی فقط پیامی درباره نیاز به منبع رسمی می‌دهد؛ نباید آن را راهنمای کامل و زنده قوانین پرواز توصیف کرد.
- **چت آزاد با هوش مصنوعی:** پیام‌های متنی آزاد خارج از حالت‌های تعریف‌شده هشدار/جست‌وجو با پیام راهنما پاسخ داده می‌شوند. وجود کلاس AssistantService به‌تنهایی دستیار آزاد عملیاتی را اثبات نمی‌کند.
- **رزرو، خرید و صدور خودکار بلیت/ویزا:** از کد بررسی‌شده چنین مسیر یکپارچه و تأییدشده‌ای مشخص نیست؛ گزینه بلیت به پشتیبانی ارجاع می‌دهد.
- **بازار مستقل Cargo در همین ربات:** در منو فقط لینک کانال Cargo است، نه انتشار و معامله داخلی تأییدشده.

## مسیرها و دستورهای قابل استناد

- عمومی: `/start`، `/help`، `/language`، `/alerts`، `/visa`، `/visa_list`، `/visa_watch`، `/cancel`.
- مدیریتی: `/visa_sync` (دسترسی ادمین)؛ گزارش مدیریتی از منوی اختصاصی ادمین.
- Telegram Mini App URL مندرج در **مستندات مخزن**: `https://flightiran-public-api.abolfazl260.workers.dev/mini/`؛ رسیدن به این URL در production از این بررسی تأیید نشده است.
- منبع ویزا که مخزن اعلام می‌کند: `https://travelrequirements.info/data/index.json`، با انتساب به CC BY 4.0. خروجی راهنمای اولیه است، **نه تصمیم قطعی حقوقی/مهاجرتی**.

## ارجاعات مستقیم به نسخه بررسی‌شده

- [Telegram main menu and external Cargo link](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/interfaces/telegram/keyboards.py)
- [Telegram handlers, operational and placeholder routes](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/interfaces/telegram/handlers.py)
- [Commands and background scheduler](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/main.py)
- [Ticket provider](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/modules/tickets/mz724.py)
- [Ticket alert thresholds and state](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/modules/tickets/alerts.py)
- [Telegram alert UI](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/interfaces/telegram/price_alerts.py)
- [Visa guide and source limitations](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/docs/visa.md)
- [Visa watch service](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/modules/visa/watch.py)
- [Travel content catalog and six categories](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/docs/USEFUL_CONTENT.md)
- [Telegram Mini App architecture and deployment requirements](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/docs/TELEGRAM_MINI_APP.md)
- [Mini App interface including 12-step checklist](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/webapp/static/index.html)
- [Localized menu and upcoming-airport message](https://github.com/abolfazl260/flightiranbot24/blob/909abfbaa7940a9e57a73d429eb3d1c1f4eddff4/src/flightiran/interfaces/telegram/localization.py)

## وضعیت عملیاتی که هنوز باید به‌طور مستقل تأیید شود

Server/version running, production configuration flags, external API uptime, data freshness, Mini App availability, successful alert delivery, واقعی بودن رزروها، میزان خطا، کاربران یکتا و DAU/MAU سرور. عدد **۲ monthly users** فقط از پروفایل تلگرام در ۲۰ اکتبر ۲۰۲۶ نقل شده است و برای ارزیابی فعالیت واقعی کافی نیست.
