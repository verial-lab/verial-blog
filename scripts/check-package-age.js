#!/usr/bin/env node
/**
 * Supply chain guard: verifies direct dependencies were published at least
 * MIN_AGE_HOURS ago before allowing install.
 *
 * Run BEFORE npm install/ci. Only requires Node and the npm CLI — no node_modules.
 * Reads workspace package.json files for direct deps, resolves exact versions
 * from the committed package-lock.json, then queries the npm registry.
 *
 * Usage:
 *   node scripts/check-package-age.js              # default 48h
 *   node scripts/check-package-age.js --hours 168  # 7 days
 *   node scripts/check-package-age.js --dry-run    # warn only, don't fail
 */

'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const hoursIdx = args.indexOf('--hours');
const MIN_AGE_HOURS = hoursIdx !== -1 ? parseInt(args[hoursIdx + 1], 10) : 168;
const DRY_RUN = args.includes('--dry-run');
const MIN_AGE_MS = MIN_AGE_HOURS * 60 * 60 * 1000;

// Collect direct dep names across all workspace package.json files.
// Does not require node_modules to exist.
function collectDirectDeps() {
  const names = new Set();
  const pkgFiles = [
    path.join(ROOT, 'package.json'),
    ...fs
      .readdirSync(path.join(ROOT, 'packages'), { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => path.join(ROOT, 'packages', d.name, 'package.json'))
      .filter(p => fs.existsSync(p)),
  ];
  for (const p of pkgFiles) {
    const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const section of ['dependencies', 'devDependencies']) {
      for (const name of Object.keys(pkg[section] || {})) {
        names.add(name);
      }
    }
  }
  return names;
}

// Resolve exact installed version from the committed lockfile.
// Works before install — lockfile is always committed.
function resolveFromLockfile(depNames) {
  const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'package-lock.json'), 'utf8'));
  const pkgs = lock.packages || {};
  const resolved = new Map();
  for (const name of depNames) {
    const version = pkgs[`node_modules/${name}`]?.version;
    if (version) resolved.set(name, version);
  }
  return resolved;
}

// Query npm registry for the publish time of a specific version.
function getPublishTime(name, version) {
  try {
    const raw = execSync(`npm view "${name}@${version}" time --json 2>/dev/null`, {
      encoding: 'utf8',
      timeout: 15000,
    });
    const times = JSON.parse(raw);
    return times[version] ? new Date(times[version]) : null;
  } catch {
    return null;
  }
}

const now = Date.now();
const depNames = collectDirectDeps();
const resolved = resolveFromLockfile(depNames);

let failed = 0;
let warned = 0;

console.log(`Checking ${resolved.size} direct dependencies (minimum age: ${MIN_AGE_HOURS}h / ${MIN_AGE_HOURS / 24} days)\n`);

for (const [name, version] of resolved) {
  const published = getPublishTime(name, version);

  if (!published) {
    console.warn(`  WARN  ${name}@${version} — could not fetch publish time`);
    warned++;
    continue;
  }

  const ageMs = now - published.getTime();
  const ageHours = Math.floor(ageMs / (1000 * 60 * 60));

  if (ageMs < MIN_AGE_MS) {
    console.error(`  FAIL  ${name}@${version} — published ${ageHours}h ago (minimum: ${MIN_AGE_HOURS}h)`);
    failed++;
  } else {
    console.log(`  OK    ${name}@${version} — ${ageHours}h old`);
  }
}

console.log(`\n${resolved.size} checked, ${warned} skipped, ${failed} too new.`);

if (failed > 0 && !DRY_RUN) {
  console.error(`\nRefusing to proceed: ${failed} package(s) under ${MIN_AGE_HOURS}h old.`);
  console.error(`Wait before installing, or use --dry-run to audit without blocking.`);
  process.exit(1);
}
