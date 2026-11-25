// make-meme.mjs — renders meme.png for the "Post the Meme, Win the Feed" bounty.
// Node 22 stdlib only (node:zlib, node:fs). No npm packages, no network, no fonts:
// text is drawn with an embedded 5x7 pixel font, scaled up. The image is fully
// procedural: gradient sky, stars, a robot agent at a laptop, a rising chart,
// USDC coins. 1080x1080, square for the X feed.
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const W = 1080, H = 1080;

// ---------- palette ----------
const NAVY_TOP = [11, 16, 38];
const NAVY_BOT = [24, 32, 68];
const GREEN = [74, 222, 128];
const GREEN_DIM = [34, 197, 94];
const YELLOW = [250, 204, 21];
const WHITE = [255, 255, 255];
const GREY = [148, 163, 184];
const DARK = [15, 23, 42];
const PANEL = [30, 41, 59];

// ---------- pixel buffer ----------
const px = Buffer.alloc(W * H * 3);
function setPx(x, y, c) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2];
}
function fillRect(x, y, w, h, c) {
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) setPx(i, j, c);
}
function fillCircle(cx, cy, r, c) {
  for (let y = cy - r; y <= cy + r; y++) {
    const dy = y - cy, dx = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    for (let x = cx - dx; x <= cx + dx; x++) setPx(x, y, c);
  }
}
function roundRect(x, y, w, h, r, c) {
  fillRect(x + r, y, w - 2 * r, h, c);
  fillRect(x, y + r, w, h - 2 * r, c);
  fillCircle(x + r, y + r, r, c); fillCircle(x + w - r - 1, y + r, r, c);
  fillCircle(x + r, y + h - r - 1, r, c); fillCircle(x + w - r - 1, y + h - r - 1, r, c);
}

// ---------- background: vertical gradient + stars ----------
for (let y = 0; y < H; y++) {
  const t = y / (H - 1);
  const c = NAVY_TOP.map((v, i) => Math.round(v + (NAVY_BOT[i] - v) * t));
  for (let x = 0; x < W; x++) setPx(x, y, c);
}
// deterministic pseudo-random stars (mulberry32)
let seed = 20261125;
function rnd() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
for (let s = 0; s < 90; s++) {
  const x = Math.floor(rnd() * W), y = Math.floor(rnd() * 420);
  const b = 120 + Math.floor(rnd() * 135);
  setPx(x, y, [b, b, b]);
  if (rnd() > 0.6) setPx(x + 1, y, [b, b, b]);
}

// ---------- 5x7 pixel font (uppercase, digits, punctuation) ----------
const FONT = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  ':': ['00000', '00100', '00000', '00000', '00000', '00100', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  ',': ['00000', '00000', '00000', '00000', '01100', '00100', '01000'],
  "'": ['00100', '00100', '01000', '00000', '00000', '00000', '00000'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '$': ['00100', '01111', '10100', '01110', '00101', '11110', '00100'],
  '-': ['00000', '00000', '00000', '01110', '00000', '00000', '00000'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'],
};
function textWidth(s, scale) { return s.length * 6 * scale - scale; }
function drawText(s, cx, y, scale, color) {
  const w = textWidth(s, scale);
  let x = Math.round(cx - w / 2);
  for (const ch of s) {
    const g = FONT[ch] ?? FONT['?'];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
      if (g[r][c] === '1') fillRect(x + c * scale, y + r * scale, scale, scale, color);
    }
    x += 6 * scale;
  }
}

// ---------- header badge ----------
roundRect(390, 56, 300, 72, 36, GREEN_DIM);
drawText('MAKE.FUN', 540, 76, 6, WHITE);

// ---------- headline ----------
// "ME: ASLEEP." — grey, smaller, the setup
drawText('ME: ASLEEP.', 540, 168, 9, GREY);
// "MY AGENT AT 3 AM:" — white, big, the turn
drawText('MY AGENT AT 3 AM:', 540, 268, 10, WHITE);

// ---------- scene: robot agent at a laptop, rising chart, coins ----------
// floor glow
fillRect(140, 700, 800, 10, GREEN_DIM);
// laptop screen (left-center) with rising bars
roundRect(180, 470, 300, 200, 12, PANEL);
fillRect(196, 486, 268, 168, DARK);
const bars = [40, 70, 105, 145];
bars.forEach((h, i) => fillRect(216 + i * 62, 640 - h, 40, h, i === 3 ? GREEN : GREEN_DIM));
fillRect(160, 670, 340, 16, PANEL); // laptop base
// robot head (right-center)
fillRect(628, 400, 14, 60, GREY); // antenna stem
fillCircle(635, 392, 14, YELLOW); // antenna tip
roundRect(560, 460, 220, 180, 36, WHITE); // head
fillRect(600, 520, 44, 34, DARK); // left eye
fillRect(696, 520, 44, 34, DARK); // right eye
fillRect(600, 520, 44, 12, GREEN); // glowing eye tops
fillRect(696, 520, 44, 12, GREEN);
fillRect(636, 590, 68, 10, DARK); // smile
// robot body hint
roundRect(600, 640, 140, 60, 16, PANEL);
// USDC coins floating top-right of the robot
fillCircle(830, 470, 34, YELLOW);
drawText('$', 830, 448, 6, DARK);
fillCircle(880, 540, 26, YELLOW);
drawText('$', 880, 524, 5, DARK);
fillCircle(800, 600, 22, YELLOW);
drawText('$', 800, 586, 4, DARK);

// ---------- punchline ----------
// green divider
fillRect(340, 780, 400, 8, GREEN);
// "ANOTHER BOUNTY WON." — green, big
drawText('ANOTHER BOUNTY WON.', 540, 812, 9, GREEN);
// "USDC INCOMING." — yellow, big
drawText('USDC INCOMING.', 540, 912, 10, YELLOW);
// footer
drawText('AGENTS BUILD. AGENTS WIN.', 540, 1010, 5, GREY);

// ---------- PNG encode (stdlib zlib) ----------
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c;
    }
  }
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // 8-bit RGB
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0; // filter none
  px.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
writeFileSync('meme.png', png);
console.log('meme.png', png.length, 'bytes,', W + 'x' + H);
