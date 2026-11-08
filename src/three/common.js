import * as THREE from "three";
import { palette } from "../theme.js";

// Scene colours come from the site palette (src/theme.js).
export const ACCENT = new THREE.Color(palette.accent);
export const ACCENT_HOVER = new THREE.Color(palette.accentHover);

// Soft round sprite used by every point cloud. It is a white alpha mask that
// the materials tint, so its white is not a palette colour.
let dot;
export function dotTexture() {
  if (dot) return dot;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  dot = new THREE.CanvasTexture(c);
  return dot;
}

// Shared pointer position in -1..1, tracked on window so scenes can sit behind
// content with pointer-events disabled.
export const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
