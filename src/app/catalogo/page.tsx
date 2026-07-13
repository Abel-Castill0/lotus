"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import { products, genres, priceRanges } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("todos");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("popularidad");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedGenre !== "todos") result = result.filter((p) => p.genre === selectedGenre);
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    switch (sortBy) {
      case "precio-asc": result.sort((a, b) => a.price - b.price); break;
      case "precio-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "novedades": result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [search, selectedGenre, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl md:text-6xl tracking-wider text-lotus-smoke mb-2">CATALOGO</h1>
          <p className="text-lotus-mist font-body">Explora nuestra coleccion completa de mangas</p>
          <div className="w-20 h-1 bg-gradient-to-r from-lotus-lavender to-lotus-pink rounded-full mt-4" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 p-4 bg-[#111118] rounded-2xl border border-white/[0.04]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lotus-mist/40" />
              <input type="text" placeholder="Buscar mangas, autores..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-lotus w-full pl-10 pr-4 py-2.5 text-sm" />
            </div>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="input-lotus px-4 py-2.5 text-sm">
              {genres.map((g) => <option key={g} value={g} className="capitalize bg-[#111118]">{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
            </select>
            <select value={selectedPriceRange ?? ""} onChange={(e) => setSelectedPriceRange(e.target.value === "" ? null : Number(e.target.value))} className="input-lotus px-4 py-2.5 text-sm">
              <option value="" className="bg-[#111118]">Todos los precios</option>
              {priceRanges.map((r, i) => <option key={i} value={i} className="bg-[#111118]">{r.label}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-lotus px-4 py-2.5 text-sm">
              <option value="popularidad" className="bg-[#111118]">Popularidad</option>
              <option value="novedades" className="bg-[#111118]">Novedades</option>
              <option value="precio-asc" className="bg-[#111118]">Precio: Menor a Mayor</option>
              <option value="precio-desc" className="bg-[#111118]">Precio: Mayor a Menor</option>
              <option value="rating" className="bg-[#111118]">Mejor valorados</option>
            </select>
            <div className="flex gap-2">
              <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-lotus-lavender text-[#0A0A0F]" : "bg-[#0A0A0F]/40 text-lotus-mist/40 hover:text-lotus-smoke"}`}>
                <Grid size={16} />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-lotus-lavender text-[#0A0A0F]" : "bg-[#0A0A0F]/40 text-lotus-mist/40 hover:text-lotus-smoke"}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 text-sm text-lotus-mist/50">{filteredProducts.length} productos encontrados</div>

        {filteredProducts.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "grid grid-cols-1 gap-6"}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lotus-mist/50 text-lg font-body">No se encontraron productos con esos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
