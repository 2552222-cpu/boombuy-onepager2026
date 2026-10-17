import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X, RotateCcw, Type, Contrast, Moon, Palette,
  Link2, BookOpen, PauseCircle, MousePointer2,
} from "lucide-react";
import { FONT_STEPS, FONT_LABELS } from "./accessibilitySettings";

const CONTRAST_OPTIONS = [
  { key: "none", label: "רגיל" },
  { key: "high", label: "ניגודיות גבוהה", icon: Contrast },
  { key: "dark", label: "ניגודיות כהה", icon: Moon },
  { key: "gray", label: "גווני אפור", icon: Palette },
];

const TOGGLES = [
  { key: "links", label: "הדגשת קישורים וכפתורים", icon: Link2 },
  { key: "readable", label: "גופן קריא", icon: BookOpen },
  { key: "noMotion", label: "עצירת אנימציות", icon: PauseCircle },
  { key: "bigCursor", label: "סמן גדול", icon: MousePointer2 },
];

export default function AccessibilityPanel({ settings, onChange, onReset, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <div className="bb-a11y-ui bb-a11y-backdrop" onClick={onClose}>
      <div
        className="bb-a11y-panel"
        role="dialog"
        aria-modal="true"
        aria-label="התאמות נגישות"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bb-a11y-head">
          <h2 className="bb-a11y-title">התאמות נגישות</h2>
          <button ref={closeRef} type="button" className="bb-a11y-close" onClick={onClose} aria-label="סגירת תפריט הנגישות">
            <X size={20} />
          </button>
        </div>

        <div className="bb-a11y-body">
          <section className="bb-a11y-group">
            <div className="bb-a11y-group-title"><Type size={18} /> <span>גודל טקסט</span></div>
            <div className="bb-a11y-seg">
              {FONT_STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={"bb-a11y-seg-btn" + (settings.fontScale === i ? " is-active" : "")}
                  aria-pressed={settings.fontScale === i}
                  onClick={() => set({ fontScale: i })}
                >
                  {FONT_LABELS[i]}
                </button>
              ))}
            </div>
          </section>

          <section className="bb-a11y-group">
            <div className="bb-a11y-group-title"><Contrast size={18} /> <span>ניגודיות ותצוגה</span></div>
            <div className="bb-a11y-grid">
              {CONTRAST_OPTIONS.map((o) => {
                const Icon = o.icon;
                const on = settings.contrast === o.key;
                return (
                  <button
                    key={o.key}
                    type="button"
                    className={"bb-a11y-tile" + (on ? " is-active" : "")}
                    aria-pressed={on}
                    onClick={() => set({ contrast: o.key })}
                  >
                    {Icon ? <Icon size={20} /> : <span className="bb-a11y-tile-dot" aria-hidden="true" />}
                    <span>{o.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bb-a11y-group">
            <div className="bb-a11y-group-title"><MousePointer2 size={18} /> <span>התאמות נוספות</span></div>
            <div className="bb-a11y-toggles">
              {TOGGLES.map((t) => {
                const Icon = t.icon;
                const on = !!settings[t.key];
                return (
                  <button
                    key={t.key}
                    type="button"
                    className={"bb-a11y-toggle" + (on ? " is-on" : "")}
                    aria-pressed={on}
                    onClick={() => set({ [t.key]: !on })}
                  >
                    <span className="bb-a11y-toggle-icon"><Icon size={18} /></span>
                    <span className="bb-a11y-toggle-label">{t.label}</span>
                    <span className="bb-a11y-switch" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </section>

          <button type="button" className="bb-a11y-reset" onClick={onReset}>
            <RotateCcw size={16} /> איפוס הגדרות
          </button>

          <Link to="/accessibility" onClick={onClose} className="bb-a11y-statement-link">
            להצהרת הנגישות המלאה
          </Link>

          <p className="bb-a11y-note">
            ההגדרות נשמרות בדפדפן שלכם. לפניות בנושא נגישות: support@boombuy.co.il
          </p>
        </div>
      </div>
    </div>
  );
}