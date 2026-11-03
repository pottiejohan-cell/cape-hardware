/* Cape Hardware: native bridge for the Android app (Capacitor).
   Only runs inside the installed app. In a normal browser it does nothing,
   and the game falls back to its built-in test ads and test purchase. */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;

  var CFG = window.CH_CONFIG || {};
  var TEST = CFG.testAds !== false;
  var PRODUCT = CFG.productId || 'full_version';
  // Google's official test ad units. Real IDs come from config.js when testAds is false.
  var IDS = {
    inter: TEST ? 'ca-app-pub-3940256099942544/1033173712' : CFG.interstitialId,
    reward: TEST ? 'ca-app-pub-3940256099942544/5224354917' : CFG.rewardedId
  };
  var AdMob = C.Plugins && C.Plugins.AdMob;
  var store = null;
  var onFull = function () {};

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function deviceReady() {
    return new Promise(function (r) {
      if (window.CdvPurchase) return r();
      document.addEventListener('deviceready', function () { r(); }, { once: true });
      setTimeout(r, 5000);
    });
  }
  function once(eventNames, timeout) {
    return new Promise(function (resolve) {
      var handles = [], done = false;
      function fin(name) {
        if (done) return; done = true;
        handles.forEach(function (h) { Promise.resolve(h).then(function (x) { x && x.remove && x.remove(); }); });
        resolve(name);
      }
      eventNames.forEach(function (n) { handles.push(AdMob.addListener(n, function () { fin(n); })); });
      setTimeout(function () { fin('timeout'); }, timeout || 90000);
    });
  }
  function owned() { try { return !!(store && store.owned(PRODUCT)); } catch (e) { return false; } }
  function check() { if (owned()) onFull(true); }

  async function init(opts) {
    onFull = (opts && opts.onFull) || onFull;
    if (AdMob) {
      try { await AdMob.initialize({ initializeForTesting: TEST }); } catch (e) {}
      try {
        var info = await AdMob.requestConsentInfo();
        if (info && info.isConsentFormAvailable && info.status === 'REQUIRED') await AdMob.showConsentForm();
      } catch (e) {}
    }
    await deviceReady();
    if (window.CdvPurchase) {
      var P = window.CdvPurchase;
      store = P.store;
      store.register([{ id: PRODUCT, type: P.ProductType.NON_CONSUMABLE, platform: P.Platform.GOOGLE_PLAY }]);
      store.when()
        .approved(function (t) { t.verify(); })
        .verified(function (r) { r.finish(); })
        .finished(function () { check(); })
        .productUpdated(function () { check(); })
        .receiptUpdated(function () { check(); });
      try { await store.initialize([P.Platform.GOOGLE_PLAY]); } catch (e) {}
      check();
    }
  }

  function price() {
    try { var p = store && store.get(PRODUCT); return p && p.pricing && p.pricing.price; } catch (e) { return null; }
  }

  async function buy() {
    if (!store) return false;
    if (owned()) return true;
    var p = store.get(PRODUCT);
    var offer = p && p.getOffer();
    if (!offer) return false;
    var err = await offer.order();
    if (err) return owned();
    for (var i = 0; i < 60 && !owned(); i++) await wait(500);
    return owned();
  }

  async function restore() {
    if (!store) return false;
    try { await store.restorePurchases(); } catch (e) {}
    await wait(1500);
    return owned();
  }

  async function showInterstitial() {
    if (!AdMob || !IDS.inter) return;
    try {
      await AdMob.prepareInterstitial({ adId: IDS.inter, isTesting: TEST });
      var closed = once(['interstitialAdDismissed', 'interstitialAdFailedToShow'], 60000);
      await AdMob.showInterstitial();
      await closed;
    } catch (e) {}
  }

  async function showRewarded() {
    if (!AdMob || !IDS.reward) return false;
    var rewarded = false;
    try {
      await AdMob.prepareRewardVideoAd({ adId: IDS.reward, isTesting: TEST });
      var h = AdMob.addListener('onRewardedVideoAdReward', function () { rewarded = true; });
      var closed = once(['onRewardedVideoAdDismissed', 'onRewardedVideoAdFailedToShow'], 120000);
      await AdMob.showRewardVideoAd();
      await closed;
      Promise.resolve(h).then(function (x) { x && x.remove && x.remove(); });
    } catch (e) {}
    return rewarded;
  }

  // Android back button: close sheets or go back to the home screen instead of quitting.
  var App = C.Plugins && C.Plugins.App;
  if (App) App.addListener('backButton', function () {
    if (!(window.CHBack && window.CHBack())) App.minimizeApp();
  });

  window.CHNative = {
    isNative: true,
    debug: !!CFG.debug,
    init: init,
    price: price,
    buy: buy,
    restore: restore,
    showInterstitial: showInterstitial,
    showRewarded: showRewarded
  };
})();
