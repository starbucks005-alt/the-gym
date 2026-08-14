// build-stoplight.mjs — regenerate js/data/stoplight.js from the myth checks
// already written into the site's pages.
//
// Eli's Stoplight is an index of every claim the staff have checked. Rather
// than maintaining that list twice, this scrapes the myth objects out of each
// page and writes them to a data file the Stoplight page loads.
//
// Run from the project root after adding or editing any myth check:
//   node tools/build-stoplight.mjs

import fs from 'fs';
import path from 'path';

const PAGES = [
  { file: 'workout-library.html', page: 'The Workout Library', host: 'Coach Dom Castellanos', topic: 'Training' },
  { file: 'dehydrator.html',      page: 'The Drying Bench',    host: 'Reece Ashford',          topic: 'Food & drying' },
  { file: 'smoothie-bar.html',    page: 'The Smoothie Bar',    host: 'Zara Cole',              topic: 'Nutrition' },
  { file: 'elixir-bar.html',      page: 'The Elixir Bar',      host: 'Wyatt E. Cooper',        topic: 'Drinks & zero-proof' },
  { file: 'body-map.html',        page: 'The Body Map',        host: 'Dr. Lena Brandt, DPT',   topic: 'Injury & rehab' },
  { file: 'breath-room.html',     page: 'Yoga & Breathing',    host: 'Noor Haddad',            topic: 'Breath & movement' },
  { file: 'sleep-lab.html',       page: 'The Sleep Lab',       host: 'Dr. Sana Qureshi',       topic: 'Sleep & recovery' },
  { file: 'fuel.html',            page: 'Fuel',                host: 'Nadia Hassan',           topic: 'Nutrition' },
  // The Trend Scout stores its four-beat under different field names: the
  // trend's name is the claim, Sana's paragraph is the evidence, src is the
  // source. Map them rather than duplicating the content.
  { file: 'trend-scout.html',     page: 'The Trend Scout',     host: 'Jax Rivera',             topic: 'Trends',
    fields: { claim: 'name', truth: 'sana', source: 'src' } },
];

// Read a JS string literal starting at src[i] (which must be a quote).
// Handles ' and " and backslash escapes. Returns [value, nextIndex] or null.
function readString(src, i) {
  const q = src[i];
  if (q !== '"' && q !== "'") return null;
  let out = '';
  i++;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      if (n === 'n') out += '\n';
      else if (n === 't') out += '\t';
      else out += n;
      i += 2;
      continue;
    }
    if (c === q) return [out, i + 1];
    out += c;
    i++;
  }
  return null;
}

// Find the object literal that encloses position `at`, so field lookups can
// never leak into the neighbouring entry. Scans outward tracking brace depth
// while skipping over string literals (which contain plenty of stray braces).
function enclosingObject(src, at) {
  let start = -1, depth = 0;
  for (let i = at; i >= 0; i--) {
    const c = src[i];
    if (c === '"' || c === "'") {              // walk back over a string
      const q = c; i--;
      while (i >= 0 && !(src[i] === q && src[i - 1] !== '\\')) i--;
      continue;
    }
    if (c === '}') depth++;
    else if (c === '{') { if (depth === 0) { start = i; break; } depth--; }
  }
  if (start < 0) return null;
  depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'") {
      const r = readString(src, i);
      if (!r) return null;
      i = r[1] - 1;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return { start, end: i + 1 }; }
  }
  return null;
}

// Pull a named field from within one object literal.
function fieldIn(src, bounds, name) {
  const slice = src.slice(bounds.start, bounds.end);
  const m = new RegExp('(?:^|[{,\\s])' + name + '\\s*:\\s*').exec(slice);
  if (!m) return null;
  const at = bounds.start + m.index + m[0].length;
  const r = readString(src, at);
  return r ? r[0] : null;
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&middot;/g, '·').replace(/&rarr;/g, '→').replace(/&mdash;/g, '—')
   .replace(/<[^>]+>/g, '')
   .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
   .trim();

const all = [];
let id = 0;

for (const meta of PAGES) {
  const full = path.resolve(meta.file);
  if (!fs.existsSync(full)) { console.warn('  skip (missing): ' + meta.file); continue; }
  const src = fs.readFileSync(full, 'utf8');
  const f = meta.fields || {};
  const re = /verdict\s*:\s*["'](green|amber|red)["']/g;
  let m, count = 0;
  while ((m = re.exec(src))) {
    const bounds = enclosingObject(src, m.index);
    if (!bounds) continue;
    const claim = fieldIn(src, bounds, f.claim || 'claim');
    const truth = fieldIn(src, bounds, f.truth || 'truth');
    const source = fieldIn(src, bounds, f.source || 'source');
    if (!claim || !truth || !source) continue;
    all.push({
      id: ++id,
      verdict: m[1],
      claim: decode(claim),
      truth: decode(truth),
      source: decode(source),
      page: meta.page,
      href: '/' + meta.file,
      host: meta.host,
      topic: meta.topic,
    });
    count++;
  }
  console.log('  ' + meta.page.padEnd(22) + count + ' checks');
}

// Drop duplicates: the same claim can appear on two pages (turmeric, tart
// cherry). Keep the first and record where else it was checked.
const seen = new Map();
const merged = [];
for (const c of all) {
  const key = c.claim.toLowerCase().replace(/[^a-z0-9 ]/g, '').slice(0, 80);
  if (seen.has(key)) {
    const first = seen.get(key);
    if (!first.also) first.also = [];
    if (!first.also.some((a) => a.page === c.page)) first.also.push({ page: c.page, href: c.href });
    continue;
  }
  seen.set(key, c);
  merged.push(c);
}

const counts = merged.reduce((a, c) => ((a[c.verdict] = (a[c.verdict] || 0) + 1), a), {});
const out = `// stoplight.js — GENERATED FILE, do not edit by hand.
// Regenerate with:  node tools/build-stoplight.mjs
//
// Every claim the staff have run through The Gym Stoplight, scraped from the
// myth checks written into each page so the index cannot drift from the source.
//
// ${merged.length} claims: ${counts.green || 0} green, ${counts.amber || 0} amber, ${counts.red || 0} red.

export const STOPLIGHT = ${JSON.stringify(merged, null, 1)};
`;

fs.mkdirSync('js/data', { recursive: true });
fs.writeFileSync('js/data/stoplight.js', out);
console.log('\n  merged ' + all.length + ' -> ' + merged.length + ' unique claims (' +
  (counts.green || 0) + ' green, ' + (counts.amber || 0) + ' amber, ' + (counts.red || 0) + ' red)');
console.log('  wrote js/data/stoplight.js');
