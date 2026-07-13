"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimeImage from "./AnimeImage";

interface MangaReader3DProps {
  open: boolean;
  onClose: () => void;
  title: string;
  pages: string[];
}

export default function MangaReader3D({
  open,
  onClose,
  title,
  pages,
}: MangaReader3DProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  }, [pages.length]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f]/80 backdrop-blur-sm border-b border-purple-500/10">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <h3 className="text-sm text-white font-medium truncate max-w-[300px]">
                {title}
              </h3>
              <p className="text-xs text-gray-500">
                Pagina {currentPage + 1} de {pages.length}
              </p>
            </div>
            <div className="w-10" />
          </div>

          {/* Reader area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Page display */}
            <div className="relative w-full max-w-2xl aspect-[3/4] mx-4">
              <div className="relative w-full h-full perspective-[2000px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{
                      rotateY: -90,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      rotateY: 90,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "visible",
                      transformOrigin: "left center",
                    }}
                  >
                    <AnimeImage
                      src={pages[currentPage]}
                      alt={`Pagina ${currentPage + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />

                    {/* Page shadow overlay */}
                    <div
                      className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"
                      style={{ transform: "translateZ(5px)" }}
                    />
                    <div
                      className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"
                      style={{ transform: "translateZ(5px)" }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Corner curl effect */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full pointer-events-none" />
            </div>

            {/* Navigation buttons */}
            {currentPage > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentPage < pages.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Click zones */}
            <div
              onClick={goPrev}
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w"
            />
            <div
              onClick={goNext}
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e"
            />
          </div>

          {/* Bottom progress */}
          <div className="px-4 py-3 bg-[#0a0a0f]/80 backdrop-blur-sm border-t border-purple-500/10">
            <div className="flex items-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === currentPage
                      ? "flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
