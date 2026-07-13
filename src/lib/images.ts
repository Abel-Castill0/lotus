import { fallbackImages, getAnimeImage, getProductCover } from "./animeImages";

/** Compatibility helpers for older callers; all values now use manga art or local fallbacks. */
export const getUnsplashImage = (keyword: string, width = 800, height = 600) =>
  getAnimeImage(keyword, width, height);

export const getHeroFallback = () => fallbackImages.hero;
export const ABOUT_BG = fallbackImages.about1;
export const getCoverImage = (title: string) => getProductCover(title);
