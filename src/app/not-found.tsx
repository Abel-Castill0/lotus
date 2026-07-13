"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-[#0a0a0f]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl md:text-9xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
            404
          </div>
          <div className="text-6xl mb-6">🗾</div>
          <h1 className="font-heading text-2xl md:text-3xl tracking-wider text-white mb-4">
            TOMO PERDIDO
          </h1>
          <p className="text-gray-400 font-body mb-8 max-w-md mx-auto">
            Parece que este tomo no esta en nuestra coleccion. Puede que haya
            sido trasladado a otra dimension...
          </p>
          <Link href="/">
            <AnimatedButton variant="primary" size="lg">
              Volver al Inicio
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>

      {/* Floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {["📚", "🌸", "⭐", "🌀", "🎌"][i]}
        </motion.div>
      ))}
    </div>
  );
}
