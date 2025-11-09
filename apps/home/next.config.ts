import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/cart",
        destination: "http://localhost:3001/cart",
      },
      {
        source: "/cart/:path*",
        destination: "http://localhost:3001/cart/:path*",
      },
    ];
  },
};

export default nextConfig;
