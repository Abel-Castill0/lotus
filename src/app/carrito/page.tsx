"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart as CartIcon, Minus, Plus, Trash2, ArrowLeft, Ticket, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import AnimeImage from "@/components/ui/AnimeImage";

export default function CarritoPage() {
  const router = useRouter();
  const [couponInput, setCouponInput] = useState("");
  const { items, discount, couponCode, removeItem, updateQuantity, applyCoupon, removeCoupon, subtotal, discountAmount, total } = useCartStore();

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) { toast.success(result.message); setCouponInput(""); }
    else { toast.error(result.message); }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-sm text-lotus-mist hover:text-lotus-smoke transition-colors mb-4">
            <ArrowLeft size={16} /> Seguir comprando
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl tracking-wider text-lotus-smoke mb-2">CARRITO</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-lotus-lavender to-lotus-pink rounded-full" />
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <p className="text-lotus-mist text-lg font-body mb-2">Tu carrito esta vacio</p>
            <p className="text-lotus-mist/50 text-sm mb-8">Agrega productos desde el catalogo</p>
            <Link href="/catalogo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all">
              <ShoppingBag size={18} /> IR AL CATALOGO
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-3">
              {items.map((item, index) => (
                <motion.div key={item.productId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="flex gap-4 p-4 bg-[#111118] rounded-2xl border border-white/[0.04]">
                  <AnimeImage src={item.coverImage} alt={item.title} width={80} height={112} className="w-20 h-28 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-heading text-lg tracking-wide text-lotus-smoke">{item.title}</h3>
                    <p className="text-sm text-lotus-lavender mt-1 font-medium">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1.5 rounded-lg bg-white/5 text-lotus-mist hover:text-lotus-smoke hover:bg-white/10 transition-all">
                          {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                        </button>
                        <span className="text-lotus-smoke font-medium w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1.5 rounded-lg bg-white/5 text-lotus-mist hover:text-lotus-smoke hover:bg-white/10 transition-all">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lotus-smoke font-bold">{formatPrice(item.price * item.quantity)}</span>
                        <button onClick={() => { removeItem(item.productId); toast.info(`${item.title} eliminado`); }} className="p-1.5 rounded-lg text-lotus-mist/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6 h-fit sticky top-24">
              <h2 className="font-heading text-lg tracking-wider text-lotus-smoke mb-4">RESUMEN</h2>
              <div className="mb-6">
                {couponCode ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-lotus-lavender/5 rounded-xl border border-lotus-lavender/15">
                    <div className="flex items-center gap-2">
                      <Ticket size={14} className="text-lotus-lavender" />
                      <span className="text-sm text-lotus-lavender font-medium">{couponCode}</span>
                      <span className="text-xs text-lotus-mist/40 ml-1">(-{discount}%)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-lotus-mist/40 hover:text-red-400 transition-colors">Quitar</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()} placeholder="Codigo de cupon" className="input-lotus flex-1 px-3 py-2 text-xs" />
                    <button onClick={handleApplyCoupon} className="px-4 py-2 bg-lotus-lavender/20 text-lotus-lavender text-xs font-heading tracking-wider rounded-xl hover:bg-lotus-lavender/30 transition-all">APLICAR</button>
                  </div>
                )}
              </div>
              <div className="space-y-2 text-sm border-t border-white/[0.04] pt-4">
                <div className="flex justify-between text-lotus-mist"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento ({couponCode})</span><span>-{formatPrice(discountAmount())}</span></div>}
                <div className="flex justify-between text-lotus-smoke font-bold text-lg pt-2 border-t border-white/[0.04]">
                  <span>Total</span>
                  <span className="text-lotus-pink">{formatPrice(total())}</span>
                </div>
              </div>
              <button onClick={() => router.push("/checkout")} className="w-full mt-6 py-3 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all flex items-center justify-center gap-2">
                <CartIcon size={18} /> IR AL CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
