
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Pinterest embed component for wedding invitation
// Uses Pinterest's official embed method with proper React lifecycle handling

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const DressCodeSection: React.FC = () => {
  const embedRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    // Load Pinterest script only once
    const loadPinterestScript = () => {
      if (scriptLoadedRef.current) {
        // If script already exists, just rebuild the pins
        if (window.PinUtils) {
          window.PinUtils.build();
        }
        return;
      }

      // Check if script already exists in DOM (from previous component mount)
      const existingScript = document.querySelector('script[src*="pinit.js"]');
      if (existingScript) {
        scriptLoadedRef.current = true;
        // Wait for script to be ready and rebuild
        setTimeout(() => {
          if (window.PinUtils) {
            window.PinUtils.build();
          }
        }, 100);
        return;
      }

      // Create and load new script
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://assets.pinterest.com/js/pinit.js';
      script.onload = () => {
        scriptLoadedRef.current = true;
        // Build pins after script loads
        if (window.PinUtils) {
          window.PinUtils.build();
        }
      };
      document.body.appendChild(script);
    };

    loadPinterestScript();

    // Cleanup: rebuild pins when component updates (React strict mode / hot reload)
    return () => {
      if (window.PinUtils && embedRef.current) {
        // Small delay to ensure proper rebuild on re-render
        setTimeout(() => {
          if (window.PinUtils) {
            window.PinUtils.build();
          }
        }, 50);
      }
    };
  }, []);

  return (
    <section className="py-24 px-6 flex flex-col items-center bg-[#fcfaf2] relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
        }}
      />

      <div className="w-[1px] h-12 bg-stone-400 mb-8 opacity-40 z-10 relative" />
      
      <motion.div {...fadeInUp} className="max-w-5xl w-full z-10 relative">
        {/* Title and subtitle */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-serif-display text-4xl md:text-5xl tracking-[0.1em] text-stone-800 uppercase">
            Dress Code
          </h2>
          <p className="font-script text-3xl md:text-4xl text-[#a68b7c] italic">
            Inspiración para tu outfit
          </p>
          <div className="w-16 h-[1px] bg-stone-400 mx-auto mt-6 opacity-40" />
        </div>

        {/* Pinterest embed - directly on background */}
        <div 
          ref={embedRef}
          className="w-full flex justify-center"
          style={{ minHeight: '700px' }}
        >
          {/* Pinterest board embed - official anchor tag method */}
          <a 
            data-pin-do="embedBoard" 
            data-pin-board-width="800"
            data-pin-scale-height="700" 
            data-pin-scale-width="115"
            href="https://mx.pinterest.com/michisig/dress-code/"
            className="block text-center font-serif-elegant text-stone-600 hover:text-stone-800 transition-colors w-full"
          >
            Ver tablero de inspiración en Pinterest
          </a>
        </div>

        {/* Optional styling note below */}
        <motion.p 
          {...fadeInUp}
          className="text-center mt-8 font-serif-elegant text-sm text-stone-500 italic max-w-2xl mx-auto"
        >
          Encuentra ideas elegantes y sofisticadas para lucir increíble en nuestra celebración
        </motion.p>
      </motion.div>

      <div className="w-[1px] h-12 bg-stone-400 mt-16 opacity-40 z-10 relative" />
    </section>
  );
};

// TypeScript declaration for Pinterest's PinUtils
declare global {
  interface Window {
    PinUtils?: {
      build: () => void;
    };
  }
}

export default DressCodeSection;
