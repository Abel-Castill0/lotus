"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store";
import { formatPrice, generateWhatsAppUrl, saveCustomerData, loadCustomerData } from "@/lib/utils";
import { checkoutSchema, CheckoutFormValues } from "@/lib/checkout-schema";
import AnimeImage from "@/components/ui/AnimeImage";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, discount, couponCode, subtotal, discountAmount, total, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "Peru", email: "", notes: "" },
  });

  useEffect(() => {
    const saved = loadCustomerData();
    if (saved) reset(saved);
  }, [reset]);

  useEffect(() => {
    if (items.length === 0) { toast.error("Tu carrito esta vacio"); router.push("/catalogo"); }
  }, [items, router]);

  const onSubmit = async (data: CheckoutFormValues) => {
    const url = generateWhatsAppUrl(items, data, subtotal(), discount, total(), couponCode);
    saveCustomerData(data);
    window.open(url, "_blank");
    clearCart();
    toast.success("Pedido enviado a WhatsApp!", { icon: "🎉", duration: 5000 });
    setTimeout(() => router.push("/"), 1500);
  };

  if (items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center"><div className="shuriken-loader" /></div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/carrito" className="inline-flex items-center gap-2 text-sm text-lotus-mist hover:text-lotus-smoke transition-colors">
            <ArrowLeft size={16} /> Volver al carrito
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
            <h1 className="font-heading text-3xl md:text-4xl tracking-wider text-lotus-smoke mb-2">CHECKOUT</h1>
            <p className="text-lotus-mist text-sm mb-6">Completa tus datos para recibir el pedido</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[#111118] rounded-2xl border border-white/[0.04] p-6">
              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Nombre completo *</label>
                <input {...register("fullName")} placeholder="Ej: Ana Garcia" className="input-lotus w-full px-4 py-2.5 text-sm" />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Direccion de envio *</label>
                <input {...register("address")} placeholder="Calle, numero, colonia" className="input-lotus w-full px-4 py-2.5 text-sm" />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-lotus-mist mb-1 font-medium">Ciudad *</label>
                  <input {...register("city")} placeholder="Lima" className="input-lotus w-full px-4 py-2.5 text-sm" />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-lotus-mist mb-1 font-medium">Codigo Postal *</label>
                  <input {...register("zipCode")} placeholder="15036" className="input-lotus w-full px-4 py-2.5 text-sm" />
                  {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Pais *</label>
                <select {...register("country")} className="input-lotus w-full px-4 py-2.5 text-sm">
                  <option value="Peru">Peru</option>
                  <option value="Chile">Chile</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Espania">Espana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Telefono (WhatsApp) *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-[#0A0A0F]/60 border border-r-0 border-white/[0.06] rounded-l-xl text-lotus-mist/60 text-sm">+51</span>
                  <input {...register("phone")} placeholder="987654321" maxLength={9} className="input-lotus flex-1 px-4 py-2.5 text-sm rounded-l-none" />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Email (opcional)</label>
                <input {...register("email")} placeholder="ana@email.com" className="input-lotus w-full px-4 py-2.5 text-sm" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-lotus-mist mb-1 font-medium">Notas adicionales (opcional)</label>
                <textarea {...register("notes")} rows={3} placeholder="Ej: Entregar en porteria" className="input-lotus w-full px-4 py-2.5 text-sm resize-none" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><ShoppingBag size={18} /> CONFIRMAR Y ENVIAR POR WHATSAPP</>}
              </button>
            </form>
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6 sticky top-24">
              <h2 className="font-heading text-lg tracking-wider text-lotus-smoke mb-4">RESUMEN DEL PEDIDO</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3 pb-3 border-b border-white/[0.04] last:border-0">
                    <AnimeImage src={item.coverImage} alt={item.title} width={48} height={64} className="w-12 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-lotus-smoke truncate">{item.title}</p>
                      <p className="text-xs text-lotus-mist/40">x{item.quantity} · {formatPrice(item.price)}</p>
                    </div>
                    <p className="text-sm text-lotus-smoke font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-white/[0.04] pt-4">
                <div className="flex justify-between text-lotus-mist"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento ({couponCode})</span><span>-{formatPrice(discountAmount())}</span></div>}
                <div className="flex justify-between text-lotus-smoke font-bold text-lg pt-2 border-t border-white/[0.04]">
                  <span>Total</span>
                  <span className="text-lotus-pink">{formatPrice(total())}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
