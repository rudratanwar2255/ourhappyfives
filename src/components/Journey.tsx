import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { content } from '../content';
import { Section, SectionTitle, FadeIn } from './Section';
import { CircularCarousel, CarouselItem } from './CircularCarousel';
import { usePhotoModal } from './PhotoModal';

export const Journey: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openPhoto } = usePhotoModal();
  const photos = content.journey.photos;

  const carouselItems: CarouselItem[] = photos.map((p) => ({
    image: p.src,
    caption: p.caption,
    alt: p.caption,
  }));

  const activePhoto = photos[activeIndex] || photos[0];

  const handleOpenPhoto = (idx = activeIndex) => {
    const p = photos[idx] || photos[0];
    openPhoto({
      src: p.src,
      alt: p.caption,
      title: `Our Journey — Moment ${idx + 1}`,
      caption: p.caption,
      badge: `Photo ${idx + 1} of ${photos.length}`,
    });
  };

  return (
    <Section id="journey">
      <SectionTitle>{content.journey.title}</SectionTitle>

      <FadeIn>
        <p className="mb-6 font-body text-sm sm:text-base text-white/90 text-center px-4 font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {content.journey.subtitle}
        </p>
      </FadeIn>

      {/* 3D Circular Carousel */}
      <div className="w-full flex justify-center items-center py-2">
        <CircularCarousel
          items={carouselItems}
          bend={0.88}
          depthFade={0.6}
          fadeColor="rgba(0, 0, 0, 0.7)"
          innerShade={0.25}
          tilt={-4}
          perspective={1300}
          radius={340}
          itemWidth={230}
          itemHeight={330}
          onFocus={(idx) => setActiveIndex(idx)}
          onItemClick={(_item, idx) => handleOpenPhoto(idx)}
          className="w-full max-w-5xl"
        />
      </div>

      {/* Active Photo Caption & Expand Indicator */}
      <div className="mt-4 min-h-20 max-w-md px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            onClick={() => handleOpenPhoto(activeIndex)}
            className="cursor-pointer group flex flex-col items-center"
          >
            <p className="font-script text-3xl sm:text-4xl text-blush text-glow group-hover:scale-105 transition-transform duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {activePhoto.caption}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 font-body text-xs tracking-wider text-blush uppercase group-hover:text-white transition-colors bg-[#140510]/85 px-4 py-1 rounded-full border border-blush/50 shadow-md">
              <Sparkles className="size-3 text-blush animate-pulse" />
              Moment {activeIndex + 1} of {photos.length} · Tap to expand
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};
