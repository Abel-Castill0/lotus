"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";

export default function LenisProvider() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return null;
}
