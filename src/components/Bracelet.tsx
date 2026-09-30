import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { Section, SectionTitle } from './Section';
import { LazyImage } from './LazyImage';
import { usePhotoModal } from './PhotoModal';

export const Bracelet: React.FC = () => {
  const { openPhoto } = usePhotoModal();
  const storyCombined = content.bracelet.story.join(' ');

  const handlePedestalClick = () => {
    openPhoto({
      src: content.bracelet.image,
      alt: 'The charm',
      title: 'The Charm',
      caption: storyCombined,
      badge: 'A Sweet Story 🫶🏻',
    });
  };

  return (
    <Section id="charm">
      {/* Background Spotlight Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(251,164,184,0.25)_0%,rgba(240,181,166,0.1)_45%,transparent_70%)] blur-3xl" />

      <SectionTitle>{content.bracelet.title}</SectionTitle>

      {/* Rotating Pedestal with Sparkles */}
      <div className="relative mt-2 flex flex-col items-center">
        {/* Orbiting Sparkles */}
        {Array.from({ length: 8 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="absolute text-blush text-base pointer-events-none z-20 drop-shadow-[0_0_8px_rgba(251,164,184,0.8)]"
            style={{
              left: `${50 + 44 * Math.cos((idx / 8) * Math.PI * 2)}%`,
              top: `${42 + 40 * Math.sin((idx / 8) * Math.PI * 2)}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: idx * 0.35,
              ease: 'easeInOut',
            }}
          >
            ✧
          </motion.span>
        ))}

        {/* Circular Glowing Pedestal */}
        <div
          onClick={handlePedestalClick}
          className="glass-card relative z-10 size-60 sm:size-64 overflow-hidden rounded-full p-3 border-2 border-blush/50 shadow-[0_0_45px_rgba(251,164,184,0.45)] hover:border-blush hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <LazyImage
            name={content.bracelet.image}
            alt="The charm"
            modalTitle="The Charm"
            modalCaption={storyCombined}
            modalBadge="A Sweet Story 🫶🏻"
            className="size-full rounded-full object-cover pointer-events-none"
          />
        </div>

        {/* Glowing Base Shadow */}
        <div className="mt-4 h-5 w-44 rounded-[100%] bg-gradient-to-r from-transparent via-blush/50 to-transparent blur-[2px] shadow-[0_0_25px_rgba(251,164,184,0.7)]" />
      </div>

      {/* Line-by-Line Story Cards */}
      <div className="mt-10 max-w-lg space-y-4 px-4 text-center">
        {content.bracelet.story.map((paragraph, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, delay: idx * 0.35 }}
            className={`glass-card rounded-2xl p-4 sm:p-5 border border-blush/35 shadow-xl backdrop-blur-md ${
              idx === 0
                ? 'inline-block font-script text-3xl sm:text-4xl text-blush text-glow mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                : 'font-body text-sm sm:text-base leading-relaxed text-white font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
            }`}
          >
            {idx === 0 ? `“${paragraph}”` : paragraph}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
