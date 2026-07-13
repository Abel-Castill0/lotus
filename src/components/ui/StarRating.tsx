"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

const kawaiiEmojis = ["😭", "😟", "😐", "😊", "😍"];

export default function StarRating({
  rating,
  maxRating = 5,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const value = i + 1;
        const filled = value <= (hovered || rating);

        return (
          <motion.button
            key={i}
            type="button"
            disabled={readonly}
            whileHover={readonly ? {} : { scale: 1.2 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            onMouseEnter={() => !readonly && setHovered(value)}
            onMouseLeave={() => !readonly && setHovered(0)}
            onClick={() => onChange?.(value)}
            className={`transition-all ${readonly ? "cursor-default" : "cursor-pointer"} ${
              filled ? "scale-110" : "scale-100 opacity-50"
            }`}
          >
            <motion.span
              animate={
                filled
                  ? { scale: [1, 1.3, 1], rotate: [0, 15, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.3 }}
              className={sizeClasses[size]}
            >
              {kawaiiEmojis[i]}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
