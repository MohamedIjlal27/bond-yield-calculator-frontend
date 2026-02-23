import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Strict mode for better error detection
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Type-safe routing
  typedRoutes: true,
};

export default nextConfig;
