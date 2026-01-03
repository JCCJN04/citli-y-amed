
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import IntroAnimation from './components/IntroAnimation';
import InvitationContent from './components/InvitationContent';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ya no usamos useEffect con timeout para que sea el usuario quien abra la invitación
  const handleOpen = () => {
    // Esperamos un poco después de que la animación de apertura termine en el componente Intro
    setTimeout(() => {
      setShowContent(true);
    }, 1200);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <main className="min-h-screen relative bg-[#fcfaf2]">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <IntroAnimation onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            <InvitationContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reproductor flotante - aparece solo cuando se muestra el contenido */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="fixed bottom-8 right-8 z-[70]"
        >
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-[#5f6d4f] hover:bg-[#7a8269] text-white rounded-full shadow-[0_8px_30px_rgba(95,109,79,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/10"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>
        </motion.div>
      )}

      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/Mina - Nessuno.mp4" type="audio/mp4" />
      </audio>
    </main>
  );
};

export default App;
