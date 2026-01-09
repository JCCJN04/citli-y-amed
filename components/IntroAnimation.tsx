
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { asset } from '../utils/asset';

interface IntroProps {
  onOpen: () => void;
}

const IntroAnimation: React.FC<IntroProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parallax muy sutil para profundidad real
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 30, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 30, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSealClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen();
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="w-full h-full bg-[#e5e3dd] flex items-center justify-center relative overflow-hidden"
    >
      {/* TÍTULO SUPERIOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-[14%] md:top-[16%] text-center z-10"
      >
        <h2 className="font-script text-stone-600 tracking-[0.2em] text-4xl md:text-5xl">
          Citli y Amed
        </h2>
      </motion.div>

      {/* CONTENEDOR DEL SOBRE */}
      <motion.div
        style={{ 
          rotateX: isOpen ? 0 : rotateX, 
          rotateY: isOpen ? 0 : rotateY,
          perspective: "1500px" 
        }}
        className="relative z-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="w-[85vw] max-w-[340px] h-[55vw] max-h-[220px] md:w-[420px] md:h-[270px] relative"
        >
          {/* Sombra suave debajo del sobre */}
          <div className="absolute inset-x-8 bottom-0 h-16 bg-black/10 blur-3xl translate-y-8 -z-10" />

          {/* IMAGEN DEL SOBRE CON SELLO */}
          <motion.div
            onClick={handleSealClick}
            className="absolute inset-0 cursor-pointer group z-20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={isOpen ? { opacity: 0, scale: 0.8, y: 50 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Resplandor animado alrededor */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#5a8250]/20 rounded-lg blur-2xl pointer-events-none"
            />
            
            <img 
              src={asset('sobreysello.png')}
              alt="Sobre con sello" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* FLECHA DIBUJADA Y TEXTO (Calco de la foto) */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[20%] md:bottom-[8%] left-1/2 -translate-x-[72%] flex flex-col items-center pointer-events-none z-30"
        >
          <div className="relative">
            {/* Texto manuscrito inclinado */}
            <p className="font-breathing text-[#7a8d6f]/70 text-lg md:text-xl leading-tight -rotate-[15deg] -translate-x-16 translate-y-4 max-w-[180px] text-center select-none italic">
              Haz click en el sello para abrir la invitación
            </p>

            {/* Flecha con Bucle (Loop-de-loop) */}
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="opacity-40 -translate-y-4 translate-x-12">
              <motion.path 
                d="M30 130 C 40 110, 80 120, 60 90 C 40 60, 20 80, 50 100 C 80 120, 110 90, 100 20" 
                stroke="#7a8d6f" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 2 }}
              />
              <motion.path 
                d="M90 35 L100 20 L115 30" 
                stroke="#7a8d6f" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntroAnimation;
