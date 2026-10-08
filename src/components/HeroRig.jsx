import { useRef } from "react";
import { useAnim, useMotion } from "../motion/useMotion.jsx";
import PhoneMockup, { PlateNextJob, PlatePaid } from "./PhoneMockup";

// Hero 3D stack (DESIGN §3.1): main plate = phone, two satellite plates,
// entrance by CSS keyframes, camera dolly on scroll, mouse tilt on fine pointers.
export default function HeroRig({ sectionRef }) {
  const sceneRef = useRef(null);
  const tiltRef = useRef(null);
  const rigRef = useRef(null);
  const { fine, reduce } = useMotion();

  useAnim(sceneRef, ({ gsap }) => {
    if (!sectionRef?.current) return;
    gsap.to(rigRef.current, {
      rotateY: -10, rotateX: 6, z: -120, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
    });
  });

  const onMove = (e) => {
    if (!fine || reduce || !tiltRef.current) return;
    const r = sceneRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
  };
  const onLeave = () => { if (tiltRef.current) tiltRef.current.style.transform = ""; };

  return (
    <div ref={sceneRef} className="hero-scene" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ position: "relative", width: 280, height: 560, margin: "0 auto" }} aria-hidden="true">
      <div ref={rigRef} className="hero-rig" style={{ position: "relative", width: "100%", height: "100%" }}>
        <div ref={tiltRef} className="hero-tilt" style={{ position: "relative", width: "100%", height: "100%" }}>
          <div className="p-back"><PlateNextJob /></div>
          <PhoneMockup className="p-main" screen="schedule" />
          <div className="p-front"><PlatePaid /></div>
        </div>
      </div>
    </div>
  );
}
