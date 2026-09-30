import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export interface PhotoModalData {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  badge?: string;
}

interface PhotoModalContextType {
  openPhoto: (data: PhotoModalData) => void;
  closePhoto: () => void;
}

const PhotoModalContext = createContext<PhotoModalContextType>({
  openPhoto: () => {},
  closePhoto: () => {},
});

export const usePhotoModal = () => useContext(PhotoModalContext);

export const PhotoModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPhoto, setCurrentPhoto] = useState<PhotoModalData | null>(null);

  const openPhoto = useCallback((data: PhotoModalData) => {
    setCurrentPhoto(data);
  }, []);

  const closePhoto = useCallback(() => {
    setCurrentPhoto(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhoto();
    };

    if (currentPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPhoto, closePhoto]);

  const getImageSrc = (src: string) => {
    if (src.startsWith('/') || src.startsWith('http')) return src;
    return `/images/${src}`;
  };

  return (
    <PhotoModalContext.Provider value={{ openPhoto, closePhoto }}>
      {children}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#140510]/92 backdrop-blur-2xl"
            onClick={closePhoto}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col items-center overflow-hidden rounded-3xl border border-blush/40 bg-gradient-to-b from-[#240a1d]/95 to-[#140510]/95 p-3 sm:p-6 shadow-[0_0_60px_rgba(251,164,184,0.35)]"
            >
              {/* Close Button */}
              <button
                onClick={closePhoto}
                aria-label="Close photo preview"
                className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white active:scale-95 border border-blush/30 cursor-pointer"
              >
                <X className="size-5 text-rosegold" />
              </button>

              {/* Photo Display */}
              <div className="relative flex flex-1 items-center justify-center w-full max-h-[68vh] overflow-hidden rounded-2xl bg-black/40 border border-blush/25 p-1">
                <img
                  src={getImageSrc(currentPhoto.src)}
                  alt={currentPhoto.alt || 'Fullscreen memory'}
                  className="max-h-[64vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>

              {/* Caption & Metadata */}
              {(currentPhoto.title || currentPhoto.caption || currentPhoto.badge) && (
                <div className="mt-4 flex w-full flex-col items-center text-center px-3 sm:px-6">
                  {currentPhoto.badge && (
                    <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-blush/40 bg-blush/15 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blush">
                      <Sparkles className="size-3 text-blush animate-pulse" />
                      {currentPhoto.badge}
                    </div>
                  )}
                  {currentPhoto.title && (
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-cream">
                      {currentPhoto.title}
                    </h3>
                  )}
                  {currentPhoto.caption && (
                    <p className="mt-1 font-body text-sm sm:text-base leading-relaxed text-[#fff5f7]/90 max-w-2xl">
                      {currentPhoto.caption}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PhotoModalContext.Provider>
  );
};
