
import React from 'react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';

// Pinterest link component for wedding invitation

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const DressCodeSection: React.FC = () => {
  return (
    <section className="py-16 px-6 flex flex-col items-center bg-[#fcfaf2] relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
        }}
      />

      <div className="w-[1px] h-12 bg-stone-400 mb-8 opacity-40 z-10 relative" />
      
      <motion.div {...fadeInUp} className="max-w-2xl w-full z-10 relative">
        {/* Title and subtitle */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-script text-5xl md:text-6xl text-stone-800">
            Dress Code
          </h2>
          <p className="font-serif-elegant text-3xl md:text-4xl text-[#a68b7c] italic">
            Formal
          </p>
          <div className="w-16 h-[1px] bg-stone-400 mx-auto mt-6 opacity-40" />
          <p className="font-serif-elegant text-lg text-stone-600 pt-4">
            Ver inspiración
          </p>
        </div>

        {/* Pinterest logo button */}
        <div className="flex justify-center">
          <a 
            href="https://pin.it/1KCQmnAw9"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <img 
              src={asset("/pinterest-logo.png")} 
              alt="Pinterest" 
              className="h-16 md:h-20 w-auto object-contain filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
            />
          </a>
        </div>

        {/* Optional styling note below */}
        <motion.p 
          {...fadeInUp}
          className="text-center mt-8 font-serif-elegant text-sm text-stone-500 italic max-w-2xl mx-auto"
        >
        </motion.p>
      </motion.div>

      <div className="w-[1px] h-12 bg-stone-400 mt-8 opacity-40 z-10 relative" />
    </section>
  );
};

export default DressCodeSection;
