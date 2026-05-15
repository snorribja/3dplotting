# CSV 3D Dashboard

Upload a CSV and explore it as an interactive 3D dashboard.

This project is now a static site designed for GitHub Pages.

## Project structure

- `site/index.html`: the main upload page
- `site/assets/app.js`: browser-side CSV parsing and dashboard generation
- `site/favicon.ico`: the favicon used by the static site
- `csv_3d_dashboard.py`: the original Python CLI generator for standalone HTML export

## Features

- Drag-and-drop CSV upload
- Generic CSV support, not tied to a specific domain
- Browser-side CSV parsing and analysis; the page still loads pinned third-party libraries from CDNs
- Interactive 3D scatter plot with selectable axes, color, size, and hover fields
- Modern dark shell UI with a white chart surface
- Static deployment on GitHub Pages
- Standalone Python HTML generation from the command line

## Local preview

Because this is now a static site, you can preview the `site/` directory with any static file server.

Examples:

```bash
python3 -m http.server 8000 --directory site
```

Then open:

```text
http://127.0.0.1:8000
```

## Smoke tests

The static app has a dependency-free JavaScript smoke test for core statistics and data-prep behavior:

```bash
node tests/stat_smoke.test.js
```

## Python CLI usage

The original Python exporter still works:

```bash
python3 csv_3d_dashboard.py /path/to/data.csv
```

That writes a standalone HTML dashboard next to the CSV by default.

## Python dependencies

The static site does not need Python packages.

`requirements.txt` only exists for the optional CLI exporter:

```bash
python3 -m pip install -r requirements.txt
```

## GitHub Pages

This repo includes a Pages workflow at `.github/workflows/deploy-pages.yml`.

It deploys the static site from `./site`.
