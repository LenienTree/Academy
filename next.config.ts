import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.18.170",
    "192.168.18.170:3000",
    "*.local",
    "127.0.0.1",
    "localhost:3000",
  ],
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
