import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BLUE, VIOLET, dotTexture } from "./common.js";

const PAD = 80; // room around the text for particles to scatter into
const REPEL = 80; // pointer radius in px

// Rasterise the text with the element's own font and turn lit pixels into
// particle targets, in pixel units centred on the canvas.
function sample(el, gap) {
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const w = Math.ceil(r.width + PAD * 2);
  const h = Math.ceil(r.height + PAD * 2);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  if ("letterSpacing" in g) g.letterSpacing = cs.letterSpacing;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#fff";
  g.fillText(el.textContent, w / 2, h / 2 + parseFloat(cs.fontSize) * 0.04);
  const data = g.getImageData(0, 0, w, h).data;
  const pts = [];
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 140) pts.push([x - w / 2, h / 2 - y]);
    }
  }
  return { pts, w, h, gap };
}

function Particles({ targets, width, active, box, gap }) {
  const geo = useRef();
  const n = targets.length;
  const { pos, tgt, col } = useMemo(() => {
    const pos = new Float32Array(n * 3);
    const tgt = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const white = new THREE.Color("#ffffff");
    const c = new THREE.Color();
    targets.forEach(([x, y], i) => {
      tgt[i * 3] = x;
      tgt[i * 3 + 1] = y;
      // Start scattered around the text.
      pos[i * 3] = (Math.random() - 0.5) * width * 1.4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 420;
      pos[i * 3 + 2] = 0;
      // Same white → blue → violet sweep as the site's gradient headings.
      const f = (x + width / 2) / width;
      if (f < 0.5) c.copy(white).lerp(BLUE, f * 2);
      else c.copy(BLUE).lerp(VIOLET, (f - 0.5) * 2);
      c.toArray(col, i * 3);
    });
    return { pos, tgt, col };
  }, [targets, width, n]);

  const mouse = useRef({ x: 9999, y: 9999 });
  useEffect(() => {
    const onMove = (e) => {
      const r = box.current.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left - r.width / 2;
      mouse.current.y = r.height / 2 - (e.clientY - r.top);
    };
    const onLeave = () => (mouse.current = { x: 9999, y: 9999 });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [box]);

  const time = useRef(0);
  useFrame((_, dt) => {
    if (!active) return;
    time.current += Math.min(dt, 0.05);
    const t = time.current;
    const { x: mx, y: my } = mouse.current;
    for (let i = 0; i < n; i++) {
      const k = i * 3;
      let tx = tgt[k] + Math.sin(t * 1.3 + i) * 0.6;
      let ty = tgt[k + 1] + Math.cos(t * 1.1 + i * 0.7) * 0.6;
      const dx = pos[k] - mx;
      const dy = pos[k + 1] - my;
      const d = Math.hypot(dx, dy);
      if (d < REPEL) {
        const push = (REPEL - d) * 0.9;
        tx += (dx / (d || 1)) * push;
        ty += (dy / (d || 1)) * push;
      }
      pos[k] += (tx - pos[k]) * 0.075;
      pos[k + 1] += (ty - pos[k + 1]) * 0.075;
    }
    geo.current.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" count={n} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={n} array={col} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={gap * 1.3}
        sizeAttenuation={false}
        map={dotTexture()}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Draws `el`'s text as particles laid exactly over it. Calls `onReady` once the
 * particles exist so the caller can hide the real (still accessible) text.
 */
export default function ParticleText({ el, active, onReady }) {
  const box = useRef(null);
  const [shape, setShape] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const build = () =>
      document.fonts.ready.then(() => {
        if (cancelled || !el) return;
        const small = window.innerWidth < 768;
        let gap = small ? 3 : 4;
        let s = sample(el, gap);
        while (s.pts.length > 5000) s = sample(el, ++gap);
        setShape(s);
      });
    build();
    window.addEventListener("resize", build);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", build);
    };
  }, [el]);

  if (!shape) return null;
  return (
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: shape.w, height: shape.h }}
    >
      <Canvas
        orthographic
        frameloop={active ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ zoom: 1, position: [0, 0, 100] }}
        gl={{ antialias: false, alpha: true }}
        onCreated={onReady}
      >
        <Particles targets={shape.pts} width={shape.w} active={active} box={box} gap={shape.gap} />
      </Canvas>
    </div>
  );
}
