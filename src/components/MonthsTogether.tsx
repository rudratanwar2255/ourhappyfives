import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from 'lucide-react';
import { content } from '../content';
import { Section, SectionTitle, FadeIn } from './Section';
import { ParticleHeart } from './ParticleHeart';
import { usePrefersReducedMotion } from './StarField';

export const MonthsTogether: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [animatedDays, setAnimatedDays] = useState(0);

  // Animated counter for days together
  useEffect(() => {
    const totalDays = Math.max(
      0,
      Math.floor((Date.now() - new Date(content.coupleDate).getTime()) / 86400000)
    );

    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / 1500);
      const ease = 1 - Math.pow(1 - elapsed, 3);
      setAnimatedDays(Math.round(totalDays * ease));

      if (elapsed < 1) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <Section id="months">
      <SectionTitle>{content.months.title}</SectionTitle>

      {/* Radiant Glowing 3D Heart Portal & Pedestal */}
      <div className="relative flex flex-col items-center justify-center my-3">
        {/* Background Ambient Aura */}
        <div className="pointer-events-none absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.35)_0%,rgba(240,181,166,0.15)_45%,transparent_70%)] blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />

        {/* Orbiting Sparkles Around 3D Heart Portal */}
        {Array.from({ length: 8 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute text-blush text-base pointer-events-none z-20 drop-shadow-[0_0_8px_rgba(251,164,184,0.9)]"
            style={{
              left: `${50 + 46 * Math.cos((idx / 8) * Math.PI * 2)}%`,
              top: `${50 + 46 * Math.sin((idx / 8) * Math.PI * 2)}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: idx * 0.35,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.span>
        ))}

        {/* Holographic Glowing 3D Canvas Frame */}
        <div className="glass-card relative z-10 size-68 sm:size-76 overflow-hidden rounded-full p-2 border-2 border-blush/60 shadow-[0_0_60px_rgba(251,164,184,0.65)] bg-gradient-to-b from-[#240a1d]/95 via-[#180614]/95 to-[#140510]/95 flex items-center justify-center">
          <div className="size-full">
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 3.2], fov: 48 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.7} />
              <ParticleHeart reduced={reduced} />
            </Canvas>
          </div>
        </div>

        {/* Glowing Base Platform Reflection */}
        <div className="mt-3 h-4 w-44 rounded-[100%] bg-gradient-to-r from-transparent via-blush/60 to-transparent blur-[2px] shadow-[0_0_25px_rgba(251,164,184,0.8)]" />
      </div>

      {/* Animated Days Milestone Summary */}
      <FadeIn delay={0.15}>
        <div className="mt-6 glass-card rounded-full px-8 py-3 border border-blush/40 shadow-xl bg-[#1c0817]/90 text-center inline-flex items-center gap-2">
          <Sparkles className="size-4 text-blush animate-pulse" />
          <p className="font-display text-xl sm:text-2xl text-white font-bold tracking-wide">
            <span className="gold-text">{content.milestoneLabel}</span> •{' '}
            <span className="gold-text tabular-nums">{animatedDays}</span> days •{' '}
            <span className="text-blush drop-shadow-[0_0_12px_rgba(251,164,184,0.9)]">{content.months.smiles}</span>
          </p>
          <Sparkles className="size-4 text-blush animate-pulse" />
        </div>
      </FadeIn>

      {/* Milestone Celebration Card */}
      <FadeIn delay={0.3} className="mt-8">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="glass-card rounded-3xl px-8 py-5 border border-blush/60 shadow-[0_0_55px_rgba(251,164,184,0.55)] bg-gradient-to-r from-[#240a1d]/95 via-[#1c0817]/95 to-[#240a1d]/95"
        >
          <p className="text-glow text-center font-script text-3xl sm:text-4xl text-blush drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            {content.months.celebrate}
          </p>
        </motion.div>
      </FadeIn>
    </Section>
  );
};
