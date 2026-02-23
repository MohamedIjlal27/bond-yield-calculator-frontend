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

  // Explicitly set turbopack root to avoid multiple lockfile warnings
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
