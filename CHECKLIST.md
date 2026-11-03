# Cape Hardware: road to the Play Store

Tick these off in order. Steps marked **(Claude)** are ones Claude can do for you.

## 1. Test the free and full versions (now, no cost)

- [ ] Play the Cape Hardware page in Claude. It starts as the free version.
- [ ] Try the 60-day button (it opens the unlock screen), the test ad at the end of a run, the "Watch ad: free repair" breakdown option and the "Watch ad for a tip-off" card in Maps.
- [ ] In Settings, use **Tester: pretend I bought it** to switch between free and full.
- [ ] Decide on the price. R49 is in the game now; it can be changed later.

## 2. Put the project on GitHub (free)

- [ ] Create an empty repository called `cape-hardware` on GitHub (public is simplest, because GitHub Pages is free for public repos).
- [ ] Upload this project to it, or give Claude access to push it **(Claude)**.
- [ ] On GitHub, open **Settings > Pages** and set Source to **GitHub Actions**.
- [ ] Open the **Actions** tab. Two builds start by themselves:
  - **Build Android app** makes `cape-hardware-test-apk`.
  - **Publish web version and privacy policy** puts the game online at `https://<your-username>.github.io/cape-hardware/`.
- [ ] If a build fails, send Claude the error from the Actions log **(Claude)**.

## 3. Install the test app on your phone

- [ ] On the finished **Build Android app** run, download `cape-hardware-test-apk` (a zip with `app-debug.apk` inside).
- [ ] Copy the APK to your Android phone, open it and allow "install unknown apps" when asked.
- [ ] Check that Google test ads show (they say "Test Ad"), the Android back button behaves, and the game fits the screen.
- [ ] The real purchase button only works once the app is installed from Google Play (step 7). Use the tester switch until then.

## 4. Fill in the blanks

- [ ] `www/privacy.html`: replace `[PUBLISHER NAME]`, `[CONTACT EMAIL]` and `[PUBLISHER ADDRESS]`. Google requires a working contact email.
- [ ] `capacitor.config.json`: confirm the app ID `com.capehardware.game`. **It can never change after the first upload to Play**, so change it now if you want something else (for example, under Multi Entity Group).

## 4b. Where player feedback goes

The Feedback app in the game needs somewhere to send messages. Pick one and tell Claude, who will fill it in `www/config.js` **(Claude)**:

- [ ] **Google Form (recommended):** a free form with five questions (Type, Rating, Message, Name, Details). Every message lands as a row in a Google Sheet you can sort and filter. Claude can make the form with you.
- [ ] **Or an email address:** the player's email app opens with the message filled in. Use an address you don't mind being public, such as a new Gmail just for the game.

Until one is set, feedback in test builds is only saved on the phone.

## 5. Google Play developer account (US$25 once-off)

- [ ] Sign up at play.google.com/console and verify your identity.
- [ ] Personal account: you need a closed test with at least 12 testers for 14 days in a row before you can publish (step 7).
- [ ] Organisation account (for example Multi Entity Group): needs a free D-U-N-S number, but skips the 12-tester rule.
- [ ] Set up a **payments profile** (Monetise section) so you can sell the full version. Google keeps 15%.

## 6. AdMob account (free)

- [ ] Sign up at admob.google.com with the same Google account.
- [ ] Add an app: Android, "Cape Hardware". Copy the **App ID** (`ca-app-pub-...~...`).
- [ ] Create two ad units: one **Interstitial**, one **Rewarded**. Copy both ad unit IDs (`ca-app-pub-.../...`).
- [ ] On GitHub: **Settings > Secrets and variables > Actions > New repository secret**, name `ADMOB_APP_ID`, value = the App ID.
- [ ] In `www/config.js`: paste the two ad unit IDs and set `testAds: false` and `debug: false` **(Claude)**. Only do this for the release build; keep test ads while testing, because clicking your own real ads can get your AdMob account banned.

## 7. Signing key and first upload

- [ ] Create an upload key and add the four signing secrets to GitHub: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` **(Claude can generate the key and tell you exactly what to paste)**. Keep a backup of the key file and passwords somewhere safe.
- [ ] Run **Build Android app** again. It now also makes `cape-hardware-release-aab`.
- [ ] In Play Console: **Create app** (Game, Free, accept declarations).
- [ ] Fill in the store listing from `store/listing.md`, and run the **Make Play Store screenshots** workflow for the graphics.
- [ ] App content: privacy policy URL (`https://<your-username>.github.io/cape-hardware/privacy.html`), ads = yes, content rating, target audience 16+, data safety form (answers in `store/listing.md`).
- [ ] Create the in-app product `full_version` at R49 and activate it.
- [ ] Upload the `.aab` to **Internal testing**, add yourself as a tester, and also add your Gmail under **Settings > License testing** so you can test the purchase without being charged.
- [ ] Install from the internal testing link and test the real unlock and restore.

## 8. Closed test and launch

- [ ] Personal account only: create a **Closed testing** track, invite at least 12 testers (friends, family, crew) and keep them opted in for 14 days.
- [ ] Apply for production access, then roll out to **Production**.
- [ ] Every later update: change the game, push to GitHub, upload the new `.aab`. The version number goes up automatically.
