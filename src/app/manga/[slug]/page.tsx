"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, BookOpen, Heart, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { formatPrice, slugify } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useReviews } from "@/lib/hooks/useReviews";
import { useAuth } from "@/lib/context/AuthContext";
import StarRating from "@/components/ui/StarRating";
import MangaReader3D from "@/components/ui/MangaReader3D";
import AuthModal from "@/components/ui/AuthModal";
import AnimeImage from "@/components/ui/AnimeImage";
import { fallbackImages } from "@/lib/animeImages";

export default function MangaDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const product = products.find((p) => slugify(p.title) === params.slug) ?? null;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { reviews, loading: reviewsLoading, addReview } = useReviews(product?.id ?? 0);
  const addItem = useCartStore((s) => s.addItem);
  const [readerOpen, setReaderOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const samplePages = useMemo(
    () => [fallbackImages.hero, fallbackImages.about1, fallbackImages.about2, fallbackImages.about3, fallbackImages.about4],
    []
  );

  const avgRating = useMemo(
    () =>
      reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : product?.rating ?? 0,
    [reviews, product]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-lotus-mist mb-4">Producto no encontrado</p>
          <Link href="/catalogo" className="px-6 py-2.5 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-[#0A0A0F] rounded-xl font-heading tracking-wider">
            Volver al catalogo
          </Link>
        </div>
      </div>
    );
  }

  const handleAddReview = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (newRating === 0) return;
    const result = await addReview(newRating, newComment);
    if ("error" in result) {
      toast.error(result.error as string);
    } else {
      toast.success("Resena publicada!");
      setNewRating(0);
      setNewComment("");
    }
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product.id);
    toast.success(added ? "Anadido a tu wishlist 💖" : "Eliminado de tu wishlist");
  };

  return (
    <>
      <MangaReader3D open={readerOpen} onClose={() => setReaderOpen(false)} title={product.title} pages={samplePages} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-sm text-lotus-mist hover:text-lotus-smoke transition-colors mb-6">
            <ArrowLeft size={16} /> Volver al catalogo
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Cover */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(197,163,255,0.12)]">
                <AnimeImage src={product.coverImage} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-lotus-lavender/90 text-[#0A0A0F] rounded-full">
                    {product.genre}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <h1 className="font-heading text-3xl md:text-5xl tracking-wider text-lotus-smoke mb-2">{product.title}</h1>
              <p className="text-lotus-mist text-lg mb-1">{product.author}</p>
              <p className="text-xs text-lotus-mist/50 mb-4">{product.publisher}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(avgRating) ? "text-lotus-gold fill-lotus-gold" : "text-white/10"} />
                  ))}
                </div>
                <span className="text-sm text-lotus-mist">{avgRating.toFixed(1)} ({reviews.length} resenas)</span>
              </div>

              <p className="text-lotus-mist font-body leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-lotus-pink">{formatPrice(product.price)}</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.stock > 10 ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"}`}>
                  {product.stock > 10 ? "En stock" : `Ultimas ${product.stock}`}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => { addItem(product); toast.success("Anadido al carrito!"); }}
                  className="ink-ripple-btn px-6 py-3 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={18} /> ANADIR AL CARRITO
                </button>

                <button
                  onClick={handleWishlist}
                  className={`px-4 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                    isInWishlist(product.id)
                      ? "bg-lotus-pink/10 border-lotus-pink/30 text-lotus-pink"
                      : "bg-white/5 border-white/10 text-lotus-mist hover:text-lotus-pink hover:border-lotus-pink/30"
                  }`}
                >
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-lotus-pink" : ""} />
                </button>

                <button
                  onClick={() => setReaderOpen(true)}
                  className="px-4 py-3 bg-lotus-gold/10 border border-lotus-gold/30 text-lotus-gold font-heading tracking-wider rounded-xl hover:bg-lotus-gold/15 transition-all flex items-center gap-2"
                >
                  <BookOpen size={18} /> LEER MUESTRA
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs bg-white/5 text-lotus-mist/60 rounded-full capitalize">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Reviews */}
          <div className="border-t border-white/[0.04] pt-8">
            <h2 className="font-heading text-2xl tracking-wider text-lotus-smoke mb-6">RESENAS</h2>

            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6 mb-8">
              <h3 className="text-lotus-smoke font-body font-medium mb-3">
                {user ? "Deja tu resena" : "Inicia sesion para dejar una resena"}
              </h3>
              <div className="mb-3">
                <StarRating rating={newRating} onChange={setNewRating} size="lg" />
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Comparte tu opinion sobre este manga..."
                rows={3}
                className="input-lotus w-full px-4 py-3 text-sm resize-none mb-3"
              />
              <button
                onClick={handleAddReview}
                disabled={newRating === 0}
                className="px-6 py-2 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white text-sm font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all disabled:opacity-50"
              >
                PUBLICAR
              </button>
            </div>

            {reviewsLoading ? (
              <div className="flex justify-center py-8"><div className="shuriken-loader" /></div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-lotus-mist/50">
                <p className="text-lg mb-1">Aun no hay resenas</p>
                <p className="text-sm">Se el primero en opinar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="manga-bubble rounded-2xl p-4 pt-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-lotus-lavender to-lotus-pink flex items-center justify-center text-white text-xs font-bold">
                          {review.user?.full_name?.charAt(0) ?? "U"}
                        </div>
                        <div>
                          <p className="text-sm text-lotus-smoke font-medium">{review.user?.full_name ?? "Usuario"}</p>
                          <p className="text-xs text-lotus-mist/40">
                            {new Date(review.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} readonly size="sm" />
                    </div>
                    {review.comment && <p className="text-sm text-lotus-mist mt-2 italic">&ldquo;{review.comment}&rdquo;</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
