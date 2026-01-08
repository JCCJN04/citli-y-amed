import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '@/utils/asset';

interface RecuerdosPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const RecuerdosPage: React.FC<RecuerdosPageProps> = ({ onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // Auto-cambiar fotos cada 2.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#f5f0eb] overflow-y-auto"
    >
      {/* Header con botón cerrar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-[110] bg-[#faf8f5]/95 backdrop-blur-sm shadow-sm border-b border-[#e8e0d8]/30">
        <button 
          onClick={onClose}
          className="text-[#5f6d4f] hover:opacity-60 transition-opacity p-2"
        >
          <X className="w-6 h-6" />
        </button>
        <img src={asset('Logo Citli y Amed .png')} alt="C&A" className="h-20 w-auto" decoding="async" loading="eager" />
      </header>

      {/* Contenido */}
      <div className="pt-24 pb-12">
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              {...fadeInUp}
              className="font-script text-5xl md:text-6xl text-stone-800 mb-16 text-center"
            >
              Recuerdos
            </motion.h2>
            
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="relative flex justify-center items-center min-h-[500px]">
                {/* Contenedor de fotos con transición */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full max-w-[340px] md:max-w-[400px]"
                  >
                    {/* Foto grande */}
                    <div className="relative w-full h-[450px] md:h-[520px] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                      <img
                        src={asset(`/foto${photos[currentPhotoIndex]}.jpeg`)}
                        alt={`Recuerdo ${photos[currentPhotoIndex]}`}
                        className="w-full h-full object-cover"
                        decoding="async"
                        loading="lazy"
                        style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Indicadores de progreso */}
              <div className="flex justify-center gap-2 mt-8">
                {photos.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      currentPhotoIndex === idx 
                        ? 'bg-[#5f6d4f] w-8' 
                        : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default RecuerdosPage;
