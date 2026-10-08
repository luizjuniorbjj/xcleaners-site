import { useRef } from "react";
import { useAnim } from "./useMotion.jsx";

// Scroll reveal via ScrollTrigger (once). Renders visible by default, so the
// content is there even if the motion libs never load (DESIGN §2.1).
// `delay` is in milliseconds to stay compatible with the previous <Reveal>.
export default function Rv({ children, delay = 0, y = 24, rotateX = 0, as: Tag = "div", style, className, ...rest }) {
  const ref = useRef(null);
  useAnim(ref, ({ gsap }) => {
    gsap.from(ref.current, {
      opacity: 0, y, rotateX,
      duration: 0.4, delay: delay / 1000, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  });
  return (
    <Tag ref={ref} style={style} className={className} {...rest}>
      {children}
    </Tag>
  );
}
