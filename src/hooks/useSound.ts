import { useCallback, useRef, useEffect } from 'react';

// Generate beep sounds using Web Audio API
export const useBeepSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.3) => {
    try {
      const context = getContext();
      
      // Resume context if suspended (browser autoplay policy)
      if (context.state === 'suspended') {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);

      // Fade out to prevent clicking
      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  }, [getContext]);

  const playCountdownBeep = useCallback((secondsLeft: number) => {
    if (secondsLeft <= 10 && secondsLeft > 0) {
      // Higher pitch and louder as we get closer to 0
      const frequency = secondsLeft <= 3 ? 880 : secondsLeft <= 5 ? 660 : 440;
      const volume = secondsLeft <= 3 ? 0.5 : secondsLeft <= 5 ? 0.4 : 0.3;
      playBeep(frequency, 0.15, volume);
    }
  }, [playBeep]);

  const playFinishSound = useCallback(() => {
    // Play a nice finish melody
    const context = getContext();
    
    if (context.state === 'suspended') {
      context.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playBeep(freq, 0.3, 0.4), i * 100);
    });
  }, [getContext, playBeep]);

  const playClickSound = useCallback(() => {
    playBeep(600, 0.05, 0.15);
  }, [playBeep]);

  const playSuccessSound = useCallback(() => {
    playBeep(880, 0.1, 0.2);
    setTimeout(() => playBeep(1100, 0.15, 0.25), 100);
  }, [playBeep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playBeep,
    playCountdownBeep,
    playFinishSound,
    playClickSound,
    playSuccessSound,
  };
};
