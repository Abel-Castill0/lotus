"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";

const tips = [
  "Prueba el cupon LOTUS10 para 10% de descuento!",
  "Ya viste las novedades de esta semana?",
  "Los mangas de segunda mano tienen precio especial!",
  "Agrega a tu wishlist y no pierdas tus favoritos!",
  "El cupon MANGA20 te da 20% de descuento!",
  "Siguenos en redes para enterarte de promos exclusivas!",
  "Los pedidos mayores a S/100 tienen envio gratis!",
  "Nuevos capitulos de One Piece cada semana!",
];

const quotes = [
  "Dattebayo! - Naruto",
  "Nakama! - One Piece",
  "Voy a ser el Rey de los Piratas! - Luffy",
  "El exito solo pertenece a quien se prepara - Gojo",
  "Mada mada dane... - Ryoma Echizen",
  "Mi cuerpo arde! - Benimaru",
  "Omae wa mou shindeiru - Kenshiro",
  "Plus Ultra! - All Might",
];

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function GuideCharacter() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [partyMode, setPartyMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const keySequence = useRef<string[]>([]);

  useEffect(() => {
    const dismissedVal = localStorage.getItem("lotus-guide-dismissed");
    const mutedVal = localStorage.getItem("lotus-muted");
    if (dismissedVal === "true") setDismissed(true);
    if (mutedVal === "false") setMuted(false);
  }, []);

  // Konami Code
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      keySequence.current = [...keySequence.current, e.key].slice(-10);
      if (keySequence.current.join(",") === KONAMI_CODE.join(",")) {
        setPartyMode(true);
        setTimeout(() => setPartyMode(false), 5000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Console quotes
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`%c🌸 ${randomQuote}`, "color: #a855f7; font-size: 14px; font-weight: bold;");
  }, []);

  // Rotate tips
  useEffect(() => {
    if (!visible || dismissed) return;
    const timer = setInterval(() => {
      setCurrentTip((p) => (p + 1) % tips.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [visible, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    localStorage.setItem("lotus-guide-dismissed", "true");
  };

  const toggleMute = () => {
    const newVal = !muted;
    setMuted(newVal);
    localStorage.setItem("lotus-muted", String(newVal));
  };

  if (dismissed) return null;

  // Party mode confetti
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {["🌸", "⭐", "✨", "🎌", "💖", "📚"][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      {partyMode && <Confetti />}

      {/* Sound toggle */}
      <button
        onClick={toggleMute}
        className="fixed bottom-24 right-4 z-50 p-2.5 rounded-full bg-[#111118] border border-white/[0.06] text-lotus-mist hover:text-lotus-lavender hover:border-lotus-lavender/30 transition-all shadow-lg"
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Guide character */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-4 right-4 z-50 flex items-end gap-2"
          >
            {/* Speech bubble */}
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative bg-[#111118] border border-white/[0.06] rounded-xl px-4 py-2.5 max-w-[200px] shadow-xl"
            >
              <p className="text-xs text-lotus-mist font-manga leading-relaxed">
                {tips[currentTip]}
              </p>
              <div className="absolute -bottom-2 right-6 w-3 h-3 bg-[#111118] border-r border-b border-white/[0.06] transform rotate-45" />
            </motion.div>

            {/* Chibi character */}
            <div className="relative flex-shrink-0">
              <button
                onClick={handleDismiss}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-10"
              >
                <X size={8} className="text-white" />
              </button>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setCurrentTip((p) => (p + 1) % tips.length)}
              >
                🧙‍♂️
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
