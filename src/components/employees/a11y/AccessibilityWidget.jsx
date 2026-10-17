import React, { useEffect, useRef, useState } from "react";
import { Accessibility } from "lucide-react";
import { loadSettings, saveSettings, applySettings, DEFAULT_SETTINGS } from "./accessibilitySettings";
import AccessibilityPanel from "./AccessibilityPanel";

// Floating accessibility button pinned to the side of the screen. It opens a
// panel of adjustments; every choice is applied to <html> (site-wide) and
// remembered in the browser.
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(loadSettings);
  const triggerRef = useRef(null);

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus?.();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="bb-a11y-ui bb-a11y-tab"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="פתיחת תפריט נגישות"
      >
        <span className="bb-a11y-tab-icon"><Accessibility size={18} strokeWidth={2.4} /></span>
        <span className="bb-a11y-tab-label">נגישות</span>
      </button>

      {open && (
        <AccessibilityPanel
          settings={settings}
          onChange={setSettings}
          onReset={() => setSettings(DEFAULT_SETTINGS)}
          onClose={close}
        />
      )}
    </>
  );
}