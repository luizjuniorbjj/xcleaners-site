import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { colors, SANS } from "../tokens";
import { useMotion } from "../motion/useMotion.jsx";

// Accordion with gsap height tween when available (DESIGN §3.9), CSS fallback otherwise.
export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  const id = useId();
  const { gsap, ready, reduce } = useMotion();

  const toggle = () => {
    const el = panel.current;
    if (ready && !reduce && el) {
      if (open) {
        gsap.to(el, { height: 0, duration: 0.25, ease: "power2.inOut", onComplete: () => setOpen(false) });
      } else {
        setOpen(true);
        gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.25, ease: "expo.out", clearProps: "height" });
      }
    } else {
      setOpen(!open);
    }
  };

  return (
    <div style={{ borderBottom: `1px solid ${colors.gray200}`, padding: "20px 0" }}>
      <button type="button" onClick={toggle} aria-expanded={open} aria-controls={id} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 16,
        background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left", font: "inherit",
      }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: colors.navy, fontFamily: SANS }}>{question}</span>
        <ChevronDown size={20} color={colors.blue} style={{
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)", flexShrink: 0,
        }} />
      </button>
      <div id={id} ref={panel} style={{ overflow: "hidden", height: open ? "auto" : 0 }}>
        <p style={{ fontSize: 15, color: colors.gray600, lineHeight: 1.7, marginTop: 12, fontFamily: SANS }}>{answer}</p>
      </div>
    </div>
  );
}
