import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Contraseña correcta - Puedes cambiarla aquí
  const CORRECT_PASSWORD = 'citliyamed2026';

  useEffect(() => {
    // Verificar si ya está autenticado en esta sesión
    const isAuthenticated = sessionStorage.getItem('wedding_authenticated');
    if (isAuthenticated === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        sessionStorage.setItem('wedding_authenticated', 'true');
        onAuthenticated();
      } else {
        setError(true);
        setPassword('');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="w-full h-screen bg-[#e5e3dd] flex items-center justify-center relative overflow-hidden">
      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Contenedor de tarjeta elegante */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 border border-stone-200/50">
          {/* Ícono decorativo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-[#7a8269]/10 rounded-full flex items-center justify-center"
          >
            <Lock className="w-8 h-8 text-[#7a8269]" strokeWidth={1.5} />
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="font-script text-[#7a8269] text-4xl md:text-5xl mb-3">
              Citli y Amed
            </h1>
            <p className="text-stone-600 text-sm tracking-wider uppercase font-light">
              Invitación Privada
            </p>
          </motion.div>

          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Ingresa la contraseña"
                className="w-full px-4 py-3 bg-white border-2 border-stone-200 rounded-lg 
                         focus:border-[#7a8269] focus:outline-none transition-colors
                         text-stone-700 placeholder:text-stone-400 text-center"
                disabled={isLoading}
                autoFocus
              />
            </div>

            {/* Mensaje de error */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center justify-center gap-2 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Contraseña incorrecta. Inténtalo de nuevo.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de envío */}
            <motion.button
              type="submit"
              disabled={isLoading || password.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-light tracking-wider uppercase text-sm
                         transition-all duration-300 ${
                isLoading || password.length === 0
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-[#7a8269] text-white hover:bg-[#6a7259] shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Acceder a la Invitación'
              )}
            </motion.button>
          </motion.form>

          {/* Mensaje decorativo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center text-stone-500 text-xs mt-6 font-light italic"
          >
            Esta invitación es exclusiva para personas seleccionadas
          </motion.p>
        </div>

        {/* Elemento decorativo inferior */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#7a8269]/5 rounded-full blur-3xl -z-10"
        />
      </motion.div>
    </div>
  );
};

export default PasswordProtection;
