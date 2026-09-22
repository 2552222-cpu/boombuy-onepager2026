import { useEffect, useRef, useState } from "react";

// Shared hide-conditions for the fixed bottom UI (logo rail + persistent CTA).
// Each condition keeps its OWN observer + its OWN state flag. No observer ever
// writes another observer's flag, so one section leaving view can never cancel
// another section's hide reason (the spec's "אין מצב שבו observer אחד מבטל תנאי הסתרה אחר").
//
// Hidden when ANY of:
//   - the opening (hero) is on screen
//   - the fit form is in view
//   - the booking / confirmation area is in view
//   - a benefit modal is open
//   - the mobile keyboard is open while a field is focused
export function useBottomUIVisibility() {
  const [heroInView, setHeroInView] = useState(true);
  const [fitInView, setFitInView] = useState(false);
  const [bookInView, setBookInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const bookIoRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const heroEl = document.getElementById("hero-transformation");
    if (heroEl) {
      const io = new IntersectionObserver(
        ([entry]) => setHeroInView(entry.isIntersecting && entry.intersectionRatio > 0.03),
        { threshold: [0, 0.03, 0.2] }
      );
      io.observe(heroEl);
      observers.push(io);
    }

    const fitEl = document.getElementById("organization-fit");
    if (fitEl) {
      const io = new IntersectionObserver(
        ([entry]) => setFitInView(entry.isIntersecting && entry.intersectionRatio > 0.08),
        { threshold: [0, 0.08, 0.2] }
      );
      io.observe(fitEl);
      observers.push(io);
    }

    // Booking / confirmation area — only exists AFTER a successful submit, so attach
    // it lazily (on boom_fit_submitted) and also retry once shortly after mount.
    const observeBookDemo = () => {
      const el = document.getElementById("book-demo");
      if (!el || bookIoRef.current) return;
      const io = new IntersectionObserver(
        ([entry]) => setBookInView(entry.isIntersecting && entry.intersectionRatio > 0.08),
        { threshold: [0, 0.08, 0.2] }
      );
      io.observe(el);
      bookIoRef.current = io;
      observers.push(io);
    };
    observeBookDemo();
    window.addEventListener("boom_fit_submitted", observeBookDemo);

    const onModal = (e) => setModalOpen(Boolean(e.detail && e.detail.open));
    window.addEventListener("offersModalChange", onModal);

    // Mobile keyboard: hide bottom UI while a field inside the fit / booking area is focused.
    const isField = (el) =>
      !!el &&
      el.closest &&
      el.closest("#organization-fit, #book-demo") &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
    const onFocusIn = (e) => {
      if (window.innerWidth < 768 && isField(e.target)) setKeyboardOpen(true);
    };
    const onFocusOut = (e) => {
      if (window.innerWidth < 768 && isField(e.target)) {
        window.setTimeout(() => {
          if (!isField(document.activeElement)) setKeyboardOpen(false);
        }, 80);
      }
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("boom_fit_submitted", observeBookDemo);
      window.removeEventListener("offersModalChange", onModal);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const hidden = heroInView || fitInView || bookInView || modalOpen || keyboardOpen;
  return { hidden, heroInView, fitInView, bookInView, modalOpen, keyboardOpen };
}