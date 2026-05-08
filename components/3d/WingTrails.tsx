'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WingTrailsProps {
  scrollProgressRef: React.MutableRefObject<number>;
  pointCount?: number;
  opacityScale?: number;
  updateEvery?: number;
}

export default function WingTrails({
  scrollProgressRef,
  pointCount = 24,
  opacityScale = 1,
  updateEvery = 1,
}: WingTrailsProps) {
  const frameCount = useRef(0);

  // Pre-allocate flat Float32 ring-buffers — no Vector3 per frame
  const bufL = useRef(new Float32Array(pointCount * 3));
  const bufR = useRef(new Float32Array(pointCount * 3));
  const headL = useRef(0);
  const headR = useRef(0);

  // Scratch vectors — allocated once, reused every frame
  const _p   = useRef(new THREE.Vector3());
  const _n   = useRef(new THREE.Vector3());
  const _up  = useRef(new THREE.Vector3(0, 1, 0));
  const _r   = useRef(new THREE.Vector3(1, 0, 0));
  const _top = useRef(new THREE.Vector3());
  const _bot = useRef(new THREE.Vector3());
  const _perp = useRef(new THREE.Vector3());

  const buildGeom = (points: number) => {
    const geom = new THREE.BufferGeometry();
    const pos  = new Float32Array(points * 2 * 3);
    const uv   = new Float32Array(points * 2 * 2);
    const idx: number[] = [];

    for (let i = 0; i < points; i++) {
      const t = i / (points - 1);
      uv[i * 4]     = t;  uv[i * 4 + 1] = 0;
      uv[i * 4 + 2] = t;  uv[i * 4 + 3] = 1;
      if (i < points - 1) {
        const a = i * 2;
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geom.setIndex(idx);
    return geom;
  };

  const { geomL, geomR, mat } = useMemo(() => {
    // Initialise history buffers with safe default positions
    for (let i = 0; i < pointCount; i++) {
      bufL.current[i * 3]     = -1.8; bufL.current[i * 3 + 1] = 0; bufL.current[i * 3 + 2] = 0;
      bufR.current[i * 3]     =  1.8; bufR.current[i * 3 + 1] = 0; bufR.current[i * 3 + 2] = 0;
    }
    return { geomL: buildGeom(pointCount), geomR: buildGeom(pointCount), mat: new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4af37),
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointCount]);

  const updateRibbon = (
    geom: THREE.BufferGeometry,
    buf: Float32Array,
    head: number,
    width: number,
  ) => {
    const attr = geom.attributes.position as THREE.BufferAttribute;
    const arr  = attr.array as Float32Array;

    for (let i = 0; i < pointCount; i++) {
      // Read from ring buffer (oldest = head, newest = head-1)
      const ri = (head + i) % pointCount;
      _p.current.set(buf[ri * 3], buf[ri * 3 + 1], buf[ri * 3 + 2]);

      const riNext = (head + i + 1) % pointCount;
      if (i < pointCount - 1) {
        _n.current.set(
          buf[riNext * 3] - _p.current.x,
          buf[riNext * 3 + 1] - _p.current.y,
          buf[riNext * 3 + 2] - _p.current.z,
        ).normalize();
      }

      const fade = (1 - i / pointCount) * 0.5;
      _perp.current.crossVectors(_n.current, _up.current).normalize().multiplyScalar(width * fade);

      _top.current.copy(_p.current).add(_perp.current);
      _bot.current.copy(_p.current).sub(_perp.current);

      arr[i * 6]     = _top.current.x; arr[i * 6 + 1] = _top.current.y; arr[i * 6 + 2] = _top.current.z;
      arr[i * 6 + 3] = _bot.current.x; arr[i * 6 + 4] = _bot.current.y; arr[i * 6 + 5] = _bot.current.z;
    }

    attr.needsUpdate = true;
  };

  useFrame((state) => {
    frameCount.current++;
    if (updateEvery > 1 && frameCount.current % updateEvery !== 0) return;

    const t = state.clock.elapsedTime;
    const p = scrollProgressRef.current;

    const flapAngle = Math.sin(t * (0.75 + p * 0.55) * Math.PI * 2) * (0.22 + p * 0.18);
    const charY     = p * 8 - 1.2;

    // Write new tip into ring buffer (no push/shift allocations)
    headL.current = (headL.current + pointCount - 1) % pointCount;
    bufL.current[headL.current * 3]     = -1.8 - flapAngle * 0.8;
    bufL.current[headL.current * 3 + 1] = charY + 0.9 + flapAngle * 1.2;
    bufL.current[headL.current * 3 + 2] = 0;

    headR.current = (headR.current + pointCount - 1) % pointCount;
    bufR.current[headR.current * 3]     = 1.8 + flapAngle * 0.8;
    bufR.current[headR.current * 3 + 1] = charY + 0.9 - flapAngle * 1.2;
    bufR.current[headR.current * 3 + 2] = 0;

    updateRibbon(geomL, bufL.current, headL.current, 0.18);
    updateRibbon(geomR, bufR.current, headR.current, 0.18);

    mat.opacity = (0.06 + p * 0.22) * opacityScale;
  });

  return (
    <group renderOrder={1}>
      <mesh geometry={geomL} material={mat} />
      <mesh geometry={geomR} material={mat} />
    </group>
  );
}
