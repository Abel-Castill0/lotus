"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="shuriken-loader" />
    </div>
  ),
});

function AnimatedChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="hero-title-char inline-block"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        ".hero-title-char",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.6, ease: "power3.out" },
        0
      );

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" },
          0.3
        );
      }

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
          0.1
        );
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
      }

      if (scrollRef.current) {
        tl.to(scrollRef.current, { opacity: 0, y: -15, duration: 0.3 }, 0.7);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 starfield" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0F]/20 to-[#0A0A0F]" />
      <div className="absolute inset-0 manga-vignette" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          <div ref={badgeRef}>
            <span className="inline-block px-4 py-1.5 text-xs font-heading tracking-[0.35em] text-lotus-lavender border border-lotus-lavender/20 rounded-full bg-lotus-lavender/5 mb-6">
              NUEVA COLECCION 2026
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-7xl md:text-8xl tracking-[0.06em] leading-none mb-6 max-w-full">
            <AnimatedChars
              text="TU PORTAL"
              className="block text-lotus-smoke"
            />
            <AnimatedChars
              text="AL MUNDO MANGA"
              className="block text-lotus-lavender [text-shadow:0_0_24px_rgba(197,163,255,.55)]"
            />
          </h1>

          <div ref={subtitleRef}>
            <p className="text-lotus-mist text-lg md:text-xl mb-8 max-w-lg font-body leading-relaxed">
              Tu universo manga en un solo lugar. Descubre nuestra coleccion de mangas, figuras y merchandising.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Link
              href="/catalogo"
              className="ink-ripple-btn inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D8C] text-white font-heading tracking-[0.15em] rounded-full border border-white/30 hover:shadow-neon-pink transition-all animate-pulse-glow"
            >
              EXPLORAR COLECCION
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-4 border border-lotus-lavender/30 text-lotus-lavender font-heading tracking-[0.15em] rounded-xl hover:bg-lotus-lavender/5 hover:border-lotus-lavender/50 transition-all"
            >
              NOVEDADES
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-lotus-mist/60 font-heading tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-lotus-lavender/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-lotus-lavender rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
