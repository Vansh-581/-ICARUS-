'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WingTrailsProps {
  scrollProgress?: number;
}

const TRAIL_POINTS = 24; // points along the ribbon

export default function WingTrails({ scrollProgress = 0 }: WingTrailsProps) {
  const meshLeftRef  = useRef<THREE.Mesh>(null);
  const meshRightRef = useRef<THREE.Mesh>(null);

  // History buffers for both wing tips
  const historyL = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_POINTS }, () => new THREE.Vector3(-1.8, 0, 0))
  );
  const historyR = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_POINTS }, () => new THREE.Vector3(1.8, 0, 0))
  );

  // Build ribbon geometry (2 × TRAIL_POINTS vertices)
  const buildGeom = () => {
    const geom = new THREE.BufferGeometry();
    const pos  = new Float32Array(TRAIL_POINTS * 2 * 3);
    const uv   = new Float32Array(TRAIL_POINTS * 2 * 2);
    const idx  = [] as number[];

    for (let i = 0; i < TRAIL_POINTS; i++) {
      const t   = i / (TRAIL_POINTS - 1);
      uv[i * 4]     = t; uv[i * 4 + 1] = 0;
      uv[i * 4 + 2] = t; uv[i * 4 + 3] = 1;
      if (i < TRAIL_POINTS - 1) {
        const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
        idx.push(a, b, c, b, d, c);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('uv',       new THREE.BufferAttribute(uv, 2));
    geom.setIndex(idx);
    return geom;
  };

  const { geomL, geomR, mat } = useMemo(() => {
    const geomL = buildGeom();
    const geomR = buildGeom();
    const mat   = new THREE.MeshBasicMaterial({
      color:       new THREE.Color(0xd4af37),
      transparent: true,
      opacity:     0.18,
      side:        THREE.DoubleSide,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });
    return { geomL, geomR, mat };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRibbon = (
    geom:    THREE.BufferGeometry,
    history: THREE.Vector3[],
    width:   number
  ) => {
    const attr  = geom.attributes.position as THREE.BufferAttribute;
    const arr   = attr.array as Float32Array;
    const up    = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3(1, 0, 0);

    for (let i = 0; i < TRAIL_POINTS; i++) {
      const p = history[i];
      const n = (i < TRAIL_POINTS - 1)
        ? new THREE.Vector3().subVectors(history[i + 1], p).normalize()
        : new THREE.Vector3().subVectors(p, history[i - 1]).normalize();

      const perp = right.clone().crossVectors(n, up).normalize().multiplyScalar(width);

      // fade width along the trail
      const fade = (1 - i / TRAIL_POINTS) * 0.5;
      const w    = perp.clone().multiplyScalar(fade);

      const top = p.clone().add(w);
      const bot = p.clone().sub(w);

      arr[i * 6]     = top.x; arr[i * 6 + 1] = top.y; arr[i * 6 + 2] = top.z;
      arr[i * 6 + 3] = bot.x; arr[i * 6 + 4] = bot.y; arr[i * 6 + 5] = bot.z;
    }
    attr.needsUpdate = true;
    geom.computeBoundingSphere();
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = scrollProgress;

    // Simulated wing tip world positions (matching character anim roughly)
    const flapAngle = Math.sin(t * (0.75 + p * 0.55) * Math.PI * 2) * (0.22 + p * 0.18);
    const charY     = p * 8 - 1.2;

    const tipLx = -1.8 - flapAngle * 0.8;
    const tipLy = charY + 0.9 + flapAngle * 1.2;
    const tipRx =  1.8 + flapAngle * 0.8;
    const tipRy = charY + 0.9 - flapAngle * 1.2;

    // Push new tip positions into history
    historyL.current.unshift(new THREE.Vector3(tipLx, tipLy, 0));
    historyL.current.pop();
    historyR.current.unshift(new THREE.Vector3(tipRx, tipRy, 0));
    historyR.current.pop();

    // Update ribbons
    updateRibbon(geomL, historyL.current, 0.18);
    updateRibbon(geomR, historyR.current, 0.18);

    // Fade trails in as scroll increases
    mat.opacity = 0.06 + p * 0.22;
  });

  return (
    <group renderOrder={1}>
      <mesh ref={meshLeftRef}  geometry={geomL} material={mat} />
      <mesh ref={meshRightRef} geometry={geomR} material={mat} />
    </group>
  );
}
