import { createContext, useContext, useEffect, useRef, useState } from "react";

// Motion engine — DESIGN-landing-motion-2026-10-08 §1/§2.
// gsap + ScrollTrigger + Lenis are loaded AFTER first paint and ONLY when the
// visitor has not asked for reduced motion. Everything renders in its final
// state without them; the libs add movement, they never gate content.

const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

const MotionCtx = createContext({
  ready: false, gsap: null, ScrollTrigger: null, lenis: null,
  reduce: true, fine: false, wide: false, scrollTo: () => {},
});

export function MotionProvider({ children }) {
  const [flags] = useState(() => ({
    reduce: mq("(prefers-reduced-motion: reduce)"),
    fine: mq("(pointer: fine)"),
    wide: mq("(min-width: 981px)"),
  }));
  const [libs, setLibs] = useState({ ready: false, gsap: null, ScrollTrigger: null, lenis: null });
  const lenisRef = useRef(null);

  useEffect(() => {
    if (flags.reduce) return undefined;
    let cancelled = false;
    let tick = null;
    let gsapRef = null;
    const onLoad = () => libs.ScrollTrigger?.refresh();

    const load = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      gsapRef = gsap;
      lenisRef.current = lenis;
      document.documentElement.classList.add("js-anim");
      setLibs({ ready: true, gsap, ScrollTrigger, lenis });
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    };

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    idle(load);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      if (gsapRef && tick) gsapRef.ticker.remove(tick);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("js-anim");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (target, opts = {}) => {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -10, ...opts });
    else el.scrollIntoView({ behavior: flags.reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <MotionCtx.Provider value={{ ...libs, ...flags, scrollTo }}>
      {children}
    </MotionCtx.Provider>
  );
}

export function useMotion() {
  return useContext(MotionCtx);
}

// Runs `fn({ gsap, ScrollTrigger, reduce, fine, wide })` inside a gsap.context
// scoped to `scopeRef` once the libs are ready. Reverts on unmount / deps change.
export function useAnim(scopeRef, fn, deps = []) {
  const m = useMotion();
  useEffect(() => {
    if (!m.ready || m.reduce || !scopeRef.current) return undefined;
    const ctx = m.gsap.context(() => fn(m), scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m.ready, ...deps]);
}
