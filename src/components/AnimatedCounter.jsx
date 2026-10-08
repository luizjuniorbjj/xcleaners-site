import { useEffect, useRef, useState } from "react";
import { useMotion } from "../motion/useMotion.jsx";

// Counts from 0 to `end` the first time it enters the viewport.
// With reduced motion it renders the final value immediately.
export default function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const { reduce } = useMotion();
  const [count, setCount] = useState(reduce ? end : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, reduce]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
