"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type AnimeImageProps = Omit<ImageProps, "onError"> & {
  fallback?: string;
};

/** Optimized image with a deterministic local illustration if a remote cover is unavailable. */
export default function AnimeImage({ fallback = "/images/fallback/manga-placeholder.svg", src, alt, ...props }: AnimeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc(fallback)}
    />
  );
}
