/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lotusmangastore.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  exclude: [
    "/checkout",
    "/perfil",
    "/wishlist",
    "/carrito",
    "/auth/*",
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: ["/checkout", "/perfil", "/wishlist", "/carrito", "/api/*"],
      },
    ],
  },
  transform: async (config, path) => {
    if (path.startsWith("/manga/")) {
      return { loc: path, changefreq: "monthly", priority: 0.8 };
    }
    return { loc: path, changefreq: "weekly", priority: 0.7 };
  },
};
