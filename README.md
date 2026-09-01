# GPA Pro

A privacy-first GPA and college-planning dashboard that runs entirely in the browser.

## GPA Pro 2.0

GPA Pro is now an editable, modular source project instead of a minified production bundle. It uses browser-native ES modules, so there is no dependency installation or opaque build output.

### Academics

- Weighted and unweighted GPA with plus/minus grades
- Credit-weighted or equal-course calculation
- AP, IB, Honors, and Dual Credit bonuses
- Configurable weighted-GPA cap
- Freshman exclusion and core-course recalculation
- Pass/fail and replaced-attempt handling
- Completed and planned courses
- Semester trends with text equivalents
- Goal calculator and restorable scenarios

### Planning and safety

- Application, scholarship, test-score, and activity tracking
- College links use official admissions pages and display a reference year
- Versioned, validated local storage with automatic backup
- Migration from the original GPA Pro storage keys
- Full JSON backup and validated restore
- Formula-safe CSV export
- Duplicate-aware transcript preview
- UUID record identifiers and input limits

### Experience

- Full-width 12-column desktop dashboard and responsive mobile navigation
- Consistent light/dark theme
- Keyboard focus, skip link, live announcements, reduced-motion support, and browser zoom
- Installable/offline application shell
- No external fonts, trackers, accounts, or backend

## Run locally

```bash
npm start
```

Open <http://localhost:5173>.

## Test

Requires Node 20 or newer:

```bash
npm test
```

Tests cover core GPA calculations, plus/minus grades, exclusions, projections, transcript parsing, and CSV-formula neutralization.

## Architecture

```text
src/app.js         UI, routing, and interactions
src/calculator.js  Pure GPA and projection functions
src/storage.js     Validation, migration, backup, and persistence
src/importer.js    Transcript staging and duplicate detection
src/exporter.js    Safe CSV and file downloads
src/styles.css     Responsive visual system
tests/             Node test suite
sw.js              Offline cache
```

The previous compiled assets remain recoverable in Git history but are not loaded by GPA Pro 2.0.

## Privacy and limitations

Academic data stays in the current browser unless the user explicitly downloads a file. Clearing browser storage can remove it, so regular JSON backups are recommended.

GPA policies vary by school. Users should configure the calculator to match their institution and verify important results manually. College requirements change; GPA Pro links to official sources instead of claiming to predict admission.

## Deployment

Pushes to `main` run the automated tests and deploy to GitHub Pages only when they pass.

## License

No public reuse license has been granted. Add an explicit license before accepting external contributions.
