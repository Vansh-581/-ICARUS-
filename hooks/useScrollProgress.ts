'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a normalized scroll progress for a given element ref.
 * 0 = element's top at viewport bottom (scroll entry)
 * 1 = element's bottom at viewport top (scroll exit)
 */
export function useScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const handle = () => {
      const el    = elementRef.current!;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog  = Math.max(0, Math.min(1, -rect.top / (total || 1)));
      setProgress(prog);
    };

    window.addEventListener('scroll', handle, { passive: true });
    handle(); // initial
    return () => window.removeEventListener('scroll', handle);
  }, [elementRef]);

  return progress;
}

/**
 * Returns normalized global scroll progress (0 → 1) for entire page.
 */
export function useGlobalScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return progress;
}
