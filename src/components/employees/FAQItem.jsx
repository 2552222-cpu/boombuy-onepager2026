import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;
  return (
    <div className="faq-item">
      <h3 className="m-0">
        <button id={questionId} type="button" className="faq-question" aria-expanded={expanded}
          aria-controls={answerId} onClick={() => setExpanded((value) => !value)}>
          <span>{item.q}</span>
          <ChevronDown className="faq-chev" size={22} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </h3>
      <div id={answerId} role="region" aria-labelledby={questionId} hidden={!expanded}>
        <p className="faq-a">{item.a}</p>
      </div>
    </div>
  );
}