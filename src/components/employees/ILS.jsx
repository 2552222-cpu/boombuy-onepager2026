import React from "react";

export default function ILS({ value, className = "", style = {} }) {
  const clean = String(value ?? "").replace(/[^\d.,-]/g, "");

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {clean} ₪
    </span>
  );
}