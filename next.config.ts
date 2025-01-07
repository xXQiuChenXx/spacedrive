import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "",
      },
    },
  },
};

export default nextConfig;
