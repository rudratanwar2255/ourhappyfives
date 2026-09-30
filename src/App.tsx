import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from './content';
import { PhotoModalProvider } from './components/PhotoModal';
import { StarField } from './components/StarField';
import { AudioController, AudioControllerHandle } from './components/AudioController';
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { FirstMessage } from './components/FirstMessage';
import { Timeline } from './components/Timeline';
import { Journey } from './components/Journey';
import { CuteChats } from './components/CuteChats';
import { Bracelet } from './components/Bracelet';
import { Curls } from './components/Curls';
import { MonthsTogether } from './components/MonthsTogether';
import { FinalLetter } from './components/FinalLetter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<AudioControllerHandle | null>(null);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  const handleBegin = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      const nextMuted = audioRef.current.toggleMute();
      setIsMuted(nextMuted);
    }
  };

  return (
    <PhotoModalProvider>
      <main className="relative min-h-screen overflow-x-hidden text-[#fff5f7] selection:bg-blush/35 selection:text-white bg-transparent">
        {/* Persistent 3D Starfield & Floating Hearts with Visible Background Photo */}
        <StarField />

        {/* Audio Manager */}
        <AudioController ref={audioRef} src={content.music} />

        {/* Loading Screen */}
        <AnimatePresence>{isLoading && <Loader key="loader" />}</AnimatePresence>

        {/* Top-Right Floating Music Toggle */}
        {hasStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="glass-card fixed top-5 right-5 z-40 flex size-11 items-center justify-center rounded-full text-base border-blush/40 hover:border-blush shadow-lg transition-all duration-200 active:scale-95 cursor-pointer bg-gradient-to-br from-blush/20 to-rosegold/10"
          >
            {isMuted ? '🔇' : '🎵'}
          </motion.button>
        )}

        {/* Interactive Sections (placed on top of background) */}
        <div className="relative z-10">
          {/* 1. Hero / Opening */}
          <Hero onBegin={handleBegin} started={hasStarted} />

          {/* 2. Where It All Began */}
          <FirstMessage />

          {/* 3. Timeline */}
          <Timeline />

          {/* 4. Our Journey (Circular Carousel) */}
          <Journey />

          {/* 5. Cute Chats */}
          <CuteChats />

          {/* 6. The Bracelet */}
          <Bracelet />

          {/* 7. The Curls */}
          <Curls />

          {/* 8. 5 Months Together */}
          <MonthsTogether />

          {/* 9. Final Letter */}
          <FinalLetter />

          {/* Footer */}
          <footer className="py-16 text-center font-script text-2xl sm:text-3xl text-rosegold/85 tracking-wide drop-shadow-[0_2px_10px_rgba(251,164,184,0.3)]">
            for Parthi, always &amp; forever — Anup ✨🌷
          </footer>
        </div>
      </main>
    </PhotoModalProvider>
  );
};

export default App;
