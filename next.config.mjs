/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pegem.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.europosters.eu",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
