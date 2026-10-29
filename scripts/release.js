#!/usr/bin/env node

/**
 * Start a release: bump the version and draft its changelog entry.
 *
 * Usage:
 *   node scripts/release.js [minor|patch|major] [--dry-run]   (default: minor)
 *   npm run release -- patch --dry-run
 *
 * 1. Reads the newest entry in data/changelog.json (the last release).
 * 2. Collects non-merge commit subjects made after that release's date and sorts them
 *    into new / improved / fixed, skipping developer-only work (chore, docs, test, ci,
 *    build, refactor).
 * 3. Bumps version.json (+ both package.json files) via scripts/bump-version.js.
 * 4. Prepends a draft entry for the new version, dated today.
 *
 * Every drafted title and change starts with "TODO", and `npm test` (in web/) fails
 * while any remain, so rewrite them in plain language for residents (or delete them)
 * before committing. --dry-run prints the draft and changes nothing.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const CHANGELOG_FILE = path.join(ROOT, 'data', 'changelog.json');
const VERSION_FILE = path.join(ROOT, 'version.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const bumpType = args.find((a) => !a.startsWith('--')) || 'minor';
if (!['major', 'minor', 'patch'].includes(bumpType)) {
  console.error('Invalid release type: ' + bumpType + ' (use major, minor or patch)');
  process.exit(1);
}

const changelog = JSON.parse(fs.readFileSync(CHANGELOG_FILE, 'utf8'));
const last = changelog.entries[0];
// Local calendar date (the team is in UTC+8; toISOString would give yesterday before 8am).
const today = new Date().toLocaleDateString('en-CA');

if (last && last.date === today) {
  console.error(
    'There is already a release dated ' +
      today +
      ' (v' +
      last.version +
      ').\n' +
      "Add today's changes to that entry in data/changelog.json instead."
  );
  process.exit(1);
}

// ── Draft changes from commit subjects since the last release ────────────────
const SKIP = /^(chore|docs|test|tests|ci|build|refactor)\b/i;
const NOISE = /^(merge\b|refactor code structure|update readme)|\bCI\b|\bdev-only\b/i;

function classify(subject) {
  // Drop a leading gitmoji, then read a conventional-commit prefix if there is one.
  const s = subject.replace(/^[^\p{L}\p{N}]+/u, '').trim();
  if (NOISE.test(s)) return null;
  const m = s.match(/^(\w+)(\([^)]*\))?!?:\s*(.+)$/);
  if (m) {
    const [, kind, , rest] = m;
    if (SKIP.test(kind)) return null;
    const type = /^feat/i.test(kind) ? 'new' : /^fix/i.test(kind) ? 'fixed' : 'improved';
    return { type, text: rest };
  }
  if (/^refactor\b/i.test(s)) return null;
  const type = /^fix/i.test(s) ? 'fixed' : /^add\b/i.test(s) ? 'new' : 'improved';
  return { type, text: s };
}

const since = last ? ['--since=' + last.date + ' 23:59:59'] : [];
const subjects = execFileSync('git', ['log', '--no-merges', '--format=%s', ...since], {
  cwd: ROOT,
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const ORDER = { new: 0, improved: 1, fixed: 2 };
const changes = subjects
  .map(classify)
  .filter(Boolean)
  .map((c) => ({ type: c.type, text: 'TODO rewrite for residents: ' + c.text }))
  .sort((a, b) => ORDER[a.type] - ORDER[b.type]);

if (changes.length === 0) {
  changes.push({ type: 'improved', text: 'TODO: describe what changed for residents.' });
}

// ── Bump the version (or predict it for a dry run) ───────────────────────────
let version;
if (dryRun) {
  const v = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8'));
  const next = { major: [v.major + 1, 0, 0], minor: [v.major, v.minor + 1, 0] };
  version = (next[bumpType] || [v.major, v.minor, v.patch + 1]).join('.');
} else {
  execFileSync('node', [path.join(__dirname, 'bump-version.js'), bumpType], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  version = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8')).version;
}

const entry = { date: today, title: 'TODO: release title', version, changes };

console.log('\nDraft changelog entry' + (dryRun ? ' (dry run, nothing written)' : '') + ':\n');
console.log(JSON.stringify(entry, null, 2));
console.log(
  '\n' +
    subjects.length +
    ' commit(s) since ' +
    (last ? 'v' + last.version + ' (' + last.date + ')' : 'the start') +
    ', ' +
    (changes[0].text.startsWith('TODO:') ? 0 : changes.length) +
    ' drafted.'
);

if (!dryRun) {
  changelog.entries.unshift(entry);
  fs.writeFileSync(CHANGELOG_FILE, JSON.stringify(changelog, null, 2) + '\n');
  console.log(
    'Wrote data/changelog.json. Rewrite every TODO in plain language (npm test fails until\n' +
      'you do), then commit version.json, both package.json files and the changelog.'
  );
}
