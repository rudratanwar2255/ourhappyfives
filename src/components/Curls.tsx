import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { Section, SectionTitle, FadeIn } from './Section';
import { LazyImage } from './LazyImage';
import { usePhotoModal } from './PhotoModal';

const CURL_SVG_PATH =
  'M150,20 C190,40 210,90 170,120 C130,150 90,120 80,170 C70,220 130,240 180,210 C230,180 220,130 190,160 C160,190 170,230 200,240';

export const Curls: React.FC = () => {
  const { openPhoto } = usePhotoModal();

  const handlePhotoClick = () => {
    openPhoto({
      src: content.curls.image,
      alt: "Anup's curls",
      title: 'The Curls Magic',
      caption: content.curls.text,
      badge: 'Pure Magic ✨',
    });
  };

  return (
    <Section id="curls">
      <SectionTitle>{content.curls.title}</SectionTitle>

      <div className="grid w-full max-w-3xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-2 md:gap-10">
        {/* Animated Spiral Path into Floating Hearts */}
        <div className="relative flex flex-col items-center justify-center">
          <svg viewBox="0 0 300 270" className="h-52 w-60 overflow-visible">
            <motion.path
              d={CURL_SVG_PATH}
              fill="none"
              stroke="#fb7185"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 2.8, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 0 14px rgba(251,164,184,0.9))' }}
            />
          </svg>

          {/* Floating Hearts along Path */}
          {[0, 1, 2, 3].map((idx) => (
            <motion.span
              key={idx}
              className="absolute text-2xl select-none pointer-events-none"
              style={{
                left: `${20 + idx * 20}%`,
                top: `${20 + (idx % 2) * 35}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1, y: [-4, -16, -4] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: 2.2 + idx * 0.25,
                duration: 0.9,
                y: { duration: 3, repeat: Infinity, delay: 2.6 + idx * 0.25 },
              }}
            >
              💖
            </motion.span>
          ))}
        </div>

        {/* The Magic Story Card */}
        <FadeIn delay={0.2} className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-blush/40 shadow-[0_15px_45px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <span className="inline-block rounded-full bg-blush/20 border border-blush/40 px-3.5 py-1 text-xs font-semibold text-blush mb-3 shadow-sm">
              ✨ The Magic Effect
            </span>
            <p className="font-body text-base sm:text-lg leading-relaxed text-white font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              "{content.curls.text}"
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Anup's Photo Card with Floating Sparkles */}
      <FadeIn delay={0.35}>
        <div className="relative mt-8">
          <div
            onClick={handlePhotoClick}
            className="glass-card relative z-10 rounded-3xl p-3 shadow-[0_15px_45px_rgba(0,0,0,0.9)] border border-blush/40 hover:border-blush transition-all duration-300 cursor-pointer group"
          >
            <LazyImage
              name={content.curls.image}
              alt="Anup's curls"
              modalTitle="The Curls Magic"
              modalCaption={content.curls.text}
              modalBadge="Pure Magic ✨"
              className="size-48 sm:size-56 rounded-2xl object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Corner Sparkles */}
          {[-1, 1].map((sign, idx) => (
            <motion.span
              key={idx}
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1.3, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.8 }}
              className="absolute text-blush text-xl pointer-events-none"
              style={{
                top: idx === 0 ? '-10px' : 'auto',
                bottom: idx === 1 ? '-10px' : 'auto',
                left: sign === -1 ? '-10px' : 'auto',
                right: sign === 1 ? '-10px' : 'auto',
                filter: 'drop-shadow(0 0 8px rgba(251,164,184,0.9))',
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};
