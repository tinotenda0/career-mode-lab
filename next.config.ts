import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages.
  output: "export",
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"]
  }
};

export default nextConfig;
