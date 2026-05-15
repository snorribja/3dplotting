"""Build a self-contained interactive 3D dashboard from a CSV file.

Usage:
    python csv_3d_dashboard.py /path/to/data.csv

This writes a standalone HTML file next to the CSV by default. The HTML embeds
both the data and Plotly JS, so the output can be shared as a single file.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys
from typing import Any

import pandas as pd

LOCAL_VENDOR = Path(__file__).resolve().parents[1] / ".vendor"
if LOCAL_VENDOR.exists() and str(LOCAL_VENDOR) not in sys.path:
    sys.path.insert(0, str(LOCAL_VENDOR))

try:
    from plotly.offline import get_plotlyjs
except ImportError as exc:  # pragma: no cover - import guard
    raise SystemExit(
        "This script requires plotly. Install it with `pip install plotly pandas`."
    ) from exc


DEFAULT_TITLE_SUFFIX = "3D Interactive Dashboard"
MAX_CATEGORICAL_COLOR_LEVELS = 30
NONE_OPTION = "__none__"


def _resolve_output_path(csv_path: Path, output_path: Path | None) -> Path:
    if output_path is None:
        return csv_path.with_name(f"{csv_path.stem}_3d_dashboard.html")
    if output_path.is_absolute():
        return output_path
    return Path.cwd() / output_path


def _normalize_series(series: pd.Series) -> pd.Series:
    if pd.api.types.is_string_dtype(series) or series.dtype == object:
        normalized = series.astype("string").str.strip()
        return normalized.mask(normalized == "")
    return series


def _coerce_numeric_like_columns(df: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    prepared = df.copy()
    numeric_columns: list[str] = []

    for column in prepared.columns:
        series = _normalize_series(prepared[column])
        prepared[column] = series

        non_null = series.dropna()
        if non_null.empty:
            prepared[column] = series.mask(series.notna(), pd.NA)
            continue

        if pd.api.types.is_bool_dtype(series):
            prepared[column] = series.astype("Int64")
            numeric_columns.append(column)
            continue

        if pd.api.types.is_numeric_dtype(series):
            numeric_columns.append(column)
            continue

        numeric_candidate = pd.to_numeric(non_null, errors="coerce")
        if numeric_candidate.notna().all():
            prepared[column] = pd.to_numeric(series, errors="coerce")
            numeric_columns.append(column)

    return prepared, sorted(dict.fromkeys(numeric_columns))


def _categorical_color_columns(
    df: pd.DataFrame,
    numeric_columns: list[str],
    *,
    max_levels: int,
) -> list[str]:
    numeric_set = set(numeric_columns)
    color_columns: list[str] = []

    for column in df.columns:
        if column in numeric_set:
            color_columns.append(column)
            continue

        series = _normalize_series(df[column])
        unique_values = series.dropna().astype("string").unique().tolist()
        if 1 <= len(unique_values) <= max_levels:
            color_columns.append(column)

    return sorted(dict.fromkeys(color_columns))


def _default_column(
    options: list[str],
    preferred: tuple[str, ...],
    *,
    excluded: set[str] | None = None,
) -> str | None:
    excluded = excluded or set()
    for column in preferred:
        if column in options and column not in excluded:
            return column
    for column in options:
        if column not in excluded:
            return column
    return None


def _json_records(df: pd.DataFrame) -> list[dict[str, object]]:
    return json.loads(df.to_json(orient="records", date_format="iso"))


def _build_payload(df: pd.DataFrame, *, title: str, max_categorical_levels: int) -> dict[str, Any]:
    prepared, numeric_columns = _coerce_numeric_like_columns(df)

    if len(numeric_columns) < 3:
        raise ValueError(
            "The CSV needs at least 3 numeric columns to build a 3D scatter plot."
        )

    color_columns = _categorical_color_columns(
        prepared,
        numeric_columns,
        max_levels=max_categorical_levels,
    )
    id_columns = prepared.columns.astype(str).tolist()

    used_axes: set[str] = set()
    default_x = _default_column(
        numeric_columns,
        (),
        excluded=used_axes,
    )
    if default_x is None:
        raise ValueError("Could not choose a default X axis.")
    used_axes.add(default_x)

    default_y = _default_column(
        numeric_columns,
        (),
        excluded=used_axes,
    )
    if default_y is None:
        raise ValueError("Could not choose a default Y axis.")
    used_axes.add(default_y)

    default_z = _default_column(
        numeric_columns,
        (),
        excluded=used_axes,
    )
    if default_z is None:
        raise ValueError("Could not choose a default Z axis.")

    default_hover_id = _default_column(
        id_columns,
        (),
    )

    return {
        "title": title,
        "records": _json_records(prepared),
        "columns": id_columns,
        "display_names": {column: column for column in id_columns},
        "numeric_columns": numeric_columns,
        "color_columns": color_columns,
        "defaults": {
            "x": default_x,
            "y": default_y,
            "z": default_z,
            "color": NONE_OPTION,
            "size": NONE_OPTION,
            "hover_id": default_hover_id or NONE_OPTION,
        },
    }


def _dashboard_html(*, payload_json: str, plotly_js: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSV 3D Explorer</title>
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="apple-touch-icon" href="favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style>
    :root {{
      --bg: #131418;
      --panel: rgba(29, 31, 39, 0.82);
      --panel-strong: rgba(19, 20, 24, 0.96);
      --ink: #f3f4f7;
      --muted: #9197a8;
      --line: rgba(86, 74, 104, 0.38);
      --accent: #ae5cff;
      --accent-soft: #8d34ea;
      --shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
    }}
    * {{
      box-sizing: border-box;
    }}
    body {{
      margin: 0;
      min-height: 100vh;
      min-height: 100dvh;
      overflow: hidden;
      font-family: "Inter", "Segoe UI Variable", "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(174, 92, 255, 0.18), transparent 22%),
        radial-gradient(circle at 85% 12%, rgba(141, 52, 234, 0.18), transparent 22%),
        linear-gradient(180deg, #131418 0%, #17181d 50%, #131418 100%);
      color: var(--ink);
    }}
    .shell {{
      display: grid;
      grid-template-columns: 380px minmax(0, 1fr);
      min-height: 100vh;
      min-height: 100dvh;
      gap: 16px;
      padding: 16px;
    }}
    .shell > * {{
      min-width: 0;
    }}
    .controls {{
      background: linear-gradient(180deg, rgba(31, 33, 41, 0.96), rgba(21, 22, 28, 0.94));
      border: 1px solid var(--line);
      border-radius: 28px;
      box-shadow: var(--shadow);
      padding: 24px;
      overflow-y: auto;
      height: calc(100vh - 32px);
      height: calc(100dvh - 32px);
    }}
    .plot-area {{
      background: linear-gradient(180deg, rgba(27, 28, 36, 0.94), rgba(18, 19, 24, 0.98));
      border: 1px solid var(--line);
      border-radius: 28px;
      box-shadow: var(--shadow);
      padding: 14px;
      height: calc(100vh - 32px);
      height: calc(100dvh - 32px);
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 12px;
      overflow: hidden;
    }}
    h1 {{
      margin: 0 0 10px 0;
      font-size: 1.7rem;
      line-height: 1;
      letter-spacing: -0.04em;
      font-family: "Syne", "Inter", sans-serif;
    }}
    .subtle {{
      color: var(--muted);
      font-size: 0.94rem;
      line-height: 1.6;
      margin-bottom: 20px;
      max-width: 36ch;
    }}
    .group {{
      margin-bottom: 18px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(24, 26, 33, 0.9);
    }}
    .group-title {{
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 12px;
    }}
    label {{
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #dbeeff;
      letter-spacing: 0.03em;
    }}
    select, input[type="range"] {{
      width: 100%;
    }}
    input[type="range"] {{
      accent-color: var(--accent);
    }}
    select {{
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(86, 74, 104, 0.7);
      background: rgba(16, 17, 22, 0.78);
      color: var(--ink);
      font-size: 0.95rem;
      margin-bottom: 12px;
      outline: none;
    }}
    .check-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 10px;
    }}
    .check {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--ink);
    }}
    .range-row {{
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }}
    .range-value {{
      font-variant-numeric: tabular-nums;
      color: var(--muted);
      font-size: 0.9rem;
      min-width: 48px;
      text-align: right;
    }}
    .stats {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }}
    .stat {{
      padding: 14px;
      border-radius: 16px;
      background: rgba(16, 17, 22, 0.78);
      border: 1px solid var(--line);
    }}
    .stat-label {{
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--muted);
      margin-bottom: 6px;
    }}
    .stat-value {{
      font-size: 1.2rem;
      font-weight: 700;
    }}
    .plot-header {{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 12px 0;
    }}
    .plot-header-actions {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .plot-title {{
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }}
    .plot-note {{
      color: var(--muted);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }}
    .corr-small-button {{
      border: 1px solid rgba(174, 92, 255, 0.28);
      background: rgba(174, 92, 255, 0.12);
      color: #f4e8ff;
      border-radius: 999px;
      padding: 9px 13px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.11em;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }}
    .corr-small-button:hover {{
      transform: translateY(-1px);
      border-color: rgba(174, 92, 255, 0.48);
      background: rgba(174, 92, 255, 0.2);
      color: #fff8ff;
    }}
    .axis-pills {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 12px;
    }}
    .axis-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(174, 92, 255, 0.1);
      border: 1px solid rgba(174, 92, 255, 0.14);
      color: #f2e8ff;
      font-size: 0.8rem;
    }}
    .axis-pill-label {{
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 0.72rem;
    }}
    #plot {{
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      border: 1px solid rgba(86, 74, 104, 0.32);
      border-radius: 22px;
      background: #ffffff;
    }}
    .small-note {{
      color: var(--muted);
      font-size: 0.84rem;
      line-height: 1.45;
      margin-top: 8px;
    }}
    @media (max-width: 1240px) {{
      .shell {{
        grid-template-columns: 340px minmax(0, 1fr);
      }}
      .controls {{
        padding: 20px;
      }}
    }}
    @media (max-width: 1080px) {{
      body {{
        overflow: auto;
      }}
      .shell {{
        grid-template-columns: 1fr;
      }}
      .controls {{
        height: auto;
      }}
      .plot-area {{
        height: auto;
      }}
      #plot {{
        height: min(72vh, 680px);
        min-height: 420px;
      }}
      .plot-header {{
        flex-direction: column;
      }}
      .plot-header-actions {{
        width: 100%;
        justify-content: space-between;
      }}
    }}
    @media (max-width: 720px) {{
      .shell {{
        padding: 12px;
        gap: 12px;
      }}
      .controls,
      .plot-area {{
        border-radius: 24px;
      }}
      .controls {{
        padding: 18px;
      }}
      #plot {{
        height: min(64vh, 560px);
        min-height: 340px;
      }}
      .stats {{
        grid-template-columns: 1fr;
      }}
      .plot-note {{
        white-space: normal;
      }}
    }}
  </style>
</head>
<body>
  <div class="shell">
    <aside class="controls">
      <h1 id="dashboard-title"></h1>
      <div class="subtle">
        Choose any numeric CSV columns for the X, Y, and Z axes. Color can use either numeric
        or low-cardinality categorical columns. The plot updates interactively as you change controls.
      </div>

      <div class="group">
        <div class="group-title">Axes</div>
        <label for="x-column">X axis</label>
        <select id="x-column"></select>
        <label for="y-column">Y axis</label>
        <select id="y-column"></select>
        <label for="z-column">Z axis</label>
        <select id="z-column"></select>
      </div>

      <div class="group">
        <div class="group-title">Appearance</div>
        <label for="color-column">Color</label>
        <select id="color-column"></select>
        <label for="size-column">Marker size</label>
        <select id="size-column"></select>
        <label for="hover-id-column">Hover id</label>
        <select id="hover-id-column"></select>
      </div>

      <div class="group">
        <div class="group-title">Transforms</div>
        <div class="check-grid">
          <label class="check"><input id="log-x" type="checkbox" />Log X</label>
          <label class="check"><input id="log-y" type="checkbox" />Log Y</label>
          <label class="check"><input id="log-z" type="checkbox" />Log Z</label>
        </div>
      </div>

      <div class="group">
        <div class="group-title">Marker Tuning</div>
        <div class="range-row">
          <label for="opacity-slider">Opacity</label>
          <div class="range-value" id="opacity-value"></div>
        </div>
        <input id="opacity-slider" type="range" min="0.15" max="1" step="0.05" value="0.8" />

        <div class="range-row" style="margin-top: 14px;">
          <label for="size-scale-slider">Size scale</label>
          <div class="range-value" id="size-scale-value"></div>
        </div>
        <input id="size-scale-slider" type="range" min="0.6" max="2.4" step="0.1" value="1.0" />
      </div>

      <div class="group">
        <div class="group-title">Summary</div>
        <div class="stats">
          <div class="stat">
            <div class="stat-label">CSV Rows</div>
            <div class="stat-value" id="total-rows"></div>
          </div>
          <div class="stat">
            <div class="stat-label">Plotted Rows</div>
            <div class="stat-value" id="plotted-rows"></div>
          </div>
        </div>
        <div class="small-note" id="status-note"></div>
      </div>
    </aside>

    <main class="plot-area">
      <div class="plot-header">
        <div class="plot-title" id="plot-title"></div>
        <div class="plot-header-actions">
          <div class="plot-note">Interactive 3D View</div>
          <button class="corr-small-button" id="save-plot-button" type="button">Save Plot</button>
        </div>
      </div>
      <div class="axis-pills">
        <div class="axis-pill"><span class="axis-pill-label">X</span><span id="x-pill"></span></div>
        <div class="axis-pill"><span class="axis-pill-label">Y</span><span id="y-pill"></span></div>
        <div class="axis-pill"><span class="axis-pill-label">Z</span><span id="z-pill"></span></div>
      </div>
      <div id="plot"></div>
    </main>
  </div>

  <script>{plotly_js}</script>
  <script>
    const NONE_OPTION = "{NONE_OPTION}";
    const DATASET = {payload_json};
    const DEFAULT_DISCRETE_COLORS = [
      "#0f4c5c", "#2a9d8f", "#7fb069", "#e9c46a", "#f4a261",
      "#e76f51", "#577590", "#6d597a", "#bc4749", "#b56576",
      "#4d908e", "#90be6d", "#f8961e", "#f9844a", "#43aa8b"
    ];

    const xSelect = document.getElementById("x-column");
    const ySelect = document.getElementById("y-column");
    const zSelect = document.getElementById("z-column");
    const colorSelect = document.getElementById("color-column");
    const sizeSelect = document.getElementById("size-column");
    const hoverIdSelect = document.getElementById("hover-id-column");
    const logX = document.getElementById("log-x");
    const logY = document.getElementById("log-y");
    const logZ = document.getElementById("log-z");
    const opacitySlider = document.getElementById("opacity-slider");
    const sizeScaleSlider = document.getElementById("size-scale-slider");
    const opacityValue = document.getElementById("opacity-value");
    const sizeScaleValue = document.getElementById("size-scale-value");
    const totalRowsNode = document.getElementById("total-rows");
    const plottedRowsNode = document.getElementById("plotted-rows");
    const statusNote = document.getElementById("status-note");
    const titleNode = document.getElementById("dashboard-title");
    const plotTitleNode = document.getElementById("plot-title");
    const xPillNode = document.getElementById("x-pill");
    const yPillNode = document.getElementById("y-pill");
    const zPillNode = document.getElementById("z-pill");
    const plotNode = document.getElementById("plot");
    const savePlotButton = document.getElementById("save-plot-button");

    function populateSelect(select, options, selectedValue, includeNone = false) {{
      select.innerHTML = "";
      if (includeNone) {{
        const option = document.createElement("option");
        option.value = NONE_OPTION;
        option.textContent = "None";
        select.appendChild(option);
      }}

      options.forEach((value) => {{
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      }});

      if (selectedValue && [...select.options].some((option) => option.value === selectedValue)) {{
        select.value = selectedValue;
      }} else if (includeNone) {{
        select.value = NONE_OPTION;
      }} else if (select.options.length > 0) {{
        select.selectedIndex = 0;
      }}
    }}

    function toFiniteNumber(value) {{
      if (value === null || value === undefined || value === "") {{
        return null;
      }}
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    }}

    function displayValue(value) {{
      if (value === null || value === undefined || value === "") {{
        return "Missing";
      }}
      if (typeof value === "number") {{
        if (Number.isInteger(value)) {{
          return String(value);
        }}
        return value.toFixed(4).replace(/\\.0+$/, "").replace(/(\\.\\d*?)0+$/, "$1");
      }}
      return String(value);
    }}

    function safeFilenamePart(value) {{
      return String(value || "plot")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "") || "plot";
    }}

    function quantile(sortedValues, q) {{
      if (!sortedValues.length) {{
        return null;
      }}
      if (sortedValues.length === 1) {{
        return sortedValues[0];
      }}
      const position = (sortedValues.length - 1) * q;
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      if (lower === upper) {{
        return sortedValues[lower];
      }}
      const fraction = position - lower;
      return sortedValues[lower] * (1 - fraction) + sortedValues[upper] * fraction;
    }}

    function scaledMarkerSizes(points, sizeColumn, sizeScale) {{
      if (sizeColumn === NONE_OPTION) {{
        return points.map(() => 7 * sizeScale);
      }}

      const values = points
        .map((point) => toFiniteNumber(point.row[sizeColumn]))
        .filter((value) => value !== null)
        .sort((a, b) => a - b);

      if (values.length < 2) {{
        return points.map(() => 7 * sizeScale);
      }}

      const lower = quantile(values, 0.05);
      const upper = quantile(values, 0.95);
      if (lower === null || upper === null || upper <= lower) {{
        return points.map(() => 7 * sizeScale);
      }}

      return points.map((point) => {{
        const value = toFiniteNumber(point.row[sizeColumn]);
        if (value === null) {{
          return 7 * sizeScale;
        }}
        const clipped = Math.max(lower, Math.min(upper, value));
        const scaled = 5 + (9 * (clipped - lower)) / (upper - lower);
        return scaled * sizeScale;
      }});
    }}

    function alignedPoints() {{
      const xColumn = xSelect.value;
      const yColumn = ySelect.value;
      const zColumn = zSelect.value;
      const useLogX = logX.checked;
      const useLogY = logY.checked;
      const useLogZ = logZ.checked;

      const points = [];
      let excludedForMissing = 0;
      let excludedForLog = 0;

      DATASET.records.forEach((row) => {{
        const rawX = toFiniteNumber(row[xColumn]);
        const rawY = toFiniteNumber(row[yColumn]);
        const rawZ = toFiniteNumber(row[zColumn]);

        if (rawX === null || rawY === null || rawZ === null) {{
          excludedForMissing += 1;
          return;
        }}
        if ((useLogX && rawX <= 0) || (useLogY && rawY <= 0) || (useLogZ && rawZ <= 0)) {{
          excludedForLog += 1;
          return;
        }}

        points.push({{
          row,
          x: useLogX ? Math.log10(rawX) : rawX,
          y: useLogY ? Math.log10(rawY) : rawY,
          z: useLogZ ? Math.log10(rawZ) : rawZ,
        }});
      }});

      return {{ points, excludedForMissing, excludedForLog }};
    }}

    function customData(points, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {{
      return points.map((point) => [
        hoverIdColumn === NONE_OPTION ? "" : displayValue(point.row[hoverIdColumn]),
        displayValue(point.row[xColumn]),
        displayValue(point.row[yColumn]),
        displayValue(point.row[zColumn]),
        colorColumn === NONE_OPTION ? "" : displayValue(point.row[colorColumn]),
        sizeColumn === NONE_OPTION ? "" : displayValue(point.row[sizeColumn]),
      ]);
    }}

    function hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {{
      const lines = [];
      if (hoverIdColumn !== NONE_OPTION) {{
        lines.push("<b>%{{customdata[0]}}</b>");
      }}
      lines.push(`${{xColumn}}: %{{customdata[1]}}`);
      lines.push(`${{yColumn}}: %{{customdata[2]}}`);
      lines.push(`${{zColumn}}: %{{customdata[3]}}`);
      if (colorColumn !== NONE_OPTION) {{
        lines.push(`${{colorColumn}}: %{{customdata[4]}}`);
      }}
      if (sizeColumn !== NONE_OPTION) {{
        lines.push(`${{sizeColumn}}: %{{customdata[5]}}`);
      }}
      lines.push("<extra></extra>");
      return lines.join("<br>");
    }}

    function categoricalColorValue(value) {{
      if (value === null || value === undefined || value === "") {{
        return "Missing";
      }}
      return String(value);
    }}

    function categoryOrder(points, colorColumn) {{
      const counts = new Map();
      points.forEach((point) => {{
        const key = categoricalColorValue(point.row[colorColumn]);
        counts.set(key, (counts.get(key) || 0) + 1);
      }});

      return [...counts.entries()]
        .sort((a, b) => {{
          if (a[0] === "Missing") return 1;
          if (b[0] === "Missing") return -1;
          if (b[1] !== a[1]) return b[1] - a[1];
          return a[0].localeCompare(b[0]);
        }})
        .map(([key]) => key);
    }}

    function baseLayout(xColumn, yColumn, zColumn) {{
      const xTitle = logX.checked ? `log10(${{xColumn}})` : xColumn;
      const yTitle = logY.checked ? `log10(${{yColumn}})` : yColumn;
      const zTitle = logZ.checked ? `log10(${{zColumn}})` : zColumn;

      return {{
        paper_bgcolor: "#ffffff",
        plot_bgcolor: "#ffffff",
        font: {{
          family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif',
          color: "#102132",
        }},
        margin: {{ l: 24, r: 24, t: 28, b: 24 }},
        legend: {{
          orientation: "h",
          yanchor: "bottom",
          y: 1.01,
          xanchor: "left",
          x: 0,
          bgcolor: "rgba(0,0,0,0)",
          font: {{ color: "#102132" }},
        }},
        scene: {{
          xaxis: {{
            title: {{ text: xTitle }},
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          }},
          yaxis: {{
            title: {{ text: yTitle }},
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          }},
          zaxis: {{
            title: {{ text: zTitle }},
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          }},
          camera: {{
            eye: {{ x: 1.55, y: 1.6, z: 1.15 }},
          }},
        }},
      }};
    }}

    function singleTrace(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {{
      return [{{
        type: "scatter3d",
        mode: "markers",
        name: "Rows",
        x: points.map((point) => point.x),
        y: points.map((point) => point.y),
        z: points.map((point) => point.z),
        customdata: customData(points, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
        hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
        marker: {{
          size: markerSizes,
          opacity: Number(opacitySlider.value),
          color: "#0f4c5c",
          line: {{ width: 0 }},
        }},
      }}];
    }}

    function categoricalTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {{
      const order = categoryOrder(points, colorColumn);
      const colorMap = new Map(order.map((category, index) => [category, DEFAULT_DISCRETE_COLORS[index % DEFAULT_DISCRETE_COLORS.length]]));

      return order.map((category) => {{
        const categoryPoints = [];
        const categorySizes = [];
        points.forEach((point, index) => {{
          if (categoricalColorValue(point.row[colorColumn]) === category) {{
            categoryPoints.push(point);
            categorySizes.push(markerSizes[index]);
          }}
        }});

        return {{
          type: "scatter3d",
          mode: "markers",
          name: category,
          x: categoryPoints.map((point) => point.x),
          y: categoryPoints.map((point) => point.y),
          z: categoryPoints.map((point) => point.z),
          customdata: customData(categoryPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {{
            size: categorySizes,
            opacity: Number(opacitySlider.value),
            color: colorMap.get(category),
            line: {{ width: 0 }},
          }},
        }};
      }});
    }}

    function numericColorTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {{
      const coloredPoints = [];
      const coloredSizes = [];
      const coloredValues = [];
      const missingPoints = [];
      const missingSizes = [];

      points.forEach((point, index) => {{
        const value = toFiniteNumber(point.row[colorColumn]);
        if (value === null) {{
          missingPoints.push(point);
          missingSizes.push(markerSizes[index]);
          return;
        }}
        coloredPoints.push(point);
        coloredSizes.push(markerSizes[index]);
        coloredValues.push(value);
      }});

      const traces = [];
      if (coloredPoints.length) {{
        traces.push({{
          type: "scatter3d",
          mode: "markers",
          name: colorColumn,
          x: coloredPoints.map((point) => point.x),
          y: coloredPoints.map((point) => point.y),
          z: coloredPoints.map((point) => point.z),
          customdata: customData(coloredPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {{
            size: coloredSizes,
            opacity: Number(opacitySlider.value),
            color: coloredValues,
            colorscale: "Viridis",
            colorbar: {{ title: colorColumn }},
            line: {{ width: 0 }},
          }},
        }});
      }}

      if (missingPoints.length) {{
        traces.push({{
          type: "scatter3d",
          mode: "markers",
          name: `Missing ${{colorColumn}}`,
          x: missingPoints.map((point) => point.x),
          y: missingPoints.map((point) => point.y),
          z: missingPoints.map((point) => point.z),
          customdata: customData(missingPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {{
            size: missingSizes,
            opacity: Number(opacitySlider.value),
            color: "#c9c1b1",
            line: {{ width: 0 }},
          }},
        }});
      }}

      return traces;
    }}

    function render() {{
      const xColumn = xSelect.value;
      const yColumn = ySelect.value;
      const zColumn = zSelect.value;
      const colorColumn = colorSelect.value;
      const sizeColumn = sizeSelect.value;
      const hoverIdColumn = hoverIdSelect.value;
      const sizeScale = Number(sizeScaleSlider.value);

      const aligned = alignedPoints();
      const points = aligned.points;
      const markerSizes = scaledMarkerSizes(points, sizeColumn, sizeScale);

      let traces;
      if (colorColumn === NONE_OPTION) {{
        traces = singleTrace(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      }} else if (DATASET.numeric_columns.includes(colorColumn)) {{
        traces = numericColorTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      }} else {{
        traces = categoricalTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      }}

      const layout = baseLayout(xColumn, yColumn, zColumn);

      Plotly.react("plot", traces, layout, {{
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["lasso2d", "select2d"],
      }});

      totalRowsNode.textContent = DATASET.records.length.toLocaleString();
      plottedRowsNode.textContent = points.length.toLocaleString();
      plotTitleNode.textContent = DATASET.title;
      xPillNode.textContent = logX.checked ? `log10(${{xColumn}})` : xColumn;
      yPillNode.textContent = logY.checked ? `log10(${{yColumn}})` : yColumn;
      zPillNode.textContent = logZ.checked ? `log10(${{zColumn}})` : zColumn;

      const noteParts = [];
      if (aligned.excludedForMissing) {{
        noteParts.push(`${{aligned.excludedForMissing}} rows excluded for missing X/Y/Z values.`);
      }}
      if (aligned.excludedForLog) {{
        noteParts.push(`${{aligned.excludedForLog}} rows excluded because log axes need values > 0.`);
      }}
      statusNote.textContent = noteParts.length ? noteParts.join(" ") : "All rows with valid axis values are shown.";
    }}

    function updateRangeLabels() {{
      opacityValue.textContent = Number(opacitySlider.value).toFixed(2);
      sizeScaleValue.textContent = `${{Number(sizeScaleSlider.value).toFixed(1)}}x`;
    }}

    function downloadCurrentPlotImage() {{
      if (typeof Plotly === "undefined" || !plotNode || !plotNode.data) {{
        return;
      }}
      const filename = [
        safeFilenamePart(DATASET.title),
        "3d",
        safeFilenamePart(xSelect.value),
        safeFilenamePart(ySelect.value),
        safeFilenamePart(zSelect.value),
      ].join("_");
      Plotly.downloadImage(plotNode, {{
        format: "png",
        scale: 2,
        width: 1400,
        height: 900,
        filename,
      }});
    }}

    function resizePlot() {{
      if (typeof Plotly === "undefined" || !plotNode || !plotNode.data) {{
        return;
      }}
      Plotly.Plots.resize(plotNode);
    }}

    function initializeResponsiveBehavior() {{
      window.addEventListener("resize", resizePlot);
    }}

    function initialize() {{
      titleNode.textContent = DATASET.title;

      populateSelect(xSelect, DATASET.numeric_columns, DATASET.defaults.x);
      populateSelect(ySelect, DATASET.numeric_columns, DATASET.defaults.y);
      populateSelect(zSelect, DATASET.numeric_columns, DATASET.defaults.z);
      populateSelect(colorSelect, DATASET.color_columns, DATASET.defaults.color, true);
      populateSelect(sizeSelect, DATASET.numeric_columns, DATASET.defaults.size, true);
      populateSelect(hoverIdSelect, DATASET.columns, DATASET.defaults.hover_id, true);

      updateRangeLabels();

      [
        xSelect, ySelect, zSelect, colorSelect, sizeSelect, hoverIdSelect,
        logX, logY, logZ, opacitySlider, sizeScaleSlider
      ].forEach((element) => {{
        element.addEventListener("input", () => {{
          updateRangeLabels();
          render();
        }});
        element.addEventListener("change", () => {{
          updateRangeLabels();
          render();
        }});
      }});

      savePlotButton.addEventListener("click", downloadCurrentPlotImage);

      render();
      initializeResponsiveBehavior();
    }}

    initialize();
  </script>
</body>
</html>
"""


def build_dashboard_payload(
    df: pd.DataFrame,
    *,
    title: str,
    max_categorical_levels: int = MAX_CATEGORICAL_COLOR_LEVELS,
) -> dict[str, Any]:
    return _build_payload(
        df,
        title=title,
        max_categorical_levels=max_categorical_levels,
    )


def build_dashboard_html_from_dataframe(
    df: pd.DataFrame,
    *,
    title: str,
    max_categorical_levels: int = MAX_CATEGORICAL_COLOR_LEVELS,
) -> str:
    payload = build_dashboard_payload(
        df,
        title=title,
        max_categorical_levels=max_categorical_levels,
    )
    return _dashboard_html(
        payload_json=json.dumps(payload, ensure_ascii=True),
        plotly_js=get_plotlyjs(),
    )


def build_dashboard_html_from_csv(
    csv_path: Path,
    *,
    title: str | None = None,
    max_categorical_levels: int = MAX_CATEGORICAL_COLOR_LEVELS,
) -> tuple[pd.DataFrame, str]:
    resolved_csv_path = csv_path.expanduser().resolve()
    df = pd.read_csv(resolved_csv_path)
    dashboard_title = title or f"{resolved_csv_path.stem} {DEFAULT_TITLE_SUFFIX}"
    html = build_dashboard_html_from_dataframe(
        df,
        title=dashboard_title,
        max_categorical_levels=max_categorical_levels,
    )
    return df, html


def write_dashboard_html(
    csv_path: Path,
    *,
    output_path: Path | None = None,
    title: str | None = None,
    max_categorical_levels: int = MAX_CATEGORICAL_COLOR_LEVELS,
) -> tuple[Path, pd.DataFrame, dict[str, Any]]:
    resolved_csv_path = csv_path.expanduser().resolve()
    if not resolved_csv_path.exists():
        raise FileNotFoundError(f"CSV not found: {resolved_csv_path}")

    dashboard_title = title or f"{resolved_csv_path.stem} {DEFAULT_TITLE_SUFFIX}"
    final_output_path = _resolve_output_path(resolved_csv_path, output_path)
    df = pd.read_csv(resolved_csv_path)
    payload = build_dashboard_payload(
        df,
        title=dashboard_title,
        max_categorical_levels=max_categorical_levels,
    )
    html = _dashboard_html(
        payload_json=json.dumps(payload, ensure_ascii=True),
        plotly_js=get_plotlyjs(),
    )

    final_output_path.parent.mkdir(parents=True, exist_ok=True)
    final_output_path.write_text(html, encoding="utf-8")
    return final_output_path, df, payload


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Build a standalone interactive 3D HTML dashboard from a CSV file."
    )
    parser.add_argument("csv_path", type=Path, help="Path to the source CSV.")
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Optional HTML output path. Defaults to <csv_stem>_3d_dashboard.html.",
    )
    parser.add_argument(
        "--title",
        default=None,
        help="Optional dashboard title. Defaults to '<csv filename> 3D Interactive Dashboard'.",
    )
    parser.add_argument(
        "--max-categorical-levels",
        type=int,
        default=MAX_CATEGORICAL_COLOR_LEVELS,
        help="Maximum unique levels for a non-numeric column to be offered as a color field.",
    )
    return parser


def main() -> int:
    args = _parser().parse_args()
    try:
        output_path, df, payload = write_dashboard_html(
            args.csv_path,
            output_path=args.output,
            title=args.title,
            max_categorical_levels=args.max_categorical_levels,
        )
    except (FileNotFoundError, ValueError, pd.errors.ParserError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Wrote {output_path}")
    print(f"Rows: {len(df)}")
    print(f"Columns: {len(df.columns)}")
    print(f"Numeric columns available for axes: {len(payload['numeric_columns'])}")
    print(f"Color columns available: {len(payload['color_columns'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
