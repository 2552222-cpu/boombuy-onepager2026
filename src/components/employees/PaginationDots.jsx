import React from "react";

export default function PaginationDots({ count, active, label, onSelect, className = "" }) {
  return (
    <div role="group" aria-label={label} className={`flex min-w-0 max-w-full flex-wrap justify-center ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label} ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-inset"
        >
          <span aria-hidden="true" className={`block h-2 rounded-full transition-[width,background-color] motion-reduce:transition-none ${i === active ? "w-5 bg-brand-coral" : "w-2 bg-foreground/20"}`} />
        </button>
      ))}
    </div>
  );
}