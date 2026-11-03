// Builds www/index.html from src/game.html (the same file that runs as the Claude artifact).
// Adds the full HTML page shell, the app manifest, offline support and the native bridge.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let game = fs.readFileSync(path.join(root, 'src/game.html'), 'utf8');

// Use bundled fonts when scripts/fetch-fonts.mjs has downloaded them (works offline).
if (fs.existsSync(path.join(root, 'www/fonts/fonts.css'))) {
  game = game.replace(/<link rel="preconnect"[^>]*>\s*/, '')
             .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts/fonts.css">');
}

const split = game.indexOf('<div class="stage">');
if (split < 0) throw new Error('Could not find <div class="stage"> in src/game.html');
const head = game.slice(0, split);
let body = game.slice(split);
const firstScript = body.indexOf('<script>');
body = body.slice(0, firstScript) + '<script src="config.js"></script>\n<script src="native.js"></script>\n' + body.slice(firstScript);

const html = `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#14121a">
<meta name="description" content="Fresh out of Pollsmoor, an ex drug lord builds a legal building-materials empire across the Cape.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}*,*::before,*::after{box-sizing:inherit}body{margin:0;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}img{max-width:100%}[hidden]{display:none!important}</style>
${head.trim()}
</head>
<body>
${body.trim()}
<script>
if ('serviceWorker' in navigator && location.protocol === 'https:' && !(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())) {
  navigator.serviceWorker.register('sw.js').catch(function(){});
}
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'www/index.html'), html);
console.log('Built www/index.html');
