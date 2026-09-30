import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { content } from '../content';
import { Section, SectionTitle } from './Section';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 45%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="timeline">
      <SectionTitle>{content.timeline.title}</SectionTitle>

      <div ref={containerRef} className="relative w-full max-w-sm px-4 pl-12 sm:pl-16">
        {/* Background Track */}
        <div className="absolute top-3 bottom-3 left-[22px] sm:left-[30px] w-[2px] bg-white/20 rounded-full" />

        {/* Illuminated Glowing Scroll-driven Path */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-3 left-[22px] sm:left-[30px] w-[2px] bg-gradient-to-b from-blush via-rosegold to-white shadow-[0_0_16px_3px_rgba(251,164,184,0.85)] rounded-full"
        />

        {/* Milestone Star Items */}
        {content.timeline.stars.map((item, idx) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="relative mb-14 last:mb-0"
          >
            {/* Glowing Star Icon */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: idx * 0.4,
              }}
              className="absolute top-0 -left-[38px] sm:-left-[46px] flex items-center justify-center size-8 rounded-full bg-[#140510] border border-blush/60 text-blush text-base shadow-lg"
              style={{ filter: 'drop-shadow(0 0 10px rgba(251,164,184,0.85))' }}
            >
              ✦
            </motion.div>

            {/* Glass Card */}
            <div className="glass-card rounded-2xl p-4 transition-all duration-300 hover:border-blush/70 shadow-lg">
              <p className="font-body text-xs tracking-wider text-blush font-semibold uppercase">
                {item.date}
              </p>
              <p className="mt-1 font-display text-2xl text-white font-semibold tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {item.label}
              </p>
              {item.sub && (
                <p className="mt-1 font-body text-xs text-[#f7c5cc]/90 font-normal">
                  {item.sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
