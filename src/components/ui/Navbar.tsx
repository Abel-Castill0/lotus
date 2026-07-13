"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Menu, X, Sun, Moon, User, LogOut, ChevronDown } from "lucide-react";
import { useThemeStore, useCartStore } from "@/lib/store";
import { useAuth } from "@/lib/context/AuthContext";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, toggle } = useThemeStore();
  const itemCount = useCartStore((s) => s.itemCount());
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catalogo" },
    { href: "/carrito", label: "Carrito" },
  ];

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0F]/70 backdrop-blur-2xl border-b border-lotus-lavender/10 shadow-[0_4px_30px_rgba(197,163,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl md:text-3xl font-heading tracking-[0.15em] text-lotus-smoke group-hover:text-lotus-lavender transition-colors">
                LOTUS
              </span>
              <span className="text-[10px] text-lotus-mist/50 hidden sm:block font-body tracking-wider">
                MANGA STORE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-underline relative text-sm font-body text-lotus-mist hover:text-lotus-smoke transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded-xl text-lotus-mist hover:text-lotus-gold hover:bg-lotus-gold/5 transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 rounded-xl text-lotus-mist hover:text-lotus-lavender hover:bg-lotus-lavender/5 transition-all relative"
              >
                <motion.div animate={itemCount > 0 ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                  <ShoppingCart size={18} />
                </motion.div>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-lotus-lavender to-lotus-pink rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-lotus-lavender to-lotus-pink flex items-center justify-center text-white text-xs font-bold">
                      {(user.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} className="text-lotus-mist" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#111118] border border-lotus-lavender/10 rounded-2xl overflow-hidden shadow-xl shadow-[#0A0A0F]/50"
                      >
                        <Link href="/perfil" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-lotus-mist hover:text-lotus-smoke hover:bg-white/5 transition-all">
                          <User size={16} /> Mi perfil
                        </Link>
                        <Link href="/wishlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-lotus-mist hover:text-lotus-pink hover:bg-lotus-pink/5 transition-all">
                          <Heart size={16} /> Wishlist
                        </Link>
                        <hr className="border-white/5" />
                        <button onClick={() => { signOut(); setUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-lotus-mist hover:text-red-400 hover:bg-red-400/5 transition-all">
                          <LogOut size={16} /> Cerrar sesion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="px-4 py-1.5 text-sm bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white rounded-xl hover:shadow-neon-lavender transition-all">
                  Iniciar sesion
                </button>
              )}

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl text-lotus-mist hover:text-lotus-smoke hover:bg-white/5 transition-all">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-2xl border-b border-lotus-lavender/10"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-lotus-mist hover:text-lotus-smoke transition-colors py-2">
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link href="/perfil" onClick={() => setMobileOpen(false)} className="block text-lotus-mist hover:text-lotus-smoke transition-colors py-2">Mi perfil</Link>
                    <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block text-lotus-mist hover:text-lotus-smoke transition-colors py-2">Wishlist</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
