import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set project root so Next.js doesn't infer it from
  // a stray lockfile in a parent directory (fixes Turbopack "Access denied" panic)
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
