// Draws the Cape Hardware icon art as SVG strings (no text, so no fonts needed).
export const bg = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0" stop-color="#2a1840"/><stop offset=".45" stop-color="#8e3b5a"/><stop offset=".72" stop-color="#e8703c"/><stop offset="1" stop-color="#f7b56a"/></linearGradient>
 <radialGradient id="sun"><stop offset=".4" stop-color="#ffe2a8"/><stop offset=".7" stop-color="#ffc77a" stop-opacity=".35"/><stop offset="1" stop-color="#ffc77a" stop-opacity="0"/></radialGradient></defs>
 <rect width="512" height="512" fill="url(#sky)"/>`;
export const fg = `<circle cx="340" cy="232" r="96" fill="url(#sun)"/>
 <path fill="#3a2440" d="M0 318 L58 290 L96 262 L130 246 L150 220 L362 218 L380 236 L410 246 L452 270 L512 284 L512 512 L0 512 Z"/>
 <path fill="#1b1424" d="M0 372 L512 364 L512 512 L0 512 Z"/>
  <g transform="translate(96 300) scale(2.7)">
  <rect x="4" y="16" width="62" height="26" rx="3" fill="#d9a441"/>
  <rect x="8" y="10" width="54" height="8" fill="#8b93a6"/>
  <path d="M66 22h24l14 12v8H66z" fill="#f4efe7"/>
  <path d="M72 26h15l8 8H72z" fill="#5aa9ff"/>
  <rect x="0" y="40" width="112" height="5" rx="2" fill="#2a2634"/>
  <circle cx="22" cy="46" r="8" fill="#14121a"/><circle cx="22" cy="46" r="3" fill="#8b93a6"/>
  <circle cx="92" cy="46" r="8" fill="#14121a"/><circle cx="92" cy="46" r="3" fill="#8b93a6"/>
 </g>`;
export const icon = (scale = 1) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${bg}<g transform="translate(${256 - 256 * scale} ${256 - 256 * scale}) scale(${scale})">${fg}</g></svg>`;
// Adaptive-icon foreground: full-bleed art, nudged up so the truck sits inside the launcher's visible area.
export const fgOnly = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${bg.replace(/<rect width="512" height="512" fill="url\(#sky\)"\/>/, '')}<g transform="translate(20 -36) scale(.92)">${fg}</g><rect x="0" y="440" width="512" height="72" fill="#1b1424"/></svg>`;
