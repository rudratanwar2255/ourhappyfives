import React, { useRef, useState, useEffect, useCallback } from 'react';
import { usePrefersReducedMotion } from './StarField';

export interface CarouselItem {
  image: string;
  caption?: string;
  alt?: string;
  title?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  bend?: number;
  depthFade?: number;
  fadeColor?: string;
  innerShade?: number;
  tilt?: number;
  perspective?: number;
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  onFocus?: (index: number) => void;
  onItemClick?: (item: CarouselItem, index: number) => void;
  className?: string;
}

export const CircularCarousel: React.FC<CircularCarouselProps> = ({
  items,
  bend = 0.88,
  depthFade = 0.6,
  fadeColor = '#0d0614',
  innerShade = 0.25,
  tilt = -4,
  perspective = 1300,
  radius = 340,
  itemWidth = 230,
  itemHeight = 330,
  onFocus,
  onItemClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const [currentRadius, setCurrentRadius] = useState(radius);
  const [currentItemWidth, setCurrentItemWidth] = useState(itemWidth);
  const [currentItemHeight, setCurrentItemHeight] = useState(itemHeight);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  const prefersReduced = usePrefersReducedMotion();
  const totalItems = items.length;
  const anglePerItem = (2 * Math.PI) / totalItems;

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentRadius(260);
        setCurrentItemWidth(185);
        setCurrentItemHeight(265);
      } else if (width < 1024) {
        setCurrentRadius(320);
        setCurrentItemWidth(215);
        setCurrentItemHeight(305);
      } else {
        setCurrentRadius(radius);
        setCurrentItemWidth(itemWidth);
        setCurrentItemHeight(itemHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radius, itemWidth, itemHeight]);

  const getActiveIndexFromRotation = useCallback(
    (rot: number) => {
      let norm = -rot % (2 * Math.PI);
      if (norm < 0) norm += 2 * Math.PI;
      return ((Math.round(norm / anglePerItem) % totalItems) + totalItems) % totalItems;
    },
    [anglePerItem, totalItems]
  );

  const snapToNearest = useCallback(
    (currentRot: number) => {
      let norm = -currentRot % (2 * Math.PI);
      if (norm < 0) norm += 2 * Math.PI;

      const targetNorm = -Math.round(norm / anglePerItem) * anglePerItem;
      const initial = currentRot;
      const diff = targetNorm - (currentRot % (2 * Math.PI));
      const startTime = performance.now();

      const animateSnap = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / 400);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = initial + diff * ease;

        setRotation(val);
        const idx = getActiveIndexFromRotation(val);
        setActiveIndex(idx);
        onFocus?.(idx);

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animateSnap);
        }
      };

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animateSnap);
    },
    [anglePerItem, getActiveIndexFromRotation, onFocus]
  );

  const rotateToIndex = useCallback(
    (index: number) => {
      const targetAngle = -index * anglePerItem;
      const startAngle = rotation;
      let diff = (targetAngle - startAngle) % (2 * Math.PI);
      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;

      const startTime = performance.now();

      const animateRotate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / 500);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = startAngle + diff * ease;

        setRotation(current);

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animateRotate);
        } else {
          setActiveIndex(index);
          onFocus?.(index);
        }
      };

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animateRotate);
    },
    [anglePerItem, onFocus, rotation]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rotation;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;

    if (rafId.current) cancelAnimationFrame(rafId.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const nextRotation = startRotation.current + deltaX * 0.004;
    setRotation(nextRotation);

    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastTime.current = now;

    const idx = getActiveIndexFromRotation(nextRotation);
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      onFocus?.(idx);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (Math.abs(velocity.current) > 0.25) {
      let v = velocity.current * 0.015;
      const momentumStep = () => {
        setRotation((prev) => {
          const next = prev + v;
          const idx = getActiveIndexFromRotation(next);
          setActiveIndex(idx);
          onFocus?.(idx);
          return next;
        });

        v *= 0.93;
        if (Math.abs(v) > 0.0005) {
          rafId.current = requestAnimationFrame(momentumStep);
        } else {
          snapToNearest(rotation);
        }
      };
      rafId.current = requestAnimationFrame(momentumStep);
    } else {
      snapToNearest(rotation);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const getImageSrc = (src: string) => {
    if (src.startsWith('/') || src.startsWith('http')) return src;
    return `/images/${src}`;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative select-none touch-pan-y cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        height: `${currentItemHeight + 110}px`,
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* 3D Ring Glow Base */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blush/20 shadow-[0_0_80px_rgba(251,164,184,0.15)]"
        style={{
          width: `${currentRadius * 2 + 60}px`,
          height: `${currentRadius * 2 + 60}px`,
          transform: `rotateX(${80 + tilt}deg) translateZ(-80px)`,
          transformStyle: 'preserve-3d',
        }}
      />

      {/* 3D Rotating Carousel Container */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg)`,
          width: `${currentItemWidth}px`,
          height: `${currentItemHeight}px`,
        }}
      >
        {items.map((item, idx) => {
          const angle = idx * anglePerItem + rotation;
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const x = sin * currentRadius;
          const z = (cos - 1) * currentRadius;
          const rotateY = -(angle * (180 / Math.PI)) * (prefersReduced ? 0 : bend);

          const depth = (cos + 1) / 2; // 0 (back) to 1 (front)
          const opacity = 0.25 + depth * 0.75;
          const scale = 0.82 + depth * 0.24;
          const isFocused = idx === activeIndex;

          return (
            <div
              key={idx}
              onClick={(e) => {
                // Ignore click if it was a drag
                if (Math.abs(e.clientX - startX.current) < 8) {
                  rotateToIndex(idx);
                  onItemClick?.(item, idx);
                }
              }}
              className="absolute left-0 top-0 transition-transform"
              style={{
                width: `${currentItemWidth}px`,
                height: `${currentItemHeight}px`,
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                zIndex: Math.round(depth * 100),
                opacity: Math.max(0.15, opacity),
                cursor: 'pointer',
              }}
            >
              <div
                className={`group relative size-full overflow-hidden rounded-3xl p-3 transition-all duration-300 ${
                  isFocused
                    ? 'ring-2 ring-blush shadow-[0_0_45px_rgba(251,164,184,0.55)] border border-blush/80'
                    : 'ring-1 ring-rosegold/30 border border-white/10 hover:ring-blush/60'
                } glass-card`}
              >
                <img
                  src={getImageSrc(item.image)}
                  alt={item.alt || item.caption || `Moment ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full rounded-2xl object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                />

                {/* Shading overlay based on depth */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    backgroundColor: fadeColor,
                    opacity: (1 - depth) * depthFade + innerShade * 0.4,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
