"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimeCharacterLeft() {
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = gsap.to(characterRef.current, {
      y: -6,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      animation.kill();
    };
  }, []);

  return <div ref={characterRef} className="anime-side-character anime-side-character-left hidden md:block" aria-hidden="true"><Image src="/images/fallback/character-left.svg" alt="" width={150} height={260} priority /></div>;
}
