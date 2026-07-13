import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/context/AuthContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Toaster } from "sonner";
import { Bebas_Neue, Poppins, Comic_Neue } from "next/font/google";
import PageTransition from "@/components/ui/PageTransition";
import GuideCharacter from "@/components/ui/GuideCharacter";
import LenisProvider from "@/components/LenisProvider";
import SiteCharacters from "@/components/ui/SiteCharacters";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  preload: true,
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: true,
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manga",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lotusmangastore.com";

export const metadata: Metadata = {
  title: {
    default: "Lotus Manga Store - Tu tienda de mangas y anime",
    template: "%s | Lotus Manga Store",
  },
  description:
    "Descubre la mejor coleccion de mangas, figuras y merchandising de anime. Envios a todo Peru. Compra segura con envio de pedido por WhatsApp.",
  keywords: [
    "mangas",
    "anime",
    "tienda manga",
    "comprar mangas Peru",
    "Jujutsu Kaisen",
    "One Piece",
    "Naruto",
    "figuras anime",
    "merchandising anime",
  ],
  authors: [{ name: "Lotus Manga Store" }],
  creator: "Lotus Manga Store",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Lotus Manga Store",
    title: "Lotus Manga Store - Tu tienda de mangas y anime",
    description:
      "Descubre la mejor coleccion de mangas, figuras y merchandising de anime.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lotus Manga Store - Tienda de mangas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Manga Store",
    description: "Tu tienda de mangas y anime favorita",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.svg",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Lotus Manga",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Lotus Manga Store",
    description: "Tienda especializada en mangas y merchandising de anime",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    telephone: "+51 960599967",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PE",
    },
  };

  return (
    <html
      lang="es"
      className={`dark ${bebasNeue.variable} ${poppins.variable} ${comicNeue.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased cursor-shuriken" id="root">
        <LenisProvider />
        <ThemeProvider>
          <AuthProvider>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <SiteCharacters />
            <GuideCharacter />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: "toast-manga",
                style: {
                  background: "linear-gradient(135deg, #111118 0%, #16161F 100%)",
                  border: "1px solid rgba(197,163,255,0.25)",
                  borderRadius: "12px",
                  boxShadow: "0 0 24px rgba(197,163,255,0.15)",
                  color: "#F0EDF5",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
