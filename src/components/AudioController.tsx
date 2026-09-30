import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

export interface AudioControllerHandle {
  play: () => void;
  toggleMute: () => boolean;
  isMuted: boolean;
}

interface AudioControllerProps {
  src: string;
}

export const AudioController = forwardRef<AudioControllerHandle, AudioControllerProps>(
  ({ src }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const hasSynthesizerStarted = useRef(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);

    // Fallback Web Audio harmonic chords generator if mp3 playback is blocked or fails
    const startFallbackChords = () => {
      if (hasSynthesizerStarted.current) return;
      hasSynthesizerStarted.current = true;
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Warm romantic chords progression
        const chordProgressions = [
          [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
          [220.0, 261.63, 329.63, 392.0, 493.88],  // Am9
          [174.61, 220.0, 261.63, 329.63, 392.0],  // Fmaj7
          [196.0, 246.94, 293.66, 392.0, 440.0],   // G9
        ];

        let chordIdx = 0;
        let noteIdx = 0;

        const playTone = (freq: number) => {
          if (ctx.state === 'suspended') ctx.resume();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 3);
        };

        intervalRef.current = window.setInterval(() => {
          const chord = chordProgressions[chordIdx];
          const freq = chord[noteIdx % chord.length];
          playTone(freq);
          noteIdx++;
          if (noteIdx % 4 === 0) {
            chordIdx = (chordIdx + 1) % chordProgressions.length;
          }
        }, 750);
      } catch (err) {
        console.warn('Fallback synthesizer unavailable:', err);
      }
    };

    const play = () => {
      const el = audioRef.current;
      if (el) {
        el.volume = 0.45;
        el.play()
          .then(() => {})
          .catch(() => {
            startFallbackChords();
          });
      } else {
        startFallbackChords();
      }
    };

    const toggleMute = () => {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
      }
      if (audioCtxRef.current) {
        if (nextMuted) {
          audioCtxRef.current.suspend();
        } else {
          audioCtxRef.current.resume();
        }
      }
      return nextMuted;
    };

    useImperativeHandle(ref, () => ({
      play,
      toggleMute,
      isMuted,
    }));

    useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (audioCtxRef.current) audioCtxRef.current.close();
      };
    }, []);

    return <audio ref={audioRef} src={src} loop preload="none" />;
  }
);

AudioController.displayName = 'AudioController';
