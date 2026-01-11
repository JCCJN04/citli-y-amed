import React from 'react';
import { asset } from '@/utils/asset';

interface BackgroundImageProps {
  className?: string;
}

/**
 * Componente optimizado para el fondo de la invitación
 * Maneja múltiples resoluciones para pantallas de alta densidad
 * y asegura una imagen nítida sin pixelación
 */
const BackgroundImage: React.FC<BackgroundImageProps> = ({ className = '' }) => {
  return (
    <div 
      className={`fixed inset-0 w-full h-full -z-20 ${className}`}
      style={{
        backgroundImage: `url(${asset('fondo.jpeg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        imageRendering: '-webkit-optimize-contrast',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
};

export default BackgroundImage;
