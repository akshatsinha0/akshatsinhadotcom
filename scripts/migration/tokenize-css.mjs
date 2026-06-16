/**
 * Migration helper: copy a React CSS file into an Angular component SCSS file,
 * replacing every color literal with its canonical design token (var(--ak-...)).
 *
 * Usage: node scripts/migration/tokenize-css.mjs <src.css> <dest.scss>
 *
 * Color identity is matched by a normalized canonical form so differing source
 * spellings (#fff vs #ffffff, .3 vs 0.3, rgb vs rgba) resolve to the same token.
 * Dynamic forms (rgba(var(--x), ...)) are skipped. Unmapped literals are reported
 * so no color silently slips through untokenized.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , srcPath, destPath] = process.argv;
if (!srcPath || !destPath) {
  console.error('usage: tokenize-css.mjs <src.css> <dest.scss>');
  process.exit(1);
}

const rawMap = JSON.parse(
  readFileSync('projects/portfolio/src/styles/tokens/color-map.json', 'utf8'),
);

const normHex = (h) => {
  h = h.toLowerCase();
  if (h.length === 4) return '#' + [...h.slice(1)].map((c) => c + c).join('');
  if (h.length === 5) return '#' + [...h.slice(1)].map((c) => c + c).join('');
  return h;
};
const normRgb = (inner) => {
  const p = inner.split(',').map((s) => s.trim());
  if (p.length < 3) return null;
  let a = p[3] !== undefined ? p[3] : '1';
  if (a.startsWith('.')) a = '0' + a;
  if (a === '1.0') a = '1';
  if (a === '0.0') a = '0';
  return `rgba(${+p[0]},${+p[1]},${+p[2]},${a})`;
};
const normalize = (s) => {
  if (s.startsWith('#')) return normHex(s);
  const m = s.match(/^rgba?\(([^)]*)\)$/i);
  if (m) return normRgb(m[1]);
  return s.toLowerCase();
};

// Canonical (normalized literal) -> token
const canon = new Map();
for (const [k, v] of Object.entries(rawMap)) {
  const n = normalize(k);
  if (n) canon.set(n, v);
}

let css = readFileSync(srcPath, 'utf8');
const unmapped = new Set();
let replaced = 0;

const sub = (full) => {
  if (/var\(/i.test(full)) return full; // dynamic, leave as-is
  const n = normalize(full);
  const token = n && canon.get(n);
  if (token) {
    replaced++;
    return token;
  }
  unmapped.add(full);
  return full;
};

css = css.replace(/rgba?\([^)]*\)/gi, (m) => sub(m));
css = css.replace(/#[0-9a-fA-F]{3,8}\b/g, (m) => sub(m));

writeFileSync(destPath, css);
console.log(`${srcPath} -> ${destPath}: ${replaced} colors tokenized`);
if (unmapped.size) console.log('  UNMAPPED:', [...unmapped].join('  '));
