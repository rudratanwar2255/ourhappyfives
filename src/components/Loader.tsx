import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import tulipBloomImg from '../assets/tulip-bloom.jpg';

export const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: [1, 1, 0],
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#140510]"
    >
      {/* Radiant Background Bloom Halo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        exit={{ scale: [0.8, 35], opacity: [0.5, 1, 0] }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.95)_0%,rgba(240,181,166,0.85)_40%,rgba(20,5,16,0.95)_75%)] blur-3xl"
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Orbital Revolving Sparkles */}
        {Array.from({ length: 8 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute text-rosegold text-base pointer-events-none z-20"
            style={{
              left: `${50 + 46 * Math.cos((idx / 8) * Math.PI * 2)}%`,
              top: `${42 + 42 * Math.sin((idx / 8) * Math.PI * 2)}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.7, 1.4, 0.7],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: idx * 0.25,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.span>
        ))}

        {/* Realistic Glowing Tulip Blossom Artwork */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [1, 1.05, 1], opacity: 1 }}
          transition={{
            scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.8 },
          }}
          className="relative mb-5 flex size-44 sm:size-52 items-center justify-center overflow-hidden rounded-full p-1.5 border-2 border-blush/60 shadow-[0_0_50px_rgba(251,164,184,0.65)] bg-gradient-to-b from-[#240a1d]/90 to-[#140510]/90 select-none"
        >
          <img
            src={tulipBloomImg}
            alt="Realistic Tulip Flower Bloom"
            className="size-full rounded-full object-cover object-[center_35%] filter brightness-105 contrast-[1.08] saturate-[1.12]"
          />

          {/* Soft inner vignette overlay for seamless blend */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_55%,rgba(20,5,16,0.75)_100%)]" />

          {/* Floating mini heart */}
          <motion.span
            className="absolute top-2 right-2 text-xl select-none"
            animate={{
              y: [-2, -8, -2],
              opacity: [0.7, 1, 0.7],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            💖
          </motion.span>
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-3xl sm:text-4xl text-blush text-glow text-center tracking-wide"
        >
          {content.loading}
        </motion.p>
      </div>
    </motion.div>
  );
};
