import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';
import { content } from '../content';
import { Section, SectionTitle, FadeIn } from './Section';
import { LazyImage } from './LazyImage';
import { usePhotoModal } from './PhotoModal';

export const FirstMessage: React.FC = () => {
  const data = content.firstMessageSection;
  const { openPhoto } = usePhotoModal();

  const handlePhotoClick = () => {
    openPhoto({
      src: data.image,
      alt: 'Where it all began — 12:38 AM',
      title: 'Where it all began',
      caption: data.caption,
      badge: data.timestamp,
    });
  };

  return (
    <Section id="first-message">
      <SectionTitle>{data.title}</SectionTitle>

      <div className="mt-4 grid w-full max-w-4xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
        {/* Left Column: Tilting Glass Card with Screenshot */}
        <motion.div
          initial={{ opacity: 0, rotateX: 16, rotateZ: -3, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, rotateZ: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div
            onClick={handlePhotoClick}
            className="glass-card relative w-full max-w-sm overflow-hidden rounded-3xl p-3.5 shadow-[0_15px_50px_rgba(0,0,0,0.9)] border border-blush/40 hover:border-blush/80 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black/50">
              <LazyImage
                name={data.image}
                alt="Our first message at 12:38 AM"
                modalTitle="Where it all began — 12:38 AM"
                modalCaption={data.caption}
                modalBadge={data.timestamp}
                className="h-80 sm:h-96 w-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140510]/85 via-transparent to-transparent" />
            </div>

            {/* Glowing Timestamp Badge */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-blush text-sm drop-shadow-[0_0_8px_rgba(251,164,184,0.8)]">✨</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blush/50 bg-[#140510]/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-blush shadow-md">
                <Clock className="size-3 text-blush" />
                {data.timestamp}
              </span>
              <span className="text-blush text-sm drop-shadow-[0_0_8px_rgba(251,164,184,0.8)]">✨</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Story Text Card */}
        <FadeIn delay={0.2} className="flex flex-col justify-center">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blush/40 shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blush/50 bg-blush/15 px-3.5 py-1 text-xs font-semibold text-blush shadow-sm">
              <Sparkles className="size-3.5 text-blush animate-pulse" />
              <span>The First Spark</span>
            </div>

            <p className="font-body text-sm sm:text-base leading-relaxed text-white font-normal whitespace-pre-line drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              {data.caption}
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
