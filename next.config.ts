import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["prismjs"],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
