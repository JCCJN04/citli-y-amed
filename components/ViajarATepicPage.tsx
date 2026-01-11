import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import BackgroundImage from './BackgroundImage';
import { asset } from '@/utils/asset';

interface ViajarATepicPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const ViajarATepicPage: React.FC<ViajarATepicPageProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] overflow-y-auto relative"
    >
      <BackgroundImage />
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
        <section className="py-16 px-6 bg-gradient-to-b from-[#faf8f5] to-white">
          <div className="max-w-2xl mx-auto">
            {/* Separador superior */}
            <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mb-8" />
            
            <motion.h2 
              {...fadeInUp}
              className="font-script text-5xl md:text-6xl text-stone-800 mb-8 text-center leading-tight"
            >
              Viajar a Tepic
            </motion.h2>
            
            <motion.p 
              {...fadeInUp}
              className="font-serif-display text-center text-[#8b7d70] mb-16 max-w-md mx-auto text-sm tracking-wider opacity-70"
            >
              Opciones de viaje
            </motion.p>

            {/* Vuelos Directos */}
            <motion.div {...fadeInUp} className="mb-16 text-center">
              <h3 className="font-serif-display text-sm tracking-[0.25em] text-[#5f6d4f] mb-8 opacity-80">
                En Vuelo Directo
              </h3>
              
              <div className="space-y-10 max-w-md mx-auto">
                <div className="space-y-3">
                  <p className="font-serif-display text-xl text-[#8b7d70]">
                    Aeroméxico
                  </p>
                  <p className="font-serif-elegant text-sm text-[#8b7d70]/80 leading-loose max-w-xs mx-auto">
                    Aeropuerto Internacional de la Ciudad de México
                  </p>
                </div>
                
                <div className="w-16 h-[1px] bg-[#d4c5b9]/30 mx-auto" />
                
                <div className="space-y-3">
                  <p className="font-serif-display text-xl text-[#8b7d70]">
                    Viva Aerobus
                  </p>
                  <p className="font-serif-elegant text-sm text-[#8b7d70]/80 leading-loose max-w-xs mx-auto">
                    Aeropuerto Internacional Felipe Ángeles
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Separador delicado */}
            <div className="w-[1px] h-8 bg-[#d4c5b9]/20 mx-auto mb-12" />

            {/* Alternativa */}
            <motion.div {...fadeInUp} className="mb-16 text-center">
              <h3 className="font-serif-display text-sm tracking-[0.25em] text-[#5f6d4f] mb-8 opacity-80">
                Alternativa
              </h3>
              
              <div className="max-w-md mx-auto space-y-6">
                <p className="font-serif-elegant text-base text-[#8b7d70] leading-loose">
                  Si prefieres volar a Guadalajara o Puerto Vallarta
                </p>
                
                <div className="w-8 h-[1px] bg-[#d4c5b9]/20 mx-auto" />
                
                <p className="font-serif-elegant text-sm text-[#8b7d70]/80 leading-loose">
                  Desde la Central de Autobuses de Zapopan encontrarás salidas cada hora hacia Tepic
                </p>
              </div>
            </motion.div>

            {/* Recomendación */}
            <motion.div {...fadeInUp} className="text-center">
              <div className="inline-block mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-transparent via-[#c9a69a]/30 to-transparent mx-auto" />
              </div>
              
              <h3 className="font-serif-display text-sm tracking-[0.25em] text-[#5f6d4f] mb-6 opacity-80">
                Recomendación
              </h3>
              
              <p className="font-serif-elegant text-base text-[#8b7d70] leading-loose max-w-md mx-auto mb-6">
                Te sugerimos rentar un auto y llegar un día antes
              </p>
              
              <div className="w-8 h-[1px] bg-[#d4c5b9]/20 mx-auto my-6" />

            </motion.div>

            {/* Separador inferior */}
            <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mt-12" />
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ViajarATepicPage;
