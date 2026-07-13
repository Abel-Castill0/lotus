"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6">💥</div>
          <h1 className="font-heading text-3xl md:text-4xl tracking-wider text-white mb-4">
            ALGO SALIO MAL
          </h1>
          <p className="text-gray-400 font-body mb-8 max-w-md mx-auto">
            Incluso los mangas tienen errores de impresion. Intenta de nuevo.
          </p>
          <button
            onClick={reset}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-heading tracking-wider rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
          >
            REINTENTAR
          </button>
        </motion.div>
      </div>
    </div>
  );
}
