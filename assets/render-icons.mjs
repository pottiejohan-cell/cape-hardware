// node assets/render-icons.mjs  (needs playwright). Writes app icons + Capacitor source images.
import { chromium } from 'playwright';
import { icon, bg, fgOnly } from './icon-art.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b = await chromium.launch();
async function shot(svg, size, out, transparent = false) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(`<html><body style="margin:0;background:${transparent ? 'transparent' : '#0c0a10'}">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.screenshot({ path: path.join(root, out), omitBackground: transparent });
  await p.close();
}
await shot(icon(1), 192, 'www/icons/icon-192.png');
await shot(icon(1), 512, 'www/icons/icon-512.png');
await shot(icon(.8), 512, 'www/icons/icon-maskable-512.png');
await shot(icon(1), 512, 'store/play-icon-512.png');
await shot(icon(1), 1024, 'assets/icon-only.png');
await shot(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${bg}</svg>`, 1024, 'assets/icon-background.png');
await shot(fgOnly(), 1024, 'assets/icon-foreground.png', true);
const splash = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732"><rect width="2732" height="2732" fill="#0c0a10"/><g transform="translate(1110 1110) scale(1)"><clipPath id="r"><rect width="512" height="512" rx="110"/></clipPath><g clip-path="url(#r)">${icon(1).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g></g></svg>`;
await shot(splash, 2732, 'assets/splash.png');
await shot(splash, 2732, 'assets/splash-dark.png');
await b.close();
console.log('icons done');
