import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';

// Elegant Minimalist SVG Tulip Component
interface TulipProps {
  className?: string;
  delay?: number;
  scale?: number;
  rotate?: number;
  swayDuration?: number;
  opacity?: number;
}

const TulipIllustration: React.FC<TulipProps> = ({
  className = '',
  delay = 0,
  scale = 1,
  rotate = 0,
  swayDuration = 7,
  opacity = 0.35,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity, y: 0 }}
      transition={{ duration: 1.8, delay, ease: 'easeOut' }}
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: 'bottom center' }}
    >
      <motion.svg
        viewBox="0 0 120 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        animate={{
          rotate: [rotate - 2, rotate + 2.5, rotate - 2],
          y: [0, -4, 0],
        }}
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
        style={{
          transform: `scale(${scale})`,
          filter: 'drop-shadow(0 0 16px rgba(251, 164, 184, 0.25))',
        }}
      >
        <defs>
          {/* Petal Gradients */}
          <linearGradient id="tulipGradientPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fba4b8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#f0b5a6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="tulipGradientRose" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e5a9a9" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#fba4b8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fff0f3" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0b5a6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#fba4b8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f0b5a6" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fba4b8" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Delicate Curving Stem */}
        <path
          d="M60 320 C 58 240, 64 160, 60 90"
          stroke="url(#stemGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Left Leaf */}
        <path
          d="M59 230 C 30 195, 18 140, 15 85 C 38 120, 52 165, 59 195 Z"
          fill="url(#leafGradient)"
          stroke="rgba(251, 164, 184, 0.35)"
          strokeWidth="1"
        />

        {/* Right Leaf */}
        <path
          d="M61 200 C 85 165, 102 115, 108 65 C 92 105, 78 145, 61 170 Z"
          fill="url(#leafGradient)"
          stroke="rgba(251, 164, 184, 0.35)"
          strokeWidth="1"
        />

        {/* Back Petal Layer */}
        <path
          d="M60 90 C 45 65, 45 25, 60 10 C 75 25, 75 65, 60 90 Z"
          fill="url(#tulipGradientRose)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.2"
        />

        {/* Left Petal */}
        <path
          d="M58 90 C 38 70, 32 35, 48 18 C 50 42, 54 68, 58 90 Z"
          fill="url(#tulipGradientPink)"
          stroke="rgba(251, 164, 184, 0.5)"
          strokeWidth="1.2"
        />

        {/* Right Petal */}
        <path
          d="M62 90 C 82 70, 88 35, 72 18 C 70 42, 66 68, 62 90 Z"
          fill="url(#tulipGradientPink)"
          stroke="rgba(251, 164, 184, 0.5)"
          strokeWidth="1.2"
        />

        {/* Center Petal Overlay with Gentle Highlight */}
        <path
          d="M60 88 C 50 68, 50 32, 60 18 C 70 32, 70 68, 60 88 Z"
          fill="url(#tulipGradientRose)"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.4"
        />

        {/* Tiny soft luminous sparkle in bloom center */}
        <circle cx="60" cy="45" r="2.5" fill="#ffffff" opacity="0.75" />
      </motion.svg>
    </motion.div>
  );
};

// Floating petal drifting animation
const FloatingPetal: React.FC<{
  x: string;
  y: string;
  delay: number;
  duration: number;
  scale?: number;
  rotate?: number;
}> = ({ x, y, delay, duration, scale = 1, rotate = 0 }) => (
  <motion.div
    className="pointer-events-none absolute select-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.45, 0.2, 0.5, 0],
      y: [0, -35, -70],
      x: [0, 15, -10],
      rotate: [rotate, rotate + 45, rotate - 30],
      scale: [scale * 0.8, scale * 1.1, scale * 0.9],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="overflow-visible">
      <path
        d="M12 30 C 4 22, 2 10, 12 2 C 22 10, 20 22, 12 30 Z"
        fill="url(#tulipGradientPink)"
        stroke="rgba(251, 164, 184, 0.4)"
        strokeWidth="1"
      />
    </svg>
  </motion.div>
);

interface HeroProps {
  onBegin: () => void;
  started: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onBegin, started }) => {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Soft Ambient Radial Backdrop Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-[480px] w-[480px] sm:h-[620px] sm:w-[620px] rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.18)_0%,rgba(240,181,166,0.08)_45%,transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Aesthetic Minimalist Background Tulip Flora (Left Cluster) */}
      <div className="pointer-events-none absolute bottom-0 left-[-20px] sm:left-6 md:left-12 lg:left-20 flex items-end gap-[-30px] opacity-75 sm:opacity-90 -z-10">
        {/* Main Tall Tulip */}
        <TulipIllustration
          className="h-64 sm:h-80 md:h-96 w-28 sm:w-36 -rotate-6"
          delay={0.3}
          swayDuration={6.8}
          opacity={0.4}
        />
        {/* Secondary Gentle Bloom */}
        <TulipIllustration
          className="h-52 sm:h-64 md:h-76 w-24 sm:w-32 rotate-12 -ml-12 sm:-ml-16 mb-2"
          delay={0.7}
          swayDuration={8.2}
          opacity={0.3}
        />
        {/* Subtle Small Bud */}
        <TulipIllustration
          className="hidden sm:block h-40 md:h-52 w-20 -rotate-15 -ml-8 mb-6"
          delay={1.1}
          swayDuration={7.4}
          opacity={0.22}
        />
      </div>

      {/* Aesthetic Minimalist Background Tulip Flora (Right Cluster) */}
      <div className="pointer-events-none absolute bottom-0 right-[-20px] sm:right-6 md:right-12 lg:right-20 flex items-end gap-[-30px] opacity-75 sm:opacity-90 -z-10">
        {/* Subtle Small Bud */}
        <TulipIllustration
          className="hidden sm:block h-44 md:h-56 w-20 rotate-15 -mr-8 mb-4"
          delay={0.9}
          swayDuration={7.8}
          opacity={0.22}
        />
        {/* Secondary Gentle Bloom */}
        <TulipIllustration
          className="h-52 sm:h-68 md:h-80 w-24 sm:w-32 -rotate-12 -mr-12 sm:-mr-16 mb-2"
          delay={0.5}
          swayDuration={8.5}
          opacity={0.32}
        />
        {/* Main Tall Tulip */}
        <TulipIllustration
          className="h-64 sm:h-84 md:h-96 w-28 sm:w-36 rotate-6"
          delay={0.2}
          swayDuration={6.5}
          opacity={0.42}
        />
      </div>

      {/* Drifting Floating Petals */}
      <FloatingPetal x="18%" y="30%" delay={0.5} duration={9} scale={0.9} rotate={-15} />
      <FloatingPetal x="82%" y="26%" delay={2.5} duration={11} scale={1.1} rotate={25} />
      <FloatingPetal x="28%" y="65%" delay={4.2} duration={8.5} scale={0.75} rotate={40} />
      <FloatingPetal x="72%" y="62%" delay={1.8} duration={10} scale={0.85} rotate={-30} />

      {/* Opening romantic line */}
      <motion.div
        initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="relative z-10 max-w-lg"
      >
        <span className="inline-block mb-3 text-2xl sm:text-3xl animate-bounce" style={{ animationDuration: '3s' }}>
          🌷
        </span>
        <p className="text-glow font-script text-4xl sm:text-5xl md:text-6xl leading-snug text-blush">
          {content.opening.line}
        </p>
      </motion.div>

      {/* Tap to begin button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: started ? 0 : 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        onClick={onBegin}
        disabled={started}
        className="glass-card relative z-10 mt-12 rounded-full px-8 py-3.5 font-body text-sm tracking-[0.2em] text-cream uppercase font-semibold transition-all duration-300 hover:scale-105 active:scale-95 border-blush/40 hover:border-blush shadow-[0_0_25px_rgba(251,164,184,0.35)] cursor-pointer disabled:pointer-events-none bg-gradient-to-r from-blush/15 via-rosegold/15 to-blush/15"
      >
        {content.opening.button}
      </motion.button>

      {/* Scroll Down Cue */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: started ? 1 : 0,
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1 },
        }}
        className="absolute bottom-10 flex flex-col items-center gap-1.5 font-body text-xs tracking-[0.3em] text-rosegold/70 uppercase z-10"
      >
        <span>scroll down</span>
        <span className="text-sm animate-bounce">↓</span>
      </motion.div>
    </section>
  );
};
