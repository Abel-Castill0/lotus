"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useAuth } from "@/lib/context/AuthContext";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    setWishlistProducts(
      products.filter((p) => wishlist.includes(p.id))
    );
  }, [wishlist]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shuriken-loader" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <p className="text-gray-400 mb-2">Inicia sesion para ver tu wishlist</p>
          <p className="text-gray-500 text-sm mb-6">
            Guarda tus mangas favoritos
          </p>
          <Link
            href="/catalogo"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg inline-block"
          >
            IR AL CATALOGO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Seguir comprando
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart size={24} className="text-pink-400" />
            <h1 className="font-heading text-3xl md:text-5xl tracking-wider text-white">
              WISHLIST
            </h1>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        </motion.div>

        {wishlistLoading ? (
          <div className="flex justify-center py-20">
            <div className="shuriken-loader" />
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">💔</div>
            <p className="text-gray-400 text-lg font-body mb-2">
              Tu wishlist esta tan vacia
            </p>
            <p className="text-gray-500 text-sm mb-8">
              como una sala de entrenamiento sin Goku
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-heading tracking-wider rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
            >
              EXPLORAR CATALOGO
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
