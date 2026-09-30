import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, X } from 'lucide-react';
import { content } from '../content';
import { Section, SectionTitle } from './Section';
import { HeartBurst } from './HeartBurst';
import letterBgImg from '../assets/letter-bg.jpg';

export const FinalLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBurst, setHasBurst] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    setHasBurst(true);

    try {
      // Main Center Explosion
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#fba4b8', '#f0b5a6', '#ffffff', '#ffd1dc', '#e5a9a9'],
      });

      // Side angle bursts
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#fba4b8', '#f0b5a6', '#ffffff'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#fba4b8', '#f0b5a6', '#ffffff'],
        });
      }, 300);
    } catch (err) {
      console.warn('Confetti error:', err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <Section id="letter">
      <SectionTitle>{content.letter.title}</SectionTitle>

      {/* Envelope Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-blush/45"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush/20 border border-blush/50 shadow-[0_0_30px_rgba(251,164,184,0.55)] mb-4 animate-bounce">
          <span className="text-3xl">💌</span>
        </div>

        <h3 className="font-display text-3xl font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          A Letter For Parthi
        </h3>

        <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-white/95 font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {content.letter.teaser ||
            'Every little feeling, memory, and confession from the very start to today…'}
        </p>

        {/* Click Here Button */}
        <button
          onClick={handleOpenLetter}
          className="glass-card mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-body text-sm tracking-wider text-white uppercase font-bold transition-all duration-300 hover:scale-105 active:scale-95 border-blush/70 hover:border-blush shadow-[0_0_35px_rgba(251,164,184,0.6)] cursor-pointer bg-gradient-to-r from-blush/35 via-rosegold/30 to-blush/35"
        >
          <Sparkles className="size-4 text-white animate-pulse" />
          <span>{content.letter.button}</span>
          <Heart className="size-4 text-white fill-white animate-pulse" />
        </button>
      </motion.div>

      {/* Heart Emoji Burst */}
      {hasBurst && <HeartBurst />}

      {/* Full Letter Modal with Visible Background Photo */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-2 border-blush/60 bg-[#140510] shadow-[0_0_90px_rgba(251,164,184,0.45)]"
            >
              {/* Background Photo (Vividly Visible) */}
              <div className="pointer-events-none absolute inset-0 z-0">
                <img
                  src={letterBgImg}
                  alt="Anup & Parthi"
                  className="size-full object-cover object-[center_18%] filter brightness-95 contrast-[1.05]"
                />
                {/* Translucent Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#140510]/55 via-[#200a1a]/25 to-[#140510]/65" />
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close letter"
                className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:text-white active:scale-95 border border-white/40 cursor-pointer shadow-xl"
              >
                <X className="size-5 text-blush" />
              </button>

              {/* Modal Header */}
              <div className="relative z-10 border-b border-white/20 p-5 sm:p-6 pb-4 text-center backdrop-blur-xs bg-[#140510]/35">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blush/50 bg-[#140510]/80 px-4 py-1 text-xs font-semibold tracking-wider text-blush uppercase mb-2 shadow-md">
                  <Sparkles className="size-3 text-blush" />
                  Our Complete Love Story
                  <Sparkles className="size-3 text-blush" />
                </span>
                <h2 className="font-script text-4xl sm:text-5xl text-blush text-glow drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  PARTHI ♡
                </h2>
              </div>

              {/* Letter Scrollable Body (Translucent so photo shines through) */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-thumb-blush/70 scrollbar-track-transparent">
                <div className="rounded-2xl bg-black/40 backdrop-blur-xs p-5 sm:p-7 border border-white/20 shadow-2xl space-y-4 font-body text-sm sm:text-base leading-relaxed text-white font-normal whitespace-pre-line text-left drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  {content.letter.body}
                </div>

                {/* Finale Banner in Modal */}
                <div className="mt-6 pt-4 pb-3 text-center">
                  <div className="inline-block rounded-full bg-[#140510]/85 backdrop-blur-md px-6 py-2.5 border border-blush/50 shadow-xl">
                    <p className="font-script text-3xl sm:text-4xl text-blush text-glow drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {content.letter.finale}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finale text below envelope */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-glow mt-10 max-w-sm px-4 text-center font-script text-3xl sm:text-4xl text-blush drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
      >
        {content.letter.finale}
      </motion.p>
    </Section>
  );
};
