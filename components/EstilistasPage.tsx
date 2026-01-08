import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { asset } from '@/utils/asset';

interface EstilistasPageProps {
  onClose: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const EstilistasPage: React.FC<EstilistasPageProps> = ({ onClose }) => {
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
      </div>
    </motion.div>
  );
};

export default EstilistasPage;
