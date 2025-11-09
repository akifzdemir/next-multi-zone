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
    const cartHost = process.env.CART_HOST || "localhost:3001";
    return [
      {
        source: "/cart",
        destination: `http://${cartHost}/cart`,
      },
      {
        source: "/cart/:path*",
        destination: `http://${cartHost}/cart/:path*`,
      },
    ];
  },
};

export default nextConfig;
