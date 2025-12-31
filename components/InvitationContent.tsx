
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

const InvitationContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number>(25);
  const [loading, setLoading] = useState(true);

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
        
        // FALLBACK: Mostrar datos estimados
        console.log('🔄 Usando datos de fallback (estimados para marzo 2026)');
        const fallbackData: WeatherDay[] = [
          { day: 'MIÉ', date: '26', temp: 28, minTemp: 18, description: 'Soleado', iconCode: '01d' },
          { day: 'JUE', date: '27', temp: 27, minTemp: 17, description: 'Parcialmente nublado', iconCode: '02d' },
          { day: 'VIE', date: '28', temp: 29, minTemp: 19, description: 'Soleado', iconCode: '01d' },
          { day: 'SÁB', date: '29', temp: 28, minTemp: 18, description: 'Parcialmente nublado', iconCode: '02d' },
          { day: 'DOM', date: '30', temp: 30, minTemp: 19, description: 'Soleado', iconCode: '01d' }
        ];
        
        setWeatherData(fallbackData);
        setCurrentTemp(28);
        console.log('✅ Fallback data cargada');
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
    <div className="w-full bg-[#faf8f5] min-h-screen font-serif-elegant selection:bg-[#e8e0d8]/40">
      
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-[60] bg-[#faf8f5]/95 backdrop-blur-sm shadow-sm border-b border-[#e8e0d8]/30">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-[#5f6d4f] hover:opacity-60 transition-opacity p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
        <img src="/Logo Citli y Amed .png" alt="C&A" className="h-16 w-auto" />
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
                <img src="/Logo Citli y Amed .png" alt="C&A" className="h-16 w-auto" />
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
            src="/fondo.png"
            className="w-full h-full object-cover opacity-95"
            alt="bg"
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
          className="mt-10 mb-8 font-script text-5xl md:text-7xl text-[#9C968E] opacity-60"
        >
          save the date
        </motion.p>

        {/* Polaroid */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="bg-white p-4 pb-16 max-w-[340px] md:max-w-[420px] border border-black/10 shadow-[0_28px_55px_-38px_rgba(0,0,0,0.35)]"
        >
          <div className="aspect-[3/4] overflow-hidden grayscale contrast-125">
            <img src="/foto1.png" className="w-full h-full object-cover" alt="Couple" />
          </div>
        </motion.div>

        {/* Tarjeta inferior (overlap editorial) */}
        <motion.div
          {...fadeInUp}
          className="w-full max-w-[420px] text-center mt-[-22px] pt-10 pb-8 px-6 bg-[#F3EFE8]/70 backdrop-blur-[4px] border border-black/5 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.45)]"
        >
          <h1 className="text-4xl md:text-6xl font-serif-display tracking-[0.12em] text-[#2B2B2B] uppercase">
            Citli & Amed
          </h1>
          <p className="font-script text-2xl md:text-3xl text-[#5f6d4f] italic tracking-wide mt-2">
            Tepic, Nayarit
          </p>
          <div className="text-lg md:text-xl font-serif-elegant tracking-[0.35em] text-[#9C968E] mt-4">
            28 · 03 · 2026
          </div>
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
        <div className="absolute inset-0 bg-[#f5f2ed]/70 z-0" />

        <div className="w-[1px] h-12 bg-stone-400 mb-8 opacity-40 z-10 relative" />
        
        <motion.div {...fadeInUp} className="space-y-16 z-10 relative max-w-5xl mx-auto">
          <p className="font-script text-4xl md:text-5xl text-[#7a8269] mb-12 italic drop-shadow-sm">Con la bendición de nuestros padres</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-4">
              <p className="font-serif-elegant text-xl md:text-2xl text-[#5f6d4f] tracking-[0.1em] leading-snug">Luis Armando Rios Magallanes</p>
              <p className="font-serif-elegant text-xl md:text-2xl text-[#5f6d4f] tracking-[0.1em] leading-snug">Karla Esther González Cedano</p>
            </div>
            <div className="space-y-4">
              <p className="font-serif-elegant text-xl md:text-2xl text-[#5f6d4f] tracking-[0.1em] leading-snug">Víctor Hugo Hernández de los Santos</p>
              <p className="font-serif-elegant text-xl md:text-2xl text-[#5f6d4f] tracking-[0.1em] leading-snug">Margarita Araceli Miranda de Santiago</p>
            </div>
          </div>
        </motion.div>

        <div className="w-[1px] h-12 bg-stone-400 mt-16 opacity-40 z-10 relative" />
      </section>

      {/* ITINERARIO */}
      <section id="itinerario" className="pt-16 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-script text-4xl md:text-5xl text-[#9a8c7e] mb-16">Itinerario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          {/* Ceremonia Religiosa */}
          <motion.div {...fadeInUp} className="matchbox-card p-8 flex flex-col text-center">
            <div className="w-full h-56 mb-6 overflow-hidden flex items-center justify-center bg-stone-50">
              <img src="iglesia.png" className="w-full h-full object-contain grayscale" alt="Iglesia" />
            </div>
            <h3 className="font-serif-display text-2xl tracking-wider uppercase mb-4 text-[#5f6d4f]">Ceremonia Religiosa</h3>
            <p className="font-serif-elegant italic text-[#9a8c7e] mb-6 text-lg">13:00 H</p>
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
            <div className="w-full h-56 mb-6 overflow-hidden flex items-center justify-center bg-stone-50">
              <img src="ceremonia.png" className="w-full h-full object-contain grayscale" alt="Ceremonia" />
            </div>
            <h3 className="font-serif-display text-2xl tracking-wider uppercase mb-4 text-[#5f6d4f]">Ceremonia Civil y Recepción</h3>
            <p className="font-serif-elegant italic text-[#9a8c7e] mb-6 text-lg">15:00 H</p>
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

      {/* DRESS CODE SECTION - Pinterest Board Embed */}
      <div id="dresscode">
        <DressCodeSection />
      </div>

      {/* CLIMA NAYARIT - Diseño Editorial Horizontal */}
      <section className="relative py-16 px-6 overflow-hidden bg-gradient-to-br from-[#f5f2ed] via-[#faf8f5] to-[#f0ede8]">
        {/* Separador superior */}
        <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mb-12" />
        
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
                  <h3 className="font-script text-3xl md:text-4xl text-[#7a8269] mb-2 leading-tight">
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
                          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e5] via-[#f5f8f3] to-[#faf8f5] rounded-full shadow-md border border-[#d4c5b9]/30" />
                          <img 
                            src={`https://openweathermap.org/img/wn/${day.iconCode}@2x.png`}
                            alt={day.description}
                            className="relative w-14 h-14 md:w-16 md:h-16 drop-shadow-lg"
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
        <div className="w-[1px] h-8 bg-[#d4c5b9]/30 mx-auto mt-12" />
      </section>

      {/* HOSPEDAJE */}
      <section id="hospedaje" className="py-24 px-6 max-w-3xl mx-auto">
        {/* Decorative Image at Top */}
        <motion.div {...fadeInUp} className="flex justify-start pl-4 mb-16">
          <div className="bg-white p-2 pb-10 shadow-lg rotate-1 border border-stone-100 max-w-[400px]">
            <div className="aspect-square overflow-hidden grayscale opacity-80">
              <img src="foto4.png?auto=format&fit=crop&q=80&w=800" alt="Detail" />
            </div>
          </div>
        </motion.div>

        <div className="pl-4">
          <h3 className="font-serif-display text-4xl tracking-[0.05em] text-[#5f6d4f] uppercase mb-16">
            Hoteles
          </h3>
          
          <div className="space-y-16">
            {/* Hotel Fray */}
            <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
              <span className="font-script text-4xl text-[#8b7d70] leading-none">
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

            {/* Hotel La Loma */}
            <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
              <span className="font-script text-4xl text-[#8b7d70] leading-none">
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

            {/* Hotel Fray Select */}
            <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
              <span className="font-script text-4xl text-[#8b7d70] leading-none">
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

            {/* Airbnb en Tepic */}
            <motion.div {...fadeInUp} className="flex flex-col items-start gap-1">
              <span className="font-script text-4xl text-[#8b7d70] leading-none">
                Airbnb en Tepic
              </span>
              <div className="w-5 h-[1px] bg-stone-400 my-2 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* GASTRONOMÍA */}
      <section id="gastronomia" className="py-24 px-6 border-t border-stone-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-script text-5xl md:text-6xl text-[#c9a69a] mb-12 text-center">Opciones de Restaurantes</h2>
          
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
                  <span className="font-script text-xl text-[#8b7d70]">Tía Martina -</span>
                  <a href="https://maps.app.goo.gl/rYiyd6ALXymyHvT77" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Los borrados -</span>
                  <a href="https://maps.app.goo.gl/VwDaJeXHyas8kRxh7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Petit Brulé -</span>
                  <a href="https://maps.app.goo.gl/CGduoNhL8YxSbth58" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Claudia a la carta -</span>
                  <a href="https://maps.app.goo.gl/UWa7zXA2gwuk82BUA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">El itacqte -</span>
                  <a href="https://maps.app.goo.gl/QayL4ZAXW5TqLndP6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">El itacqte -</span>
                  <a href="https://maps.app.goo.gl/TQkMcRpg3JZMwU4v6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Tacos de birria -</span>
                  <a href="https://maps.app.goo.gl/ytFZ7Q2H3NP7KmGQA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Tacos de birria -</span>
                  <a href="https://maps.app.goo.gl/1uq7dJG1679ND5vG7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Tacos de carnitas -</span>
                  <a href="https://maps.app.goo.gl/PnJYwHX5WNTnQPR46" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Lonchería Mercado -</span>
                  <a href="https://maps.app.goo.gl/Yq3SNnj3uDyfbZZw9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Tortas el güero -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">El mal portado -</span>
                  <a href="https://maps.app.goo.gl/6w641qTu8N7LnaZX7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">El pilón -</span>
                  <a href="https://maps.app.goo.gl/b6AYmKgsAoQPJ4gx8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Matsuri -</span>
                  <a href="https://maps.app.goo.gl/tfqD8iVTuaFXVV7E8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Claudia a la carta -</span>
                  <a href="https://maps.app.goo.gl/UWa7zXA2gwuk82BUA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Juan Carlos Nieves -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">Jejenes & Gardenias -</span>
                  <a href="https://maps.app.goo.gl/M5YhTCCit6pwZSVM7" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Píos -</span>
                  <a href="https://maps.app.goo.gl/xRCu2rgMPR8jKz5C6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">El buen taco -</span>
                  <a href="https://maps.app.goo.gl/6yHE2sugtqmTN3n18" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Pepe yus -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">La madalena -</span>
                  <a href="https://maps.app.goo.gl/aV1jw5CxT5rEUD2x6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Comal -</span>
                  <a href="https://maps.app.goo.gl/1Dp2Mv6PSSktVc4q8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Piloncillo -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">El marlin -</span>
                  <a href="https://maps.app.goo.gl/5XfMzRDCWyXAuJjR6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Matsuri -</span>
                  <a href="https://maps.app.goo.gl/tfqD8iVTuaFXVV7E8" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">El estero -</span>
                  <a href="https://maps.app.goo.gl/GuqUajpHQaFT7g3m6" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">La ola -</span>
                  <a href="https://maps.app.goo.gl/MjEJdiv28x9Y2cq68" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Emilianos -</span>
                  <a href="https://maps.app.goo.gl/5e535RDkoxDfoRTV9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Loma 42 -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">Emilianos -</span>
                  <a href="https://maps.app.goo.gl/5e535RDkoxDfoRTV9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Tango y milonga -</span>
                  <a href="https://maps.app.goo.gl/YS332xmoCa2zpTBt9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Loma 42 -</span>
                  <a href="https://maps.app.goo.gl/YDS7yTwdjcFCyKi1A" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Dos de asada -</span>
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
                  <span className="font-script text-xl text-[#8b7d70]">Pepe yus -</span>
                  <a href="https://maps.app.goo.gl/ub4VGCSEG7bbDuLNA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Neto -</span>
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
                  COFFEE SHOPS
                </h4>
              </div>
              <div className="ml-16 space-y-3">
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Casa 164 -</span>
                  <a href="https://maps.app.goo.gl/JnDkDNhtwWU95Bnz9" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
                <motion.div {...fadeInUp} className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-script text-xl text-[#8b7d70]">Brulé -</span>
                  <a href="https://maps.app.goo.gl/mxAqf1gqCrHQS2edA" target="_blank" rel="noopener noreferrer" className="bg-[#3a3a3a] text-white text-[9px] tracking-[0.2em] px-4 py-1.5 uppercase font-sans-clean hover:bg-[#5a5a5a] transition-colors">UBICACIÓN</a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="mt-16 flex justify-center">
             <div className="bg-white p-2 shadow-md -rotate-2 border border-stone-50 max-w-[320px]">
                <img src="foto3.png?auto=format&fit=crop&q=80&w=400" className="grayscale contrast-125" alt="Cafe" />
             </div>
          </div>
        </div>
      </section>

      {/* MESA DE REGALOS */}
      <section id="regalos" className="py-32 px-6 bg-[#3e3d3b] text-white relative flex flex-col items-center">
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

      {/* RSVP SECTION */}
      <section id="rsvp" className="px-6 flex flex-col items-center bg-[#faf8f5]">
        <motion.div {...fadeInUp} className="w-full max-w-xl flex flex-col items-center">
          <div className="mb-1 text-center space-y-4">
            <h2 className="font-script text-5xl md:text-7xl text-[#7a8269] leading-tight drop-shadow-sm">Favor de Confirmar tu Asistencia</h2>
          </div>
          
          <div className="w-full bg-transparent overflow-hidden">
            <iframe 
              src="https://tally.so/embed/0Q72OB?hideTitle=1&transparentBackground=1" 
              loading="lazy" 
              width="100%" 
              height="250" 
              frameBorder="0" 
              title="Confirmación de Asistencia"
              className="w-full min-h-[200px]"
            />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 flex flex-col items-center gap-6 bg-[#faf8f5]">
        <div className="w-full max-w-4xl bg-white p-6 shadow-lg border border-stone-200">
           <div className="w-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200" className="w-full h-auto object-cover grayscale" alt="Footer photo" />
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
  );
};

export default InvitationContent;
