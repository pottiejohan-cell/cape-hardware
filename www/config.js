/* Cape Hardware settings for the Android app.
   TESTING (now): leave testAds and debug as true. Google's test ads show and the
   "Tester: pretend I bought it" switch stays in Settings.
   RELEASE: set testAds and debug to false and paste your real AdMob ad unit IDs. */
window.CH_CONFIG = {
  testAds: true,
  debug: true,
  productId: 'full_version',
  interstitialId: 'ca-app-pub-7785194950093620/3370353967',   // AdMob unit "End of run"
  rewardedId: 'ca-app-pub-7785194950093620/2327725874',       // AdMob unit "Repair and tip-off reward"
  appId: 'com.capehardware.game',

  // Player feedback. Fill in ONE of these:
  // 1) A Google Form (best: every message lands in a Google Sheet). Paste the form's
  //    formResponse address and the entry IDs of its five questions.
  feedbackForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdyQEyXh779MeLpOoQiyUdYuexltnSUS-haBLz--b5v8uGWRg/formResponse',
    fields: { type: 'entry.571928451', rating: 'entry.685400119', message: 'entry.695785256', name: 'entry.1793552648', context: 'entry.963264864' }
  },
  // Responses land in the Google Sheet "Cape Hardware feedback (responses)" in your Drive.
  // 2) Or an email address instead (leave empty while the form is used).
  feedbackEmail: ''
};
