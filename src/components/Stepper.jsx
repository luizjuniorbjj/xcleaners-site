import { useRef, useState } from "react";
import { colors, SANS, headingStyle, bodyStyle } from "../tokens";
import { useAnim } from "../motion/useMotion.jsx";
import PhoneMockup from "./PhoneMockup";

// "A typical week" as a clickable stepper that drives a phone screen
// (DESIGN §3.5). Scroll and click both move the active step.
export default function Stepper({ steps }) {
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const stepRefs = useRef([]);

  useAnim(rootRef, ({ gsap, ScrollTrigger }) => {
    gsap.from(".step-item", {
      rotateX: -25, y: 40, opacity: 0, duration: 0.4, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
    });
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      ScrollTrigger.create({
        trigger: el, start: "top 60%", end: "bottom 60%",
        onEnter: () => setActive(i), onEnterBack: () => setActive(i),
      });
    });
  });

  return (
    <div ref={rootRef} className="steps-layout">
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {steps.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={i} ref={(el) => { stepRefs.current[i] = el; }} className="step-item"
              style={{ display: "flex", gap: 32, marginBottom: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
                <div className="step-ic" style={{
                  width: 48, height: 48, borderRadius: 14, position: "relative",
                  background: done ? colors.green : current ? step.color : step.color + "12",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {done ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path className="check-draw done" d="M4 12.5l5 5L20 6.5" />
                    </svg>
                  ) : (
                    <step.icon size={22} color={current ? colors.white : step.color} />
                  )}
                </div>
                {i < steps.length - 1 && <div className="step-line" style={{ "--p": done ? 1 : current ? 0.5 : 0 }} />}
              </div>
              <button type="button" className="step-btn" onClick={() => setActive(i)} aria-current={current ? "step" : undefined}
                style={{ flex: 1, minWidth: 260 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: step.color, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: SANS }}>{step.time}</span>
                <h3 style={{ ...headingStyle, fontSize: 22, margin: "8px 0 10px", opacity: current ? 1 : 0.85 }}>{step.title}</h3>
                <p style={{ ...bodyStyle, fontSize: 16, margin: 0, maxWidth: 520 }}>{step.desc}</p>
                <span style={{
                  display: "inline-block", marginTop: 12, fontSize: 12, fontWeight: 600, color: step.color,
                  background: step.color + "10", padding: "4px 12px", borderRadius: 100, fontFamily: SANS,
                }}>{step.tag}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="steps-phone" aria-hidden="true">
        <PhoneMockup screen={steps[active].screen} />
      </div>
    </div>
  );
}
