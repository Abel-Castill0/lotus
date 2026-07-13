"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";

interface Carousel3DProps {
  products: Product[];
  title: string;
  subtitle: string;
  accentColor?: string;
}

export default function Carousel3D({
  products,
  title,
  subtitle,
  accentColor = "purple",
}: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerWidth(w);
        if (w < 640) setCardWidth(240);
        else if (w < 1024) setCardWidth(280);
        else setCardWidth(300);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const gap = 24;
  const totalCards = products.length;
  const maxIndex = Math.max(0, totalCards - Math.floor(containerWidth / (cardWidth + gap)));

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setActiveIndex(clamped);
      animate(x, -(clamped * (cardWidth + gap)), {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    },
    [maxIndex, cardWidth, x]
  );

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    if (swipe < -50 || velocity < -500) next();
    else if (swipe > 50 || velocity > 500) prev();
  };

  const colorMap: Record<string, string> = {
    purple: "from-purple-500 to-pink-500",
    cyan: "from-cyan-500 to-blue-500",
    pink: "from-pink-500 to-rose-500",
  };

  const textMap: Record<string, string> = {
    purple: "text-purple-400",
    cyan: "text-cyan-400",
    pink: "text-pink-400",
  };

  return (
    <section className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              className={`text-xs font-heading tracking-[0.3em] ${textMap[accentColor] || textMap.purple} mb-2 block`}
            >
              {subtitle}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white mb-4">
              {title}
            </h2>
            <div
              className={`w-20 h-1 bg-gradient-to-r ${colorMap[accentColor] || colorMap.purple} rounded-full`}
            />
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="p-3 rounded-xl border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex >= maxIndex}
              className="p-3 rounded-xl border border-purple-500/20 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -(maxIndex * (cardWidth + gap)),
              right: 0,
            }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="flex gap-6"
          >
            {products.map((product, index) => {
              const distance = Math.abs(index - activeIndex);
              const isActive = index === activeIndex;
              const scale = isActive ? 1 : Math.max(0.85, 1 - distance * 0.05);
              const blur = Math.min(distance * 2, 6);
              const opacity = Math.max(0.5, 1 - distance * 0.15);

              return (
                <motion.div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{
                    width: cardWidth,
                    transform: `scale(${scale})`,
                    filter: isActive ? "none" : `blur(${blur}px)`,
                    opacity,
                    zIndex: totalCards - distance,
                    transition: "transform 0.4s ease, filter 0.4s ease, opacity 0.4s ease",
                  }}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden ${
                      isActive
                        ? "shadow-2xl shadow-purple-500/20 ring-1 ring-purple-500/20"
                        : ""
                    }`}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? `w-8 bg-gradient-to-r ${colorMap[accentColor] || colorMap.purple}`
                  : "w-1.5 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
