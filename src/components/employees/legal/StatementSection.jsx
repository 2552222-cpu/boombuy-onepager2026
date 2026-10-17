import React from "react";

// One titled block in a legal/policy page (shared by the accessibility statement).
export default function StatementSection({ title, children }) {
  return (
    <section>
      <h2 style={{ color: "#17191D", fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}