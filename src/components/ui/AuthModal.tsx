"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

const signupSchema = z.object({
  fullName: z.string().min(3, "Nombre muy corto"),
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "Minimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const handleLogin = async (data: LoginForm) => {
    if (!supabase) {
      toast.error("Supabase no configurado");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Bienvenido de vuelta!");
    onClose();
  };

  const handleSignup = async (data: SignupForm) => {
    if (!supabase) {
      toast.error("Supabase no configurado");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Cuenta creada! Revisa tu email para confirmar.");
    setTab("login");
  };

  const handleSocialLogin = async (provider: "google" | "discord") => {
    if (!supabase) {
      toast.error("Supabase no configurado");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) toast.error(error.message);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[90] p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#0a0a0f] border border-purple-500/20 rounded-2xl p-6 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all z-10"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="font-heading text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
                  LOTUS
                </h2>
                <p className="text-gray-500 text-sm">
                  {tab === "login"
                    ? "Inicia sesion en tu cuenta"
                    : "Crea tu cuenta magica"}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex mb-6 bg-[#12121a] rounded-lg p-1">
                {(["login", "signup"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      tab === t
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {t === "login" ? "Iniciar sesion" : "Registrarse"}
                  </button>
                ))}
              </div>

              {/* Social buttons */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => handleSocialLogin("google")}
                  disabled={loading}
                  className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-600">o con email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Login form */}
              {tab === "login" && (
                <form
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#12121a] border border-purple-500/20 rounded-lg focus-within:border-purple-500/50 transition-colors">
                      <Mail size={16} className="text-gray-500" />
                      <input
                        {...loginForm.register("email")}
                        type="email"
                        placeholder="Email"
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#12121a] border border-purple-500/20 rounded-lg focus-within:border-purple-500/50 transition-colors">
                      <Lock size={16} className="text-gray-500" />
                      <input
                        {...loginForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contrasena"
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-red-400 text-xs mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-heading tracking-wider rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "INICIAR SESION"
                    )}
                  </button>
                </form>
              )}

              {/* Signup form */}
              {tab === "signup" && (
                <form
                  onSubmit={signupForm.handleSubmit(handleSignup)}
                  className="space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#12121a] border border-purple-500/20 rounded-lg focus-within:border-purple-500/50 transition-colors">
                      <User size={16} className="text-gray-500" />
                      <input
                        {...signupForm.register("fullName")}
                        type="text"
                        placeholder="Nombre completo"
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                      />
                    </div>
                    {signupForm.formState.errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">
                        {signupForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#12121a] border border-purple-500/20 rounded-lg focus-within:border-purple-500/50 transition-colors">
                      <Mail size={16} className="text-gray-500" />
                      <input
                        {...signupForm.register("email")}
                        type="email"
                        placeholder="Email"
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                      />
                    </div>
                    {signupForm.formState.errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-[#12121a] border border-purple-500/20 rounded-lg focus-within:border-purple-500/50 transition-colors">
                      <Lock size={16} className="text-gray-500" />
                      <input
                        {...signupForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contrasena"
                        className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {signupForm.formState.errors.password && (
                      <p className="text-red-400 text-xs mt-1">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-heading tracking-wider rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "CREAR CUENTA"
                    )}
                  </button>
                </form>
              )}

              {/* Footer */}
              <p className="text-center text-xs text-gray-600 mt-4">
                Al continuar, aceptas nuestros terminos y condiciones
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
