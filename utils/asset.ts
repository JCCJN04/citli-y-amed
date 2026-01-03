/**
 * Helper para manejar rutas de assets del public/ con subruta de Vite
 * 
 * Este helper construye URLs correctas para assets estáticos basándose en
 * la configuración `base` de vite.config.ts (/citliyamed/)
 * 
 * Uso:
 * - import { asset } from '@/utils/asset';
 * - <img src={asset('foto1.png')} />
 * - backgroundImage: `url(${asset('fondo.png')})`
 */

export const asset = (fileName: string): string => {
  // Eliminar slash inicial si existe para evitar doble slash
  const cleanFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  
  // import.meta.env.BASE_URL incluye la subruta configurada en vite.config.ts
  return `${import.meta.env.BASE_URL}${cleanFileName}`;
};
