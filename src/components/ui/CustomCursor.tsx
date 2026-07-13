"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 0.3 : isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 28, mass: 0.4 }}
      />

      {/* Glow ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          scale: isClicking ? 0.7 : 1,
          opacity: isHovering ? 1 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.6 }}
        style={{
          border: `2px solid ${isHovering ? "rgba(168, 85, 247, 0.8)" : "rgba(124, 58, 237, 0.3)"}`,
          boxShadow: isHovering
            ? "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.15), inset 0 0 12px rgba(168, 85, 247, 0.1)"
            : "0 0 8px rgba(124, 58, 237, 0.15)",
        }}
      />

      {/* Trail particles */}
      {isHovering && (
        <>
          <motion.div
            className="fixed w-1 h-1 bg-purple-400/60 rounded-full pointer-events-none z-[9997] hidden md:block"
            animate={{
              x: position.x + 12,
              y: position.y - 10,
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="fixed w-0.5 h-0.5 bg-pink-400/50 rounded-full pointer-events-none z-[9997] hidden md:block"
            animate={{
              x: position.x - 8,
              y: position.y + 14,
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          />
        </>
      )}
    </>
  );
}
