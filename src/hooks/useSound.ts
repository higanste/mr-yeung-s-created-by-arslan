import { useCallback, useRef, useEffect } from 'react';

// Enhanced sound effects using Web Audio API
export const useBeepSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.3, type: OscillatorType = 'sine') => {
    try {
      const context = getContext();
      
      if (context.state === 'suspended') {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);

      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  }, [getContext]);

  // Intense countdown beep - gets more dramatic as it approaches 0
  const playCountdownBeep = useCallback((secondsLeft: number) => {
    if (secondsLeft <= 10 && secondsLeft > 0) {
      const context = getContext();
      if (context.state === 'suspended') {
        context.resume();
      }

      // More intense as we get closer to 0
      if (secondsLeft <= 3) {
        // Triple beep for last 3 seconds - URGENT!
        playBeep(880, 0.08, 0.6, 'square');
        setTimeout(() => playBeep(988, 0.08, 0.6, 'square'), 100);
        setTimeout(() => playBeep(1047, 0.08, 0.6, 'square'), 200);
      } else if (secondsLeft <= 5) {
        // Double beep for 4-5 seconds - WARNING!
        playBeep(740, 0.1, 0.5, 'sawtooth');
        setTimeout(() => playBeep(880, 0.1, 0.5, 'sawtooth'), 120);
      } else {
        // Single beep for 6-10 seconds
        const frequency = 440 + (10 - secondsLeft) * 40;
        playBeep(frequency, 0.12, 0.35, 'sine');
      }
    }
  }, [getContext, playBeep]);

  // Epic finish sound - victory fanfare!
  const playFinishSound = useCallback(() => {
    const context = getContext();
    
    if (context.state === 'suspended') {
      context.resume();
    }

    // Dramatic finish sequence
    const notes = [
      { freq: 523.25, delay: 0, duration: 0.15 },    // C5
      { freq: 659.25, delay: 80, duration: 0.15 },   // E5
      { freq: 783.99, delay: 160, duration: 0.15 },  // G5
      { freq: 1046.50, delay: 240, duration: 0.3 },  // C6 (held longer)
      { freq: 987.77, delay: 400, duration: 0.15 },  // B5
      { freq: 1046.50, delay: 500, duration: 0.4 },  // C6 (finale)
    ];

    notes.forEach(({ freq, delay, duration }) => {
      setTimeout(() => playBeep(freq, duration, 0.4, 'sine'), delay);
    });

    // Add a deeper bass note for impact
    setTimeout(() => playBeep(130.81, 0.5, 0.3, 'triangle'), 240); // C3
  }, [getContext, playBeep]);

  // Click sound - satisfying feedback
  const playClickSound = useCallback(() => {
    playBeep(800, 0.03, 0.15, 'sine');
    setTimeout(() => playBeep(600, 0.02, 0.1, 'sine'), 30);
  }, [playBeep]);

  // Success sound - positive feedback
  const playSuccessSound = useCallback(() => {
    playBeep(523, 0.08, 0.25, 'sine');
    setTimeout(() => playBeep(659, 0.08, 0.25, 'sine'), 80);
    setTimeout(() => playBeep(784, 0.12, 0.3, 'sine'), 160);
  }, [playBeep]);

  // Hover sound - subtle
  const playHoverSound = useCallback(() => {
    playBeep(1200, 0.02, 0.05, 'sine');
  }, [playBeep]);

  // Error sound
  const playErrorSound = useCallback(() => {
    playBeep(200, 0.15, 0.3, 'sawtooth');
    setTimeout(() => playBeep(150, 0.2, 0.25, 'sawtooth'), 150);
  }, [playBeep]);

  // Timer start sound - "get ready!"
  const playStartSound = useCallback(() => {
    const notes = [
      { freq: 440, delay: 0 },
      { freq: 554, delay: 100 },
      { freq: 659, delay: 200 },
    ];
    notes.forEach(({ freq, delay }) => {
      setTimeout(() => playBeep(freq, 0.12, 0.3, 'sine'), delay);
    });
  }, [playBeep]);

  // Pause sound
  const playPauseSound = useCallback(() => {
    playBeep(440, 0.1, 0.2, 'sine');
    setTimeout(() => playBeep(330, 0.15, 0.15, 'sine'), 100);
  }, [playBeep]);

  // Resume sound
  const playResumeSound = useCallback(() => {
    playBeep(330, 0.1, 0.2, 'sine');
    setTimeout(() => playBeep(440, 0.15, 0.25, 'sine'), 100);
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
    playHoverSound,
    playErrorSound,
    playStartSound,
    playPauseSound,
    playResumeSound,
  };
};
