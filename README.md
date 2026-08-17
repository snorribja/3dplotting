# CSV 3D Explorer

CSV 3D Explorer is a static, browser-based workspace for uploading a CSV, preparing the data, and exploring it with interactive Plotly charts and summary statistics. There is no backend service: CSV parsing, transformations, analysis, and chart generation all run in the browser.

The app is designed to deploy directly to GitHub Pages from `site/`. It loads Plotly, PapaParse, and fonts from CDNs, so the static app needs network access for a full first load.

## Features

- Drag-and-drop or file-picker CSV upload with generic CSV support.
- Browser-side CSV parsing, numeric column detection, and local session restore through IndexedDB with a localStorage fallback.
- Data Prep workspace with draft previews, keep/exclude row rules, log10 transforms, z-score standardization, min-max normalization, categorical one-hot encoding, and apply/reset controls.
- Interactive 3D scatter dashboard with selectable X/Y/Z axes, numeric or low-cardinality categorical color, marker sizing, hover ID, optional log axes, opacity and size controls, row counts, persisted view state, and PNG export.
- Statistics tab with searchable numeric and categorical selectors, downloadable CSV summaries, descriptive numeric stats, categorical summaries, and missing-value review.
- Distribution explorer with histogram, KDE, and CDF views; optional overlays; split-by categorical grouping; bin and normalization controls; box and violin plots; reset and PNG export.
- Correlation explorer with pair scatter plots, Pearson and Spearman metrics, linear or polynomial trendlines, point alpha control, selectable correlation matrices, focused scatter from heatmap cells, reset, and PNG export.
- Data Prep diagnostics for outlier review using IQR fences, z-score, or modified z-score thresholds, with column summaries, ranked flagged rows, scatter/histogram review, plot export, and generated exclusion rules.
- Optional Python CLI that builds a standalone self-contained HTML 3D dashboard from a CSV.

The 3D dashboard needs at least three numeric columns. Categorical color and split controls are limited to low-cardinality columns so plots stay readable.

## Project Structure

- `site/index.html`: static app shell and UI markup.
- `site/assets/app.js`: browser-side parsing, data prep, statistics, charts, persistence, and export logic.
- `site/assets/styles.css`: app styling.
- `site/favicon.ico`, `site/robots.txt`, `site/.nojekyll`: static site assets and GitHub Pages support.
- `csv_3d_dashboard.py`: optional Python CLI exporter for standalone HTML dashboards.
- `tests/stat_smoke.test.js`: dependency-free JavaScript smoke tests for statistics, transforms, correlations, and outlier helpers.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow for `./site`.

## Local Preview

Serve the static site from the `site/` directory:

```bash
python3 -m http.server 8000 --directory site
```

Then open:

```text
http://127.0.0.1:8000
```

## Tests

The smoke test uses only Node built-ins:

```bash
node tests/stat_smoke.test.js
```

## Optional Python CLI

Install the CLI dependencies only if you want to generate standalone HTML files from the command line:

```bash
python3 -m pip install -r requirements.txt
```

Generate a dashboard:

```bash
python3 csv_3d_dashboard.py /path/to/data.csv
```

By default, this writes `<csv_stem>_3d_dashboard.html` next to the CSV. The CLI also supports:

```bash
python3 csv_3d_dashboard.py /path/to/data.csv --output dashboard.html --title "My Dashboard" --max-categorical-levels 30
```

The generated HTML embeds the data and Plotly JavaScript so it can be shared as a single file.

## Deployment

Pushing to `main` runs the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`, which publishes the static site from `./site`.
