"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 1000,
    damping: 40,
  });

  const springY = useSpring(mouseY, {
    stiffness: 1000,
    damping: 40,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
className="fixed top-0 left-0 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 pointer-events-none z-[9999]"      style={{
        x: springX,
        y: springY,
      }}
    />
  );
}