'use client';

import { useScroll, motion, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8B6914, #D4AF37, #FFD700, #FFF8DC)',
      }}
    />
  );
}
