/* Cape Hardware settings for the Android app.
   TESTING (now): leave testAds and debug as true. Google's test ads show and the
   "Tester: pretend I bought it" switch stays in Settings.
   RELEASE: set testAds and debug to false and paste your real AdMob ad unit IDs. */
window.CH_CONFIG = {
  testAds: true,
  debug: true,
  productId: 'full_version',
  interstitialId: '',   // e.g. ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN
  rewardedId: ''        // e.g. ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN
};
