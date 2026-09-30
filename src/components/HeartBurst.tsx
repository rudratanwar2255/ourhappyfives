import React from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['💖', '💕', '✨', '💗', '🌸', '💘', '🌹', '💌', '💋', '🫶🏻', '🧿', '♾️'];

export const HeartBurst: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }).map((_, idx) => (
        <motion.span
          key={idx}
          className="absolute text-2xl sm:text-3xl"
          initial={{
            x: '50vw',
            y: '75vh',
            opacity: 1,
            scale: 0.3,
          }}
          animate={{
            x: `${10 + Math.random() * 80}vw`,
            y: `${-10 + Math.random() * 45}vh`,
            opacity: [1, 1, 0],
            scale: [0.3, 1.4, 1],
            rotate: Math.random() * 360 - 180,
          }}
          transition={{
            duration: 2.8 + Math.random() * 1.5,
            ease: 'easeOut',
          }}
        >
          {EMOJIS[idx % EMOJIS.length]}
        </motion.span>
      ))}
    </div>
  );
};
