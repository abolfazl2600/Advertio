# Registration

## Entry Point — Start Bot

User روی **Start** کلیک می‌کند.

سیستم بررسی می‌کند:
- آیا User قبلاً ثبت‌نام کرده است؟
- آیا Mobile Number وریفای شده است؟

اگر User جدید باشد، Registration & Verification flow اجرا می‌شود.

## Phone Registration / Verification

Source دو روش را در Workflow ثبت می‌کند:
- Share کردن Mobile Number از طریق Telegram button
- Mobile OTP

همچنین در بخش User Entity، Phone Verified برای Version فعلی به‌صورت ارسال Message توسط Telegram توصیف شده است.

Source ترتیب دقیق بین Telegram message، Share Contact و OTP را به‌عنوان یک Flow واحد مشخص نمی‌کند؛ بنابراین هر سه توصیف حفظ می‌شوند.

## Country Eligibility

پس از دریافت Mobile Number:
- اگر شماره مربوط به **Iran** یا **Canada** باشد، مورد تأیید است.
- سایر Countryها در این مرحله تأیید نمی‌شوند.
- User دارای شماره سایر Countryها باید در **Waitlist** قرار گیرد.
- Admin باید آن User را تأیید کند.
- User باید Message مناسب دریافت کند.

## Registration Output

پس از Registration:
- Account ایجاد می‌شود.
- Province / State و City پیش‌فرض انتخاب می‌شود.
- آموزش و FAQ به User ارائه می‌شود.
- عضویت در Channel و Group مربوطه اجباری ذکر شده است.
- User به دلیل Phone Verification یک Gift Coin دریافت می‌کند.

Source مقدار Gift Coin مربوط به Phone Verification را در این Flow تعیین نمی‌کند.

## Base User Data Relevant to Registration

User Entity شامل:
- First name
- Last name
- Profile photo
- Verified mobile number
- Country flag based on phone number
- Join date
- Country
- Province / State
- City
- Area — optional

## Verification Requirement

ثبت‌نام و Phone Verification پیش از Post Listing اجباری است.

Listing Lifecycle نیز از این نقطه آغاز می‌شود:

    Registration + mandatory phone verification → Post Listing

## After Registration

Main Menu:
- View Listings
- Post Listing
- My Profile
- My Listings

See [Main Menu](./main-menu.md).

## Current vs Future

### Current / Initial
- Phone Verification
- Admin approval برای Waitlist خارج از Iran/Canada
- بخشی از Verificationها به‌صورت Manual operation

### Future
Verification layerهای بیشتر در Versionهای بعدی اضافه می‌شوند. جزئیات و Conflictهای Source در [Verification](./verification.md).
