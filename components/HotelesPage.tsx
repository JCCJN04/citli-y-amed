import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import BackgroundImage from './BackgroundImage';
import { asset } from '@/utils/asset';

interface HotelesPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const HotelesPage: React.FC<HotelesPageProps> = ({ onClose }) => {
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
        <section className="py-24 px-6 max-w-3xl mx-auto">
          {/* Decorative Image at Top */}
          <motion.div {...fadeInUp} className="flex justify-start pl-4 mb-16">
            <div className="bg-white p-2 pb-10 shadow-lg rotate-1 border border-stone-100 max-w-[400px]">
              <div className="aspect-square overflow-hidden opacity-80">
                <img src={asset('foto4.jpeg')} alt="Detail" decoding="async" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }} />
              </div>
            </div>
          </motion.div>

          <div className="pl-4">
            <h3 className="font-script text-5xl md:text-6xl text-stone-800 mb-16">
              Hoteles
            </h3>
            
            <div className="space-y-16">
              {/* Hotel Fray */}
              <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
                <span className="font-serif-elegant text-2xl md:text-3xl text-[#8b7d70] leading-none">
                  Hotel Fray
                </span>
                <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
                <a 
                  href="https://maps.app.goo.gl/sjVcGU1iG5Zbc8U26" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#5f6d4f] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors"
                >
                  Reservar
                </a>
              </motion.div>

              {/* Hotel La Loma */}
              <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
                <span className="font-serif-elegant text-2xl md:text-3xl text-[#8b7d70] leading-none">
                  Hotel La Loma
                </span>
                <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
                <a 
                  href="https://maps.app.goo.gl/b9geucPZcVwCcjrV8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#5f6d4f] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors"
                >
                  Reservar
                </a>
              </motion.div>

              {/* Hotel Fray Select */}
              <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
                <span className="font-serif-elegant text-2xl md:text-3xl text-[#8b7d70] leading-none">
                  Hotel Fray Select
                </span>
                <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
                <a 
                  href="https://maps.app.goo.gl/DcRwf794Zfj6mzb67" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#5f6d4f] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors"
                >
                  Reservar
                </a>
              </motion.div>

              {/* Airbnb en Tepic */}
              <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
                <span className="font-serif-elegant text-2xl md:text-3xl text-[#8b7d70] leading-none">
                  Airbnb en Tepic
                </span>
                <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HotelesPage;
