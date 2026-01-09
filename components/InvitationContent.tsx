
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock } from 'lucide-react';
import DressCodeSection from './DressCodeSection';
import GastronomyPage from './GastronomyPage';
import EstilistasPage from './EstilistasPage';
import HotelesPage from './HotelesPage';
import ViajarATepicPage from './ViajarATepicPage';
import TurismoPage from './TurismoPage';
import NuestraHistoriaPage from './NuestraHistoriaPage';
import { asset } from '@/utils/asset';

interface InvitationContentProps {
  colorMode?: boolean;
}

// Declaración para que TypeScript no se queje del objeto global Tally
declare global {
  interface Window {
    Tally: any;
  }
}

// ============================================
// ÍCONOS DE CLIMA - Diseño Editorial Minimalista
// ============================================
// Íconos SVG monocromáticos diseñados específicamente para
// invitaciones de boda premium. Estilo flat, geometría simple,
// sin gradientes ni efectos 3D.

const WeatherIcon: React.FC<{ code: string; className?: string }> = ({ code, className = "" }) => {
  const baseClass = "w-full h-full";
  const iconColor = "#7a8269"; // Color principal de la invitación
  const secondaryColor = "#9a8c7e"; // Color secundario

  // Mapeo de códigos OpenWeatherMap a íconos elegantes
  const getIcon = () => {
    // Códigos de día (d) y noche (n)
    const codeBase = code.substring(0, 2);
    
    switch(codeBase) {
      case '01': // Cielo despejado
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            <circle cx="32" cy="32" r="11" fill={iconColor} opacity="0.2"/>
            <circle cx="32" cy="32" r="8" fill={iconColor}/>
            {/* Rayos del sol */}
            <line x1="32" y1="8" x2="32" y2="14" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="32" y1="50" x2="32" y2="56" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="8" y1="32" x2="14" y2="32" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="50" y1="32" x2="56" y2="32" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="13.5" y1="13.5" x2="18" y2="18" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="46" y1="46" x2="50.5" y2="50.5" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="50.5" y1="13.5" x2="46" y2="18" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="18" y1="46" x2="13.5" y2="50.5" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        );
      
      case '02': // Parcialmente nublado
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            {/* Sol parcial */}
            <circle cx="24" cy="22" r="7" fill={iconColor} opacity="0.9"/>
            <line x1="24" y1="10" x2="24" y2="13" stroke={iconColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <line x1="10" y1="22" x2="13" y2="22" stroke={iconColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <line x1="14" y1="14" x2="16" y2="16" stroke={iconColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <line x1="34" y1="14" x2="32" y2="16" stroke={iconColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            {/* Nube */}
            <path d="M 18 34 Q 18 28 24 28 Q 26 24 30 24 Q 36 24 38 28 Q 44 28 44 34 Q 44 40 38 40 L 24 40 Q 18 40 18 34 Z" 
                  fill={secondaryColor} opacity="0.6"/>
          </svg>
        );
      
      case '03': // Nublado
      case '04': // Muy nublado
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            {/* Nube principal */}
            <path d="M 14 32 Q 14 26 20 26 Q 22 22 27 22 Q 33 22 35 26 Q 42 26 42 32 Q 42 38 35 38 L 20 38 Q 14 38 14 32 Z" 
                  fill={iconColor} opacity="0.5"/>
            {/* Nube secundaria */}
            <path d="M 22 38 Q 22 34 26 34 Q 28 31 32 31 Q 37 31 39 34 Q 44 34 44 38 Q 44 43 39 43 L 26 43 Q 22 43 22 38 Z" 
                  fill={secondaryColor} opacity="0.6"/>
          </svg>
        );
      
      case '09': // Lluvia ligera
      case '10': // Lluvia
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            {/* Nube */}
            <path d="M 16 24 Q 16 18 22 18 Q 24 14 29 14 Q 35 14 37 18 Q 44 18 44 24 Q 44 30 37 30 L 22 30 Q 16 30 16 24 Z" 
                  fill={iconColor} opacity="0.6"/>
            {/* Gotas de lluvia */}
            <line x1="24" y1="34" x2="22" y2="42" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="30" y1="34" x2="28" y2="42" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="36" y1="34" x2="34" y2="42" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="27" y1="40" x2="25" y2="48" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
            <line x1="33" y1="40" x2="31" y2="48" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
        );
      
      case '11': // Tormenta
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            {/* Nube oscura */}
            <path d="M 16 22 Q 16 16 22 16 Q 24 12 29 12 Q 35 12 37 16 Q 44 16 44 22 Q 44 28 37 28 L 22 28 Q 16 28 16 22 Z" 
                  fill={iconColor} opacity="0.7"/>
            {/* Rayo */}
            <path d="M 32 28 L 28 38 L 34 38 L 30 50" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      
      case '13': // Nieve
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            {/* Nube */}
            <path d="M 16 24 Q 16 18 22 18 Q 24 14 29 14 Q 35 14 37 18 Q 44 18 44 24 Q 44 30 37 30 L 22 30 Q 16 30 16 24 Z" 
                  fill={iconColor} opacity="0.6"/>
            {/* Copos de nieve */}
            <circle cx="24" cy="38" r="2" fill={iconColor} opacity="0.6"/>
            <circle cx="30" cy="42" r="2" fill={iconColor} opacity="0.6"/>
            <circle cx="36" cy="38" r="2" fill={iconColor} opacity="0.6"/>
            <circle cx="27" cy="46" r="2" fill={iconColor} opacity="0.5"/>
            <circle cx="33" cy="46" r="2" fill={iconColor} opacity="0.5"/>
          </svg>
        );
      
      case '50': // Niebla
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            <line x1="16" y1="24" x2="48" y2="24" stroke={iconColor} strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
            <line x1="20" y1="30" x2="44" y2="30" stroke={iconColor} strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
            <line x1="16" y1="36" x2="48" y2="36" stroke={iconColor} strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
            <line x1="20" y1="42" x2="44" y2="42" stroke={iconColor} strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          </svg>
        );
      
      default: // Icono genérico por defecto (soleado parcial)
        return (
          <svg viewBox="0 0 64 64" fill="none" className={baseClass}>
            <circle cx="32" cy="32" r="10" fill={iconColor} opacity="0.6"/>
            <line x1="32" y1="10" x2="32" y2="16" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
            <line x1="32" y1="48" x2="32" y2="54" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
            <line x1="10" y1="32" x2="16" y2="32" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
            <line x1="48" y1="32" x2="54" y2="32" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  return (
    <div className={className}>
      {getIcon()}
    </div>
  );
};

// Interface para los datos del clima de OpenWeatherMap
interface WeatherDay {
  day: string;
  date: string; // Número del día del mes (ej: "26")
  temp: number;
  minTemp: number;
  description: string; // Descripción del clima en español
  iconCode: string; // Código del ícono de OpenWeatherMap
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }
};

const InvitationContent: React.FC<InvitationContentProps> = ({ colorMode = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGastronomyPage, setShowGastronomyPage] = useState(false);
  const [showEstilistasPage, setShowEstilistasPage] = useState(false);
  const [showHotelesPage, setShowHotelesPage] = useState(false);
  const [showViajarPage, setShowViajarPage] = useState(false);
  const [showTurismoPage, setShowTurismoPage] = useState(false);
  const [showNuestraHistoriaPage, setShowNuestraHistoriaPage] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number>(25);
  const [loading, setLoading] = useState(true);

  // ============================================
  // CONTADOR REGRESIVO
  // ============================================
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Fecha de la boda: 28 de marzo de 2026 a la 1 PM (13:00)
      const weddingDate = new Date('2026-03-28T13:00:00');
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // ============================================
  // MÓDULO DE CLIMA - OpenWeatherMap API
  // ============================================
  useEffect(() => {
    const fetchWeather = async () => {
      console.log('🌤️ Iniciando carga de datos del clima...');
      
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const LAT = import.meta.env.VITE_LOCATION_LAT;
        const LON = import.meta.env.VITE_LOCATION_LON;
        
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&lang=es&units=metric`;
        console.log('📡 URL de la API:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('📦 Respuesta de la API:', data);
        
        if (data.cod === '200' && data.list && data.list.length > 0) {
          console.log('✅ Datos recibidos correctamente');
          
          // Fechas específicas del evento: 26-30 de marzo de 2026
          const eventDates = [
            { day: 'MIÉ', fullDate: '26' },
            { day: 'JUE', fullDate: '27' },
            { day: 'VIE', fullDate: '28' },
            { day: 'SÁB', fullDate: '29' },
            { day: 'DOM', fullDate: '30' }
          ];
          
          // Procesar datos de la API - Agrupar por día
          const dailyData: { [key: string]: any[] } = {};
          
          data.list.forEach((item: any) => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toISOString().split('T')[0];
            
            if (!dailyData[dayKey]) {
              dailyData[dayKey] = [];
            }
            dailyData[dayKey].push(item);
          });
          
          console.log('📅 Días agrupados:', Object.keys(dailyData));
          
          // Crear array de pronóstico para los 5 días
          const forecast: WeatherDay[] = [];
          const sortedDays = Object.keys(dailyData).sort();
          
          // Tomar los primeros 5 días disponibles
          sortedDays.slice(0, 5).forEach((dayKey, index) => {
            if (index < eventDates.length) {
              const dayItems = dailyData[dayKey];
              
              // Calcular temperatura máxima y mínima del día
              const temps = dayItems.map((item: any) => item.main.temp);
              const maxTemp = Math.round(Math.max(...temps));
              const minTemp = Math.round(Math.min(...temps));
              
              // Tomar el clima del mediodía (más representativo)
              const middayItem = dayItems[Math.floor(dayItems.length / 2)] || dayItems[0];
              
              forecast.push({
                day: eventDates[index].day,
                date: eventDates[index].fullDate,
                temp: maxTemp,
                minTemp: minTemp,
                description: middayItem.weather[0].description,
                iconCode: middayItem.weather[0].icon
              });
            }
          });
          
          console.log('🌡️ Pronóstico procesado:', forecast);
          
          if (forecast.length > 0) {
            setWeatherData(forecast);
            setCurrentTemp(forecast[0].temp);
            console.log('✅ Estado actualizado con datos reales');
          } else {
            throw new Error('No se pudieron procesar los datos');
          }
        } else {
          console.warn('⚠️ Respuesta inválida de la API:', data);
          throw new Error('Respuesta inválida de la API');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos del clima:', error);
        
        // DATOS HISTÓRICOS: Promedio climático de Tepic en marzo
        // Fuente: Datos históricos de temperatura y condiciones típicas
        console.log('🔄 Usando datos históricos promedio de Tepic para marzo');
        const historicalData: WeatherDay[] = [
          { day: 'MIÉ', date: '26', temp: 31, minTemp: 17, description: 'Cielo despejado', iconCode: '01d' },
          { day: 'JUE', date: '27', temp: 32, minTemp: 18, description: 'Cielo despejado', iconCode: '01d' },
          { day: 'VIE', date: '28', temp: 31, minTemp: 18, description: 'Algo de nubes', iconCode: '02d' },
          { day: 'SÁB', date: '29', temp: 30, minTemp: 17, description: 'Cielo despejado', iconCode: '01d' },
          { day: 'DOM', date: '30', temp: 32, minTemp: 18, description: 'Cielo despejado', iconCode: '01d' }
        ];
        
        setWeatherData(historicalData);
        setCurrentTemp(31);
        console.log('✅ Datos históricos cargados (basados en promedios de marzo en Tepic)');
      } finally {
        setLoading(false);
        console.log('🏁 Carga de clima finalizada');
      }
    };

    fetchWeather();
  }, []);

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
    { label: 'NUESTRA HISTORIA', id: 'historia' },
    { label: 'DRESS CODE', id: 'dresscode' },
    { label: 'TURISMO', id: 'turismo' },
    { label: 'MESA DE REGALOS', id: 'regalos' },
    { label: 'RSVP', id: 'rsvp' },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    // Si es historia, abrir la página separada
    if (id === 'historia') {
      setShowNuestraHistoriaPage(true);
      return;
    }
    
    // Si es turismo, abrir la página separada
    if (id === 'turismo') {
      setShowTurismoPage(true);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      // Diferentes offsets según la sección para compensar el header y espaciado
      let headerOffset = 100;
      
      // Dress code y hospedaje necesitan más offset por el padding superior
      if (id === 'dresscode') {
        headerOffset = 0;
      } else if (id === 'hospedaje') {
        headerOffset = -400;
      } else if (id === 'regalos') {
        headerOffset = -80;
      }
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Página de Gastronomía */}
      <AnimatePresence>
        {showGastronomyPage && (
          <GastronomyPage onClose={() => setShowGastronomyPage(false)} />
        )}
      </AnimatePresence>

      {/* Página de Estilistas */}
      <AnimatePresence>
        {showEstilistasPage && (
          <EstilistasPage onClose={() => setShowEstilistasPage(false)} />
        )}
      </AnimatePresence>

      {/* Página de Hoteles */}
      <AnimatePresence>
        {showHotelesPage && (
          <HotelesPage onClose={() => setShowHotelesPage(false)} />
        )}
      </AnimatePresence>

      {/* Página de Viajar a Tepic */}
      <AnimatePresence>
        {showViajarPage && (
          <ViajarATepicPage onClose={() => setShowViajarPage(false)} />
        )}
      </AnimatePresence>

      {/* Página de Turismo */}
      <AnimatePresence>
        {showTurismoPage && (
          <TurismoPage onClose={() => setShowTurismoPage(false)} />
        )}
      </AnimatePresence>

      {/* Página de Nuestra Historia */}
      <AnimatePresence>
        {showNuestraHistoriaPage && (
          <NuestraHistoriaPage onClose={() => setShowNuestraHistoriaPage(false)} />
        )}
      </AnimatePresence>

      <div className="w-full bg-[#faf8f5] min-h-screen font-serif-elegant selection:bg-[#e8e0d8]/40">
      
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-[60] bg-[#faf8f5]/95 backdrop-blur-sm shadow-sm border-b border-[#e8e0d8]/30">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-[#5f6d4f] hover:opacity-60 transition-opacity p-2"
        >
          <Menu className="w-8 h-8" />
        </button>
        <img src={asset('Logo Citli y Amed .png')} alt="C&A" className="h-24  w-auto" decoding="async" loading="eager" />
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
              className="fixed top-0 left-0 w-full z-[100] bg-[#f5f2ed] shadow-2xl pb-12 rounded-b-[2.5rem]"
            >
              <div className="flex justify-between items-center p-6 mb-8 border-b border-stone-300/30">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 border border-[#5f6d4f] flex items-center justify-center hover:bg-[#5f6d4f] hover:text-white transition-all text-[#5f6d4f]"
                >
                  <X className="w-6 h-6" />
                </button>
                <img src={asset('Logo Citli y Amed .png')} alt="C&A" className="h-24 w-auto" decoding="async" loading="eager" />
              </div>
              <nav className="flex flex-col gap-6 px-10">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-serif-elegant text-xl md:text-2xl tracking-[0.2em] text-[#5f6d4f] hover:text-[#7a8269] transition-colors uppercase w-fit"
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
      <section className="relative pt-24 pb-12 px-6 flex flex-col items-center overflow-hidden">
        {/* Fondo editorial (textura) */}
        <div className="absolute inset-0 -z-20">
          <img
            src={asset('fondo.png')}
            className="w-full h-full object-cover opacity-95"
            alt="bg"
            decoding="async"
            loading="eager"
          />
        </div>

        {/* Overlays para look editorial + legibilidad */}
        <div className="absolute inset-0 -z-10 bg-[#F3EFE8]/70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

        {/* Save the date (visible y discreto) */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 mb-8 font-script text-5xl md:text-7xl text-stone-800 opacity-60"
        >
        </motion.p>

        {/* Polaroid */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="bg-white p-4 pb-16 max-w-[340px] md:max-w-[420px] border border-black/10 shadow-[0_28px_55px_-38px_rgba(0,0,0,0.35)]"
        >
          <div className="aspect-[3/4] overflow-hidden contrast-125">
            <img 
              src={asset('foto1.jpeg')} 
              className="w-full h-full object-cover" 
              alt="Couple" 
              decoding="async"
              loading="eager"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* Tarjeta inferior (overlap editorial) */}
        <motion.div
          {...fadeInUp}
          className="w-full max-w-[340px] md:max-w-[500px] text-center mt-[-22px] pt-10 pb-8 px-6 bg-[#F3EFE8]/70 backdrop-blur-[4px] border border-black/5 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.45)]"
        > 
          <div className="space-y-1 mb-6">
            <p className="text-3xl md:text-4xl font-script text-[#2B2B2B] leading-tight text-left px-2 whitespace-nowrap">
              Citli Daniela
            </p>
            <p className="text-2xl md:text-3xl font-script text-[#2B2B2B] text-center">
              y
            </p>
            <br />
            <p className="text-3xl md:text-4xl font-script text-[#2B2B2B] leading-tight text-right px-2 whitespace-nowrap">
              Amed Francisco
            </p>
          </div>
          <div className="text-lg md:text-xl font-serif-elegant tracking-[0.3em] text-[#9C968E] mt-4">
            28 de marzo de 2026
          </div>
          <p className="font-script text-xl md:text-2xl text-stone-800 italic tracking-wide mt-2">
            Tepic Nayarit, México
          </p>
        </motion.div>
      </section>

      {/* CONTADOR REGRESIVO */}
      <section className="py-20 px-6">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <h2 className="font-script text-3xl md:text-4xl text-[#8b7d70] mb-12">
            Cuenta regresiva
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Días */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-serif-display text-stone-800">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm md:text-base font-serif-elegant text-stone-600 uppercase tracking-wider">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-serif-display text-stone-800">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm md:text-base font-serif-elegant text-stone-600 uppercase tracking-wider">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-serif-display text-stone-800">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm md:text-base font-serif-elegant text-stone-600 uppercase tracking-wider">
                Minutos
              </span>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-serif-display text-stone-800">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm md:text-base font-serif-elegant text-stone-600 uppercase tracking-wider">
                Segundos
              </span>
            </div>
          </div>

          <p className="font-script text-xl md:text-2xl text-[#8b7d70] mt-12 italic">
            Para celebrar juntos
          </p>
        </motion.div>
      </section>

      {/* SECCIÓN PADRES - CON FONDO FLORAL PROPORCIONADO */}
      <section className="py-16 px-6 flex flex-col items-center text-center relative overflow-hidden border-y border-stone-200/50">
        {/* Capa de imagen de fondo floral grabada */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none"
          style={{ 
            backgroundImage: `url(${asset('wedding invitation paper texture.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay para asegurar legibilidad */}
        <div className="absolute inset-0 bg-[#f5f2ed]/80 z-0" />

        <div className="w-[1px] h-16 bg-stone-400 mb-12 opacity-30 z-10 relative" />
        
        <motion.div {...fadeInUp} className="space-y-12 z-10 relative max-w-4xl mx-auto">
          <p className="font-script text-3xl md:text-4xl text-stone-800 leading-relaxed">Con la bendición de Dios, nuestros abuelos y nuestros padres</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 relative">
            {/* Separador vertical en desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-300/40 -translate-x-1/2" />
            
            <div className="flex flex-col items-center">
              <p className="font-alice text-lg md:text-xl text-[#5f6d4f] leading-relaxed">Luis Armando Rios Magallanes</p>
              <p className="font-alice text-2xl md:text-3xl text-[#5f6d4f] my-2">&</p>
              <p className="font-alice text-lg md:text-xl text-[#5f6d4f] leading-relaxed">Karla Esther González Cedano</p>
            </div>
            
            {/* Separador horizontal en móvil */}
            <div className="md:hidden w-16 h-[1px] bg-stone-300/40 mx-auto my-2" />
            
            <div className="flex flex-col items-center">
              <p className="font-alice text-lg md:text-xl text-[#5f6d4f] leading-relaxed">Víctor Hugo Hernández de los Santos</p>
              <p className="font-alice text-2xl md:text-3xl text-[#5f6d4f] my-2">&</p>
              <p className="font-alice text-lg md:text-xl text-[#5f6d4f] leading-relaxed">Margarita Araceli Miranda de Santiago</p>
            </div>
          </div>
        </motion.div>

        <div className="w-[1px] h-16 bg-stone-400 mt-12 opacity-30 z-10 relative" />
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="pt-16 pb-8 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-script text-4xl md:text-5xl text-stone-800 mb-16">Itinerario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Ceremonia Religiosa */}
          <motion.div {...fadeInUp} className="matchbox-card p-8 flex flex-col text-center">
            <div className="w-full h-56 mb-6 overflow-hidden flex items-center justify-center bg-white">
              <img src={asset('iglesia.png')} className="w-full h-full object-contain" alt="Iglesia" decoding="async" loading="lazy" />
            </div>
            <h3 className="font-serif-display text-2xl tracking-wider mb-4 text-[#5f6d4f]">Ceremonia Religiosa</h3>
            <p className="font-serif-elegant italic text-[#9a8c7e] mb-6 text-lg">12:30 Horas</p>
            <div className="space-y-3 mb-6 text-[#5f6d4f]">
              <p className="font-serif-elegant text-base leading-relaxed">
                Templo Expiatorio De Nuestra Señora Del Carmen
              </p>
              <p className="text-sm text-[#8b7d70] leading-relaxed">
                Avenida México Norte 117, Centro, 63000 Tepic, Nayarit
              </p>
            </div>
            <div className="w-full border-t border-stone-200 pt-4 mt-auto">
              <a 
                href="https://maps.app.goo.gl/CUtLXnr2dRQZ3SLZ6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#5f6d4f] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors inline-block"
              >
                Ver Ubicación
              </a>
            </div>
          </motion.div>

          {/* Ceremonia Civil y Recepción */}
          <motion.div {...fadeInUp} className="matchbox-card p-8 flex flex-col text-center">
            <div className="w-full h-56 mb-6 overflow-hidden flex items-center justify-center bg-white">
              <img src={asset('ceremonia.png')} className="w-full h-full object-contain" alt="Ceremonia" decoding="async" loading="lazy" />
            </div>
            <h3 className="font-serif-display text-2xl tracking-wider mb-4 text-[#5f6d4f]">Ceremonia Civil y Recepción</h3>
            <p className="font-serif-elegant italic text-[#9a8c7e] mb-6 text-lg">15:00 Horas</p>
            <div className="space-y-3 mb-6 text-[#5f6d4f]">
              <p className="font-serif-elegant text-base leading-relaxed">
                Quinta "El Pichón"
              </p>
              <p className="text-sm text-[#8b7d70] leading-relaxed">
                Calle principal El Pichón., Calz. de Guadalupe, 63505 Tepic, Nayarit
              </p>
            </div>
            <div className="w-full border-t border-stone-200 pt-4 mt-auto">
              <a 
                href="https://maps.app.goo.gl/3nz7jzYxS3bykW7J7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#5f6d4f] text-white text-[10px] tracking-[0.2em] px-6 py-2 uppercase font-sans-clean hover:bg-[#7a8269] transition-colors inline-block"
              >
                Ver Ubicación
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Itinerario Image Section - Organic Editorial Shape */}
      <section className="relative py-16 px-6 overflow-hidden bg-[#faf8f5]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-lg mx-auto relative"
        >
          {/* Organic Curved Shape Background - Editorial Style */}
          <div 
            className="relative bg-[#ebe6dc] p-8 shadow-[0_10px_40px_rgba(139,125,112,0.15)] overflow-hidden"
            style={{
              borderRadius: '45% 55% 58% 42% / 48% 42% 58% 52%',
              transform: 'rotate(0deg)',
            }}
          >
            {/* Content Container with Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative"
            >
              <img 
                src={asset('itinerario.png')} 
                alt="Itinerario" 
                decoding="async" 
                loading="lazy" 
                className="w-full h-auto"
              />
            </motion.div>

            {/* Subtle Text Decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-center mt-6"
            >
            </motion.div>
          </div>

          {/* Decorative Shadow Layer */}
          <div 
            className="absolute -bottom-3 -right-3 w-full h-full bg-[#d4c5b9]/30 -z-10"
            style={{
              borderRadius: '45% 55% 58% 42% / 48% 42% 58% 52%',
            }}
          />
        </motion.div>
      </section>

      {/* DRESS CODE SECTION - Pinterest Board Embed */}
      <div id="dresscode">
        <DressCodeSection />
      </div>

      {/* CLIMA NAYARIT - Diseño Editorial Horizontal */}
      <section className="relative py-8 px-6 overflow-hidden bg-gradient-to-br from-[#f5f2ed] via-[#faf8f5] to-[#f0ede8]">
        {/* Separador superior */}
        <div className="w-[1px] h-4 bg-[#d4c5b9]/30 mx-auto mb-6" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Tarjeta Horizontal Única */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#e8e0d8]/40 overflow-hidden">
            {loading ? (
              <div className="py-16 text-center">
                <p className="text-[#9a8c7e] font-serif-elegant text-sm">Cargando pronóstico...</p>
              </div>
            ) : weatherData.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#9a8c7e] font-serif-elegant text-sm">No se pudieron cargar los datos del clima.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,1fr] gap-0">
                
                {/* IZQUIERDA: Título Poético */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col justify-center items-center md:items-start p-8 md:p-10 md:border-r border-[#e8e0d8]/40 text-center md:text-left"
                >
                  <h3 className="font-script text-3xl md:text-4xl text-stone-800 mb-2 leading-tight">
                    El clima durante nuestra boda
                  </h3>
                </motion.div>

                {/* CENTRO: Pronóstico de Días */}
                <div className="p-6 md:p-8 overflow-x-auto md:overflow-visible">
                  <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 min-w-max md:min-w-0">
                    {weatherData.map((day, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.2 + (index * 0.08),
                          ease: "easeOut"
                        }}
                        className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-0"
                      >
                        {/* Día */}
                        <span className="text-[10px] uppercase font-sans-clean text-[#7a8269] tracking-[0.15em] font-medium">
                          {day.day}
                        </span>
                        
                        {/* Fecha */}
                        <span className="text-[11px] font-serif-elegant text-[#9a8c7e]">
                          {day.date}
                        </span>
                        
                        {/* Ícono */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-white to-[#f5f2ed] rounded-full opacity-40" />
                          <WeatherIcon 
                            code={day.iconCode} 
                            className="relative w-12 h-12 md:w-14 md:h-14"
                          />
                        </div>
                        
                        {/* Temperaturas */}
                        <div className="text-center space-y-0.5">
                          <div className="text-lg md:text-xl font-serif-display text-[#5f6d4f]">
                            {day.temp}°
                          </div>
                          <div className="text-[11px] text-[#9a8c7e] font-serif-elegant">
                            {day.minTemp}°
                          </div>
                        </div>

                        {/* Descripción (solo en desktop) */}
                        <p className="hidden md:block text-[10px] text-[#9a8c7e] font-serif-elegant text-center capitalize max-w-[70px] leading-tight">
                          {day.description.split(' ').slice(0, 2).join(' ')}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DERECHA: Mensaje Elegante */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col justify-center items-center p-8 md:p-10 md:border-l border-[#e8e0d8]/40 bg-gradient-to-br from-[#fdfcfb] to-[#f9f8f6]"
                >
                  {/* Temperatura destacada */}
                  <div className="text-center mb-4">
                    <div className="text-5xl md:text-6xl font-serif-display text-[#7a8269] leading-none">
                      {currentTemp}°
                    </div>
                    <p className="font-serif-elegant text-xs text-[#9a8c7e] mt-2 tracking-wider">
                      Temperatura promedio
                    </p>
                  </div>
                </motion.div>

              </div>
            )}
          </div>

          {/* Nota sutil */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center text-[10px] text-[#9a8c7e] font-serif-elegant mt-6 italic"
          >
          </motion.p>
        </motion.div>
        
        {/* Separador inferior */}
        <div className="w-[1px] h-4 bg-[#d4c5b9]/30 mx-auto mt-6" />
      </section>

      {/* Decorative Image Section before Mesa de Regalos */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <motion.div {...fadeInUp} className="flex justify-center mb-8">
          <div className="bg-white p-2 pb-10 shadow-lg -rotate-2 border border-stone-100 w-full max-w-[350px] md:max-w-[400px]">
            <div className="overflow-hidden opacity-80">
              <img src={asset('foto3.jpeg')} alt="Detail" decoding="async" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }} />
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
          <p className="font-breathing text-3xl md:text-4xl text-[#8b7d70] italic leading-relaxed">
            Somos tú y yo
          </p>
        </motion.div>
      </section>

      {/* RECOMENDACIONES PARA EL EVENTO */}
      <section className="py-24 px-6 border-t border-stone-200 bg-[#f5f0eb]">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            {...fadeInUp}
            className="font-script text-4xl md:text-5xl text-stone-800 mb-6 text-center"
          >
            Recomendaciones para el magno evento
          </motion.h2>
          
          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-lg shadow-sm border border-stone-200 p-8 md:p-12 space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Recuerda que es una <strong>boda maratónica</strong>
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Desayuna muy bien
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Durante el día hará <strong>calor</strong>
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Durante la tarde/noche hará <strong>frío</strong>
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Trae <strong>zapatos cómodos</strong> (es jardín y se pondrá húmedo)
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Trae <strong>abrigo</strong> y prepárate para la neblina (Tepic Londinense)
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Puedes llegar en taxi, Uber, didi, indriver
              </p>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5f6d4f] mt-2"></div>
              <p className="font-serif-elegant text-base md:text-lg text-stone-700">
                Habrá <strong>vallet parking</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MESA DE REGALOS */}
      <section id="regalos" className="py-32 px-6 bg-gradient-to-br from-[#3e3d3b] via-[#4a4847] to-[#3e3d3b] text-white relative flex flex-col items-center overflow-hidden">
         <div className="absolute inset-0 opacity-5">
           <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="gift-bg" decoding="async" loading="lazy" />
        </div>
        
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent mb-12" />
        
        <motion.h2 {...fadeInUp} className="font-script text-6xl md:text-7xl mb-4 text-white text-center">
          Sugerencia de regalo
        </motion.h2>

        <br />
        
        <motion.p {...fadeInUp} className="font-serif-elegant text-base md:text-lg text-white/90 max-w-2xl text-center mb-12 leading-relaxed">
          Tu presencia es el regalo más importante para nosotros. Si desean hacernos un detalle, les agradecemos muchísimo nos apoyen a crear recuerdos en nuestra luna de miel
        </motion.p>

        {/* BBVA - Tarjeta Bancaria Visual */}
        <motion.div 
          {...fadeInUp} 
          className="relative w-full min-w-[311px] max-w-[360px] h-[227px] rounded-[10px] box-border p-6 grid grid-rows-[1fr_auto] shadow-[0_0px_8px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.12),0_12px_28px_rgba(0,0,0,0.12)] mb-6 z-10"
          style={{
            background: 'linear-gradient(135deg, #2a2a2a 0%, #404040 50%, #1a1a1a 100%)',
            backgroundSize: '360px 227px',
            color: 'white',
            fontFamily: 'AxLLCircular, Helvetica, Arial, sans-serif',
            animation: 'cardAnimation 10s infinite',
            transform: 'translateZ(0)'
          }}
        >
          {/* ::before pseudo-element - Sombra interna */}
          <div 
            className="absolute inset-0 rounded-[10px] pointer-events-none z-[1]"
            style={{
              boxShadow: '0 -1px 0 0 rgba(255, 255, 255, 0.9), 0 1px 0 0 rgba(0, 0, 0, 0.2)'
            }}
          />
          
          {/* ::after pseudo-element - Gradiente holográfico animado */}
          <div 
            className="absolute inset-0 rounded-[10px] pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.02) 30%, rgba(255, 255, 255, 0.25) 40%, rgba(255, 255, 255, 0.08) 40%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3))',
              backgroundSize: '150% 150%',
              animation: 'cardGradient 45s ease-in-out infinite',
              transform: 'translateZ(0)'
            }}
          />
          
          {/* card-top */}
          <div className="flex justify-between items-start z-[1] relative">
            <span className="text-sm uppercase tracking-[1.5px] font-medium text-white/90">
              Débito
            </span>
            <img 
              src={asset('/bbva.png')} 
              alt="BBVA" 
              className="h-[40px]"
              style={{
                filter: 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.3)) drop-shadow(0 2px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0px 0px 12px rgba(255, 255, 255, 1))'
              }}
            />
          </div>
          
          {/* card-bottom */}
          <div className="flex justify-between z-[1] relative">
            <div className="grid gap-2">
              <p className="m-0 text-[10px] uppercase font-medium tracking-[1.5px]">
                Tarjeta
              </p>
              <p className="m-0 text-base tracking-[1.5px] font-bold max-w-[232px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ textShadow: '0 0px 8px rgba(0, 0, 0, 0.12)' }}>
                4152 3144 8797 9604
              </p>
              <p className="m-0 text-[10px] uppercase font-medium tracking-[1.5px]">
                Titular
              </p>
              <p className="m-0 text-sm tracking-[1.5px] font-bold leading-tight" style={{ textShadow: '0 0px 8px rgba(0, 0, 0, 0.12)' }}>
                Citli Daniela Rios González
              </p>
            </div>
          </div>
        </motion.div>

        {/* Separador delicado */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent my-12" />

        {/* Banamex - Tarjeta Bancaria Visual */}
        <motion.div 
          {...fadeInUp} 
          className="relative w-full min-w-[311px] max-w-[360px] h-[227px] rounded-[10px] box-border p-6 grid grid-rows-[1fr_auto] shadow-[0_0px_8px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.12),0_12px_28px_rgba(0,0,0,0.12)] mb-6 z-10"
          style={{
            background: 'linear-gradient(135deg, #2a2a2a 0%, #404040 50%, #1a1a1a 100%)',
            backgroundSize: '360px 227px',
            color: 'white',
            fontFamily: 'AxLLCircular, Helvetica, Arial, sans-serif',
            animation: 'cardAnimation 10s infinite',
            transform: 'translateZ(0)'
          }}
        >
          {/* ::before pseudo-element - Sombra interna */}
          <div 
            className="absolute inset-0 rounded-[10px] pointer-events-none z-[1]"
            style={{
              boxShadow: '0 -1px 0 0 rgba(255, 255, 255, 0.9), 0 1px 0 0 rgba(0, 0, 0, 0.2)'
            }}
          />
          
          {/* ::after pseudo-element - Gradiente holográfico animado */}
          <div 
            className="absolute inset-0 rounded-[10px] pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.02) 30%, rgba(255, 255, 255, 0.25) 40%, rgba(255, 255, 255, 0.08) 40%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3))',
              backgroundSize: '150% 150%',
              animation: 'cardGradient 45s ease-in-out infinite',
              transform: 'translateZ(0)'
            }}
          />
          
          {/* card-top */}
          <div className="flex justify-between items-start z-[1] relative">
            <span className="text-sm uppercase tracking-[1.5px] font-medium text-white/90">
              Débito
            </span>
            <img 
              src={asset('/banamex-logo.png')} 
              alt="Banamex" 
              className="h-[40px]"
              style={{
                filter: 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.3)) drop-shadow(0 2px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0px 0px 12px rgba(255, 255, 255, 1))'
              }}
            />
          </div>
          
          {/* card-bottom */}
          <div className="flex justify-between z-[1] relative">
            <div className="grid gap-2">
              <p className="m-0 text-[10px] uppercase font-medium tracking-[1.5px]">
                CLABE
              </p>
              <p className="m-0 text-base tracking-[1.5px] font-bold max-w-[232px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ textShadow: '0 0px 8px rgba(0, 0, 0, 0.12)' }}>
                002180700905308698
              </p>
              <p className="m-0 text-[10px] uppercase font-medium tracking-[1.5px]">
                Titular
              </p>
              <p className="m-0 text-sm tracking-[1.5px] font-bold leading-tight" style={{ textShadow: '0 0px 8px rgba(0, 0, 0, 0.12)' }}>
                Amed Francisco Hernández Miranda
              </p>
            </div>
          </div>
        </motion.div>

        {/* Separador delicado */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent my-12" />

        {/* Mensaje introducción */}
        <motion.div {...fadeInUp} className="max-w-2xl text-center mb-16 z-10">
          <p className="font-serif-elegant text-lg md:text-xl text-white/90 leading-relaxed mb-12">
            Si realizan sus compras, pueden dar nuestro número de evento.<br />
            <span className="text-sm text-white/60 italic">No es necesario que nos compren regalos, pueden usarlo en sus propias compras</span>
          </p>

          {/* Cards de tiendas departamentales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.a
              {...fadeInUp}
              href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51778525"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-500 ease-out cursor-pointer block min-h-[320px] flex flex-col justify-between items-center overflow-hidden touch-manipulation active:scale-[0.98] hover:scale-[1.02]"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                willChange: 'transform, box-shadow'
              }}
            >
              {/* Resplandor de fondo al hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenedor del logo */}
              <div className="flex-1 flex items-center justify-center w-full py-8 relative z-10">
                <div className="transform transition-transform duration-500 group-hover:scale-110 group-active:scale-105">
                  <img 
                    src={asset("/liverpool-logo.png")} 
                    alt="Liverpool" 
                    className="max-w-full max-h-36 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              
              {/* Información del evento */}
              <div className="w-full text-center pt-8 border-t-2 border-white/20 group-hover:border-white/40 transition-colors duration-500 relative z-10">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-3 font-sans-clean">
                  Número de evento
                </p>
                <p className="font-sans-clean text-3xl md:text-4xl tracking-wider text-white group-hover:text-white/95 transition-colors duration-300">
                  51778525
                </p>
              </div>
              
              {/* Indicador de clic sutil */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-300" />
            </motion.a>

            <motion.a
              {...fadeInUp}
              href="https://www.elpalaciodehierro.com/buscar?eventId=401633"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-500 ease-out cursor-pointer block min-h-[320px] flex flex-col justify-between items-center overflow-hidden touch-manipulation active:scale-[0.98] hover:scale-[1.02]"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                willChange: 'transform, box-shadow'
              }}
            >
              {/* Resplandor de fondo al hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Contenedor del logo */}
              <div className="flex-1 flex items-center justify-center w-full py-8 relative z-10">
                <div className="transform transition-transform duration-500 group-hover:scale-110 group-active:scale-105">
                  <img 
                    src={asset("/logo-palacio-de-hierro-removebg-preview.png")} 
                    alt="Palacio de Hierro" 
                    className="max-w-full max-h-44 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              
              {/* Información del evento */}
              <div className="w-full text-center pt-8 border-t-2 border-white/20 group-hover:border-white/40 transition-colors duration-500 relative z-10">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-3 font-sans-clean">
                  Número de evento
                </p>
                <p className="font-sans-clean text-3xl md:text-4xl tracking-wider text-white group-hover:text-white/95 transition-colors duration-300">
                  401633
                </p>
              </div>
              
              {/* Indicador de clic sutil */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>
        
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 via-transparent to-transparent mt-16" />
      </section>

      {/* RSVP SECTION */}
      <section id="rsvp" className="py-20 px-6 flex flex-col items-center bg-[#faf8f5]">
        <motion.div {...fadeInUp} className="w-full max-w-xl flex flex-col items-center">
          <div className="mb-8 text-center space-y-4">
            <h2 className="font-script text-5xl md:text-7xl text-stone-800 leading-tight drop-shadow-sm">Favor de Confirmar tu Asistencia</h2>
          </div>
          
          <div className="w-full bg-transparent overflow-hidden mb-12">
            <iframe 
              src="https://tally.so/embed/0Q72OB?hideTitle=1&transparentBackground=1" 
              loading="lazy" 
              width="100%" 
              height="450" 
              frameBorder="0" 
              title="Confirmación de Asistencia"
              className="w-full min-h-[450px]"
            />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="pt-24 pb-12 px-6 flex flex-col items-center gap-6 bg-[#faf8f5]">
        <div className="w-full max-w-4xl bg-white p-6 shadow-lg border border-stone-200">
           <div className="w-full overflow-hidden">
              <img src={asset('foto17.jpeg')} className="w-full h-auto object-cover" alt="Footer photo" decoding="async" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center center', objectFit: 'cover' }} />
           </div>
        </div>
        <a 
          href="https://invitacionesdigitalesmty.com.mx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-serif-elegant text-xs tracking-[0.2em] text-[#9a8c7e] hover:text-[#7a8269] uppercase text-center transition-colors"
        >
          Hecho por invitacionesdigitalesmty.com.mx
        </a>
      </footer>
    </div>
    </>
  );
};

export default InvitationContent;
