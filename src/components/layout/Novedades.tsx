"use client";

import { products } from "@/lib/products";
import Carousel3D from "./Carousel3D";

export default function Novedades() {
  const newReleases = products.slice(0, 8);

  return (
    <Carousel3D
      products={newReleases}
      title="NOVEDADES"
      subtitle="LLEGARON PRIMERO"
      accentColor="purple"
    />
  );
}
