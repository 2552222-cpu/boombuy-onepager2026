import React from "react";

export default function ILS({ value, className = "", style = {} }) {
  const clean = String(value ?? "").replace(/[^\d.,-]/g, "");

  return (
    <span
      dir="ltr"
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "baseline",
        whiteSpace: "nowrap",
        direction: "ltr",
        unicodeBidi: "isolate-override",
        ...style,
      }}
    >
      <span style={{ direction: "ltr", unicodeBidi: "embed" }}>{clean}</span>
      <span style={{ marginInlineStart: "0.18em" }}>₪</span>
    </span>
  );
}