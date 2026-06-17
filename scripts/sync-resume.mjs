/**
 * Re-pull the resume PDF from the canonical Google Drive link into the app's
 * public assets. The Drive file id is derived from RESUME_URL in
 * links.content.ts, so that one constant stays the single source of truth.
 *
 * Usage: bun run sync:resume
 */
import { readFileSync, writeFileSync } from 'node:fs';

const LINKS_FILE = 'projects/data/src/lib/links.content.ts';
const OUTPUT = 'projects/portfolio/public/assets/resume.pdf';

const source = readFileSync(LINKS_FILE, 'utf8');
const idMatch = source.match(/\/file\/d\/([A-Za-z0-9_-]+)\//);
if (!idMatch) {
  console.error(`No Drive file id found in RESUME_URL (${LINKS_FILE}).`);
  process.exit(1);
}

const fileId = idMatch[1];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

const response = await fetch(downloadUrl, { redirect: 'follow' });
if (!response.ok) {
  console.error(`Download failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const bytes = Buffer.from(await response.arrayBuffer());
if (!bytes.subarray(0, 5).toString('latin1').startsWith('%PDF')) {
  console.error('Downloaded content is not a PDF (Drive likely returned an interstitial). Aborting.');
  process.exit(1);
}

writeFileSync(OUTPUT, bytes);
console.log(`Resume synced: ${bytes.length} bytes -> ${OUTPUT}`);
