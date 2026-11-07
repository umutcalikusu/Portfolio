import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BLUE, VIOLET, SKY, rng, dotTexture, pointer } from "./common.js";
import { isTouch } from "./gate.js";

// A slowly turning network of nodes; light packets travel along its links,
// like transactions and telecom traffic moving through a system.
function buildNetwork(count) {
  const rand = rng(42);
  const nodes = [];
  while (nodes.length < count) {
    const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (v.lengthSq() > 1) continue;
    nodes.push(v.multiply(new THREE.Vector3(3.6, 2.3, 1.8)));
  }
  const edges = [];
  const neighbours = nodes.map(() => []);
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => [j, a.distanceTo(b)])
      .filter(([j, d]) => j !== i && d < 1.45)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 3)
      .forEach(([j]) => {
        if (i < j || !neighbours[j].includes(i)) {
          edges.push([i, j]);
          neighbours[i].push(j);
          neighbours[j].push(i);
        }
      });
  });
  return { nodes, edges, neighbours };
}

function Network({ count, packets }) {
  const group = useRef();
  const packetGeo = useRef();
  const { nodes, edges, neighbours } = useMemo(() => buildNetwork(count), [count]);

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(nodes.length * 3);
    const col = new Float32Array(nodes.length * 3);
    const rand = rng(3);
    nodes.forEach((n, i) => {
      n.toArray(pos, i * 3);
      BLUE.clone().lerp(VIOLET, rand()).toArray(col, i * 3);
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [nodes]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      nodes[a].toArray(pos, i * 6);
      nodes[b].toArray(pos, i * 6 + 3);
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [nodes, edges]);

  // Each packet walks from node to node along existing links.
  const state = useMemo(() => {
    const rand = rng(11);
    return Array.from({ length: packets }, () => {
      const from = Math.floor(rand() * nodes.length);
      const opts = neighbours[from];
      return {
        from,
        to: opts.length ? opts[Math.floor(rand() * opts.length)] : from,
        t: rand(),
        speed: 0.35 + rand() * 0.5,
      };
    });
  }, [packets, nodes, neighbours]);

  const packetPositions = useMemo(() => new Float32Array(packets * 3), [packets]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const g = group.current;
    // Slow drift plus a gentle lean toward the pointer.
    g.rotation.y += d * 0.06;
    g.rotation.x += (pointer.y * 0.22 - g.rotation.x) * 0.04;
    g.position.x += (0.9 + pointer.x * 0.25 - g.position.x) * 0.04;

    state.forEach((p, i) => {
      p.t += d * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.from = p.to;
        const opts = neighbours[p.from];
        p.to = opts.length ? opts[Math.floor(Math.random() * opts.length)] : p.from;
      }
      tmp.lerpVectors(nodes[p.from], nodes[p.to], p.t).toArray(packetPositions, i * 3);
    });
    packetGeo.current.attributes.position.needsUpdate = true;
  });

  const tex = dotTexture();
  return (
    <group ref={group} position={[0.9, 0, 0]}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial size={0.11} map={tex} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry ref={packetGeo}>
          <bufferAttribute attach="attributes-position" count={packets} array={packetPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.13} map={tex} color={SKY} transparent blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroNetwork({ active }) {
  const touch = isTouch();
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <Network count={touch ? 70 : 140} packets={touch ? 18 : 42} />
    </Canvas>
  );
}
