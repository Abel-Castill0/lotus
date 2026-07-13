"use client";

import { products } from "@/lib/products";
import Carousel3D from "./Carousel3D";

export default function MasVendidos() {
  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <Carousel3D
      products={bestSellers}
      title="MAS VENDIDOS"
      subtitle="LOS FAVORITOS"
      accentColor="cyan"
    />
  );
}
