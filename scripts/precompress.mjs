// Pre-compresses the built assets so Caddy can serve .br/.gz directly
// (file_server { precompressed br gzip }) instead of compressing on every request.
// Brotli beats gzip by ~15-20% on text; both are emitted for full client coverage.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';

const DIST = 'dist/portfolio/browser';
const COMPRESSIBLE = /\.(js|css|html|svg|json|xml|txt|map|webmanifest|ico)$/;
const MIN_BYTES = 1024; // tiny files don't benefit and just add request overhead

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

let count = 0;
for (const file of walk(DIST)) {
  if (!COMPRESSIBLE.test(file)) continue;
  const raw = readFileSync(file);
  if (raw.length < MIN_BYTES) continue;
  writeFileSync(
    `${file}.br`,
    brotliCompressSync(raw, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 11,
        [constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
      },
    }),
  );
  writeFileSync(`${file}.gz`, gzipSync(raw, { level: 9 }));
  count++;
}
console.log(`Pre-compressed ${count} files (.br + .gz) in ${DIST}`);
