"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AnimeImage from "./AnimeImage";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();
  const [couponInput, setCouponInput] = useState("");
  const { items, discount, couponCode, removeItem, updateQuantity, applyCoupon, removeCoupon, subtotal, discountAmount, total, itemCount } = useCartStore();

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) { toast.success(result.message); setCouponInput(""); }
    else { toast.error(result.message); }
  };

  const handleCheckout = () => {
    onClose();
    if (items.length === 0) { toast.error("Tu carrito esta vacio"); return; }
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />

          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0F] border-l border-white/[0.06] z-[70] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-lotus-lavender" />
                <h2 className="font-heading text-lg tracking-wider text-lotus-smoke">CARRITO</h2>
                <span className="text-xs text-lotus-mist/40">({itemCount()} items)</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl text-lotus-mist hover:text-lotus-smoke hover:bg-white/5 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🍜</div>
                  <p className="text-lotus-mist font-body text-sm mb-2">Tu carrito esta mas vacio</p>
                  <p className="text-lotus-mist/50 font-body text-xs mb-6">que la nevera de Goku</p>
                  <button onClick={() => { onClose(); router.push("/catalogo"); }} className="px-6 py-2.5 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white text-sm font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all">
                    IR AL CATALOGO
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div key={item.productId} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex gap-3 p-3 bg-[#111118] rounded-2xl border border-white/[0.04]">
                      <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#16161F]">
                        <AnimeImage src={item.coverImage} alt={item.title} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-body text-lotus-smoke truncate">{item.title}</h3>
                        <p className="text-xs text-lotus-lavender mt-0.5 font-medium">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 rounded-lg bg-white/5 text-lotus-mist hover:text-lotus-smoke hover:bg-white/10 transition-all">
                            {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                          </button>
                          <span className="text-sm text-lotus-smoke font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 rounded-lg bg-white/5 text-lotus-mist hover:text-lotus-smoke hover:bg-white/10 transition-all">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end justify-between">
                        <button onClick={() => { removeItem(item.productId); toast.info(`${item.title} eliminado del carrito`); }} className="p-1 rounded-lg text-lotus-mist/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
                          <X size={14} />
                        </button>
                        <span className="text-sm text-lotus-smoke font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.04] p-4 space-y-3">
                <div>
                  {couponCode ? (
                    <div className="flex items-center justify-between px-3 py-2 bg-lotus-lavender/5 rounded-xl border border-lotus-lavender/15">
                      <div>
                        <span className="text-sm text-lotus-lavender font-medium">{couponCode}</span>
                        <span className="text-xs text-lotus-mist/40 ml-2">(-{discount}%)</span>
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
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-lotus-mist"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento ({discount}%)</span><span>-{formatPrice(discountAmount())}</span></div>}
                  <div className="flex justify-between text-lotus-smoke font-bold text-base pt-1 border-t border-white/[0.04]">
                    <span>Total</span>
                    <span className="text-lotus-pink">{formatPrice(total())}</span>
                  </div>
                </div>
                <button onClick={handleCheckout} className="w-full py-3 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all">
                  IR AL CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
