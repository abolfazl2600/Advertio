# AI Execution Playbook — Advertio Android

## دستور شروع برای عامل برنامه‌نویس
> You are implementing GitHub Issue #NN from `abolfazl2600/Advertio` on a dedicated branch. Read `اندروید/AGENTS.md`, this playbook and the entire issue. Implement **actual code and tests** only in `اندروید/`, using a pinned **read-only** source from private GitLab if authorized. Never alter upstream or leak its private contents into public GitHub. Open a PR with evidence; do not report completed tests you did not run. If credentials, cloud control or release signing is missing, document BLOCKED with exact request and proceed only with independent safe subtasks.

## قالب تکمیل هر تسک
1. **Context**: مسئله، وضعیت کد فعلی، SHA فعلی GitHub و SHA GitLab، نسخه ابزار.
2. **Plan**: وابستگی‌ها، محل تغییرها، خطرات.
3. **Implement**: کار واقعی، فایل‌ها، تست‌ها و docs زیر `اندروید/`. از نوشتن دستورالعمل صرف به‌جای پیاده‌سازی اجتناب کن.
4. **Verify**: نتیجه هر دستور با PASS/FAIL/NOT RUN، علت و دستگاه/نسخه برای تست Android.
5. **Security check**: Source license, GitLab leak, Secrets, OAuth, API, Payments, Google Play.
6. **Pull request**: `android/<issue-number>-<slug>`، توضیح دقیق، لینک issue، نحوه اجرا، rollback. Merge فقط بعد از پذیرش.
7. **Complete**: Issue تنها وقتی بسته شود که همه AC با شواهد واقعی پاس شده باشند. نبود Test environment یا key = BLOCKED و نه PASS.

## متن پیشنهادی PR
```markdown
## Related Issue
Refs #NN / Closes #NN (only if ALL AC passed)
## Source provenance
GitHub base/head: ...
GitLab read-only SHA: ...
## Files changed (must start with اندروید/)
...
## Implementation
...
## Verification
- [ ] npm ci: PASS/FAIL/NOT RUN + log summary
- [ ] typecheck/lint/unit: PASS/FAIL/NOT RUN
- [ ] Gradle assembleDebug: PASS/FAIL/NOT RUN
- [ ] Emulator / physical device: PASS/FAIL/NOT RUN
- [ ] Android-specific acceptance criteria: ...
- [ ] scripts/guard-scope.sh: PASS/FAIL
## Security/privacy
...
## Blockers, follow-ups, rollback
...
```

## Commands / development environment
ابتدا `node`, `npm`, `java`, `git`, Android SDK و Gradle موجود را گزارش کن؛ نسخه‌های Toolchain را بعد از بررسی source pin کن، نه بر پایه حدس. دستورهای واقعی `npm ci`، `npx cap sync android`، `./gradlew assembleDebug` فقط پس از ایجاد skeleton و تعیین مسیر معتبر اجرا شوند. `npx cap init` یا `npx cap add android` در root repository ممنوع است؛ working directory اختصاصی `اندروید/mobile/` یا staging path مجاز است.

## آزمایش عدم خروج از scope
```bash
# From the repo root, with a known base commit:
bash 'اندروید/scripts/guard-scope.sh' origin/main
```
اسکریپت باید علاوه بر diff در PR، uncommitted/untracked را نیز کنترل کند.

## External blockers & approvals
- GitLab private repo read-only token: درخواست از مالک، never paste into Issues.
- Google Cloud OAuth Android: نیاز به package name و امضاهای Debug/Upload/Play app signing.
- Play Console: حساب و permission/Policy declarations (تصمیم و دسترسی مالک).
- Real release keystore: تولید/نگهداری در secret manager، نه PR/Issue.
- Server configs/API/CORS: اگر نیاز به تغییر خارج scope دارد، گزارش بده و به مالک ارجاع کن.
- GitHub Actions workflows outside `اندروید/`: راه‌حل runner خارجی/دستی؛ خارج scope بدون رضایت ممنوع.

## نگاشت شماره Issue
[فهرست معتبر و ترتیب اجرا](ISSUES.md). شماره‌های #39–#60 متناظر مراحل 01–22 هستند. #38 کنترل کلی پروژه است.
