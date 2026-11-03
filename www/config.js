/* Cape Hardware settings for the Android app.
   TESTING (now): leave testAds and debug as true. Google's test ads show and the
   "Tester: pretend I bought it" switch stays in Settings.
   RELEASE: set testAds and debug to false and paste your real AdMob ad unit IDs. */
window.CH_CONFIG = {
  testAds: true,
  debug: true,
  productId: 'full_version',
  interstitialId: '',   // e.g. ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN
  rewardedId: '',       // e.g. ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN
  appId: 'com.capehardware.game',

  // Player feedback. Fill in ONE of these:
  // 1) A Google Form (best: every message lands in a Google Sheet). Paste the form's
  //    formResponse address and the entry IDs of its five questions.
  feedbackForm: null,
  // feedbackForm: {
  //   url: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
  //   fields: { type: 'entry.111', rating: 'entry.222', message: 'entry.333', name: 'entry.444', context: 'entry.555' }
  // },
  // 2) Or an email address. The player's email app opens with the message filled in.
  feedbackEmail: ''
};
