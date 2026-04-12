import React from "react";

export default function ILS({ value, className = "", style = {} }) {
  const clean = String(value ?? "").replace(/[^\d.,-]/g, "");

  return (
    <span
      dir="ltr"
      className={className}
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        direction: "ltr",
        unicodeBidi: "bidi-override",
        ...style,
      }}
    >
      {clean}₪
    </span>
  );
}