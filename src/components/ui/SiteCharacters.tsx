"use client";

import { usePathname } from "next/navigation";
import AnimeCharacterLeft from "./AnimeCharacterLeft";
import AnimeCharacterRight from "./AnimeCharacterRight";

export default function SiteCharacters() {
  const pathname = usePathname();
  if (pathname === "/checkout" || pathname.startsWith("/manga/")) return null;
  return <><AnimeCharacterLeft /><AnimeCharacterRight /></>;
}
