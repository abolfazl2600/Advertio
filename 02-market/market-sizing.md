# Market Sizing

## Method

این فایل تمام محاسبات اندازه بازار موجود در Source Document را Consolidate می‌کند. اعداد، درصدها و فرمول‌ها بدون جایگزینی با داده بیرونی حفظ شده‌اند.

## 1. Canada Rental Housing

Status: Source-reported estimate

### Base Population

| Metric | Value |
|---|---:|
| Canada population | حدود 40.5M |
| Households | حدود 17.2M |
| Renter household share | حدود 33.5% |
| Estimated renter households | حدود 5.8M |

محاسبه ضمنی:

```text
17.2M × 33.5% ≈ 5.8M renter households
```

### Telegram-Reachable Renter Market

Source نرخ نفوذ Telegram در کانادا را حدود **7.5%** در نظر گرفته است.

```text
5.8M × 7.5% ≈ 435,000 renter households
```

نتیجه گزارش‌شده:

- حدود **435,000 خانوار مستأجر تلگرامی**
- معادل تقریبی **950,000 تا 1.05M نفر**

Source این بخش را بازار هدف اولیه Advertio توصیف می‌کند.

### Rental Supply Snapshot

Source برای Rentals.ca گزارش می‌کند:

| Metric | Value |
|---|---:|
| Total rental listings | 59,128 |
| Listings under $2,000 | 38,000 |
| Share under $2,000 | 64.3% |

برداشت ثبت‌شده در Source: تقریباً دو سوم بازار اجاره مشاهده‌شده در بخش Housing مقرون‌به‌صرفه قرار دارد.

## 2. User Acquisition Scenarios

Source همچنین از پایه **3,000,000 کاربر Telegram در کانادا** برای سناریوهای جذب استفاده می‌کند.

### Scenario Table

| Scenario | Advertio capture assumption | Estimated MAU | Listing creation assumption | Estimated active listings |
|---|---:|---:|---:|---:|
| بدبینانه | 5% | ~150,000 | 5% از کاربران | ~7,000–8,000 |
| واقع‌بینانه | 7.5% | ~225,000 | 5% از کاربران | ~11,000 |
| خوش‌بینانه | 10% | ~300,000 | 5% از کاربران | ~15,000 |

محاسبه سناریوی واقع‌بینانه:

```text
3,000,000 × 7.5% = 225,000 MAU
225,000 × 5% = 11,250 ≈ 11,000 active listings
```

سناریوهای بالا Forecast / Hypothesis هستند و نتیجه واقعی MVP محسوب نمی‌شوند.

## 3. Persian-speaking Telegram Segment in Canada

Status: Source-reported estimate

Source تعداد کاربران فارسی‌زبان Telegram در کانادا را حدود **400,000 نفر** تخمین می‌زند.

این جامعه به‌عنوان:

- نخستین Community هدف
- Wedge برای ورود به بازار
- مزیت رقابتی اولیه

مطرح شده است.

Source شواهد مستقلی برای اینکه چه درصدی از این 400,000 نفر در هر ماه نیاز فعال Housing یا Jobs دارند ارائه نمی‌کند.

## 4. General Jobs Canada

Status: Source-reported estimate

### General Jobs Share of Job Listings

#### Job Bank

```text
12,578 General / 63,119 Total = 19.9%
```

#### Kijiji

```text
11,321 General / 68,292 Total = 16.6%
```

Source میانگین سهم General Jobs را **حدود 18%** در نظر می‌گیرد.

### Job Seeker User Base

| Metric | Value |
|---|---:|
| Telegram users in Canada | ~3,000,000 |
| Job seeker ratio | 3.6% |
| Estimated job seekers | ~108,000 |

```text
3,000,000 × 3.6% = 108,000
```

### General Jobs Demand Capacity

```text
108,000 × 18% ≈ 19,400
```

نتیجه Source:

- ظرفیت تخمینی کاربران متقاضی General Jobs: **حدود 19,400 نفر**

## 5. Existing Community Signals

Status: Source-reported observed community size

Source در بخش Market Validation نمونه‌هایی از Communityهای موجود را ثبت کرده است:

| حوزه | Community | Members |
|---|---|---:|
| اجاره خانه تورنتو | RentToronto | 34,000 |
| اجاره خانه تورنتو | Toronto_Rental | 21,000 |
| ارسال بار ایران کانادا | BarVaMosaferi | 7,000 |
| ارسال بار ایران آلمان | hilfenChat | 12,000 |

این اعداد نشانه رفتار موجود کاربران در Communityها هستند و به‌تنهایی معادل MAU، مشتری پرداخت‌کننده یا Market Size نهایی Advertio نیستند.

برای شواهد واقعی MVP، See [Market Validation](./market-validation.md).

## 6. What Is Not Sized in the Source

Source برای موارد زیر Market Size عددی کامل ارائه نمی‌کند:

- Services
- Social & Events
- Human Matching
- Passenger Cargo در سطح کل بازار
- Germany
- Italy
- WhatsApp-based market
- Premium Business Accounts
- Business Landing Pages

بنابراین برای این حوزه‌ها عدد جدیدی در این Knowledge Base ساخته نشده است.
