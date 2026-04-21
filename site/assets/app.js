const DEFAULT_TITLE_SUFFIX = "3D Interactive Dashboard";
const MAX_CATEGORICAL_COLOR_LEVELS = 30;
const NONE_OPTION = "__none__";

const form = document.getElementById("upload-form");
const fileInput = document.getElementById("csv-file");
const dropzone = document.getElementById("dropzone");
const dropzoneTitle = document.getElementById("dropzone-title");
const dropzoneSubtitle = document.getElementById("dropzone-subtitle");
const frame = document.getElementById("dashboard-frame");
const meta = document.getElementById("meta");
const error = document.getElementById("error");
const viewerTitle = document.getElementById("viewer-title");
const clearButton = document.getElementById("clear-button");
const emptyState = document.getElementById("empty-state");

function setSelectedFile(file) {
  if (!file) {
    dropzoneTitle.textContent = "Drag a CSV here";
    dropzoneSubtitle.textContent = "Drop it in or click to browse from your machine.";
    return;
  }
  dropzoneTitle.textContent = file.name;
  dropzoneSubtitle.textContent = `${(file.size / 1024).toFixed(1)} KB selected`;
}

function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}

function clearError() {
  error.textContent = "";
  error.style.display = "none";
}

function showMeta(message) {
  meta.textContent = message;
  meta.style.display = "block";
}

function clearMeta() {
  meta.textContent = "";
  meta.style.display = "none";
}

function normalizeValue(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  return value;
}

function toFiniteNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function coerceNumericLikeColumns(records, columns) {
  const prepared = records.map((row) => ({ ...row }));
  const numericColumns = [];

  columns.forEach((column) => {
    const values = prepared.map((row) => normalizeValue(row[column]));
    const nonNull = values.filter((value) => value !== null);

    let isNumeric = true;
    for (const value of nonNull) {
      if (typeof value === "boolean") {
        continue;
      }
      if (typeof value === "number" && Number.isFinite(value)) {
        continue;
      }
      if (toFiniteNumber(value) === null) {
        isNumeric = false;
        break;
      }
    }

    prepared.forEach((row) => {
      const value = normalizeValue(row[column]);
      if (value === null) {
        row[column] = null;
      } else if (isNumeric) {
        row[column] = typeof value === "boolean" ? (value ? 1 : 0) : toFiniteNumber(value);
      } else {
        row[column] = value;
      }
    });

    if (isNumeric) {
      numericColumns.push(column);
    }
  });

  return {
    prepared,
    numericColumns: [...new Set(numericColumns)].sort(),
  };
}

function categoricalColorColumns(records, columns, numericColumns, maxLevels) {
  const numericSet = new Set(numericColumns);
  const colorColumns = [];

  columns.forEach((column) => {
    if (numericSet.has(column)) {
      colorColumns.push(column);
      return;
    }

    const uniqueValues = new Set();
    records.forEach((row) => {
      const value = normalizeValue(row[column]);
      if (value !== null) {
        uniqueValues.add(String(value));
      }
    });

    if (uniqueValues.size >= 1 && uniqueValues.size <= maxLevels) {
      colorColumns.push(column);
    }
  });

  return [...new Set(colorColumns)].sort();
}

function defaultColumn(options, excluded = new Set()) {
  for (const option of options) {
    if (!excluded.has(option)) {
      return option;
    }
  }
  return null;
}

function buildPayload(records, title) {
  const columns = records.length ? Object.keys(records[0]) : [];
  const { prepared, numericColumns } = coerceNumericLikeColumns(records, columns);

  if (numericColumns.length < 3) {
    throw new Error("The CSV needs at least 3 numeric columns to build a 3D scatter plot.");
  }

  const colorColumns = categoricalColorColumns(
    prepared,
    columns,
    numericColumns,
    MAX_CATEGORICAL_COLOR_LEVELS,
  );

  const usedAxes = new Set();
  const defaultX = defaultColumn(numericColumns, usedAxes);
  if (!defaultX) {
    throw new Error("Could not choose a default X axis.");
  }
  usedAxes.add(defaultX);

  const defaultY = defaultColumn(numericColumns, usedAxes);
  if (!defaultY) {
    throw new Error("Could not choose a default Y axis.");
  }
  usedAxes.add(defaultY);

  const defaultZ = defaultColumn(numericColumns, usedAxes);
  if (!defaultZ) {
    throw new Error("Could not choose a default Z axis.");
  }

  return {
    title,
    records: prepared,
    columns,
    numeric_columns: numericColumns,
    color_columns: colorColumns,
    defaults: {
      x: defaultX,
      y: defaultY,
      z: defaultZ,
      color: defaultColumn(colorColumns) || NONE_OPTION,
      size: defaultColumn(numericColumns, new Set([defaultX, defaultY, defaultZ])) || NONE_OPTION,
      hover_id: defaultColumn(columns) || NONE_OPTION,
    },
  };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildDashboardHtml(payload) {
  const payloadJson = JSON.stringify(payload).replaceAll("</script>", "<\\/script>");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(payload.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #131418;
      --panel: rgba(29, 31, 39, 0.82);
      --ink: #f3f4f7;
      --muted: #9197a8;
      --line: rgba(86, 74, 104, 0.38);
      --accent: #ae5cff;
      --accent-soft: #8d34ea;
      --shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
    }
    * { box-sizing: border-box; }
    body {
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
    }
    .shell {
      display: grid;
      grid-template-columns: 380px minmax(0, 1fr);
      min-height: 100vh;
      min-height: 100dvh;
      gap: 16px;
      padding: 16px;
    }
    .controls {
      background: linear-gradient(180deg, rgba(31, 33, 41, 0.96), rgba(21, 22, 28, 0.94));
      border: 1px solid var(--line);
      border-radius: 28px;
      box-shadow: var(--shadow);
      padding: 24px;
      overflow-y: auto;
      height: calc(100vh - 32px);
      height: calc(100dvh - 32px);
    }
    .plot-area {
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
    }
    h1 {
      margin: 0 0 10px 0;
      font-size: 1.7rem;
      line-height: 1;
      letter-spacing: -0.04em;
      font-family: "Syne", "Inter", sans-serif;
    }
    .subtle {
      color: var(--muted);
      font-size: 0.94rem;
      line-height: 1.6;
      margin-bottom: 20px;
      max-width: 36ch;
    }
    .group {
      margin-bottom: 18px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(24, 26, 33, 0.9);
    }
    .group-title {
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #dbeeff;
      letter-spacing: 0.03em;
    }
    select, input[type="range"] { width: 100%; }
    input[type="range"] { accent-color: var(--accent); }
    select {
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(86, 74, 104, 0.7);
      background: rgba(16, 17, 22, 0.78);
      color: var(--ink);
      font-size: 0.95rem;
      margin-bottom: 12px;
      outline: none;
    }
    .check-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--ink);
    }
    .range-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }
    .range-value {
      font-variant-numeric: tabular-nums;
      color: var(--muted);
      font-size: 0.9rem;
      min-width: 48px;
      text-align: right;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .stat {
      padding: 14px;
      border-radius: 16px;
      background: rgba(16, 17, 22, 0.78);
      border: 1px solid var(--line);
    }
    .stat-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--muted);
      margin-bottom: 6px;
    }
    .stat-value {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .plot-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 12px 0;
    }
    .plot-title {
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .plot-note {
      color: var(--muted);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }
    .axis-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 12px;
    }
    .axis-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(174, 92, 255, 0.1);
      border: 1px solid rgba(174, 92, 255, 0.14);
      color: #f2e8ff;
      font-size: 0.8rem;
    }
    .axis-pill-label {
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 0.72rem;
    }
    #plot {
      width: 100%;
      height: 100%;
      min-height: 0;
      border: 1px solid rgba(86, 74, 104, 0.32);
      border-radius: 22px;
      background: #ffffff;
    }
    .small-note {
      color: var(--muted);
      font-size: 0.84rem;
      line-height: 1.45;
      margin-top: 8px;
    }
    @media (max-width: 1080px) {
      body { overflow: auto; }
      .shell { grid-template-columns: 1fr; }
      .controls { height: auto; }
      .plot-area { height: auto; }
      #plot { height: 72vh; min-height: 520px; }
      .plot-header { flex-direction: column; }
    }
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
        <div class="plot-note">Interactive 3D View</div>
      </div>
      <div class="axis-pills">
        <div class="axis-pill"><span class="axis-pill-label">X</span><span id="x-pill"></span></div>
        <div class="axis-pill"><span class="axis-pill-label">Y</span><span id="y-pill"></span></div>
        <div class="axis-pill"><span class="axis-pill-label">Z</span><span id="z-pill"></span></div>
      </div>
      <div id="plot"></div>
    </main>
  </div>

  <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
  <script>
    const NONE_OPTION = "${NONE_OPTION}";
    const DATASET = ${payloadJson};
    const DEFAULT_DISCRETE_COLORS = [
      "#ae5cff", "#8d34ea", "#6d28d9", "#c084fc", "#7c3aed",
      "#a855f7", "#d8b4fe", "#8b5cf6", "#4c1d95", "#e9d5ff",
      "#9333ea", "#c026d3", "#581c87", "#7e22ce", "#f5f3ff"
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

    function populateSelect(select, options, selectedValue, includeNone = false) {
      select.innerHTML = "";
      if (includeNone) {
        const option = document.createElement("option");
        option.value = NONE_OPTION;
        option.textContent = "None";
        select.appendChild(option);
      }
      options.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
      if (selectedValue && [...select.options].some((option) => option.value === selectedValue)) {
        select.value = selectedValue;
      } else if (includeNone) {
        select.value = NONE_OPTION;
      } else if (select.options.length > 0) {
        select.selectedIndex = 0;
      }
    }

    function toFiniteNumber(value) {
      if (value === null || value === undefined || value === "") return null;
      const number = Number(value);
      return Number.isFinite(number) ? number : null;
    }

    function displayValue(value) {
      if (value === null || value === undefined || value === "") return "Missing";
      if (typeof value === "number") {
        if (Number.isInteger(value)) return String(value);
        return value.toFixed(4).replace(/\\.0+$/, "").replace(/(\\.\\d*?)0+$/, "$1");
      }
      return String(value);
    }

    function quantile(sortedValues, q) {
      if (!sortedValues.length) return null;
      if (sortedValues.length === 1) return sortedValues[0];
      const position = (sortedValues.length - 1) * q;
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      if (lower === upper) return sortedValues[lower];
      const fraction = position - lower;
      return sortedValues[lower] * (1 - fraction) + sortedValues[upper] * fraction;
    }

    function scaledMarkerSizes(points, sizeColumn, sizeScale) {
      if (sizeColumn === NONE_OPTION) return points.map(() => 7 * sizeScale);
      const values = points.map((point) => toFiniteNumber(point.row[sizeColumn])).filter((value) => value !== null).sort((a, b) => a - b);
      if (values.length < 2) return points.map(() => 7 * sizeScale);
      const lower = quantile(values, 0.05);
      const upper = quantile(values, 0.95);
      if (lower === null || upper === null || upper <= lower) return points.map(() => 7 * sizeScale);
      return points.map((point) => {
        const value = toFiniteNumber(point.row[sizeColumn]);
        if (value === null) return 7 * sizeScale;
        const clipped = Math.max(lower, Math.min(upper, value));
        const scaled = 5 + (9 * (clipped - lower)) / (upper - lower);
        return scaled * sizeScale;
      });
    }

    function alignedPoints() {
      const xColumn = xSelect.value;
      const yColumn = ySelect.value;
      const zColumn = zSelect.value;
      const points = [];
      let excludedForMissing = 0;
      let excludedForLog = 0;
      DATASET.records.forEach((row) => {
        const rawX = toFiniteNumber(row[xColumn]);
        const rawY = toFiniteNumber(row[yColumn]);
        const rawZ = toFiniteNumber(row[zColumn]);
        if (rawX === null || rawY === null || rawZ === null) {
          excludedForMissing += 1;
          return;
        }
        if ((logX.checked && rawX <= 0) || (logY.checked && rawY <= 0) || (logZ.checked && rawZ <= 0)) {
          excludedForLog += 1;
          return;
        }
        points.push({
          row,
          x: logX.checked ? Math.log10(rawX) : rawX,
          y: logY.checked ? Math.log10(rawY) : rawY,
          z: logZ.checked ? Math.log10(rawZ) : rawZ,
        });
      });
      return { points, excludedForMissing, excludedForLog };
    }

    function customData(points, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {
      return points.map((point) => [
        hoverIdColumn === NONE_OPTION ? "" : displayValue(point.row[hoverIdColumn]),
        displayValue(point.row[xColumn]),
        displayValue(point.row[yColumn]),
        displayValue(point.row[zColumn]),
        colorColumn === NONE_OPTION ? "" : displayValue(point.row[colorColumn]),
        sizeColumn === NONE_OPTION ? "" : displayValue(point.row[sizeColumn]),
      ]);
    }

    function hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {
      const lines = [];
      if (hoverIdColumn !== NONE_OPTION) lines.push("<b>%{customdata[0]}</b>");
      lines.push(xColumn + ": %{customdata[1]}");
      lines.push(yColumn + ": %{customdata[2]}");
      lines.push(zColumn + ": %{customdata[3]}");
      if (colorColumn !== NONE_OPTION) lines.push(colorColumn + ": %{customdata[4]}");
      if (sizeColumn !== NONE_OPTION) lines.push(sizeColumn + ": %{customdata[5]}");
      lines.push("<extra></extra>");
      return lines.join("<br>");
    }

    function categoricalColorValue(value) {
      if (value === null || value === undefined || value === "") return "Missing";
      return String(value);
    }

    function categoryOrder(points, colorColumn) {
      const counts = new Map();
      points.forEach((point) => {
        const key = categoricalColorValue(point.row[colorColumn]);
        counts.set(key, (counts.get(key) || 0) + 1);
      });
      return [...counts.entries()].sort((a, b) => {
        if (a[0] === "Missing") return 1;
        if (b[0] === "Missing") return -1;
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      }).map(([key]) => key);
    }

    function baseLayout(xColumn, yColumn, zColumn) {
      const xTitle = logX.checked ? "log10(" + xColumn + ")" : xColumn;
      const yTitle = logY.checked ? "log10(" + yColumn + ")" : yColumn;
      const zTitle = logZ.checked ? "log10(" + zColumn + ")" : zColumn;
      return {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "#ffffff",
        font: {
          family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif',
          color: "#102132",
        },
        margin: { l: 0, r: 0, t: 20, b: 0 },
        legend: {
          orientation: "h",
          yanchor: "bottom",
          y: 1.01,
          xanchor: "left",
          x: 0,
          bgcolor: "rgba(0,0,0,0)",
          font: { color: "#102132" },
        },
        scene: {
          xaxis: {
            title: { text: xTitle },
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          },
          yaxis: {
            title: { text: yTitle },
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          },
          zaxis: {
            title: { text: zTitle },
            backgroundcolor: "#ffffff",
            gridcolor: "rgba(16, 33, 50, 0.28)",
            zerolinecolor: "rgba(16, 33, 50, 0.22)",
            showbackground: true,
            color: "#102132",
            gridwidth: 2,
            zerolinewidth: 2,
          },
          camera: {
            eye: { x: 1.55, y: 1.6, z: 1.15 },
          },
        },
      };
    }

    function singleTrace(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {
      return [{
        type: "scatter3d",
        mode: "markers",
        name: "Rows",
        x: points.map((point) => point.x),
        y: points.map((point) => point.y),
        z: points.map((point) => point.z),
        customdata: customData(points, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
        hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
        marker: {
          size: markerSizes,
          opacity: Number(opacitySlider.value),
          color: "#8d34ea",
          line: { width: 0 },
        },
      }];
    }

    function categoricalTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {
      const order = categoryOrder(points, colorColumn);
      const colorMap = new Map(order.map((category, index) => [category, DEFAULT_DISCRETE_COLORS[index % DEFAULT_DISCRETE_COLORS.length]]));
      return order.map((category) => {
        const categoryPoints = [];
        const categorySizes = [];
        points.forEach((point, index) => {
          if (categoricalColorValue(point.row[colorColumn]) === category) {
            categoryPoints.push(point);
            categorySizes.push(markerSizes[index]);
          }
        });
        return {
          type: "scatter3d",
          mode: "markers",
          name: category,
          x: categoryPoints.map((point) => point.x),
          y: categoryPoints.map((point) => point.y),
          z: categoryPoints.map((point) => point.z),
          customdata: customData(categoryPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {
            size: categorySizes,
            opacity: Number(opacitySlider.value),
            color: colorMap.get(category),
            line: { width: 0 },
          },
        };
      });
    }

    function numericColorTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn) {
      const coloredPoints = [];
      const coloredSizes = [];
      const coloredValues = [];
      const missingPoints = [];
      const missingSizes = [];
      points.forEach((point, index) => {
        const value = toFiniteNumber(point.row[colorColumn]);
        if (value === null) {
          missingPoints.push(point);
          missingSizes.push(markerSizes[index]);
          return;
        }
        coloredPoints.push(point);
        coloredSizes.push(markerSizes[index]);
        coloredValues.push(value);
      });
      const traces = [];
      if (coloredPoints.length) {
        traces.push({
          type: "scatter3d",
          mode: "markers",
          name: colorColumn,
          x: coloredPoints.map((point) => point.x),
          y: coloredPoints.map((point) => point.y),
          z: coloredPoints.map((point) => point.z),
          customdata: customData(coloredPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {
            size: coloredSizes,
            opacity: Number(opacitySlider.value),
            color: coloredValues,
            colorscale: "Viridis",
            colorbar: { title: colorColumn },
            line: { width: 0 },
          },
        });
      }
      if (missingPoints.length) {
        traces.push({
          type: "scatter3d",
          mode: "markers",
          name: "Missing " + colorColumn,
          x: missingPoints.map((point) => point.x),
          y: missingPoints.map((point) => point.y),
          z: missingPoints.map((point) => point.z),
          customdata: customData(missingPoints, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          hovertemplate: hoverTemplate(hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn),
          marker: {
            size: missingSizes,
            opacity: Number(opacitySlider.value),
            color: "#c9c1b1",
            line: { width: 0 },
          },
        });
      }
      return traces;
    }

    function updateRangeLabels() {
      opacityValue.textContent = Number(opacitySlider.value).toFixed(2);
      sizeScaleValue.textContent = Number(sizeScaleSlider.value).toFixed(1) + "x";
    }

    function render() {
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
      if (colorColumn === NONE_OPTION) {
        traces = singleTrace(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      } else if (DATASET.numeric_columns.includes(colorColumn)) {
        traces = numericColorTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      } else {
        traces = categoricalTraces(points, markerSizes, hoverIdColumn, xColumn, yColumn, zColumn, colorColumn, sizeColumn);
      }
      const layout = baseLayout(xColumn, yColumn, zColumn);
      Plotly.react("plot", traces, layout, {
        responsive: true,
        displaylogo: false,
        modeBarButtonsToRemove: ["lasso2d", "select2d"],
      });
      totalRowsNode.textContent = DATASET.records.length.toLocaleString();
      plottedRowsNode.textContent = points.length.toLocaleString();
      plotTitleNode.textContent = DATASET.title;
      xPillNode.textContent = logX.checked ? "log10(" + xColumn + ")" : xColumn;
      yPillNode.textContent = logY.checked ? "log10(" + yColumn + ")" : yColumn;
      zPillNode.textContent = logZ.checked ? "log10(" + zColumn + ")" : zColumn;
      const noteParts = [];
      if (aligned.excludedForMissing) noteParts.push(String(aligned.excludedForMissing) + " rows excluded for missing X/Y/Z values.");
      if (aligned.excludedForLog) noteParts.push(String(aligned.excludedForLog) + " rows excluded because log axes need values > 0.");
      statusNote.textContent = noteParts.length ? noteParts.join(" ") : "All rows with valid axis values are shown.";
    }

    function initialize() {
      titleNode.textContent = DATASET.title;
      populateSelect(xSelect, DATASET.numeric_columns, DATASET.defaults.x);
      populateSelect(ySelect, DATASET.numeric_columns, DATASET.defaults.y);
      populateSelect(zSelect, DATASET.numeric_columns, DATASET.defaults.z);
      populateSelect(colorSelect, DATASET.color_columns, DATASET.defaults.color, true);
      populateSelect(sizeSelect, DATASET.numeric_columns, DATASET.defaults.size, true);
      populateSelect(hoverIdSelect, DATASET.columns, DATASET.defaults.hover_id, true);
      updateRangeLabels();
      [xSelect, ySelect, zSelect, colorSelect, sizeSelect, hoverIdSelect, logX, logY, logZ, opacitySlider, sizeScaleSlider].forEach((element) => {
        element.addEventListener("input", () => {
          updateRangeLabels();
          render();
        });
        element.addEventListener("change", () => {
          updateRangeLabels();
          render();
        });
      });
      render();
    }
    initialize();
  </script>
</body>
</html>`;
}

function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: "greedy",
      dynamicTyping: false,
      complete(results) {
        if (results.errors && results.errors.length) {
          reject(new Error(results.errors[0].message));
          return;
        }
        const rows = results.data || [];
        if (!rows.length) {
          reject(new Error("The CSV appears to be empty."));
          return;
        }
        resolve(rows);
      },
      error(error) {
        reject(error);
      },
    });
  });
}

["dragenter", "dragover"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
  });
});

dropzone.addEventListener("drop", (event) => {
  const [file] = event.dataTransfer.files;
  if (!file) return;
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  fileInput.files = dataTransfer.files;
  setSelectedFile(file);
});

fileInput.addEventListener("change", () => {
  setSelectedFile(fileInput.files[0]);
});

clearButton.addEventListener("click", () => {
  form.reset();
  frame.srcdoc = "";
  viewerTitle.textContent = "No dashboard loaded yet";
  emptyState.classList.remove("hidden");
  setSelectedFile(null);
  clearMeta();
  clearError();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  const file = fileInput.files[0];
  if (!file) {
    showError("Choose a CSV file first.");
    return;
  }
  if (!file.name.toLowerCase().endsWith(".csv")) {
    showError("Only CSV uploads are supported.");
    return;
  }

  viewerTitle.textContent = "Building dashboard...";

  try {
    const rows = await parseCsvFile(file);
    const filenameStem = file.name.replace(/\\.[^.]+$/, "");
    const title = `${filenameStem} ${DEFAULT_TITLE_SUFFIX}`;
    const payload = buildPayload(rows, title);
    frame.srcdoc = buildDashboardHtml(payload);
    viewerTitle.textContent = payload.title;
    emptyState.classList.add("hidden");
    showMeta(`${payload.records.length.toLocaleString()} rows across ${payload.columns.length.toLocaleString()} columns loaded.`);
  } catch (err) {
    viewerTitle.textContent = "No dashboard loaded yet";
    emptyState.classList.remove("hidden");
    showError(err.message || "Upload failed.");
  }
});
