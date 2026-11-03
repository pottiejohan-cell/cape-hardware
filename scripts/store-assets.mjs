// Makes Play Store screenshots (1080x1920) and the feature graphic (1024x500) into store/out.
// Needs playwright. Run after scripts/build.mjs.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { icon } from '../assets/icon-art.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'store/out');
fs.mkdirSync(out, { recursive: true });
const page = 'file://' + path.join(root, 'www/index.html');

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3, reducedMotion: 'reduce' });
const p = await ctx.newPage();
await p.goto(page);
await p.evaluate(() => { localStorage.clear(); localStorage.setItem('capehw-sound', 'off'); localStorage.setItem('capehw-full', 'yes'); });
await p.reload();
await p.waitForTimeout(1200);
const snap = async (name) => { await p.waitForTimeout(500); await p.screenshot({ path: path.join(out, name) }); };

await snap('1-lock-screen.png');
await p.evaluate(() => {
  SND.on = false; newGame(30);
  Object.assign(S, { day: 9, cash: 48650, bank: 12000, debt: 6200, heat: 18, veh: 1 });
  S.inv = { balau: { q: 40, cost: 455 }, cement: { q: 30, cost: 82 } };
  S.yard = { size: 0, sec: 1, inv: { ibr: { q: 24, cost: 330 } }, crew: 2, driver: true, run: { type: 'deliver', good: 'tube', q: 20, cost: 610, to: 'ste' } };
  S.loc = 'epp'; S.tip = { place: 'sw', good: 'solar', until: 11 };
  const r = genPrices(P('epp')); S.prices = r.prices; S.stock = r.stock;
  S.prices.balau = 912; S.last = { ...S.prices, balau: 640, tube: S.prices.tube + 90 };
  closeChat(); Q = []; go('home');
});
await snap('2-home-screen.png');
await p.evaluate(() => go('market'));
await snap('3-trade-app.png');
await p.evaluate(() => { V.sel = 'ste'; go('maps'); });
await snap('4-maps-app.png');
await p.evaluate(() => { go('home'); showEvent(perlemoen()); });
await snap('5-temptation.png');
await p.evaluate(() => { closeChat(); go('yard'); });
await snap('6-yard-app.png');
await p.evaluate(() => { S.day = 30; S.cash = 386400; S.bank = 120000; S.debt = 0; endGame('time'); go('end'); });
await snap('7-verdict.png');

// Feature graphic
const fg = await b.newPage({ viewport: { width: 1024, height: 500 } });
const fontsCss = fs.existsSync(path.join(root, 'www/fonts/fonts.css')) ? 'file://' + path.join(root, 'www/fonts/fonts.css') : 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Manrope:wght@700&display=swap';
await fg.setContent(`<html><head><link rel="stylesheet" href="${fontsCss}"><style>
body{margin:0;width:1024px;height:500px;overflow:hidden;position:relative;background:#14121a;font-family:Manrope,Arial,sans-serif;color:#f4efe7}
.art{position:absolute;right:-40px;top:-6px;width:560px;height:560px}
.art svg{width:100%;height:100%}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#14121a 50%,rgba(20,18,26,.6) 60%,rgba(20,18,26,0) 78%)}
.t{position:absolute;left:56px;top:122px;width:520px}
h1{font-family:"Bricolage Grotesque",Impact,sans-serif;font-weight:800;font-size:92px;line-height:.9;margin:0;letter-spacing:-2px}
h1 span{color:#ff8a3d}
p{font-size:26px;font-weight:700;color:#d9cfe0;margin:22px 0 0;line-height:1.25}
</style></head><body><div class="art">${icon(1)}</div><div class="fade"></div>
<div class="t"><h1>Cape<br><span>Hardware</span></h1><p>Out of prison. Going legit.<br>Same hustle, legal stock.</p></div></body></html>`, { waitUntil: 'networkidle' }).catch(() => {});
await fg.waitForTimeout(800);
await fg.screenshot({ path: path.join(out, 'feature-graphic-1024x500.png') });
fs.copyFileSync(path.join(root, 'store/play-icon-512.png'), path.join(out, 'app-icon-512.png'));
await b.close();
console.log('Store graphics saved to store/out');
