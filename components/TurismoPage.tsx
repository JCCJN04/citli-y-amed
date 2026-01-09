import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '@/utils/asset';

interface TurismoPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const TurismoPage: React.FC<TurismoPageProps> = ({ onClose }) => {
  const estilistas = [
    { name: 'Alhika Gomez', contact: '+52 311 119 8670', type: 'whatsapp' },
    { name: 'Ruth Jimena', contact: '+52 311 253 7131', type: 'whatsapp' },
    { name: 'Diana Ramos', contact: '+52 1 311 142 8973', type: 'whatsapp' },
    { name: 'Heron Machuzzi', contact: '+52 311 141 2063', type: 'whatsapp' },
    { name: 'Itzel Pintado', contact: '+52 1 311 260 4471', type: 'whatsapp' },
    { name: 'Lady Ramos', contact: '+52 311 101 2120', type: 'whatsapp' },
    { name: 'Mayra Ruiz', contact: '+52 1 311 161 0045', type: 'whatsapp' },
    { name: 'Conny Barragán', contact: '+521 311 113 3199', type: 'whatsapp' },
    { name: 'Diego Lerma', contact: 'diego.lerma.imagen', type: 'instagram' },
    { name: 'Luis Tequila', contact: '+52 1 311 121 4177', type: 'whatsapp' },
  ];

  const handleContact = (contact: string, type: string) => {
    if (type === 'whatsapp') {
      const cleanNumber = contact.replace(/\s/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    } else if (type === 'instagram') {
      window.open(`https://instagram.com/${contact}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{
        backgroundImage: `url(${asset('fondo1.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-[#faf8f5]/20 backdrop-blur-[0.5px] pointer-events-none" />
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
        {/* ========================================== */}
        {/* SECCIÓN 1: VIAJAR A TEPIC */}
        {/* ========================================== */}
        <section id="viajar-tepic" className="py-16 px-6 border-b border-stone-200">
          <div className="max-w-2xl mx-auto">
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
            </motion.div>

            <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mt-12" />
          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 2: HOTELES */}
        {/* ========================================== */}
        <section id="hoteles" className="py-24 px-6 max-w-3xl mx-auto border-b border-stone-200">
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

              <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
                <span className="font-serif-elegant text-2xl md:text-3xl text-[#8b7d70] leading-none">
                  Airbnb en Tepic
                </span>
                <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 3: ESTILISTAS */}
        {/* ========================================== */}
        <section id="estilistas" className="py-24 px-6 border-b border-stone-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-script text-5xl md:text-6xl text-stone-800 mb-12 text-center">Estilistas</h2>
            
            <p className="font-serif-elegant text-center text-[#8b7d70] mb-16 max-w-2xl mx-auto">
              Profesionales recomendados para que luzcas espectacular en nuestra celebración
            </p>

            <div className="space-y-3">
              {estilistas.map((estilista, index) => (
                <motion.div 
                  key={index}
                  {...fadeInUp}
                  className="flex items-center justify-between border-b border-stone-100 pb-3"
                >
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">
                    {estilista.name}
                  </span>
                  <button
                    onClick={() => handleContact(estilista.contact, estilista.type)}
                    className="bg-[#5f6d4f] text-white text-[9px] tracking-[0.2em] px-4 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors"
                  >
                    {estilista.type === 'whatsapp' ? 'WHATSAPP' : 'INSTAGRAM'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 4: TURISMO EN NAYARIT */}
        {/* ========================================== */}
        <section id="turismo-nayarit" className="py-24 px-6 border-b border-stone-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-script text-5xl md:text-6xl text-stone-800 mb-12 text-center">Turismo en Nayarit</h2>
            
            <p className="font-serif-elegant text-center text-[#8b7d70] mb-16 max-w-2xl mx-auto">
              Descubre la belleza natural, cultura y playas de Nayarit durante tu visita
            </p>

            {/* SITIOS OFICIALES */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] text-[#5f6d4f] mb-12">
                Información General
              </h3>

              <div className="space-y-3 mb-16">
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Riviera Nayarit</span>
                  <a href="https://www.rivieranayarit.com" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Visit Nayarit - Tepic</span>
                  <a href="https://visitnayarit.travel/destinations/tepic/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
              </div>
            </div>

            {/* TURISMO EN TEPIC */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] text-[#5f6d4f] mb-12">
                Turismo en Tepic
              </h3>

              <p className="font-serif-elegant text-[#8b7d70] mb-8 text-center">
                Sitios y experiencias culturales y naturales
              </p>

              <div className="space-y-3 mb-16">
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Sitio oficial de turismo de Tepic</span>
                  <a href="https://www.visitatepic.com/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Alrededores de Tepic (naturaleza y pueblos)</span>
                  <a href="https://www.visitatepic.com/que-hacer/alrededores/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tours guiados en Tepic</span>
                  <a href="https://www.visitatepic.com/guia-turistica/tours/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Qué hacer en Tepic - Gobierno municipal</span>
                  <a href="https://app.tepic.gob.mx/web/sonrie/hacer.html" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
              </div>
            </div>

            {/* LAGUNAS Y NATURALEZA */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] text-[#5f6d4f] mb-12">
                Lagunas y Naturaleza
              </h3>

              <div className="space-y-3 mb-16">
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Laguna de Santa María del Oro</span>
                  <a href="https://visitnayarit.travel/en/destinations/santa-maria-del-oro-nayarit/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Destinos naturales de Nayarit</span>
                  <a href="https://visitnayarit.travel/en/blog-nayarit-en/nayarit-has-two-impressive-lagoons/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                </motion.div>
              </div>
            </div>

            {/* PLAYAS Y PUEBLOS COSTEROS */}
            <div className="mb-24">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] text-[#5f6d4f] mb-12">
                Playas y Pueblos Costeros
              </h3>

              {/* San Blas */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    SAN BLAS
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">San Blas - Pueblo Mágico</span>
                    <a href="https://visitnayarit.travel/en/destinations/san-blas-nayarit-2/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Tour manglares y cocodrilos "La Tovara"</span>
                    <a href="https://maps.app.goo.gl/6gLmd1Mnr7c6k7C29" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Restaurante Playa Bonita</span>
                    <a href="https://maps.app.goo.gl/MjLEHCVgZisGjFiFA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>

              {/* Riviera Nayarit */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 h-full flex items-center justify-center" style={{ width: '20px' }}>
                  <h4 className="font-serif-display text-base font-semibold tracking-[0.3em] uppercase text-[#5f6d4f] opacity-80 whitespace-nowrap" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                    RIVIERA
                  </h4>
                </div>
                <div className="ml-16 space-y-3">
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Riviera Nayarit - Destinos</span>
                    <a href="https://www.rivieranayarit.com/destinations/" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">VISITAR</a>
                  </motion.div>
                  <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Restaurante Pineda</span>
                    <a href="https://maps.app.goo.gl/1Eji6W4kU7xLad7c6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* RECOMENDACIONES RÁPIDAS */}
            <div className="mb-16 pt-12 border-t-2 border-[#c9a69a]">
              <h3 className="font-serif-display text-3xl tracking-[0.2em] text-[#c9a69a] mb-12">
                Recomendaciones Rápidas
              </h3>

              <div className="space-y-6 text-[#8b7d70]">
                <motion.div {...fadeInUp} className="bg-white rounded-lg p-6 shadow-sm border border-stone-100">
                  <p className="font-serif-elegant text-base leading-relaxed">
                    <strong className="text-[#5f6d4f]">Santa María del Oro</strong> es ideal para naturaleza, laguna y deportes acuáticos, y está a corta distancia en auto desde Tepic.
                  </p>
                </motion.div>

                <motion.div {...fadeInUp} className="bg-white rounded-lg p-6 shadow-sm border border-stone-100">
                  <p className="font-serif-elegant text-base leading-relaxed">
                    <strong className="text-[#5f6d4f]">San Blas</strong> ofrece playa, historia, manglares y un ambiente costero tradicional.
                  </p>
                </motion.div>

                <motion.div {...fadeInUp} className="bg-white rounded-lg p-6 shadow-sm border border-stone-100">
                  <p className="font-serif-elegant text-base leading-relaxed">
                    <strong className="text-[#5f6d4f]">Riviera Nayarit</strong> abarca muchos destinos de playa (como Guayabitos, Sayulita o Punta Mita) con actividades desde surf hasta snorkel y relax en la arena.
                  </p>
                </motion.div>

                <motion.div {...fadeInUp} className="bg-white rounded-lg p-6 shadow-sm border border-stone-100">
                  <p className="font-serif-elegant text-base leading-relaxed">
                    <strong className="text-[#5f6d4f]">Tepic y sus alrededores</strong> tienen miradores, cultura indígena (como Zitakua), haciendas, volcanes y pueblos históricos.
                  </p>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 5: GASTRONOMÍA */}
        {/* ========================================== */}
        <section id="gastronomia" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-script text-5xl md:text-6xl text-stone-800 mb-12 text-center">Opciones de Restaurantes</h2>
            
            <p className="font-serif-elegant text-center text-[#8b7d70] mb-16 max-w-2xl mx-auto">
              En Tepic hay dos opciones: <strong>a) sazón</strong> (casero y delicioso) o <strong>b) estilo</strong> (restaurantes más formales)
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
                    <span className="font-serif-elegant italic text-lg text-[#8b7d70]">Nieves Don Polo</span>
                    <a href="https://maps.app.goo.gl/YFQu95Ndg7e73goL6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                  </motion.div>
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

          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default TurismoPage;
