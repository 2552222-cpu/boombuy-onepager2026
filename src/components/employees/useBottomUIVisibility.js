import { useEffect, useState } from "react";

// Shared hide-conditions for the fixed bottom UI (logo rail, persistent CTA, WhatsApp).
// Each condition has its own observer/flag — no observer cancels another condition's flag.
// Hide when: the opening (hero) is shown, the fit form / booking area is in view,
// a benefit modal is open, or the mobile keyboard is open while filling the fit form.
export function useBottomUIVisibility() {
  const [heroInView, setHeroInView] = useState(true);
  const [fitBookInView, setFitBookInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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

    // Observe the fit form area (book-demo may not exist until revealed; that's fine).
    const fitEl = document.getElementById("organization-fit");
    if (fitEl) {
      const io = new IntersectionObserver(
        ([entry]) => setFitBookInView(entry.isIntersecting && entry.intersectionRatio > 0.08),
        { threshold: [0, 0.08, 0.2] }
      );
      io.observe(fitEl);
      observers.push(io);
    }

    const onModal = (e) => setModalOpen(Boolean(e.detail && e.detail.open));
    window.addEventListener("offersModalChange", onModal);

    // Mobile keyboard: hide bottom UI while a field inside the fit form is focused.
    const isField = (el) =>
      !!el &&
      el.closest &&
      el.closest("#organization-fit") &&
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
      window.removeEventListener("offersModalChange", onModal);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const hidden = heroInView || fitBookInView || modalOpen || keyboardOpen;
  return { hidden, heroInView, fitBookInView, modalOpen, keyboardOpen };
}