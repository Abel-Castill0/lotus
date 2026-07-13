/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
