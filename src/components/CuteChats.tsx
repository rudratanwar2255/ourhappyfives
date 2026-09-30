import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { Section, SectionTitle, FadeIn } from './Section';
import { LazyImage } from './LazyImage';
import { usePhotoModal } from './PhotoModal';

export const CuteChats: React.FC = () => {
  const { openPhoto } = usePhotoModal();

  const handleChatClick = (img: string, idx: number) => {
    openPhoto({
      src: img,
      alt: `Cute chat moment ${idx + 1}`,
      title: `Cute Chat Moment #${idx + 1}`,
      caption: content.chats.caption,
      badge: 'WhatsApp Memory 💬',
    });
  };

  return (
    <Section id="chats" className="!min-h-0">
      <SectionTitle>{content.chats.title}</SectionTitle>

      <div className="flex w-full max-w-md flex-col gap-8 px-2">
        {content.chats.images.map((img, idx) => (
          <motion.div
            key={img}
            initial={{ opacity: 0, x: idx % 2 ? 40 : -40, rotate: idx % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: idx % 2 ? 1.5 : -1.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => handleChatClick(img, idx)}
            className={`glass-card w-[88%] sm:w-[80%] rounded-3xl p-2.5 shadow-[0_15px_45px_rgba(0,0,0,0.9)] border border-blush/40 hover:border-blush/80 transition-all duration-300 cursor-pointer group ${
              idx % 2 ? 'self-end' : 'self-start'
            }`}
          >
            <div className="overflow-hidden rounded-2xl bg-black/40">
              <LazyImage
                name={img}
                alt={`A sweet conversation ${idx + 1}`}
                modalTitle={`Cute Chat Moment #${idx + 1}`}
                modalCaption={content.chats.caption}
                modalBadge="WhatsApp Memory 💬"
                className="h-64 sm:h-72 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <p className="mt-10 max-w-sm px-4 text-center font-display text-xl sm:text-2xl leading-relaxed text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {content.chats.caption}
        </p>
      </FadeIn>
    </Section>
  );
};
