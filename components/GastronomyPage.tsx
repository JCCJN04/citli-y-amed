import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '@/utils/asset';

interface GastronomyPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const GastronomyPage: React.FC<GastronomyPageProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#faf8f5] overflow-y-auto"
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
          <div className="max-w-5xl mx-auto">
            <h2 className="font-script text-5xl md:text-6xl text-stone-800 mb-12 text-center">Opciones de Restaurantes</h2>
            
            <p className="font-serif-elegant text-center text-[#8b7d70] mb-16 max-w-2xl mx-auto">
              En Tepic encontrarás desde lugares con <strong>Sazón</strong> casero y delicioso, hasta restaurantes de <strong>Estilo</strong> más formal
            </p>

            {/* A) SAZÓN */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] uppercase text-[#5f6d4f] mb-12">
                SAZÓN
              </h3>

              {/* Desayunos */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    DESAYUNOS
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tía Martina</span>
                    <a href="https://maps.app.goo.gl/rYiyd6ALXymyHvT77" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Los borrados</span>
                    <a href="https://maps.app.goo.gl/VwDaJeXHyas8kRxh7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Petit Brulé</span>
                    <a href="https://maps.app.goo.gl/CGduoNhL8YxSbth58" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Claudia a la carta</span>
                    <a href="https://maps.app.goo.gl/UWa7zXA2gwuk82BUA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El itacqte</span>
                    <a href="https://maps.app.goo.gl/QayL4ZAXW5TqLndP6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El itacqte</span>
                    <a href="https://maps.app.goo.gl/TQkMcRpg3JZMwU4v6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tacos de birria</span>
                    <a href="https://maps.app.goo.gl/ytFZ7Q2H3NP7KmGQA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tacos de birria</span>
                    <a href="https://maps.app.goo.gl/1uq7dJG1679ND5vG7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tacos de carnitas</span>
                    <a href="https://maps.app.goo.gl/PnJYwHX5WNTnQPR46" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Lonchería Mercado</span>
                    <a href="https://maps.app.goo.gl/Yq3SNnj3uDyfbZZw9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tortas el güero</span>
                    <a href="https://maps.app.goo.gl/jb98PQoGXo8K17Xf8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>

              {/* Comida */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    COMIDA
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El mal portado</span>
                    <a href="https://maps.app.goo.gl/6w641qTu8N7LnaZX7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El pilón</span>
                    <a href="https://maps.app.goo.gl/b6AYmKgsAoQPJ4gx8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Matsuri</span>
                    <a href="https://maps.app.goo.gl/tfqD8iVTuaFXVV7E8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Claudia a la carta</span>
                    <a href="https://maps.app.goo.gl/UWa7zXA2gwuk82BUA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Juan Carlos Nieves</span>
                    <a href="https://maps.app.goo.gl/6d5EFk9hKgRcfcUq7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>

              {/* Cena */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    CENA
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Jejenes & Gardenias</span>
                    <a href="https://maps.app.goo.gl/M5YhTCCit6pwZSVM7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Píos</span>
                    <a href="https://maps.app.goo.gl/xRCu2rgMPR8jKz5C6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El buen taco</span>
                    <a href="https://maps.app.goo.gl/6yHE2sugtqmTN3n18" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Pepe yus</span>
                    <a href="https://maps.app.goo.gl/4PtEZQKQei8Kuafw9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* B) ESTILO */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] uppercase text-[#5f6d4f] mb-12">
                ESTILO
              </h3>

              {/* Desayunos */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    DESAYUNOS
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">La madalena</span>
                    <a href="https://maps.app.goo.gl/aV1jw5CxT5rEUD2x6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Comal</span>
                    <a href="https://maps.app.goo.gl/1Dp2Mv6PSSktVc4q8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Piloncillo</span>
                    <a href="https://maps.app.goo.gl/GGbMJeVrcCV1wVEz5" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>

              {/* Comida */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    COMIDA
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El marlin</span>
                    <a href="https://maps.app.goo.gl/5XfMzRDCWyXAuJjR6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Matsuri</span>
                    <a href="https://maps.app.goo.gl/tfqD8iVTuaFXVV7E8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">El estero</span>
                    <a href="https://maps.app.goo.gl/GuqUajpHQaFT7g3m6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">La ola</span>
                    <a href="https://maps.app.goo.gl/MjEJdiv28x9Y2cq68" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Emilianos</span>
                    <a href="https://maps.app.goo.gl/5e535RDkoxDfoRTV9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Loma 42</span>
                    <a href="https://maps.app.goo.gl/YDS7yTwdjcFCyKi1A" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>

              {/* Cena */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    CENA
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Emilianos</span>
                    <a href="https://maps.app.goo.gl/5e535RDkoxDfoRTV9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tango y milonga</span>
                    <a href="https://maps.app.goo.gl/YS332xmoCa2zpTBt9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Loma 42</span>
                    <a href="https://maps.app.goo.gl/YDS7yTwdjcFCyKi1A" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Dos de asada</span>
                    <a href="https://maps.app.goo.gl/uWw3Wfy7pmDY8UPK7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* BONUS */}
            <div className="mb-24 pt-12 border-t-2 border-[#c9a69a]">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] uppercase text-[#c9a69a] mb-12">
                BONUS
              </h3>

              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    BONUS
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Pepe yus</span>
                    <a href="https://maps.app.goo.gl/ub4VGCSEG7bbDuLNA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Neto</span>
                    <a href="https://maps.app.goo.gl/t3LNSfs5eqf5nNFW7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* COFFEE SHOPS */}
            <div className="mb-16 pt-12 border-t border-stone-200">
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    Cafeterías
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Casa 164</span>
                    <a href="https://maps.app.goo.gl/JnDkDNhtwWU95Bnz9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Brulé</span>
                    <a href="https://maps.app.goo.gl/mxAqf1gqCrHQS2edA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative Image */}
            <div className="mt-16 flex justify-center">
              <div className="bg-white p-2 shadow-md -rotate-2 border border-stone-50 max-w-[320px]">
                <img src={asset('foto3.jpeg')} className="contrast-125" alt="Cafe" decoding="async" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default GastronomyPage;
