const APP_TITLE = "CSV 3D Explorer";
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
const viewerContext = document.getElementById("viewer-context") || document.getElementById("viewer-title");
const clearButton = document.getElementById("clear-button");
const filterRules = document.getElementById("filter-rules");
const filterEmpty = document.getElementById("filter-empty");
const filterImpact = document.getElementById("filter-impact");
const addFilterRuleButton = document.getElementById("add-filter-rule-button");
const clearFilterRulesButton = document.getElementById("clear-filter-rules-button");
const applyFilterRulesButton = document.getElementById("apply-filter-rules-button");
const emptyState = document.getElementById("empty-state");
const loadingState = document.getElementById("loading-state");
const loadingTitle = document.getElementById("loading-title");
const dashboardTab = document.getElementById("dashboard-tab");
const statisticsTab = document.getElementById("statistics-tab");
const correlationTab = document.getElementById("correlation-tab");
const dashboardPanel = document.getElementById("dashboard-panel");
const statisticsPanel = document.getElementById("statistics-panel");
const correlationPanel = document.getElementById("correlation-panel");
const statsNumericSelector = document.getElementById("stats-numeric-selector");
const statsCategoricalSelector = document.getElementById("stats-categorical-selector");
const statsNumericSearch = document.getElementById("stats-numeric-search");
const statsCategoricalSearch = document.getElementById("stats-categorical-search");
const statsNumericSelectionSummary = document.getElementById("stats-numeric-selection-summary");
const statsCategoricalSelectionSummary = document.getElementById("stats-categorical-selection-summary");
const statsNumericDownloadButton = document.getElementById("stats-download-numeric-button");
const statsCategoricalDownloadButton = document.getElementById("stats-download-categorical-button");
const statsSelectVisibleNumericButton = document.getElementById("stats-select-visible-numeric-button");
const statsClearNumericButton = document.getElementById("stats-clear-numeric-button");
const statsSelectVisibleCategoricalButton = document.getElementById("stats-select-visible-categorical-button");
const statsClearCategoricalButton = document.getElementById("stats-clear-categorical-button");
const statsSheet = document.getElementById("stats-sheet");
const categorySheet = document.getElementById("category-sheet");
const corrPairModeButton = document.getElementById("corr-pair-mode-button");
const corrMatrixModeButton = document.getElementById("corr-matrix-mode-button");
const corrPairPanel = document.getElementById("corr-pair-panel");
const corrMatrixPanel = document.getElementById("corr-matrix-panel");
const corrXSelect = document.getElementById("corr-x-select");
const corrYSelect = document.getElementById("corr-y-select");
const corrAlphaSlider = document.getElementById("corr-alpha-slider");
const corrAlphaValue = document.getElementById("corr-alpha-value");
const corrFitSelect = document.getElementById("corr-fit-select");
const corrPairMetrics = document.getElementById("corr-pair-metrics");
const corrPairPlot = document.getElementById("corr-pair-plot");
const corrMatrixMethod = document.getElementById("corr-matrix-method");
const corrMatrixToggles = document.getElementById("corr-matrix-toggles");
const corrSelectAllButton = document.getElementById("corr-select-all");
const corrClearAllButton = document.getElementById("corr-clear-all");
const corrMatrixHeatmap = document.getElementById("corr-matrix-heatmap");
const corrFocusTitle = document.getElementById("corr-focus-title");
const corrFocusPlot = document.getElementById("corr-focus-plot");
const corrPairResetButton = document.getElementById("corr-pair-reset-button");
const corrFocusResetButton = document.getElementById("corr-focus-reset-button");
const corrPairSaveButton = document.getElementById("corr-pair-save-button");
const corrFocusSaveButton = document.getElementById("corr-focus-save-button");
const emptyStateKicker = document.querySelector(".empty-state-kicker");
const emptyStateTitle = document.querySelector(".empty-state-title");
const emptyStateCopy = document.querySelector(".empty-state-copy");
let sourcePayload = null;
let currentPayload = null;
let draftFilterRules = [];
let appliedFilterRules = [];
let selectedStatsColumns = [];
let selectedCategoricalStatsColumns = [];
let statsNumericSearchValue = "";
let statsCategoricalSearchValue = "";
let activeOuterView = "dashboard";
let correlationMode = "pair";
let selectedMatrixColumns = [];
let focusedMatrixPair = null;
let currentMatrixPairLookup = new Map();
let nextFilterRuleId = 1;
const FILTER_OPERATORS = {
  numeric: [
    { value: "eq", label: "is equal to" },
    { value: "neq", label: "is not equal to" },
    { value: "gt", label: "is greater than" },
    { value: "gte", label: "is at least" },
    { value: "lt", label: "is less than" },
    { value: "lte", label: "is at most" },
    { value: "between", label: "is between" },
    { value: "not_between", label: "is not between" },
    { value: "is_missing", label: "is missing" },
    { value: "is_not_missing", label: "is not missing" },
  ],
  text: [
    { value: "eq", label: "is equal to" },
    { value: "neq", label: "is not equal to" },
    { value: "contains", label: "contains" },
    { value: "not_contains", label: "does not contain" },
    { value: "in_list", label: "is in list" },
    { value: "not_in_list", label: "is not in list" },
    { value: "is_missing", label: "is missing" },
    { value: "is_not_missing", label: "is not missing" },
  ],
};
const STAT_TERM_EXPLANATIONS = {
  "Parameter": "The dataset feature (column) this row represents.",
  "Mean ± Std": "Mean is the average value. Std (standard deviation) shows how spread out the values are around the mean.",
  "Median": "The middle value when the data is sorted.",
  "[Min, Max]": "The smallest and largest observed values.",
  "[Q1, Q3]": "Q1 is the 25th percentile and Q3 is the 75th percentile. The middle 50% lies between them.",
  "Skewness": "How asymmetric the distribution is. Positive means a longer right tail, negative means a longer left tail.",
  "Kurtosis": "How heavy the tails are compared with a normal distribution. Higher values mean more extreme outliers.",
  "Count": "Number of non-empty entries in this categorical column.",
  "Unique Values": "Number of distinct category values.",
  "Top Value": "Most frequent category value (mode).",
  "Top Frequency": "How many times the top value appears.",
};
const CORRELATION_METRIC_EXPLANATIONS = {
  "Pearson": "Measures linear relationship from -1 to 1. Values near 1 or -1 indicate a strong straight-line relationship; values near 0 indicate little linear association.",
  "Spearman": "Measures monotonic rank relationship from -1 to 1. It is more robust to outliers and captures ordered trends even when the relationship is not perfectly linear.",
  "Rows Used": "Number of rows with usable values for both selected variables after filtering and missing-value handling.",
  "Curve": "Shows which trendline is currently drawn on the scatter plot. Linear is a straight line; non-linear selects the better quadratic or cubic fit.",
  "Fit R²": "Indicates how much variance in Y is explained by the displayed trendline. Closer to 1 means the fitted curve tracks the data more closely.",
};

function setViewerContext(text) {
  if (viewerContext) {
    viewerContext.textContent = text;
  }
}

function setLoading(isLoading, title = "Loading dashboard...") {
  if (!loadingState) return;
  loadingState.classList.toggle("hidden", !isLoading);
  if (isLoading && loadingTitle && title) {
    loadingTitle.textContent = title;
  }
}

function setSelectedFile(file) {
  if (!file) {
    dropzoneTitle.textContent = "Drag a CSV here";
    dropzoneSubtitle.textContent = "Drop it in or click to browse from your machine.";
    return;
  }
  dropzoneTitle.textContent = file.name;
  dropzoneSubtitle.textContent = `${(file.size / 1024).toFixed(1)} KB selected`;
}

async function loadSelectedCsv() {
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

  setLoading(true, "Loading dashboard...");
  setViewerContext("Building dashboard...");

  try {
    const rows = await parseCsvFile(file);
    const filenameStem = file.name.replace(/\.[^.]+$/, "");
    const title = `${filenameStem} ${DEFAULT_TITLE_SUFFIX}`;
    const payload = buildPayload(rows, title);
    sourcePayload = payload;
    currentPayload = payload;
    draftFilterRules = [];
    appliedFilterRules = [];
    selectedStatsColumns = payload.numeric_columns.slice(0, Math.min(4, payload.numeric_columns.length));
    selectedCategoricalStatsColumns = categoricalColumnsForPayload(payload).slice(0, Math.min(6, categoricalColumnsForPayload(payload).length));
    statsNumericSearchValue = "";
    statsCategoricalSearchValue = "";
    if (statsNumericSearch) statsNumericSearch.value = "";
    if (statsCategoricalSearch) statsCategoricalSearch.value = "";
    selectedMatrixColumns = payload.numeric_columns.slice(0, Math.min(8, payload.numeric_columns.length));
    focusedMatrixPair = null;
    correlationMode = "pair";
    renderFilterBuilder();
    refreshActivePayload();
    emptyState.classList.add("hidden");
    if (emptyStateKicker) emptyStateKicker.textContent = "No Data Yet";
    if (emptyStateTitle) emptyStateTitle.textContent = "Add data to generate a dashboard.";
    if (emptyStateCopy) emptyStateCopy.textContent = "Drop in a CSV file and the interactive 3D view will appear here.";
    setOuterView("dashboard");
  } catch (err) {
    sourcePayload = null;
    currentPayload = null;
    draftFilterRules = [];
    appliedFilterRules = [];
    renderFilterBuilder();
    setViewerContext("No dashboard loaded yet");
    emptyState.classList.remove("hidden");
    if (emptyStateKicker) emptyStateKicker.textContent = "Upload Error";
    if (emptyStateTitle) emptyStateTitle.textContent = "Could not build dashboard from this CSV.";
    if (emptyStateCopy) emptyStateCopy.textContent = err.message || "Upload failed.";
    showError(err.message || "Upload failed.");
  } finally {
    setLoading(false);
  }
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

function cloneFilterRule(rule) {
  return { ...rule };
}

function columnTypeForPayload(payload, column) {
  if (!payload || !column) return "text";
  return payload.numeric_columns.includes(column) ? "numeric" : "text";
}

function operatorsForColumn(payload, column) {
  return FILTER_OPERATORS[columnTypeForPayload(payload, column)];
}

function defaultOperatorForColumn(payload, column) {
  return operatorsForColumn(payload, column)[0]?.value || "eq";
}

function createFilterRule(payload = sourcePayload) {
  const firstColumn = payload?.columns?.[0] || "";
  return {
    id: nextFilterRuleId++,
    column: firstColumn,
    operator: defaultOperatorForColumn(payload, firstColumn),
    value: "",
    value2: "",
  };
}

function filterOperatorInputMode(operator) {
  if (operator === "between" || operator === "not_between") return "range";
  if (operator === "is_missing" || operator === "is_not_missing") return "none";
  return "single";
}

function valueLabelForRule(payload, rule, second = false) {
  const isNumeric = columnTypeForPayload(payload, rule.column) === "numeric";
  if (filterOperatorInputMode(rule.operator) === "range") {
    return second ? "Maximum value" : "Minimum value";
  }
  if (!isNumeric && (rule.operator === "in_list" || rule.operator === "not_in_list")) {
    return "Values (comma-separated)";
  }
  return isNumeric ? "Value" : "Text";
}

function previewPlaceholderForRule(payload, rule) {
  const isNumeric = columnTypeForPayload(payload, rule.column) === "numeric";
  if (rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list") {
    return isNumeric ? "12, 18, 24" : "A, B, C";
  }
  return isNumeric ? "Enter a number" : "Enter a value";
}

function normalizeTextValue(value) {
  const normalized = normalizeValue(value);
  return normalized === null ? null : String(normalized).toLowerCase();
}

function parseFilterList(value) {
  return String(value || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function parseNumericFilterList(value) {
  return String(value || "")
    .split(",")
    .map((entry) => toFiniteNumber(entry.trim()))
    .filter((entry) => entry !== null);
}

function validateFilterRule(rule, payload) {
  if (!payload || !rule || !payload.columns.includes(rule.column)) return false;
  const operator = operatorsForColumn(payload, rule.column).find((entry) => entry.value === rule.operator);
  if (!operator) return false;
  const mode = filterOperatorInputMode(rule.operator);
  if (mode === "none") return true;

  const isNumeric = columnTypeForPayload(payload, rule.column) === "numeric";
  const firstValue = isNumeric ? toFiniteNumber(rule.value) : normalizeValue(rule.value);
  const allowsMultiValue = rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list";
  if (allowsMultiValue) {
    const parsedValues = isNumeric ? parseNumericFilterList(rule.value) : parseFilterList(rule.value);
    if (!parsedValues.length) return false;
  } else if (firstValue === null || firstValue === "") {
    return false;
  }
  if (mode === "single") return true;

  const secondValue = isNumeric ? toFiniteNumber(rule.value2) : normalizeValue(rule.value2);
  return secondValue !== null && secondValue !== "";
}

function rowMatchesFilterRule(row, rule, payload) {
  const rawValue = normalizeValue(row[rule.column]);
  const numericValue = toFiniteNumber(rawValue);
  const isNumeric = columnTypeForPayload(payload, rule.column) === "numeric";
  const mode = filterOperatorInputMode(rule.operator);
  const firstValue = isNumeric ? toFiniteNumber(rule.value) : normalizeValue(rule.value);
  const secondValue = isNumeric ? toFiniteNumber(rule.value2) : normalizeValue(rule.value2);
  const textValue = normalizeTextValue(rawValue);
  const comparisonText = normalizeTextValue(firstValue);
  const textList = parseFilterList(rule.value);
  const numericList = parseNumericFilterList(rule.value);

  switch (rule.operator) {
    case "is_missing":
      return rawValue === null;
    case "is_not_missing":
      return rawValue !== null;
    case "eq":
      return isNumeric
        ? (numericValue !== null && numericList.includes(numericValue))
        : textValue !== null && textList.includes(textValue);
    case "neq":
      return isNumeric
        ? (numericValue !== null && !numericList.includes(numericValue))
        : textValue !== null && !textList.includes(textValue);
    case "gt":
      return numericValue !== null && firstValue !== null && numericValue > firstValue;
    case "gte":
      return numericValue !== null && firstValue !== null && numericValue >= firstValue;
    case "lt":
      return numericValue !== null && firstValue !== null && numericValue < firstValue;
    case "lte":
      return numericValue !== null && firstValue !== null && numericValue <= firstValue;
    case "between":
      return numericValue !== null && firstValue !== null && secondValue !== null && numericValue >= Math.min(firstValue, secondValue) && numericValue <= Math.max(firstValue, secondValue);
    case "not_between":
      return numericValue !== null && firstValue !== null && secondValue !== null && (numericValue < Math.min(firstValue, secondValue) || numericValue > Math.max(firstValue, secondValue));
    case "contains":
      return textValue !== null && comparisonText !== null && textValue.includes(comparisonText);
    case "not_contains":
      return textValue !== null && comparisonText !== null && !textValue.includes(comparisonText);
    case "in_list": {
      return isNumeric
        ? (numericValue !== null && numericList.includes(numericValue))
        : textValue !== null && textList.includes(textValue);
    }
    case "not_in_list": {
      return isNumeric
        ? (numericValue !== null && !numericList.includes(numericValue))
        : textValue !== null && !textList.includes(textValue);
    }
    default:
      return false;
  }
}

function filterPreviewForRules(payload, rules) {
  if (!payload) {
    return { includedRecords: [], excludedCount: 0, includedCount: 0, invalidRuleCount: 0, validRules: [] };
  }
  const validRules = rules.filter((rule) => validateFilterRule(rule, payload));
  const invalidRuleCount = rules.length - validRules.length;
  if (!validRules.length) {
    return {
      includedRecords: payload.records,
      excludedCount: 0,
      includedCount: payload.records.length,
      invalidRuleCount,
      validRules,
    };
  }

  const includedRecords = payload.records.filter((row) => !validRules.every((rule) => rowMatchesFilterRule(row, rule, payload)));
  return {
    includedRecords,
    excludedCount: payload.records.length - includedRecords.length,
    includedCount: includedRecords.length,
    invalidRuleCount,
    validRules,
  };
}

function derivePayloadFromSource(payload, rules) {
  if (!payload) return null;
  const preview = filterPreviewForRules(payload, rules);
  return {
    payload: {
      ...payload,
      records: preview.includedRecords,
    },
    preview,
  };
}

function datasetSummaryText() {
  if (!sourcePayload || !currentPayload) return "No dashboard loaded yet";
  const total = sourcePayload.records.length.toLocaleString();
  const included = currentPayload.records.length.toLocaleString();
  return included === total ? `${sourcePayload.title} | ${included} rows` : `${sourcePayload.title} | ${included} of ${total} rows`;
}

function refreshMetaMessage() {
  if (!sourcePayload || !currentPayload) {
    clearMeta();
    return;
  }
  const total = sourcePayload.records.length;
  const included = currentPayload.records.length;
  const excluded = total - included;
  const ruleCount = appliedFilterRules.filter((rule) => validateFilterRule(rule, sourcePayload)).length;
  const base = `${included.toLocaleString()} rows included out of ${total.toLocaleString()} total across ${sourcePayload.columns.length.toLocaleString()} columns.`;
  if (!ruleCount) {
    showMeta(base);
    return;
  }
  showMeta(`${base} ${excluded.toLocaleString()} rows excluded by ${ruleCount.toLocaleString()} filter ${ruleCount === 1 ? "rule" : "rules"}.`);
}

function refreshActivePayload() {
  if (!sourcePayload) {
    currentPayload = null;
    frame.srcdoc = "";
    setViewerContext("No dashboard loaded yet");
    refreshMetaMessage();
    renderStatsToolbar();
    renderStatsTable();
    renderCategoricalSummary();
    renderCorrelationView();
    return;
  }

  const derived = derivePayloadFromSource(sourcePayload, appliedFilterRules);
  currentPayload = derived.payload;
  frame.srcdoc = buildDashboardHtml(currentPayload);
  setViewerContext(datasetSummaryText());
  selectedStatsColumns = syncSelectedColumns(currentPayload.numeric_columns, selectedStatsColumns);
  selectedCategoricalStatsColumns = syncSelectedColumns(
    categoricalColumnsForPayload(currentPayload),
    selectedCategoricalStatsColumns,
  );
  selectedMatrixColumns = selectedMatrixColumns.filter((column) => currentPayload.numeric_columns.includes(column));
  if (selectedMatrixColumns.length < 2) {
    selectedMatrixColumns = currentPayload.numeric_columns.slice(0, Math.min(8, currentPayload.numeric_columns.length));
  }
  renderStatsToolbar();
  renderStatsTable();
  renderCategoricalSummary();
  renderCorrelationView();
  refreshMetaMessage();
}

function setDraftFilterRule(ruleId, updates) {
  draftFilterRules = draftFilterRules.map((rule) => (rule.id === ruleId ? { ...rule, ...updates } : rule));
  renderFilterBuilder();
}

function removeDraftFilterRule(ruleId) {
  draftFilterRules = draftFilterRules.filter((rule) => rule.id !== ruleId);
  renderFilterBuilder();
}

function renderFilterBuilder() {
  if (!filterRules || !filterEmpty || !filterImpact || !addFilterRuleButton || !clearFilterRulesButton || !applyFilterRulesButton) return;

  const activeElement = document.activeElement;
  const focusState = activeElement && activeElement instanceof HTMLElement && activeElement.dataset.ruleId && activeElement.dataset.field
    ? {
      ruleId: activeElement.dataset.ruleId,
      field: activeElement.dataset.field,
      selectionStart: "selectionStart" in activeElement ? activeElement.selectionStart : null,
      selectionEnd: "selectionEnd" in activeElement ? activeElement.selectionEnd : null,
    }
    : null;

  filterRules.innerHTML = "";
  if (!sourcePayload) {
    filterImpact.textContent = "No dataset loaded";
    filterEmpty.textContent = "Upload a CSV to start defining exclusion rules.";
    filterEmpty.classList.add("visible");
    addFilterRuleButton.disabled = true;
    clearFilterRulesButton.disabled = true;
    applyFilterRulesButton.disabled = true;
    return;
  }

  const preview = filterPreviewForRules(sourcePayload, draftFilterRules);
  if (draftFilterRules.length) {
    filterEmpty.classList.remove("visible");
  } else {
    filterEmpty.textContent = "No exclusion rules yet. Add a rule to start filtering rows.";
    filterEmpty.classList.add("visible");
  }

  filterImpact.textContent = preview.invalidRuleCount
    ? `Complete ${preview.invalidRuleCount} incomplete ${preview.invalidRuleCount === 1 ? "rule" : "rules"}`
    : `Preview: keep ${preview.includedCount.toLocaleString()} | exclude ${preview.excludedCount.toLocaleString()}`;
  addFilterRuleButton.disabled = false;
  clearFilterRulesButton.disabled = draftFilterRules.length === 0;
  applyFilterRulesButton.disabled = preview.invalidRuleCount > 0;

  draftFilterRules.forEach((rule, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "filter-rule";

    const header = document.createElement("div");
    header.className = "filter-rule-header";

    const label = document.createElement("div");
    label.className = "filter-rule-label";
    label.textContent = `Rule ${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary filter-remove";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeDraftFilterRule(rule.id));

    header.append(label, removeButton);

    const grid = document.createElement("div");
    grid.className = "filter-rule-grid";

    const columnField = document.createElement("div");
    columnField.className = "filter-field";
    const columnLabel = document.createElement("label");
    columnLabel.textContent = "Column";
    const columnSelect = document.createElement("select");
    columnSelect.dataset.ruleId = String(rule.id);
    columnSelect.dataset.field = "column";
    sourcePayload.columns.forEach((column) => {
      const option = document.createElement("option");
      option.value = column;
      option.textContent = column;
      columnSelect.appendChild(option);
    });
    columnSelect.value = sourcePayload.columns.includes(rule.column) ? rule.column : sourcePayload.columns[0];
    columnSelect.addEventListener("change", () => {
      setDraftFilterRule(rule.id, {
        column: columnSelect.value,
        operator: defaultOperatorForColumn(sourcePayload, columnSelect.value),
        value: "",
        value2: "",
      });
    });
    columnField.append(columnLabel, columnSelect);

    const operatorField = document.createElement("div");
    operatorField.className = "filter-field";
    const operatorLabel = document.createElement("label");
    operatorLabel.textContent = "Exclude rows when";
    const operatorSelect = document.createElement("select");
    operatorSelect.dataset.ruleId = String(rule.id);
    operatorSelect.dataset.field = "operator";
    operatorsForColumn(sourcePayload, rule.column).forEach((operator) => {
      const option = document.createElement("option");
      option.value = operator.value;
      option.textContent = operator.label;
      operatorSelect.appendChild(option);
    });
    if ([...operatorSelect.options].some((option) => option.value === rule.operator)) {
      operatorSelect.value = rule.operator;
    }
    operatorSelect.addEventListener("change", () => {
      setDraftFilterRule(rule.id, {
        operator: operatorSelect.value,
        value: "",
        value2: "",
      });
    });
    operatorField.append(operatorLabel, operatorSelect);

    grid.append(columnField, operatorField);

    const mode = filterOperatorInputMode(rule.operator);
    if (mode !== "none") {
      const valueField = document.createElement("div");
      valueField.className = `filter-field ${mode === "single" ? "full" : ""}`.trim();
      const valueLabel = document.createElement("label");
      valueLabel.textContent = valueLabelForRule(sourcePayload, rule);
      const valueInput = document.createElement("input");
      valueInput.dataset.ruleId = String(rule.id);
      valueInput.dataset.field = "value";
      valueInput.type = columnTypeForPayload(sourcePayload, rule.column) === "numeric" ? "number" : "text";
      valueInput.placeholder = previewPlaceholderForRule(sourcePayload, rule);
      valueInput.value = rule.value;
      if (rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list") {
        valueInput.type = "text";
      }
      valueInput.addEventListener("input", () => setDraftFilterRule(rule.id, { value: valueInput.value }));
      valueField.append(valueLabel, valueInput);
      grid.appendChild(valueField);
    }

    if (mode === "range") {
      const valueField2 = document.createElement("div");
      valueField2.className = "filter-field";
      const valueLabel2 = document.createElement("label");
      valueLabel2.textContent = valueLabelForRule(sourcePayload, rule, true);
      const valueInput2 = document.createElement("input");
      valueInput2.dataset.ruleId = String(rule.id);
      valueInput2.dataset.field = "value2";
      valueInput2.type = columnTypeForPayload(sourcePayload, rule.column) === "numeric" ? "number" : "text";
      valueInput2.placeholder = previewPlaceholderForRule(sourcePayload, rule);
      valueInput2.value = rule.value2;
      valueInput2.addEventListener("input", () => setDraftFilterRule(rule.id, { value2: valueInput2.value }));
      valueField2.append(valueLabel2, valueInput2);
      grid.appendChild(valueField2);
    }

    const help = document.createElement("div");
    help.className = "filter-help";
    const multiValueHint = rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list"
      ? " Use commas to enter multiple values."
      : "";
    help.textContent = validateFilterRule(rule, sourcePayload)
      ? `Rows matching this rule ${draftFilterRules.length > 1 ? "and the other rules" : ""} will be excluded from all views.${multiValueHint}`
      : `Complete this rule to include it in the exclusion preview.${multiValueHint}`;

    wrapper.append(header, grid, help);
    filterRules.appendChild(wrapper);
  });

  if (focusState) {
    const selector = `[data-rule-id="${focusState.ruleId}"][data-field="${focusState.field}"]`;
    const nextField = filterRules.querySelector(selector);
    if (nextField instanceof HTMLElement) {
      nextField.focus();
      if ("setSelectionRange" in nextField && focusState.selectionStart !== null && focusState.selectionEnd !== null) {
        try {
          nextField.setSelectionRange(focusState.selectionStart, focusState.selectionEnd);
        } catch (error) {
          // Ignore controls that do not support caret restoration.
        }
      }
    }
  }
}

function meanValue(values) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function medianValue(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  return sorted[midpoint];
}

function quantileValue(values, q) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 1) return sorted[0];
  const position = (sorted.length - 1) * q;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  const fraction = position - lower;
  return sorted[lower] * (1 - fraction) + sorted[upper] * fraction;
}

function varianceValue(values) {
  if (values.length < 2) return null;
  const mean = meanValue(values);
  const squaredDiffs = values.map((value) => (value - mean) ** 2);
  return squaredDiffs.reduce((sum, value) => sum + value, 0) / (values.length - 1);
}

function standardDeviation(values) {
  const variance = varianceValue(values);
  return variance === null ? null : Math.sqrt(variance);
}

function skewnessValue(values) {
  if (values.length < 3) return null;
  const mean = meanValue(values);
  const stdDev = standardDeviation(values);
  if (stdDev === null || stdDev === 0) return null;
  const n = values.length;
  const scaled = values.reduce((sum, value) => sum + ((value - mean) / stdDev) ** 3, 0);
  return (n / ((n - 1) * (n - 2))) * scaled;
}

function kurtosisValue(values) {
  if (values.length < 4) return null;
  const mean = meanValue(values);
  const variance = varianceValue(values);
  if (variance === null || variance === 0) return null;
  const n = values.length;
  const m4 = values.reduce((sum, value) => sum + (value - mean) ** 4, 0);
  const numerator = (n * (n + 1) * m4) / ((n - 1) * (n - 2) * (n - 3) * (variance ** 2));
  const correction = (3 * ((n - 1) ** 2)) / ((n - 2) * (n - 3));
  return numerator - correction;
}

function formatStatValue(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "N/A";
    if (Number.isInteger(value)) return value.toLocaleString();
    return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }
  return String(value);
}

function meanPlusStdText(mean, stdDev) {
  const meanText = formatStatValue(mean);
  const stdText = formatStatValue(stdDev);
  if (meanText === "N/A" && stdText === "N/A") return "N/A";
  return `${meanText} ± ${stdText}`;
}

function bracketedPairText(left, right) {
  const leftText = formatStatValue(left);
  const rightText = formatStatValue(right);
  if (leftText === "N/A" && rightText === "N/A") return "N/A";
  return `[${leftText}, ${rightText}]`;
}

function statsCellValues(stats) {
  return [
    meanPlusStdText(stats.mean, stats.std_dev),
    formatStatValue(stats.median),
    bracketedPairText(stats.min, stats.max),
    bracketedPairText(stats.q1, stats.q3),
    formatStatValue(stats.skewness),
    formatStatValue(stats.kurtosis),
  ];
}

function categoricalColumnsForPayload(payload) {
  return payload.columns.filter((column) => !payload.numeric_columns.includes(column));
}

function uniqueOrderedColumns(columns) {
  return [...new Set(columns)];
}

function filterColumnsByQuery(columns, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return columns;
  return columns.filter((column) => column.toLowerCase().includes(normalized));
}

function syncSelectedColumns(availableColumns, selectedColumns, defaultCount = 0) {
  const synced = selectedColumns.filter((column) => availableColumns.includes(column));
  if (synced.length || defaultCount <= 0) return uniqueOrderedColumns(synced);
  return availableColumns.slice(0, Math.min(defaultCount, availableColumns.length));
}

function selectionSummaryText(selectedCount, totalCount, label) {
  if (!totalCount) return `No ${label} columns available`;
  if (!selectedCount) return `No ${label} columns selected`;
  if (selectedCount === totalCount) return `All ${totalCount.toLocaleString()} ${label} columns selected`;
  return `${selectedCount.toLocaleString()} of ${totalCount.toLocaleString()} ${label} columns selected`;
}

function updateSelectorSummary(element, selectedCount, totalCount, label) {
  if (!element) return;
  element.textContent = selectionSummaryText(selectedCount, totalCount, label);
}

function categoricalSummaryCellValues(summary) {
  return [
    formatStatValue(summary.count),
    formatStatValue(summary.unique),
    formatStatValue(summary.top),
    formatStatValue(summary.frequency),
  ];
}

function updateCategoricalSheetHeight(rowCount) {
  if (!categorySheet) return;
  const safeRows = Math.max(0, rowCount);
  if (safeRows === 0) {
    categorySheet.style.height = "auto";
    return;
  }
  const minHeight = 140;
  const maxHeight = Math.round(window.innerHeight * 0.42);
  const estimatedHeight = 58 + (safeRows * 44);
  const target = Math.min(maxHeight, Math.max(minHeight, estimatedHeight));
  categorySheet.style.height = `${target}px`;
}

function updateStatsDownloadButtonState() {
  if (!statsNumericDownloadButton && !statsCategoricalDownloadButton) return;
  if (!currentPayload) {
    if (statsNumericDownloadButton) statsNumericDownloadButton.disabled = true;
    if (statsCategoricalDownloadButton) statsCategoricalDownloadButton.disabled = true;
    return;
  }
  const categoricalColumns = categoricalColumnsForPayload(currentPayload);
  const hasNumeric = selectedStatsColumns.length > 0;
  const hasCategorical = selectedCategoricalStatsColumns.length > 0 && categoricalColumns.length > 0;
  if (statsNumericDownloadButton) statsNumericDownloadButton.disabled = !hasNumeric;
  if (statsCategoricalDownloadButton) statsCategoricalDownloadButton.disabled = !hasCategorical;
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n") || text.includes("\r")) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function downloadCsv(lines, filename) {
  if (!lines.length) return;
  const csvContent = lines.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function safeDatasetStem() {
  const stem = (currentPayload?.title || "dataset").replace(/ 3D Interactive Dashboard$/i, "");
  return stem.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "dataset";
}

function safeFilenamePart(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "value";
}

function downloadNumericStatsCsv() {
  if (!currentPayload || !selectedStatsColumns.length) return;

  const lines = [];
  const numericHeaders = ["Parameter", "Mean ± Std", "Median", "[Min, Max]", "[Q1, Q3]", "Skewness", "Kurtosis"];
  lines.push(numericHeaders.map(csvEscape).join(","));

  const statsByColumn = new Map(
    selectedStatsColumns.map((column) => [column, numericStatsForColumn(currentPayload, column)]),
  );
  selectedStatsColumns.forEach((column) => {
    const row = [column, ...statsCellValues(statsByColumn.get(column))];
    lines.push(row.map(csvEscape).join(","));
  });

  downloadCsv(lines, `${safeDatasetStem()}_numeric_descriptive_statistics.csv`);
}

function downloadCategoricalSummaryCsv() {
  if (!currentPayload) return;
  const categoricalColumns = categoricalColumnsForPayload(currentPayload)
    .filter((column) => selectedCategoricalStatsColumns.includes(column));
  if (!categoricalColumns.length) return;

  const lines = [];
  const headers = ["Parameter", "Count", "Unique Values", "Top Value", "Top Frequency"];
  lines.push(headers.map(csvEscape).join(","));
  const summaries = new Map(categoricalColumns.map((column) => [column, categoricalSummaryForColumn(currentPayload, column)]));
  categoricalColumns.forEach((column) => {
    const row = [column, ...categoricalSummaryCellValues(summaries.get(column))];
    lines.push(row.map(csvEscape).join(","));
  });

  downloadCsv(lines, `${safeDatasetStem()}_categorical_summary.csv`);
}

function numericStatsForColumn(payload, column) {
  const values = payload.records.map((row) => toFiniteNumber(row[column])).filter((value) => value !== null);
  if (!values.length) {
    return { mean: null, median: null, std_dev: null, min: null, q1: null, q3: null, max: null, skewness: null, kurtosis: null };
  }
  return {
    mean: meanValue(values),
    median: medianValue(values),
    std_dev: standardDeviation(values),
    min: Math.min(...values),
    q1: quantileValue(values, 0.25),
    q3: quantileValue(values, 0.75),
    max: Math.max(...values),
    skewness: skewnessValue(values),
    kurtosis: kurtosisValue(values),
  };
}

function categoricalSummaryForColumn(payload, column) {
  const values = payload.records.map((row) => row[column]).filter((value) => value !== null && value !== undefined && value !== "");
  if (!values.length) return { count: 0, unique: 0, top: null, frequency: null };
  const counts = new Map();
  values.forEach((value) => {
    const key = String(value);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  let top = null;
  let frequency = 0;
  for (const [key, count] of counts.entries()) {
    if (count > frequency) {
      top = key;
      frequency = count;
    }
  }
  return { count: values.length, unique: counts.size, top, frequency };
}

function createSelectorOption(column, isSelected, onToggle) {
  const label = document.createElement("label");
  label.className = "stats-selector-option" + (isSelected ? " active" : "");
  label.setAttribute("role", "option");
  label.setAttribute("aria-selected", isSelected ? "true" : "false");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isSelected;
  checkbox.addEventListener("change", onToggle);

  const text = document.createElement("span");
  text.className = "stats-selector-option-text";
  text.textContent = column;

  label.append(checkbox, text);
  return label;
}

function renderColumnSelector({
  container,
  columns,
  selectedColumns,
  searchValue,
  emptyMessage,
  noMatchMessage,
  onToggle,
}) {
  if (!container) return;
  container.innerHTML = "";

  if (!columns.length) {
    container.innerHTML = `<div class="stats-selector-empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }

  const filteredColumns = filterColumnsByQuery(columns, searchValue);
  if (!filteredColumns.length) {
    container.innerHTML = `<div class="stats-selector-empty">${escapeHtml(noMatchMessage)}</div>`;
    return;
  }

  filteredColumns.forEach((column) => {
    container.appendChild(
      createSelectorOption(column, selectedColumns.includes(column), () => onToggle(column)),
    );
  });
}

function renderStatsToolbar() {
  updateStatsDownloadButtonState();
  const numericColumns = currentPayload?.numeric_columns || [];
  const categoricalColumns = currentPayload ? categoricalColumnsForPayload(currentPayload) : [];
  const filteredNumericColumns = filterColumnsByQuery(numericColumns, statsNumericSearchValue);
  const filteredCategoricalColumns = filterColumnsByQuery(categoricalColumns, statsCategoricalSearchValue);

  updateSelectorSummary(statsNumericSelectionSummary, selectedStatsColumns.length, numericColumns.length, "numeric");
  updateSelectorSummary(
    statsCategoricalSelectionSummary,
    selectedCategoricalStatsColumns.length,
    categoricalColumns.length,
    "categorical",
  );
  if (statsSelectVisibleNumericButton) statsSelectVisibleNumericButton.disabled = !filteredNumericColumns.length;
  if (statsClearNumericButton) statsClearNumericButton.disabled = !selectedStatsColumns.length;
  if (statsSelectVisibleCategoricalButton) statsSelectVisibleCategoricalButton.disabled = !filteredCategoricalColumns.length;
  if (statsClearCategoricalButton) statsClearCategoricalButton.disabled = !selectedCategoricalStatsColumns.length;

  renderColumnSelector({
    container: statsNumericSelector,
    columns: numericColumns,
    selectedColumns: selectedStatsColumns,
    searchValue: statsNumericSearchValue,
    emptyMessage: "Upload a CSV to browse numeric columns.",
    noMatchMessage: "No numeric columns match the current search.",
    onToggle: (column) => {
      if (selectedStatsColumns.includes(column)) {
        selectedStatsColumns = selectedStatsColumns.filter((value) => value !== column);
      } else {
        selectedStatsColumns = [...selectedStatsColumns, column];
      }
      renderStatsToolbar();
      renderStatsTable();
    },
  });

  renderColumnSelector({
    container: statsCategoricalSelector,
    columns: categoricalColumns,
    selectedColumns: selectedCategoricalStatsColumns,
    searchValue: statsCategoricalSearchValue,
    emptyMessage: "Upload a CSV to browse categorical columns.",
    noMatchMessage: "No categorical columns match the current search.",
    onToggle: (column) => {
      if (selectedCategoricalStatsColumns.includes(column)) {
        selectedCategoricalStatsColumns = selectedCategoricalStatsColumns.filter((value) => value !== column);
      } else {
        selectedCategoricalStatsColumns = [...selectedCategoricalStatsColumns, column];
      }
      renderStatsToolbar();
      renderCategoricalSummary();
    },
  });
}

function renderStatsTable() {
  if (!statsSheet) return;
  updateStatsDownloadButtonState();
  if (!currentPayload) {
    statsSheet.innerHTML = '<div class="stats-empty">Upload a CSV to see descriptive statistics.</div>';
    return;
  }
  if (!selectedStatsColumns.length) {
    statsSheet.innerHTML = '<div class="stats-empty">Select one or more numeric parameters to show descriptive statistics.</div>';
    return;
  }

  const statsByColumn = new Map(selectedStatsColumns.map((column) => [column, numericStatsForColumn(currentPayload, column)]));
  const headers = ["Parameter", "Mean ± Std", "Median", "[Min, Max]", "[Q1, Q3]", "Skewness", "Kurtosis"];
  let html = '<table class="stats-table"><thead><tr>';
  headers.forEach((header) => {
    html += renderStatsHeaderCell(header);
  });
  html += "</tr></thead><tbody>";

  selectedStatsColumns.forEach((column) => {
    const stats = statsByColumn.get(column);
    const metricValues = statsCellValues(stats);
    html += `<tr><th class="stats-parameter">${escapeHtml(column)}</th>`;
    metricValues.forEach((value) => {
      html += `<td>${escapeHtml(String(value))}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  statsSheet.innerHTML = html;
}

function renderCategoricalSummary() {
  if (!categorySheet) return;
  updateStatsDownloadButtonState();
  if (!currentPayload) {
    categorySheet.innerHTML = '<div class="stats-empty small">Upload a CSV to see categorical summaries.</div>';
    updateCategoricalSheetHeight(0);
    return;
  }
  const categoricalColumns = categoricalColumnsForPayload(currentPayload);
  if (!categoricalColumns.length) {
    categorySheet.innerHTML = '<div class="stats-empty small">No non-numeric columns were found in this dataset.</div>';
    updateCategoricalSheetHeight(0);
    return;
  }
  const selectedColumns = categoricalColumns.filter((column) => selectedCategoricalStatsColumns.includes(column));
  if (!selectedColumns.length) {
    categorySheet.innerHTML = '<div class="stats-empty small">Select one or more categorical parameters to show summary statistics.</div>';
    updateCategoricalSheetHeight(0);
    return;
  }

  const summaries = new Map(selectedColumns.map((column) => [column, categoricalSummaryForColumn(currentPayload, column)]));
  const headers = ["Parameter", "Count", "Unique Values", "Top Value", "Top Frequency"];
  let html = '<table class="stats-table"><thead><tr>';
  headers.forEach((header) => {
    html += renderStatsHeaderCell(header);
  });
  html += "</tr></thead><tbody>";

  selectedColumns.forEach((column) => {
    html += `<tr><th class="stats-parameter">${escapeHtml(column)}</th>`;
    categoricalSummaryCellValues(summaries.get(column)).forEach((value) => {
      html += `<td>${escapeHtml(String(value))}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  categorySheet.innerHTML = html;
  updateCategoricalSheetHeight(selectedColumns.length);
}

function populateSimpleSelect(select, options, selectedValue) {
  if (!select) return;
  select.innerHTML = "";
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  if (selectedValue && options.includes(selectedValue)) {
    select.value = selectedValue;
  } else if (options.length) {
    select.value = options[0];
  }
}

function hasPlotly() {
  return typeof Plotly !== "undefined";
}

function renderCorrelationEmpty(target, message) {
  if (!target) return;
  target.innerHTML = `<div class="corr-empty">${escapeHtml(String(message))}</div>`;
}

function formatCorrelationValue(value) {
  if (value === null || value === undefined || Number.isNaN(value) || !Number.isFinite(value)) return "N/A";
  return value.toFixed(4);
}

function getAlignedNumericPair(payload, xColumn, yColumn) {
  const xValues = [];
  const yValues = [];
  payload.records.forEach((row) => {
    const x = toFiniteNumber(row[xColumn]);
    const y = toFiniteNumber(row[yColumn]);
    if (x === null || y === null) return;
    xValues.push(x);
    yValues.push(y);
  });
  return { xValues, yValues };
}

function pearsonCorrelation(xValues, yValues) {
  const n = xValues.length;
  if (n < 2 || n !== yValues.length) return null;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i += 1) {
    sumX += xValues[i];
    sumY += yValues[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xValues[i] - meanX;
    const dy = yValues[i] - meanY;
    covariance += dx * dy;
    varianceX += dx * dx;
    varianceY += dy * dy;
  }
  if (varianceX === 0 || varianceY === 0) return null;
  return covariance / Math.sqrt(varianceX * varianceY);
}

function rankWithTies(values) {
  const indexed = values.map((value, index) => ({ value, index }));
  indexed.sort((a, b) => a.value - b.value);
  const ranks = new Array(values.length);
  let i = 0;
  while (i < indexed.length) {
    let j = i;
    while (j + 1 < indexed.length && indexed[j + 1].value === indexed[i].value) {
      j += 1;
    }
    const avgRank = ((i + 1) + (j + 1)) / 2;
    for (let k = i; k <= j; k += 1) {
      ranks[indexed[k].index] = avgRank;
    }
    i = j + 1;
  }
  return ranks;
}

function spearmanCorrelation(xValues, yValues) {
  if (xValues.length < 2 || xValues.length !== yValues.length) return null;
  const xRanks = rankWithTies(xValues);
  const yRanks = rankWithTies(yValues);
  return pearsonCorrelation(xRanks, yRanks);
}

function pairCorrelationSummary(payload, xColumn, yColumn) {
  const aligned = getAlignedNumericPair(payload, xColumn, yColumn);
  return {
    n: aligned.xValues.length,
    pearson: pearsonCorrelation(aligned.xValues, aligned.yValues),
    spearman: spearmanCorrelation(aligned.xValues, aligned.yValues),
  };
}

function linearRegression(xValues, yValues) {
  const n = xValues.length;
  if (n < 2 || n !== yValues.length) return null;
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i += 1) {
    sumX += xValues[i];
    sumY += yValues[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let varianceX = 0;
  let covariance = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xValues[i] - meanX;
    const dy = yValues[i] - meanY;
    varianceX += dx * dx;
    covariance += dx * dy;
  }
  if (varianceX === 0) return null;

  const slope = covariance / varianceX;
  const intercept = meanY - (slope * meanX);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const yPredictions = xValues.map((value) => (slope * value) + intercept);
  return {
    type: "linear",
    label: "Linear",
    slope,
    intercept,
    xLine: [minX, maxX],
    yLine: [slope * minX + intercept, slope * maxX + intercept],
    rSquared: coefficientOfDetermination(yValues, yPredictions),
    equationText: formatLinearEquation(slope, intercept),
  };
}

function meanOf(values) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function coefficientOfDetermination(observed, predicted) {
  if (observed.length < 2 || observed.length !== predicted.length) return null;
  const meanObserved = meanOf(observed);
  if (meanObserved === null) return null;
  let totalSumSquares = 0;
  let residualSumSquares = 0;
  for (let i = 0; i < observed.length; i += 1) {
    totalSumSquares += (observed[i] - meanObserved) ** 2;
    residualSumSquares += (observed[i] - predicted[i]) ** 2;
  }
  if (totalSumSquares === 0) return null;
  return 1 - (residualSumSquares / totalSumSquares);
}

function solveLinearSystem(matrix, vector) {
  const size = matrix.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);

  for (let pivotIndex = 0; pivotIndex < size; pivotIndex += 1) {
    let maxRow = pivotIndex;
    for (let rowIndex = pivotIndex + 1; rowIndex < size; rowIndex += 1) {
      if (Math.abs(augmented[rowIndex][pivotIndex]) > Math.abs(augmented[maxRow][pivotIndex])) {
        maxRow = rowIndex;
      }
    }
    if (Math.abs(augmented[maxRow][pivotIndex]) < 1e-12) {
      return null;
    }
    if (maxRow !== pivotIndex) {
      [augmented[pivotIndex], augmented[maxRow]] = [augmented[maxRow], augmented[pivotIndex]];
    }

    const pivot = augmented[pivotIndex][pivotIndex];
    for (let columnIndex = pivotIndex; columnIndex <= size; columnIndex += 1) {
      augmented[pivotIndex][columnIndex] /= pivot;
    }

    for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
      if (rowIndex === pivotIndex) continue;
      const factor = augmented[rowIndex][pivotIndex];
      for (let columnIndex = pivotIndex; columnIndex <= size; columnIndex += 1) {
        augmented[rowIndex][columnIndex] -= factor * augmented[pivotIndex][columnIndex];
      }
    }
  }

  return augmented.map((row) => row[size]);
}

function polynomialValue(coefficients, xValue) {
  return coefficients.reduce((sum, coefficient, index) => sum + (coefficient * (xValue ** index)), 0);
}

function formatSignedCoefficient(value, isConstant = false) {
  if (!Number.isFinite(value)) return "N/A";
  const absoluteValue = Math.abs(value);
  const formatted = absoluteValue.toFixed(4).replace(/\.?0+$/, "");
  if (isConstant) return value < 0 ? `-${formatted}` : formatted;
  return value < 0 ? `- ${formatted}` : formatted;
}

function formatLinearEquation(slope, intercept) {
  if (!Number.isFinite(slope) || !Number.isFinite(intercept)) return "No fitted curve";
  const slopeText = `${slope < 0 ? "-" : ""}${Math.abs(slope).toFixed(4).replace(/\.?0+$/, "")}x`;
  const interceptText = `${intercept < 0 ? "-" : "+"} ${Math.abs(intercept).toFixed(4).replace(/\.?0+$/, "")}`;
  return `y = ${slopeText} ${interceptText}`;
}

function formatPolynomialEquation(coefficients) {
  const parts = [];
  for (let index = coefficients.length - 1; index >= 0; index -= 1) {
    const coefficient = coefficients[index];
    if (!Number.isFinite(coefficient) || Math.abs(coefficient) < 1e-10) continue;
    const sign = coefficient < 0 ? "-" : "+";
    const absValue = Math.abs(coefficient).toFixed(4).replace(/\.?0+$/, "");
    let term = absValue;
    if (index >= 1) {
      term += "x";
    }
    if (index >= 2) {
      term += `^${index}`;
    }
    parts.push(parts.length === 0 ? `${coefficient < 0 ? "-" : ""}${term}` : `${sign} ${term}`);
  }
  if (!parts.length) return "No fitted curve";
  return `y = ${parts.join(" ")}`;
}

function polynomialRegression(xValues, yValues, degree) {
  const pointCount = xValues.length;
  if (pointCount <= degree || pointCount !== yValues.length) return null;

  const columnCount = degree + 1;
  const normalMatrix = Array.from({ length: columnCount }, () => Array(columnCount).fill(0));
  const normalVector = Array(columnCount).fill(0);

  for (let rowIndex = 0; rowIndex < pointCount; rowIndex += 1) {
    const xValue = xValues[rowIndex];
    const yValue = yValues[rowIndex];
    const powers = Array.from({ length: (degree * 2) + 1 }, (_, power) => xValue ** power);

    for (let i = 0; i < columnCount; i += 1) {
      normalVector[i] += yValue * powers[i];
      for (let j = 0; j < columnCount; j += 1) {
        normalMatrix[i][j] += powers[i + j];
      }
    }
  }

  const coefficients = solveLinearSystem(normalMatrix, normalVector);
  if (!coefficients) return null;

  const yPredictions = xValues.map((xValue) => polynomialValue(coefficients, xValue));
  const rSquared = coefficientOfDetermination(yValues, yPredictions);
  if (rSquared === null || !Number.isFinite(rSquared)) return null;

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const pointTotal = 120;
  const xLine = Array.from({ length: pointTotal }, (_, index) => (
    minX + ((maxX - minX) * index) / Math.max(1, pointTotal - 1)
  ));
  return {
    type: "nonlinear",
    label: degree === 2 ? "Quadratic" : "Cubic",
    degree,
    coefficients,
    xLine,
    yLine: xLine.map((value) => polynomialValue(coefficients, value)),
    rSquared,
    equationText: formatPolynomialEquation(coefficients),
  };
}

function bestNonlinearRegression(xValues, yValues) {
  const candidates = [2, 3]
    .map((degree) => polynomialRegression(xValues, yValues, degree))
    .filter((candidate) => candidate && Number.isFinite(candidate.rSquared));
  if (!candidates.length) return null;
  candidates.sort((left, right) => {
    if (right.rSquared !== left.rSquared) return right.rSquared - left.rSquared;
    return left.degree - right.degree;
  });
  return candidates[0];
}

function currentCorrelationFitMode() {
  return corrFitSelect?.value || "linear";
}

function selectedTrendlineForPair(aligned) {
  const mode = currentCorrelationFitMode();
  if (mode === "none") return null;
  if (mode === "nonlinear") return bestNonlinearRegression(aligned.xValues, aligned.yValues);
  return linearRegression(aligned.xValues, aligned.yValues);
}

function pairKey(left, right) {
  return left < right ? `${left}|||${right}` : `${right}|||${left}`;
}

function reset2DPlotZoom(plotId) {
  const node = document.getElementById(plotId);
  if (!node || !hasPlotly() || !node.data) return;
  Plotly.relayout(node, {
    "xaxis.autorange": true,
    "yaxis.autorange": true,
  });
}

function download2DPlotImage(plotId, filename) {
  const node = document.getElementById(plotId);
  if (!node || !hasPlotly() || !node.data) return;
  Plotly.downloadImage(node, {
    format: "png",
    scale: 2,
    width: 1400,
    height: 900,
    filename,
  });
}

function ensureDistinctPairSelection() {
  if (!currentPayload || !corrXSelect || !corrYSelect) return;
  const numericColumns = currentPayload.numeric_columns;
  if (!numericColumns.length) return;
  if (!numericColumns.includes(corrXSelect.value)) corrXSelect.value = numericColumns[0];
  if (!numericColumns.includes(corrYSelect.value)) corrYSelect.value = numericColumns[Math.min(1, numericColumns.length - 1)];
  if (corrXSelect.value === corrYSelect.value && numericColumns.length > 1) {
    const alternate = numericColumns.find((column) => column !== corrXSelect.value);
    if (alternate) corrYSelect.value = alternate;
  }
}

function currentCorrelationPointOpacity() {
  const fallback = 0.78;
  if (!corrAlphaSlider) return fallback;
  const parsed = Number(corrAlphaSlider.value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0.15, Math.min(1, parsed));
}

function updateCorrelationAlphaLabel() {
  const value = currentCorrelationPointOpacity();
  if (corrAlphaValue) {
    corrAlphaValue.textContent = `${Math.round(value * 100)}%`;
  }
  if (corrAlphaSlider) {
    const min = 0.15;
    const max = 1;
    const progress = ((value - min) / (max - min)) * 100;
    corrAlphaSlider.style.setProperty("--alpha-progress", `${Math.max(0, Math.min(100, progress))}%`);
  }
}

function metricToneClass(value) {
  if (!Number.isFinite(value)) return "";
  if (value > 0.15) return "corr-metric-card--positive";
  if (value < -0.15) return "corr-metric-card--negative";
  return "";
}

function renderPairMetrics(summary, regression) {
  if (!corrPairMetrics) return;
  const items = [
    { label: "Pearson", value: formatCorrelationValue(summary.pearson), raw: summary.pearson, badge: "r", description: CORRELATION_METRIC_EXPLANATIONS.Pearson },
    { label: "Spearman", value: formatCorrelationValue(summary.spearman), raw: summary.spearman, badge: "rs", description: CORRELATION_METRIC_EXPLANATIONS.Spearman },
    { label: "Rows Used", value: summary.n.toLocaleString(), raw: null, badge: "n", description: CORRELATION_METRIC_EXPLANATIONS["Rows Used"] },
    { label: "Curve", value: regression ? regression.label : "None", raw: null, badge: "fit", description: CORRELATION_METRIC_EXPLANATIONS.Curve },
    { label: "Fit R²", value: formatCorrelationValue(regression?.rSquared ?? null), raw: regression?.rSquared ?? null, badge: "r2", description: CORRELATION_METRIC_EXPLANATIONS["Fit R²"] },
  ];

  corrPairMetrics.innerHTML = items.map((item) => `
      <div class="corr-metric-card ${metricToneClass(item.raw)}">
        <div class="corr-metric-badge">${escapeHtml(item.badge)}</div>
        <div class="corr-metric-label">${renderInfoTooltipLabel(item.label, item.description, "corr-metric-label-text")}</div>
        <div class="corr-metric-value">${escapeHtml(String(item.value))}</div>
      </div>
    `).join("");
}

function renderPairScatterPlot(xColumn, yColumn, aligned, summary, targetId, regression = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  if (aligned.xValues.length < 2) {
    renderCorrelationEmpty(target, "Not enough overlapping numeric rows to plot this pair.");
    return;
  }
  if (!hasPlotly()) {
    renderCorrelationEmpty(target, "Plotly is not loaded, so charts are unavailable.");
    return;
  }

  const traces = [{
    type: "scatter",
    mode: "markers",
    x: aligned.xValues,
    y: aligned.yValues,
    marker: {
      color: "#8d34ea",
      size: 8,
      opacity: currentCorrelationPointOpacity(),
      line: { width: 0 },
    },
    hovertemplate: `${escapeHtml(xColumn)}: %{x}<br>${escapeHtml(yColumn)}: %{y}<extra></extra>`,
    name: "Rows",
  }];

  const resolvedRegression = regression ?? selectedTrendlineForPair(aligned);
  if (resolvedRegression) {
    traces.push({
      type: "scatter",
      mode: "lines",
      x: resolvedRegression.xLine,
      y: resolvedRegression.yLine,
      line: {
        color: resolvedRegression.type === "nonlinear" ? "#38bdf8" : "#f59e0b",
        width: 2.5,
      },
      hovertemplate: `${escapeHtml(resolvedRegression.label)} fit<extra></extra>`,
      name: `${resolvedRegression.label} Fit`,
    });
  }

  target.innerHTML = "";
  const fitText = resolvedRegression
    ? `${resolvedRegression.label} fit | ${resolvedRegression.equationText} | R²: ${formatCorrelationValue(resolvedRegression.rSquared)}`
    : "No trendline selected";
  const corrText = `Pearson: ${formatCorrelationValue(summary.pearson)} | Spearman: ${formatCorrelationValue(summary.spearman)} | N: ${summary.n.toLocaleString()}`;

  let renderPromise;
  try {
    renderPromise = Plotly.newPlot(targetId, traces, {
    paper_bgcolor: "rgba(18, 20, 28, 0.92)",
    plot_bgcolor: "#ffffff",
    font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: "#e8ebf4" },
    margin: { l: 54, r: 20, t: 56, b: 50 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.01,
      xanchor: "left",
      x: 0,
      bgcolor: "rgba(16, 18, 26, 0.84)",
      bordercolor: "rgba(174, 92, 255, 0.28)",
      borderwidth: 1,
      font: { color: "#e8ebf4" },
    },
    xaxis: {
      title: { text: `X: ${xColumn}`, font: { color: "#e8ebf4", size: 13 }, standoff: 10 },
      tickfont: { color: "#e8ebf4" },
      gridcolor: "rgba(16, 33, 50, 0.16)",
      zerolinecolor: "rgba(16, 33, 50, 0.2)",
    },
    yaxis: {
      title: { text: `Y: ${yColumn}`, font: { color: "#e8ebf4", size: 13 }, standoff: 10 },
      tickfont: { color: "#e8ebf4" },
      gridcolor: "rgba(16, 33, 50, 0.16)",
      zerolinecolor: "rgba(16, 33, 50, 0.2)",
    },
    annotations: [{
      xref: "paper",
      yref: "paper",
      x: 0.01,
      y: 0.995,
      xanchor: "left",
      yanchor: "top",
      align: "left",
      showarrow: false,
      text: `${fitText}<br>${corrText}`,
      font: { size: 12, color: "#e8ebf4" },
      bgcolor: "rgba(16, 18, 26, 0.84)",
      bordercolor: "rgba(174, 92, 255, 0.28)",
      borderwidth: 1,
      borderpad: 6,
    }],
  }, {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["lasso2d", "select2d"],
  });
  } catch (error) {
    renderCorrelationEmpty(target, "Could not render this scatter plot for the selected variables.");
    return;
  }
  if (renderPromise && typeof renderPromise.then === "function") {
    renderPromise.then(() => {
      const node = document.getElementById(targetId);
      if (node && node.data) Plotly.Plots.resize(node);
    }).catch(() => {
      renderCorrelationEmpty(target, "Could not render this scatter plot for the selected variables.");
    });
  }
}

function renderCorrelationPairExplorer() {
  if (!corrPairPanel) return;
  if (!currentPayload) {
    if (corrPairMetrics) corrPairMetrics.innerHTML = "";
    renderCorrelationEmpty(corrPairPlot, "Upload a CSV to start exploring correlations.");
    return;
  }

  const numericColumns = currentPayload.numeric_columns;
  if (numericColumns.length < 2) {
    if (corrPairMetrics) corrPairMetrics.innerHTML = "";
    renderCorrelationEmpty(corrPairPlot, "At least two numeric columns are required.");
    return;
  }

  populateSimpleSelect(corrXSelect, numericColumns, corrXSelect?.value || numericColumns[0]);
  populateSimpleSelect(corrYSelect, numericColumns, corrYSelect?.value || numericColumns[Math.min(1, numericColumns.length - 1)]);
  ensureDistinctPairSelection();

  const xColumn = corrXSelect.value;
  const yColumn = corrYSelect.value;
  const aligned = getAlignedNumericPair(currentPayload, xColumn, yColumn);
  const summary = {
    n: aligned.xValues.length,
    pearson: pearsonCorrelation(aligned.xValues, aligned.yValues),
    spearman: spearmanCorrelation(aligned.xValues, aligned.yValues),
  };
  const regression = selectedTrendlineForPair(aligned);
  renderPairMetrics(summary, regression);
  renderPairScatterPlot(xColumn, yColumn, aligned, summary, "corr-pair-plot", regression);
}

function buildMatrixSummaries(payload, columns, method) {
  const matrix = columns.map(() => columns.map(() => null));
  const summaries = [];
  const summaryLookup = new Map();
  for (let i = 0; i < columns.length; i += 1) {
    matrix[i][i] = 1;
    for (let j = i + 1; j < columns.length; j += 1) {
      const left = columns[i];
      const right = columns[j];
      const summary = pairCorrelationSummary(payload, left, right);
      const methodValue = method === "spearman" ? summary.spearman : summary.pearson;
      matrix[i][j] = methodValue;
      matrix[j][i] = methodValue;
      summaries.push({
        xColumn: left,
        yColumn: right,
        n: summary.n,
        pearson: summary.pearson,
        spearman: summary.spearman,
        methodValue,
        absMethodValue: methodValue === null ? -1 : Math.abs(methodValue),
      });
      summaryLookup.set(pairKey(left, right), summaries[summaries.length - 1]);
    }
  }
  summaries.sort((a, b) => b.absMethodValue - a.absMethodValue);
  return {
    matrix,
    summaries,
    summaryLookup,
    defaultPair: summaries[0] ? { xColumn: summaries[0].xColumn, yColumn: summaries[0].yColumn } : null,
  };
}

function resizeCorrelationPlots() {
  if (!hasPlotly()) return;
  ["corr-pair-plot", "corr-matrix-heatmap", "corr-focus-plot"].forEach((id) => {
    const node = document.getElementById(id);
    if (node && node.data) Plotly.Plots.resize(node);
  });
}

function renderCorrelationToggles() {
  if (!corrMatrixToggles) return;
  corrMatrixToggles.innerHTML = "";
  if (!currentPayload) return;

  currentPayload.numeric_columns.forEach((column) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "corr-toggle" + (selectedMatrixColumns.includes(column) ? " active" : "");
    button.textContent = column;
    button.addEventListener("click", () => {
      if (selectedMatrixColumns.includes(column)) {
        selectedMatrixColumns = selectedMatrixColumns.filter((value) => value !== column);
      } else {
        selectedMatrixColumns = [...selectedMatrixColumns, column];
      }
      focusedMatrixPair = null;
      renderCorrelationMatrixExplorer();
    });
    corrMatrixToggles.appendChild(button);
  });
}

function renderFocusedMatrixScatter() {
  if (!corrFocusTitle || !corrFocusPlot) return;
  if (!currentPayload || !focusedMatrixPair) {
    corrFocusTitle.textContent = "Click a matrix cell to inspect its scatter.";
    renderCorrelationEmpty(corrFocusPlot, "Click an off-diagonal matrix cell.");
    return;
  }

  const { xColumn, yColumn } = focusedMatrixPair;
  if (xColumn === yColumn) {
    corrFocusTitle.textContent = "Click an off-diagonal matrix cell to compare two different variables.";
    renderCorrelationEmpty(corrFocusPlot, "Diagonal cells are self-correlation. Choose two different variables.");
    return;
  }
  const aligned = getAlignedNumericPair(currentPayload, xColumn, yColumn);
  const summary = {
    n: aligned.xValues.length,
    pearson: pearsonCorrelation(aligned.xValues, aligned.yValues),
    spearman: spearmanCorrelation(aligned.xValues, aligned.yValues),
  };
  const regression = selectedTrendlineForPair(aligned);
  const fitCopy = regression
    ? `${regression.label} fit | R²: ${formatCorrelationValue(regression.rSquared)}`
    : "No trendline";
  corrFocusTitle.textContent = `${xColumn} vs ${yColumn} | Pearson: ${formatCorrelationValue(summary.pearson)} | Spearman: ${formatCorrelationValue(summary.spearman)} | ${fitCopy} | N: ${summary.n.toLocaleString()}`;
  renderPairScatterPlot(xColumn, yColumn, aligned, summary, "corr-focus-plot", regression);
}

function rerenderCorrelationScatterViews() {
  if (!currentPayload) return;
  if (correlationMode === "pair") {
    renderCorrelationPairExplorer();
    return;
  }
  renderFocusedMatrixScatter();
}

function renderCorrelationMatrixExplorer() {
  if (!corrMatrixPanel) return;
  if (!currentPayload) {
    if (corrMatrixToggles) corrMatrixToggles.innerHTML = "";
    renderCorrelationEmpty(corrMatrixHeatmap, "Upload a CSV to build a correlation matrix.");
    renderCorrelationEmpty(corrFocusPlot, "Click an off-diagonal matrix cell.");
    if (corrFocusTitle) corrFocusTitle.textContent = "Click a matrix cell to inspect its scatter.";
    return;
  }

  const numericColumns = currentPayload.numeric_columns;
  selectedMatrixColumns = selectedMatrixColumns.filter((column) => numericColumns.includes(column));
  renderCorrelationToggles();

  if (selectedMatrixColumns.length < 2) {
    renderCorrelationEmpty(corrMatrixHeatmap, "Select at least two numeric parameters.");
    renderCorrelationEmpty(corrFocusPlot, "Select at least two numeric parameters.");
    if (corrFocusTitle) corrFocusTitle.textContent = "Click a matrix cell to inspect its scatter.";
    return;
  }

  const method = corrMatrixMethod?.value === "spearman" ? "spearman" : "pearson";
  const built = buildMatrixSummaries(currentPayload, selectedMatrixColumns, method);
  currentMatrixPairLookup = built.summaryLookup;

  if (!hasPlotly()) {
    renderCorrelationEmpty(corrMatrixHeatmap, "Plotly is not loaded, so charts are unavailable.");
  } else {
    corrMatrixHeatmap.innerHTML = "";
    const heatmapPromise = Plotly.newPlot("corr-matrix-heatmap", [{
      type: "heatmap",
      z: built.matrix,
      x: selectedMatrixColumns,
      y: selectedMatrixColumns,
      zmin: -1,
      zmax: 1,
      colorscale: [
        [0, "#3b0f70"],
        [0.25, "#6c2ab9"],
        [0.5, "#f8fafc"],
        [0.75, "#41b6c4"],
        [1, "#1f8a70"],
      ],
      colorbar: {
        title: method === "spearman" ? "Spearman" : "Pearson",
        tickcolor: "#a8b0c0",
        tickfont: { color: "#a8b0c0" },
      },
      hovertemplate: "%{x} vs %{y}<br>Correlation: %{z:.4f}<extra></extra>",
    }], {
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 90, r: 34, t: 18, b: 90 },
      font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: "#e8ebf4" },
      xaxis: {
        tickangle: -35,
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
    }, {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ["lasso2d", "select2d"],
    });
    if (heatmapPromise && typeof heatmapPromise.then === "function") {
      heatmapPromise.then(() => {
        const node = corrMatrixHeatmap;
        if (!node || typeof node.on !== "function") return;
        if (typeof node.removeAllListeners === "function") {
          node.removeAllListeners("plotly_click");
        }
        node.on("plotly_click", (event) => {
          const point = event?.points?.[0];
          if (!point) return;
          const xColumn = String(point.x);
          const yColumn = String(point.y);
          if (xColumn === yColumn) {
            focusedMatrixPair = { xColumn, yColumn };
            renderFocusedMatrixScatter();
            return;
          }
          focusedMatrixPair = { xColumn, yColumn };
          renderFocusedMatrixScatter();
        });
        Plotly.Plots.resize(node);
      });
    }
  }

  const focusedStillValid = focusedMatrixPair && currentMatrixPairLookup.has(pairKey(focusedMatrixPair.xColumn, focusedMatrixPair.yColumn));
  if (!focusedStillValid) {
    focusedMatrixPair = built.defaultPair;
  }
  renderFocusedMatrixScatter();
}

function setCorrelationMode(mode) {
  correlationMode = mode === "matrix" ? "matrix" : "pair";
  if (corrPairModeButton) corrPairModeButton.classList.toggle("active", correlationMode === "pair");
  if (corrMatrixModeButton) corrMatrixModeButton.classList.toggle("active", correlationMode === "matrix");
  if (corrPairPanel) corrPairPanel.classList.toggle("hidden", correlationMode !== "pair");
  if (corrMatrixPanel) corrMatrixPanel.classList.toggle("hidden", correlationMode !== "matrix");

  if (correlationMode === "pair") {
    renderCorrelationPairExplorer();
  } else {
    renderCorrelationMatrixExplorer();
  }
  setTimeout(() => resizeCorrelationPlots(), 0);
}

function renderCorrelationView() {
  if (!currentPayload) {
    if (corrPairMetrics) corrPairMetrics.innerHTML = "";
    renderCorrelationEmpty(corrPairPlot, "Upload a CSV to start exploring correlations.");
    renderCorrelationEmpty(corrMatrixHeatmap, "Upload a CSV to build a correlation matrix.");
    renderCorrelationEmpty(corrFocusPlot, "Click an off-diagonal matrix cell.");
    if (corrFocusTitle) corrFocusTitle.textContent = "Click a matrix cell to inspect its scatter.";
    return;
  }

  const numericColumns = currentPayload.numeric_columns;
  if (numericColumns.length >= 2) {
    populateSimpleSelect(corrXSelect, numericColumns, corrXSelect?.value || numericColumns[0]);
    populateSimpleSelect(corrYSelect, numericColumns, corrYSelect?.value || numericColumns[Math.min(1, numericColumns.length - 1)]);
    ensureDistinctPairSelection();
  }

  setCorrelationMode(correlationMode);
}

function setOuterView(view) {
  activeOuterView = view;
  if (!dashboardTab || !statisticsTab || !correlationTab || !dashboardPanel || !statisticsPanel || !correlationPanel) return;
  const showDashboard = view === "dashboard";
  const showStatistics = view === "statistics";
  const showCorrelation = view === "correlation";
  dashboardTab.classList.toggle("active", showDashboard);
  statisticsTab.classList.toggle("active", showStatistics);
  correlationTab.classList.toggle("active", showCorrelation);
  dashboardPanel.classList.toggle("hidden", !showDashboard);
  statisticsPanel.classList.toggle("hidden", !showStatistics);
  correlationPanel.classList.toggle("hidden", !showCorrelation);
  if (showCorrelation) {
    renderCorrelationView();
    setTimeout(() => resizeCorrelationPlots(), 0);
    setTimeout(() => {
      if (correlationMode === "pair") {
        renderCorrelationPairExplorer();
      } else {
        renderCorrelationMatrixExplorer();
      }
    }, 60);
  }
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

function escapeHtmlAttribute(value) {
  return escapeHtml(String(value))
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function renderStatsHeaderCell(label) {
  const safeLabel = escapeHtml(String(label));
  const description = STAT_TERM_EXPLANATIONS[label];
  if (!description) {
    return `<th>${safeLabel}</th>`;
  }

  return `<th>${renderInfoTooltipLabel(label, description)}</th>`;
}

function renderInfoTooltipLabel(label, description, className = "stats-term-header") {
  const safeLabel = escapeHtml(String(label));
  const safeDescription = escapeHtmlAttribute(description);
  const safeAriaLabel = escapeHtmlAttribute(`Info about ${label}`);
  return `<span class="${escapeHtmlAttribute(className)}">${safeLabel}<button type="button" class="stats-term-info" aria-label="${safeAriaLabel}" data-tooltip="${safeDescription}">i</button></span>`;
}

function buildDashboardHtml(payload) {
  const payloadJson = JSON.stringify(payload).replaceAll("</script>", "<\\/script>");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(APP_TITLE)} | ${escapeHtml(payload.title)}</title>
  <link rel="icon" type="image/png" href="/favicon.ico" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/favicon.ico" />
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
  void loadSelectedCsv();
});

fileInput.addEventListener("change", () => {
  setSelectedFile(fileInput.files[0]);
  if (fileInput.files[0]) {
    void loadSelectedCsv();
  }
});

clearButton.addEventListener("click", () => {
  setLoading(false);
  form.reset();
  sourcePayload = null;
  currentPayload = null;
  draftFilterRules = [];
  appliedFilterRules = [];
  frame.srcdoc = "";
  setViewerContext("No dashboard loaded yet");
  emptyState.classList.remove("hidden");
  if (emptyStateKicker) emptyStateKicker.textContent = "No Data Yet";
  if (emptyStateTitle) emptyStateTitle.textContent = "Add data to generate a dashboard.";
  if (emptyStateCopy) emptyStateCopy.textContent = "Drop in a CSV file and the interactive 3D view will appear here.";
  selectedStatsColumns = [];
  selectedCategoricalStatsColumns = [];
  statsNumericSearchValue = "";
  statsCategoricalSearchValue = "";
  if (statsNumericSearch) statsNumericSearch.value = "";
  if (statsCategoricalSearch) statsCategoricalSearch.value = "";
  selectedMatrixColumns = [];
  focusedMatrixPair = null;
  correlationMode = "pair";
  renderFilterBuilder();
  renderStatsToolbar();
  renderStatsTable();
  renderCategoricalSummary();
  renderCorrelationView();
  setOuterView("dashboard");
  setSelectedFile(null);
  clearMeta();
  clearError();
});

if (dashboardTab && statisticsTab && correlationTab) {
  dashboardTab.addEventListener("click", () => setOuterView("dashboard"));
  statisticsTab.addEventListener("click", () => setOuterView("statistics"));
  correlationTab.addEventListener("click", () => setOuterView("correlation"));
}
if (statsNumericDownloadButton) {
  statsNumericDownloadButton.addEventListener("click", downloadNumericStatsCsv);
}
if (statsCategoricalDownloadButton) {
  statsCategoricalDownloadButton.addEventListener("click", downloadCategoricalSummaryCsv);
}
if (statsNumericSearch) {
  statsNumericSearch.addEventListener("input", () => {
    statsNumericSearchValue = statsNumericSearch.value;
    renderStatsToolbar();
  });
}
if (statsCategoricalSearch) {
  statsCategoricalSearch.addEventListener("input", () => {
    statsCategoricalSearchValue = statsCategoricalSearch.value;
    renderStatsToolbar();
  });
}
if (statsSelectVisibleNumericButton) {
  statsSelectVisibleNumericButton.addEventListener("click", () => {
    if (!currentPayload) return;
    selectedStatsColumns = uniqueOrderedColumns([
      ...selectedStatsColumns,
      ...filterColumnsByQuery(currentPayload.numeric_columns, statsNumericSearchValue),
    ]);
    renderStatsToolbar();
    renderStatsTable();
  });
}
if (statsClearNumericButton) {
  statsClearNumericButton.addEventListener("click", () => {
    selectedStatsColumns = [];
    renderStatsToolbar();
    renderStatsTable();
  });
}
if (statsSelectVisibleCategoricalButton) {
  statsSelectVisibleCategoricalButton.addEventListener("click", () => {
    if (!currentPayload) return;
    selectedCategoricalStatsColumns = uniqueOrderedColumns([
      ...selectedCategoricalStatsColumns,
      ...filterColumnsByQuery(categoricalColumnsForPayload(currentPayload), statsCategoricalSearchValue),
    ]);
    renderStatsToolbar();
    renderCategoricalSummary();
  });
}
if (statsClearCategoricalButton) {
  statsClearCategoricalButton.addEventListener("click", () => {
    selectedCategoricalStatsColumns = [];
    renderStatsToolbar();
    renderCategoricalSummary();
  });
}
if (addFilterRuleButton) {
  addFilterRuleButton.addEventListener("click", () => {
    if (!sourcePayload) return;
    draftFilterRules = [...draftFilterRules, createFilterRule(sourcePayload)];
    renderFilterBuilder();
  });
}
if (clearFilterRulesButton) {
  clearFilterRulesButton.addEventListener("click", () => {
    draftFilterRules = [];
    appliedFilterRules = [];
    if (sourcePayload) {
      refreshActivePayload();
    }
    renderFilterBuilder();
  });
}
if (applyFilterRulesButton) {
  applyFilterRulesButton.addEventListener("click", () => {
    if (!sourcePayload) return;
    const invalidRuleCount = filterPreviewForRules(sourcePayload, draftFilterRules).invalidRuleCount;
    if (invalidRuleCount) {
      showError(`Complete ${invalidRuleCount} incomplete filter ${invalidRuleCount === 1 ? "rule" : "rules"} before applying.`);
      return;
    }
    clearError();
    appliedFilterRules = draftFilterRules.map(cloneFilterRule);
    refreshActivePayload();
    renderFilterBuilder();
  });
}
if (corrPairModeButton) {
  corrPairModeButton.addEventListener("click", () => setCorrelationMode("pair"));
}
if (corrMatrixModeButton) {
  corrMatrixModeButton.addEventListener("click", () => setCorrelationMode("matrix"));
}
if (corrXSelect) {
  corrXSelect.addEventListener("change", renderCorrelationPairExplorer);
}
if (corrYSelect) {
  corrYSelect.addEventListener("change", renderCorrelationPairExplorer);
}
if (corrAlphaSlider) {
  const onAlphaChange = () => {
    updateCorrelationAlphaLabel();
    rerenderCorrelationScatterViews();
  };
  corrAlphaSlider.addEventListener("input", onAlphaChange);
  corrAlphaSlider.addEventListener("change", onAlphaChange);
}
if (corrFitSelect) {
  corrFitSelect.addEventListener("change", rerenderCorrelationScatterViews);
}
if (corrMatrixMethod) {
  corrMatrixMethod.addEventListener("change", () => {
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
  });
}
if (corrSelectAllButton) {
  corrSelectAllButton.addEventListener("click", () => {
    if (!currentPayload) return;
    selectedMatrixColumns = [...currentPayload.numeric_columns];
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
  });
}
if (corrClearAllButton) {
  corrClearAllButton.addEventListener("click", () => {
    selectedMatrixColumns = [];
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
  });
}
if (corrPairResetButton) {
  corrPairResetButton.addEventListener("click", () => reset2DPlotZoom("corr-pair-plot"));
}
if (corrFocusResetButton) {
  corrFocusResetButton.addEventListener("click", () => reset2DPlotZoom("corr-focus-plot"));
}
if (corrPairSaveButton) {
  corrPairSaveButton.addEventListener("click", () => {
    const x = safeFilenamePart(corrXSelect?.value || "x");
    const y = safeFilenamePart(corrYSelect?.value || "y");
    download2DPlotImage("corr-pair-plot", `${safeDatasetStem()}_pair_${x}_vs_${y}`);
  });
}
if (corrFocusSaveButton) {
  corrFocusSaveButton.addEventListener("click", () => {
    const x = safeFilenamePart(focusedMatrixPair?.xColumn || "x");
    const y = safeFilenamePart(focusedMatrixPair?.yColumn || "y");
    download2DPlotImage("corr-focus-plot", `${safeDatasetStem()}_focused_${x}_vs_${y}`);
  });
}
window.addEventListener("resize", () => {
  if (!currentPayload) return;
  const categoricalColumns = categoricalColumnsForPayload(currentPayload)
    .filter((column) => selectedCategoricalStatsColumns.includes(column));
  updateCategoricalSheetHeight(categoricalColumns.length);
  if (hasPlotly()) {
    ["corr-pair-plot", "corr-matrix-heatmap", "corr-focus-plot"].forEach((id) => {
      const node = document.getElementById(id);
      if (node && node.data) {
        Plotly.Plots.resize(node);
      }
    });
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loadSelectedCsv();
});

renderStatsTable();
renderCategoricalSummary();
updateCorrelationAlphaLabel();
renderCorrelationView();
renderFilterBuilder();
