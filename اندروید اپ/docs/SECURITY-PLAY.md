# امنیت و Google Play Compliance

## محافظت از داده‌ها و هویت
- Google Sign-In باید **Native Credential Manager** باشد؛ WebView OAuth ممنوع.
- Backend باید issuer/audience/expiration/signature Google ID Token را validate کند، و account linking باید بدون ساخت حساب تکراری باشد.
- JWT با Android Keystore-backed secure storage محافظت شود؛ عدم ذخیره credential حساس در plaintext localStorage، log، URL یا deep link.
- خروج از حساب، expiry، revocation و logout از همه صفحات تست شود. محدودسازی شبکه به HTTPS production با policy مناسب.
- فقط permissionهای لازم در Manifest باشند؛ Camera/Photos permission برای انتخاب رسانه فقط در صورت لزوم؛ دستگاه Android نسخه‌های جدید با photo picker ترجیح داده شود.
- منابع third party SDK بررسی و SBOM/لیست وابستگی‌ها، نسخه‌های pin شده و vulnerability audit ثبت شوند.

## پرداخت و کیف پول
- UI Android نباید هیچ Pay/Top up/Buy Coins و دکمه/آدرس Stripe، Telegram Stars، لینک مرورگر برای شارژ دیجیتال یا deeplink خرید داشته باشد.
- متن مجاز در محصول: «خرید سکه به‌زودی فعال می‌شود»؛ بدون دعوت به خرید در کانال دیگر.
- نمایش موجودی و مصرف سکه قبلی باید با [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/10281818) برای *consumption-only* و نوع خدمات Advertio بررسی شود. در صورت ابهام یا عدم انطباق، مصرف سکه نیز تا رفع blocker غیرفعال شود؛ **صرف پنهان‌کردن دکمه خرید تضمین انطباق نیست**.

## حریم خصوصی، ایمنی و کاربران
- privacy policy عمومی و داخل اپ، منعکس‌کننده Login، داده تماس، مکان (اگر جمع‌آوری می‌شود)، عکس، SDK و Analytics باشد.
- Data Safety Form بر اساس داده‌برداری واقعی تکمیل شود؛ هیچ چیز را «عدم جمع‌آوری» گزارش نکنید مگر اثبات شود.
- **Account deletion**: داخل و خارج اپ باید مسیر درخواست حذف و فرآیند اجرای آن طبق قواعد Google Play وجود داشته باشد؛ فریز کردن حساب کافی نیست.
- چون Advertio آگهی کاربرمحور دارد، UGC moderation، گزارش آگهی/کاربر، block abusive user، قوانین استفاده و روش پاسخ به گزارشات بررسی و در صورت نیاز فعال شود.
- اپ باید فراتر از shell خالی یا WebView صرف باشد، با کیفیت، ناوبری مناسب و بدون مسیر خراب در حالت آفلاین/شبکه ضعیف.

## Gate انتشار
تا زمانی که سیاست Payment، Privacy/Data safety، UGC/Report/Block، Account deletion و test release sign-off تکمیل نشده، ارسال به Production Store مسدود است.

منابع:
- https://support.google.com/googleplay/android-developer/answer/18258653
- https://support.google.com/googleplay/android-developer/answer/10281818
- https://developers.google.com/identity/siwg/best-practices
