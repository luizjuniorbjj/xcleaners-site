import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { colors, SANS } from "../tokens";
import { useAnim } from "../motion/useMotion.jsx";

function TestimonialCard({ name, company, location, quote, metric, starsRef }) {
  return (
    <div style={{
      background: colors.white, borderRadius: 20, padding: "36px 32px",
      boxShadow: "0 4px 24px rgba(11,29,53,0.06)", border: `1px solid ${colors.gray100}`,
      display: "flex", flexDirection: "column", gap: 20, minHeight: 360,
    }}>
      <div ref={starsRef} style={{ display: "flex", gap: 4 }}>
        {[...Array(5)].map((_, i) => <Star key={i} className="star" size={16} fill="#F59E0B" color="#F59E0B" />)}
      </div>
      <p style={{ fontSize: 16, color: colors.gray800, lineHeight: 1.7, flex: 1, fontFamily: SANS, margin: 0, fontStyle: "italic" }}>"{quote}"</p>
      {metric && (
        <div style={{ background: colors.greenPale, borderRadius: 10, padding: "10px 16px", display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start" }}>
          <TrendingUp size={16} color={colors.green} />
          <span style={{ fontSize: 14, fontWeight: 700, color: colors.green, fontFamily: SANS }}>{metric}</span>
        </div>
      )}
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0, fontFamily: SANS }}>{name}</p>
        <p style={{ fontSize: 13, color: colors.gray400, margin: "2px 0 0", fontFamily: SANS }}>{company} · {location}</p>
      </div>
    </div>
  );
}

// 3D coverflow on desktop, native scroll-snap on mobile (DESIGN §3.7).
export default function Coverflow({ items }) {
  const [active, setActive] = useState(Math.floor(items.length / 2));
  const rootRef = useRef(null);
  const drag = useRef(null);
  const n = items.length;
  const go = (i) => setActive(((i % n) + n) % n);

  useAnim(rootRef, ({ gsap }) => {
    gsap.from(".star", {
      scale: 0, opacity: 0, duration: 0.4, stagger: 0.05, ease: "back.out(2)",
      scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
    });
  });

  const onPointerDown = (e) => { drag.current = e.clientX; };
  const onPointerUp = (e) => {
    if (drag.current == null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };

  return (
    <div ref={rootRef}>
      <div className="cf" role="region" aria-roledescription="carousel" aria-label="Testimonials" tabIndex={0} onKeyDown={onKey}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { drag.current = null; }}>
        {items.map((t, i) => {
          const off = i - active;
          const isActive = off === 0;
          const x = off * 300;
          const style = {
            transform: `translateX(${x}px) translateZ(${isActive ? 0 : -160}px) rotateY(${off * -28}deg) scale(${isActive ? 1 : 0.9})`,
            zIndex: n - Math.abs(off),
            opacity: Math.abs(off) > 1 ? 0 : 1,
            filter: isActive ? "none" : "saturate(0.8)",
            pointerEvents: Math.abs(off) > 1 ? "none" : "auto",
          };
          return (
            <div key={i} className={`cf-item${isActive ? " active" : ""}`} style={style} onClick={() => !isActive && go(i)}
              aria-hidden={!isActive} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
              <TestimonialCard {...t} />
            </div>
          );
        })}
      </div>
      <div className="cf-nav">
        <button type="button" className="cf-btn" onClick={() => go(active - 1)} aria-label="Previous testimonial"><ChevronLeft size={20} /></button>
        {items.map((_, i) => (
          <button key={i} type="button" className="cf-dot" onClick={() => go(i)} aria-label={`Go to testimonial ${i + 1}`} aria-current={i === active ? "true" : undefined} />
        ))}
        <button type="button" className="cf-btn" onClick={() => go(active + 1)} aria-label="Next testimonial"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}
