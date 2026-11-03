# Cape Hardware

A phone-style trading game: fresh out of Pollsmoor, an ex drug lord builds a legal building-materials business across the Cape without breaking parole.

- Free version: 30-day hustle with a few ads.
- Full version (R49 once-off in-app purchase `full_version`): 60-day empire mode, no ads, roadside cover and free tip-offs.

The road to the Play Store is in [CHECKLIST.md](CHECKLIST.md). Store texts and form answers are in [store/listing.md](store/listing.md).

## How the project fits together

| Path | What it is |
|---|---|
| `src/game.html` | The whole game in one file. This is the file to edit. |
| `scripts/build.mjs` | Turns the game into `www/index.html` with the app manifest, offline support and the native bridge. |
| `scripts/fetch-fonts.mjs` | Downloads the fonts into `www/fonts` so the app works offline. |
| `www/` | The finished web app: game page, `config.js` (ad and test settings), `native.js` (AdMob ads and Google Play purchase inside the Android app), icons, privacy policy. |
| `capacitor.config.json`, `package.json` | Capacitor settings that wrap `www/` as an Android app. |
| `assets/` | Icon artwork and the images used to make Android icons and the splash screen. |
| `.github/workflows/android.yml` | Builds the test APK, and the signed Play Store bundle once signing secrets exist. |
| `.github/workflows/pages.yml` | Publishes the web version and privacy policy on GitHub Pages. |
| `.github/workflows/store-assets.yml` | Makes the Play Store screenshots and feature graphic. |

## Building on your own computer (optional)

GitHub does all of this for you. To do it locally you need Node 22, Java 21 and Android Studio:

```
npm install
npm run fonts
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

The AdMob App ID must be added to `android/app/src/main/AndroidManifest.xml` as in the GitHub workflow.
