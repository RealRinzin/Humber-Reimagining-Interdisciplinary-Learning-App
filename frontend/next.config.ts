import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["spaces.classdev.courses"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sanctum/csrf-cookie",
        destination: "http://127.0.0.1:8001/api/v1/sanctum/csrf-cookie",
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
