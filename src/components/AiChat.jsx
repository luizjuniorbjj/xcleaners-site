import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { colors, MONO, SANS } from "../tokens";
import { useAnim, useMotion } from "../motion/useMotion.jsx";

// Chat mock with a one-time typing sequence on enter (DESIGN §3.6).
// Messages are the exact ones already on the page.
export default function AiChat() {
  const { reduce } = useMotion();
  const ref = useRef(null);
  const [phase, setPhase] = useState(reduce ? 3 : 0);
  const [entered, setEntered] = useState(false);

  useAnim(ref, ({ ScrollTrigger }) => {
    ScrollTrigger.create({ trigger: ref.current, start: "top 75%", once: true, onEnter: () => setEntered(true) });
  });

  useEffect(() => {
    if (!entered || reduce) return undefined;
    const t = [setTimeout(() => setPhase(1), 200), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2100)];
    return () => t.forEach(clearTimeout);
  }, [entered, reduce]);

  return (
    <div ref={ref} style={{
      flex: "1 1 340px", maxWidth: 420, position: "relative",
      background: colors.gray50, borderRadius: 24, padding: "28px 24px",
      border: `1px solid ${colors.gray100}`,
      boxShadow: "0 12px 48px rgba(11,29,53,0.08)",
      display: "flex", flexDirection: "column", gap: 14, minHeight: 236,
    }}>
      {phase >= 1 && (
        <div className="bubble" style={{
          alignSelf: "flex-end", maxWidth: "85%",
          background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
          color: colors.white, padding: "12px 16px",
          borderRadius: "16px 16px 4px 16px", fontSize: 14, lineHeight: 1.5, fontFamily: SANS,
        }}>
          Cancel tomorrow's 10am clean for Sarah Johnson
        </div>
      )}
      {phase === 2 && (
        <div className="bubble typing" aria-label="Assistant is typing" style={{ alignSelf: "flex-start", background: colors.white, padding: "14px 16px", borderRadius: "16px 16px 16px 4px", border: `1px solid ${colors.gray100}` }}>
          <span /><span /><span />
        </div>
      )}
      {phase >= 3 && (
        <>
          <div className="bubble" style={{
            alignSelf: "flex-start", maxWidth: "90%",
            background: colors.white, color: colors.gray800,
            padding: "14px 16px", borderRadius: "16px 16px 16px 4px",
            fontSize: 14, lineHeight: 1.5, border: `1px solid ${colors.gray100}`,
            boxShadow: "0 2px 8px rgba(11,29,53,0.04)", fontFamily: SANS,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.green}, ${colors.greenLight})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Sparkles size={12} color={colors.white} />
              </div>
              <span style={{ fontWeight: 600, color: colors.navy }}>Assistant</span>
            </div>
            Found it — <strong>Deep Clean</strong> for Sarah Johnson, <span style={{ fontFamily: MONO }}>tomorrow 10:00</span>. Cancel this booking and notify the client?
          </div>
          <div className="bubble" style={{ alignSelf: "flex-end", display: "flex", gap: 8, animationDelay: "120ms" }}>
            <span style={{ background: colors.green, color: colors.white, padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, fontFamily: SANS }}>Yes, cancel</span>
            <span style={{ background: colors.white, color: colors.gray600, padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, border: `1px solid ${colors.gray200}`, fontFamily: SANS }}>Keep it</span>
          </div>
        </>
      )}
    </div>
  );
}
