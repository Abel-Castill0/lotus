"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: AnimatedButtonProps) {
  const base =
    "relative font-heading tracking-[0.15em] uppercase rounded-xl overflow-hidden transition-all duration-300 inline-flex items-center justify-center gap-2";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-lotus-lavender to-lotus-pink text-white shadow-neon-lavender hover:shadow-[0_0_24px_rgba(197,163,255,0.5)]",
    secondary:
      "bg-gradient-to-r from-lotus-gold to-lotus-pink text-[#0A0A0F] shadow-gold-glow",
    outline:
      "border border-lotus-lavender/30 text-lotus-lavender hover:bg-lotus-lavender/5 hover:border-lotus-lavender/50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
