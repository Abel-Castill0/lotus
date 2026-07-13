"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, LogOut, Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { loadCustomerData } from "@/lib/utils";

export default function PerfilPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const supabase = createClient();
  const [profile, setProfile] = useState({ full_name: "", phone: "", address: "", city: "" });

  useEffect(() => {
    if (!loading && !user) { router.push("/"); return; }
    const loadProfile = async () => {
      if (!user || !supabase) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setProfile({ full_name: data.full_name ?? user.user_metadata?.full_name ?? "", phone: data.phone ?? "", address: data.address ?? "", city: data.city ?? "" });
      } else {
        const cd = loadCustomerData();
        if (cd) setProfile({ full_name: cd.fullName, phone: cd.phone, address: cd.address, city: cd.city });
      }
    };
    if (user) loadProfile();
  }, [user, loading, router, supabase]);

  const handleSignOut = async () => { await signOut(); toast.success("Sesion cerrada"); router.push("/"); };

  const handleSaveProfile = async () => {
    if (!user || !supabase) return;
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...profile, updated_at: new Date().toISOString() });
    if (error) toast.error("Error al guardar"); else toast.success("Perfil actualizado!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="shuriken-loader" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/catalogo" className="inline-flex items-center gap-2 text-sm text-lotus-mist hover:text-lotus-smoke transition-colors mb-6">
          <ArrowLeft size={16} /> Volver a la tienda
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl md:text-5xl tracking-wider text-lotus-smoke mb-2">MI PERFIL</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-lotus-lavender to-lotus-gold rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-1">
            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-lotus-lavender to-lotus-pink flex items-center justify-center text-white text-2xl font-heading mb-3">
                {(profile.full_name || user.email || "U").charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lotus-smoke font-medium">{profile.full_name || "Usuario"}</h2>
              <p className="text-xs text-lotus-mist/40 mb-4">{user.email}</p>
              <div className="space-y-2">
                <Link href="/wishlist" className="flex items-center gap-2 px-3 py-2 rounded-xl text-lotus-mist hover:text-lotus-pink hover:bg-lotus-pink/5 transition-all text-sm">
                  <Heart size={16} /> Wishlist
                </Link>
                <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-lotus-mist hover:text-red-400 hover:bg-red-400/5 transition-all text-sm">
                  <LogOut size={16} /> Cerrar sesion
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-4">
            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6">
              <h3 className="text-lotus-smoke font-body font-medium mb-4 flex items-center gap-2">
                <User size={16} className="text-lotus-lavender" /> Datos personales
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-lotus-mist/50 mb-1">Nombre completo</label>
                  <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="input-lotus w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-lotus-mist/50 mb-1">Email</label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0F]/40 border border-white/[0.06] rounded-xl text-lotus-mist/60 text-sm">
                    <Mail size={14} /> {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-lotus-mist/50 mb-1">Telefono</label>
                  <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="987654321" className="input-lotus w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-lotus-mist/50 mb-1">Direccion</label>
                  <input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Calle, numero, colonia" className="input-lotus w-full px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-lotus-mist/50 mb-1">Ciudad</label>
                  <input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="Lima" className="input-lotus w-full px-3 py-2 text-sm" />
                </div>
              </div>
              <button onClick={handleSaveProfile} className="mt-4 px-6 py-2 bg-gradient-to-r from-lotus-lavender to-lotus-gold text-[#0A0A0F] text-sm font-heading tracking-wider rounded-xl hover:shadow-neon-lavender transition-all">
                GUARDAR CAMBIOS
              </button>
            </div>

            <div className="bg-[#111118] rounded-2xl border border-white/[0.04] p-6">
              <h3 className="text-lotus-smoke font-body font-medium mb-4">Accesos rapidos</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/wishlist" className="flex items-center gap-2 p-3 bg-[#0A0A0F]/40 rounded-xl text-lotus-mist hover:text-lotus-pink transition-all text-sm">
                  <Heart size={16} /> Wishlist
                </Link>
                <button className="flex items-center gap-2 p-3 bg-[#0A0A0F]/40 rounded-xl text-lotus-mist hover:text-lotus-lavender transition-all text-sm text-left">
                  <ShoppingBag size={16} /> Historial
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
