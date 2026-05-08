'use client';

/**
 * FPSLimiter — mounts inside a <Canvas frameloop="demand"> and
 * calls invalidate() on a precise interval, giving us a hard FPS
 * ceiling. On low-end: 30fps (halves GPU work). On high-end: 60fps.
 *
 * Why not just use frameloop="always"?
 * "always" lets Three.js render as fast as the GPU can handle, which
 * can be 120–240fps on a fast machine — all wasted frames. "demand"
 * only renders when we call invalidate(), so we have full control.
 */

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

interface FPSLimiterProps {
  fps: number;
}

export default function FPSLimiter({ fps }: FPSLimiterProps) {
  const { invalidate } = useThree();

  useEffect(() => {
    // setInterval gives us a stable, accurate tick with no React overhead
    const id = setInterval(() => invalidate(), 1000 / fps);
    return () => clearInterval(id);
  }, [fps, invalidate]);

  return null;
}
