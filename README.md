# GPA Pro

A browser-based high school GPA and college-planning dashboard.

## Features

- Weighted and unweighted GPA calculation
- Semester-based course organization
- AP, IB, Honors, and Dual Credit weighting
- Transcript text import with preview
- GPA trends, grade distribution, goal calculator, and graduation projection
- College finder and application tracking
- Scholarships and financial-aid tracking
- Test scores, AP scores, activities, and awards tracking
- CSV transcript export
- GPA summary card image export
- Light and dark themes
- Local browser storage for user data

## Run locally

This repository is a static site. Any static file server works:

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

Opening `index.html` directly may work, but a local server is recommended.

## Data and privacy

GPA Pro stores entries in the browser's local storage. The repository does not include a backend, account system, or cloud database, so data is tied to the browser and device where it was entered. Clearing site data or changing browsers can remove access to saved entries.

## Deploy

The site can be deployed to GitHub Pages. The included workflow publishes the repository root whenever changes reach `main`.

## Project structure

This repository currently contains the production build:

- `index.html`: application entry point
- `assets/`: bundled JavaScript, CSS, and storage helper files

The source project used to generate the bundle is not included yet. Contributions that reconstruct a maintainable source tree should preserve the current behavior and local-storage data format.

## License

No license has been declared yet. Add one before accepting external contributions or redistributing the code.
