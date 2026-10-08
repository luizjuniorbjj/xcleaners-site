import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { colors, SANS } from "../tokens";
import { useMotion } from "../motion/useMotion.jsx";

// Feature card with 3D tilt + glare on fine pointers and a click/tap flip
// (DESIGN §3.4). The front face is complete on its own; the back is a bonus.
export default function TiltCard({ icon: Icon, title, desc, accent = colors.blue, back = [] }) {
  const { fine, reduce } = useMotion();
  const innerRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [hinted, setHinted] = useState(true);
  const canFlip = back.length > 0;

  const onMove = (e) => {
    if (!fine || reduce || flipped || !innerRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    innerRef.current.style.transform = `rotateY(${(x - 0.5) * 16}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(6px)`;
    innerRef.current.style.setProperty("--gx", `${x * 100}%`);
    innerRef.current.style.setProperty("--gy", `${y * 100}%`);
  };
  const onLeave = () => { if (innerRef.current && !flipped) innerRef.current.style.transform = ""; };
  const toggle = () => {
    if (!canFlip) return;
    setHinted(false);
    setFlipped((f) => !f);
    if (innerRef.current) innerRef.current.style.transform = "";
  };
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };

  const face = {
    background: colors.white, borderRadius: 16, padding: "32px 28px",
    boxShadow: "0 4px 20px rgba(11,29,53,0.06)", border: `1px solid ${colors.gray100}`,
    display: "flex", flexDirection: "column", minHeight: 240,
  };

  return (
    <div className="tilt-card" onMouseMove={onMove} onMouseLeave={onLeave} onClick={toggle} onKeyDown={onKey}
      role={canFlip ? "button" : undefined} tabIndex={canFlip ? 0 : undefined}
      aria-pressed={canFlip ? flipped : undefined} aria-label={canFlip ? `${title}. ${flipped ? "Show summary" : "Show details"}` : undefined}
      style={{ cursor: canFlip ? "pointer" : "default" }}>
      <div ref={innerRef} className={`card-in${flipped ? " flipped flipping" : ""}`}>
        <div className="card-face" style={face}>
          <div className="glare" />
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: accent + "12",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
          }}>
            <Icon size={24} color={accent} strokeWidth={2} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.navy, marginBottom: 10, fontFamily: SANS }}>{title}</h3>
          <p style={{ fontSize: 15, color: colors.gray600, lineHeight: 1.65, fontFamily: SANS, margin: 0 }}>{desc}</p>
          {canFlip && !fine && hinted && (
            <span style={{ marginTop: "auto", paddingTop: 16, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: accent, fontFamily: SANS }}>
              <RotateCcw size={12} /> Tap to flip
            </span>
          )}
        </div>
        {canFlip && (
          <div className="card-face card-back" style={{ ...face, background: colors.navy, border: "1px solid rgba(255,255,255,0.08)" }} aria-hidden={!flipped}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icon size={28} color={accent === colors.blue ? colors.blueLight : colors.greenLight} strokeWidth={2} />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.white, margin: 0, fontFamily: SANS }}>{title}</h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {back.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5, color: colors.gray400, fontFamily: SANS }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, marginTop: 8, flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
