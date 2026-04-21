# CSV 3D Dashboard

Upload a CSV and explore it as an interactive 3D dashboard.

This project currently includes:

- `app.py`: a Flask app with drag-and-drop CSV upload
- `templates/index.html`: the upload UI
- `csv_3d_dashboard.py`: the dashboard generator used by both the web app and CLI
- `static/favicon.png`: the favicon shared with `snorribjarkason.com`

## Features

- Drag-and-drop CSV upload
- Generic CSV support, not tied to a specific domain
- Interactive 3D scatter plot with selectable axes, color, size, and hover fields
- Modern dark shell UI with a white chart surface
- Standalone HTML dashboard generation from the command line

## Run locally

1. Install dependencies:

```bash
python3 -m pip install -r requirements.txt
```

If your Python environment is externally managed, use a virtualenv instead:

```bash
python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
```

2. Start the app:

```bash
./.venv/bin/python app.py
```

Or, if you installed globally:

```bash
python3 app.py
```

3. Open:

```text
http://127.0.0.1:5000
```

4. Drop in a CSV file and the dashboard will appear on the right.

## CLI usage

You can still generate a standalone HTML dashboard directly from a CSV:

```bash
python3 csv_3d_dashboard.py /path/to/data.csv
```

That writes an HTML file next to the CSV by default.

## GitHub Pages

This repo includes a Pages workflow at `.github/workflows/deploy-pages.yml`.

Important: GitHub Pages only hosts static files. The current app uses Flask for upload and dashboard generation, so it cannot be deployed to GitHub Pages as-is.

The workflow is prepared for a future static build in `./site` and will fail until that static output exists.
