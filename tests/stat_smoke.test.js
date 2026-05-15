const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function fakeElement(id = "") {
  return {
    id,
    value: "",
    checked: false,
    disabled: false,
    files: [],
    textContent: "",
    innerHTML: "",
    style: { setProperty() {} },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {},
    append() {},
    appendChild() {},
    remove() {},
    setAttribute() {},
    getAttribute() { return null; },
    querySelectorAll() { return []; },
    querySelector() { return fakeElement("nested"); },
    getBoundingClientRect() { return { width: 800, height: 600 }; },
    options: [],
  };
}

const elements = new Map();
function getElementById(id) {
  if (!elements.has(id)) elements.set(id, fakeElement(id));
  return elements.get(id);
}

const document = {
  getElementById,
  querySelector: () => fakeElement("query"),
  createElement: (tag) => {
    const element = fakeElement(tag);
    element.tagName = tag.toUpperCase();
    return element;
  },
  body: fakeElement("body"),
};

const window = {
  localStorage: { setItem() {}, removeItem() {}, getItem() { return null; } },
  addEventListener() {},
  setTimeout,
  clearTimeout,
  confirm() { return true; },
  innerHeight: 900,
  parent: { postMessage() {} },
};

const context = {
  console,
  document,
  window,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (callback) => setTimeout(callback, 0),
  cancelAnimationFrame: clearTimeout,
  ResizeObserver: undefined,
  Blob: function Blob() {},
  URL: { createObjectURL() { return "blob:"; }, revokeObjectURL() {} },
  Papa: { parse() {} },
  Plotly: {
    newPlot() { return Promise.resolve(); },
    react() {},
    relayout() {},
    Plots: { resize() {} },
    downloadImage() {},
  },
  DataTransfer: function DataTransfer() {
    this.items = { add() {} };
    this.files = [];
  },
  Math,
  Number,
  String,
  Array,
  Map,
  Set,
  JSON,
  Promise,
  Error,
};

vm.createContext(context);
vm.runInContext(fs.readFileSync("site/assets/app.js", "utf8"), context);

assert.equal(context.meanValue([1, 2, 3, 4, 5]), 3);
assert.equal(context.medianValue([1, 2, 3, 4, 5]), 3);
assert.equal(context.quantileValue([1, 2, 3, 4, 5], 0.25), 2);
assert.equal(context.varianceValue([1, 2, 3, 4, 5]), 2.5);
assert.equal(context.pearsonCorrelation([1, 2, 3], [2, 4, 6]), 1);
assert.equal(context.spearmanCorrelation([1, 2, 3], [3, 2, 1]), -1);

const regression = context.linearRegression([1, 2, 3], [2, 4, 6]);
assert.equal(regression.slope, 2);
assert.equal(regression.intercept, 0);
assert.equal(regression.rSquared, 1);

assert.throws(
  () => context.buildPayload([{ a: "", b: "", c: "" }], "empty"),
  /at least 3 numeric columns/,
);

const collisionSource = context.buildPayload([
  { x: "1", y: "2", z: "3", cat: "A", cat__A: "999" },
  { x: "2", y: "4", z: "6", cat: "B", cat__A: "888" },
], "collision");
const config = context.defaultTransformConfig();
config.encoding.columns = ["cat"];
const prepared = context.derivePreparedPayload(collisionSource, config).payload;
assert.equal(prepared.records[0].cat__A, 999);
assert.equal(prepared.records[0].cat__A_2, 1);
assert.equal(prepared.display_names.cat__A_2, "cat = A");

const logConfig = context.defaultTransformConfig();
logConfig.log.columns = ["x"];
logConfig.scaling.mode = "standardize";
logConfig.scaling.columns = ["x"];
const transformed = context.derivePreparedPayload(collisionSource, logConfig).payload;
assert.equal(transformed.display_names.x, "z-score(log10(x))");

const outliers = context.outlierSummaryForColumn(
  { records: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 100 }], numeric_columns: ["x"], columns: ["x"] },
  "x",
  "iqr",
  1.5,
);
assert.equal(outliers.flaggedCount, 1);
assert.deepEqual([...outliers.flaggedIndices.keys()], [4]);

process.stdout.write("stat smoke tests passed\n");
