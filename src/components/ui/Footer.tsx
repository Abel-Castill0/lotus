"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Send, Play, MessageCircle } from "lucide-react";

export default function Footer() {
  const [catSays, setCatSays] = useState(false);

  return (
    <footer className="relative bg-[#0A0A0F] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-heading tracking-[0.15em] text-lotus-smoke">
                LOTUS
              </span>
              <span className="block text-[10px] text-lotus-mist/40 tracking-[0.3em]">
                MANGA STORE
              </span>
            </Link>
            <p className="text-sm text-lotus-mist/60 mt-4 leading-relaxed">
              Tu portal al mundo del manga. Mangas, figuras y merchandising de tus series favoritas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm tracking-wider text-lotus-smoke mb-4">TIENDA</h4>
            <ul className="space-y-2">
              {["Catalogo", "Novedades", "Ofertas", "Preventas"].map((item) => (
                <li key={item}>
                  <Link href="/catalogo" className="text-sm text-lotus-mist/50 hover:text-lotus-lavender transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-wider text-lotus-smoke mb-4">GENEROS</h4>
            <ul className="space-y-2">
              {["Shonen", "Shojo", "Seinen", "Josei"].map((item) => (
                <li key={item}>
                  <Link href="/catalogo" className="text-sm text-lotus-mist/50 hover:text-lotus-pink transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-wider text-lotus-smoke mb-4">CONTACTO</h4>
            <ul className="space-y-2">
              <li className="text-sm text-lotus-mist/50">WhatsApp: +51 960 599 967</li>
              <li className="text-sm text-lotus-mist/50">Lima, Peru</li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              {[
                { icon: Globe, label: "Instagram" },
                { icon: Send, label: "Twitter" },
                { icon: Play, label: "Youtube" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="p-2 rounded-xl text-lotus-mist/40 hover:text-lotus-lavender hover:bg-lotus-lavender/5 transition-all" aria-label={label}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-lotus-mist/30">
            2026 Lotus Manga Store. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-lotus-mist/30 font-manga">Hecho con magia anime</span>

            {/* Kitsune easter egg */}
            <div className="relative">
              <button
                onClick={() => setCatSays(!catSays)}
                className="text-xl hover:scale-110 transition-transform"
                aria-label="Easter egg"
              >
                🦊
              </button>
              {catSays && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -top-10 right-0 px-3 py-1 bg-lotus-lavender text-[#0A0A0F] text-xs font-manga rounded-xl whitespace-nowrap"
                >
                  nyaa~!
                  <div className="absolute -bottom-1 right-4 w-2 h-2 bg-lotus-lavender transform rotate-45" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
