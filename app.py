from __future__ import annotations

from io import BytesIO

import pandas as pd
from flask import Flask, jsonify, render_template, request

from csv_3d_dashboard import (
    DEFAULT_TITLE_SUFFIX,
    MAX_CATEGORICAL_COLOR_LEVELS,
    build_dashboard_html_from_dataframe,
)


app = Flask(__name__)


@app.get("/")
def index() -> str:
    return render_template("index.html")


@app.post("/dashboard")
def dashboard():
    uploaded_file = request.files.get("csv_file")
    if uploaded_file is None or uploaded_file.filename == "":
        return jsonify({"error": "Upload a CSV file first."}), 400

    if not uploaded_file.filename.lower().endswith(".csv"):
        return jsonify({"error": "Only CSV uploads are supported."}), 400

    title = (request.form.get("title") or "").strip()
    max_categorical_levels_raw = request.form.get("max_categorical_levels", "").strip()

    try:
        max_categorical_levels = (
            int(max_categorical_levels_raw)
            if max_categorical_levels_raw
            else MAX_CATEGORICAL_COLOR_LEVELS
        )
    except ValueError:
        return jsonify({"error": "Max categorical levels must be an integer."}), 400

    filename_stem = uploaded_file.filename.rsplit(".", 1)[0]
    dashboard_title = title or f"{filename_stem} {DEFAULT_TITLE_SUFFIX}"

    try:
        csv_bytes = uploaded_file.read()
        df = pd.read_csv(BytesIO(csv_bytes))
        html = build_dashboard_html_from_dataframe(
            df,
            title=dashboard_title,
            max_categorical_levels=max_categorical_levels,
        )
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400

    return jsonify(
        {
            "html": html,
            "title": dashboard_title,
            "rows": len(df),
            "columns": len(df.columns),
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
