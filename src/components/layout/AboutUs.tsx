"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimeImage from "@/components/ui/AnimeImage";
import { fallbackImages } from "@/lib/animeImages";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  { title: "Una colección que crece contigo", description: "Selección curada para descubrir historias, autores y mundos a los que siempre quieres volver.", stat: "5 000+", label: "títulos disponibles", image: fallbackImages.about1, accent: "text-lotus-lavender" },
  { title: "Del estante a tu puerta", description: "Empacamos cada tomo con cuidado para que la emoción de abrirlo llegue intacta a cualquier rincón del Perú.", stat: "100%", label: "cobertura nacional", image: fallbackImages.about2, accent: "text-lotus-pink" },
  { title: "Un punto de encuentro otaku", description: "Recomendaciones honestas, lanzamientos esperados y una comunidad que disfruta hablar de manga tanto como tú.", stat: "10K+", label: "lectores activos", image: fallbackImages.about3, accent: "text-lotus-gold" },
  { title: "Ediciones que dan ganas de conservar", description: "Trabajamos con ediciones oficiales y revisamos cada pedido antes de enviarlo.", stat: "4.9", label: "valoración media", image: fallbackImages.about4, accent: "text-lotus-lavender" },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-about-copy]").forEach((copy) => {
        gsap.fromTo(copy, { clipPath: "inset(0 100% 0 0)", y: 28 }, { clipPath: "inset(0 0% 0 0)", y: 0, duration: .7, ease: "power3.out", scrollTrigger: { trigger: copy, start: "top 75%" } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return <section ref={sectionRef} className="relative" aria-labelledby="about-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-10">
      <p className="font-manga text-lotus-pink text-lg mb-3">私たちについて · Quiénes somos</p>
      <h2 id="about-title" className="font-heading text-4xl md:text-6xl tracking-[.06em] text-lotus-smoke max-w-3xl">MANGA PARA LEER, COLECCIONAR Y COMPARTIR</h2>
    </div>
    <div className="space-y-10 md:space-y-16">
      {moments.map((moment, index) => <article key={moment.title} className="relative min-h-[68svh] md:min-h-[76svh] overflow-hidden">
        <AnimeImage src={moment.image} alt="Ilustración anime original de Lotus Manga Store" fill sizes="100vw" className="object-cover opacity-75" fallback={fallbackImages.hero} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/75 to-[#0A0A0F]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[68svh] md:min-h-[76svh] flex items-end py-12 md:py-20"><div data-about-copy className="max-w-xl anime-surface rounded-[1.5rem] p-6 md:p-9 shadow-2xl">
          <p className={`font-heading text-4xl tracking-[.08em] ${moment.accent}`}>{moment.stat}</p><p className="text-xs text-lotus-mist mb-5">{moment.label}</p><h3 className="font-heading text-3xl md:text-5xl tracking-[.06em] text-lotus-smoke mb-4">{moment.title}</h3><p className="text-lotus-mist leading-relaxed">{moment.description}</p><span className="mt-6 inline-block font-manga text-sm text-lotus-smoke">Escena {String(index + 1).padStart(2, "0")}</span>
        </div></div>
      </article>)}
    </div>
  </section>;
}
