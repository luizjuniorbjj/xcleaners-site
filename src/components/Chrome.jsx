import { useEffect, useRef, useState } from "react";
import { Plus, Sparkles, LogIn } from "lucide-react";
import { useAnim, useMotion } from "../motion/useMotion.jsx";

// Reading progress bar (DESIGN §3.11)
export function ProgressBar() {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useAnim(ref, ({ gsap, ScrollTrigger }) => {
    gsap.to(ref.current, {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3,
        onUpdate: (st) => setVal(Math.round(st.progress * 100)) },
    });
    ScrollTrigger.refresh();
  });
  return <div ref={ref} className="progress" role="progressbar" aria-label="Page progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={val} />;
}

// Floating dock + mobile CTA bar (DESIGN §3.11). Links already exist in the nav.
export function Dock() {
  const [open, setOpen] = useState(false);
  const { reduce } = useMotion();
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <a className="cta-bar btn-sheen" href="https://app.xcleaners.app/register">
        <Sparkles size={18} color="#4FC3F7" />
        Start Free Trial
        <small>14 days</small>
      </a>
      <div ref={ref} className={`dock${open ? " open" : ""}`} style={reduce ? undefined : undefined}>
        <button type="button" className="fab" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="dock-items" aria-label={open ? "Close quick actions" : "Open quick actions"}>
          <Plus size={24} />
        </button>
        <div id="dock-items" className="dock-items">
          <a className="dock-item primary" href="https://app.xcleaners.app/register" tabIndex={open ? 0 : -1}><Sparkles size={16} /> Start Free Trial</a>
          <a className="dock-item" href="https://app.xcleaners.app/login" tabIndex={open ? 0 : -1}><LogIn size={16} /> Log In</a>
        </div>
      </div>
    </>
  );
}
