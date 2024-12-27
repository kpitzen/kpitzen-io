import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Configure any specific rules here
      },
    },
  },
};

export default nextConfig;
