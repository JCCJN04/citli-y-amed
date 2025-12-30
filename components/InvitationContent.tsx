
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import DressCodeSection from './DressCodeSection';

// Declaración para que TypeScript no se queje del objeto global Tally
declare global {
  interface Window {
    Tally: any;
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const InvitationContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Asegurar que Tally se cargue al montar el componente
  useEffect(() => {
    const loadTally = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    loadTally();
    const timeout = setTimeout(loadTally, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const menuItems = [
    { label: 'ITINERARIO', id: 'itinerario' },
    { label: 'DRESS CODE', id: 'dresscode' },
    { label: 'HOSPEDAJE', id: 'hospedaje' },
    { label: 'GASTRONOMÍA', id: 'gastronomia' },
    { label: 'MESA DE REGALOS', id: 'regalos' },
    { label: 'RSVP', id: 'rsvp' },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#e8e7e3] min-h-screen font-serif-elegant selection:bg-stone-200">
      
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-6 z-[60]">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-stone-800 mix-blend-difference hover:opacity-60 transition-opacity p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
        <img src="/Logo Citli y Amed .png" alt="C&A" className="h-24 w-auto mix-blend-difference" />
      </header>

      {/* MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-0 left-0 w-full z-[100] bg-[#e8e7e3] shadow-2xl pb-12 rounded-b-[2.5rem]"
            >
              <div className="flex justify-between items-center p-6 mb-8 border-b border-stone-300/30">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 border border-stone-800 flex items-center justify-center hover:bg-stone-800 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="font-serif-display text-2xl tracking-tighter italic text-stone-400">C&A</div>
              </div>
              <nav className="flex flex-col gap-6 px-10">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-serif-elegant text-xl md:text-2xl tracking-[0.2em] text-stone-700 hover:text-stone-950 transition-colors uppercase w-fit"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-4 px-6 flex flex-col items-center">
        <div className="absolute inset-0 w-full h-full -z-10">
           <img src="/fondo.png" className="w-full h-full object-cover" alt="bg" />
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-script text-white text-3xl md:text-5xl mb-8 drop-shadow-sm">save the date</motion.p>
        {/* <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="bg-white p-3 pb-12 shadow-2xl mb-8 max-w-[500px] md:max-w-[600px] border border-stone-200">
          <div className="aspect-[4/3] overflow-hidden">
            <img src="/image.png" className="w-full h-full object-cover" alt="Wedding detail" />
          </div>
        </motion.div> */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="bg-white p-3 pb-12 shadow-2xl mb-12 max-w-[320px] md:max-w-[400px] border border-stone-200">
          <div className="aspect-[3/4] overflow-hidden grayscale contrast-125">
             <img src="/image.png?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Couple" />
          </div>
        </motion.div>
        <motion.div {...fadeInUp} className="text-center space-y-4">
          <h1 className="text-4xl md:text-7xl font-serif-display tracking-[0.1em] text-stone-800 uppercase">Citli & Amed</h1>
          <p className="font-script text-2xl text-[#a68b7c] italic tracking-wide">Tepic, Nayarit</p>
          <div className="text-xl md:text-2xl font-serif-elegant tracking-[0.3em] text-stone-600 mt-4">28 · 03 · 2026</div>
        </motion.div>
      </section>

      {/* SECCIÓN PADRES - CON FONDO FLORAL PROPORCIONADO */}
      <section className="py-24 px-6 flex flex-col items-center text-center relative overflow-hidden border-y border-stone-200/50">
        {/* Capa de imagen de fondo floral grabada */}
        <div 
          className="absolute inset-0 z-0 opacity-50 grayscale mix-blend-multiply pointer-events-none"
          style={{ 
            backgroundImage: 'url("/wedding invitation paper texture.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay para asegurar legibilidad */}
        <div className="absolute inset-0 bg-[#e8e7e3]/60 z-0" />

        <div className="w-[1px] h-12 bg-stone-400 mb-8 opacity-40 z-10 relative" />
        
        <motion.div {...fadeInUp} className="space-y-16 z-10 relative max-w-5xl mx-auto">
          <p className="font-script text-4xl md:text-5xl text-[#8e7668] mb-12 italic drop-shadow-sm">Con la bendición de nuestros padres</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-4">
              <p className="font-serif-elegant text-xl md:text-2xl text-stone-800 tracking-[0.1em] leading-snug">Luis Armando Rios Magallanes</p>
              <p className="font-serif-elegant text-xl md:text-2xl text-stone-800 tracking-[0.1em] leading-snug">Karla Esther González Cedano</p>
            </div>
            <div className="space-y-4">
              <p className="font-serif-elegant text-xl md:text-2xl text-stone-800 tracking-[0.1em] leading-snug">Víctor Hugo Hernández de los Santos</p>
              <p className="font-serif-elegant text-xl md:text-2xl text-stone-800 tracking-[0.1em] leading-snug">Margarita Araceli Miranda de Santiago</p>
            </div>
          </div>
        </motion.div>

        <div className="w-[1px] h-12 bg-stone-400 mt-16 opacity-40 z-10 relative" />
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="pt-16 pb-20 px-6 max-w-lg mx-auto flex flex-col items-center">
        <h2 className="font-script text-4xl md:text-5xl text-[#a68b7c] mb-16">The Perfect Match</h2>
        <div className="space-y-16 w-full">
          <motion.div {...fadeInUp} className="matchbox-card p-6 flex flex-col items-center text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3100/3100418.png" className="w-20 h-20 grayscale opacity-70 mb-6" alt="Icon" />
            <h3 className="font-serif-display text-2xl tracking-widest uppercase mb-2">Rompehielos</h3>
            <p className="font-serif-elegant italic text-stone-500 mb-6">27 · 03 · 2026</p>
            <div className="w-full border-t border-stone-200 pt-4">
              <button className="btn-editorial">Ver Más</button>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="matchbox-card p-6 flex flex-col items-center text-center">
             <img src="https://cdn-icons-png.flaticon.com/512/2904/2904973.png" className="w-20 h-20 grayscale opacity-70 mb-6" alt="Icon" />
            <h3 className="font-serif-display text-2xl tracking-widest uppercase mb-2">Ceremonia</h3>
            <p className="font-serif-elegant italic text-stone-500 mb-6">28 · 03 · 2026</p>
            <div className="w-full border-t border-stone-200 pt-4">
              <button className="btn-editorial">Ver Más</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DRESS CODE SECTION - Pinterest Board Embed */}
      <div id="dresscode">
        <DressCodeSection />
      </div>

      {/* QUOTE */}
      <section className="relative py-16 px-6 overflow-hidden bg-stone-800 text-white flex flex-col items-center text-center">
        <div className="absolute inset-0 opacity-20 grayscale">
           <img src="https://images.unsplash.com/photo-1494959322954-4643c0357070?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="quote-bg" />
        </div>
        <div className="w-[1px] h-10 bg-white/20 mb-6" />
        <motion.p {...fadeInUp} className="font-script text-3xl md:text-5xl leading-relaxed max-w-xl z-10">
          "La magia de conectar y <br /> la suerte de coincidir"
        </motion.p>
        <div className="w-[1px] h-10 bg-white/20 mt-6" />
      </section>

      {/* HOSPEDAJE */}
      <section id="hospedaje" className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="font-script text-4xl text-[#a68b7c] mb-8 text-center">Opciones de Hospedaje</h2>
        <h3 className="font-serif-display text-2xl tracking-[0.2em] text-center uppercase mb-16 text-stone-700">Hoteles Sede</h3>
        <div className="space-y-16">
          <motion.div {...fadeInUp} className="text-center">
            <h4 className="font-script text-3xl text-stone-600 mb-2">Hotel Fray Junipero</h4>
            <div className="space-y-1 text-sm tracking-widest uppercase font-sans-clean opacity-70">
              <p>Código: CITLIAMED</p>
              <p>Reservaciones: 311 123 4567</p>
            </div>
            <button className="btn-editorial mt-6">Reservar</button>
          </motion.div>
          <motion.div {...fadeInUp} className="flex justify-center">
             <div className="bg-white p-2 pb-10 shadow-lg rotate-1 border border-stone-100 max-w-[280px]">
                <div className="aspect-square overflow-hidden grayscale opacity-80">
                   <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" alt="Detail" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* GASTRONOMÍA / OTROS HOTELES */}
      <section id="gastronomia" className="py-24 px-6 border-t border-stone-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-20">
          
          {/* COLUMNA OTROS HOTELES (Calco de la imagen) */}
          <div className="flex-1">
             <h3 className="font-serif-display text-4xl tracking-[0.05em] text-stone-800 uppercase mb-16">
               Otros Hoteles
             </h3>
             <div className="space-y-16">
                {['Casa 1810', 'Casa hoyos', 'Numu hotel'].map(hotel => (
                  <motion.div key={hotel} {...fadeInUp} className="flex flex-col items-start gap-1">
                    <span className="font-script text-4xl text-stone-700 leading-none">
                      {hotel}
                    </span>
                    <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
                    <button className="bg-[#2a2a2a] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-stone-700 transition-colors">
                      Reservar
                    </button>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* COLUMNA RESTAURANTES */}
          <div className="flex-1 relative md:pl-16 md:border-l border-stone-200">
            <h3 className="font-script text-4xl text-[#a68b7c] mb-12">Opciones de Restaurantes</h3>
            <div className="space-y-6">
               {['Jacques café', 'Rústica', 'Lavanda café', 'Raíces'].map(place => (
                 <div key={place} className="flex justify-between items-center border-b border-stone-100 pb-2">
                   <span className="font-serif-elegant italic text-lg text-stone-600">{place}</span>
                 </div>
               ))}
            </div>
            <div className="mt-16 flex justify-center">
               <div className="bg-white p-2 shadow-md -rotate-2 border border-stone-50 max-w-[200px]">
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" className="grayscale contrast-125" alt="Cafe" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* MESA DE REGALOS */}
      <section id="regalos" className="py-32 px-6 bg-stone-900 text-white relative flex flex-col items-center">
         <div className="absolute inset-0 opacity-10 grayscale mix-blend-overlay">
           <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="gift-bg" />
        </div>
        
        <div className="w-[1px] h-10 bg-white/20 mb-8" />
        
        <h2 className="font-script text-5xl md:text-6xl mb-6">Mesa de Regalos</h2>
        
        <motion.p {...fadeInUp} className="font-serif-elegant text-lg md:text-xl italic text-white/90 max-w-2xl text-center mb-16 leading-relaxed">
          Nuestro mejor regalo es tu compañía, cualquier detalle será recibido con mucho cariño.
        </motion.p>
        
        <div className="text-center space-y-8 z-10 max-w-md w-full">
          <motion.div {...fadeInUp} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-2xl">
            <h4 className="font-serif-display text-2xl tracking-wider uppercase mb-6 text-white">BBVA</h4>
            <div className="space-y-4 text-white/90">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Titular</p>
                <p className="font-serif-elegant text-base md:text-lg">Citli Daniela Rios González</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Tarjeta Débito</p>
                <p className="font-mono text-lg tracking-wider">4152 3144 8797 9604</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="w-[1px] h-10 bg-white/20 mt-8" />
      </section>

      {/* RSVP SECTION - ARREGLADO FONDO BLANCO */}
      <section id="rsvp" className="py-32 px-6 flex flex-col items-center bg-[#e8e7e3]">
        <motion.div {...fadeInUp} className="w-full max-w-xl flex flex-col items-center">
          <div className="mb-12 text-center space-y-4">
            <h2 className="font-script text-5xl md:text-7xl text-[#a68b7c] leading-tight drop-shadow-sm">Favor de Confirmar tu Asistencia</h2>
          </div>
          
          <div className="w-full bg-transparent overflow-hidden">
            <iframe 
              src="https://tally.so/embed/0Q72OB?hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height="600" 
              frameBorder="0" 
              title="Confirmación de Asistencia"
              className="w-full min-h-[500px]"
            />
          </div>
          <div className="w-[1px] h-20 bg-stone-300 mx-auto mt-24 opacity-30" />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 flex flex-col items-center gap-12">
        <div className="w-full max-w-2xl border border-stone-200 p-3 bg-white shadow-xl relative overflow-hidden group">
           <div className="aspect-video grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Footer photo" />
           </div>
        </div>
        <p className="font-serif-elegant text-xs tracking-widest opacity-40 uppercase text-center">Weddsite made by | SHE SAID WEB</p>
      </footer>
    </div>
  );
};

export default InvitationContent;
