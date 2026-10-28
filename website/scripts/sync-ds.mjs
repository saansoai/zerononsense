/* Copy the design-system package into the site, applying the two documented
   divergences on the way.
 *
 * The site cannot import the package directly — it ships no package.json and
 * no entry point — so `src/styles/` and `src/ds/` are copies. Copies drift.
 * This makes the copy reproducible and gives CI something to check:
 *
 *   npm run sync:ds            # rewrite the copies from the package
 *   npm run sync:ds -- --check # fail if they differ (what CI runs)
 *
 * Every divergence lives in PATCHES below, and a patch whose `from` text is no
 * longer in the package's file is a hard error rather than a silent skip: that
 * means the package changed exactly where the site overrides it, and someone
 * has to decide what the new override is.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const pkg = resolve(site, '..', 'Zero Nonsense Design System');

const FILES = [
  ['tokens/colors.css', 'src/styles/colors.css'],
  ['tokens/effects.css', 'src/styles/effects.css'],
  ['tokens/spacing.css', 'src/styles/spacing.css'],
  ['tokens/typography.css', 'src/styles/typography.css'],
  ['components/forms/Button.jsx', 'src/ds/Button.jsx'],
  ['components/display/Badge.jsx', 'src/ds/Badge.jsx'],
  ['components/display/Card.jsx', 'src/ds/Card.jsx'],
  ['components/display/RubberStamp.jsx', 'src/ds/RubberStamp.jsx'],
  ['components/display/StampFrame.jsx', 'src/ds/StampFrame.jsx'],
];

const PATCHES = {
  // The package sets #1E1C18; the guidelines specify Zero Black #222222 (p34).
  // Raised with the brand — until the package is corrected, the site is.
  'tokens/colors.css': [
    ['--zn-ink-black:#1E1C18;', '--zn-ink-black:#222222; /* Zero Black, per guidelines p34 (was #1E1C18) */'],
  ],
  // index.html loads the fonts with preconnect and a trimmed weight set. A
  // second @import inside the CSS would be a third-party request discovered
  // only after the stylesheet parses — the slowest way to load a font.
  'tokens/typography.css': [
    [
      "@import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,400&family=Geist+Mono:wght@300;400;500;600;700&display=swap');\n",
      '',
    ],
  ],
};

const check = process.argv.includes('--check');
const stale = [];

for (const [from, to] of FILES) {
  let next = readFileSync(join(pkg, from), 'utf8');

  for (const [find, replace] of PATCHES[from] ?? []) {
    if (!next.includes(find)) {
      console.error(
        `\n  The design system no longer contains the text this site patches.\n` +
          `  File:  ${from}\n  Looked for: ${JSON.stringify(find)}\n\n` +
          `  Someone has to decide what the override should be now.\n` +
          `  Update PATCHES in scripts/sync-ds.mjs, then re-run.\n`,
      );
      process.exit(2);
    }
    next = next.replaceAll(find, replace);
  }

  const target = join(site, to);
  const current = readFileSync(target, 'utf8');
  // Line endings are a checkout artefact on Windows, not a difference.
  if (current.replaceAll('\r\n', '\n') === next.replaceAll('\r\n', '\n')) continue;

  if (check) {
    stale.push(to);
  } else {
    writeFileSync(target, next);
    console.log(`  updated  ${to}`);
  }
}

if (check && stale.length) {
  console.error(
    `\n  These copies have drifted from the design-system package:\n` +
      stale.map((file) => `    ${file}`).join('\n') +
      `\n\n  Run \`npm run sync:ds\` to take the package's version. If the site` +
      `\n  needs to differ, record it in PATCHES in scripts/sync-ds.mjs rather` +
      `\n  than editing the copy by hand.\n`,
  );
  process.exit(1);
}

console.log(check ? '  design system: in sync' : '  design system: synced');
