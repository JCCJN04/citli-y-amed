import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '../utils/asset';

interface NuestraHistoriaPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const NuestraHistoriaPage: React.FC<NuestraHistoriaPageProps> = ({ onClose }) => {
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
      className="fixed inset-0 z-[100] bg-[#faf8f5] overflow-y-auto"
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5 text-stone-600" />
      </button>

      {/* Contenido */}
      <div className="pt-24 pb-12">
        {/* ========================================== */}
        {/* TÍTULO PRINCIPAL */}
        {/* ========================================== */}
        <section className="py-16 px-6 bg-gradient-to-b from-[#faf8f5] to-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mb-8" />
            
            <motion.h1 
              {...fadeInUp}
              className="font-script text-6xl md:text-7xl text-stone-800 mb-8 leading-tight"
            >
              Nuestra Historia
            </motion.h1>
            
            <motion.p 
              {...fadeInUp}
              className="font-serif-display text-center text-[#8b7d70] max-w-md mx-auto text-sm tracking-wider opacity-70"
            >
              El inicio de todo
            </motion.p>

            <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mt-8" />
          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 1: SOBRE NOSOTROS */}
        {/* ========================================== */}
        <section id="sobre-nosotros" className="py-24 px-6 border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif-display text-4xl tracking-[0.15em] text-[#5f6d4f] mb-16 text-center">
              Sobre Nosotros
            </h2>

            {/* Según Citli */}
            <motion.div {...fadeInUp} className="mb-20">
              <div className="mb-6">
                <h3 className="font-script text-3xl text-[#c9a69a] mb-2">Según Citli</h3>
                <div className="w-16 h-[1px] bg-[#c9a69a]/30" />
              </div>
              
              <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                Nos conocimos trabajando en un despacho trasnacional; fuimos amiguitos durante años y crecimos laboralmente juntos. Años más tarde nos tocó trabajar (como pares) en el mismo equipo de trabajo y nos volvimos más cercanos, hasta que un día alguien dijo "me encantas" y no hubo vuelta atrás: salimos algún tiempo, sin pensar lo serio y lo lejos que podríamos llegar.
              </p>
            </motion.div>

            {/* Según Amed */}
            <motion.div {...fadeInUp} className="mb-12">
              <div className="mb-6">
                <h3 className="font-script text-3xl text-[#5f6d4f] mb-2">Según Amed</h3>
                <div className="w-16 h-[1px] bg-[#5f6d4f]/30" />
              </div>
              
              <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                En efecto, nos conocimos en el trabajo, fuimos muy amigos siempre, cuando nos tocó trabajar de la mano, formamos un buen equipo mismo que ha perdurado a la fecha, a pesar de ser tan diferentes, siempre llegamos a una excelente solución.
              </p>
            </motion.div>

            {/* Galería de fotos de su historia */}
            <motion.div {...fadeInUp} className="mt-20">
              <div className="w-[1px] h-8 bg-[#d4c5b9]/20 mx-auto mb-12" />
              
              {/* Grid de fotos con diseño asimétrico y elegante */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {/* Foto 1 - Grande */}
                <motion.div 
                  {...fadeInUp}
                  className="col-span-2 md:col-span-2 row-span-2 relative group"
                >
                  <div className="bg-white p-3 shadow-xl rotate-[-1deg] hover:rotate-0 transition-all duration-500 hover:scale-[1.02] border border-stone-100">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={asset('foto24.jpeg')} 
                        alt="Nuestra historia 1" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Foto 2 - Pequeña */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-3 shadow-xl rotate-[2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={asset('foto25.jpeg')} 
                        alt="Nuestra historia 2" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Foto 3 - Pequeña */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-3 shadow-xl rotate-[-2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={asset('foto26.jpeg')} 
                        alt="Nuestra historia 3" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Foto 4 - Mediana */}
                <motion.div 
                  {...fadeInUp}
                  className="col-span-1 relative group"
                >
                  <div className="bg-white p-3 shadow-xl rotate-[1deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={asset('foto27.jpeg')} 
                        alt="Nuestra historia 4" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Foto 5 - Mediana */}
                <motion.div 
                  {...fadeInUp}
                  className="col-span-1 relative group"
                >
                  <div className="bg-white p-3 shadow-xl rotate-[-1deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={asset('foto28.jpeg')} 
                        alt="Nuestra historia 5" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="w-[1px] h-8 bg-[#d4c5b9]/20 mx-auto mt-12" />
            </motion.div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECCIÓN 2: MEMORIAS */}
        {/* ========================================== */}
        <section id="memorias" className="py-24 px-6 bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              {...fadeInUp}
              className="font-script text-5xl md:text-6xl text-stone-800 mb-16 text-center"
            >
              Memorias
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
                        alt={`Memoria ${photos[currentPhotoIndex]}`}
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

        {/* ========================================== */}
        {/* SECCIÓN 3: LA PROPUESTA */}
        {/* ========================================== */}
        <section id="la-propuesta" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif-display text-4xl tracking-[0.15em] text-[#5f6d4f] mb-16 text-center">
              La Propuesta
            </h2>

            {/* Según Citli */}
            <motion.div {...fadeInUp} className="mb-20">
              <div className="mb-6">
                <h3 className="font-script text-3xl text-[#c9a69a] mb-2">Según Citli</h3>
                <div className="w-16 h-[1px] bg-[#c9a69a]/30" />
              </div>
              
              <div className="space-y-4">
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  En febrero de 2024, después de viajar por Europa durante casi 3 semanas, cumplir sueños juntos (como visitar por horas y horas los museos), nos compramos un vinito, lo pusimos en termos y nos fuimos a Trocadero a ver la Torre Eiffel.
                </p>
                
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Después de tomarnos algunas fotos y romancear un rato, me pidió tomarnos nuestra tradicional foto de corazón (chiste local, ridículos al máximo), volteo de repente y lo veo arrodillado con un anillo tan brillante como la torre misma… no lo recuerdo perfectamente, pero me dijo que quería todo conmigo y me amaba profundamente (sin preguntar explícitamente "¿te quieres casar conmigo?)…
                </p>
                
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Mi respuesta fue algo así como "¿para toda la vida?" y en ese momento Amed se levanta me pone el anillo y nos damos un beso…
                </p>
              </div>
            </motion.div>

            {/* Según Amed */}
            <motion.div {...fadeInUp} className="mb-12">
              <div className="mb-6">
                <h3 className="font-script text-3xl text-[#5f6d4f] mb-2">Según Amed</h3>
                <div className="w-16 h-[1px] bg-[#5f6d4f]/30" />
              </div>
              
              <div className="space-y-4">
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Debo de aclarar que NUESTRO GRAN SUEÑO era el turismo deportivo y de conciertos (según mi versión) … pero bueno, entrando en materia obviamente los nervios estaban al mil… todo iniciando desde el diciembre anterior cuando externé la decisión con mis padres y sus padres (les pedí permiso) de proponer matrimonio a Dani.
                </p>
                
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Me esmeré mucho en aprender y darle un anillo muy bonito, fui a muchas citas con joyeros, muchos amigos me ayudaron e incluso me acompañaron, al final con ayuda de la diseñadora terminamos creando el anillo perfecto.
                </p>
                
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Cuando estábamos yendo a Europa, en seguridad del aeropuerto revisaron minuciosamente nuestras maletas porque mi mamá nos mandó muchos menjurjes raros para no enfermarnos por el clima (yo tenía perfectamente guardado el anillo) y le decía a la señorita con voz discreta que no lo sacara porque me iban a descubrir, afortunadamente no pasó a mayores.
                </p>
                
                <p className="font-serif-elegant text-lg text-[#8b7d70] leading-relaxed">
                  Los primeros días sentí a Dani algo irritada (ya me dijo que pensó que le iba a dar el anillo llegando y como no se lo daba iba a quedar 🤡 con sus amigas), pero tenía que ser París pues la escena iba a ser muy bonita ya después todo fue miel sobre hojuelas.
                </p>
              </div>
            </motion.div>

            {/* Galería de fotos de la propuesta */}
            <motion.div {...fadeInUp} className="mt-20">
              <div className="w-[1px] h-12 bg-[#d4c5b9]/30 mx-auto mb-12" />
              
              <h3 className="font-script text-4xl text-center text-[#c9a69a] mb-16">
                El Momento Perfecto
              </h3>

              {/* Grid de fotos con efecto polaroid elegante */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                {/* Foto 1 */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-4 pb-16 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={asset('foto20.jpeg')} 
                        alt="Propuesta en París 1" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <p className="font-script text-center text-stone-600 mt-4 text-lg">
                      París, 2024
                    </p>
                  </div>
                </motion.div>

                {/* Foto 2 */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-4 pb-16 shadow-2xl rotate-[2deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={asset('foto21.jpeg')} 
                        alt="Propuesta en París 2" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <p className="font-script text-center text-stone-600 mt-4 text-lg">
                      La Torre Eiffel
                    </p>
                  </div>
                </motion.div>

                {/* Foto 3 */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-4 pb-16 shadow-2xl rotate-[1deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={asset('foto22.jpeg')} 
                        alt="Propuesta en París 3" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <p className="font-script text-center text-stone-600 mt-4 text-lg">
                      El Anillo
                    </p>
                  </div>
                </motion.div>

                {/* Foto 4 */}
                <motion.div 
                  {...fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white p-4 pb-16 shadow-2xl rotate-[-1deg] hover:rotate-0 transition-all duration-500 hover:scale-105 border border-stone-100">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={asset('foto23.jpeg')} 
                        alt="Propuesta en París 4" 
                        decoding="async" 
                        loading="lazy" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <p className="font-script text-center text-stone-600 mt-4 text-lg">
                      Felicidad
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="w-[1px] h-12 bg-[#d4c5b9]/30 mx-auto mt-16" />
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default NuestraHistoriaPage;
