const APP_TITLE = "CSV 3D Explorer";
const DEFAULT_TITLE_SUFFIX = "3D Interactive Dashboard";
const MAX_CATEGORICAL_COLOR_LEVELS = 30;
const NONE_OPTION = "__none__";
const PERSISTENCE_DB_NAME = "statzooka-app-state";
const PERSISTENCE_STORE_NAME = "app-state";
const PERSISTENCE_RECORD_ID = "latest";
const PERSISTENCE_VERSION = 1;

const form = document.getElementById("upload-form");
const fileInput = document.getElementById("csv-file");
const dropzone = document.getElementById("dropzone");
const dropzoneTitle = document.getElementById("dropzone-title");
const dropzoneSubtitle = document.getElementById("dropzone-subtitle");
const frame = document.getElementById("dashboard-frame");
const viewerShell = document.querySelector(".viewer");
const viewerStage = document.querySelector(".viewer-stage");
const meta = document.getElementById("meta");
const error = document.getElementById("error");
const viewerContext = document.getElementById("viewer-context") || document.getElementById("viewer-title");
const clearButton = document.getElementById("clear-button");
const prepImpact = document.getElementById("prep-impact");
const prepSummaryGrid = document.getElementById("prep-summary-grid");
const prepSummaryEmpty = document.getElementById("prep-summary-empty");
const prepOpenButton = document.getElementById("prep-open-button");
const emptyState = document.getElementById("empty-state");
const loadingState = document.getElementById("loading-state");
const loadingTitle = document.getElementById("loading-title");
const dashboardTab = document.getElementById("dashboard-tab");
const statisticsTab = document.getElementById("statistics-tab");
const distributionTab = document.getElementById("distribution-tab");
const correlationTab = document.getElementById("correlation-tab");
const dashboardPanel = document.getElementById("dashboard-panel");
const transformationPanel = document.getElementById("transformation-panel");
const statisticsPanel = document.getElementById("statistics-panel");
const distributionPanel = document.getElementById("distribution-panel");
const correlationPanel = document.getElementById("correlation-panel");
const prepTransformModeButton = document.getElementById("prep-transform-mode-button");
const prepDiagnosticsModeButton = document.getElementById("prep-diagnostics-mode-button");
const prepTransformPanel = document.getElementById("prep-transform-panel");
const prepDiagnosticsPanel = document.getElementById("prep-diagnostics-panel");
const transformSummarySubtitle = document.getElementById("transform-summary-subtitle");
const transformImpactGrid = document.getElementById("transform-impact-grid");
const transformApplyNote = document.getElementById("transform-apply-note");
const transformResetButton = document.getElementById("transform-reset-button");
const transformApplyButton = document.getElementById("transform-apply-button");
const transformScaleMode = document.getElementById("transform-scale-mode");
const transformScaleColumns = document.getElementById("transform-scale-columns");
const transformLogHandling = document.getElementById("transform-log-handling");
const transformLogColumns = document.getElementById("transform-log-columns");
const transformEncodeColumns = document.getElementById("transform-encode-columns");
const keepRules = document.getElementById("keep-rules");
const keepEmpty = document.getElementById("keep-empty");
const excludeRules = document.getElementById("exclude-rules");
const excludeEmpty = document.getElementById("exclude-empty");
const addKeepRuleButton = document.getElementById("add-keep-rule-button");
const clearKeepRulesButton = document.getElementById("clear-keep-rules-button");
const addExcludeRuleButton = document.getElementById("add-exclude-rule-button");
const clearExcludeRulesButton = document.getElementById("clear-exclude-rules-button");
const transformPreviewGrid = document.getElementById("transform-preview-grid");
const transformPreviewSubtitle = document.getElementById("transform-preview-subtitle");
const transformPreviewNote = document.getElementById("transform-preview-note");
const transformPreviewTable = document.getElementById("transform-preview-table");
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
const missingColumnSelect = document.getElementById("missing-column-select");
const missingValuesSummary = document.getElementById("missing-values-summary");
const missingValuesFocus = document.getElementById("missing-values-focus");
const missingValuesSheet = document.getElementById("missing-values-sheet");
const distVariableSelect = document.getElementById("dist-variable-select");
const distSplitSelect = document.getElementById("dist-split-select");
const distViewSelect = document.getElementById("dist-view-select");
const distOverlaySelect = document.getElementById("dist-overlay-select");
const distNormalizationSelect = document.getElementById("dist-normalization-select");
const distBinControl = document.getElementById("dist-bin-control");
const distBinSlider = document.getElementById("dist-bin-slider");
const distBinValue = document.getElementById("dist-bin-value");
const distNote = document.getElementById("dist-note");
const distSummaryMetrics = document.getElementById("dist-summary-metrics");
const distResetButton = document.getElementById("dist-reset-button");
const distSaveButton = document.getElementById("dist-save-button");
const distBoxSaveButton = document.getElementById("dist-box-save-button");
const distViolinSaveButton = document.getElementById("dist-violin-save-button");
const distPlot = document.getElementById("dist-plot");
const distBoxPlot = document.getElementById("dist-box-plot");
const distViolinPlot = document.getElementById("dist-violin-plot");
const outlierMethodSelect = document.getElementById("outlier-method-select");
const outlierIdSelect = document.getElementById("outlier-id-select");
const outlierThresholdSlider = document.getElementById("outlier-threshold-slider");
const outlierThresholdLabel = document.getElementById("outlier-threshold-label");
const outlierThresholdValue = document.getElementById("outlier-threshold-value");
const outlierThresholdMeta = document.getElementById("outlier-threshold-meta");
const outlierSearch = document.getElementById("outlier-search");
const outlierSelectionSummary = document.getElementById("outlier-selection-summary");
const outlierColumnSelector = document.getElementById("outlier-column-selector");
const outlierSelectVisibleButton = document.getElementById("outlier-select-visible-button");
const outlierClearColumnsButton = document.getElementById("outlier-clear-columns-button");
const outlierNote = document.getElementById("outlier-note");
const outlierSummaryMetrics = document.getElementById("outlier-summary-metrics");
const outlierFocusSelect = document.getElementById("outlier-focus-select");
const outlierScatterXSelect = document.getElementById("outlier-scatter-x-select");
const outlierScatterYSelect = document.getElementById("outlier-scatter-y-select");
const outlierCreateRuleButton = document.getElementById("outlier-create-rule-button");
const outlierRuleStatus = document.getElementById("outlier-rule-status");
const outlierColumnSummary = document.getElementById("outlier-column-summary");
const outlierRowSummary = document.getElementById("outlier-row-summary");
const outlierColumnSheet = document.getElementById("outlier-column-sheet");
const outlierRowSheet = document.getElementById("outlier-row-sheet");
const outlierScatterPlot = document.getElementById("outlier-scatter-plot");
const outlierHistogramPlot = document.getElementById("outlier-histogram-plot");
const outlierScatterResetButton = document.getElementById("outlier-scatter-reset-button");
const outlierScatterSaveButton = document.getElementById("outlier-scatter-save-button");
const outlierHistSaveButton = document.getElementById("outlier-hist-save-button");
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
let draftTransformConfig = null;
let appliedTransformConfig = null;
let selectedStatsColumns = [];
let selectedCategoricalStatsColumns = [];
let statsNumericSearchValue = "";
let statsCategoricalSearchValue = "";
let selectedMissingColumn = null;
let activeOuterView = "dashboard";
let activePrepView = "transform";
let distributionColumn = null;
let distributionSplitColumn = NONE_OPTION;
let distributionViewMode = "histogram";
let distributionOverlayMode = "kde";
let distributionBinCount = 24;
let distributionNormalization = "density";
let outlierMethod = "iqr";
let outlierThreshold = 1.5;
let outlierSelectedColumns = [];
let outlierSearchValue = "";
let outlierIdColumn = NONE_OPTION;
let outlierFocusColumn = null;
let outlierScatterXColumn = null;
let outlierScatterYColumn = null;
let outlierSelectedRowIndex = null;
let correlationMode = "pair";
let selectedMatrixColumns = [];
let focusedMatrixPair = null;
let currentMatrixPairLookup = new Map();
let nextFilterRuleId = 1;
let responsivePlotResizeFrame = 0;
let responsivePlotObserver = null;
let persistenceWriteTimer = 0;
let persistenceRestorePromise = null;
let dashboardViewState = null;
const responsivePlotObservedSizes = new WeakMap();
const SCALING_OPTIONS = [
  { value: "none", label: "No scaling" },
  { value: "standardize", label: "Standardize (z-score, sample SD)" },
  { value: "normalize", label: "Normalize (min-max)" },
];
const OUTLIER_ROW_TABLE_LIMIT = 100;
const OUTLIER_METHOD_CONFIG = {
  iqr: {
    label: "IQR Multiplier",
    defaultThreshold: 1.5,
    min: 0.5,
    max: 4,
    step: 0.1,
    note: "Flags values outside Q1 - k x IQR or Q3 + k x IQR. 1.5 is the common default.",
  },
  zscore: {
    label: "Absolute Z-Score Cutoff",
    defaultThreshold: 3,
    min: 2,
    max: 5,
    step: 0.1,
    note: "Flags values with absolute z-score above the cutoff, using the sample standard deviation. 3.0 is a common default.",
  },
  modified_zscore: {
    label: "Modified Z-Score Cutoff",
    defaultThreshold: 3.5,
    min: 2.5,
    max: 6,
    step: 0.1,
    note: "Uses the median and MAD, so it is more robust to skewed data. 3.5 is a common default.",
  },
};
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
    { value: "outside_range", label: "is outside range" },
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
  "Rows Used": "Number of rows with usable numeric values for this column.",
  "Mean ± Sample Std Dev": "Mean is the average value. Sample standard deviation uses n - 1 and shows how spread out the values are around the mean.",
  "Median": "The middle value when the data is sorted.",
  "[Min, Max]": "The smallest and largest observed values.",
  "[Q1, Q3]": "Q1 and Q3 are the 25th and 75th percentiles using linear interpolation, the default method in many statistical tools.",
  "Skewness": "How asymmetric the distribution is. Positive means a longer right tail, negative means a longer left tail.",
  "Excess Kurtosis": "Adjusted excess kurtosis compares tail weight with a normal distribution. A normal distribution is near 0.",
  "Count": "Number of non-empty entries in this categorical column.",
  "Unique Values": "Number of distinct category values.",
  "Top Value": "Most frequent category value (mode).",
  "Top Frequency": "How many times the top value appears.",
};
const CORRELATION_METRIC_EXPLANATIONS = {
  "Pearson": "Measures linear relationship from -1 to 1. Values near 1 or -1 indicate a strong straight-line relationship; values near 0 indicate little linear association.",
  "Spearman": "Measures monotonic rank relationship from -1 to 1. It is more robust to outliers and captures ordered trends even when the relationship is not perfectly linear.",
  "Rows Used": "Number of rows with usable values for both selected variables after filtering and missing-value handling.",
  "Curve": "Shows which trendline is currently drawn on the scatter plot. Linear is a straight line; polynomial mode chooses the quadratic or cubic fit with the highest in-sample R².",
  "Fit R²": "In-sample fit measure for the displayed trendline. Closer to 1 means the fitted curve tracks these data more closely, but it does not prove predictive performance.",
};
const DISTRIBUTION_METRIC_EXPLANATIONS = {
  "Rows Used": "Rows with a usable numeric value for the selected variable after filtering.",
  "Numeric Missing": "Rows where the selected numeric value is missing or non-numeric.",
  "Split Missing": "Rows with a usable numeric value but no usable split-group value.",
  "Mean": "Arithmetic average of the included values.",
  "Median": "Middle value after sorting the included values.",
  "IQR": "Interquartile range, calculated as Q3 minus Q1. It captures the middle 50% spread.",
  "Sample Std Dev": "Sample standard deviation of the included values, calculated with n - 1.",
};
const DISTRIBUTION_SINGLE_COLOR = "#3b82f6";
const DISTRIBUTION_GROUP_COLORS = ["#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#22c55e", "#ec4899", "#64748b"];
const DISTRIBUTION_LINE_COLORS = ["#dbeafe", "#99f6e4", "#fde68a", "#fecaca", "#ddd6fe", "#bbf7d0", "#fbcfe8", "#cbd5e1"];
const DISTRIBUTION_PAPER_BG = "rgba(17, 19, 27, 0.94)";
const DISTRIBUTION_PLOT_BG = "#141925";
const DISTRIBUTION_GRID_COLOR = "rgba(148, 163, 184, 0.12)";
const DISTRIBUTION_ZERO_LINE_COLOR = "rgba(148, 163, 184, 0.2)";
const DISTRIBUTION_LEGEND_BG = "rgba(11, 14, 22, 0.88)";
const DISTRIBUTION_LEGEND_BORDER = "rgba(96, 165, 250, 0.34)";
const DISTRIBUTION_FONT_COLOR = "#eef2ff";
const DISTRIBUTION_SECONDARY_FONT_COLOR = "#c7d2e5";

function storageAvailable(area) {
  try {
    const key = "__statzooka_test__";
    area.setItem(key, "1");
    area.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

const hasLocalStorage = storageAvailable(window.localStorage);

function openPersistenceDb() {
  if (!("indexedDB" in window)) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PERSISTENCE_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PERSISTENCE_STORE_NAME)) {
        db.createObjectStore(PERSISTENCE_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open app storage."));
  });
}

async function readPersistedSnapshot() {
  if ("indexedDB" in window) {
    try {
      const db = await openPersistenceDb();
      if (db) {
        const result = await new Promise((resolve, reject) => {
          const transaction = db.transaction(PERSISTENCE_STORE_NAME, "readonly");
          const store = transaction.objectStore(PERSISTENCE_STORE_NAME);
          const request = store.get(PERSISTENCE_RECORD_ID);
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error || new Error("Could not read app state."));
        });
        db.close();
        if (result) return result.snapshot || null;
      }
    } catch (error) {
      // Fall back to localStorage when IndexedDB is unavailable.
    }
  }
  if (!hasLocalStorage) return null;
  try {
    const raw = window.localStorage.getItem(PERSISTENCE_DB_NAME);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

async function writePersistedSnapshot(snapshot) {
  if ("indexedDB" in window) {
    try {
      const db = await openPersistenceDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(PERSISTENCE_STORE_NAME, "readwrite");
          const store = transaction.objectStore(PERSISTENCE_STORE_NAME);
          const request = store.put({ id: PERSISTENCE_RECORD_ID, snapshot });
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error || new Error("Could not save app state."));
        });
        db.close();
        return;
      }
    } catch (error) {
      // Fall back to localStorage when IndexedDB writes fail.
    }
  }
  if (!hasLocalStorage) return;
  try {
    window.localStorage.setItem(PERSISTENCE_DB_NAME, JSON.stringify(snapshot));
  } catch (error) {
    // Ignore quota errors rather than breaking the current session.
  }
}

async function clearPersistedSnapshot() {
  if ("indexedDB" in window) {
    try {
      const db = await openPersistenceDb();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(PERSISTENCE_STORE_NAME, "readwrite");
          const store = transaction.objectStore(PERSISTENCE_STORE_NAME);
          const request = store.delete(PERSISTENCE_RECORD_ID);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error || new Error("Could not clear app state."));
        });
        db.close();
      }
    } catch (error) {
      // Continue to localStorage cleanup below.
    }
  }
  if (!hasLocalStorage) return;
  try {
    window.localStorage.removeItem(PERSISTENCE_DB_NAME);
  } catch (error) {
    // Ignore storage cleanup errors.
  }
}

function cloneDashboardViewState(state = null) {
  return state ? { ...state } : null;
}

function currentCorrelationSelectionState() {
  return {
    mode: correlationMode === "matrix" ? "matrix" : "pair",
    xColumn: corrXSelect?.value || null,
    yColumn: corrYSelect?.value || null,
    alpha: corrAlphaSlider ? Number(corrAlphaSlider.value) : null,
    fit: corrFitSelect?.value || "linear",
    matrixMethod: corrMatrixMethod?.value || "pearson",
    selectedMatrixColumns: [...selectedMatrixColumns],
    focusedMatrixPair: focusedMatrixPair ? { ...focusedMatrixPair } : null,
  };
}

function buildPersistenceSnapshot() {
  if (!sourcePayload) return null;
  return {
    version: PERSISTENCE_VERSION,
    dataset: {
      sourcePayload,
      fileName: fileInput.files[0]?.name || dropzoneTitle?.textContent || "dataset.csv",
      fileSize: fileInput.files[0]?.size || null,
    },
    view: {
      activeOuterView,
      activePrepView,
      draftTransformConfig: cloneTransformConfig(draftTransformConfig || defaultTransformConfig()),
      appliedTransformConfig: cloneTransformConfig(appliedTransformConfig || defaultTransformConfig()),
      selectedStatsColumns: [...selectedStatsColumns],
      selectedCategoricalStatsColumns: [...selectedCategoricalStatsColumns],
      statsNumericSearchValue,
      statsCategoricalSearchValue,
      selectedMissingColumn,
      distributionColumn,
      distributionSplitColumn,
      distributionViewMode,
      distributionOverlayMode,
      distributionBinCount,
      distributionNormalization,
      outlierMethod,
      outlierThreshold,
      outlierSelectedColumns: [...outlierSelectedColumns],
      outlierSearchValue,
      outlierIdColumn,
      outlierFocusColumn,
      outlierScatterXColumn,
      outlierScatterYColumn,
      outlierSelectedRowIndex,
      correlation: currentCorrelationSelectionState(),
      nextFilterRuleId,
      dashboardViewState: cloneDashboardViewState(dashboardViewState),
    },
  };
}

function persistAppStateSoon() {
  if (persistenceWriteTimer) {
    clearTimeout(persistenceWriteTimer);
  }
  persistenceWriteTimer = window.setTimeout(async () => {
    persistenceWriteTimer = 0;
    const snapshot = buildPersistenceSnapshot();
    if (!snapshot) return;
    await writePersistedSnapshot(snapshot);
  }, 120);
}

function applyPersistedFileMeta(fileName, fileSize = null) {
  if (!fileName) {
    setSelectedFile(null);
    return;
  }
  dropzoneTitle.textContent = fileName;
  if (Number.isFinite(fileSize)) {
    dropzoneSubtitle.textContent = `${(fileSize / 1024).toFixed(1)} KB selected`;
  } else {
    dropzoneSubtitle.textContent = "Restored from your previous session.";
  }
  setClearButtonVisibility(true);
}

function resetApplicationState() {
  setLoading(false);
  form.reset();
  sourcePayload = null;
  currentPayload = null;
  draftTransformConfig = null;
  appliedTransformConfig = null;
  dashboardViewState = null;
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
  selectedMissingColumn = null;
  distributionColumn = null;
  distributionSplitColumn = NONE_OPTION;
  distributionViewMode = "histogram";
  distributionOverlayMode = "kde";
  distributionBinCount = 24;
  distributionNormalization = "density";
  activePrepView = "transform";
  outlierMethod = "iqr";
  outlierThreshold = outlierMethodConfig(outlierMethod).defaultThreshold;
  outlierSelectedColumns = [];
  outlierSearchValue = "";
  outlierIdColumn = NONE_OPTION;
  outlierFocusColumn = null;
  outlierScatterXColumn = null;
  outlierScatterYColumn = null;
  outlierSelectedRowIndex = null;
  if (statsNumericSearch) statsNumericSearch.value = "";
  if (statsCategoricalSearch) statsCategoricalSearch.value = "";
  if (distBinSlider) distBinSlider.value = String(distributionBinCount);
  if (outlierSearch) outlierSearch.value = "";
  if (outlierThresholdSlider) outlierThresholdSlider.value = String(outlierThreshold);
  if (outlierMethodSelect) outlierMethodSelect.value = outlierMethod;
  if (corrAlphaSlider) corrAlphaSlider.value = "0.78";
  if (corrFitSelect) corrFitSelect.value = "linear";
  if (corrMatrixMethod) corrMatrixMethod.value = "pearson";
  selectedMatrixColumns = [];
  focusedMatrixPair = null;
  correlationMode = "pair";
  renderTransformationView();
  renderStatsToolbar();
  renderStatsTable();
  renderCategoricalSummary();
  renderMissingValuesSummary();
  renderDistributionView();
  renderOutlierView();
  updateCorrelationAlphaLabel();
  renderCorrelationView();
  setOuterView("dashboard");
  setSelectedFile(null);
  clearMeta();
  clearError();
}

function restoreCorrelationState(snapshot = {}) {
  correlationMode = snapshot.mode === "matrix" ? "matrix" : "pair";
  if (corrAlphaSlider && Number.isFinite(snapshot.alpha)) {
    corrAlphaSlider.value = String(Math.max(0.15, Math.min(1, snapshot.alpha)));
  }
  if (corrFitSelect && typeof snapshot.fit === "string") {
    corrFitSelect.value = snapshot.fit;
  }
  if (corrMatrixMethod && typeof snapshot.matrixMethod === "string") {
    corrMatrixMethod.value = snapshot.matrixMethod;
  }
  selectedMatrixColumns = Array.isArray(snapshot.selectedMatrixColumns) ? [...snapshot.selectedMatrixColumns] : [];
  focusedMatrixPair = snapshot.focusedMatrixPair && snapshot.focusedMatrixPair.xColumn && snapshot.focusedMatrixPair.yColumn
    ? { xColumn: snapshot.focusedMatrixPair.xColumn, yColumn: snapshot.focusedMatrixPair.yColumn }
    : null;
}

function restorePersistedState(snapshot) {
  if (!snapshot?.dataset?.sourcePayload) return false;
  const persistedPayload = snapshot.dataset.sourcePayload;
  if (!persistedPayload || !Array.isArray(persistedPayload.records) || !Array.isArray(persistedPayload.columns)) {
    return false;
  }

  sourcePayload = persistedPayload;
  currentPayload = persistedPayload;
  dashboardViewState = cloneDashboardViewState(snapshot.view?.dashboardViewState);
  draftTransformConfig = cloneTransformConfig(snapshot.view?.draftTransformConfig || defaultTransformConfig());
  appliedTransformConfig = cloneTransformConfig(snapshot.view?.appliedTransformConfig || defaultTransformConfig());
  selectedStatsColumns = Array.isArray(snapshot.view?.selectedStatsColumns) ? [...snapshot.view.selectedStatsColumns] : [];
  selectedCategoricalStatsColumns = Array.isArray(snapshot.view?.selectedCategoricalStatsColumns) ? [...snapshot.view.selectedCategoricalStatsColumns] : [];
  statsNumericSearchValue = typeof snapshot.view?.statsNumericSearchValue === "string" ? snapshot.view.statsNumericSearchValue : "";
  statsCategoricalSearchValue = typeof snapshot.view?.statsCategoricalSearchValue === "string" ? snapshot.view.statsCategoricalSearchValue : "";
  selectedMissingColumn = typeof snapshot.view?.selectedMissingColumn === "string" ? snapshot.view.selectedMissingColumn : null;
  distributionColumn = snapshot.view?.distributionColumn || null;
  distributionSplitColumn = snapshot.view?.distributionSplitColumn || NONE_OPTION;
  distributionViewMode = snapshot.view?.distributionViewMode || "histogram";
  distributionOverlayMode = snapshot.view?.distributionOverlayMode || "kde";
  distributionBinCount = Math.max(8, Math.min(80, Number(snapshot.view?.distributionBinCount) || 24));
  distributionNormalization = snapshot.view?.distributionNormalization || "density";
  activePrepView = snapshot.view?.activePrepView === "diagnostics" ? "diagnostics" : "transform";
  outlierMethod = snapshot.view?.outlierMethod || "iqr";
  outlierThreshold = normalizeThresholdForMethod(outlierMethod, Number(snapshot.view?.outlierThreshold));
  outlierSelectedColumns = Array.isArray(snapshot.view?.outlierSelectedColumns) ? [...snapshot.view.outlierSelectedColumns] : [];
  outlierSearchValue = typeof snapshot.view?.outlierSearchValue === "string" ? snapshot.view.outlierSearchValue : "";
  outlierIdColumn = snapshot.view?.outlierIdColumn || NONE_OPTION;
  outlierFocusColumn = snapshot.view?.outlierFocusColumn || null;
  outlierScatterXColumn = snapshot.view?.outlierScatterXColumn || null;
  outlierScatterYColumn = snapshot.view?.outlierScatterYColumn || null;
  outlierSelectedRowIndex = Number.isInteger(snapshot.view?.outlierSelectedRowIndex)
    ? snapshot.view.outlierSelectedRowIndex
    : null;
  nextFilterRuleId = Math.max(1, Number(snapshot.view?.nextFilterRuleId) || 1);
  restoreCorrelationState(snapshot.view?.correlation || {});
  if (statsNumericSearch) statsNumericSearch.value = statsNumericSearchValue;
  if (statsCategoricalSearch) statsCategoricalSearch.value = statsCategoricalSearchValue;
  if (distBinSlider) distBinSlider.value = String(distributionBinCount);
  if (outlierSearch) outlierSearch.value = outlierSearchValue;
  if (outlierThresholdSlider) outlierThresholdSlider.value = String(outlierThreshold);
  if (outlierMethodSelect) outlierMethodSelect.value = outlierMethod;
  applyPersistedFileMeta(snapshot.dataset.fileName, snapshot.dataset.fileSize);
  emptyState.classList.add("hidden");
  refreshActivePayload();
  updateCorrelationAlphaLabel();
  if (snapshot.view?.activeOuterView === "outlier" || snapshot.view?.activeOuterView === "diagnostics") {
    activePrepView = "diagnostics";
  }
  const restoredView = (snapshot.view?.activeOuterView === "outlier" || snapshot.view?.activeOuterView === "diagnostics")
    ? "transformation"
    : (snapshot.view?.activeOuterView || "dashboard");
  setOuterView(restoredView);
  if (corrXSelect && snapshot.view?.correlation?.xColumn) {
    corrXSelect.value = snapshot.view.correlation.xColumn;
  }
  if (corrYSelect && snapshot.view?.correlation?.yColumn) {
    corrYSelect.value = snapshot.view.correlation.yColumn;
  }
  renderCorrelationView();
  return true;
}

async function restorePersistedStateOnLoad() {
  const snapshot = await readPersistedSnapshot();
  if (!snapshot) return;
  const restored = restorePersistedState(snapshot);
  if (!restored) {
    await clearPersistedSnapshot();
  }
}

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

function setClearButtonVisibility(isVisible) {
  if (!clearButton) return;
  clearButton.classList.toggle("visible", Boolean(isVisible));
  const actionGroup = clearButton.closest(".actions");
  if (actionGroup) {
    actionGroup.classList.toggle("visible", Boolean(isVisible));
  }
}

function setSelectedFile(file) {
  if (!file) {
    dropzoneTitle.textContent = "Drag a CSV here";
    dropzoneSubtitle.textContent = "Drop it in or click to browse from your machine.";
    setClearButtonVisibility(false);
    return;
  }
  dropzoneTitle.textContent = file.name;
  dropzoneSubtitle.textContent = `${(file.size / 1024).toFixed(1)} KB selected`;
  setClearButtonVisibility(true);
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
    dashboardViewState = null;
    draftTransformConfig = defaultTransformConfig();
    appliedTransformConfig = defaultTransformConfig();
    selectedStatsColumns = payload.numeric_columns.slice(0, Math.min(4, payload.numeric_columns.length));
    selectedCategoricalStatsColumns = categoricalColumnsForPayload(payload).slice(0, Math.min(6, categoricalColumnsForPayload(payload).length));
    statsNumericSearchValue = "";
    statsCategoricalSearchValue = "";
    selectedMissingColumn = payload.columns[0] || null;
    distributionColumn = payload.numeric_columns[0] || null;
    distributionSplitColumn = NONE_OPTION;
    distributionViewMode = "histogram";
    distributionOverlayMode = "kde";
    distributionBinCount = 24;
    distributionNormalization = "density";
    activePrepView = "transform";
    outlierMethod = "iqr";
    outlierThreshold = outlierMethodConfig(outlierMethod).defaultThreshold;
    outlierSelectedColumns = payload.numeric_columns.slice(0, Math.min(3, payload.numeric_columns.length));
    outlierSearchValue = "";
    outlierIdColumn = payload.defaults.hover_id || NONE_OPTION;
    outlierFocusColumn = outlierSelectedColumns[0] || payload.numeric_columns[0] || null;
    outlierScatterXColumn = outlierSelectedColumns[0] || payload.numeric_columns[0] || null;
    outlierScatterYColumn = outlierSelectedColumns[1]
      || payload.numeric_columns.find((column) => column !== outlierScatterXColumn)
      || null;
    outlierSelectedRowIndex = null;
    if (statsNumericSearch) statsNumericSearch.value = "";
    if (statsCategoricalSearch) statsCategoricalSearch.value = "";
    if (distBinSlider) distBinSlider.value = String(distributionBinCount);
    if (outlierSearch) outlierSearch.value = "";
    if (outlierThresholdSlider) outlierThresholdSlider.value = String(outlierThreshold);
    if (outlierMethodSelect) outlierMethodSelect.value = outlierMethod;
    selectedMatrixColumns = payload.numeric_columns.slice(0, Math.min(8, payload.numeric_columns.length));
    focusedMatrixPair = null;
    correlationMode = "pair";
    renderTransformationView();
    refreshActivePayload();
    emptyState.classList.add("hidden");
    if (emptyStateKicker) emptyStateKicker.textContent = "No Data Yet";
    if (emptyStateTitle) emptyStateTitle.textContent = "Add data to generate a dashboard.";
    if (emptyStateCopy) emptyStateCopy.textContent = "Drop in a CSV file and the interactive 3D view will appear here.";
    setOuterView("dashboard");
    persistAppStateSoon();
  } catch (err) {
    sourcePayload = null;
    currentPayload = null;
    draftTransformConfig = null;
    appliedTransformConfig = null;
    renderTransformationView();
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

function cloneRecord(row) {
  return { ...row };
}

function cloneFilterRule(rule) {
  return { ...rule };
}

function defaultTransformConfig() {
  return {
    scaling: { mode: "none", columns: [] },
    log: { columns: [], handling: "missing" },
    encoding: { columns: [] },
    keepRules: [],
    excludeRules: [],
  };
}

function cloneTransformConfig(config = defaultTransformConfig()) {
  return {
    scaling: {
      mode: config.scaling?.mode || "none",
      columns: [...(config.scaling?.columns || [])],
    },
    log: {
      columns: [...(config.log?.columns || [])],
      handling: config.log?.handling === "exclude" ? "exclude" : "missing",
    },
    encoding: {
      columns: [...(config.encoding?.columns || [])],
    },
    keepRules: (config.keepRules || []).map(cloneFilterRule),
    excludeRules: (config.excludeRules || []).map(cloneFilterRule),
  };
}

function displayNameForColumn(payload, column) {
  if (!column || column === NONE_OPTION) return column;
  return payload?.display_names?.[column] || column;
}

function currentDisplayNameForColumn(column) {
  return displayNameForColumn(currentPayload, column);
}

function applyTransformLabel(baseLabel, column, config, payload) {
  const safeConfig = cloneTransformConfig(config || defaultTransformConfig());
  const isNumeric = payload?.numeric_columns?.includes(column);
  let label = baseLabel || column;
  if (!isNumeric) return label;
  if (safeConfig.log.columns.includes(column)) {
    label = `log10(${label})`;
  }
  if (safeConfig.scaling.mode === "standardize" && safeConfig.scaling.columns.includes(column)) {
    label = `z-score(${label})`;
  } else if (safeConfig.scaling.mode === "normalize" && safeConfig.scaling.columns.includes(column)) {
    label = `min-max(${label})`;
  }
  return label;
}

function uniqueGeneratedColumnName(baseName, usedNames) {
  const base = String(baseName || "encoded").trim() || "encoded";
  if (!usedNames.has(base)) {
    usedNames.add(base);
    return base;
  }
  let suffix = 2;
  let candidate = `${base}_${suffix}`;
  while (usedNames.has(candidate)) {
    suffix += 1;
    candidate = `${base}_${suffix}`;
  }
  usedNames.add(candidate);
  return candidate;
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
  if (operator === "between" || operator === "not_between" || operator === "outside_range") return "range";
  if (operator === "is_missing" || operator === "is_not_missing") return "none";
  return "single";
}

function valueLabelForRule(payload, rule, second = false) {
  const isNumeric = columnTypeForPayload(payload, rule.column) === "numeric";
  if (filterOperatorInputMode(rule.operator) === "range") {
    if (rule.operator === "outside_range") return second ? "Maximum kept value" : "Minimum kept value";
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
    case "outside_range":
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

function filterPreviewForRules(payload, rules, mode = "exclude") {
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

  const keepMatches = mode === "keep";
  const includedRecords = payload.records.filter((row) => {
    const matchesRules = keepMatches
      ? validRules.every((rule) => rowMatchesFilterRule(row, rule, payload))
      : validRules.some((rule) => rowMatchesFilterRule(row, rule, payload));
    return keepMatches ? matchesRules : !matchesRules;
  });
  return {
    includedRecords,
    excludedCount: payload.records.length - includedRecords.length,
    includedCount: includedRecords.length,
    invalidRuleCount,
    validRules,
  };
}

function createTransformRule(group) {
  return createFilterRule(sourcePayload || currentPayload || null);
}

function setTransformRule(group, ruleId, updates) {
  if (!draftTransformConfig) return;
  draftTransformConfig[group] = draftTransformConfig[group].map((rule) => (rule.id === ruleId ? { ...rule, ...updates } : rule));
  renderTransformationView();
  persistAppStateSoon();
}

function removeTransformRule(group, ruleId) {
  if (!draftTransformConfig) return;
  draftTransformConfig[group] = draftTransformConfig[group].filter((rule) => rule.id !== ruleId);
  renderTransformationView();
  persistAppStateSoon();
}

function validRuleCount(payload, rules) {
  return rules.filter((rule) => validateFilterRule(rule, payload)).length;
}

function toggleTransformColumn(section, column) {
  if (!draftTransformConfig) return;
  const target = Array.isArray(draftTransformConfig[section])
    ? draftTransformConfig[section]
    : draftTransformConfig[section].columns;
  const current = new Set(target);
  if (current.has(column)) {
    current.delete(column);
  } else {
    current.add(column);
  }
  if (Array.isArray(draftTransformConfig[section])) {
    draftTransformConfig[section] = [...current];
  } else {
    draftTransformConfig[section].columns = [...current];
  }
  renderTransformationView();
  persistAppStateSoon();
}

function scalingSummaryText(config = appliedTransformConfig, payload = currentPayload || sourcePayload) {
  if (!config || !payload) return "No dataset loaded";
  const mode = config.scaling.mode;
  const count = config.scaling.columns.filter((column) => payload.columns.includes(column)).length;
  if (mode === "none" || !count) return "No persistent scaling";
  return `${count.toLocaleString()} column${count === 1 ? "" : "s"} ${mode === "standardize" ? "standardized" : "normalized"}`;
}

function encodingSummaryText(config = appliedTransformConfig, payload = currentPayload || sourcePayload) {
  if (!config || !payload) return "No dataset loaded";
  const count = config.encoding.columns.filter((column) => payload.columns.includes(column)).length;
  return count ? `${count.toLocaleString()} categorical column${count === 1 ? "" : "s"} one-hot encoded` : "No categorical encoding";
}

function previewConfigStatus(payload, config) {
  if (!payload || !config) return { invalidRuleCount: 0 };
  return {
    invalidRuleCount:
      filterPreviewForRules(payload, config.keepRules).invalidRuleCount
      + filterPreviewForRules(payload, config.excludeRules).invalidRuleCount,
  };
}

function derivePreparedPayload(payload, config) {
  if (!payload) return null;
  const safeConfig = cloneTransformConfig(config || defaultTransformConfig());
  const displayNames = Object.fromEntries(
    payload.columns.map((column) => [
      column,
      applyTransformLabel(displayNameForColumn(payload, column), column, safeConfig, payload),
    ]),
  );
  const originalRecords = payload.records.map(cloneRecord);
  const keepPreview = filterPreviewForRules(payload, safeConfig.keepRules, "keep");
  const keptRecords = keepPreview.includedRecords.map(cloneRecord);
  const afterKeepCount = keptRecords.length;

  const keptPayload = { ...payload, records: keptRecords };
  const excludePreview = filterPreviewForRules(keptPayload, safeConfig.excludeRules, "exclude");
  let workingRecords = excludePreview.includedRecords.map(cloneRecord);
  const afterExcludeCount = workingRecords.length;

  let logExcludedCount = 0;
  const logColumns = safeConfig.log.columns.filter((column) => payload.numeric_columns.includes(column));
  if (logColumns.length) {
    const nextRecords = [];
    workingRecords.forEach((row) => {
      const nextRow = { ...row };
      let dropRow = false;
      logColumns.forEach((column) => {
        const value = toFiniteNumber(nextRow[column]);
        if (value === null) {
          nextRow[column] = null;
          return;
        }
        if (value <= 0) {
          if (safeConfig.log.handling === "exclude") {
            dropRow = true;
          } else {
            nextRow[column] = null;
          }
          return;
        }
        nextRow[column] = Math.log10(value);
      });
      if (dropRow) {
        logExcludedCount += 1;
      } else {
        nextRecords.push(nextRow);
      }
    });
    workingRecords = nextRecords;
  }

  const scalingColumns = safeConfig.scaling.columns.filter((column) => payload.numeric_columns.includes(column));
  if (safeConfig.scaling.mode !== "none" && scalingColumns.length) {
    const stats = new Map();
    scalingColumns.forEach((column) => {
      const values = workingRecords.map((row) => toFiniteNumber(row[column])).filter((value) => value !== null);
      stats.set(column, {
        min: values.length ? Math.min(...values) : null,
        max: values.length ? Math.max(...values) : null,
        mean: meanValue(values),
        std: standardDeviation(values),
      });
    });
    workingRecords = workingRecords.map((row) => {
      const nextRow = { ...row };
      scalingColumns.forEach((column) => {
        const value = toFiniteNumber(nextRow[column]);
        if (value === null) {
          nextRow[column] = null;
          return;
        }
        const columnStats = stats.get(column);
        if (safeConfig.scaling.mode === "standardize") {
          if (!columnStats || columnStats.std === null || columnStats.std === 0) {
            nextRow[column] = 0;
          } else {
            nextRow[column] = (value - columnStats.mean) / columnStats.std;
          }
        } else if (!columnStats || columnStats.min === null || columnStats.max === null || columnStats.max === columnStats.min) {
          nextRow[column] = 0;
        } else {
          nextRow[column] = (value - columnStats.min) / (columnStats.max - columnStats.min);
        }
      });
      return nextRow;
    });
  }

  const encodedColumns = safeConfig.encoding.columns.filter((column) => payload.columns.includes(column) && !payload.numeric_columns.includes(column));
  let encodedAddedColumns = 0;
  const encodedColumnMap = new Map();
  if (encodedColumns.length) {
    const encodedSet = new Set(encodedColumns);
    const usedColumnNames = new Set(payload.columns.filter((column) => !encodedSet.has(column)));
    const levelSourceRecords = workingRecords.length ? workingRecords : payload.records;
    encodedColumns.forEach((column) => {
      const values = new Set();
      levelSourceRecords.forEach((row) => {
        const value = normalizeValue(row[column]);
        if (value !== null) values.add(String(value));
      });
      const entries = [...values]
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
        .map((level) => {
          const generatedColumn = uniqueGeneratedColumnName(`${column}__${level}`, usedColumnNames);
          displayNames[generatedColumn] = `${displayNameForColumn(payload, column)} = ${level}`;
          return { level, column: generatedColumn };
        });
      delete displayNames[column];
      encodedColumnMap.set(column, entries);
    });
    workingRecords = workingRecords.map((row) => {
      const nextRow = { ...row };
      encodedColumns.forEach((column) => {
        const raw = normalizeValue(row[column]);
        const entries = encodedColumnMap.get(column) || [];
        entries.forEach((entry) => {
          nextRow[entry.column] = raw !== null && String(raw) === entry.level ? 1 : 0;
        });
        delete nextRow[column];
      });
      return nextRow;
    });
    encodedAddedColumns = [...encodedColumnMap.values()].reduce((sum, entries) => sum + entries.length, 0);
  }
  const preparedTitle = safeConfig.scaling.mode === "none" && !logColumns.length && !encodedColumns.length && !safeConfig.keepRules.length && !safeConfig.excludeRules.length
    ? payload.title
    : `${payload.title} | Prepared`;
  let derivedPayload;
  if (!workingRecords.length) {
    const encodedColumnNames = [...encodedColumnMap.values()].flat().map((entry) => entry.column);
    const encodedSet = new Set(encodedColumns);
    const finalColumns = payload.columns.filter((column) => !encodedSet.has(column)).concat(encodedColumnNames).sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));
    const finalNumericColumns = uniqueOrderedColumns([
      ...payload.numeric_columns,
      ...encodedColumnNames,
    ]).filter((column) => finalColumns.includes(column)).sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));
    const finalColorColumns = uniqueOrderedColumns([
      ...finalNumericColumns,
      ...finalColumns.filter((column) => !finalNumericColumns.includes(column)),
    ]);
    const usedAxes = new Set();
    const defaultX = defaultColumn(finalNumericColumns, usedAxes) || finalNumericColumns[0] || NONE_OPTION;
    if (defaultX !== NONE_OPTION) usedAxes.add(defaultX);
    const defaultY = defaultColumn(finalNumericColumns, usedAxes) || finalNumericColumns[0] || NONE_OPTION;
    if (defaultY !== NONE_OPTION) usedAxes.add(defaultY);
    const defaultZ = defaultColumn(finalNumericColumns, usedAxes) || finalNumericColumns[0] || NONE_OPTION;
    derivedPayload = {
      title: preparedTitle,
      records: [],
      columns: finalColumns,
      display_names: Object.fromEntries(finalColumns.map((column) => [column, displayNames[column] || column])),
      numeric_columns: finalNumericColumns,
      color_columns: finalColorColumns,
      defaults: {
        x: defaultX,
        y: defaultY,
        z: defaultZ,
        color: NONE_OPTION,
        size: NONE_OPTION,
        hover_id: defaultColumn(finalColumns) || NONE_OPTION,
      },
    };
  } else {
    derivedPayload = buildPayload(workingRecords, preparedTitle, displayNames);
  }
  return {
    payload: derivedPayload,
    preview: {
      originalRows: originalRecords.length,
      originalColumns: payload.columns.length,
      afterKeepCount,
      afterExcludeCount,
      finalRows: derivedPayload.records.length,
      finalColumns: derivedPayload.columns.length,
      keepValidRuleCount: keepPreview.validRules.length,
      excludeValidRuleCount: excludePreview.validRules.length,
      keepInvalidRuleCount: keepPreview.invalidRuleCount,
      excludeInvalidRuleCount: excludePreview.invalidRuleCount,
      keptSubsetRemoved: originalRecords.length - afterKeepCount,
      excludedByRules: afterKeepCount - afterExcludeCount,
      excludedByLog: logExcludedCount,
      scaledColumnCount: scalingColumns.length,
      scalingMode: safeConfig.scaling.mode,
      logColumnCount: logColumns.length,
      encodedColumnCount: encodedColumns.length,
      encodedAddedColumns,
    },
  };
}

function datasetSummaryText() {
  if (!sourcePayload || !currentPayload) return "No dashboard loaded yet";
  const total = sourcePayload.records.length.toLocaleString();
  const included = currentPayload.records.length.toLocaleString();
  const cols = currentPayload.columns.length.toLocaleString();
  return included === total
    ? `${sourcePayload.title} | ${included} rows | ${cols} cols`
    : `${sourcePayload.title} | ${included} of ${total} rows | ${cols} cols`;
}

function refreshMetaMessage(preview = null) {
  if (!sourcePayload || !currentPayload) {
    clearMeta();
    return;
  }
  const safePreview = preview || derivePreparedPayload(sourcePayload, appliedTransformConfig || defaultTransformConfig())?.preview;
  const included = currentPayload.records.length;
  const total = sourcePayload.records.length;
  const base = `${included.toLocaleString()} rows included out of ${total.toLocaleString()} total across ${currentPayload.columns.length.toLocaleString()} prepared columns.`;
  if (!safePreview) {
    showMeta(base);
    return;
  }
  const notes = [];
  if (safePreview.keptSubsetRemoved) notes.push(`${safePreview.keptSubsetRemoved.toLocaleString()} removed by subset rules`);
  if (safePreview.excludedByRules) notes.push(`${safePreview.excludedByRules.toLocaleString()} excluded by exclusion rules`);
  if (safePreview.excludedByLog) notes.push(`${safePreview.excludedByLog.toLocaleString()} excluded by log handling`);
  if (safePreview.scaledColumnCount) notes.push(`${safePreview.scaledColumnCount.toLocaleString()} scaled`);
  if (safePreview.logColumnCount) notes.push(`${safePreview.logColumnCount.toLocaleString()} log transformed`);
  if (safePreview.encodedColumnCount) notes.push(`${safePreview.encodedColumnCount.toLocaleString()} encoded`);
  showMeta(notes.length ? `${base} ${notes.join(" | ")}.` : base);
}

function updatePreparedSelectionState() {
  selectedStatsColumns = syncSelectedColumns(currentPayload.numeric_columns, selectedStatsColumns);
  selectedCategoricalStatsColumns = syncSelectedColumns(
    categoricalColumnsForPayload(currentPayload),
    selectedCategoricalStatsColumns,
  );
  if (!currentPayload.columns.includes(selectedMissingColumn)) {
    selectedMissingColumn = currentPayload.columns[0] || null;
  }
  if (!currentPayload.numeric_columns.includes(distributionColumn)) {
    distributionColumn = currentPayload.numeric_columns[0] || null;
  }
  if (!distributionSplitColumnsForPayload(currentPayload).includes(distributionSplitColumn)) {
    distributionSplitColumn = NONE_OPTION;
  }
  outlierSelectedColumns = syncSelectedColumns(currentPayload.numeric_columns, outlierSelectedColumns, 3);
  if (!currentPayload.columns.includes(outlierIdColumn)) {
    outlierIdColumn = currentPayload.defaults.hover_id || NONE_OPTION;
  }
  syncOutlierReviewState(
    currentPayload,
    currentPayload.numeric_columns.filter((column) => outlierSelectedColumns.includes(column)),
  );
  selectedMatrixColumns = selectedMatrixColumns.filter((column) => currentPayload.numeric_columns.includes(column));
  if (selectedMatrixColumns.length < 2) {
    selectedMatrixColumns = currentPayload.numeric_columns.slice(0, Math.min(8, currentPayload.numeric_columns.length));
  }
}

function refreshActivePayload() {
  if (!sourcePayload) {
    currentPayload = null;
    frame.srcdoc = "";
    setViewerContext("No dashboard loaded yet");
    refreshMetaMessage();
    renderTransformationView();
    renderStatsToolbar();
    renderStatsTable();
    renderCategoricalSummary();
    renderMissingValuesSummary();
    renderDistributionView();
    renderOutlierView();
    renderCorrelationView();
    return;
  }

  const derived = derivePreparedPayload(sourcePayload, appliedTransformConfig || defaultTransformConfig());
  currentPayload = derived.payload;
  frame.srcdoc = buildDashboardHtml(currentPayload, dashboardViewState);
  setViewerContext(datasetSummaryText());
  updatePreparedSelectionState();
  renderTransformationView();
  renderStatsToolbar();
  renderStatsTable();
  renderCategoricalSummary();
  renderMissingValuesSummary();
  renderDistributionView();
  renderOutlierView();
  renderCorrelationView();
  refreshMetaMessage(derived.preview);
}

function renderTransformTagSelector(container, columns, selectedColumns, emptyMessage, onToggle) {
  if (!container) return;
  container.innerHTML = "";
  if (!columns.length) {
    container.innerHTML = `<div class="stats-selector-empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }
  columns.forEach((column) => {
    container.appendChild(
      createSelectorOption(column, selectedColumns.includes(column), () => onToggle(column), displayNameForColumn(sourcePayload || currentPayload, column)),
    );
  });
}

function renderScaleModeSelector() {
  if (!transformScaleMode) return;
  transformScaleMode.innerHTML = "";
  const currentMode = draftTransformConfig?.scaling.mode || "none";
  SCALING_OPTIONS.forEach((option) => {
    const label = document.createElement("label");
    label.className = "transform-radio-option" + (currentMode === option.value ? " active" : "");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "transform-scale-mode";
    input.value = option.value;
    input.checked = currentMode === option.value;
    input.addEventListener("change", () => {
      if (!draftTransformConfig) return;
      draftTransformConfig.scaling.mode = option.value;
      renderTransformationView();
    });
    const text = document.createElement("span");
    text.textContent = option.label;
    label.append(input, text);
    transformScaleMode.appendChild(label);
  });
}


function renderRuleBuilder({ container, emptyNode, rules, labelText, operatorText, helperText, group }) {
  if (!container || !emptyNode) return;
  const activeElement = document.activeElement;
  const focusState = activeElement && activeElement instanceof HTMLElement && activeElement.dataset.ruleGroup === group && activeElement.dataset.ruleId && activeElement.dataset.field
    ? {
      ruleId: activeElement.dataset.ruleId,
      field: activeElement.dataset.field,
      selectionStart: "selectionStart" in activeElement ? activeElement.selectionStart : null,
      selectionEnd: "selectionEnd" in activeElement ? activeElement.selectionEnd : null,
    }
    : null;

  container.innerHTML = "";
  if (!sourcePayload || !rules.length) {
    emptyNode.classList.add("visible");
    return;
  }
  emptyNode.classList.remove("visible");

  rules.forEach((rule, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "filter-rule";

    const header = document.createElement("div");
    header.className = "filter-rule-header";
    const label = document.createElement("div");
    label.className = "filter-rule-label";
    label.textContent = `${labelText} ${index + 1}`;
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary filter-remove";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeTransformRule(group, rule.id));
    header.append(label, removeButton);

    const grid = document.createElement("div");
    grid.className = "filter-rule-grid";

    const columnField = document.createElement("div");
    columnField.className = "filter-field";
    const columnLabel = document.createElement("label");
    columnLabel.textContent = "Column";
    const columnSelect = document.createElement("select");
    columnSelect.dataset.ruleGroup = group;
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
      setTransformRule(group, rule.id, {
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
    operatorLabel.textContent = operatorText;
    const operatorSelect = document.createElement("select");
    operatorSelect.dataset.ruleGroup = group;
    operatorSelect.dataset.ruleId = String(rule.id);
    operatorSelect.dataset.field = "operator";
    operatorsForColumn(sourcePayload, rule.column).forEach((operator) => {
      const option = document.createElement("option");
      option.value = operator.value;
      option.textContent = operator.label;
      operatorSelect.appendChild(option);
    });
    operatorSelect.value = rule.operator;
    operatorSelect.addEventListener("change", () => {
      setTransformRule(group, rule.id, {
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
      valueInput.dataset.ruleGroup = group;
      valueInput.dataset.ruleId = String(rule.id);
      valueInput.dataset.field = "value";
      valueInput.type = columnTypeForPayload(sourcePayload, rule.column) === "numeric" ? "number" : "text";
      valueInput.placeholder = previewPlaceholderForRule(sourcePayload, rule);
      valueInput.value = rule.value;
      if (rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list") {
        valueInput.type = "text";
      }
      valueInput.addEventListener("input", () => setTransformRule(group, rule.id, { value: valueInput.value }));
      valueField.append(valueLabel, valueInput);
      grid.appendChild(valueField);
    }

    if (mode === "range") {
      const secondField = document.createElement("div");
      secondField.className = "filter-field";
      const secondLabel = document.createElement("label");
      secondLabel.textContent = valueLabelForRule(sourcePayload, rule, true);
      const secondInput = document.createElement("input");
      secondInput.dataset.ruleGroup = group;
      secondInput.dataset.ruleId = String(rule.id);
      secondInput.dataset.field = "value2";
      secondInput.type = columnTypeForPayload(sourcePayload, rule.column) === "numeric" ? "number" : "text";
      secondInput.placeholder = previewPlaceholderForRule(sourcePayload, rule);
      secondInput.value = rule.value2;
      secondInput.addEventListener("input", () => setTransformRule(group, rule.id, { value2: secondInput.value }));
      secondField.append(secondLabel, secondInput);
      grid.appendChild(secondField);
    }

    const help = document.createElement("div");
    help.className = "filter-help";
    const multiValueHint = rule.operator === "eq" || rule.operator === "neq" || rule.operator === "in_list" || rule.operator === "not_in_list"
      ? " Use commas to enter multiple values."
      : "";
    help.textContent = validateFilterRule(rule, sourcePayload)
      ? `${rule.generatedFromOutliers ? "Generated from outlier review. Remove this rule if it should not be used. " : ""}${helperText}${multiValueHint}`
      : `Complete this rule to include it in the preview.${multiValueHint}`;

    wrapper.append(header, grid, help);
    container.appendChild(wrapper);
  });

  if (focusState) {
    const selector = `[data-rule-group="${group}"][data-rule-id="${focusState.ruleId}"][data-field="${focusState.field}"]`;
    const nextField = container.querySelector(selector);
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

function renderPreviewCards(preview) {
  if (!transformPreviewGrid) return;
  if (!preview) {
    transformPreviewGrid.innerHTML = "";
    return;
  }
  const cards = [
    { label: "Rows", value: `${preview.finalRows.toLocaleString()} / ${preview.originalRows.toLocaleString()}`, note: "Prepared vs raw" },
    { label: "Columns", value: `${preview.finalColumns.toLocaleString()} / ${preview.originalColumns.toLocaleString()}`, note: "Prepared vs raw" },
    { label: "Subset Rules", value: `${preview.keepValidRuleCount.toLocaleString()}`, note: `${preview.keptSubsetRemoved.toLocaleString()} rows removed` },
    { label: "Exclusion Rules", value: `${preview.excludeValidRuleCount.toLocaleString()}`, note: `${preview.excludedByRules.toLocaleString()} rows removed` },
    { label: "Scaling", value: preview.scaledColumnCount.toLocaleString(), note: preview.scalingMode === "none" ? "No scaling" : preview.scalingMode },
    { label: "Encoding", value: preview.encodedColumnCount.toLocaleString(), note: `${preview.encodedAddedColumns.toLocaleString()} columns added` },
  ];
  transformPreviewGrid.innerHTML = cards.map((item) => `
    <div class="corr-metric-card">
      <div class="corr-metric-label">${escapeHtml(item.label)}</div>
      <div class="corr-metric-value">${escapeHtml(item.value)}</div>
      <div class="transform-metric-note">${escapeHtml(item.note)}</div>
    </div>
  `).join("");
}

function renderPreviewTable(payload) {
  if (!transformPreviewTable) return;
  if (!payload) {
    transformPreviewTable.innerHTML = '<div class="stats-empty">Upload a CSV to preview prepared data.</div>';
    return;
  }
  if (!payload.records.length) {
    transformPreviewTable.innerHTML = '<div class="stats-empty">No rows remain after the current draft changes.</div>';
    return;
  }
  const previewColumns = payload.columns.slice(0, 8);
  const previewRows = payload.records.slice(0, 8);
  let html = '<table class="stats-table"><thead><tr>';
  previewColumns.forEach((column) => {
    html += `<th>${escapeHtml(displayNameForColumn(payload, column))}</th>`;
  });
  html += "</tr></thead><tbody>";
  previewRows.forEach((row) => {
    html += "<tr>";
    previewColumns.forEach((column) => {
      html += `<td>${escapeHtml(formatStatValue(row[column]))}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  transformPreviewTable.innerHTML = html;
}

function renderPrepSummary(preview) {
  if (!prepImpact || !prepSummaryGrid || !prepSummaryEmpty) return;
  if (prepOpenButton) {
    prepOpenButton.classList.toggle("active", activeOuterView === "transformation");
  }
  if (!sourcePayload || !currentPayload || !appliedTransformConfig) {
    prepImpact.textContent = "No dataset loaded";
    prepSummaryGrid.innerHTML = "";
    prepSummaryEmpty.classList.add("visible");
    return;
  }
  prepSummaryEmpty.classList.toggle("visible", false);
  prepImpact.textContent = `${currentPayload.records.length.toLocaleString()} rows | ${currentPayload.columns.length.toLocaleString()} cols`;
  const appliedPreview = preview || derivePreparedPayload(sourcePayload, appliedTransformConfig)?.preview;
  const items = [
    { label: "Prep workspace", value: activeOuterView === "transformation" ? (activePrepView === "diagnostics" ? "Diagnostics open" : "Transform open") : "Closed" },
    { label: "Applied steps", value: [
      scalingSummaryText(appliedTransformConfig, sourcePayload),
      appliedTransformConfig.log.columns.length ? `${appliedTransformConfig.log.columns.length.toLocaleString()} log transform${appliedTransformConfig.log.columns.length === 1 ? "" : "s"}` : "No log transforms",
      encodingSummaryText(appliedTransformConfig, sourcePayload),
      appliedPreview?.keepValidRuleCount ? `${appliedPreview.keepValidRuleCount.toLocaleString()} subset rule${appliedPreview.keepValidRuleCount === 1 ? "" : "s"}` : "No subset rules",
      appliedPreview?.excludeValidRuleCount ? `${appliedPreview.excludeValidRuleCount.toLocaleString()} exclusion rule${appliedPreview.excludeValidRuleCount === 1 ? "" : "s"}` : "No exclusion rules",
    ].join(" | ") },
    { label: "Prepared rows", value: currentPayload.records.length.toLocaleString() },
    { label: "Prepared columns", value: currentPayload.columns.length.toLocaleString() },
  ];
  prepSummaryGrid.innerHTML = items.map((item) => `
    <div class="prep-summary-item">
      <div class="prep-summary-label">${escapeHtml(item.label)}</div>
      <div class="prep-summary-value">${escapeHtml(item.value)}</div>
    </div>
  `).join("");
}

function renderPrepModeSwitch() {
  if (prepTransformModeButton) {
    prepTransformModeButton.classList.toggle("active", activePrepView === "transform");
  }
  if (prepDiagnosticsModeButton) {
    prepDiagnosticsModeButton.classList.toggle("active", activePrepView === "diagnostics");
  }
  if (prepTransformPanel) {
    prepTransformPanel.classList.toggle("hidden", activePrepView !== "transform");
  }
  if (prepDiagnosticsPanel) {
    prepDiagnosticsPanel.classList.toggle("hidden", activePrepView !== "diagnostics");
  }
}

function setPrepView(view) {
  activePrepView = view === "diagnostics" ? "diagnostics" : "transform";
  renderPrepModeSwitch();
  if (activePrepView === "diagnostics") {
    renderOutlierView();
    setTimeout(() => resizeOutlierPlots(), 0);
  } else {
    renderTransformationView();
  }
  persistAppStateSoon();
}

function renderTransformationView() {
  renderPrepModeSwitch();
  renderScaleModeSelector();
  if (!sourcePayload || !draftTransformConfig) {
    if (transformSummarySubtitle) transformSummarySubtitle.textContent = "Upload a CSV to begin preparing the dataset.";
    if (transformImpactGrid) transformImpactGrid.innerHTML = "";
    if (transformApplyNote) transformApplyNote.textContent = "Draft changes are previewed here first and only affect the analytical tabs after you apply them.";
    if (transformPreviewSubtitle) transformPreviewSubtitle.textContent = "Preview how the applied pipeline will change rows, columns, and data types.";
    if (transformPreviewNote) transformPreviewNote.textContent = "No preview available yet.";
    renderPreviewCards(null);
    renderPreviewTable(null);
    renderPrepSummary(null);
    renderRuleBuilder({ container: keepRules, emptyNode: keepEmpty, rules: [], labelText: "Keep Rule", operatorText: "Keep rows when", helperText: "", group: "keepRules" });
    renderRuleBuilder({ container: excludeRules, emptyNode: excludeEmpty, rules: [], labelText: "Exclusion Rule", operatorText: "Exclude rows when", helperText: "", group: "excludeRules" });
    return;
  }

  const numericColumns = sourcePayload.numeric_columns;
  const categoricalColumns = categoricalColumnsForPayload(sourcePayload);
  renderTransformTagSelector(transformScaleColumns, numericColumns, draftTransformConfig.scaling.columns, "No numeric columns available.", (column) => toggleTransformColumn("scaling", column));
  renderTransformTagSelector(transformLogColumns, numericColumns, draftTransformConfig.log.columns, "No numeric columns available.", (column) => toggleTransformColumn("log", column));
  renderTransformTagSelector(transformEncodeColumns, categoricalColumns, draftTransformConfig.encoding.columns, "No categorical columns available.", (column) => toggleTransformColumn("encoding", column));
  if (transformLogHandling) transformLogHandling.value = draftTransformConfig.log.handling;

  const status = previewConfigStatus(sourcePayload, draftTransformConfig);
  const previewResult = status.invalidRuleCount ? null : derivePreparedPayload(sourcePayload, draftTransformConfig);
  const hasDraftChanges = JSON.stringify(draftTransformConfig) !== JSON.stringify(appliedTransformConfig || defaultTransformConfig());
  const cards = [
    { label: "Scaling", value: scalingSummaryText(draftTransformConfig, sourcePayload) },
    { label: "Encoding", value: encodingSummaryText(draftTransformConfig, sourcePayload) },
    { label: "Subset", value: `${validRuleCount(sourcePayload, draftTransformConfig.keepRules).toLocaleString()} active rule${validRuleCount(sourcePayload, draftTransformConfig.keepRules) === 1 ? "" : "s"}` },
    { label: "Exclusions", value: `${validRuleCount(sourcePayload, draftTransformConfig.excludeRules).toLocaleString()} active rule${validRuleCount(sourcePayload, draftTransformConfig.excludeRules) === 1 ? "" : "s"}` },
  ];
  if (transformSummarySubtitle) {
    transformSummarySubtitle.textContent = hasDraftChanges ? "Draft changes are ready to apply across every analysis tab." : "Draft matches the currently applied prepared dataset.";
  }
  if (transformImpactGrid) {
    transformImpactGrid.innerHTML = cards.map((item) => `
      <div class="corr-metric-card">
        <div class="corr-metric-label">${escapeHtml(item.label)}</div>
        <div class="corr-metric-value">${escapeHtml(item.value)}</div>
      </div>
    `).join("");
  }
  if (transformApplyNote) {
    transformApplyNote.textContent = status.invalidRuleCount
      ? `Complete ${status.invalidRuleCount} incomplete rule${status.invalidRuleCount === 1 ? "" : "s"} before applying.`
      : "Apply changes to rebuild the prepared dataset used by the 3D view, statistics, distributions, and correlation tabs.";
  }
  if (transformApplyButton) transformApplyButton.disabled = status.invalidRuleCount > 0 || !hasDraftChanges;
  if (transformResetButton) transformResetButton.disabled = !hasDraftChanges;
  if (addKeepRuleButton) addKeepRuleButton.disabled = false;
  if (clearKeepRulesButton) clearKeepRulesButton.disabled = !draftTransformConfig.keepRules.length;
  if (addExcludeRuleButton) addExcludeRuleButton.disabled = false;
  if (clearExcludeRulesButton) clearExcludeRulesButton.disabled = !draftTransformConfig.excludeRules.length;

  renderRuleBuilder({
    container: keepRules,
    emptyNode: keepEmpty,
    rules: draftTransformConfig.keepRules,
    labelText: "Keep Rule",
    operatorText: "Keep rows when",
    helperText: "Only rows matching this rule and the other keep rules remain in the prepared dataset.",
    group: "keepRules",
  });
  renderRuleBuilder({
    container: excludeRules,
    emptyNode: excludeEmpty,
    rules: draftTransformConfig.excludeRules,
    labelText: "Exclusion Rule",
    operatorText: "Exclude rows when",
    helperText: "Rows matching this rule or another exclusion rule are removed from the prepared dataset.",
    group: "excludeRules",
  });

  if (!previewResult) {
    if (transformPreviewSubtitle) transformPreviewSubtitle.textContent = "Complete every rule to regenerate the prepared dataset preview.";
    if (transformPreviewNote) transformPreviewNote.textContent = "Preview is paused until all draft rules are valid.";
    renderPreviewCards(null);
    renderPreviewTable({ columns: [], records: [] });
  } else {
    if (transformPreviewSubtitle) transformPreviewSubtitle.textContent = `Previewing ${previewResult.payload.records.length.toLocaleString()} rows across ${previewResult.payload.columns.length.toLocaleString()} columns after draft changes.`;
    if (transformPreviewNote) {
      transformPreviewNote.textContent = previewResult.preview.excludedByLog
        ? `${previewResult.preview.excludedByLog.toLocaleString()} row${previewResult.preview.excludedByLog === 1 ? "" : "s"} would be excluded because selected log transforms require positive values.`
        : "Preview reflects the draft pipeline in order: subset, exclude, log transform, scale, then encode.";
    }
    renderPreviewCards(previewResult.preview);
    renderPreviewTable(previewResult.payload);
  }
  renderPrepSummary();
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
    formatStatValue(stats.count),
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
  const numericHeaders = ["Parameter", "Rows Used", "Mean ± Sample Std Dev", "Median", "[Min, Max]", "[Q1, Q3]", "Skewness", "Excess Kurtosis"];
  lines.push(numericHeaders.map(csvEscape).join(","));

  const statsByColumn = new Map(
    selectedStatsColumns.map((column) => [column, numericStatsForColumn(currentPayload, column)]),
  );
  selectedStatsColumns.forEach((column) => {
    const row = [displayNameForColumn(currentPayload, column), ...statsCellValues(statsByColumn.get(column))];
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
    const row = [displayNameForColumn(currentPayload, column), ...categoricalSummaryCellValues(summaries.get(column))];
    lines.push(row.map(csvEscape).join(","));
  });

  downloadCsv(lines, `${safeDatasetStem()}_categorical_summary.csv`);
}

function numericStatsForColumn(payload, column) {
  const values = payload.records.map((row) => toFiniteNumber(row[column])).filter((value) => value !== null);
  if (!values.length) {
    return { count: 0, mean: null, median: null, std_dev: null, min: null, q1: null, q3: null, max: null, skewness: null, kurtosis: null };
  }
  return {
    count: values.length,
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
  let frequency = 0;
  for (const [key, count] of counts.entries()) {
    if (count > frequency) {
      frequency = count;
    }
  }
  const topValues = [...counts.entries()]
    .filter(([, count]) => count === frequency)
    .map(([key]) => key);
  const top = topValues.length > 1 ? `${topValues.join(", ")} (tie)` : topValues[0];
  return { count: values.length, unique: counts.size, top, frequency };
}

function createSelectorOption(column, isSelected, onToggle, displayLabel = column) {
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
  text.textContent = displayLabel;

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
      createSelectorOption(column, selectedColumns.includes(column), () => onToggle(column), displayNameForColumn(currentPayload, column)),
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
      persistAppStateSoon();
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
      persistAppStateSoon();
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
  const headers = ["Parameter", "Rows Used", "Mean ± Sample Std Dev", "Median", "[Min, Max]", "[Q1, Q3]", "Skewness", "Excess Kurtosis"];
  let html = '<table class="stats-table"><thead><tr>';
  headers.forEach((header) => {
    html += renderStatsHeaderCell(header);
  });
  html += "</tr></thead><tbody>";

  selectedStatsColumns.forEach((column) => {
    const stats = statsByColumn.get(column);
    const metricValues = statsCellValues(stats);
    html += `<tr><th class="stats-parameter">${escapeHtml(displayNameForColumn(currentPayload, column))}</th>`;
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
    html += `<tr><th class="stats-parameter">${escapeHtml(displayNameForColumn(currentPayload, column))}</th>`;
    categoricalSummaryCellValues(summaries.get(column)).forEach((value) => {
      html += `<td>${escapeHtml(String(value))}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  categorySheet.innerHTML = html;
  updateCategoricalSheetHeight(selectedColumns.length);
}

function isMissingValue(value) {
  return normalizeValue(value) === null;
}

function missingSummaryForColumn(payload, column) {
  const totalRows = payload.records.length;
  const missingCount = payload.records.reduce((count, row) => {
    return count + (isMissingValue(row[column]) ? 1 : 0);
  }, 0);
  const presentCount = totalRows - missingCount;
  const missingPercent = totalRows ? (missingCount / totalRows) * 100 : 0;
  return { column, totalRows, missingCount, presentCount, missingPercent };
}

function missingSummariesForPayload(payload) {
  if (!payload) return [];
  return payload.columns
    .map((column) => missingSummaryForColumn(payload, column))
    .sort((left, right) => {
      if (right.missingPercent !== left.missingPercent) return right.missingPercent - left.missingPercent;
      if (right.missingCount !== left.missingCount) return right.missingCount - left.missingCount;
      return left.column.localeCompare(right.column, undefined, { numeric: true, sensitivity: "base" });
    });
}

function formatMissingPercent(value) {
  if (!Number.isFinite(value)) return "0%";
  if (value === 0 || value === 100) return `${value.toFixed(0)}%`;
  return `${value.toFixed(1)}%`;
}

function renderMissingValuesSummary() {
  if (!missingValuesSheet) return;
  if (!currentPayload) {
    if (missingColumnSelect) {
      missingColumnSelect.innerHTML = "";
      missingColumnSelect.disabled = true;
    }
    if (missingValuesSummary) missingValuesSummary.textContent = "Upload a CSV to review missing values.";
    if (missingValuesFocus) missingValuesFocus.innerHTML = "";
    missingValuesSheet.innerHTML = '<div class="stats-empty small">Upload a CSV to see missing-value percentages.</div>';
    return;
  }

  const summaries = missingSummariesForPayload(currentPayload);
  if (!currentPayload.columns.includes(selectedMissingColumn)) {
    selectedMissingColumn = summaries[0]?.column || currentPayload.columns[0] || null;
  }

  if (missingColumnSelect) {
    missingColumnSelect.disabled = !summaries.length;
    missingColumnSelect.innerHTML = summaries
      .slice()
      .sort((left, right) => left.column.localeCompare(right.column, undefined, { numeric: true, sensitivity: "base" }))
      .map((summary) => {
        const selected = summary.column === selectedMissingColumn ? " selected" : "";
        return `<option value="${escapeHtmlAttribute(summary.column)}"${selected}>${escapeHtml(displayNameForColumn(currentPayload, summary.column))}</option>`;
      })
      .join("");
  }

  const selectedSummary = summaries.find((summary) => summary.column === selectedMissingColumn) || summaries[0] || null;
  const columnsWithMissing = summaries.filter((summary) => summary.missingCount > 0).length;
  if (missingValuesSummary) {
    missingValuesSummary.textContent = columnsWithMissing
      ? `${columnsWithMissing.toLocaleString()} of ${summaries.length.toLocaleString()} columns contain missing values.`
      : `No missing values found across ${summaries.length.toLocaleString()} columns.`;
  }

  if (missingValuesFocus) {
    if (!selectedSummary) {
      missingValuesFocus.innerHTML = '<div class="missing-values-empty">No columns available.</div>';
    } else {
      missingValuesFocus.innerHTML = `
        <div class="missing-values-metric">
          <span>Parameter</span>
          <strong>${escapeHtml(displayNameForColumn(currentPayload, selectedSummary.column))}</strong>
        </div>
        <div class="missing-values-metric">
          <span>Missing</span>
          <strong>${escapeHtml(formatMissingPercent(selectedSummary.missingPercent))}</strong>
        </div>
        <div class="missing-values-metric">
          <span>Missing Rows</span>
          <strong>${escapeHtml(selectedSummary.missingCount.toLocaleString())}</strong>
        </div>
        <div class="missing-values-metric">
          <span>Present Rows</span>
          <strong>${escapeHtml(selectedSummary.presentCount.toLocaleString())}</strong>
        </div>
      `;
    }
  }

  if (!summaries.length) {
    missingValuesSheet.innerHTML = '<div class="stats-empty small">No columns are available for missing-value analysis.</div>';
    return;
  }

  const topSummaries = summaries.slice(0, Math.min(10, summaries.length));
  let html = '<table class="stats-table missing-values-table"><thead><tr>';
  ["Parameter", "Missing %", "Missing Rows", "Present Rows", "Total Rows"].forEach((header) => {
    html += renderStatsHeaderCell(header);
  });
  html += "</tr></thead><tbody>";
  topSummaries.forEach((summary) => {
    const selectedClass = summary.column === selectedMissingColumn ? ' class="selected"' : "";
    html += `<tr${selectedClass}>`;
    html += `<th class="stats-parameter">${escapeHtml(displayNameForColumn(currentPayload, summary.column))}</th>`;
    html += `<td>${escapeHtml(formatMissingPercent(summary.missingPercent))}</td>`;
    html += `<td>${escapeHtml(summary.missingCount.toLocaleString())}</td>`;
    html += `<td>${escapeHtml(summary.presentCount.toLocaleString())}</td>`;
    html += `<td>${escapeHtml(summary.totalRows.toLocaleString())}</td>`;
    html += "</tr>";
  });
  html += "</tbody></table>";
  missingValuesSheet.innerHTML = html;
}

function distributionSplitColumnsForPayload(payload) {
  if (!payload) return [];
  const numericSet = new Set(payload.numeric_columns);
  return payload.color_columns.filter((column) => {
    if (numericSet.has(column)) return false;
    const uniqueValues = new Set();
    payload.records.forEach((row) => {
      const value = normalizeValue(row[column]);
      if (value !== null) uniqueValues.add(String(value));
    });
    return uniqueValues.size >= 2 && uniqueValues.size <= 12;
  });
}

function syncDistributionState() {
  if (!currentPayload) {
    distributionColumn = null;
    distributionSplitColumn = NONE_OPTION;
    distributionOverlayMode = "kde";
    return;
  }
  const numericColumns = currentPayload.numeric_columns;
  if (!numericColumns.includes(distributionColumn)) {
    distributionColumn = numericColumns[0] || null;
  }
  const splitColumns = distributionSplitColumnsForPayload(currentPayload);
  if (distributionSplitColumn !== NONE_OPTION && !splitColumns.includes(distributionSplitColumn)) {
    distributionSplitColumn = NONE_OPTION;
  }
  const overlayOptions = distributionOverlayOptionsForMode(distributionViewMode);
  if (!overlayOptions.some((option) => option.value === distributionOverlayMode)) {
    distributionOverlayMode = overlayOptions[0]?.value || "none";
  }
}

function distributionOverlayOptionsForMode(mode) {
  if (mode === "histogram") {
    return [
      { value: "kde", label: "KDE Curve" },
      { value: "none", label: "None" },
    ];
  }
  if (mode === "kde") {
    return [
      { value: "cdf", label: "CDF Line" },
      { value: "none", label: "None" },
    ];
  }
  if (mode === "cdf") {
    return [
      { value: "kde", label: "KDE Curve" },
      { value: "none", label: "None" },
    ];
  }
  return [{ value: "none", label: "None" }];
}

function distributionOverlayNote(mode, overlayMode) {
  if (mode === "histogram" && overlayMode === "kde") {
    return "Histogram + KDE is shown on a shared density axis so you can compare raw shape and smooth trend together.";
  }
  if (mode === "kde" && overlayMode === "cdf") {
    return "KDE stays on the left axis while the cumulative distribution is overlaid on the right axis for percentile reading.";
  }
  if (mode === "cdf" && overlayMode === "kde") {
    return "CDF stays on the left axis while the smooth KDE overlay is shown on the right axis for shape context.";
  }
  if (mode === "box") {
    return "Box plots emphasize median, quartiles, and outliers. Use Split By to compare cohorts side by side.";
  }
  if (mode === "violin") {
    return "Violin plots emphasize density shape and spread. Use Split By to compare cohorts side by side.";
  }
  return "Use Split By to compare cohorts when a low-cardinality categorical column is available.";
}

function distributionSeriesForSelection(payload, valueColumn, splitColumn = NONE_OPTION) {
  if (!payload || !valueColumn) return [];
  if (!splitColumn || splitColumn === NONE_OPTION) {
    const values = payload.records.map((row) => toFiniteNumber(row[valueColumn])).filter((value) => value !== null);
    return values.length ? [{ name: valueColumn, values }] : [];
  }

  const grouped = new Map();
  payload.records.forEach((row) => {
    const numeric = toFiniteNumber(row[valueColumn]);
    const groupValue = normalizeValue(row[splitColumn]);
    if (numeric === null || groupValue === null) return;
    const key = String(groupValue);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(numeric);
  });

  return [...grouped.entries()]
    .sort((left, right) => left[0].localeCompare(right[0], undefined, { numeric: true, sensitivity: "base" }))
    .map(([name, values]) => ({ name, values }));
}

function distributionRowSummary(payload, valueColumn, splitColumn = NONE_OPTION) {
  const summary = {
    totalRows: payload?.records?.length || 0,
    rowsUsed: 0,
    numericMissing: 0,
    splitMissing: 0,
  };
  if (!payload || !valueColumn) return summary;
  payload.records.forEach((row) => {
    const numeric = toFiniteNumber(row[valueColumn]);
    if (numeric === null) {
      summary.numericMissing += 1;
      return;
    }
    if (splitColumn && splitColumn !== NONE_OPTION && normalizeValue(row[splitColumn]) === null) {
      summary.splitMissing += 1;
      return;
    }
    summary.rowsUsed += 1;
  });
  return summary;
}

function flattenDistributionValues(series) {
  return series.flatMap((item) => item.values);
}

function normalDensity(z) {
  return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}

function kdeBandwidth(values) {
  if (values.length < 2) return 1;
  const std = standardDeviation(values) || 0;
  const q1 = quantileValue(values, 0.25);
  const q3 = quantileValue(values, 0.75);
  const iqr = (q3 !== null && q1 !== null) ? Math.max(0, q3 - q1) : 0;
  const robustScale = iqr > 0 ? iqr / 1.34 : std;
  const sigma = Math.max(std, 1e-9);
  const scale = robustScale > 0 ? Math.min(sigma, robustScale) : sigma;
  const bandwidth = 0.9 * scale * Math.pow(values.length, -0.2);
  if (Number.isFinite(bandwidth) && bandwidth > 0) return bandwidth;
  const range = Math.max(...values) - Math.min(...values);
  return range > 0 ? range / 20 : 1;
}

function numericExtent(values) {
  if (!values.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    const padding = Math.abs(min || 1) * 0.1 || 1;
    return { min: min - padding, max: max + padding };
  }
  return { min, max };
}

function sampledGrid(extent, points = 160) {
  const safePoints = Math.max(40, points);
  const step = (extent.max - extent.min) / (safePoints - 1);
  return Array.from({ length: safePoints }, (_, index) => extent.min + (step * index));
}

function kdeCurve(values, grid) {
  if (!values.length) return { x: [], y: [] };
  const bandwidth = kdeBandwidth(values);
  const y = grid.map((point) => {
    let total = 0;
    values.forEach((value) => {
      total += normalDensity((point - value) / bandwidth);
    });
    return total / (values.length * bandwidth);
  });
  return { x: grid, y };
}

function empiricalCdf(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return {
    x: sorted,
    y: sorted.map((_, index) => (index + 1) / sorted.length),
  };
}

function renderDistributionSummary(values, rowSummary) {
  if (!distSummaryMetrics) return;
  if (!values.length) {
    distSummaryMetrics.innerHTML = "";
    return;
  }
  const summary = rowSummary || { rowsUsed: values.length, numericMissing: 0, splitMissing: 0 };
  const metrics = [
    { label: "Rows Used", value: summary.rowsUsed.toLocaleString() },
    { label: "Numeric Missing", value: summary.numericMissing.toLocaleString() },
    ...(summary.splitMissing ? [{ label: "Split Missing", value: summary.splitMissing.toLocaleString() }] : []),
    { label: "Mean", value: formatStatValue(meanValue(values)) },
    { label: "Median", value: formatStatValue(medianValue(values)) },
    { label: "IQR", value: formatStatValue((quantileValue(values, 0.75) ?? 0) - (quantileValue(values, 0.25) ?? 0)) },
    { label: "Sample Std Dev", value: formatStatValue(standardDeviation(values)) },
  ];
  distSummaryMetrics.innerHTML = metrics.map((item) => `
      <div class="corr-metric-card">
        <div class="corr-metric-label">${renderInfoTooltipLabel(item.label, DISTRIBUTION_METRIC_EXPLANATIONS[item.label], "corr-metric-label-text")}</div>
        <div class="corr-metric-value">${escapeHtml(String(item.value))}</div>
      </div>
    `).join("");
}

function distributionLegendName(item, valueColumn, splitColumn) {
  return splitColumn && splitColumn !== NONE_OPTION
    ? `${currentDisplayNameForColumn(splitColumn)}: ${item.name}`
    : currentDisplayNameForColumn(valueColumn);
}

function distributionColor(index, splitColumn) {
  if (!splitColumn || splitColumn === NONE_OPTION) return DISTRIBUTION_SINGLE_COLOR;
  return DISTRIBUTION_GROUP_COLORS[index % DISTRIBUTION_GROUP_COLORS.length];
}

function distributionLineColor(index, splitColumn) {
  if (!splitColumn || splitColumn === NONE_OPTION) return "#f8fafc";
  return DISTRIBUTION_LINE_COLORS[index % DISTRIBUTION_LINE_COLORS.length];
}

function renderDistributionEmpty(message) {
  if (distPlot) {
    distPlot.innerHTML = `<div class="corr-empty">${escapeHtml(String(message))}</div>`;
  }
  if (distBoxPlot) {
    distBoxPlot.innerHTML = '<div class="corr-empty">Choose a numeric variable to show the box plot.</div>';
  }
  if (distViolinPlot) {
    distViolinPlot.innerHTML = '<div class="corr-empty">Choose a numeric variable to show the violin plot.</div>';
  }
  if (distSummaryMetrics) distSummaryMetrics.innerHTML = "";
}

function populateSimpleSelect(select, options, selectedValue) {
  if (!select) return;
  select.innerHTML = "";
  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value === NONE_OPTION ? "None" : currentDisplayNameForColumn(value);
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
  const xLabel = currentDisplayNameForColumn(xColumn);
  const yLabel = currentDisplayNameForColumn(yColumn);
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
      color: "#3b82f6",
      size: 8,
      opacity: currentCorrelationPointOpacity(),
      line: { width: 0 },
    },
    hovertemplate: `${escapeHtml(xLabel)}: %{x}<br>${escapeHtml(yLabel)}: %{y}<extra></extra>`,
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
  let renderPromise;
  try {
    renderPromise = Plotly.newPlot(targetId, traces, {
      paper_bgcolor: "rgba(18, 20, 28, 0.92)",
      plot_bgcolor: "#111827",
      font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: "#e8ebf4" },
      margin: { l: 54, r: 20, t: 24, b: 50 },
      legend: {
        orientation: "h",
        yanchor: "bottom",
        y: 1.01,
        xanchor: "left",
        x: 0,
        bgcolor: "rgba(16, 18, 26, 0.84)",
        bordercolor: "rgba(96, 165, 250, 0.28)",
        borderwidth: 1,
        font: { color: "#e8ebf4" },
      },
      xaxis: {
        title: { text: `X: ${xLabel}`, font: { color: "#e8ebf4", size: 13 }, standoff: 10 },
        tickfont: { color: "#e8ebf4" },
        gridcolor: "rgba(148, 163, 184, 0.18)",
        zerolinecolor: "rgba(148, 163, 184, 0.24)",
      },
      yaxis: {
        title: { text: `Y: ${yLabel}`, font: { color: "#e8ebf4", size: 13 }, standoff: 10 },
        tickfont: { color: "#e8ebf4" },
        gridcolor: "rgba(148, 163, 184, 0.18)",
        zerolinecolor: "rgba(148, 163, 184, 0.24)",
      },
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
    button.textContent = currentDisplayNameForColumn(column);
    button.title = currentDisplayNameForColumn(column);
    button.addEventListener("click", () => {
      if (selectedMatrixColumns.includes(column)) {
        selectedMatrixColumns = selectedMatrixColumns.filter((value) => value !== column);
      } else {
        selectedMatrixColumns = [...selectedMatrixColumns, column];
      }
      focusedMatrixPair = null;
      renderCorrelationMatrixExplorer();
      persistAppStateSoon();
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
  corrFocusTitle.textContent = `${currentDisplayNameForColumn(xColumn)} vs ${currentDisplayNameForColumn(yColumn)} | Pearson: ${formatCorrelationValue(summary.pearson)} | Spearman: ${formatCorrelationValue(summary.spearman)} | ${fitCopy} | N: ${summary.n.toLocaleString()}`;
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
    corrMatrixHeatmap.style.width = "";
    const matrixLabels = selectedMatrixColumns.map((column) => currentDisplayNameForColumn(column));
    const matrixCustomData = selectedMatrixColumns.map((yColumn) => (
      selectedMatrixColumns.map((xColumn) => [xColumn, yColumn])
    ));
    const heatmapPromise = Plotly.newPlot("corr-matrix-heatmap", [{
      type: "heatmap",
      z: built.matrix,
      x: matrixLabels,
      y: matrixLabels,
      customdata: matrixCustomData,
      zmin: -1,
      zmax: 1,
      colorscale: [
        [0, "#7f1d1d"],
        [0.25, "#ef4444"],
        [0.5, "#f8fafc"],
        [0.75, "#38bdf8"],
        [1, "#1d4ed8"],
      ],
      xgap: 1,
      ygap: 1,
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
          const [rawXColumn, rawYColumn] = Array.isArray(point.customdata) ? point.customdata : [];
          const xColumn = rawXColumn || selectedMatrixColumns[matrixLabels.indexOf(String(point.x))];
          const yColumn = rawYColumn || selectedMatrixColumns[matrixLabels.indexOf(String(point.y))];
          if (!xColumn || !yColumn) return;
          if (xColumn === yColumn) {
            focusedMatrixPair = { xColumn, yColumn };
            renderFocusedMatrixScatter();
            return;
          }
          focusedMatrixPair = { xColumn, yColumn };
          renderFocusedMatrixScatter();
          persistAppStateSoon();
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

function updateDistributionBinLabel() {
  if (distBinValue) {
    distBinValue.textContent = String(distributionBinCount);
  }
}

function resizeDistributionPlot() {
  if (!hasPlotly()) return;
  [distPlot, distBoxPlot, distViolinPlot].forEach((node) => {
    if (node && node.data) Plotly.Plots.resize(node);
  });
}

function scheduleResponsivePlotResize() {
  if (responsivePlotResizeFrame) {
    cancelAnimationFrame(responsivePlotResizeFrame);
  }
  responsivePlotResizeFrame = requestAnimationFrame(() => {
    responsivePlotResizeFrame = 0;
    resizeDistributionPlot();
    resizeOutlierPlots();
    resizeCorrelationPlots();
  });
}

function initializeResponsivePlotObserver() {
  if (responsivePlotObserver || typeof ResizeObserver === "undefined") return;
  responsivePlotObserver = new ResizeObserver((entries) => {
    const hasMeaningfulContainerResize = entries.some(({ target, contentRect }) => {
      const previous = responsivePlotObservedSizes.get(target);
      const next = {
        width: Math.round(contentRect.width),
        height: Math.round(contentRect.height),
      };
      responsivePlotObservedSizes.set(target, next);
      if (!previous) return false;
      return previous.width !== next.width || previous.height !== next.height;
    });

    if (hasMeaningfulContainerResize) {
      scheduleResponsivePlotResize();
    }
  });

  [
    viewerShell,
    viewerStage,
    distributionPanel,
    transformationPanel,
    prepDiagnosticsPanel,
    correlationPanel,
  ].filter(Boolean).forEach((node) => {
    responsivePlotObservedSizes.set(node, {
      width: Math.round(node.getBoundingClientRect().width),
      height: Math.round(node.getBoundingClientRect().height),
    });
    responsivePlotObserver.observe(node);
  });
}

function renderSingleDistributionPlot(targetId, traces, layout, emptyMessage) {
  const target = document.getElementById(targetId);
  if (!target) return;
  if (!traces.length) {
    target.innerHTML = `<div class="corr-empty">${escapeHtml(String(emptyMessage))}</div>`;
    return;
  }
  if (!hasPlotly()) {
    target.innerHTML = '<div class="corr-empty">Plotly is not loaded, so distribution charts are unavailable.</div>';
    return;
  }
  target.innerHTML = "";
  const renderPromise = Plotly.newPlot(targetId, traces, layout, {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["lasso2d", "select2d"],
  });
  if (renderPromise && typeof renderPromise.then === "function") {
    renderPromise.then(() => resizeDistributionPlot()).catch(() => {
      target.innerHTML = `<div class="corr-empty">${escapeHtml(String(emptyMessage))}</div>`;
    });
  }
}

function renderDistributionPlotForSeries(series, valueColumn, splitColumn, mode, overlayMode) {
  if (!distPlot) return;
  const allValues = flattenDistributionValues(series);
  if (!allValues.length) {
    renderDistributionEmpty("No numeric rows remain after filtering for this variable.");
    return;
  }
  if (!hasPlotly()) {
    renderDistributionEmpty("Plotly is not loaded, so distribution charts are unavailable.");
    return;
  }

  const extent = numericExtent(allValues);
  const grid = extent ? sampledGrid(extent) : [];
  const traces = [];
  let yAxisTitle = "Value";
  let yAxis2 = null;
  let barmode = "overlay";
  const valueLabel = currentDisplayNameForColumn(valueColumn);
  const splitLabel = splitColumn && splitColumn !== NONE_OPTION ? currentDisplayNameForColumn(splitColumn) : "Distribution";

  series.forEach((item, index) => {
    const color = distributionColor(index, splitColumn);
    const lineColor = distributionLineColor(index, splitColumn);
    const name = distributionLegendName(item, valueColumn, splitColumn);
    if (mode === "histogram") {
      traces.push({
        type: "histogram",
        x: item.values,
        name,
        marker: { color, line: { width: 0 } },
        opacity: splitColumn && splitColumn !== NONE_OPTION ? 0.68 : 0.88,
        nbinsx: distributionBinCount,
        histnorm: overlayMode === "kde"
          ? "probability density"
          : (distributionNormalization === "count" ? "" : (distributionNormalization === "density" ? "probability density" : "probability")),
        hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{x}<br>${overlayMode === "kde" || distributionNormalization === "density" ? "Density" : distributionNormalization === "probability" ? "Probability" : "Count"}: %{y}<extra></extra>`,
      });
      if (overlayMode === "kde") {
        const curve = kdeCurve(item.values, grid);
        traces.push({
          type: "scatter",
          mode: "lines",
          x: curve.x,
          y: curve.y,
          name: `${name} KDE`,
          line: { color: lineColor, width: 3.5, dash: "dash" },
          hovertemplate: `${escapeHtml(name)} KDE<br>${escapeHtml(valueLabel)}: %{x}<br>Density: %{y:.4f}<extra></extra>`,
        });
      }
      yAxisTitle = overlayMode === "kde"
        ? "Density"
        : (distributionNormalization === "count" ? "Count" : distributionNormalization === "probability" ? "Probability" : "Density");
      return;
    }

    if (mode === "kde") {
      const curve = kdeCurve(item.values, grid);
      traces.push({
        type: "scatter",
        mode: "lines",
        x: curve.x,
        y: curve.y,
        name,
        line: { color: lineColor, width: 3.2 },
        hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{x}<br>Density: %{y:.4f}<extra></extra>`,
      });
      yAxisTitle = "Density";
      if (overlayMode === "cdf") {
        const cdf = empiricalCdf(item.values);
        traces.push({
          type: "scatter",
          mode: "lines",
          x: cdf.x,
          y: cdf.y,
          name: `${name} CDF`,
          line: { color: lineColor, width: 2.6, dash: "dot" },
          yaxis: "y2",
          hovertemplate: `${escapeHtml(name)} CDF<br>${escapeHtml(valueLabel)}: %{x}<br>Cumulative: %{y:.3f}<extra></extra>`,
        });
        yAxis2 = { title: "Cumulative Probability", overlaying: "y", side: "right", rangemode: "tozero", tickformat: ".0%" };
      }
      return;
    }

    if (mode === "cdf") {
      const cdf = empiricalCdf(item.values);
      traces.push({
        type: "scatter",
        mode: "lines",
        x: cdf.x,
        y: cdf.y,
        name,
        line: { color: lineColor, width: 3.2, shape: "hv" },
        hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{x}<br>Cumulative: %{y:.3f}<extra></extra>`,
      });
      yAxisTitle = "Cumulative Probability";
      if (overlayMode === "kde") {
        const curve = kdeCurve(item.values, grid);
        traces.push({
          type: "scatter",
          mode: "lines",
          x: curve.x,
          y: curve.y,
          name: `${name} KDE`,
          line: { color: lineColor, width: 2.6, dash: "dot" },
          yaxis: "y2",
          hovertemplate: `${escapeHtml(name)} KDE<br>${escapeHtml(valueLabel)}: %{x}<br>Density: %{y:.4f}<extra></extra>`,
        });
        yAxis2 = { title: "Density", overlaying: "y", side: "right", rangemode: "tozero" };
      }
      return;
    }

    if (mode === "box") {
      traces.push({
        type: "box",
        name,
        y: item.values,
        marker: { color },
        line: { color },
        boxpoints: splitColumn && splitColumn !== NONE_OPTION ? false : "outliers",
        jitter: splitColumn && splitColumn !== NONE_OPTION ? 0 : 0.3,
        pointpos: 0,
        hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{y}<extra></extra>`,
      });
      yAxisTitle = valueLabel;
      barmode = "group";
      return;
    }

    if (mode === "violin") {
      traces.push({
        type: "violin",
        name,
        y: item.values,
        line: { color },
        fillcolor: color,
        opacity: 0.7,
        box: { visible: true },
        meanline: { visible: true },
        points: splitColumn && splitColumn !== NONE_OPTION ? false : "outliers",
        hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{y}<extra></extra>`,
      });
      yAxisTitle = valueLabel;
      barmode = "group";
    }
  });

  const layout = {
    paper_bgcolor: DISTRIBUTION_PAPER_BG,
    plot_bgcolor: DISTRIBUTION_PLOT_BG,
    font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: DISTRIBUTION_FONT_COLOR },
    margin: { l: 60, r: yAxis2 ? 60 : 28, t: 28, b: 60 },
    barmode,
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "left",
      x: 0,
      bgcolor: DISTRIBUTION_LEGEND_BG,
      bordercolor: DISTRIBUTION_LEGEND_BORDER,
      borderwidth: 1,
      font: { color: DISTRIBUTION_FONT_COLOR },
    },
    xaxis: {
      title: { text: mode === "box" || mode === "violin" ? splitLabel : valueLabel, font: { color: DISTRIBUTION_FONT_COLOR, size: 13 }, standoff: 10 },
      tickfont: { color: DISTRIBUTION_FONT_COLOR },
      gridcolor: DISTRIBUTION_GRID_COLOR,
      zerolinecolor: DISTRIBUTION_ZERO_LINE_COLOR,
    },
    yaxis: {
      title: { text: yAxisTitle, font: { color: DISTRIBUTION_FONT_COLOR, size: 13 }, standoff: 10 },
      tickfont: { color: DISTRIBUTION_FONT_COLOR },
      gridcolor: DISTRIBUTION_GRID_COLOR,
      zerolinecolor: DISTRIBUTION_ZERO_LINE_COLOR,
      rangemode: "tozero",
    },
  };
  if (yAxis2) {
    layout.yaxis2 = {
      ...yAxis2,
      tickfont: { color: DISTRIBUTION_SECONDARY_FONT_COLOR },
      title: typeof yAxis2.title === "string"
        ? { text: yAxis2.title, font: { color: DISTRIBUTION_SECONDARY_FONT_COLOR, size: 13 } }
        : yAxis2.title,
      gridcolor: "rgba(0,0,0,0)",
      zerolinecolor: "rgba(0,0,0,0)",
    };
  }

  renderSingleDistributionPlot(
    "dist-plot",
    traces,
    layout,
    "Could not render this distribution chart for the selected variable.",
  );
}

function renderDistributionShapePlots(series, valueColumn, splitColumn) {
  const valueLabel = currentDisplayNameForColumn(valueColumn);
  const splitLabel = splitColumn && splitColumn !== NONE_OPTION ? currentDisplayNameForColumn(splitColumn) : "Distribution";
  const commonLayout = {
    paper_bgcolor: DISTRIBUTION_PAPER_BG,
    plot_bgcolor: DISTRIBUTION_PLOT_BG,
    font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: DISTRIBUTION_FONT_COLOR },
    margin: { l: 56, r: 24, t: 26, b: 56 },
    showlegend: false,
    xaxis: {
      title: {
        text: splitLabel,
        font: { color: DISTRIBUTION_FONT_COLOR, size: 13 },
        standoff: 10,
      },
      tickfont: { color: DISTRIBUTION_FONT_COLOR },
      gridcolor: DISTRIBUTION_GRID_COLOR,
      zerolinecolor: DISTRIBUTION_ZERO_LINE_COLOR,
    },
    yaxis: {
      title: { text: valueLabel, font: { color: DISTRIBUTION_FONT_COLOR, size: 13 }, standoff: 10 },
      tickfont: { color: DISTRIBUTION_FONT_COLOR },
      gridcolor: DISTRIBUTION_GRID_COLOR,
      zerolinecolor: DISTRIBUTION_ZERO_LINE_COLOR,
    },
  };

  const boxTraces = [];
  const violinTraces = [];
  series.forEach((item, index) => {
    const color = distributionColor(index, splitColumn);
    const name = distributionLegendName(item, valueColumn, splitColumn);
    boxTraces.push({
      type: "box",
      name,
      y: item.values,
      marker: { color },
      line: { color },
      boxpoints: splitColumn && splitColumn !== NONE_OPTION ? false : "outliers",
      jitter: splitColumn && splitColumn !== NONE_OPTION ? 0 : 0.3,
      pointpos: 0,
      hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{y}<extra></extra>`,
    });
    violinTraces.push({
      type: "violin",
      name,
      y: item.values,
      line: { color },
      fillcolor: color,
      opacity: 0.72,
      box: { visible: true },
      meanline: { visible: true },
      points: splitColumn && splitColumn !== NONE_OPTION ? false : "outliers",
      hovertemplate: `${escapeHtml(name)}<br>${escapeHtml(valueLabel)}: %{y}<extra></extra>`,
    });
  });

  renderSingleDistributionPlot(
    "dist-box-plot",
    boxTraces,
    commonLayout,
    "Could not render the box plot for the selected variable.",
  );
  renderSingleDistributionPlot(
    "dist-violin-plot",
    violinTraces,
    commonLayout,
    "Could not render the violin plot for the selected variable.",
  );
}

function renderDistributionView() {
  updateDistributionBinLabel();
  syncDistributionState();
  if (!currentPayload) {
    if (distNote) distNote.textContent = "Upload a CSV to start exploring distributions.";
    renderDistributionEmpty("Upload a CSV to start exploring distributions.");
    return;
  }

  const numericColumns = currentPayload.numeric_columns;
  if (!numericColumns.length) {
    renderDistributionEmpty("No numeric columns are available for distribution analysis.");
    return;
  }

  const splitColumns = distributionSplitColumnsForPayload(currentPayload);
  populateSimpleSelect(distVariableSelect, numericColumns, distributionColumn || numericColumns[0]);
  distributionColumn = distVariableSelect?.value || numericColumns[0];

  const splitOptions = [NONE_OPTION, ...splitColumns];
  if (distSplitSelect) {
    distSplitSelect.innerHTML = "";
    splitOptions.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value === NONE_OPTION ? "None" : currentDisplayNameForColumn(value);
      distSplitSelect.appendChild(option);
    });
    distSplitSelect.value = splitOptions.includes(distributionSplitColumn) ? distributionSplitColumn : NONE_OPTION;
    distributionSplitColumn = distSplitSelect.value;
  }

  if (distViewSelect) distViewSelect.value = distributionViewMode;
  const overlayOptions = distributionOverlayOptionsForMode(distributionViewMode);
  if (distOverlaySelect) {
    distOverlaySelect.innerHTML = "";
    overlayOptions.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;
      distOverlaySelect.appendChild(option);
    });
    distOverlaySelect.value = overlayOptions.some((item) => item.value === distributionOverlayMode)
      ? distributionOverlayMode
      : overlayOptions[0].value;
    distributionOverlayMode = distOverlaySelect.value;
    distOverlaySelect.disabled = overlayOptions.length === 1;
  }

  if (distNormalizationSelect) {
    distNormalizationSelect.value = distributionOverlayMode === "kde" ? "density" : distributionNormalization;
    distNormalizationSelect.disabled = distributionViewMode !== "histogram" || distributionOverlayMode === "kde";
  }

  if (distBinControl) {
    distBinControl.classList.toggle("hidden", distributionViewMode !== "histogram");
  }
  if (distNote) {
    distNote.textContent = distributionOverlayNote(distributionViewMode, distributionOverlayMode);
  }

  const series = distributionSeriesForSelection(currentPayload, distributionColumn, distributionSplitColumn);
  const allValues = flattenDistributionValues(series);
  renderDistributionSummary(allValues, distributionRowSummary(currentPayload, distributionColumn, distributionSplitColumn));
  renderDistributionPlotForSeries(series, distributionColumn, distributionSplitColumn, distributionViewMode, distributionOverlayMode);
  renderDistributionShapePlots(series, distributionColumn, distributionSplitColumn);
}

function outlierMethodLabel(method) {
  if (method === "zscore") return "Z-Score";
  if (method === "modified_zscore") return "Modified Z-Score";
  return "IQR Fences";
}

function outlierMethodConfig(method = outlierMethod) {
  return OUTLIER_METHOD_CONFIG[method] || OUTLIER_METHOD_CONFIG.iqr;
}

function normalizeThresholdForMethod(method, value) {
  const config = outlierMethodConfig(method);
  const numeric = Number.isFinite(value) ? value : config.defaultThreshold;
  const clamped = Math.min(config.max, Math.max(config.min, numeric));
  const step = config.step || 0.1;
  const precision = Math.max(0, (String(step).split(".")[1] || "").length);
  return Number((Math.round(clamped / step) * step).toFixed(precision));
}

function syncOutlierThresholdControl() {
  const config = outlierMethodConfig(outlierMethod);
  outlierThreshold = normalizeThresholdForMethod(outlierMethod, outlierThreshold);
  if (outlierThresholdLabel) {
    outlierThresholdLabel.textContent = config.label;
  }
  if (outlierThresholdMeta) {
    outlierThresholdMeta.textContent = config.note;
  }
  if (outlierThresholdSlider) {
    outlierThresholdSlider.min = String(config.min);
    outlierThresholdSlider.max = String(config.max);
    outlierThresholdSlider.step = String(config.step);
    outlierThresholdSlider.value = String(outlierThreshold);
  }
}

function outlierThresholdSummary(method = outlierMethod, threshold = outlierThreshold) {
  if (method === "zscore") return `|z| > ${threshold.toFixed(2)}`;
  if (method === "modified_zscore") return `|modified z| > ${threshold.toFixed(2)}`;
  return `${threshold.toFixed(2)} x IQR`;
}

function updateOutlierThresholdLabel() {
  syncOutlierThresholdControl();
  if (outlierThresholdValue) {
    outlierThresholdValue.textContent = outlierThreshold.toFixed(2);
  }
  if (outlierThresholdSlider) {
    const min = Number(outlierThresholdSlider.min) || outlierMethodConfig(outlierMethod).min;
    const max = Number(outlierThresholdSlider.max) || outlierMethodConfig(outlierMethod).max;
    const progress = ((outlierThreshold - min) / Math.max(0.0001, max - min)) * 100;
    outlierThresholdSlider.style.setProperty("--alpha-progress", `${Math.max(0, Math.min(100, progress))}%`);
  }
}

function outlierSummaryText(selectedCount, totalCount) {
  if (!totalCount) return "No numeric columns available";
  if (!selectedCount) return "No numeric columns selected";
  if (selectedCount === totalCount) return `All ${totalCount.toLocaleString()} numeric columns selected`;
  return `${selectedCount.toLocaleString()} of ${totalCount.toLocaleString()} numeric columns selected`;
}

function resolveOutlierRowLabel(row, index, labelColumn = outlierIdColumn) {
  if (labelColumn && labelColumn !== NONE_OPTION) {
    const value = normalizeValue(row[labelColumn]);
    if (value !== null) return String(value);
  }
  return `Row ${index + 1}`;
}

function preferredOutlierReviewColumns(payload) {
  if (!payload) return [];
  return uniqueOrderedColumns([
    ...payload.numeric_columns.filter((column) => outlierSelectedColumns.includes(column)),
    ...payload.numeric_columns,
  ]);
}

function firstDistinctOutlierColumn(columns, used = new Set()) {
  return columns.find((column) => column && column !== NONE_OPTION && !used.has(column)) || null;
}

function syncOutlierReviewState(payload, selectedColumns = null) {
  if (!payload) {
    outlierFocusColumn = null;
    outlierScatterXColumn = null;
    outlierScatterYColumn = null;
    outlierSelectedRowIndex = null;
    return;
  }

  const numericColumns = payload.numeric_columns;
  const reviewColumns = Array.isArray(selectedColumns) && selectedColumns.length ? selectedColumns : numericColumns;
  const preferredColumns = preferredOutlierReviewColumns(payload);

  if (!reviewColumns.includes(outlierFocusColumn)) {
    outlierFocusColumn = reviewColumns[0] || null;
  }

  if (!numericColumns.includes(outlierScatterXColumn)) {
    outlierScatterXColumn = firstDistinctOutlierColumn(preferredColumns) || null;
  }
  if (!numericColumns.includes(outlierScatterYColumn) || outlierScatterYColumn === outlierScatterXColumn) {
    outlierScatterYColumn = firstDistinctOutlierColumn(preferredColumns, new Set(outlierScatterXColumn ? [outlierScatterXColumn] : []));
  }

  if (outlierSelectedRowIndex !== null) {
    const validIndex = Number.isInteger(outlierSelectedRowIndex)
      && outlierSelectedRowIndex >= 0
      && outlierSelectedRowIndex < payload.records.length;
    if (!validIndex) outlierSelectedRowIndex = null;
  }
}

function setOutlierScatterAxis(axis, value) {
  const payload = currentPayload;
  const numericColumns = payload?.numeric_columns || [];
  const nextValue = numericColumns.includes(value) ? value : null;
  const preferredColumns = payload ? preferredOutlierReviewColumns(payload) : numericColumns;

  if (axis === "x") {
    outlierScatterXColumn = nextValue;
    if (outlierScatterXColumn && outlierScatterXColumn === outlierScatterYColumn) {
      outlierScatterYColumn = firstDistinctOutlierColumn(preferredColumns, new Set([outlierScatterXColumn]));
    }
    return;
  }

  outlierScatterYColumn = nextValue;
  if (outlierScatterYColumn && outlierScatterYColumn === outlierScatterXColumn) {
    outlierScatterXColumn = firstDistinctOutlierColumn(preferredColumns, new Set([outlierScatterYColumn]));
  }
}

function outlierSummaryForColumn(payload, column, method, threshold) {
  const indexedValues = payload.records
    .map((row, index) => ({ index, value: toFiniteNumber(row[column]) }))
    .filter((entry) => entry.value !== null);
  if (indexedValues.length < 2) {
    return {
      column,
      method,
      threshold,
      flaggedIndices: new Map(),
      flaggedCount: 0,
      usableCount: indexedValues.length,
      missingCount: payload.records.length - indexedValues.length,
      lowerBound: null,
      upperBound: null,
      center: null,
      spread: null,
      ruleLabel: "Not enough usable values",
    };
  }

  const values = indexedValues.map((entry) => entry.value);
  const flaggedIndices = new Map();
  let lowerBound = null;
  let upperBound = null;
  let center = null;
  let spread = null;
  let ruleLabel = "";

  if (method === "zscore") {
    center = meanValue(values);
    spread = standardDeviation(values);
    lowerBound = center !== null && spread !== null ? center - (threshold * spread) : null;
    upperBound = center !== null && spread !== null ? center + (threshold * spread) : null;
    ruleLabel = `|z| > ${threshold.toFixed(2)}`;
    if (spread !== null && spread > 0) {
      indexedValues.forEach(({ index, value }) => {
        const score = Math.abs((value - center) / spread);
        if (score > threshold) flaggedIndices.set(index, score / threshold);
      });
    }
  } else if (method === "modified_zscore") {
    center = medianValue(values);
    const deviations = values.map((value) => Math.abs(value - center)).sort((left, right) => left - right);
    spread = medianValue(deviations);
    lowerBound = center !== null && spread !== null ? center - ((threshold * spread) / 0.6745) : null;
    upperBound = center !== null && spread !== null ? center + ((threshold * spread) / 0.6745) : null;
    ruleLabel = `|modified z| > ${threshold.toFixed(2)}`;
    if (spread !== null && spread > 0) {
      indexedValues.forEach(({ index, value }) => {
        const score = Math.abs((0.6745 * (value - center)) / spread);
        if (score > threshold) flaggedIndices.set(index, score / threshold);
      });
    } else {
      ruleLabel = "MAD is 0; modified z-score undefined";
    }
  } else {
    const q1 = quantileValue(values, 0.25);
    const q3 = quantileValue(values, 0.75);
    spread = q1 !== null && q3 !== null ? q3 - q1 : null;
    center = medianValue(values);
    lowerBound = q1 === null || spread === null ? null : q1 - (threshold * spread);
    upperBound = q3 === null || spread === null ? null : q3 + (threshold * spread);
    ruleLabel = spread === 0
      ? `Outside [${formatStatValue(lowerBound)}, ${formatStatValue(upperBound)}]`
      : `${threshold.toFixed(2)} × IQR fences`;
    if (lowerBound !== null && upperBound !== null) {
      indexedValues.forEach(({ index, value }) => {
        if (value < lowerBound) {
          const denom = spread && spread > 0 ? spread : Math.max(Math.abs(center || 0), 1);
          flaggedIndices.set(index, (lowerBound - value) / denom);
        } else if (value > upperBound) {
          const denom = spread && spread > 0 ? spread : Math.max(Math.abs(center || 0), 1);
          flaggedIndices.set(index, (value - upperBound) / denom);
        }
      });
    }
  }

  return {
    column,
    method,
    threshold,
    flaggedIndices,
    flaggedCount: flaggedIndices.size,
    usableCount: indexedValues.length,
    missingCount: payload.records.length - indexedValues.length,
    lowerBound,
    upperBound,
    center,
    spread,
    ruleLabel,
  };
}

function computeOutlierAnalysis(payload) {
  if (!payload) return null;
  const selectedColumns = payload.numeric_columns.filter((column) => outlierSelectedColumns.includes(column));
  syncOutlierReviewState(payload, selectedColumns);
  if (!selectedColumns.length) {
    return {
      selectedColumns: [],
      columnSummaries: [],
      flaggedRows: [],
      flaggedRowCount: 0,
      flaggedValueCount: 0,
      focusColumn: null,
      selectedRow: null,
      scatterColumns: [],
    };
  }

  const columnSummaries = selectedColumns
    .map((column) => outlierSummaryForColumn(payload, column, outlierMethod, outlierThreshold))
    .sort((left, right) => {
      if (right.flaggedCount !== left.flaggedCount) return right.flaggedCount - left.flaggedCount;
      return left.column.localeCompare(right.column, undefined, { numeric: true, sensitivity: "base" });
    });

  const flaggedRows = new Map();
  columnSummaries.forEach((summary) => {
    summary.flaggedIndices.forEach((severity, index) => {
      if (!flaggedRows.has(index)) {
        flaggedRows.set(index, {
          index,
          row: payload.records[index],
          label: resolveOutlierRowLabel(payload.records[index], index),
          score: 0,
          flaggedColumns: [],
        });
      }
      const entry = flaggedRows.get(index);
      entry.score += severity;
      entry.flaggedColumns.push({
        column: summary.column,
        value: payload.records[index][summary.column],
        severity,
      });
    });
  });

  const rankedRows = [...flaggedRows.values()]
    .map((entry) => ({
      ...entry,
      flaggedColumns: entry.flaggedColumns.sort((left, right) => right.severity - left.severity),
      flaggedCount: entry.flaggedColumns.length,
    }))
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (right.flaggedCount !== left.flaggedCount) return right.flaggedCount - left.flaggedCount;
      return left.index - right.index;
    });

  const focusColumn = selectedColumns.includes(outlierFocusColumn)
    ? outlierFocusColumn
    : (selectedColumns[0] || null);
  const scatterColumns = [];
  if (payload.numeric_columns.includes(outlierScatterXColumn)) {
    scatterColumns.push(outlierScatterXColumn);
  }
  if (
    payload.numeric_columns.includes(outlierScatterYColumn)
    && outlierScatterYColumn !== outlierScatterXColumn
  ) {
    scatterColumns.push(outlierScatterYColumn);
  }
  if (scatterColumns.length < 2) {
    preferredOutlierReviewColumns(payload).forEach((column) => {
      if (scatterColumns.length < 2 && !scatterColumns.includes(column)) {
        scatterColumns.push(column);
      }
    });
  }
  const selectedRow = rankedRows.find((entry) => entry.index === outlierSelectedRowIndex) || null;

  return {
    selectedColumns,
    columnSummaries,
    flaggedRows: rankedRows,
    flaggedRowCount: rankedRows.length,
    flaggedValueCount: columnSummaries.reduce((sum, summary) => sum + summary.flaggedCount, 0),
    focusColumn,
    selectedRow,
    scatterColumns,
  };
}

function renderOutlierSummaryCards(analysis) {
  if (!outlierSummaryMetrics) return;
  if (!analysis || !analysis.selectedColumns.length) {
    outlierSummaryMetrics.innerHTML = "";
    return;
  }
  const topColumn = analysis.columnSummaries[0];
  const flaggedRate = currentPayload?.records?.length
    ? `${((analysis.flaggedRowCount / currentPayload.records.length) * 100).toFixed(1)}% of prepared rows`
    : "No prepared rows";
  const cards = [
    { label: "Rows Flagged", value: analysis.flaggedRowCount.toLocaleString(), note: `${flaggedRate} | ${analysis.flaggedValueCount.toLocaleString()} flagged values` },
    { label: "Method", value: outlierMethodLabel(outlierMethod), note: outlierThresholdSummary(outlierMethod, outlierThreshold) },
    { label: "Columns Reviewed", value: analysis.selectedColumns.length.toLocaleString(), note: `${currentPayload.numeric_columns.length.toLocaleString()} numeric columns available` },
    { label: "Most Flagged Column", value: topColumn ? topColumn.column : "None", note: topColumn ? `${topColumn.flaggedCount.toLocaleString()} rows flagged` : "No flagged rows" },
  ];
  outlierSummaryMetrics.innerHTML = cards.map((item) => `
    <div class="corr-metric-card">
      <div class="corr-metric-label">${escapeHtml(item.label)}</div>
      <div class="corr-metric-value">${escapeHtml(item.value)}</div>
      <div class="transform-metric-note">${escapeHtml(item.note)}</div>
    </div>
  `).join("");
}

function setSelectedOutlierRow(index) {
  outlierSelectedRowIndex = outlierSelectedRowIndex === index ? null : index;
  renderOutlierView();
  persistAppStateSoon();
}

function focusedOutlierSummary(analysis) {
  if (!analysis?.focusColumn) return null;
  return analysis.columnSummaries.find((summary) => summary.column === analysis.focusColumn) || null;
}

function columnHasAppliedValueTransform(column) {
  if (!appliedTransformConfig || !column) return false;
  const scaled = appliedTransformConfig.scaling?.mode !== "none"
    && appliedTransformConfig.scaling?.columns?.includes(column);
  const logged = appliedTransformConfig.log?.columns?.includes(column);
  return Boolean(scaled || logged);
}

function canCreateOutlierRangeRule(analysis) {
  const summary = focusedOutlierSummary(analysis);
  return Boolean(
    sourcePayload
    && draftTransformConfig
    && summary
    && sourcePayload.numeric_columns.includes(summary.column)
    && summary.flaggedCount > 0
    && summary.lowerBound !== null
    && summary.upperBound !== null
    && !columnHasAppliedValueTransform(summary.column),
  );
}

function focusedOutlierRows(analysis, summary) {
  if (!analysis?.flaggedRows?.length || !summary) return [];
  return analysis.flaggedRows.filter((entry) => (
    entry.flaggedColumns.some((item) => item.column === summary.column)
  ));
}

function canCreateOutlierIdRule(analysis) {
  const summary = focusedOutlierSummary(analysis);
  const rows = focusedOutlierRows(analysis, summary);
  return Boolean(
    sourcePayload
    && draftTransformConfig
    && currentPayload
    && summary
    && outlierIdColumn
    && outlierIdColumn !== NONE_OPTION
    && sourcePayload.columns.includes(outlierIdColumn)
    && currentPayload.columns.includes(outlierIdColumn)
    && rows.some((entry) => normalizeValue(entry.row[outlierIdColumn]) !== null),
  );
}

function createOutlierRangeRule(summary) {
  return {
    id: nextFilterRuleId++,
    column: summary.column,
    operator: "outside_range",
    value: String(summary.lowerBound),
    value2: String(summary.upperBound),
    generatedFromOutliers: {
      method: summary.method,
      threshold: summary.threshold,
      flaggedCount: summary.flaggedCount,
    },
  };
}

function createOutlierIdRule(analysis, summary) {
  const values = [...new Set(
    focusedOutlierRows(analysis, summary)
      .map((entry) => normalizeValue(entry.row[outlierIdColumn]))
      .filter((value) => value !== null)
      .map((value) => String(value)),
  )];
  return {
    id: nextFilterRuleId++,
    column: outlierIdColumn,
    operator: columnTypeForPayload(sourcePayload, outlierIdColumn) === "numeric" ? "eq" : "in_list",
    value: values.join(", "),
    value2: "",
    generatedFromOutliers: {
      method: summary.method,
      threshold: summary.threshold,
      flaggedCount: values.length,
      sourceColumn: summary.column,
    },
  };
}

function addOutlierExclusionRule() {
  const analysis = computeOutlierAnalysis(currentPayload);
  const summary = focusedOutlierSummary(analysis);
  if (!summary || !draftTransformConfig) return;
  let nextRule = null;
  if (canCreateOutlierIdRule(analysis)) {
    nextRule = createOutlierIdRule(analysis, summary);
  } else if (canCreateOutlierRangeRule(analysis)) {
    nextRule = createOutlierRangeRule(summary);
  }
  if (!nextRule) {
    if (outlierRuleStatus) {
      outlierRuleStatus.textContent = columnHasAppliedValueTransform(summary.column)
        ? "This focused column has an applied log or scaling transform. Select a row label column to generate an ID-based exclusion rule."
        : "No removable outlier rule is available for the focused column.";
    }
    return;
  }

  draftTransformConfig.excludeRules = [
    ...draftTransformConfig.excludeRules,
    nextRule,
  ];
  activePrepView = "transform";
  clearError();
  renderTransformationView();
  if (outlierRuleStatus) {
    outlierRuleStatus.textContent = `Added an editable exclusion rule for ${summary.column}. Remove it from Exclusion Rules if you do not want to use it.`;
  }
  persistAppStateSoon();
}

function renderOutlierReviewControls(analysis) {
  const selectedColumns = analysis?.selectedColumns || [];
  const numericColumns = currentPayload?.numeric_columns || [];
  const focusOptions = selectedColumns.length ? selectedColumns : [NONE_OPTION];
  const scatterOptions = [NONE_OPTION, ...numericColumns];

  populateSimpleSelect(outlierFocusSelect, focusOptions, outlierFocusColumn || focusOptions[0]);
  if (outlierFocusSelect) {
    if (!selectedColumns.length && outlierFocusSelect.options[0]) {
      outlierFocusSelect.options[0].textContent = "Select reviewed column";
    }
    outlierFocusSelect.disabled = !selectedColumns.length;
    outlierFocusColumn = selectedColumns.length ? outlierFocusSelect.value : null;
  }

  populateSimpleSelect(outlierScatterXSelect, scatterOptions, outlierScatterXColumn || NONE_OPTION);
  populateSimpleSelect(outlierScatterYSelect, scatterOptions, outlierScatterYColumn || NONE_OPTION);
  if (outlierScatterXSelect?.options[0]) outlierScatterXSelect.options[0].textContent = "Choose X axis";
  if (outlierScatterYSelect?.options[0]) outlierScatterYSelect.options[0].textContent = "Choose Y axis";
  if (outlierScatterXSelect) {
    outlierScatterXSelect.disabled = !numericColumns.length;
    outlierScatterXColumn = outlierScatterXSelect.value !== NONE_OPTION ? outlierScatterXSelect.value : null;
  }
  if (outlierScatterYSelect) {
    outlierScatterYSelect.disabled = numericColumns.length < 2;
    outlierScatterYColumn = outlierScatterYSelect.value !== NONE_OPTION ? outlierScatterYSelect.value : null;
  }

  if (outlierColumnSummary) {
    outlierColumnSummary.textContent = selectedColumns.length
      ? `Click a column to focus the distribution chart.`
      : "";
  }
  if (outlierRowSummary) {
    if (!analysis?.flaggedRows?.length) {
      outlierRowSummary.textContent = "";
    } else {
      const visibleCount = Math.min(OUTLIER_ROW_TABLE_LIMIT, analysis.flaggedRows.length);
      const selectedPrefix = analysis.selectedRow ? `${analysis.selectedRow.label} pinned. ` : "";
      outlierRowSummary.textContent = `${selectedPrefix}Showing top ${visibleCount.toLocaleString()} of ${analysis.flaggedRows.length.toLocaleString()} flagged rows. Click a row to highlight it in the charts.`;
    }
  }
  if (outlierCreateRuleButton) {
    const summary = focusedOutlierSummary(analysis);
    outlierCreateRuleButton.disabled = !canCreateOutlierRangeRule(analysis) && !canCreateOutlierIdRule(analysis);
    outlierCreateRuleButton.textContent = summary?.column ? `Add ${summary.column} Exclusion Rule` : "Add Exclusion Rule";
  }
  if (outlierRuleStatus) {
    const summary = focusedOutlierSummary(analysis);
    if (!summary || !selectedColumns.length) {
      outlierRuleStatus.textContent = "";
    } else if (!summary.flaggedCount) {
      outlierRuleStatus.textContent = "The focused column has no flagged rows at the current threshold.";
    } else if (canCreateOutlierIdRule(analysis)) {
      outlierRuleStatus.textContent = `Creates an editable ID-list Exclusion Rule for rows flagged in ${summary.column}.`;
    } else if (columnHasAppliedValueTransform(summary.column)) {
      outlierRuleStatus.textContent = "Range rules are disabled for transformed columns. Select a row label column to generate an ID-based rule.";
    } else {
      outlierRuleStatus.textContent = `Creates an editable Exclusion Rule using ${summary.ruleLabel}.`;
    }
  }
}

function renderOutlierColumnTable(analysis) {
  if (!outlierColumnSheet) return;
  if (!currentPayload) {
    outlierColumnSheet.innerHTML = '<div class="stats-empty">Upload a CSV to inspect potential outliers.</div>';
    return;
  }
  if (!analysis?.selectedColumns.length) {
    outlierColumnSheet.innerHTML = '<div class="stats-empty">Select one or more numeric parameters to review potential outliers.</div>';
    return;
  }
  const headers = ["Column", "Flagged Rows", "Flag Rate", "Rule", "Reference"];
  let html = '<table class="stats-table"><thead><tr>';
  headers.forEach((header) => {
    html += `<th>${escapeHtml(header)}</th>`;
  });
  html += "</tr></thead><tbody>";
  analysis.columnSummaries.forEach((summary) => {
    const reference = summary.method === "iqr"
      ? `[${formatStatValue(summary.lowerBound)}, ${formatStatValue(summary.upperBound)}]`
      : `${formatStatValue(summary.center)} ± ${formatStatValue(summary.spread)}`;
    const rate = summary.usableCount ? `${((summary.flaggedCount / summary.usableCount) * 100).toFixed(1)}%` : "0.0%";
    const isSelected = summary.column === analysis.focusColumn ? " selected" : "";
    html += `<tr class="outlier-click-row${isSelected}" data-outlier-column="${escapeHtmlAttribute(summary.column)}" tabindex="0">
      <th class="stats-parameter">${escapeHtml(displayNameForColumn(currentPayload, summary.column))}</th>
      <td>${escapeHtml(summary.flaggedCount.toLocaleString())}</td>
      <td>${escapeHtml(rate)}</td>
      <td>${escapeHtml(summary.ruleLabel)}</td>
      <td>${escapeHtml(reference)}</td>
    </tr>`;
  });
  html += "</tbody></table>";
  outlierColumnSheet.innerHTML = html;
  outlierColumnSheet.querySelectorAll("[data-outlier-column]").forEach((row) => {
    const activate = () => {
      const nextColumn = row.getAttribute("data-outlier-column");
      if (!nextColumn || nextColumn === outlierFocusColumn) return;
      outlierFocusColumn = nextColumn;
      renderOutlierView();
      persistAppStateSoon();
    };
    row.addEventListener("click", activate);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
}

function renderOutlierRowTable(analysis) {
  if (!outlierRowSheet) return;
  if (!currentPayload) {
    outlierRowSheet.innerHTML = '<div class="stats-empty">Upload a CSV to inspect flagged rows.</div>';
    return;
  }
  if (!analysis?.selectedColumns.length) {
    outlierRowSheet.innerHTML = '<div class="stats-empty">Select one or more numeric parameters to rank potentially unusual rows.</div>';
    return;
  }
  if (!analysis.flaggedRows.length) {
    outlierRowSheet.innerHTML = '<div class="stats-empty">No rows are currently flagged under the selected outlier method and threshold.</div>';
    return;
  }
  const headers = ["Row", "Severity", "Flagged Columns", "Preview Values"];
  let html = '<table class="stats-table"><thead><tr>';
  headers.forEach((header) => {
    html += `<th>${escapeHtml(header)}</th>`;
  });
  html += "</tr></thead><tbody>";
  analysis.flaggedRows.slice(0, OUTLIER_ROW_TABLE_LIMIT).forEach((entry) => {
    const columnList = entry.flaggedColumns.map((item) => displayNameForColumn(currentPayload, item.column)).join(", ");
    const preview = entry.flaggedColumns.slice(0, 4).map((item) => `${displayNameForColumn(currentPayload, item.column)}: ${formatStatValue(item.value)}`).join(" | ");
    const isSelected = entry.index === analysis.selectedRow?.index ? " selected" : "";
    html += `<tr class="outlier-click-row${isSelected}" data-outlier-row-index="${escapeHtmlAttribute(String(entry.index))}" tabindex="0">
      <th class="stats-parameter"><span class="outlier-row-id">${escapeHtml(entry.label)}</span></th>
      <td>${escapeHtml(entry.score.toFixed(2))}</td>
      <td><div class="outlier-row-columns">${escapeHtml(columnList)}</div></td>
      <td>${escapeHtml(preview)}</td>
    </tr>`;
  });
  html += "</tbody></table>";
  outlierRowSheet.innerHTML = html;
  outlierRowSheet.querySelectorAll("[data-outlier-row-index]").forEach((row) => {
    const activate = () => {
      const rawIndex = row.getAttribute("data-outlier-row-index");
      const nextIndex = Number(rawIndex);
      if (!Number.isInteger(nextIndex)) return;
      setSelectedOutlierRow(nextIndex);
    };
    row.addEventListener("click", activate);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
}

function renderOutlierScatterPlot(analysis) {
  if (!outlierScatterPlot) return;
  if (!analysis?.scatterColumns?.length || analysis.scatterColumns.length < 2) {
    renderCorrelationEmpty(outlierScatterPlot, "Select at least two numeric columns to compare flagged rows in a scatter plot.");
    return;
  }
  if (!hasPlotly()) {
    renderCorrelationEmpty(outlierScatterPlot, "Plotly is not loaded, so outlier charts are unavailable.");
    return;
  }
  const [xColumn, yColumn] = analysis.scatterColumns;
  const xLabel = displayNameForColumn(currentPayload, xColumn);
  const yLabel = displayNameForColumn(currentPayload, yColumn);
  const flaggedIndices = new Set(analysis.flaggedRows.map((entry) => entry.index));
  const regular = { x: [], y: [], text: [], customdata: [] };
  const flagged = { x: [], y: [], text: [], customdata: [] };
  const selected = { x: [], y: [], text: [], customdata: [] };

  currentPayload.records.forEach((row, index) => {
    const x = toFiniteNumber(row[xColumn]);
    const y = toFiniteNumber(row[yColumn]);
    if (x === null || y === null) return;
    const target = flaggedIndices.has(index) ? flagged : regular;
    target.x.push(x);
    target.y.push(y);
    target.text.push(resolveOutlierRowLabel(row, index));
    target.customdata.push(index);
    if (analysis.selectedRow?.index === index) {
      selected.x.push(x);
      selected.y.push(y);
      selected.text.push(resolveOutlierRowLabel(row, index));
      selected.customdata.push(index);
    }
  });

  if (!regular.x.length && !flagged.x.length) {
    renderCorrelationEmpty(outlierScatterPlot, "Not enough overlapping numeric rows remain to draw the review scatter.");
    return;
  }

  outlierScatterPlot.innerHTML = "";
  const traces = [
    {
      type: "scatter",
      mode: "markers",
      name: "Background Rows",
      x: regular.x,
      y: regular.y,
      text: regular.text,
      customdata: regular.customdata,
      marker: { color: "rgba(148, 163, 184, 0.45)", size: 8 },
	      hovertemplate: "%{text}<br>" + escapeHtml(xLabel) + ": %{x}<br>" + escapeHtml(yLabel) + ": %{y}<extra></extra>",
    },
    {
      type: "scatter",
      mode: "markers",
      name: "Flagged Rows",
      x: flagged.x,
      y: flagged.y,
      text: flagged.text,
      customdata: flagged.customdata,
      marker: { color: "#ff8a1f", size: 10, line: { color: "#fff1d6", width: 1 } },
	      hovertemplate: "%{text}<br>" + escapeHtml(xLabel) + ": %{x}<br>" + escapeHtml(yLabel) + ": %{y}<extra></extra>",
    },
  ];
  if (selected.x.length) {
    traces.push({
      type: "scatter",
      mode: "markers",
      name: "Pinned Row",
      x: selected.x,
      y: selected.y,
      text: selected.text,
      customdata: selected.customdata,
      marker: { color: "#ffe26d", size: 14, symbol: "diamond", line: { color: "#fff7d1", width: 2 } },
	      hovertemplate: "%{text}<br>" + escapeHtml(xLabel) + ": %{x}<br>" + escapeHtml(yLabel) + ": %{y}<extra></extra>",
    });
  }
  const renderPromise = Plotly.newPlot("outlier-scatter-plot", traces, {
    paper_bgcolor: DISTRIBUTION_PAPER_BG,
    plot_bgcolor: DISTRIBUTION_PLOT_BG,
    font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: DISTRIBUTION_FONT_COLOR },
    margin: { l: 56, r: 24, t: 24, b: 52 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "left",
      x: 0,
      bgcolor: DISTRIBUTION_LEGEND_BG,
      bordercolor: DISTRIBUTION_LEGEND_BORDER,
      borderwidth: 1,
    },
    xaxis: { title: { text: xLabel }, gridcolor: DISTRIBUTION_GRID_COLOR, tickfont: { color: DISTRIBUTION_FONT_COLOR } },
    yaxis: { title: { text: yLabel }, gridcolor: DISTRIBUTION_GRID_COLOR, tickfont: { color: DISTRIBUTION_FONT_COLOR } },
  }, {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["lasso2d", "select2d"],
  });
  if (renderPromise?.then) {
    renderPromise.then(() => {
      if (typeof outlierScatterPlot.removeAllListeners === "function") {
        outlierScatterPlot.removeAllListeners("plotly_click");
      }
      if (typeof outlierScatterPlot.on === "function") {
        outlierScatterPlot.on("plotly_click", (event) => {
          const rawIndex = event?.points?.[0]?.customdata;
          const nextIndex = Number(Array.isArray(rawIndex) ? rawIndex[0] : rawIndex);
          if (!Number.isInteger(nextIndex) || !flaggedIndices.has(nextIndex)) return;
          setSelectedOutlierRow(nextIndex);
        });
      }
      resizeOutlierPlots();
    }).catch(() => {
      renderCorrelationEmpty(outlierScatterPlot, "Could not render the outlier scatter plot.");
    });
  }
}

function renderOutlierHistogram(analysis) {
  if (!outlierHistogramPlot) return;
  const focusColumn = analysis?.focusColumn;
  if (!focusColumn) {
    renderCorrelationEmpty(outlierHistogramPlot, "Select numeric columns to review a flagged-value distribution.");
    return;
  }
  if (!hasPlotly()) {
    renderCorrelationEmpty(outlierHistogramPlot, "Plotly is not loaded, so outlier charts are unavailable.");
    return;
  }
  const summary = analysis.columnSummaries.find((item) => item.column === focusColumn);
  const focusLabel = displayNameForColumn(currentPayload, focusColumn);
  const flaggedIndices = summary ? new Set(summary.flaggedIndices.keys()) : new Set();
  const selectedValue = analysis.selectedRow ? toFiniteNumber(analysis.selectedRow.row[focusColumn]) : null;
  const allValues = [];
  const flaggedValues = [];
  currentPayload.records.forEach((row, index) => {
    const value = toFiniteNumber(row[focusColumn]);
    if (value === null) return;
    allValues.push(value);
    if (flaggedIndices.has(index)) flaggedValues.push(value);
  });
  if (!allValues.length) {
    renderCorrelationEmpty(outlierHistogramPlot, "No numeric values remain for the selected outlier focus column.");
    return;
  }

  outlierHistogramPlot.innerHTML = "";
  const renderPromise = Plotly.newPlot("outlier-histogram-plot", [
    {
      type: "histogram",
      x: allValues,
      name: "All Rows",
      marker: { color: "rgba(143, 61, 255, 0.78)" },
      opacity: 0.78,
      nbinsx: 28,
      hovertemplate: `${escapeHtml(focusLabel)}: %{x}<br>Count: %{y}<extra></extra>`,
    },
    {
      type: "histogram",
      x: flaggedValues,
      name: "Flagged Rows",
      marker: { color: "rgba(255, 138, 31, 0.92)" },
      opacity: 0.88,
      nbinsx: 28,
      hovertemplate: `${escapeHtml(focusLabel)}: %{x}<br>Flagged count: %{y}<extra></extra>`,
    },
  ], {
    paper_bgcolor: DISTRIBUTION_PAPER_BG,
    plot_bgcolor: DISTRIBUTION_PLOT_BG,
    font: { family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif', color: DISTRIBUTION_FONT_COLOR },
    margin: { l: 56, r: 24, t: 24, b: 52 },
    barmode: "overlay",
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "left",
      x: 0,
      bgcolor: DISTRIBUTION_LEGEND_BG,
      bordercolor: DISTRIBUTION_LEGEND_BORDER,
      borderwidth: 1,
    },
    xaxis: { title: { text: focusLabel }, gridcolor: DISTRIBUTION_GRID_COLOR, tickfont: { color: DISTRIBUTION_FONT_COLOR } },
    yaxis: { title: { text: "Count" }, gridcolor: DISTRIBUTION_GRID_COLOR, tickfont: { color: DISTRIBUTION_FONT_COLOR } },
    shapes: selectedValue === null ? [] : [{
      type: "line",
      x0: selectedValue,
      x1: selectedValue,
      xref: "x",
      y0: 0,
      y1: 1,
      yref: "paper",
      line: { color: "#ffe26d", width: 3, dash: "dot" },
    }],
    annotations: selectedValue === null ? [] : [{
      x: selectedValue,
      y: 1.02,
      yref: "paper",
      text: String(analysis.selectedRow.label),
      showarrow: false,
      font: { color: "#ffe7a3", size: 12, family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif' },
      xanchor: "center",
      yanchor: "bottom",
      bgcolor: "rgba(18, 20, 28, 0.88)",
      bordercolor: "rgba(255, 226, 109, 0.45)",
      borderwidth: 1,
      borderpad: 4,
    }],
  }, {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["lasso2d", "select2d"],
  });
  if (renderPromise?.then) {
    renderPromise.then(() => resizeOutlierPlots()).catch(() => {
      renderCorrelationEmpty(outlierHistogramPlot, "Could not render the outlier distribution chart.");
    });
  }
}

function resizeOutlierPlots() {
  if (!hasPlotly()) return;
  [outlierScatterPlot, outlierHistogramPlot].forEach((node) => {
    if (node && node.data) Plotly.Plots.resize(node);
  });
}

function renderOutlierView() {
  updateOutlierThresholdLabel();
  if (!currentPayload) {
    if (outlierNote) outlierNote.textContent = "Upload a CSV to start reviewing potential outliers.";
    renderOutlierReviewControls(null);
    renderOutlierSummaryCards(null);
    renderOutlierColumnTable(null);
    renderOutlierRowTable(null);
    renderCorrelationEmpty(outlierScatterPlot, "Upload a CSV to start reviewing potential outliers.");
    renderCorrelationEmpty(outlierHistogramPlot, "Upload a CSV to start reviewing potential outliers.");
    return;
  }

  if (outlierMethodSelect) outlierMethodSelect.value = outlierMethod;
  populateSimpleSelect(outlierIdSelect, [NONE_OPTION, ...currentPayload.columns], outlierIdColumn || NONE_OPTION);
  if (outlierIdSelect) outlierIdSelect.options[0].textContent = "Row Number";
  outlierIdColumn = outlierIdSelect?.value || NONE_OPTION;
  if (outlierSearch) outlierSearch.value = outlierSearchValue;

  updateSelectorSummary(outlierSelectionSummary, outlierSelectedColumns.length, currentPayload.numeric_columns.length, "numeric");
  if (outlierSelectVisibleButton) {
    outlierSelectVisibleButton.disabled = !filterColumnsByQuery(currentPayload.numeric_columns, outlierSearchValue).length;
  }
  if (outlierClearColumnsButton) outlierClearColumnsButton.disabled = !outlierSelectedColumns.length;
  renderColumnSelector({
    container: outlierColumnSelector,
    columns: currentPayload.numeric_columns,
    selectedColumns: outlierSelectedColumns,
    searchValue: outlierSearchValue,
    emptyMessage: "Upload a CSV to browse numeric columns.",
    noMatchMessage: "No numeric columns match the current search.",
    onToggle: (column) => {
      if (outlierSelectedColumns.includes(column)) {
        outlierSelectedColumns = outlierSelectedColumns.filter((value) => value !== column);
      } else {
        outlierSelectedColumns = [...outlierSelectedColumns, column];
      }
      outlierSelectedRowIndex = null;
      renderOutlierView();
      persistAppStateSoon();
    },
  });

  const analysis = computeOutlierAnalysis(currentPayload);
  if (outlierSelectedRowIndex !== null && !analysis?.selectedRow) {
    outlierSelectedRowIndex = null;
  }
  if (analysis?.focusColumn) outlierFocusColumn = analysis.focusColumn;
  renderOutlierReviewControls(analysis);
  if (outlierNote) {
    outlierNote.textContent = analysis?.selectedColumns?.length
      ? `${outlierMethodLabel(outlierMethod)} is running on the prepared dataset, so current filters and transformations are already reflected. Click a column to focus the histogram and click a row to pin it in both charts.`
      : "Select numeric columns to review potentially unusual rows in the prepared dataset.";
  }
  renderOutlierSummaryCards(analysis);
  renderOutlierColumnTable(analysis);
  renderOutlierRowTable(analysis);
  renderOutlierScatterPlot(analysis);
  renderOutlierHistogram(analysis);
}

function setOuterView(view) {
  activeOuterView = view;
  if (!dashboardTab || !statisticsTab || !distributionTab || !correlationTab || !dashboardPanel || !transformationPanel || !statisticsPanel || !distributionPanel || !correlationPanel) return;
  const showDashboard = view === "dashboard";
  const showTransformation = view === "transformation";
  const showStatistics = view === "statistics";
  const showDistribution = view === "distribution";
  const showCorrelation = view === "correlation";
  dashboardTab.classList.toggle("active", showDashboard);
  statisticsTab.classList.toggle("active", showStatistics);
  distributionTab.classList.toggle("active", showDistribution);
  correlationTab.classList.toggle("active", showCorrelation);
  dashboardTab.setAttribute("aria-selected", showDashboard ? "true" : "false");
  statisticsTab.setAttribute("aria-selected", showStatistics ? "true" : "false");
  distributionTab.setAttribute("aria-selected", showDistribution ? "true" : "false");
  correlationTab.setAttribute("aria-selected", showCorrelation ? "true" : "false");
  dashboardPanel.classList.toggle("hidden", !showDashboard);
  transformationPanel.classList.toggle("hidden", !showTransformation);
  statisticsPanel.classList.toggle("hidden", !showStatistics);
  distributionPanel.classList.toggle("hidden", !showDistribution);
  correlationPanel.classList.toggle("hidden", !showCorrelation);
  if (emptyState) {
    const shouldShowEmptyState = !sourcePayload && showDashboard;
    emptyState.classList.toggle("hidden", !shouldShowEmptyState);
  }
  if (showTransformation) {
    renderTransformationView();
    if (activePrepView === "diagnostics") {
      renderOutlierView();
      setTimeout(() => resizeOutlierPlots(), 0);
    }
  } else if (showDistribution) {
    renderDistributionView();
    setTimeout(() => resizeDistributionPlot(), 0);
  } else if (showCorrelation) {
    renderCorrelationView();
    setTimeout(() => resizeCorrelationPlots(), 0);
  }
  renderPrepSummary();
  persistAppStateSoon();
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
    if (!nonNull.length) {
      prepared.forEach((row) => {
        row[column] = null;
      });
      return;
    }

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

function buildPayload(records, title, displayNames = {}) {
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
    display_names: Object.fromEntries(columns.map((column) => [column, displayNames[column] || column])),
    numeric_columns: numericColumns,
    color_columns: colorColumns,
    defaults: {
      x: defaultX,
      y: defaultY,
      z: defaultZ,
      color: NONE_OPTION,
      size: NONE_OPTION,
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
  return `<span class="${escapeHtmlAttribute(className)}">${safeLabel}<button type="button" class="stats-term-info" aria-label="${safeAriaLabel}" title="${safeDescription}" data-tooltip="${safeDescription}">i</button></span>`;
}

function buildDashboardHtml(payload, persistedViewState = null) {
  const payloadJson = JSON.stringify(payload).replaceAll("</script>", "<\\/script>");
  const persistedViewStateJson = JSON.stringify(persistedViewState || {}).replaceAll("</script>", "<\\/script>");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(APP_TITLE)} | ${escapeHtml(payload.title)}</title>
  <link rel="icon" type="image/x-icon" href="./favicon.ico" />
  <link rel="shortcut icon" href="./favicon.ico" />
  <link rel="apple-touch-icon" href="./favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0f1218;
      --panel: rgba(24, 28, 38, 0.92);
      --ink: #f5f7fb;
      --muted: #9aa4b5;
      --line: rgba(119, 132, 154, 0.24);
      --accent: #7c3aed;
      --accent-2: #2563eb;
      --shadow: 0 18px 42px rgba(0, 0, 0, 0.3);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      min-height: 100dvh;
      overflow: hidden;
      font-family: "Inter", "Segoe UI Variable", "Segoe UI", sans-serif;
      background: linear-gradient(180deg, #0f1218 0%, #131720 52%, #0f1218 100%);
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
      border-radius: 16px;
      box-shadow: var(--shadow);
      padding: 24px;
      overflow-y: auto;
      height: calc(100vh - 32px);
      height: calc(100dvh - 32px);
    }
    .plot-area {
      background: linear-gradient(180deg, rgba(27, 28, 36, 0.94), rgba(18, 19, 24, 0.98));
      border: 1px solid var(--line);
      border-radius: 16px;
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
      letter-spacing: 0;
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
      border-radius: 8px;
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
      border-radius: 8px;
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
      border-radius: 8px;
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
    .plot-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .plot-title {
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0;
    }
    .plot-note {
      color: var(--muted);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      white-space: nowrap;
    }
    .corr-small-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      border: 1px solid rgba(37, 99, 235, 0.34);
      background: rgba(37, 99, 235, 0.14);
      color: #dbeafe;
      border-radius: 8px;
      padding: 9px 13px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }
    .corr-small-button:hover {
      transform: translateY(-1px);
      border-color: rgba(96, 165, 250, 0.48);
      background: rgba(37, 99, 235, 0.22);
      color: #fff;
    }
    .corr-small-button::before {
      content: "↓";
      font-size: 0.85rem;
      line-height: 1;
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
      border-radius: 8px;
      background: rgba(37, 99, 235, 0.12);
      border: 1px solid rgba(96, 165, 250, 0.18);
      color: #dbeafe;
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
      border: 1px solid rgba(119, 132, 154, 0.24);
      border-radius: 12px;
      background: #111827;
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
      .plot-header-actions { width: 100%; justify-content: space-between; }
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

  <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
  <script>
    const NONE_OPTION = "${NONE_OPTION}";
    const DATASET = ${payloadJson};
    const INITIAL_STATE = ${persistedViewStateJson};
    const DEFAULT_DISCRETE_COLORS = [
      "#3b82f6", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6",
      "#22c55e", "#ec4899", "#64748b", "#06b6d4", "#f97316",
      "#a855f7", "#84cc16", "#eab308", "#0ea5e9", "#f43f5e"
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

    function sanitizeInitialState(state) {
      const next = state && typeof state === "object" ? { ...state } : {};
      const numericColumns = DATASET.numeric_columns;
      const colorColumns = [NONE_OPTION, ...DATASET.color_columns];
      const hoverColumns = [NONE_OPTION, ...DATASET.columns];

      next.x = numericColumns.includes(next.x) ? next.x : DATASET.defaults.x;
      next.y = numericColumns.includes(next.y) ? next.y : DATASET.defaults.y;
      next.z = numericColumns.includes(next.z) ? next.z : DATASET.defaults.z;
      if (next.y === next.x) {
        next.y = numericColumns.find((column) => column !== next.x) || next.y;
      }
      if (next.z === next.x || next.z === next.y) {
        next.z = numericColumns.find((column) => column !== next.x && column !== next.y) || next.z;
      }
      next.color = colorColumns.includes(next.color) ? next.color : DATASET.defaults.color;
      next.size = [NONE_OPTION, ...numericColumns].includes(next.size) ? next.size : DATASET.defaults.size;
      next.hoverId = hoverColumns.includes(next.hoverId) ? next.hoverId : DATASET.defaults.hover_id;
      next.logX = Boolean(next.logX);
      next.logY = Boolean(next.logY);
      next.logZ = Boolean(next.logZ);
      next.opacity = Number.isFinite(Number(next.opacity)) ? Math.max(0.15, Math.min(1, Number(next.opacity))) : 0.8;
      next.sizeScale = Number.isFinite(Number(next.sizeScale)) ? Math.max(0.6, Math.min(2.4, Number(next.sizeScale))) : 1;
      return next;
    }

    function currentViewState() {
      return {
        x: xSelect.value,
        y: ySelect.value,
        z: zSelect.value,
        color: colorSelect.value,
        size: sizeSelect.value,
        hoverId: hoverIdSelect.value,
        logX: logX.checked,
        logY: logY.checked,
        logZ: logZ.checked,
        opacity: Number(opacitySlider.value),
        sizeScale: Number(sizeScaleSlider.value),
      };
    }

    function notifyParentState() {
      try {
        window.parent.postMessage({ type: "statzooka-dashboard-state", state: currentViewState() }, "*");
      } catch (error) {
        // Ignore postMessage failures inside sandboxed previews.
      }
    }

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
        option.textContent = displayColumnName(value);
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

    function displayColumnName(column) {
      if (!column || column === NONE_OPTION) return column;
      return DATASET.display_names?.[column] || column;
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

    function safeFilenamePart(value) {
      return String(value || "plot")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "") || "plot";
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
      lines.push(displayColumnName(xColumn) + ": %{customdata[1]}");
      lines.push(displayColumnName(yColumn) + ": %{customdata[2]}");
      lines.push(displayColumnName(zColumn) + ": %{customdata[3]}");
      if (colorColumn !== NONE_OPTION) lines.push(displayColumnName(colorColumn) + ": %{customdata[4]}");
      if (sizeColumn !== NONE_OPTION) lines.push(displayColumnName(sizeColumn) + ": %{customdata[5]}");
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
      const xTitle = logX.checked ? "log10(" + displayColumnName(xColumn) + ")" : displayColumnName(xColumn);
      const yTitle = logY.checked ? "log10(" + displayColumnName(yColumn) + ")" : displayColumnName(yColumn);
      const zTitle = logZ.checked ? "log10(" + displayColumnName(zColumn) + ")" : displayColumnName(zColumn);
      return {
        paper_bgcolor: "#111827",
        plot_bgcolor: "#111827",
        font: {
          family: '"Inter", "Segoe UI Variable", "Segoe UI", sans-serif',
          color: "#e5e7eb",
        },
        margin: { l: 24, r: 24, t: 28, b: 24 },
        legend: {
          orientation: "h",
          yanchor: "bottom",
          y: 1.01,
          xanchor: "left",
          x: 0,
          bgcolor: "rgba(17, 24, 39, 0.86)",
          bordercolor: "rgba(96, 165, 250, 0.24)",
          borderwidth: 1,
          font: { color: "#e5e7eb" },
        },
        scene: {
          xaxis: {
            title: { text: xTitle },
            backgroundcolor: "#111827",
            gridcolor: "rgba(148, 163, 184, 0.22)",
            zerolinecolor: "rgba(148, 163, 184, 0.28)",
            showbackground: true,
            color: "#e5e7eb",
            gridwidth: 2,
            zerolinewidth: 2,
          },
          yaxis: {
            title: { text: yTitle },
            backgroundcolor: "#111827",
            gridcolor: "rgba(148, 163, 184, 0.22)",
            zerolinecolor: "rgba(148, 163, 184, 0.28)",
            showbackground: true,
            color: "#e5e7eb",
            gridwidth: 2,
            zerolinewidth: 2,
          },
          zaxis: {
            title: { text: zTitle },
            backgroundcolor: "#111827",
            gridcolor: "rgba(148, 163, 184, 0.22)",
            zerolinecolor: "rgba(148, 163, 184, 0.28)",
            showbackground: true,
            color: "#e5e7eb",
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
          color: "#3b82f6",
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
            colorbar: { title: displayColumnName(colorColumn) },
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

    function downloadCurrentPlotImage() {
      if (typeof Plotly === "undefined" || !plotNode || !plotNode.data) return;
      const filename = [
        safeFilenamePart(DATASET.title),
        "3d",
        safeFilenamePart(xSelect.value),
        safeFilenamePart(ySelect.value),
        safeFilenamePart(zSelect.value),
      ].join("_");
      Plotly.downloadImage(plotNode, {
        format: "png",
        scale: 2,
        width: 1400,
        height: 900,
        filename,
      });
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
      xPillNode.textContent = logX.checked ? "log10(" + displayColumnName(xColumn) + ")" : displayColumnName(xColumn);
      yPillNode.textContent = logY.checked ? "log10(" + displayColumnName(yColumn) + ")" : displayColumnName(yColumn);
      zPillNode.textContent = logZ.checked ? "log10(" + displayColumnName(zColumn) + ")" : displayColumnName(zColumn);
      const noteParts = [];
      if (aligned.excludedForMissing) noteParts.push(String(aligned.excludedForMissing) + " rows excluded for missing X/Y/Z values.");
      if (aligned.excludedForLog) noteParts.push(String(aligned.excludedForLog) + " rows excluded because log axes need values > 0.");
      statusNote.textContent = noteParts.length ? noteParts.join(" ") : "All rows with valid axis values are shown.";
      notifyParentState();
    }

    function initialize() {
      const initialState = sanitizeInitialState(INITIAL_STATE);
      titleNode.textContent = DATASET.title;
      populateSelect(xSelect, DATASET.numeric_columns, initialState.x);
      populateSelect(ySelect, DATASET.numeric_columns, initialState.y);
      populateSelect(zSelect, DATASET.numeric_columns, initialState.z);
      populateSelect(colorSelect, DATASET.color_columns, initialState.color, true);
      populateSelect(sizeSelect, DATASET.numeric_columns, initialState.size, true);
      populateSelect(hoverIdSelect, DATASET.columns, initialState.hoverId, true);
      logX.checked = initialState.logX;
      logY.checked = initialState.logY;
      logZ.checked = initialState.logZ;
      opacitySlider.value = String(initialState.opacity);
      sizeScaleSlider.value = String(initialState.sizeScale);
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
      savePlotButton.addEventListener("click", downloadCurrentPlotImage);
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
  const shouldClear = window.confirm("Are you sure you want to clear all data and settings?");
  if (!shouldClear) return;

  if (persistenceWriteTimer) {
    clearTimeout(persistenceWriteTimer);
    persistenceWriteTimer = 0;
  }
  resetApplicationState();
  void clearPersistedSnapshot();
});

if (dashboardTab && statisticsTab && distributionTab && correlationTab) {
  dashboardTab.addEventListener("click", () => setOuterView("dashboard"));
  statisticsTab.addEventListener("click", () => setOuterView("statistics"));
  distributionTab.addEventListener("click", () => setOuterView("distribution"));
  correlationTab.addEventListener("click", () => setOuterView("correlation"));
}
if (prepOpenButton) {
  prepOpenButton.addEventListener("click", () => setOuterView("transformation"));
}
if (prepTransformModeButton) {
  prepTransformModeButton.addEventListener("click", () => setPrepView("transform"));
}
if (prepDiagnosticsModeButton) {
  prepDiagnosticsModeButton.addEventListener("click", () => setPrepView("diagnostics"));
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
    persistAppStateSoon();
  });
}
if (statsCategoricalSearch) {
  statsCategoricalSearch.addEventListener("input", () => {
    statsCategoricalSearchValue = statsCategoricalSearch.value;
    renderStatsToolbar();
    persistAppStateSoon();
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
    persistAppStateSoon();
  });
}
if (statsClearNumericButton) {
  statsClearNumericButton.addEventListener("click", () => {
    selectedStatsColumns = [];
    renderStatsToolbar();
    renderStatsTable();
    persistAppStateSoon();
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
    persistAppStateSoon();
  });
}
if (statsClearCategoricalButton) {
  statsClearCategoricalButton.addEventListener("click", () => {
    selectedCategoricalStatsColumns = [];
    renderStatsToolbar();
    renderCategoricalSummary();
    persistAppStateSoon();
  });
}
if (missingColumnSelect) {
  missingColumnSelect.addEventListener("change", () => {
    selectedMissingColumn = missingColumnSelect.value || null;
    renderMissingValuesSummary();
    persistAppStateSoon();
  });
}
if (distVariableSelect) {
  distVariableSelect.addEventListener("change", () => {
    distributionColumn = distVariableSelect.value || null;
    renderDistributionView();
    persistAppStateSoon();
  });
}
if (distSplitSelect) {
  distSplitSelect.addEventListener("change", () => {
    distributionSplitColumn = distSplitSelect.value || NONE_OPTION;
    renderDistributionView();
    persistAppStateSoon();
  });
}
if (distViewSelect) {
  distViewSelect.addEventListener("change", () => {
    distributionViewMode = distViewSelect.value || "histogram";
    renderDistributionView();
    persistAppStateSoon();
  });
}
if (distOverlaySelect) {
  distOverlaySelect.addEventListener("change", () => {
    distributionOverlayMode = distOverlaySelect.value || "none";
    renderDistributionView();
    persistAppStateSoon();
  });
}
if (distNormalizationSelect) {
  distNormalizationSelect.addEventListener("change", () => {
    distributionNormalization = distNormalizationSelect.value || "density";
    renderDistributionView();
    persistAppStateSoon();
  });
}
if (distBinSlider) {
  const onBinChange = () => {
    distributionBinCount = Math.max(8, Math.min(80, Number(distBinSlider.value) || 24));
    updateDistributionBinLabel();
    renderDistributionView();
    persistAppStateSoon();
  };
  distBinSlider.addEventListener("input", onBinChange);
  distBinSlider.addEventListener("change", onBinChange);
}
if (distResetButton) {
  distResetButton.addEventListener("click", () => reset2DPlotZoom("dist-plot"));
}
if (distSaveButton) {
  distSaveButton.addEventListener("click", () => {
    const variable = safeFilenamePart(distributionColumn || "distribution");
    const mode = safeFilenamePart(distributionViewMode || "plot");
    download2DPlotImage("dist-plot", `${safeDatasetStem()}_${mode}_${variable}`);
  });
}
if (distBoxSaveButton) {
  distBoxSaveButton.addEventListener("click", () => {
    const variable = safeFilenamePart(distributionColumn || "distribution");
    download2DPlotImage("dist-box-plot", `${safeDatasetStem()}_box_${variable}`);
  });
}
if (distViolinSaveButton) {
  distViolinSaveButton.addEventListener("click", () => {
    const variable = safeFilenamePart(distributionColumn || "distribution");
    download2DPlotImage("dist-violin-plot", `${safeDatasetStem()}_violin_${variable}`);
  });
}
if (outlierMethodSelect) {
  outlierMethodSelect.addEventListener("change", () => {
    outlierMethod = outlierMethodSelect.value || "iqr";
    outlierThreshold = outlierMethodConfig(outlierMethod).defaultThreshold;
    outlierSelectedRowIndex = null;
    updateOutlierThresholdLabel();
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierIdSelect) {
  outlierIdSelect.addEventListener("change", () => {
    outlierIdColumn = outlierIdSelect.value || NONE_OPTION;
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierThresholdSlider) {
  const onOutlierThresholdChange = () => {
    outlierThreshold = normalizeThresholdForMethod(outlierMethod, Number(outlierThresholdSlider.value));
    outlierSelectedRowIndex = null;
    updateOutlierThresholdLabel();
    renderOutlierView();
    persistAppStateSoon();
  };
  outlierThresholdSlider.addEventListener("input", onOutlierThresholdChange);
  outlierThresholdSlider.addEventListener("change", onOutlierThresholdChange);
}
if (outlierSearch) {
  outlierSearch.addEventListener("input", () => {
    outlierSearchValue = outlierSearch.value;
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierSelectVisibleButton) {
  outlierSelectVisibleButton.addEventListener("click", () => {
    if (!currentPayload) return;
    outlierSelectedColumns = uniqueOrderedColumns([
      ...outlierSelectedColumns,
      ...filterColumnsByQuery(currentPayload.numeric_columns, outlierSearchValue),
    ]);
    outlierSelectedRowIndex = null;
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierClearColumnsButton) {
  outlierClearColumnsButton.addEventListener("click", () => {
    outlierSelectedColumns = [];
    outlierFocusColumn = null;
    outlierSelectedRowIndex = null;
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierFocusSelect) {
  outlierFocusSelect.addEventListener("change", () => {
    outlierFocusColumn = outlierFocusSelect.value !== NONE_OPTION ? outlierFocusSelect.value : null;
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierScatterXSelect) {
  outlierScatterXSelect.addEventListener("change", () => {
    setOutlierScatterAxis("x", outlierScatterXSelect.value);
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierScatterYSelect) {
  outlierScatterYSelect.addEventListener("change", () => {
    setOutlierScatterAxis("y", outlierScatterYSelect.value);
    renderOutlierView();
    persistAppStateSoon();
  });
}
if (outlierScatterResetButton) {
  outlierScatterResetButton.addEventListener("click", () => reset2DPlotZoom("outlier-scatter-plot"));
}
if (outlierScatterSaveButton) {
  outlierScatterSaveButton.addEventListener("click", () => {
    const analysis = computeOutlierAnalysis(currentPayload);
    const [x, y] = analysis?.scatterColumns || ["x", "y"];
    download2DPlotImage("outlier-scatter-plot", `${safeDatasetStem()}_outliers_${safeFilenamePart(x)}_vs_${safeFilenamePart(y)}`);
  });
}
if (outlierHistSaveButton) {
  outlierHistSaveButton.addEventListener("click", () => {
    const analysis = computeOutlierAnalysis(currentPayload);
    const focus = analysis?.focusColumn || "outliers";
    download2DPlotImage("outlier-histogram-plot", `${safeDatasetStem()}_outlier_distribution_${safeFilenamePart(focus)}`);
  });
}
if (outlierCreateRuleButton) {
  outlierCreateRuleButton.addEventListener("click", addOutlierExclusionRule);
}
if (transformLogHandling) {
  transformLogHandling.addEventListener("change", () => {
    if (!draftTransformConfig) return;
    draftTransformConfig.log.handling = transformLogHandling.value === "exclude" ? "exclude" : "missing";
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (addKeepRuleButton) {
  addKeepRuleButton.addEventListener("click", () => {
    if (!sourcePayload || !draftTransformConfig) return;
    draftTransformConfig.keepRules = [...draftTransformConfig.keepRules, createTransformRule("keepRules")];
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (clearKeepRulesButton) {
  clearKeepRulesButton.addEventListener("click", () => {
    if (!draftTransformConfig) return;
    draftTransformConfig.keepRules = [];
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (addExcludeRuleButton) {
  addExcludeRuleButton.addEventListener("click", () => {
    if (!sourcePayload || !draftTransformConfig) return;
    draftTransformConfig.excludeRules = [...draftTransformConfig.excludeRules, createTransformRule("excludeRules")];
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (clearExcludeRulesButton) {
  clearExcludeRulesButton.addEventListener("click", () => {
    if (!draftTransformConfig) return;
    draftTransformConfig.excludeRules = [];
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (transformResetButton) {
  transformResetButton.addEventListener("click", () => {
    draftTransformConfig = cloneTransformConfig(appliedTransformConfig || defaultTransformConfig());
    clearError();
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (transformApplyButton) {
  transformApplyButton.addEventListener("click", () => {
    if (!sourcePayload || !draftTransformConfig) return;
    const status = previewConfigStatus(sourcePayload, draftTransformConfig);
    if (status.invalidRuleCount) {
      showError(`Complete ${status.invalidRuleCount} incomplete rule${status.invalidRuleCount === 1 ? "" : "s"} before applying.`);
      return;
    }
    clearError();
    appliedTransformConfig = cloneTransformConfig(draftTransformConfig);
    refreshActivePayload();
    renderTransformationView();
    persistAppStateSoon();
  });
}
if (corrPairModeButton) {
  corrPairModeButton.addEventListener("click", () => {
    setCorrelationMode("pair");
    persistAppStateSoon();
  });
}
if (corrMatrixModeButton) {
  corrMatrixModeButton.addEventListener("click", () => {
    setCorrelationMode("matrix");
    persistAppStateSoon();
  });
}
if (corrXSelect) {
  corrXSelect.addEventListener("change", () => {
    renderCorrelationPairExplorer();
    persistAppStateSoon();
  });
}
if (corrYSelect) {
  corrYSelect.addEventListener("change", () => {
    renderCorrelationPairExplorer();
    persistAppStateSoon();
  });
}
if (corrAlphaSlider) {
  const onAlphaChange = () => {
    updateCorrelationAlphaLabel();
    rerenderCorrelationScatterViews();
    persistAppStateSoon();
  };
  corrAlphaSlider.addEventListener("input", onAlphaChange);
  corrAlphaSlider.addEventListener("change", onAlphaChange);
}
if (corrFitSelect) {
  corrFitSelect.addEventListener("change", () => {
    rerenderCorrelationScatterViews();
    persistAppStateSoon();
  });
}
if (corrMatrixMethod) {
  corrMatrixMethod.addEventListener("change", () => {
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
    persistAppStateSoon();
  });
}
if (corrSelectAllButton) {
  corrSelectAllButton.addEventListener("click", () => {
    if (!currentPayload) return;
    selectedMatrixColumns = [...currentPayload.numeric_columns];
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
    persistAppStateSoon();
  });
}
if (corrClearAllButton) {
  corrClearAllButton.addEventListener("click", () => {
    selectedMatrixColumns = [];
    focusedMatrixPair = null;
    renderCorrelationMatrixExplorer();
    persistAppStateSoon();
  });
}
window.addEventListener("message", (event) => {
  if (event.source !== frame.contentWindow) return;
  if (event.data?.type !== "statzooka-dashboard-state") return;
  dashboardViewState = cloneDashboardViewState(event.data.state);
  persistAppStateSoon();
});
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
  scheduleResponsivePlotResize();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loadSelectedCsv();
});

renderStatsTable();
renderCategoricalSummary();
renderMissingValuesSummary();
renderDistributionView();
renderOutlierView();
updateCorrelationAlphaLabel();
renderCorrelationView();
renderTransformationView();
initializeResponsivePlotObserver();
if (!persistenceRestorePromise) {
  persistenceRestorePromise = restorePersistedStateOnLoad();
}
