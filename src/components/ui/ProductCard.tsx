"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, slugify } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import AnimeImage from "./AnimeImage";
import { fallbackImages } from "@/lib/animeImages";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.productId === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem(product);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
    toast.success(`${product.title} anadido al carrito`, {
      icon: "📚",
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative bg-[#111118] rounded-2xl overflow-hidden border border-lotus-lavender/15 transition-all duration-500 hover:-translate-y-2 hover:border-lotus-pink/50 hover:shadow-[0_16px_48px_rgba(255,77,140,0.16)]">
        {/* Cover Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: isHovered
                ? "perspective(800px) rotateY(-6deg) rotateX(2deg) scale(1.04)"
                : "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)",
            }}
          >
            <AnimeImage
              src={product.coverImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              fallback={fallbackImages.productPlaceholder}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-70" />

          {/* Genre badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-lotus-lavender/90 text-[#0A0A0F] rounded-full">
              {product.genre}
            </span>
          </div>

          {/* Stock */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-[10px] font-bold rounded-full backdrop-blur-sm ${
                product.stock > 10
                  ? "bg-green-500/15 text-green-400"
                  : product.stock > 0
                  ? "bg-yellow-500/15 text-yellow-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {product.stock > 10 ? "En stock" : product.stock > 0 ? `Ultimas ${product.stock}` : "Agotado"}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-[#0A0A0F]/40 flex items-center justify-center"
          >
            <Link
              href={`/manga/${slugify(product.title)}`}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl text-white text-sm font-medium flex items-center gap-2 hover:bg-white/15 transition-colors"
            >
              <Eye size={16} />
              Ver detalle
            </Link>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-0.5 mb-2 group/stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? "text-lotus-gold fill-lotus-gold transition-transform group-hover/stars:rotate-[18deg]"
                    : "text-white/10"
                }
              />
            ))}
            <span className="text-[10px] text-lotus-mist ml-1">{product.rating}</span>
          </div>

          <h3 className="font-heading text-base tracking-wide text-lotus-smoke mb-1 line-clamp-1 group-hover:text-lotus-lavender transition-colors">
            {product.title}
          </h3>
          <p className="text-[11px] text-lotus-mist mb-2">{product.author}</p>
          <p className="text-[11px] text-lotus-mist/60 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-lotus-pink">
              {formatPrice(product.price)}
            </span>

            {quantity > 0 ? (
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="p-1.5 rounded-lg bg-lotus-lavender/10 text-lotus-lavender hover:bg-lotus-lavender/20 transition-all"
                >
                  <Minus size={14} />
                </motion.button>
                <span className="text-sm text-white font-medium w-6 text-center">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-1.5 rounded-lg bg-lotus-lavender/10 text-lotus-lavender hover:bg-lotus-lavender/20 transition-all"
                >
                  <Plus size={14} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="ink-ripple-btn p-2.5 bg-[#FF4D8C] rounded-full text-white hover:shadow-neon-pink transition-all"
              >
                <ShoppingCart size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
