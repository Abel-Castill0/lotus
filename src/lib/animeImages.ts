const MAL_CDN = "https://cdn.myanimelist.net/images/manga";

export const fallbackImages = {
  hero: "/images/fallback/hero-anime.svg",
  about1: "/images/fallback/about-1.svg",
  about2: "/images/fallback/about-2.svg",
  about3: "/images/fallback/about-3.svg",
  about4: "/images/fallback/about-4.svg",
  productPlaceholder: "/images/fallback/manga-placeholder.svg",
  characterLeft: "/images/fallback/character-left.svg",
  characterRight: "/images/fallback/character-right.svg",
} as const;

const productCovers: Record<string, string> = {
  "jujutsu-kaisen-vol.-1": `${MAL_CDN}/3/188896.jpg`,
  "one-piece-vol.-1": `${MAL_CDN}/2/253146.jpg`,
  "naruto-vol.-1": `${MAL_CDN}/3/249658.jpg`,
  "attack-on-titan-vol.-1": `${MAL_CDN}/2/37846.jpg`,
  "demon-slayer-vol.-1": `${MAL_CDN}/3/179559.jpg`,
  "spy-x-family-vol.-1": `${MAL_CDN}/3/219917.jpg`,
  "chainsaw-man-vol.-1": `${MAL_CDN}/3/216570.jpg`,
  "my-hero-academia-vol.-1": `${MAL_CDN}/3/222888.jpg`,
};

/** Returns a verified manga-art CDN URL; UI callers must pair it with fallbackImages. */
export const getAnimeImage = (keyword: string, width = 800, height = 600): string =>
  `${MAL_CDN}/3/188896.jpg?width=${width}&height=${height}&fit=crop&query=${encodeURIComponent(keyword)}`;

export const getProductCover = (title: string): string =>
  productCovers[title.toLowerCase().replace(/\s+/g, "-")] ?? fallbackImages.productPlaceholder;
