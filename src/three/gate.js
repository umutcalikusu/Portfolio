import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

let webglOk;
function hasWebGL() {
  if (webglOk !== undefined) return webglOk;
  try {
    const c = document.createElement("canvas");
    webglOk = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglOk = false;
  }
  return webglOk;
}

export const isTouch = () =>
  typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches;

/**
 * Decides whether a 3D scene should exist at all (`enabled`) and whether it
 * should be animating right now (`active`, only while near the viewport).
 * Scenes stay off without WebGL or when the visitor prefers reduced motion,
 * and callers render their plain fallback instead.
 */
export function useSceneGate({ minWidth = 0, margin = "200px" } = {}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = () =>
      setEnabled(!reduce && hasWebGL() && window.innerWidth >= minWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduce, minWidth]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [margin, enabled]);

  return { ref, enabled, active };
}
