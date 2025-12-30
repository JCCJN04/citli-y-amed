
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import InvitationContent from './components/InvitationContent';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  // Ya no usamos useEffect con timeout para que sea el usuario quien abra la invitación
  const handleOpen = () => {
    // Esperamos un poco después de que la animación de apertura termine en el componente Intro
    setTimeout(() => {
      setShowContent(true);
    }, 1200);
  };

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
    </main>
  );
};

export default App;
