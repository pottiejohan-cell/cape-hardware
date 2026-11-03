// Downloads the game's Google Fonts into www/fonts so the app works offline.
// Run on a machine with internet (the GitHub build does this automatically).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = fs.readFileSync(path.join(root, 'src/game.html'), 'utf8');
const m = game.match(/href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"/);
if (!m) { console.log('No Google Fonts link found'); process.exit(0); }
const url = m[1].replace(/&amp;/g, '&');
const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36';
try {
  let css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();
  const dir = path.join(root, 'www/fonts');
  fs.mkdirSync(dir, { recursive: true });
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(x => x[1]))];
  let i = 0;
  for (const u of urls) {
    const name = `f${i++}.woff2`;
    const buf = Buffer.from(await (await fetch(u, { headers: { 'User-Agent': UA } })).arrayBuffer());
    fs.writeFileSync(path.join(dir, name), buf);
    css = css.split(u).join(name);
  }
  fs.writeFileSync(path.join(dir, 'fonts.css'), css);
  console.log(`Saved ${urls.length} font files to www/fonts`);
} catch (e) {
  console.log('Could not download fonts, the game will use Google Fonts online:', e.message);
}
