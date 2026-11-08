import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ACCENT, pointer } from "./common.js";

// Screenshots stand on an arc; the active one turns to face the visitor.
const RADIUS = 9;
const STEP = 0.5; // radians between neighbouring panels
const W = 4.2;
const H = W / 1.6;

function coverTop(tex) {
  // Emulate CSS object-fit: cover; object-position: top on a 16:10 panel.
  const img = tex.image;
  if (!img) return tex;
  const imgAspect = img.width / img.height;
  const planeAspect = W / H;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1);
    tex.offset.set((1 - tex.repeat.x) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / planeAspect);
    tex.offset.set(0, 1 - tex.repeat.y);
  }
  return tex;
}

function Panel({ tex, index, count, rotation, onSelect, dragging }) {
  const holder = useRef();
  const slot = useRef(index);
  const mesh = useRef();
  const edge = useRef();
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(W, H)), []);

  useFrame(() => {
    // Endless loop: each panel takes whichever copy of its place on the ring
    // (index, index ± count, …) is closest to the front, so after the last
    // project the first one is already waiting next to it.
    const ring = count * STEP;
    const k = Math.round((rotation.current - index * STEP) / ring);
    slot.current = index + k * count;
    const angle = slot.current * STEP;
    holder.current.position.set(Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS);
    holder.current.rotation.y = angle;

    // How far this panel is from the front, in steps.
    const dist = Math.abs(angle - rotation.current) / STEP;
    const focus = Math.max(0, 1 - dist);
    const s = 0.86 + focus * 0.2;
    mesh.current.scale.setScalar(s);
    edge.current.scale.setScalar(s);
    mesh.current.material.opacity = 0.35 + focus * 0.65;
    edge.current.material.opacity = 0.12 + focus * 0.75;
  });

  return (
    <group ref={holder}>
      <mesh
        ref={mesh}
        onClick={(e) => {
          e.stopPropagation();
          if (!dragging.current) onSelect(slot.current);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <lineSegments ref={edge} geometry={edges} position={[0, 0, 0.001]}>
        <lineBasicMaterial color={ACCENT} transparent />
      </lineSegments>
    </group>
  );
}

function Arc({ images, active, onSelect, drag, dragging }) {
  const group = useRef();
  const rotation = useRef(active * STEP);
  const { camera } = useThree();
  const textures = useLoader(THREE.TextureLoader, images);
  useMemo(() => textures.forEach(coverTop), [textures]);

  useFrame((_, dt) => {
    const target = active * STEP + drag.current;
    rotation.current += (target - rotation.current) * Math.min(1, dt * 6);
    group.current.rotation.y = -rotation.current;
    // A little parallax from the pointer.
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -1);
  });

  // The arc turns around its own centre, which sits RADIUS behind the front panel.
  return (
    <group ref={group} position={[0, 0, -RADIUS]}>
      {textures.map((tex, i) => (
        <Panel key={i} tex={tex} index={i} count={textures.length} rotation={rotation} onSelect={onSelect} dragging={dragging} />
      ))}
    </group>
  );
}

// `active` is an unbounded slot number: 6 is the first project again, -1 the
// last, so the ring keeps turning the same way instead of rewinding.
export default function ProjectGallery({ images, active, onSelect, active3d }) {
  const drag = useRef(0);
  const dragging = useRef(false);
  const start = useRef(null);
  const box = useRef(null);

  const down = (e) => {
    start.current = e.clientX;
    dragging.current = false;
  };
  const move = (e) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    if (Math.abs(dx) > 6) dragging.current = true;
    drag.current = -(dx / box.current.clientWidth) * 2.4;
  };
  const up = () => {
    if (start.current === null) return;
    const next = Math.round((active * STEP + drag.current) / STEP);
    drag.current = 0;
    start.current = null;
    onSelect(next);
    // Let the click handler see that this was a drag, then reset.
    setTimeout(() => (dragging.current = false), 0);
  };

  return (
    <div
      ref={box}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    >
      <Canvas
        frameloop={active3d ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Arc images={images} active={active} onSelect={onSelect} drag={drag} dragging={dragging} />
        </Suspense>
      </Canvas>
    </div>
  );
}
