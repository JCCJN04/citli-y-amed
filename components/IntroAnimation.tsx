
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
      className="w-full h-full bg-[#d6d2c9] flex items-center justify-center relative overflow-hidden"
    >
      {/* ILUMINACIÓN DE VENTANA (GOBO) */}
      <div className="absolute inset-0 gobo-lighting pointer-events-none z-0" />

      {/* TÍTULO SUPERIOR (Estilo Foto) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute top-[12%] md:top-[15%] text-center z-10"
      >
        <h2 className="font-serif-elegant text-stone-700 tracking-[0.4em] text-sm md:text-base uppercase font-medium">
          Citli & Amed
        </h2>
      </motion.div>

      {/* CONTENEDOR DEL SOBRE */}
      <motion.div
        style={{ 
          rotateX: isOpen ? 0 : rotateX, 
          rotateY: isOpen ? 0 : rotateY,
          perspective: "1500px" 
        }}
        className="relative z-20 w-[320px] h-[210px] md:w-[480px] md:h-[310px] soft-shadow-envelope"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          {/* Sombra de contacto suave */}
          <div className="absolute inset-4 bg-black/10 blur-[30px] rounded-sm -z-10 translate-y-6" />

          {/* Cuerpo del Sobre (Lino Blanco) */}
          <div className="absolute inset-0 bg-[#fbfbfb] rounded-sm overflow-hidden linen-texture border border-black/[0.03]">
            {/* Interior del sobre */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="absolute inset-0 bg-[#e0dbd1] paper-texture" 
            />
          </div>

          {/* Tarjeta de Invitación que se asoma */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isOpen ? { y: -150, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="absolute inset-x-5 top-4 h-[90%] bg-white shadow-xl border border-stone-100 flex flex-col items-center justify-center p-6 z-10 paper-texture"
          >
            <div className="text-[10px] font-sans-clean tracking-[0.4em] text-[#7a8d6f] mb-4 uppercase">Save the Date</div>
            <div className="text-xl md:text-3xl font-script text-stone-800 text-center leading-tight">
              Citli & Amed
            </div>
            <div className="mt-4 w-12 h-[1px] bg-stone-100" />
            <div className="mt-4 font-serif-elegant italic text-stone-400 text-xs">28 . 03 . 2026</div>
          </motion.div>

          {/* Pliegues Frontales (Lados y Abajo) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Lados */}
            <div className="absolute inset-0 [clip-path:polygon(0%_0%,_50%_50%,_0%_100%)] bg-[#fbfbfb] linen-texture border-r border-black/[0.02]" />
            <div className="absolute inset-0 [clip-path:polygon(100%_0%,_50%_50%,_100%_100%)] bg-[#fbfbfb] linen-texture border-l border-black/[0.02]" />
            {/* Abajo */}
            <div className="absolute inset-0 [clip-path:polygon(0%_100%,_50%_50%,_100%_100%)] bg-[#f4f4f4] linen-texture shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]" />
          </div>

          {/* Solapa Superior (Flap) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#fbfbfb] [clip-path:polygon(0%_0%,_100%_0%,_50%_100%)] linen-texture border-b border-black/[0.01]"
          />

          {/* SELLO DE CERA VERDE (Exacto a la foto) */}
          <motion.div
            initial={{ scale: 1 }}
            animate={isOpen ? { scale: 0, opacity: 0, y: 100 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: "backIn" }}
            onClick={handleSealClick}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[40] cursor-pointer"
          >
            {/* Brillo de cera */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[#3a6b35]/20 rounded-full blur-xl"
            />
            
            <div className="w-14 h-14 md:w-18 md:h-18 bg-[#3a6b35] rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] flex items-center justify-center border border-[#2d5528]/40 relative overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
              <span className="text-white/80 font-script text-2xl md:text-3xl select-none z-10 drop-shadow-md tracking-tighter italic">C&A</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* FLECHA DIBUJADA Y TEXTO (Calco de la foto) */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[8%] left-1/2 -translate-x-[45%] flex flex-col items-center pointer-events-none z-30"
        >
          <div className="relative">
            {/* Texto manuscrito inclinado */}
            <p className="font-handwriting text-[#7a8d6f]/70 text-base md:text-lg leading-tight -rotate-[15deg] -translate-x-16 translate-y-4 max-w-[150px] text-center select-none">
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
