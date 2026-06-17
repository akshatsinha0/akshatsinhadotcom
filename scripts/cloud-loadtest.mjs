// Cloud load / latency test for OUR OWN authorized Cloud Run service.
// Ethical use only: run this against services you own and are authorized to test.
// A host guard refuses non *.run.app targets unless --force is passed.
//
// Usage (via: bun run loadtest -- <flags>):
//   --mode cold|burst|ramp   what to run (default: burst)
//   --url URL                target base (default: $CLOUD_RUN_URL env var; required)
//   --path /                 path to hit (default: /)
//   --requests N             total requests for burst (default: 300)
//   --concurrency C          parallel requests (default: 20)
//   --duration / ramp uses --concurrency as the peak across 5 steps
//   --force                  allow a non-*.run.app host
// Examples:
//   bun run loadtest -- --mode cold
//   bun run loadtest -- --mode burst --requests 600 --concurrency 60
//   bun run loadtest -- --mode ramp --concurrency 160   # push past containerConcurrency to scale instances

const ALLOWED_HOST_SUFFIX = '.run.app';
const CAPS = { requests: 5000, concurrency: 200 };
const TIMEOUT_MS = 15000;

function parseArgs(argv) {
  const a = {
    mode: 'burst',
    url: process.env.CLOUD_RUN_URL || '',
    requests: 300,
    concurrency: 20,
    duration: 120,
    path: '/',
    force: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--force') {
      a.force = true;
      continue;
    }
    const v = argv[++i];
    if (k === '--mode') a.mode = v;
    else if (k === '--url') a.url = v;
    else if (k === '--path') a.path = v;
    else if (k === '--requests') a.requests = Number(v);
    else if (k === '--concurrency') a.concurrency = Number(v);
    else if (k === '--duration') a.duration = Number(v);
  }
  return a;
}

const pct = (sorted, p) =>
  sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] : 0;

async function hit(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const start = performance.now();
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: 'manual' });
    await res.arrayBuffer(); // drain body for honest time-to-last-byte
    return { ms: performance.now() - start, status: res.status };
  } catch (err) {
    return { ms: performance.now() - start, status: 0, error: String(err.name || err) };
  } finally {
    clearTimeout(timer);
  }
}

async function pool(url, total, concurrency, sink) {
  let issued = 0;
  const worker = async () => {
    while (issued < total) {
      issued++;
      sink.push(await hit(url));
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, total) }, worker));
}

function report(label, results, wallMs) {
  const lat = results.map((r) => r.ms).sort((x, y) => x - y);
  const ok = results.filter((r) => r.status >= 200 && r.status < 400).length;
  const codes = {};
  for (const r of results) {
    const key = r.error ? `ERR:${r.error}` : r.status;
    codes[key] = (codes[key] || 0) + 1;
  }
  console.log(`\n=== ${label} ===`);
  console.log(
    `requests=${results.length} ok=${ok} wall=${(wallMs / 1000).toFixed(2)}s throughput=${(results.length / (wallMs / 1000)).toFixed(1)} req/s`,
  );
  console.log(`status: ${Object.entries(codes).map(([k, v]) => `${k}×${v}`).join('  ')}`);
  console.log(
    `latency ms: min=${(lat[0] ?? 0).toFixed(0)} p50=${pct(lat, 0.5).toFixed(0)} p90=${pct(lat, 0.9).toFixed(0)} p95=${pct(lat, 0.95).toFixed(0)} p99=${pct(lat, 0.99).toFixed(0)} max=${(lat.at(-1) ?? 0).toFixed(0)}`,
  );
}

async function main() {
  const a = parseArgs(process.argv.slice(2));
  if (!a.url) {
    console.error('No target URL. Set CLOUD_RUN_URL env var or pass --url <https://…>.');
    process.exit(1);
  }
  const target = new URL(a.path, a.url).toString();
  if (!new URL(target).host.endsWith(ALLOWED_HOST_SUFFIX) && !a.force) {
    console.error(`Refusing non-*${ALLOWED_HOST_SUFFIX} host. Test only what you own; use --force to override.`);
    process.exit(1);
  }
  a.requests = Math.min(a.requests, CAPS.requests);
  a.concurrency = Math.min(a.concurrency, CAPS.concurrency);
  console.log(`Target: ${target}`);
  console.log(`Mode: ${a.mode}  caps: ${CAPS.requests} req / ${CAPS.concurrency} conc`);
  console.log(`Window START (UTC): ${new Date().toISOString()}`);

  if (a.mode === 'cold') {
    const r = await hit(target);
    console.log(`Cold start: HTTP ${r.status} ${r.ms.toFixed(0)}ms ${r.error ?? ''}`);
  } else if (a.mode === 'ramp') {
    const steps = 5;
    for (let s = 1; s <= steps; s++) {
      const conc = Math.max(1, Math.round((a.concurrency * s) / steps));
      const n = Math.max(conc, Math.round(a.requests / steps));
      const res = [];
      const t0 = performance.now();
      await pool(target, n, conc, res);
      report(`ramp ${s}/${steps} (conc ${conc})`, res, performance.now() - t0);
    }
  } else if (a.mode === 'soak') {
    const durationMs = Math.min(a.duration, 600) * 1000;
    const deadline = performance.now() + durationMs;
    const res = [];
    let windowStart = performance.now();
    let windowCount = 0;
    const ticker = setInterval(() => {
      const now = performance.now();
      const rps = (windowCount / ((now - windowStart) / 1000)).toFixed(0);
      console.log(
        `  t+${((durationMs - (deadline - now)) / 1000).toFixed(0)}s  ~${rps} req/s  total=${res.length}`,
      );
      windowStart = now;
      windowCount = 0;
    }, 15000);
    const worker = async () => {
      while (performance.now() < deadline) {
        res.push(await hit(target));
        windowCount++;
      }
    };
    await Promise.all(Array.from({ length: a.concurrency }, worker));
    clearInterval(ticker);
    report(`soak ${a.concurrency} conc / ${durationMs / 1000}s`, res, durationMs);
  } else {
    const res = [];
    const t0 = performance.now();
    await pool(target, a.requests, a.concurrency, res);
    report(`burst ${a.requests}@${a.concurrency}`, res, performance.now() - t0);
  }

  console.log(`Window END (UTC):   ${new Date().toISOString()}`);
  console.log('View: Cloud Run → akshat-portfolio → Metrics (range "Last 1 hour"; allow 1–5 min ingestion).');
}

main();
