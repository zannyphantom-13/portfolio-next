'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = useTransform(scaleY, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        zIndex: 9999,
        cursor: 'pointer'
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Back to top"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle 
          cx="30" cy="30" r="26" 
          fill="rgba(15, 23, 42, 0.8)" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="4" 
        />
        {/* Animated progress stroke */}
        <motion.circle 
          cx="30" cy="30" r="26" 
          fill="none" 
          stroke="url(#gradient)" 
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'url(/icon.png) center/cover no-repeat',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
}
