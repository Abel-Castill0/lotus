"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      };
    };

    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-2xl md:text-3xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {value}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">
            {key === "days" ? "dias" : key === "hours" ? "horas" : "min"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Proximamente() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const upcomingProducts = [...products].reverse().slice(0, 4);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-heading tracking-[0.3em] text-pink-400 mb-2 block">
            PROXIMAMENTE
          </span>
          <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white mb-4">
            PROXIMOS LANZAMIENTOS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-6" />
          <div className="bg-[#12121a] border border-purple-500/10 rounded-xl p-4 inline-block">
            <Countdown targetDate="2026-08-15" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
