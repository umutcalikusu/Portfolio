import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { palette, rgba } from "../theme.js";

// A soft rust/honey light that drifts after the mouse. Desktop pointers only.
export default function CursorGlow() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    let x = innerWidth * 0.7;
    let y = innerHeight * 0.25;
    let tx = x;
    let ty = y;
    let frame;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      // Ease toward the pointer so the light trails behind it.
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
      frame = requestAnimationFrame(tick);
    };
    el.style.opacity = "1";
    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background:
          `radial-gradient(520px circle at var(--gx, 70%) var(--gy, 25%), ${rgba(palette.accent, 0.05)}, ${rgba(palette.honey, 0.025)} 40%, transparent 70%)`,
      }}
    />
  );
}
